import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: Request) {
  // authenticate request first
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  if (!currentUserEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: add validation

  const data = await req.json();
  data.age = Number(data.age);
  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data,
  });

  return NextResponse.json(user);
}
