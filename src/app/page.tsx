"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AuthCard from "@/components/AuthCard";
import Spinner from "@/components/Spinner";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1600); // 1.6 сек сплэш
    return () => clearTimeout(t);
  }, []);

  if (showSplash) {
    return (
      <div className="grid h-dvh place-items-center">
        <div className="flex flex-col items-center gap-6">
          {/* Логотип */}
          <div className="relative h-28 w-28">
            <Image src="/logo.png" alt="Логотип" fill className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
          </div>
          <Spinner label="Загрузка" />
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <AuthCard />
    </main>
  );
}