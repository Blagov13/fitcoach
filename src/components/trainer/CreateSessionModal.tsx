"use client";
import { useEffect, useState } from "react";

export default function CreateSessionModal() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  // поля формы
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-open-create]')) setOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const res = await fetch("/api/trainer/clients");
      const data = await res.json();
      if (res.ok) setClients(data.clients);
    })();
  }, [open]);

  async function submit() {
    if (!clientId) return alert("Выберите клиента");
    setSaving(true);
    const res = await fetch("/api/trainer/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, date, startTime, endTime }),
    });
    setSaving(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return alert(data?.error || "Не удалось создать");
    setOpen(false);
    // мягко обновим календарь
    window.location.reload();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="absolute left-1/2 top-1/2 w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-2xl">
        <h3 className="mb-3 text-lg font-semibold">Создать тренировку</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Клиент">
            <select className="inp" value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">— Выберите клиента —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.lastName} {c.firstName}</option>
              ))}
            </select>
          </Field>
          <Field label="Дата"><input type="date" className="inp" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
          <Field label="Начало"><input type="time" className="inp" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></Field>
          <Field label="Окончание"><input type="time" className="inp" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></Field>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800" onClick={() => setOpen(false)}>Отмена</button>
          <button className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-white disabled:opacity-60" disabled={saving} onClick={submit}>{saving ? "Создаю…" : "Создать"}</button>
        </div>

        <style jsx>{`
          .inp { @apply w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none focus:border-slate-500; }
        `}</style>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm">
      <div className="mb-1 text-slate-300">{label}</div>
      {children}
    </label>
  );
}