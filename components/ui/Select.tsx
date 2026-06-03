import type { SelectHTMLAttributes } from 'react';
export function Select({ label, children, className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return <label className="grid gap-2 text-sm font-bold text-[#0B2751]"><span>{label}</span><select className={`focus-ring rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 ${className}`} {...props}>{children}</select></label>;
}
