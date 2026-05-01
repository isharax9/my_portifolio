import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";
import ExperienceFormSimple from "@/components/admin/ExperienceFormSimple";

export const dynamic = "force-dynamic";

export default async function ExperienceAdmin() {
  let experience: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];
  try {
    experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Experience
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {experience.length} entries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-mono text-sm mb-4" style={{ color: "var(--accent-green)" }}>
            Add Experience
          </h2>
          <ExperienceFormSimple />
        </div>

        <div className="space-y-3">
          {experience.map((exp) => (
            <div key={exp.id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                    {exp.role}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {exp.company}
                  </p>
                </div>
                <DeleteButton id={exp.id} endpoint="/api/experience" />
              </div>
            </div>
          ))}
          {experience.length === 0 && (
            <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
              No entries yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
