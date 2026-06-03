import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { dashboardPathForRole } from '@/lib/access';
export default async function DashboardPage() { const supabase = await createSupabaseServerClient(); const { data: { user } } = await supabase.auth.getUser(); const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id || '').maybeSingle(); redirect(dashboardPathForRole(profile?.role)); }
