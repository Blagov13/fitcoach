import Link from "next/link";

export default function ClientCard({ client }: { client: any }) {
    const initials = `${client.lastName?.[0] ?? "?"}${client.firstName?.[0] ?? "?"}`;
    const activePurchase = client.purchases?.[0];
    const nextSession = client.sessions?.[0];

    return (
        <Link href={`/trainer/clients/${client.id}`} className="block rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-slate-700">
            <div className="flex items-center gap-3">
                {client.avatarUrl ? (
                    <img src={client.avatarUrl} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-slate-100">{initials}</div>
                )}
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-slate-100">{client.lastName} {client.firstName}</div>
                    <div className="text-xs text-slate-400">
                        Активный абонемент: {activePurchase ? `${activePurchase.package.title} • осталось ${activePurchase.sessionsTotal - activePurchase.sessionsUsed}` : "—"}
                    </div>
                    <div className="text-xs text-slate-500">
                        Ближайшая запись: {nextSession ? new Date(nextSession.startsAt).toLocaleDateString() : "—"}
                    </div>
                </div>
            </div>
        </Link>
    );
}