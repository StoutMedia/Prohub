import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
const classes: Record<Variant, string> = {
  primary: 'bg-[#E47410] text-white hover:bg-[#c8610a] shadow-lg shadow-orange-900/10',
  secondary: 'bg-[#0B2751] text-white hover:bg-[#071c3a]',
  ghost: 'border border-[#0B2751]/15 bg-white text-[#0B2751] hover:bg-slate-50',
};

export function Button({ className = '', variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-55 ${classes[variant]} ${className}`} {...props} />;
}

export function ButtonLink({ className = '', variant = 'primary', href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }) {
  return <Link href={href} className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-extrabold transition ${classes[variant]} ${className}`} {...props} />;
}
