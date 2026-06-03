'use client';

import { useState } from 'react';
import { plans, type PlanKey } from '@/lib/plans';
import { PricingCard } from '@/components/onboarding/PricingCard';

export function PlanCards({ audience = 'individual', inviteCovered = false }: { audience?: 'individual' | 'organization'; inviteCovered?: boolean }) {
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const [error, setError] = useState('');
  const visiblePlans = (Object.keys(plans) as PlanKey[]).filter((key) => plans[key].audience === audience);

  async function checkout(plan: PlanKey) {
    setLoading(plan);
    setError('');
    const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Unable to start checkout. Confirm Stripe environment variables are configured.');
      setLoading(null);
      return;
    }
    window.location.href = data.url;
  }

  if (inviteCovered) {
    return <div className="rounded-3xl border border-green-200 bg-green-50 p-5 font-semibold text-green-900">Your organization invite covers billing when the organization subscription is active. Continue onboarding without choosing a public plan.</div>;
  }

  return <div>{error ? <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{visiblePlans.map((key) => <PricingCard key={key} name={plans[key].name} price={plans[key].price} features={plans[key].features} loading={loading === key} onChoose={() => checkout(key)} />)}</div></div>;
}
