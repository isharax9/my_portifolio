import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { id } });
  } catch {
    // DB not connected
  }
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        Edit Post
      </h1>
      <BlogForm
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverUrl: post.coverUrl ?? "",
          tags: post.tags,
          status: post.status,
        }}
      />
    </div>
  );
}
