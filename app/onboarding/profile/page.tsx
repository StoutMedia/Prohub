import { OnboardingProgress } from '@/components/onboarding/Progress';
import { ProfileStep } from '@/components/onboarding/StepForm';
import { createSupabaseServerClient } from '@/lib/supabase/server';
export default async function ProfilePage() { const supabase = await createSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser(); const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id || '').maybeSingle(); return <><OnboardingProgress current={3} /><ProfileStep role={profile?.role} /></>; }
