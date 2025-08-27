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
  const { firstName, lastName, email, phone } = body;
  if (!firstName || !lastName) return NextResponse.json({ error: "Имя и фамилия обязательны" }, { status: 400 });

  const created = await prisma.clientProfile.create({
    data: {
      trainerId: user.id,
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: email ? String(email).trim() : null,
      phone: phone ? String(phone).trim() : null,
    },
  });

  return NextResponse.json({ id: created.id }, { status: 201 });
}