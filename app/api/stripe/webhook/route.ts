import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function upsertSubscription(subscription: Stripe.Subscription, fallbackUserId?: string | null, fallbackPlanName?: string | null) {
  const supabase = createSupabaseAdminClient();
  const item = subscription.items.data[0];
  const userId = subscription.metadata.user_id || fallbackUserId;
  if (!userId) return;
  await supabase.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: String(subscription.customer),
    stripe_subscription_id: subscription.id,
    stripe_price_id: item?.price.id,
    plan_name: subscription.metadata.plan_name || fallbackPlanName,
    status: subscription.status,
    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: 'stripe_subscription_id' });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET); } catch (error) { return NextResponse.json({ error: `Webhook verification failed: ${(error as Error).message}` }, { status: 400 }); }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.subscription) {
      const subscription = await stripe().subscriptions.retrieve(String(session.subscription));
      await upsertSubscription(subscription, session.metadata?.user_id, session.metadata?.plan_name);
    }
  }
  if (['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted'].includes(event.type)) await upsertSubscription(event.data.object as Stripe.Subscription);
  if (event.type === 'invoice.payment_succeeded' || event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = (invoice as any).subscription;
    if (subscriptionId) await upsertSubscription(await stripe().subscriptions.retrieve(String(subscriptionId)));
  }
  return NextResponse.json({ received: true });
}
