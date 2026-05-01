import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  let stats = { projects: 0, posts: 0, skills: 0, experience: 0, certifications: 0 };
  try {
    const [projects, posts, skills, experience, certifications] = await Promise.all([
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.certification.count(),
    ]);
    stats = { projects, posts, skills, experience, certifications };
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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="card p-6 flex items-center gap-4"
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
                className="text-2xl font-bold font-mono"
                style={{ color: card.color }}
              >
                {card.value}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {card.label}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
