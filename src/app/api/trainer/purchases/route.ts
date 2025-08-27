import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const { clientId, packageId, paidAt } = body;
  if (!clientId || !packageId) return NextResponse.json({ error: "Укажите клиента и блок" }, { status: 400 });

  const pkg = await prisma.package.findFirst({ where: { id: packageId, trainerId: user.id } });
  if (!pkg) return NextResponse.json({ error: "Блок не найден" }, { status: 404 });

  const paid = paidAt ? new Date(paidAt) : new Date();
  const expires = new Date(paid);
  expires.setDate(expires.getDate() + pkg.validityDays);

  const created = await prisma.purchase.create({
    data: {
      trainerId: user.id,
      clientId,
      packageId: pkg.id,
      sessionsTotal: pkg.sessionsCount,
      priceCents: pkg.priceCents,
      currency: pkg.currency,
      paidAt: paid,
      expiresAt: expires,
    },
  });
  return NextResponse.json({ id: created.id }, { status: 201 });
}