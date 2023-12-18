"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <>...</>;
  }

  console.log("session", session);
  console.log("status", status);

  if (status === "authenticated") {
    return (
      <div className="flex gap-1 items-center">
        <Link href={"/dashboard"}>
          <Image
            src={session.user?.image ?? "/avatar.svg"}
            width={32}
            height={32}
            alt="Your Name"
          />
        </Link>
        <SignOutButton />
      </div>
    );
  }

  return (
    <button
      className="bg-blue-500 px-4 py-1.5 rounded text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      className="bg-blue-500 px-4 py-1.5 rounded text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
