"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <section className="mt-10 px-4">
      <h1 className="text-3xl font-bold underline text-center">Error</h1>
      <p className="text-base text-gray-600">{error.message}</p>
    </section>
  );
}
