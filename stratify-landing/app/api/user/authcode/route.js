import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { authCode } = await request.json();
  if (!authCode) return NextResponse.json({ error: "Auth code required" }, { status: 400 });

  await prisma.user.update({
    where: { id: user.id },
    data: { authCode },
  });

  return NextResponse.json({ success: true, message: "Auth code saved. Matches will sync shortly." });
}
