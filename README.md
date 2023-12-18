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

### basics - routing

1. file system routing
2. component renders ui for that route
3. `<Link href={`/about`}>About</Link>` - example.com/about - Faster client routing instead of full page reload

additionally, we can use `useRouter` from `next/router` (programmatic routing):

```ts
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const someEvent = () => {
    router.push("/somePage");
    router.back();
    router.reload();
  };

  return <div></div>;
}
```

4. dynamic routes: `https://example.com/hello/:id` -> `hello/[id]`, available as params prop:

**on server components**:

```ts
interface Props {
  params: {
    id: string;
  };
}

export default async function Home({ params }: Props) {
  const res = await fetch(`https://example.com/hello/${params.id}`);

  return <div>{params.id}</div>;
}
```

**on client components** (using `useParams` hook):

```ts
"use client";

import { useParams } from "next/navigation";

export default function Home() {
  const { id } = useParams();

  return <div>{id}</div>;
}
```

**catch all**: `/hello/:id/:id/:id` -> `/hello/[...id]`

5. route group `(stuff)` - no affect on actual url structure
6. parallel routes: `@pro`, `@basic`:

```ts
export default function Layout({ children, pro, basic }: Props) {
  return (
    <>
      {children}
      // named slots
      {pro}
      {basic}
    </>
  );
}
```

7. intercepting routes: `(..)cart`

```txt
[feed]
|
|------(..)photo/[id]
|       |--page.tsx
|----layout.tsx

photo/[id]
|
|---page.tsx
|---layout.tsx
```

### basics - route handlers

Route files: `hello/route.ts` (routing primitive), CANNOT be used in the same directory as a page

```ts
// corresponds to http methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
export async function GET() {
  return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
  const data = await request.json();

  return new Response("...");
}
```

In addition, next.js extends Request/Response API with:

```ts
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const url = request.nextUrl;

  return NextResponse.json({ url });
}
```

### basics - layouts

1. root layout by default
2. can be nested: `root layout > dashboard layout > page`
3. we can fetch from layouts! (can be useful)
4. layouts can be combined with route groups
5. instead of `layout.tsx`, we can use `template.tsx` - re-mount on route changes

### basics - rendering - seo

1. by default - server component
2. every page exports `dynamic` constant, `revalidate`:

```ts
export const dynamic = "auto"; // "force-dynamic", "force-static"
// force-dynamic - always fetch latest data
// force-static - like getStaticProps

export const revalidate = 420; // isr - incremental static regeneration

export default function Home() {
  return <main></main>;
}
```

3. export metadata variable:

```ts
export const metadata = {
  title: "Hi the title!",
  description: "Hi, I'm the description!",
};
```

```ts
export async function generateMetadata({ params }: Props) {
  return {
    title: "...",
  };
}
```

### basics - data fetching

```ts
export default async function Home() {
  const a = await prisma.getMany();

  const b = await firebase.getDoc();

  const c = await fetch("....");
}
```

also, next.js extends fetch api to provide automatic deduping, and cache control:

```ts
const a = await fetch("...", { cache: "no-store" }); // no-store for dynamic data

// also revalidate option

const a = await fetch("...", { revalidate: 420 });
```

### basics - streaming

TO BE ADDED LATER...

### auth - setup

1. `npm i --save next-auth`

2. create catch all api route: `api/auth[...nextauth]`

3. env: `openssl rand -base64 32`

```.env
GITHUB_ID=Iv1.fffffffff
GITHUB_SECRET=0342ffffffffff
NEXTAUTH_SECRET=J+RqR1Yj3eBdipDtgNOXqCtv1i5NmE8Axitq!ThR43k=
```

4. get credentials from github: `https://github.com/settings/developers` \_> create a new application...
   set callback url: `http://localhost:3000/api/auth/callback/github`
   (you should get github id and github secret token)

5. navigate to `localhost:3000/api/auth/signin`

### auth - current user

1. AuthProvider.tsx

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

2. AuthCheck.tsx (client side):

```tsx
"use client";

import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function AuthCheck({ children }: PropsWithChildren) {
  const { data: session, status } = useSession();

  console.log(`[authcheck] status: ${status}`);

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
```

3. we can also get access to session on server side:

```ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  return NextResponse.json(posts);
}
```

### auth - buttons

buttons

```tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <>...</>;
  }

  if (status === "authenticated") {
    <Link href={"/dashboard"}>
      <Image
        src={session.user?.image ?? "/avatar.svg"}
        width={32}
        height={32}
        alt="Your Name"
      />
    </Link>;
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
```
