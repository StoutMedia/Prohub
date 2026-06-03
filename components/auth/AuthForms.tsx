'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ErrorMessage } from '@/components/ui/Card';

function siteUrl() { return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin; }

type AuthMode = 'login' | 'signup';

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

function AuthForm({ mode, onSubmit, loading, error, message }: { mode: AuthMode; onSubmit: (formData: FormData) => void; loading: boolean; error: string; message?: string }) {
  const supabase = createSupabaseBrowserClient();
  const title = mode === 'signup' ? 'Create your ProHub account' : 'Log in to ProHub';
  const appleEnabled = process.env.NEXT_PUBLIC_ENABLE_APPLE_OAUTH === 'true';
  async function oauth(provider: 'google' | 'apple') {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: `${siteUrl()}/auth/callback?next=/dashboard` } });
  }
  return <div className="card w-full max-w-md rounded-[2rem] p-6 md:p-8"><h2 className="text-3xl font-black text-[#0B2751]">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Use email/password or a configured OAuth provider to access PISA ProHub.</p><div className="mt-4 grid gap-3"><ErrorMessage message={error} />{message ? <p className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p> : null}</div><form action={onSubmit} className="mt-6 grid gap-4"><Input label="Email" name="email" type="email" required placeholder="you@example.com" /><Input label="Password" name="password" type="password" required minLength={8} placeholder="Minimum 8 characters" /><Button disabled={loading}>{loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Continue'}</Button></form><div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div><div className="grid gap-3"><Button type="button" variant="ghost" onClick={() => oauth('google')}>Continue with Google</Button><Button type="button" variant="ghost" disabled={!appleEnabled} onClick={() => oauth('apple')}>{appleEnabled ? 'Continue with Apple' : 'Apple OAuth disabled until provider configuration exists'}</Button>{!appleEnabled ? <p className="text-xs font-semibold text-slate-500">Enable Apple in Supabase and set NEXT_PUBLIC_ENABLE_APPLE_OAUTH=true to activate this button.</p> : null}</div><div className="mt-6 flex justify-between text-sm text-slate-600"><a className="font-bold text-[#0B2751]" href={mode === 'signup' ? '/login' : '/signup'}>{mode === 'signup' ? 'Log in' : 'Create account'}</a><a className="font-bold text-[#0B2751]" href="/reset-password">Forgot password?</a></div></div>;
}

export function ResetPasswordForm() {
  const supabase = createSupabaseBrowserClient();
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const [newPassword, setNewPassword] = useState('');
  async function requestReset(formData: FormData) {
    setLoading(true); setError(''); setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(String(formData.get('email')), { redirectTo: `${siteUrl()}/auth/callback?next=/reset-password` });
    setLoading(false); error ? setError(error.message) : setMessage('Password reset email sent. Open the link in that email to set a new password.');
  }
  async function updatePassword() {
    setLoading(true); setError(''); setMessage('');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false); error ? setError(error.message) : setMessage('Password updated. You can now continue to your dashboard.');
  }
  return <div className="card w-full max-w-md rounded-[2rem] p-8"><h2 className="text-3xl font-black text-[#0B2751]">Reset password</h2><div className="mt-4 grid gap-3"><ErrorMessage message={error} />{message && <p className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p>}</div><form action={requestReset} className="mt-6 grid gap-4"><Input label="Account email" name="email" type="email" required placeholder="you@example.com" /><Button disabled={loading}>{loading ? 'Sending...' : 'Send reset email'}</Button></form><div className="my-6 h-px bg-slate-200" /><div className="grid gap-4"><Input label="New password after opening reset link" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} type="password" minLength={8} placeholder="Minimum 8 characters" /><Button type="button" variant="secondary" onClick={updatePassword} disabled={loading || newPassword.length < 8}>{loading ? 'Saving...' : 'Update password'}</Button></div></div>;
}

export function VerifyEmailForm({ email }: { email?: string }) {
  const supabase = createSupabaseBrowserClient();
  const [code, setCode] = useState(Array(6).fill(''));
  const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function verify() {
    if (!email) return setError('Open the verification link from your email, or return from signup with your email included.');
    setLoading(true); setError(''); setMessage('');
    const { error } = await supabase.auth.verifyOtp({ email, token: code.join(''), type: 'signup' });
    setLoading(false);
    if (error) return setError(error.message);
    setMessage('Email verified. Redirecting to onboarding...');
    window.location.href = '/onboarding/role';
  }
  async function resend() {
    if (!email) return setError('Return from signup so ProHub knows which address to resend to.');
    setLoading(true); setError(''); setMessage('');
    const { error } = await supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: `${siteUrl()}/auth/callback?next=/onboarding/role` } });
    setLoading(false); error ? setError(error.message) : setMessage('Verification email resent.');
  }
  return <div className="card w-full max-w-md rounded-[2rem] p-6 md:p-8"><h2 className="text-3xl font-black text-[#0B2751]">Verify Email</h2><p className="mt-3 text-sm leading-6 text-slate-600">Click the Supabase verification link sent to {email || 'your inbox'}, or enter the six-digit OTP code if your Supabase project uses OTP confirmations.</p><div className="mt-4 grid gap-3"><ErrorMessage message={error} />{message ? <p className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</p> : null}</div><div className="mt-6 grid grid-cols-6 gap-2 md:gap-3">{code.map((value, index) => <input key={index} aria-label={`Verification digit ${index + 1}`} maxLength={1} inputMode="numeric" value={value} onChange={(event) => { const next = [...code]; next[index] = event.target.value.replace(/\D/g, '').slice(0, 1); setCode(next); }} className="focus-ring h-14 w-full rounded-2xl border border-slate-200 text-center text-xl font-black md:h-20 md:w-[60px]" />)}</div><div className="mt-6 grid gap-3"><Button type="button" onClick={verify} disabled={loading || code.join('').length !== 6}>{loading ? 'Verifying...' : 'Verify code'}</Button><Button type="button" variant="ghost" onClick={resend} disabled={loading || !email}>Resend verification email</Button><a className="text-center text-sm font-bold text-[#0B2751]" href="/login">I verified with the email link</a></div></div>;
}
