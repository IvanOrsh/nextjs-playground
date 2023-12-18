import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUserEmail = session.user?.email!;
  const { targetUserId } = await req.json();

  const currentUserId = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
    select: {
      id: true,
    },
  });

  if (!currentUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId.id,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUserEmail = session.user?.email!;
  const targetUserId = req.nextUrl.searchParams.get("targetUserId");

  if (!currentUserEmail || !targetUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUserId = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
    select: {
      id: true,
    },
  });

  if (!currentUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId.id,
        followingId: targetUserId,
      },
    },
  });

  return NextResponse.json(record);
}
