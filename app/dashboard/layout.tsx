import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAccessState } from '@/lib/access';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const access = await getAccessState(supabase as any, user.id);
  if (!access.profile?.onboarding_complete) redirect('/onboarding/role');
  return <main className="min-h-screen bg-slate-50 md:grid md:grid-cols-[260px_1fr]"><aside className="brand-gradient p-6 text-white"><h1 className="text-2xl font-black">ProHub <span className="text-[#E47410]">by PISA</span></h1><nav className="mt-8 grid gap-3 text-sm font-semibold"><Link href="/dashboard">Overview</Link><Link href="/dashboard/player">Player</Link><Link href="/dashboard/parent">Parent</Link><Link href="/dashboard/coach">Coach</Link><Link href="/dashboard/director">Director</Link><Link href="/dashboard/settings">Settings</Link><Link href="/dashboard/billing">Billing</Link></nav><form action="/auth/logout" method="post" className="mt-8"><button className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">Logout</button></form></aside><section className="p-4 md:p-8">{!access.hasPaidAccess ? <div className="mb-4 rounded-xl bg-orange-50 p-4 text-sm font-semibold text-orange-900">Billing required for paid dashboard features unless covered by an organization invite.</div> : null}{children}</section></main>;
}
