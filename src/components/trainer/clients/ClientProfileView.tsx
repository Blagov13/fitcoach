"use client";
import { useMemo } from "react";
import HumanFigure from "./HumanFigure";

export default function ClientProfileView({ client }: { client: any }) {
  const latest = client.measurements?.[0];
  const initial = client.measurements?.[client.measurements.length - 1];

  const deltas = useMemo(() => {
    if (!latest || !initial) return null;
    const diff = (a?: number | null, b?: number | null) => (a != null && b != null ? (a - b).toFixed(1) : null);
    return {
      chest: diff(latest.chest, initial.chest),
      waist: diff(latest.waist, initial.waist),
      hips: diff(latest.hips, initial.hips),
      bicepsR: diff(latest.bicepsR, initial.bicepsR),
      thighR: diff(latest.thighR, initial.thighR),
      weightKg: diff(latest.weightKg, initial.weightKg),
    } as const;
  }, [latest, initial]);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_1fr]">
      {/* Левая часть — профиль и фото */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-4 flex items-center gap-3">
          {client.avatarUrl ? (
            <img src={client.avatarUrl} alt="avatar" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-lg font-semibold text-slate-100">
              {(client.lastName?.[0] ?? "?")}{(client.firstName?.[0] ?? "?")}
            </div>
          )}
          <div>
            <div className="text-lg font-semibold text-slate-100">{client.lastName} {client.firstName}</div>
            <div className="text-xs text-slate-400">Статус: {client.status}</div>
          </div>
        </div>

        {/* Фото: заглушки/превью */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PhotoBox title="Профиль (аватар)" url={client.photos?.find((p: any) => p.kind === "avatar")?.url} />
          <PhotoBox title="Фото ДО" url={client.photos?.find((p: any) => p.kind === "before")?.url} />
          <PhotoBox title="Последние измерения" url={client.photos?.find((p: any) => p.kind === "progress")?.url} />
        </div>
        <div className="mt-2 text-xs text-slate-500">Загрузка фото появится на следующем шаге.</div>
      </section>

      {/* Правая часть — макет тела с зонами замеров */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="mb-3 text-lg font-semibold">Замеры</h3>
        <HumanFigure latest={latest} deltas={deltas} />
      </section>
    </div>
  );
}

function PhotoBox({ title, url }: { title: string; url?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="mb-2 text-xs text-slate-400">{title}</div>
      {url ? (
        <img src={url} alt={title} className="aspect-[4/5] w-full rounded-lg object-cover" />
      ) : (
        <div className="aspect-[4/5] w-full rounded-lg border border-dashed border-slate-800 bg-slate-950/40" />
      )}
    </div>
  );
}