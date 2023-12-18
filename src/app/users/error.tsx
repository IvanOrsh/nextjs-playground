"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl mt-10 px-4 sm:px-6 lg:max-w-7xl">
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong!
      </h1>
      <button
        className="bg-blue-500 px-4 py-1.5 rounded text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
