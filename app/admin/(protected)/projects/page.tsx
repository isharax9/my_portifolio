import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function ProjectsAdmin() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  try {
    projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Projects
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {projects.length} total
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg font-mono text-sm font-semibold"
          style={{ background: "var(--accent-green)", color: "#000" }}
        >
          + New Project
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="card p-4 flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <h2
                className="font-semibold text-sm truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
              </h2>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: "var(--text-muted)" }}
              >
                {project.tags.join(", ")}
              </p>
            </div>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded ${project.featured ? "text-yellow-400" : ""}`}
              style={{ color: project.featured ? "var(--accent-amber)" : "var(--text-muted)" }}
            >
              {project.featured ? "★ Featured" : ""}
            </span>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/projects/${project.id}`}
                className="font-mono text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                Edit
              </Link>
              <DeleteButton id={project.id} endpoint="/api/projects" />
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p
            className="text-center py-12 font-mono text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No projects yet. Add one!
          </p>
        )}
      </div>
    </div>
  );
}
