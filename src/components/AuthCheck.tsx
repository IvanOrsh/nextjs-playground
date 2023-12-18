"use client";

import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function AuthCheck({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();

  console.log(`[authcheck] status: ${status}`);

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
