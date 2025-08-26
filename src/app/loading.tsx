export default function Loading() {
    return (
      <div className="grid h-dvh place-items-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-slate-200" />
          <p className="mt-3 text-sm text-slate-400">Загрузка…</p>
        </div>
      </div>
    );
  }