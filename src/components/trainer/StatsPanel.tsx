"use client";
import { useMemo } from "react";
import { fmtCurrency } from "@/lib/format";

export default function StatsPanel() {
  const stats = useMemo(() => ({ monthSessions: 22, monthRevenue: 1320, avgPerDay: 1.5, cancelled: 3 }), []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Аналитика (месяц)</h3>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Проведено" value={`${stats.monthSessions}`} suffix="зан." />
        <Stat label="Доход" value={fmtCurrency(stats.monthRevenue)} />
        <Stat label="В день" value={`${stats.avgPerDay}`} suffix="в средн." />
        <Stat label="Отмены" value={`${stats.cancelled}`} />
      </div>
      <div className="mt-3 text-xs text-slate-500">Данные временные. Подключим БД на следующем шаге.</div>
    </div>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-base font-semibold text-slate-100">{value}{suffix ? ` ${suffix}` : ''}</div>
    </div>
  );
}