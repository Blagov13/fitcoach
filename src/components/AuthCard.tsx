"use client";
import { useState } from "react";
import Logo from "./Logo";
import { signIn } from "next-auth/react";

export default function AuthCard() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <div className="w-full max-w-md rounded-2xl bg-slate-900/70 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur">
      <div className="mb-6 flex items-center gap-3">
        <Logo size={22} />
        <div>
          <h1 className="text-xl font-semibold">FitCoach</h1>
          <p className="text-xs text-slate-400">Войдите или создайте аккаунт</p>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-slate-800 p-1 text-sm">
        <button onClick={() => setMode("login")} className={`rounded-md px-3 py-2 transition ${mode === "login" ? "bg-slate-200 text-slate-900" : "text-slate-300 hover:text-white"}`}>Вход</button>
        <button onClick={() => setMode("register")} className={`rounded-md px-3 py-2 transition ${mode === "register" ? "bg-slate-200 text-slate-900" : "text-slate-300 hover:text-white"}`}>Регистрация</button>
      </div>

      {mode === "login" ? <LoginForm /> : <RegisterForm />}

      <p className="mt-6 text-center text-xs text-slate-500">Нажимая «{mode === "login" ? "Войти" : "Создать"}», вы соглашаетесь с условиями сервиса</p>
    </div>
  );
}

function Field({ label, type = "text", name, placeholder }: { label: string; type?: string; name: string; placeholder?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-300">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-0 transition placeholder:text-slate-500 focus:border-slate-500" />
    </label>
  );
}

function LoginForm() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) alert("Ошибка входа: " + res.error);
    else window.location.href = "/dashboard"; // позже сделаем редирект по роли
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <Field label="Пароль" name="password" type="password" placeholder="••••••••" />
      <button type="submit" className="w-full rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-900 transition hover:bg-white">Войти</button>
    </form>
  );
}

function RegisterForm() {
  const [role, setRole] = useState<"client" | "trainer">("client");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      role,
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    };

    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      return alert(data?.error ?? "Не удалось создать аккаунт");
    }

    // Автовход
    const signin = await signIn("credentials", { email: payload.email, password: payload.password, redirect: false });
    setLoading(false);
    if (signin?.error) alert("Аккаунт создан, но вход не выполнен: " + signin.error);
    else window.location.href = "/dashboard";
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      {/* Роль */}
      <div className="text-sm">
        <span className="mb-1 block text-slate-300">Роль</span>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setRole("client")} className={`rounded-md px-3 py-2 transition ${role === "client" ? "bg-slate-200 text-slate-900" : "bg-slate-950/60 text-slate-300 ring-1 ring-slate-700 hover:text-white"}`}>Клиент</button>
          <button type="button" onClick={() => setRole("trainer")} className={`rounded-md px-3 py-2 transition ${role === "trainer" ? "bg-slate-200 text-slate-900" : "bg-slate-950/60 text-slate-300 ring-1 ring-slate-700 hover:text-white"}`}>Тренер</button>
        </div>
        <input type="hidden" name="role" value={role} />
      </div>

      <Field label="Имя" name="name" placeholder="Иван" />
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <Field label="Пароль" name="password" type="password" placeholder="минимум 8 символов" />

      <button type="submit" disabled={loading} className="w-full rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-900 transition hover:bg-white disabled:opacity-60">
        {loading ? "Создаю…" : "Создать аккаунт"}
      </button>

      <p className="text-xs text-slate-500">Вы выбрали роль: <span className="font-medium text-slate-300">{role === "trainer" ? "Тренер" : "Клиент"}</span></p>
    </form>
  );
}