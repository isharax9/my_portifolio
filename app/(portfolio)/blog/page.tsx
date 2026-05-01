import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div className="min-h-screen py-24 px-6 pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            &gt; Blog
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Articles & Thoughts
          </h1>
        </div>

        {posts.length === 0 ? (
          <div
            className="text-center py-20 card"
            style={{ color: "var(--text-muted)" }}
          >
            <p className="font-mono text-lg mb-2">// No posts yet</p>
            <p className="text-sm">Coming soon...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card p-6 flex gap-6 block transition-all duration-200"
                style={{ display: "flex" }}
              >
                {post.coverUrl && (
                  <div className="relative w-32 h-24 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.slice(0, 3).map((tag) => (
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
                  <h2
                    className="font-semibold text-lg mb-2 leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  <p
                    className="font-mono text-xs mt-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
