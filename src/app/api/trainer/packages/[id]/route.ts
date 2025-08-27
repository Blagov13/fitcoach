import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // удаляем только свой пакет
  const found = await prisma.package.findFirst({ where: { id: params.id, trainerId: user.id } });
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.package.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}