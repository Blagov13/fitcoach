import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ClientsTabs from "@/components/trainer/clients/ClientsTabs";

export default async function ClientsPage() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    const user = session.user as any;

    const now = new Date();
    const clients = await prisma.clientProfile.findMany({
        where: { trainerId: user.id },
        orderBy: [{ status: "asc" }, { lastName: "asc" }],
        include: {
            purchases: {
                where: { status: "active", expiresAt: { gt: now } },
                include: { package: true },
                orderBy: { paidAt: "desc" },
                take: 1,
            },
            sessions: {
                where: { startsAt: { gt: now }, status: "scheduled" },
                orderBy: { startsAt: "asc" },
                take: 1,
            },
        },
    });

    return (
        <main className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Клиенты</h1>
                <a href="/trainer/clients/new" className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-white">Новый клиент</a>
            </div>
            <ClientsTabs clients={clients} />
        </main>
    );
}