import { BrandShell } from '@/components/ui/BrandShell';
export default function OnboardingLayout({ children }: { children: React.ReactNode }) { return <BrandShell eyebrow="Onboarding"><div className="card w-full max-w-2xl rounded-3xl p-6 md:p-8">{children}</div></BrandShell>; }
