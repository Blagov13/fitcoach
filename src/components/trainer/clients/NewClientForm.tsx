"use client";
import { useState } from "react";

export default function NewClientForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/trainer/clients/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = "/trainer/clients";
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Не удалось создать клиента");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <Field label="Имя"><input className="inp" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></Field>
      <Field label="Фамилия"><input className="inp" value={lastName} onChange={(e) => setLastName(e.target.value)} /></Field>
      <Field label="Email"><input className="inp" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
      <Field label="Телефон"><input className="inp" value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
      <div className="md:col-span-2 flex justify-end"><button disabled={loading} className="btn">{loading ? "Создаю…" : "Создать"}</button></div>
      <style jsx>{`
        .inp { @apply w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none focus:border-slate-500; }
        .btn { @apply rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white disabled:opacity-60; }
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