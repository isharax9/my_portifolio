import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project = null;
  try {
    project = await prisma.project.findUnique({ where: { id } });
  } catch {
    // DB not connected
  }
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        Edit Project
      </h1>
      <ProjectForm
        initialData={{
          id: project.id,
          title: project.title,
          description: project.description,
          longDescription: project.longDescription ?? "",
          tags: project.tags,
          imageUrl: project.imageUrl ?? "",
          githubUrl: project.githubUrl ?? "",
          liveUrl: project.liveUrl ?? "",
          featured: project.featured,
          order: project.order,
        }}
      />
    </div>
  );
}
