import type { SupabaseClient } from '@supabase/supabase-js';
import { activeStatuses } from './plans';

export async function getAccessState(supabase: SupabaseClient, userId: string) {
  const [{ data: profile }, { data: subscriptions }, { data: memberships }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
    supabase.from('subscriptions').select('status, plan_name').eq('user_id', userId).in('status', activeStatuses),
    supabase.from('organization_members').select('status, role, organization_id, organizations(subscription_status, subscription_plan)').eq('user_id', userId).eq('status', 'active'),
  ]);
  const hasSubscription = Boolean(subscriptions?.length);
  const hasOrganizationAccess = Boolean(memberships?.some((membership: any) => activeStatuses.includes(membership.organizations?.subscription_status)));
  return { profile, subscriptions: subscriptions || [], memberships: memberships || [], hasSubscription, hasOrganizationAccess, hasPaidAccess: hasSubscription || hasOrganizationAccess };
}

export function dashboardPathForRole(role?: string | null) {
  if (role === 'player') return '/dashboard/player';
  if (role === 'parent') return '/dashboard/parent';
  if (role === 'coach') return '/dashboard/coach';
  if (role === 'director' || role === 'staff') return '/dashboard/director';
  return '/dashboard';
}
