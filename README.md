## nextjs playground

- using pocketbase as backend
- using nextjs for frontend

### basics - quick refresher

`about/` - example.com/about
`[slug]/` - example.com/{slug}
`(group)/` - example.com/??? - value inside brackets gonna be ignored by routing system (when we don't want to affect the actual route structure)

---

- `page.tsx` - the unique ui of a route
- `layout.tsx` - across multiple pages (we can even fetch data in layouts)
- `loading.tsx` - an opt. file used to create loading UI for a specific part of an app (automatically wraps a page or child layout in a **React Suspense Boundary**)
- `error.tsx` - it automatically wraps a page or child in a **React Error Boundary**
- `head.tsx` - `<head>` tag for a given route

---

- when using `fetch`, next will automatically cache the route, because the route segment is not dynamic, so we can:

```ts
async function getNotes() {
  const res = await fetch(
    "http://localhost:8090/api/collections/notes/records?page=1&perPage=30",
    { cache: "no-store" }
  );

  const data = await res.json();

  return data?.items as any[];
}
```

so, next.js will refetch the data on every request (very rough equivalent of `getServerSideProps`)

---

say, we are not using cache. Then what? What we can is:

```ts
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getNotes() {
  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getList(1, 30);

  return data?.items as any[];
}
```

---

```ts
async function getNote(noteId: string) {
  const res = await fetch(
    `http://localhost:8090/api/collections/notes/records/${noteId}`,
    {
      next: { revalidate: 10 }, // Incremental Static Regeneration
      // regenerate the page after 10 seconds
    }
  );
}
```

---

**Static generation**:

This replaces `getStaticPaths` with a simplified API.
`generateStaticParams` doesn't require any context parameters.
It runs at build time before the corresponding layouts or Pages are generated.
It will be called again during revalidation (ISR)

use case - blog page

`app/blog/[slug]/page.js`:

```js
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

---

refreshing page with router:

```ts
import { useRouter } from "next/navigation";

// ... inside component:
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
```
