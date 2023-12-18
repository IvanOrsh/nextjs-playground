import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <main className="mx-auto">
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>

      <ul className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user?.name!}
            image={user?.image || "/avatar.svg"}
          />
        ))}
      </ul>
    </main>
  );
}

function UserCard({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) {
  return (
    <Link
      href={`/users/${id}`}
      className="hover:outline hover:outline-2 hover:outline-blue-500"
    >
      <article className="p-4 bg-white border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image height={38} width={38} src={image} alt="user image" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            <p className="text-sm text-gray-500 truncate">{id}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
