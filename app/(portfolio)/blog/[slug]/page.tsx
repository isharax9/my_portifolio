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
  const words = content.trim().split(/\\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(content: string) {
  const matches = Array.from(content.matchAll(/^(#{2,3})\\s+(.+)$/gm));
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
  
  // Try to get base URL from headers for sharing
  const headersList = await headers();
  const host = headersList.get("host") || "ishara.dev";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const currentUrl = `${protocol}://${host}/blog/${post.slug}`;

  // Process markdown to add IDs to headings for TOC
  const processedContent = post.content.replace(
    /^(#{2,3})\\s+(.+)$/gm,
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
    <article className="min-h-screen py-24 px-6 pt-28">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
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
            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border)] relative shrink-0">
                <Image src="https://github.com/isharax9.png" alt="Ishara Lakshitha" fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ishara Lakshitha</p>
                <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : ""} • {readTime} min read
                </p>
              </div>
            </div>
            <ShareButtons title={post.title} url={currentUrl} />
          </div>

          {post.coverUrl && (
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12 border border-[var(--border)]">
              <Image
                src={post.coverUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--accent-green)] hover:prose-a:text-[var(--accent-green-bright)]"
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.8",
            }}
          >
            <MDXRemote 
              source={processedContent} 
              components={{
                pre: async (props: any) => {
                  try {
                    const code = props?.children?.props?.children;
                    const lang = props?.children?.props?.className?.replace('language-', '') || 'text';
                    if (typeof code === 'string') {
                      const html = await codeToHtml(code.trim(), { lang, theme: 'github-dark' });
                      return <div className="shiki-wrapper my-6 rounded-lg overflow-hidden border border-[var(--border)] text-sm" dangerouslySetInnerHTML={{ __html: html }} />;
                    }
                  } catch (e) {
                    console.error("Shiki highlight error", e);
                  }
                  return <pre {...props} />;
                }
              }}
            />
          </div>

          <hr className="my-12 border-[var(--border)]" />

          {/* Author Card */}
          <div className="card p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-16">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border)] relative shrink-0">
              <Image src="https://github.com/isharax9.png" alt="Ishara Lakshitha" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Ishara Lakshitha</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                Software Engineer and DevOps enthusiast. I build scalable cloud systems and love exploring new technologies. 
                Writing about things I learn and build.
              </p>
              <div className="flex gap-4 justify-center sm:justify-start">
                <a href="https://twitter.com/isharax9" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors" style={{ color: "var(--text-muted)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent-green)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>Twitter</a>
                <a href="https://github.com/isharax9" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors" style={{ color: "var(--text-muted)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent-green)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>GitHub</a>
                <a href="https://linkedin.com/in/isharax9" target="_blank" rel="noopener noreferrer" className="font-mono text-xs transition-colors" style={{ color: "var(--text-muted)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent-green)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Read Next</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="card p-5 group flex flex-col">
                    <h4 className="font-bold text-lg mb-2 group-hover:text-[var(--accent-green)] transition-colors" style={{ color: "var(--text-primary)" }}>{rp.title}</h4>
                    <p className="text-sm line-clamp-2 mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>{rp.excerpt}</p>
                    <div className="font-mono text-xs mt-auto" style={{ color: "var(--text-muted)" }}>
                      {rp.publishedAt ? new Date(rp.publishedAt).toLocaleDateString() : ""}
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
            <div className="sticky top-32">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--text-primary)" }}>
                Table of Contents
              </h3>
              <ul className="space-y-3 border-l border-[var(--border)]">
                {headings.map((h, i) => (
                  <li key={i} style={{ paddingLeft: h.level === 2 ? '1rem' : '2rem' }}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm transition-colors duration-200 block"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-green)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
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
