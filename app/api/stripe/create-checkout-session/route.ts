import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/client';
import { plans, type PlanKey } from '@/lib/plans';
import { siteUrl } from '@/lib/site';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { plan } = await request.json() as { plan: PlanKey };
  const selected = plans[plan];
  if (!selected) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
  const price = process.env[selected.env];
  if (!price) return NextResponse.json({ error: `${selected.env} is not configured. Add the Stripe price ID to enable this button.` }, { status: 400 });
  const session = await stripe().checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email || undefined,
    line_items: [{ price, quantity: 1 }],
    success_url: `${siteUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/checkout/cancel`,
    metadata: { user_id: user.id, plan_key: plan, plan_name: selected.name },
    subscription_data: { metadata: { user_id: user.id, plan_key: plan, plan_name: selected.name } },
  });
  return NextResponse.json({ url: session.url });
}
