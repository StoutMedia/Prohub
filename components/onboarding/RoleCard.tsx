export function RoleCard({ label, description, selected }: { label: string; description: string; selected?: boolean }) {
  return <div className={`rounded-3xl border p-5 transition ${selected ? 'border-[#E47410] bg-orange-50 shadow-lg shadow-orange-900/5' : 'border-slate-200 bg-white hover:border-[#E47410]/60'}`}><strong className="text-lg text-[#0B2751]">{label}</strong><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>;
}
