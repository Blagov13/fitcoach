import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ClientProfileView from "@/components/trainer/clients/ClientProfileView";

export default async function ClientPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = session.user as any;

  const client = await prisma.clientProfile.findFirst({
    where: { id: params.id, trainerId: user.id },
    include: {
      measurements: { orderBy: { takenAt: "desc" }, take: 2 },
      photos: { orderBy: { takenAt: "desc" }, take: 3 },
    },
  });
  if (!client) return notFound();

  return (
    <main className="p-4 space-y-4">
      <ClientProfileView client={client} />
    </main>
  );
}