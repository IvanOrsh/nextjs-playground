import Link from "next/link";

import type { Post } from "@/entities/post";

/**
 * Fetches posts from the API.
 *
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 * @throws {Error} If the request to fetch posts fails.
 */
async function getPosts(): Promise<Post[]> {
  const res = await fetch("http:localhost:3000/api/content");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPostsPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Blog Posts</h1>

      <ul className="mt-8 space-y-2">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="hover:outline hover:outline-2 hover:outline-blue-500"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
