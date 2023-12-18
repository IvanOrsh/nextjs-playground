"use client";

export function ProfileForm({ user }: any) {
  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // zod validation goes here

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      image: formData.get("image"),
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="py-4 flex flex-col space-y-2">
      <h2>Edit Your Profile</h2>
      <form onSubmit={updateUser} className="grid grid-cols-8 gap-1 space-y-2">
        <label className="py-4" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user?.name ?? ""}
          className="col-span-7"
        />

        <label className="py-4" htmlFor="bio">
          Bio
        </label>
        <textarea
          name="bio"
          id="bio"
          cols={3}
          rows={3}
          className="col-span-7"
        ></textarea>

        <label className="py-4" htmlFor="age">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          defaultValue={user?.age ?? 0}
          className="col-span-7"
        />

        <label className="py-4" htmlFor="image">
          Profile Image
        </label>
        <input
          type="text"
          id="image"
          name="image"
          defaultValue={user?.image ?? ""}
          className="col-span-7"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 col-span-4"
        >
          Save
        </button>
      </form>
    </div>
  );
}
