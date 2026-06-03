export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`card rounded-[2rem] p-6 ${className}`}>{children}</div>;
}
export function ErrorMessage({ message }: { message?: string }) { return message ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</p> : null; }
