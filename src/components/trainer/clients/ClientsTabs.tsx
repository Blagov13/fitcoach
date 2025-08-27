"use client";
import { useMemo, useState } from "react";
import ClientCard from "./ClientCard";

export default function ClientsTabs({ clients }: { clients: any[] }) {
  const [tab, setTab] = useState<"active" | "all">("active");

  const active = useMemo(() => clients.filter((c) => c.status === "active"), [clients]);
  const all = clients;

  const data = tab === "active" ? active : all;

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border border-slate-800 bg-slate-950 p-1 text-sm">
        <button onClick={() => setTab("active")} className={`rounded-md px-3 py-1.5 ${tab === "active" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}>Действующие</button>
        <button onClick={() => setTab("all")} className={`rounded-md px-3 py-1.5 ${tab === "all" ? "bg-slate-800 text-white" : "text-slate-300 hover:text-white"}`}>Вся база</button>
      </div>

      {data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-800 p-6 text-center text-sm text-slate-400">Нет клиентов</div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data.map((c) => (<ClientCard key={c.id} client={c} />))}
        </div>
      )}
    </div>
  );
}