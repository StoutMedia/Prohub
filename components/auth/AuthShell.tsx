import { BrandPanel } from './BrandPanel';

export function AuthShell({ children, eyebrow }: { children: React.ReactNode; eyebrow?: string }) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] md:grid md:grid-cols-[minmax(320px,42vw)_1fr]">
      <BrandPanel eyebrow={eyebrow} />
      <section className="flex items-center justify-center px-4 py-10 md:px-10">{children}</section>
    </main>
  );
}
