import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
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
  const [{ data: profile }, { data: membership }] = await Promise.all([
    supabase.from('profiles').select('role, workspace_type').eq('id', user.id).maybeSingle(),
    supabase.from('organization_members').select('organization_id').eq('user_id', user.id).eq('status', 'active').limit(1).maybeSingle(),
  ]);
  const metadata = {
    user_id: user.id,
    role: profile?.role || '',
    workspace_type: profile?.workspace_type || '',
    plan_key: plan,
    plan_name: selected.name,
    organization_id: selected.audience === 'organization' ? membership?.organization_id || '' : '',
  };
  const session = await stripe().checkout.sessions.create({
    mode: 'subscription',
    customer_email: user.email || undefined,
    line_items: [{ price, quantity: 1 }],
    success_url: `${siteUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/checkout/cancel`,
    metadata,
    subscription_data: { metadata },
  });
  return NextResponse.json({ url: session.url });
}
