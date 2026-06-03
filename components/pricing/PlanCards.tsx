'use client';

import { useState } from 'react';
import { plans, type PlanKey } from '@/lib/plans';
import { Button } from '@/components/ui/Button';

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
      setError(data.error || 'Unable to start checkout. Confirm Stripe env vars are configured.');
      setLoading(null);
      return;
    }
    window.location.href = data.url;
  }

  if (inviteCovered) {
    return <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-900">Your organization invite covers billing. Continue onboarding without choosing a public plan.</div>;
  }

  return (
    <div>
      {error ? <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visiblePlans.map((key) => {
          const plan = plans[key];
          return (
            <article key={key} className="card flex min-h-64 flex-col rounded-3xl p-6">
              <h3 className="text-xl font-black text-[#0B2751]">{plan.name}</h3>
              <p className="mt-3 text-3xl font-black">{plan.price}</p>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{plan.description}</p>
              <Button onClick={() => checkout(key)} disabled={loading === key}>{loading === key ? 'Loading...' : 'Start Trial or Continue to Payment'}</Button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
