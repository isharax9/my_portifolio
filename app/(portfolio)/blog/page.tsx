import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function getReadTime(content: string) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
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

  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags)));
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Blog</span>
          <h1 className="section-title mt-4">
            Articles & <span className="gradient-text">Thoughts</span>
          </h1>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Writing about DevOps, cloud engineering, and lessons learned along the way
          </p>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
              !tag
                ? "bg-emerald-500/[0.15] text-emerald-400 border border-emerald-500/30"
                : "bg-white/[0.03] text-slate-500 border border-white/[0.06] hover:text-slate-300 hover:bg-white/[0.06]"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                tag === t
                  ? "bg-emerald-500/[0.15] text-emerald-400 border border-emerald-500/30"
                  : "bg-white/[0.03] text-slate-500 border border-white/[0.06] hover:text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-6">📝</div>
            <p className="font-mono text-sm text-slate-500 mb-2">
              // No posts found
            </p>
            <p className="text-xs text-slate-600">
              Check back later or try a different tag.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group card p-6 lg:p-8 flex flex-col sm:flex-row gap-6 block"
              >
                {post.coverUrl && (
                  <div className="relative w-full sm:w-56 h-40 sm:h-auto shrink-0 rounded-xl overflow-hidden border border-white/[0.06]">
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-semibold text-xl text-white mb-2 leading-snug group-hover:text-emerald-400 transition-colors duration-300">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="font-mono text-xs text-slate-500 flex items-center gap-3 mt-auto">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : ""}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span>{getReadTime(post.content)} min read</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center text-slate-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-all duration-300">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
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
