import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';
import { siteUrl } from '@/lib/site';

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data: sub } = await supabase.from('subscriptions').select('stripe_customer_id').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (!sub?.stripe_customer_id) return NextResponse.json({ error: 'No Stripe customer found yet. Start a subscription first.' }, { status: 400 });
  const session = await stripe().billingPortal.sessions.create({ customer: sub.stripe_customer_id, return_url: `${siteUrl()}/dashboard/billing` });
  return NextResponse.json({ url: session.url });
}
