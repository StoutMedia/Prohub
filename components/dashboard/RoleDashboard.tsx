import { DashboardCard } from './DashboardCard';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAccessState } from '@/lib/access';

const quickCards = ['Player Development', 'Session Planning', 'Match Review', 'Training Logs', 'College Recruiting', 'Team Communication'];

export async function RoleDashboard({ roleLabel }: { roleLabel: string }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const access = user ? await getAccessState(supabase as any, user.id) : null;
  const profile = access?.profile;
  const subscription = access?.subscriptions?.[0];
  const membership = access?.memberships?.[0];
  return <div><p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#E47410]">Protected dashboard</p><h1 className="mt-2 text-4xl font-black text-[#0B2751]">Welcome to your {roleLabel} Dashboard</h1><p className="mt-3 text-slate-600">Premium ProHub by PISA workflows for modern soccer operations.</p><div className="mt-8 grid gap-4 md:grid-cols-4"><DashboardCard title="User role">{profile?.role || roleLabel.toLowerCase()}</DashboardCard><DashboardCard title="Workspace type">{profile?.workspace_type || 'Not selected'}</DashboardCard><DashboardCard title="Subscription status">{subscription?.status || 'No direct subscription'}</DashboardCard><DashboardCard title="Organization membership">{membership ? `${membership.role} · ${membership.status}` : 'No active organization coverage'}</DashboardCard></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{quickCards.map((card) => <DashboardCard key={card} title={card}>Open {card.toLowerCase()} tools, notes, planning, and reporting inside your ProHub workspace.</DashboardCard>)}</div></div>;
}
