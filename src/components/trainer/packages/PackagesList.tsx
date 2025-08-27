"use client";
import { useEffect, useState } from "react";

export default function PackagesList({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    const refetch = async () => {
      const res = await fetch("/api/trainer/packages");
      const data = await res.json();
      if (res.ok) setItems(data.items);
    };
    const handler = () => refetch();
    window.addEventListener("packages:refresh", handler);
    return () => window.removeEventListener("packages:refresh", handler);
  }, []);

  async function remove(id: string) {
    if (!confirm("Удалить блок?")) return;
    const res = await fetch(`/api/trainer/packages/${id}`, { method: "DELETE" });
    if (res.ok) setItems((s) => s.filter((i) => i.id !== id));
  }

  if (!items?.length) return <div className="text-sm text-slate-400">Пока нет блоков</div>;

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {items.map((p) => (
                <div key={p.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <div className="mb-1 text-sm font-semibold text-slate-100">{p.title}</div>
                    <div className="text-xs text-slate-400">{p.sessionsCount} занятий • Срок {p.validityDays} дн.</div>
                    <div className="mt-2 text-base font-semibold text-slate-100">
                        {(p.priceCents / 100).toFixed(2)} {p.currency}
                    </div>
                    <div className="text-xs text-slate-500">
                        ≈ {((p.priceCents / 100) / p.sessionsCount).toFixed(2)} {p.currency} / занятие
                    </div>

          <div className="mt-3 flex justify-end">
            <button onClick={() => remove(p.id)} className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800">Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
}