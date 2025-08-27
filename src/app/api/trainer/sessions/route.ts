import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay } from "@/lib/time";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const dayStr = searchParams.get("day");
  const day = dayStr ? new Date(dayStr) : new Date();

  const items = await prisma.session.findMany({
    where: {
      trainerId: user.id,
      startsAt: { gte: startOfDay(day), lte: endOfDay(day) },
    },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      startsAt: true,
      endsAt: true,
      type: true,
      status: true,
      client: { select: { firstName: true, lastName: true } },
    },
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

  const { clientId, date, startTime, endTime, type = "1:1" } = body;
  if (!clientId || !date || !startTime || !endTime) {
    return NextResponse.json({ error: "Укажите клиента, дату и время" }, { status: 400 });
  }

  // Собираем Date из даты и времени (локально)
  const startsAt = new Date(`${date}T${startTime}:00`);
  const endsAt = new Date(`${date}T${endTime}:00`);
  if (!(startsAt < endsAt)) return NextResponse.json({ error: "Время окончания должно быть больше начала" }, { status: 400 });

  // Примитивная проверка пересечений (по тренеру)
  const overlap = await prisma.session.findFirst({
    where: {
      trainerId: user.id,
      OR: [
        { startsAt: { lt: endsAt }, endsAt: { gt: startsAt } },
      ],
    },
  });
  if (overlap) return NextResponse.json({ error: "Пересечение с другой тренировкой" }, { status: 409 });

  const created = await prisma.session.create({
    data: {
      trainerId: user.id,
      clientId,
      startsAt,
      endsAt,
      type,
    },
    select: { id: true },
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}