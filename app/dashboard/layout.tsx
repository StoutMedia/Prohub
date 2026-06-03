import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAccessState } from '@/lib/access';
import { nextOnboardingPath } from '@/lib/onboarding';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const access = await getAccessState(supabase as any, user.id);
  if (!access.profile?.onboarding_complete) redirect(nextOnboardingPath(access.profile));
  return <DashboardShell>{!access.hasPaidAccess ? <div className="mb-4 rounded-2xl bg-orange-50 p-4 text-sm font-semibold text-orange-900">Billing required for paid dashboard features unless covered by an active organization subscription.</div> : null}{children}</DashboardShell>;
}
