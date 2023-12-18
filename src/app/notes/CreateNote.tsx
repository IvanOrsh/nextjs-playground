"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const create = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle("");
    setContent("");

    router.refresh();
  };

  return (
    <section className="mt-10 px-4">
      <form onSubmit={create}>
        <h3 className="text-3xl font-bold underline text-center">
          Create Note
        </h3>
        <label htmlFor="title">Title:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
        />

        <label htmlFor="content">Content:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content"
          rows={3}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create Note
        </button>
      </form>
    </section>
  );
}
