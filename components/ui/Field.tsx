export function Field({ label, name, type = 'text', required = false, placeholder, defaultValue }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; defaultValue?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue} className="focus-ring rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal" />
    </label>
  );
}
