import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogSchema } from "@/lib/validations/blog";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const parsed = blogSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { status, ...rest } = parsed.data;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...rest,
      status,
      publishedAt:
        status === "PUBLISHED" && !existing?.publishedAt
          ? new Date()
          : existing?.publishedAt,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
