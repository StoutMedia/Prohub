import { redirect } from 'next/navigation';
import { ButtonLink } from '@/components/ui/Button';
import { OnboardingProgress } from '@/components/onboarding/Progress';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { dashboardPathForRole } from '@/lib/access';

export default async function CompletePage({ searchParams }: { searchParams: Promise<{ go?: string }> }) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').update({ onboarding_complete: true, updated_at: new Date().toISOString() }).eq('id', user.id).select('role').single();
  if (params.go === 'dashboard') redirect(dashboardPathForRole(profile?.role));
  return <><OnboardingProgress current={5} /><div className="text-center"><h1 className="text-3xl font-black text-[#0B2751]">Onboarding complete</h1><p className="mt-3 text-slate-600">Your ProHub workspace is ready. Billing access is checked before paid dashboard features load.</p><div className="mt-6"><ButtonLink href="/onboarding/complete?go=dashboard">Go to Dashboard</ButtonLink></div></div></>;
}
