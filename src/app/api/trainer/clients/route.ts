import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = session.user as any;
  if (user.role !== "trainer") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const clients = await prisma.clientProfile.findMany({
    where: { trainerId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      status: true,
      avatarUrl: true,
      // TODO: подтягивать ближайшую сессию и активный блок (когда появятся)
    },
  });

  return NextResponse.json({ clients });
}