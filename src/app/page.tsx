import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect("/api/auth/signin");
  // }
  return (
    <section className="mt-10 px-4">
      <h1 className="text-3xl font-bold underline text-center">Home Page</h1>
      <p className="text-base text-gray-600">Some content</p>
    </section>
  );
}
