import Link from "next/link";
import PocketBase from "pocketbase";
import CreateNote from "./CreateNote";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getNotes() {
  // const res = await fetch(
  //   "http://localhost:8090/api/collections/notes/records?page=1&perPage=30",
  //   { cache: "no-store" }
  // );

  // const data = await res.json();

  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getList(1, 30);

  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  if (!notes) {
    return null;
  }

  if (notes.length === 0) {
    return (
      <section className="mt-10 px-4">
        <h1 className="text-3xl font-bold underline text-center">
          No notes yet
        </h1>
      </section>
    );
  }

  return (
    <section className="mt-10 px-4">
      <h1 className="text-3xl font-bold ">Some Fetched Notes:</h1>

      <table className="mt-10">
        <thead className="border-b border-gray-600">
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {notes?.map((note) => {
            return (
              <tr key={note.id}>
                <td>
                  <Link
                    key={note.id}
                    href={`/notes/${note.id}`}
                    className="text-blue-600 block hover:text-blue-800 hover:outline hover:outline-1 hover:outline-blue-600 p-2"
                  >
                    {note.title}
                  </Link>
                </td>
                <td>{note.content}</td>
                <td>{note.created}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="max-w-xl">
        <CreateNote />
      </div>
    </section>
  );
}
