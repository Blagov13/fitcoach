"use client";
import { useEffect, useState } from "react";
import MiniSessionCard from "./MiniSessionCard";

export default function DayCalendar() {
  const [view, setView] = useState<"day" | "week">("day");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const today = new Date();
      const day = today.toISOString().split("T")[0];
      const res = await fetch(`/api/trainer/sessions?day=${day}`);
      const data = await res.json();
      setItems(res.ok ? data.items : []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-1 text-sm">
        <button onClick={() => setView("day")} className={`rounded-md px-3 py-1.5 ${view === "day" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}>День</button>
        <button onClick={() => setView("week")} className={`rounded-md px-3 py-1.5 ${view === "week" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}>Неделя</button>
      </div>

      {view === "day" ? (
        <div className="space-y-2">
          {loading && <div className="rounded-lg border border-slate-800 p-6 text-center text-sm text-slate-400">Загружаем…</div>}
          {!loading && items.length === 0 && (
            <div className="rounded-lg border border-slate-800 p-6 text-center text-sm text-slate-400">На сегодня ничего не запланировано</div>
          )}
          {!loading && items.map((s) => (
            <MiniSessionCard
              key={s.id}
              session={{
                id: s.id,
                time: new Date(s.startsAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                client: `${s.client.lastName ?? ""} ${s.client.firstName ?? ""}`.trim() || "Клиент",
                type: s.type,
                status: s.status,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm text-slate-400">Неделя: добавим через агрегирующий запрос после базовой проверки дня.</div>
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