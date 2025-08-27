"use client";
import { useMemo, useState } from "react";

export default function PackageForm() {
  const [title, setTitle] = useState("");
  const [sessions, setSessions] = useState<number | "">(10);
  const [price, setPrice] = useState<number | "">(300);
  const [currency, setCurrency] = useState("USD");
  const [validity, setValidity] = useState<number | "">(30);
  const [loading, setLoading] = useState(false);

  const pricePerSession = useMemo(() => {
    const s = Number(sessions);
    const p = Number(price);
    if (!s || !p) return null;
    return (p / s).toFixed(2);
  }, [sessions, price]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !sessions || !price) return alert("Заполните название, количество и цену");
    setLoading(true);
    const res = await fetch("/api/trainer/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, sessionsCount: sessions, price, currency, validityDays: validity }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return alert(data?.error || "Не удалось создать блок");
    // сброс формы и мягкое обновление списка через кастомное событие
    setTitle("");
    setSessions(10);
    setPrice(300);
    setCurrency("USD");
    setValidity(30);
    window.dispatchEvent(new CustomEvent("packages:refresh"));
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field label="Название">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="inp" placeholder="Например: Персональные 10 занятий" />
      </Field>

      <Field label="Кол-во занятий">
        <input type="number" min={1} value={sessions} onChange={(e) => setSessions(e.target.value === "" ? "" : Number(e.target.value))} className="inp" />
      </Field>

      <Field label="Цена блока">
        <div className="flex gap-2">
          <input type="number" min={1} step="0.01" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} className="inp flex-1" />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="inp w-28">
            <option>USD</option>
            <option>EUR</option>
            <option>RUB</option>
          </select>
        </div>
        {pricePerSession && (
          <div className="mt-1 text-xs text-slate-500">≈ {pricePerSession} {currency} за 1 тренировку</div>
        )}
      </Field>

      <Field label="Срок действия (дней)">
        <input type="number" min={1} value={validity} onChange={(e) => setValidity(e.target.value === "" ? "" : Number(e.target.value))} className="inp" />
      </Field>

      <div className="md:col-span-2 flex justify-end gap-2 pt-2">
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Создаю…" : "Создать блок"}</button>
      </div>

      {/* локальные стили */}
      <style jsx>{`
        .inp { @apply w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none focus:border-slate-500; }
        .btn-primary { @apply rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white disabled:opacity-60; }
      `}</style>
    </form>
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