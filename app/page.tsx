import { ButtonLink } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="brand-gradient px-6 py-16 text-white md:px-12 md:py-24">
        <nav className="mx-auto flex max-w-6xl items-center justify-between"><strong className="text-2xl">ProHub <span className="text-[#E47410]">by PISA</span></strong><div className="flex gap-3"><ButtonLink href="/login" variant="ghost">Login</ButtonLink><ButtonLink href="/signup">Create Account</ButtonLink></div></nav>
        <div className="mx-auto mt-20 max-w-6xl"><p className="font-bold uppercase tracking-[0.35em] text-orange-200">pisafootball.com</p><h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">The premium soccer operating system for modern academies.</h1><p className="mt-6 max-w-2xl text-xl leading-8 text-blue-100">Connect player development, parent visibility, coach planning, director oversight, onboarding, invites, and subscription access in one mobile-first platform.</p><div className="mt-10 flex flex-wrap gap-4"><ButtonLink href="/signup">Create Account</ButtonLink><ButtonLink href="/pricing" variant="ghost">View Pricing</ButtonLink></div></div>
      </section>
    </main>
  );
}
