import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function BlogAdmin() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Blog Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {posts.length} total
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 rounded-lg font-mono text-sm font-semibold"
          style={{ background: "var(--accent-green)", color: "#000" }}
        >
          + New Post
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="card p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <h2
                className="font-semibold text-sm truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {post.slug}
              </p>
            </div>
            <span
              className="font-mono text-xs px-2 py-0.5 rounded"
              style={{
                background:
                  post.status === "PUBLISHED"
                    ? "rgba(29,158,117,0.1)"
                    : "rgba(127,119,221,0.1)",
                color:
                  post.status === "PUBLISHED"
                    ? "var(--accent-green)"
                    : "var(--accent-purple)",
              }}
            >
              {post.status}
            </span>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/blog/${post.id}`}
                className="font-mono text-xs px-3 py-1.5 rounded-lg"
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                Edit
              </Link>
              <DeleteButton id={post.id} endpoint="/api/blog" />
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-center py-12 font-mono text-sm" style={{ color: "var(--text-muted)" }}>
            No posts yet. Write one!
          </p>
        )}
      </div>
    </div>
  );
}
