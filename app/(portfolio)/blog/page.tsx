import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function getReadTime(content: string) {
  if (!content) return 1;
  const words = content.trim().split(/\\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  let allPosts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  
  try {
    allPosts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    // DB not connected
  }

  // Get unique tags
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));
  
  // Filter posts
  const posts = tag ? allPosts.filter(p => p.tags.includes(tag)) : allPosts;

  return (
    <div className="min-h-screen py-24 px-6 pt-28">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            &gt; Blog
          </p>
          <h1 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
            Articles & Thoughts
          </h1>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
            style={{
              background: !tag ? "var(--accent-green)" : "var(--bg-card)",
              color: !tag ? "#0a0a0a" : "var(--text-secondary)",
              border: "1px solid",
              borderColor: !tag ? "var(--accent-green)" : "var(--border)",
            }}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background: tag === t ? "var(--accent-green)" : "var(--bg-card)",
                color: tag === t ? "#0a0a0a" : "var(--text-secondary)",
                border: "1px solid",
                borderColor: tag === t ? "var(--accent-green)" : "var(--border)",
              }}
            >
              {t}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div
            className="text-center py-20 card"
            style={{ color: "var(--text-muted)" }}
          >
            <p className="font-mono text-lg mb-2">// No posts found</p>
            <p className="text-sm">Check back later or try a different tag.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card p-6 flex flex-col sm:flex-row gap-6 block transition-all duration-200 group hover:border-[var(--border-accent)]"
              >
                {post.coverUrl && (
                  <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0 rounded-lg overflow-hidden border border-[var(--border)]">
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(29,158,117,0.08)",
                          color: "var(--accent-green)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="font-semibold text-xl mb-2 leading-snug group-hover:text-[var(--accent-green)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p
                      className="text-sm line-clamp-2 mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                  <div
                    className="font-mono text-xs flex items-center gap-3 mt-auto"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                    <span>•</span>
                    <span>{getReadTime(post.content)} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
