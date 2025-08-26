"use client";
import { useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import { fmtDateLong } from "@/lib/format";

export default function Topbar({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const [today] = useState(() => new Date());
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        {/* Бургер — только на мобильном */}
        <button
          aria-label="Открыть меню"
          onClick={onOpenSidebar}
          className="mr-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 lg:hidden"
        >
          <span className="i">≡</span>
        </button>
        <div className="text-sm text-slate-300">{fmtDateLong(today)}</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500" data-open-create>
          Создать тренировку
        </button>
        <SignOutButton />
      </div>
    </header>
  );
}