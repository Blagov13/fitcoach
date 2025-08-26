export default function Spinner({ label }: { label?: string }) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-slate-200" />
        {label ? <span className="text-sm text-slate-400">{label}…</span> : null}
      </div>
    );
  }