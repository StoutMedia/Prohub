const labels = ['Role', 'Workspace', 'Profile', 'Plan', 'Complete'];
export function ProgressSteps({ current }: { current: number }) {
  return <ol className="mb-8 grid grid-cols-5 gap-2" aria-label="Onboarding progress">{labels.map((label, index) => { const step = index + 1; const active = step <= current; return <li key={label} className="text-center"><div className={`mx-auto h-2 rounded-full ${active ? 'bg-[#E47410]' : 'bg-slate-200'}`} /><span className={`mt-2 block text-[11px] font-extrabold uppercase tracking-wider ${active ? 'text-[#0B2751]' : 'text-slate-400'}`}>{label}</span></li>; })}</ol>;
}
