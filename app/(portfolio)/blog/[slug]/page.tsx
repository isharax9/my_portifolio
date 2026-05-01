import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof prisma.blogPost.findUnique>> = null;
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug, status: "PUBLISHED" },
    });
  } catch {
    // DB not connected
  }

  if (!post) notFound();

  return (
    <article className="min-h-screen py-24 px-6 pt-28">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="font-mono text-sm mb-8 inline-block transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--accent-green)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          ← Back to Blog
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background: "rgba(29,158,117,0.08)",
                color: "var(--accent-green)",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          className="text-4xl font-bold mb-4 leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {post.title}
        </h1>

        {post.publishedAt && (
          <p className="font-mono text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {post.coverUrl && (
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-10">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert max-w-none"
          style={{
            color: "var(--text-secondary)",
            lineHeight: "1.8",
          }}
        >
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
