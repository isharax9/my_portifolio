import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";
import SkillsForm from "@/components/admin/SkillsForm";

export const dynamic = "force-dynamic";

export default async function SkillsAdmin() {
  let skills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];
  try {
    skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
  } catch {
    // DB not connected
  }

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Skills
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {skills.length} total
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-mono text-sm" style={{ color: "var(--accent-green)" }}>
            Add New Skill
          </h2>
          <SkillsForm />
        </div>

        <div>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h3
                className="font-mono text-xs mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                {category}
              </h3>
              <div className="space-y-2">
                {items.map((skill) => (
                  <div
                    key={skill.id}
                    className="card p-3 flex items-center gap-3"
                  >
                    <span className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      Lv.{skill.level}
                    </span>
                    <DeleteButton id={skill.id} endpoint="/api/skills" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
              No skills yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
