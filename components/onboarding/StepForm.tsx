'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type Option = { label: string; value: string; description: string };

export function ChoiceStep({ field, options, next, title, subtitle }: { field: string; options: Option[]; next: string; title: string; subtitle: string }) {
  const [selected, setSelected] = useState(options[0]?.value || '');
  const [loading, setLoading] = useState(false);
  async function submit() {
    setLoading(true);
    await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: selected }) });
    window.location.href = next;
  }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">{title}</h1><p className="mt-2 text-slate-600">{subtitle}</p><div className="mt-6 grid gap-3">{options.map((option) => <label key={option.value} className={`cursor-pointer rounded-2xl border p-4 ${selected === option.value ? 'border-[#E47410] bg-orange-50' : 'border-slate-200 bg-white'}`}><input className="sr-only" type="radio" checked={selected === option.value} onChange={() => setSelected(option.value)} /><strong>{option.label}</strong><p className="text-sm text-slate-600">{option.description}</p></label>)}</div><div className="mt-6 flex gap-3"><Button variant="ghost" onClick={() => history.back()}>Back</Button><Button onClick={submit} disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></div></div>;
}

export function ProfileStep({ role }: { role?: string | null }) {
  const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  async function submit(formData: FormData) {
    setLoading(true); setError('');
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setLoading(false);
    if (!res.ok) return setError('Could not save profile.');
    window.location.href = role === 'player' || role === 'parent' ? '/onboarding/player-parent' : '/onboarding/club-team';
  }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">Build your profile</h1>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<form action={submit} className="mt-6 grid gap-4"><input name="first_name" required placeholder="First name" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><input name="last_name" required placeholder="Last name" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><input name="phone" placeholder="Phone" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><Button disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></form></div>;
}

export function PlayerParentStep({ role }: { role?: string | null }) {
  const [under18, setUnder18] = useState(false); const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) {
    setLoading(true);
    const payload = Object.fromEntries(formData.entries());
    await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, under18 }) });
    window.location.href = '/onboarding/pricing';
  }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">{role === 'parent' ? 'Add child player' : 'Player details'}</h1><form action={submit} className="mt-6 grid gap-4"><input name="player_first_name" required placeholder="Player first name" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><input name="player_last_name" required placeholder="Player last name" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><input name="birthdate" type="date" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><select name="position" className="focus-ring rounded-xl border border-slate-200 px-4 py-3"><option>Forward</option><option>Midfielder</option><option>Defender</option><option>Goalkeeper</option></select><label className="flex gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" checked={under18} onChange={(e) => setUnder18(e.target.checked)} /> Player is under 18</label>{under18 && <input name="parent_email" type="email" required placeholder="Required parent email" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" />}<Button disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></form></div>;
}

export function ClubTeamStep() {
  const [loading, setLoading] = useState(false);
  async function submit(formData: FormData) { setLoading(true); await fetch('/api/onboarding/save-step', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(formData.entries())) }); window.location.href = '/onboarding/pricing'; }
  return <div><h1 className="text-3xl font-black text-[#0B2751]">Organization workspace</h1><form action={submit} className="mt-6 grid gap-4"><input name="organization_name" required placeholder="Club or academy name" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><input name="team_name" placeholder="Team name" className="focus-ring rounded-xl border border-slate-200 px-4 py-3" /><select name="competition_level" className="focus-ring rounded-xl border border-slate-200 px-4 py-3"><option>Academy</option><option>Club</option><option>Elite</option><option>Recreational</option></select><Button disabled={loading}>{loading ? 'Saving...' : 'Continue'}</Button></form></div>;
}
