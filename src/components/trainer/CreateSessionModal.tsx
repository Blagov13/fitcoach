"use client";
import { useEffect, useState } from "react";

export default function CreateSessionModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-open-create]')) setOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className="absolute left-1/2 top-1/2 w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700 bg-slate-950 p-4 shadow-2xl">
        <h3 className="mb-3 text-lg font-semibold">Создать тренировку</h3>
        <form className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Клиент" placeholder="Начните вводить имя" />
          <Field label="Дата" type="date" />
          <Field label="Начало" type="time" />
          <Field label="Окончание" type="time" />
          <div className="sm:col-span-2 flex justify-end gap-2 pt-1">
            <button type="button" className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800" onClick={() => setOpen(false)}>Отмена</button>
            <button type="button" className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-white">Создать</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="text-sm">
      <div className="mb-1 text-slate-300">{label}</div>
      <input type={type} placeholder={placeholder} className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none focus:border-slate-500" />
    </label>
  );
}