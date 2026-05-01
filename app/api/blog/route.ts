import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogSchema } from "@/lib/validations/blog";

export async function GET() {
  const session = await auth();
  const posts = await prisma.blogPost.findMany({
    where: session ? {} : { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { status, ...rest } = parsed.data;
  const post = await prisma.blogPost.create({
    data: {
      ...rest,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });
  return NextResponse.json(post, { status: 201 });
}
