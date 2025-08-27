import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: { clientId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const now = new Date();
  const p = await prisma.purchase.findFirst({
    where: {
      trainerId: user.id,
      clientId: params.clientId,
      status: "active",
      expiresAt: { gt: now },
      sessionsUsed: { lt: prisma.purchase.fields.sessionsTotal },
    },
    orderBy: { paidAt: "desc" },
    include: { package: true },
  });
  if (!p) return NextResponse.json({});
  const remaining = p.sessionsTotal - p.sessionsUsed;
  return NextResponse.json({
    id: p.id,
    title: p.package.title,
    remaining,
    expiresAt: p.expiresAt,
  });
}