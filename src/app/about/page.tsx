import { Metadata } from "next";

export const dynamic = "force-static"; // not needed at all

export const metadata: Metadata = {
  title: "About",
  description: "About NextSpace",
};

export default async function AboutPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      <p className="mt-4 text-lg text-gray-600 ">
        We are a social media company!
      </p>
    </main>
  );
}
