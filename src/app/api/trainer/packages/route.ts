import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const items = await prisma.package.findMany({
    where: { trainerId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = session.user as any;
    if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  
    const { title, sessionsCount, price, currency = "USD", validityDays = 30 } = body;
    if (!title || !sessionsCount || price == null) {
      return NextResponse.json({ error: "Заполните название, количество и цену" }, { status: 400 });
    }
    if (Number(sessionsCount) <= 0) return NextResponse.json({ error: "Количество занятий должно быть > 0" }, { status: 400 });
  
    const priceNumber = Number(price);
    if (!Number.isFinite(priceNumber) || priceNumber <= 0) {
      return NextResponse.json({ error: "Цена должна быть > 0" }, { status: 400 });
    }
    const priceCents = Math.round(priceNumber * 100);
  
    const created = await prisma.package.create({
      data: {
        trainerId: user.id,
        title: String(title).trim(),
        sessionsCount: Number(sessionsCount),
        priceCents,
        currency,
        validityDays: Number(validityDays),
      },
    });
    return NextResponse.json({ item: created }, { status: 201 });
  }
  