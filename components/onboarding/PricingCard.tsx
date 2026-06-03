import { Button } from '@/components/ui/Button';
export function PricingCard({ name, price, features, loading, onChoose }: { name: string; price: string; features: string[]; loading?: boolean; onChoose: () => void }) {
  return <article className="card flex min-h-80 flex-col rounded-[2rem] p-6"><h3 className="text-xl font-black text-[#0B2751]">{name}</h3><p className="mt-3 text-4xl font-black text-slate-950">{price}</p><ul className="mt-5 flex-1 space-y-3 text-sm text-slate-600">{features.map((feature) => <li key={feature} className="flex gap-2"><span className="font-black text-[#E47410]">✓</span>{feature}</li>)}</ul><Button onClick={onChoose} disabled={loading}>{loading ? 'Opening checkout...' : 'Choose plan'}</Button></article>;
}
