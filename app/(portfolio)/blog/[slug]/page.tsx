import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { codeToHtml } from "shiki";
import ShareButtons from "@/components/portfolio/ShareButtons";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

function getReadTime(content: string) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(content: string) {
  const matches = Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm));
  return matches.map((match) => ({
    level: match[1].length,
    text: match[2].trim(),
    id: match[2]
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof prisma.blogPost.findUnique>> = null;
  let relatedPosts: any[] = [];
  try {
    post = await prisma.blogPost.findUnique({
      where: { slug, status: "PUBLISHED" },
    });

    if (post) {
      relatedPosts = await prisma.blogPost.findMany({
        where: {
          tags: { hasSome: post.tags },
          id: { not: post.id },
          status: "PUBLISHED",
        },
        take: 2,
        orderBy: { publishedAt: "desc" },
      });
    }
  } catch {
    // DB not connected
  }

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const readTime = getReadTime(post.content);

  const headersList = await headers();
  const host = headersList.get("host") || "ishara.dev";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const currentUrl = `${protocol}://${host}/blog/${post.slug}`;

  const processedContent = post.content.replace(
    /^(#{2,3})\s+(.+)$/gm,
    (match, hashes, text) => {
      const id = text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return `${hashes} ${text} <a id="${id}"></a>`;
    }
  );

  return (
    <article className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-300 mb-8"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tagItem) => (
              <span
                key={tagItem}
                className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400"
              >
                {tagItem}
              </span>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author + Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/[0.08] relative shrink-0">
                <Image
                  src="https://github.com/isharax9.png"
                  alt="Ishara Lakshitha"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Ishara Lakshitha
                </p>
                <p className="font-mono text-xs text-slate-500">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}{" "}
                  · {readTime} min read
                </p>
              </div>
            </div>
            <ShareButtons title={post.title} url={currentUrl} />
          </div>

          {/* Cover */}
          {post.coverUrl && (
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 border border-white/[0.06]">
              <Image
                src={post.coverUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-strong:text-white prose-code:text-emerald-300 prose-code:bg-emerald-500/[0.1] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm"
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.9",
            }}
          >
            <MDXRemote
              source={processedContent}
              components={{
                pre: async (props: any) => {
                  try {
                    const code = props?.children?.props?.children;
                    const lang =
                      props?.children?.props?.className?.replace(
                        "language-",
                        ""
                      ) || "text";
                    if (typeof code === "string") {
                      const html = await codeToHtml(code.trim(), {
                        lang,
                        theme: "github-dark",
                      });
                      return (
                        <div
                          className="my-8 rounded-2xl overflow-hidden border border-white/[0.06] text-sm"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    }
                  } catch (e) {
                    console.error("Shiki highlight error", e);
                  }
                  return <pre {...props} />;
                },
              }}
            />
          </div>

          <hr className="my-16 border-white/[0.06]" />

          {/* Author Card */}
          <div className="card p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-16">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/30 relative shrink-0">
              <Image
                src="https://github.com/isharax9.png"
                alt="Ishara Lakshitha"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ishara Lakshitha
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Software Engineer and DevOps enthusiast. I build scalable cloud
                systems and love exploring new technologies. Writing about things
                I learn and build.
              </p>
              <div className="flex gap-4 justify-center sm:justify-start">
                {["Twitter", "GitHub", "LinkedIn"].map((name) => (
                  <a
                    key={name}
                    href={`https://${name.toLowerCase()}.com/${name === "LinkedIn" ? "in/" : ""}isharax9`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-slate-500 hover:text-emerald-400 transition-colors"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Read Next</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="card p-6 group flex flex-col"
                  >
                    <h4 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {rp.title}
                    </h4>
                    <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1">
                      {rp.excerpt}
                    </p>
                    <div className="font-mono text-xs text-slate-500 mt-auto">
                      {rp.publishedAt
                        ? new Date(rp.publishedAt).toLocaleDateString()
                        : ""}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (TOC) */}
        {headings.length > 0 && (
          <aside className="w-full lg:w-64 shrink-0 lg:order-last order-first mb-12 lg:mb-0">
            <div className="sticky top-24 card p-6">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-5">
                On this page
              </h3>
              <ul className="space-y-2.5">
                {headings.map((h, i) => (
                  <li key={i} style={{ paddingLeft: h.level === 2 ? "0" : "1rem" }}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm text-slate-500 hover:text-emerald-400 transition-colors duration-200 block leading-relaxed"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
