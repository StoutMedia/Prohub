import { OnboardingProgress } from '@/components/onboarding/Progress';
import { PlayerParentStep } from '@/components/onboarding/StepForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';
export default async function PlayerParentPage() { const supabase = await createSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser(); const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id || '').maybeSingle(); return <><OnboardingProgress current={3} /><PlayerParentStep role={profile?.role} /></>; }
