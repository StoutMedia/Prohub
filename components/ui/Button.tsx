import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';

const styles = 'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition focus-ring disabled:cursor-not-allowed disabled:opacity-50';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const variant = props.variant || 'primary';
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'border border-slate-200 bg-white text-slate-700';
  return <button {...props} className={`${styles} ${cls} ${props.className || ''}`} />;
}

export function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'border border-slate-200 bg-white text-slate-700';
  return <Link href={href} className={`${styles} ${cls}`}>{children}</Link>;
}
