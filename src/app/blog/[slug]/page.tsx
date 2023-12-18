import type { Post } from "@/entities/post";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/content");

  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: Props) {
  const res = await fetch("http://localhost:3000/api/content");
  const posts: Post[] = await res.json();

  const post = posts.find((post) => post.slug === props.params.slug);

  const { slug } = props.params;

  if (!post) {
    return (
      <main>
        <h1>Post not found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
