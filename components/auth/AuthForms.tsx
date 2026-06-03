'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { Button } from '@/components/ui/Button';

function siteUrl() { return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin; }

export function SignupForm() {
  const supabase = createSupabaseBrowserClient();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) {
    setLoading(true); setError(''); setMessage('');
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${siteUrl()}/auth/callback?next=/onboarding/role` } });
    setLoading(false);
    if (error) return setError(error.message);
    setMessage('Check your inbox to verify your email, then continue onboarding.');
    window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
  }
  return <AuthForm mode="signup" onSubmit={submit} loading={loading} error={error} message={message} />;
}

export function LoginForm() {
  const supabase = createSupabaseBrowserClient();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) {
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email: String(formData.get('email')), password: String(formData.get('password')) });
    setLoading(false);
    if (error) return setError(error.message);
    window.location.href = '/dashboard';
  }
  return <AuthForm mode="login" onSubmit={submit} loading={loading} error={error} />;
}

function AuthForm({ mode, onSubmit, loading, error, message }: { mode: 'login' | 'signup'; onSubmit: (formData: FormData) => void; loading: boolean; error: string; message?: string }) {
  const supabase = createSupabaseBrowserClient();
  const title = mode === 'signup' ? 'Create your ProHub account' : 'Log in to ProHub';
  const appleEnabled = process.env.NEXT_PUBLIC_ENABLE_APPLE_OAUTH === 'true';
  async function oauth(provider: 'google' | 'apple') {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${siteUrl()}/auth/callback?next=/dashboard` } });
  }
  return (
    <div className="card w-full max-w-md rounded-3xl p-6 md:p-8">
      <h2 className="text-3xl font-black text-[#0B2751]">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">Use email/password or a configured OAuth provider.</p>
      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{message}</p> : null}
      <form action={onSubmit} className="mt-6 grid gap-4">
        <input name="email" type="email" required placeholder="Email" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" />
        <input name="password" type="password" required minLength={8} placeholder="Password" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" />
        <Button disabled={loading}>{loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Continue'}</Button>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>
      <div className="grid gap-3">
        <Button variant="ghost" onClick={() => oauth('google')}>Continue with Google</Button>
        {/* Apple OAuth requires NEXT_PUBLIC_ENABLE_APPLE_OAUTH=true plus Apple enabled in Supabase with Apple developer credentials. */}
        <Button variant="ghost" disabled={!appleEnabled} onClick={() => oauth('apple')}>{appleEnabled ? 'Continue with Apple' : 'Apple OAuth requires provider configuration'}</Button>
      </div>
      <div className="mt-6 flex justify-between text-sm text-slate-600">
        <a className="font-bold text-[#0B2751]" href={mode === 'signup' ? '/login' : '/signup'}>{mode === 'signup' ? 'Log in' : 'Create account'}</a>
        <a className="font-bold text-[#0B2751]" href="/reset-password">Forgot password?</a>
      </div>
    </div>
  );
}

export function ResetPasswordForm() {
  const supabase = createSupabaseBrowserClient();
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) {
    setLoading(true); setError(''); setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(String(formData.get('email')), { redirectTo: `${siteUrl()}/auth/callback?next=/dashboard/settings` });
    setLoading(false); error ? setError(error.message) : setMessage('Password reset email sent.');
  }
  return <div className="card w-full max-w-md rounded-3xl p-8"><h2 className="text-3xl font-black text-[#0B2751]">Reset password</h2>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{message && <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{message}</p>}<form action={submit} className="mt-6 grid gap-4"><input name="email" type="email" required placeholder="Email" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><Button disabled={loading}>{loading ? 'Sending...' : 'Continue'}</Button></form></div>;
}
