export default function MiniSessionCard({
    session,
  }: {
    session: { id: string; time: string; client: string; type?: string; status?: string };
  }) {
    return (
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-1 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
        {/* Время */}
        <div className="rounded-md bg-slate-800 px-2 py-1 text-sm font-medium text-slate-200">
          {session.time}
        </div>
  
        {/* Имя клиента + тип */}
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-slate-100">{session.client}</div>
          <div className="text-xs text-slate-400">
            {session.type === "group" ? "Групповая" : "Персональная"}
          </div>
        </div>
  
        {/* Статус: на мобилке новой строкой, на ≥sm справа */}
        <span className="col-span-2 sm:col-auto sm:justify-self-end inline-flex rounded-md border border-slate-700 px-2 py-1 text-[11px] text-slate-400">
          {session.status === "scheduled" ? "Запланировано" : session.status}
        </span>
      </div>
    );
  }
  