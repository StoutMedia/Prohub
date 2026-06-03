const brandPills = ['Player Development', 'Session Planning', 'College Recruiting', 'Team Management', 'Performance Tracking'];

export function BrandPanel({ eyebrow = 'Protouch International Soccer Academy' }: { eyebrow?: string }) {
  return (
    <section className="brand-gradient relative overflow-hidden px-6 py-10 text-white md:min-h-screen md:px-12 md:py-16">
      <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#E47410]/20 blur-3xl" />
      <div className="absolute bottom-12 left-8 h-44 w-44 rounded-full border border-white/10" />
      <div className="relative mx-auto flex h-full max-w-xl flex-col justify-between gap-12">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.34em] text-orange-200">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">ProHub <span className="text-[#E47410]">by PISA</span></h1>
          <p className="mt-6 max-w-md text-2xl font-black leading-tight md:text-4xl">Build better players with a smarter soccer operating system.</p>
          <p className="mt-5 max-w-md text-base leading-8 text-blue-100">Powered by PISA / Protouch International Soccer Academy for players, parents, coaches, directors, teams, and academies.</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-3">
            {brandPills.map((pill) => <span key={pill} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-50 shadow-sm backdrop-blur">{pill}</span>)}
          </div>
          <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-200">pisafootball.com</p>
            <p className="mt-3 text-sm leading-6 text-blue-100">Premium, athletic, mobile-first operating workflows for soccer development and organization management.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
