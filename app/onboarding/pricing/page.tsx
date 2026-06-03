import { OnboardingProgress } from '@/components/onboarding/Progress';
import { PlanCards } from '@/components/pricing/PlanCards';
import { ButtonLink } from '@/components/ui/Button';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function OnboardingPricingPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('role, workspace_type').eq('id', user?.id || '').maybeSingle();
  const { data: membership } = await supabase.from('organization_members').select('id').eq('user_id', user?.id || '').eq('status', 'active').maybeSingle();
  const inviteCovered = Boolean(membership) || profile?.workspace_type === 'invite';
  const audience = profile?.workspace_type === 'organization' || profile?.role === 'coach' || profile?.role === 'director' ? 'organization' : 'individual';
  return <><OnboardingProgress current={4} /><h1 className="text-3xl font-black text-[#0B2751]">Choose Plan</h1><p className="mt-2 text-slate-600">Parent/player plans include Starter $9/mo, Player $29/mo, Family $59/mo, and Family Plus $89/mo. Invited coaches skip pricing.</p><div className="mt-6"><PlanCards audience={audience} inviteCovered={inviteCovered} /></div>{inviteCovered && <div className="mt-6"><ButtonLink href="/onboarding/complete">Continue</ButtonLink></div>}</>;
}
