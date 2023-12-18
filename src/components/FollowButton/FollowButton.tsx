import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FollowClient from "./FollowClient";

interface Props {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const currentUserId = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
    },
  });

  if (!currentUserId) {
    return null;
  }

  const isFollowing = await prisma.follows.findFirst({
    where: {
      followerId: currentUserId.id,
      followingId: targetUserId,
    },
  });

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}
