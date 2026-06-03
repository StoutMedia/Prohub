import type { InputHTMLAttributes } from 'react';
export function Input({ label, className = '', ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className="grid gap-2 text-sm font-bold text-[#0B2751]"><span>{label}</span><input className={`focus-ring rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 ${className}`} {...props} /></label>;
}
