"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  // TODO: refactor with server actions!

  const follow = async () => {
    setIsFetching(true);

    const res = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsFetching(false);

    console.log(res);

    startTransition(() => {
      // Refresh the current route:
      // - makes a new request to the server for the route
      // - re-fetchers data requests and re-renders Server Components
      // - sends the updated React Server Component payload to the client
      // - the client merges the payload without losing unaffectd
      // client-side React state or browser state
      router.refresh();
    });
  };

  const unfollow = async () => {
    setIsFetching(true);

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });

    setIsFetching(false);

    console.log(res);

    startTransition(() => {
      router.refresh();
    });
  };

  if (isFollowing) {
    return (
      <button
        className="bg-blue-500 px-4 py-1.5 rounded text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
        onClick={unfollow}
      >
        {!isMutating ? "Unfollow" : "..."}
      </button>
    );
  }

  return (
    <button
      className="bg-blue-500 px-4 py-1.5 rounded text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
      onClick={follow}
    >
      {!isMutating ? "Follow" : "..."}
    </button>
  );
}
