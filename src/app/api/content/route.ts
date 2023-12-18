import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

import type { Post } from "@/entities/post";

const posts: Post[] = [];

for (let i = 0; i < 20; i++) {
  posts.push({
    title: faker.lorem.sentence(),
    slug: faker.lorem.slug(),
    content: faker.lorem.paragraphs(),
  });
}

export async function GET() {
  return NextResponse.json(posts);
}
