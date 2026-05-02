import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let exp = null;
  try {
    exp = await prisma.experience.findUnique({ where: { id } });
  } catch {
    // DB not connected
  }
  
  if (!exp) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        Edit Experience
      </h1>
      <ExperienceForm
        initialData={{
          id: exp.id,
          company: exp.company,
          role: exp.role,
          startDate: exp.startDate,
          endDate: exp.endDate,
          location: exp.location,
          description: exp.description,
          logoUrl: exp.logoUrl ?? "",
          order: exp.order,
        }}
      />
    </div>
  );
}
