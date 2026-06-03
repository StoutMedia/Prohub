export function BrandShell({ children, eyebrow = 'Protouch International Soccer Academy' }: { children: React.ReactNode; eyebrow?: string }) {
  return (
    <main className="min-h-screen bg-slate-50 md:grid md:grid-cols-[minmax(320px,42vw)_1fr]">
      <section className="brand-gradient px-6 py-10 text-white md:min-h-screen md:px-12 md:py-16">
        <div className="max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-200">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">ProHub <span className="text-[#E47410]">by PISA</span></h1>
          <p className="mt-6 text-lg leading-8 text-blue-100">A premium soccer operating system for players, parents, coaches, directors, club staff, and academy organizations.</p>
          <div className="mt-10 grid gap-4 text-sm text-blue-100">
            {['Role-based dashboards', 'Subscription-gated access', 'Organization invites', 'Mobile-first soccer workflows'].map((item) => <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4">{item}</div>)}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10 md:px-10">{children}</section>
    </main>
  );
}
