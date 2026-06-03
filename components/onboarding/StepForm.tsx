'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RoleCard } from '@/components/onboarding/RoleCard';

type Option = { label: string; value: string; description: string };

export function ChoiceStep({ field, options, next, title, subtitle }: { field: string; options: Option[]; next: string; title: string; subtitle: string }) {
  const [selected, setSelected] = useState(options[0]?.value || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function submit() {
    setLoading(true); setError('');
    const step = field === 'role' ? 'role' : 'workspace';
    const target = field === 'workspace_type' && selected === 'invite' ? '/api/invites/accept' : next;
    const res = await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: selected, onboarding_step: step }) });
    setLoading(false);
    if (!res.ok) return setError('Could not save this onboarding step.');
    window.location.href = target;
  }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">{title}</h1><p className="mt-2 text-slate-600">{subtitle}</p>{error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}<div className="mt-6 grid gap-3 md:grid-cols-2">{options.map((option) => <label key={option.value} className="cursor-pointer"><input className="sr-only" type="radio" checked={selected === option.value} onChange={() => setSelected(option.value)} /><RoleCard label={option.label} description={option.description} selected={selected === option.value} /></label>)}</div><div className="mt-6 flex gap-3"><Button type="button" variant="ghost" onClick={() => history.back()}>Back</Button><Button type="button" onClick={submit} disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></div></div>;
}

export function ProfileStep({ role }: { role?: string | null }) {
  const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  async function submit(formData: FormData) {
    setLoading(true); setError('');
    const payload = { ...Object.fromEntries(formData.entries()), onboarding_step: 'profile' };
    const res = await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setLoading(false);
    if (!res.ok) return setError('Could not save profile.');
    window.location.href = role === 'player' || role === 'parent' ? '/onboarding/player-parent' : '/onboarding/club-team';
  }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">Build your profile</h1><p className="mt-2 text-slate-600">Tell ProHub who you are so the correct dashboard opens after onboarding.</p>{error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<form action={submit} className="mt-6 grid gap-4"><Input label="First name" name="first_name" required placeholder="First name" /><Input label="Last name" name="last_name" required placeholder="Last name" /><Input label="Phone" name="phone" placeholder="Phone" /><Button disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></form></div>;
}

export function PlayerParentStep({ role }: { role?: string | null }) {
  const [under18, setUnder18] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  async function submit(formData: FormData) {
    setLoading(true); setError('');
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, is_minor: under18, onboarding_step: 'player-parent' }) });
    setLoading(false);
    if (!res.ok) return setError('Could not save player details.');
    window.location.href = '/onboarding/pricing';
  }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">{role === 'parent' ? 'Add child player' : 'Player details'}</h1><p className="mt-2 text-slate-600">Minor players require parent account control before full dashboard access.</p>{error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<form action={submit} className="mt-6 grid gap-4"><Input label="Player first name" name="player_first_name" required placeholder="Player first name" /><Input label="Player last name" name="player_last_name" required placeholder="Player last name" /><Input label="Birthdate" name="birthdate" type="date" /><Select label="Position" name="position"><option>Forward</option><option>Midfielder</option><option>Defender</option><option>Goalkeeper</option></Select><label className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 font-bold text-[#0B2751]"><input type="checkbox" checked={under18} onChange={(e) => setUnder18(e.target.checked)} /> Player is under 18</label>{under18 && <Input label="Required parent email" name="parent_email" type="email" required placeholder="parent@example.com" />}<Button disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></form></div>;
}

export function ClubTeamStep() {
  const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  async function submit(formData: FormData) { setLoading(true); setError(''); const res = await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(formData.entries()), onboarding_step: 'club-team' }) }); setLoading(false); if (!res.ok) return setError('Could not save organization details.'); window.location.href = '/onboarding/pricing'; }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">Organization workspace</h1><p className="mt-2 text-slate-600">Create your academy, club, team, or staff workspace.</p>{error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<form action={submit} className="mt-6 grid gap-4"><Input label="Club or academy name" name="organization_name" required placeholder="Club or academy name" /><Input label="Team name" name="team_name" placeholder="Team name" /><Select label="Competition level" name="competition_level"><option>Academy</option><option>Club</option><option>Elite</option><option>Recreational</option></Select><Button disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></form></div>;
}
