import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PackageForm from "@/components/trainer/packages/PackageForm";
import PackagesList from "@/components/trainer/packages/PackagesList";

export default async function PackagesPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null; // тренерский layout уже редиректит неавторизованных
  const user = session.user as any;

  const items = await prisma.package.findMany({
    where: { trainerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-4 space-y-4">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h1 className="mb-3 text-xl font-semibold">Блоки занятий</h1>
        <p className="mb-4 text-sm text-slate-400">Создавайте тарифы на персональные тренировки. Клиенты смогут покупать блоки, а система будет учитывать оставшиеся занятия и срок действия.</p>
        <PackageForm />
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h2 className="mb-3 text-lg font-semibold">Мои блоки</h2>
        <PackagesList initialItems={items} />
      </section>
    </main>
  );
}