import { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return {
    title: `User profile of ${user?.name}`,
  };
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <main className="mx-auto max-w-3xl mt-10 px-4 sm:px-6 lg:max-w-7xl space-y-4">
      <h1>User Page: {params.id}</h1>

      <Image
        width={200}
        height={200}
        src={user?.image || "/avatar.svg"}
        alt="user image"
      />

      <p>{user?.name}</p>
    </main>
  );
}
