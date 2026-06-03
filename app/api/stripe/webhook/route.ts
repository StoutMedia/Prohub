import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function upsertSubscription(subscription: Stripe.Subscription, fallbackUserId?: string | null, fallbackPlanName?: string | null, fallbackOrganizationId?: string | null) {
  const supabase = createSupabaseAdminClient();
  const item = subscription.items.data[0];
  const userId = subscription.metadata.user_id || fallbackUserId;
  const organizationId = subscription.metadata.organization_id || fallbackOrganizationId || null;
  if (!userId) return;
  const record = {
    user_id: userId,
    organization_id: organizationId || null,
    stripe_customer_id: String(subscription.customer),
    stripe_subscription_id: subscription.id,
    stripe_price_id: item?.price.id,
    plan_name: subscription.metadata.plan_name || fallbackPlanName,
    status: subscription.status,
    current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };
  await supabase.from('subscriptions').upsert(record, { onConflict: 'stripe_subscription_id' });
  if (organizationId) {
    await supabase.from('organizations').update({ stripe_customer_id: String(subscription.customer), subscription_status: subscription.status, subscription_plan: record.plan_name, updated_at: new Date().toISOString() }).eq('id', organizationId);
  }
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
      await upsertSubscription(subscription, session.metadata?.user_id, session.metadata?.plan_name, session.metadata?.organization_id);
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
