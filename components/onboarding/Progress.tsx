const steps = ['Role', 'Workspace', 'Profile', 'Plan', 'Complete'];
export function OnboardingProgress({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <p className="mb-3 text-sm font-semibold text-slate-500">Step {current} of {steps.length}</p>
      <div className="grid grid-cols-5 gap-2">
        {steps.map((step, index) => <div key={step} className={`h-2 rounded-full ${index < current ? 'bg-[#E47410]' : 'bg-slate-200'}`} title={step} />)}
      </div>
    </div>
  );
}
