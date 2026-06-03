export function AuthCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`card w-full max-w-md rounded-[2rem] p-6 md:p-8 ${className}`}>{children}</div>;
}
