async function getNote(noteId: string) {
  const res = await fetch(
    `http://localhost:8090/api/collections/notes/records/${noteId}`,
    {
      next: { revalidate: 10 }, // Incremental Static Regeneration
      // regenerate the page after 10 seconds
    }
  );

  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  return (
    <section className="mt-10 px-4">
      <p className="text-sm text-gray-600">Note id: {params.id}</p>

      <div className="space-y-4 mt-10">
        <h2 className="text-2xl font-bold">{note?.title}</h2>
        <p className="text-base text-gray-600">{note?.content}</p>
      </div>
    </section>
  );
}
