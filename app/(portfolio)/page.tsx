import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import ContactSection from "@/components/portfolio/ContactSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let skills: Awaited<ReturnType<typeof prisma.skill.findMany>> = [];
  let experience: Awaited<ReturnType<typeof prisma.experience.findMany>> = [];
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = [];
  let certifications: Awaited<ReturnType<typeof prisma.certification.findMany>> = [];

  try {
    [skills, experience, projects, certifications] = await Promise.all([
      prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.certification.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch {
    // DB not connected — show static page
  }

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills.map(s => ({ ...s }))} />
      <ExperienceSection
        experience={experience.map(e => ({
          ...e,
          startDate: e.startDate.toISOString(),
          endDate: e.endDate ? e.endDate.toISOString() : null,
        }))}
      />
      <ProjectsSection projects={projects.map(p => ({ ...p }))} />
      <CertificationsSection
        certifications={certifications.map(c => ({
          ...c,
          issuedDate: c.issuedDate.toISOString(),
        }))}
      />
      <ContactSection />
    </>
  );
}
