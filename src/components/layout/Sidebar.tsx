"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const items = [
  { href: "/trainer", label: "Календарь" },
  { href: "/trainer/payments", label: "Оплаты" },
  { href: "/trainer/clients", label: "Клиенты" },
  { href: "/trainer/reports", label: "Отчёты" },
  { href: "/trainer/templates", label: "Шаблоны" },
];

export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-dvh flex-col gap-4 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Logo size={16} />
          <div>
            <div className="text-sm font-semibold">FitCoach</div>
            <div className="text-[11px] text-slate-400">Панель тренера</div>
          </div>
        </div>
        {/* close (моб.) */}
        <button aria-label="Закрыть меню" onClick={onClose} className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800 lg:hidden">×</button>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className={`rounded-lg px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                active ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
        <div className="mt-auto text-xs text-slate-500">v0.1.0</div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">{content}</div>
      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-slate-800 bg-slate-950 shadow-xl">{content}</div>
        </div>
      )}
    </>
  );
}