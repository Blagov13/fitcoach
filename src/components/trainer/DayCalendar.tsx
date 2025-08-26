"use client";
import { useMemo, useState } from "react";
import MiniSessionCard from "./MiniSessionCard";

type Session = { id: string; time: string; client: string; type?: "1:1" | "group"; status?: "scheduled" | "completed" | "cancelled" };

export default function DayCalendar() {
  const [view, setView] = useState<"day" | "week">("day");

  const daySessions: Session[] = useMemo(
    () => [
      { id: "1", time: "08:00", client: "Иван П.", type: "1:1", status: "scheduled" },
      { id: "2", time: "10:30", client: "Мария К.", type: "1:1", status: "scheduled" },
      { id: "3", time: "12:00", client: "Группа #12", type: "group", status: "scheduled" },
      { id: "4", time: "17:30", client: "Олег С.", type: "1:1", status: "scheduled" },
    ],
    []
  );

  const week: { day: string; items: Session[] }[] = useMemo(
    () => [
      { day: "Пн", items: daySessions.slice(0, 2) },
      { day: "Вт", items: [] },
      { day: "Ср", items: daySessions.slice(2) },
      { day: "Чт", items: [] },
      { day: "Пт", items: daySessions.slice(0, 1) },
      { day: "Сб", items: [] },
      { day: "Вс", items: [] },
    ],
    [daySessions]
  );

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-1 text-sm">
        <button onClick={() => setView("day")} className={`rounded-md px-3 py-1.5 ${view === "day" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}>День</button>
        <button onClick={() => setView("week")} className={`rounded-md px-3 py-1.5 ${view === "week" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}>Неделя</button>
      </div>

      {view === "day" ? (
        <div className="space-y-2">
          {daySessions.length === 0 ? (
            <EmptyState title="На сегодня ничего не запланировано" subtitle="Нажмите ‘Создать тренировку’ вверху" />
          ) : (
            daySessions.map((s) => <MiniSessionCard key={s.id} session={s} />)
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {week.map((col, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="mb-2 text-sm font-semibold text-slate-200">{col.day}</div>
              {col.items.length === 0 ? (
                <div className="text-xs text-slate-500">Нет тренировок</div>
              ) : (
                <div className="space-y-2">{col.items.map((s) => <MiniSessionCard key={s.id} session={s} />)}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-800 p-6 text-center">
      <div className="text-sm text-slate-300">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-slate-500">{subtitle}</div> : null}
    </div>
  );
}