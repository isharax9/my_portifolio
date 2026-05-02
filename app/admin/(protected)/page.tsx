import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats = { projects: 0, posts: 0, skills: 0, experience: 0, certifications: 0 };
  let recentItems: Array<{ id: string; type: string; title: string; date: Date }> = [];

  try {
    const [projects, posts, skills, experience, certifications] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.certification.count(),
    ]);
    stats = { projects, posts, skills, experience, certifications };

    const recentProjects = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, updatedAt: true },
    });
    
    const recentPosts = await prisma.blogPost.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, updatedAt: true },
    });

    recentItems = [
      ...recentProjects.map((p) => ({ id: p.id, type: "Project", title: p.title, date: p.updatedAt })),
      ...recentPosts.map((p) => ({ id: p.id, type: "Blog Post", title: p.title, date: p.updatedAt })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

  } catch {
    // DB not connected
  }

  const cards = [
    { label: "Projects", value: stats.projects, icon: "🚀", href: "/admin/projects", color: "var(--accent-green)" },
    { label: "Blog Posts", value: stats.posts, icon: "✍️", href: "/admin/blog", color: "var(--accent-purple)" },
    { label: "Skills", value: stats.skills, icon: "⚡", href: "/admin/skills", color: "var(--accent-amber)" },
    { label: "Experience", value: stats.experience, icon: "💼", href: "/admin/experience", color: "var(--accent-green)" },
    { label: "Certifications", value: stats.certifications, icon: "🏆", href: "/admin/certifications", color: "var(--accent-purple)" },
  ];

  const quickLinks = [
    { label: "New Project", href: "/admin/projects/new" },
    { label: "New Blog Post", href: "/admin/blog/new" },
    { label: "Add Experience", href: "/admin/experience/new" },
    { label: "Add Certification", href: "/admin/certifications/new" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="card p-6 flex items-center gap-4 group"
          >
            <div
              className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg"
              style={{
                background: "rgba(29,158,117,0.08)",
                border: "1px solid var(--border)",
              }}
            >
              {card.icon}
            </div>
            <div>
              <div
                className="text-2xl font-bold font-mono group-hover:opacity-80 transition-opacity"
                style={{ color: card.color }}
              >
                {card.value}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {card.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Links */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Quick Create
          </h2>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-colors"
                style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
              >
                + {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentItems.length > 0 ? (
              recentItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </p>
                    <p className="text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>
                      {item.type}
                    </p>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                    {item.date.toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                No recent activity.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
