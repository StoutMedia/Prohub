import { PlanCards } from '@/components/pricing/PlanCards';
import { ButtonLink } from '@/components/ui/Button';
export default function PricingPage() { return <main className="min-h-screen px-4 py-12"><div className="mx-auto max-w-6xl"><ButtonLink href="/" variant="ghost">Back</ButtonLink><h1 className="mt-8 text-4xl font-black text-[#0B2751]">Parent & player pricing</h1><p className="mt-3 text-slate-600">Starter, Player, Family, and Family Plus plans for ProHub access.</p><div className="mt-8"><PlanCards audience="individual" /></div></div></main>; }
