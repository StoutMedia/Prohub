import { BrandShell } from '@/components/ui/BrandShell';
import { ButtonLink } from '@/components/ui/Button';

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const params = await searchParams;
  return <BrandShell><div className="card w-full max-w-md rounded-3xl p-8"><h2 className="text-3xl font-black text-[#0B2751]">Verify Email</h2><p className="mt-3 text-slate-600">Enter the six-digit code from Supabase email verification if your project uses OTP, or click the verification link sent to {params.email || 'your inbox'}.</p><div className="mt-6 grid grid-cols-6 gap-2">{Array.from({ length: 6 }).map((_, i) => <input key={i} maxLength={1} inputMode="numeric" className="focus-ring h-12 rounded-xl border border-slate-200 text-center text-xl font-black" />)}</div><div className="mt-6"><ButtonLink href="/login">Verify Email</ButtonLink></div></div></BrandShell>;
}
