import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import {
  fallbackCertifications,
  fallbackExperience,
  fallbackProjects,
  fallbackSkills,
} from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

function normalizeDate(value: Date | string) {
  return value instanceof Date ? value.toISOString() : value;
}

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
      <SkillsSection skills={(skills.length > 0 ? skills : fallbackSkills).map((s) => ({ ...s }))} />
      <ExperienceSection
        experience={(experience.length > 0 ? experience : fallbackExperience).map((e) => ({
          ...e,
          startDate: normalizeDate(e.startDate),
          endDate: e.endDate ? normalizeDate(e.endDate) : null,
        }))}
      />
      <ProjectsSection
        projects={(projects.length > 0 ? projects : fallbackProjects).map((p) => ({ ...p }))}
      />
      <CertificationsSection
        certifications={(certifications.length > 0 ? certifications : fallbackCertifications).map((c) => ({
          ...c,
          issuedDate: normalizeDate(c.issuedDate),
        }))}
      />
      <ContactSection />
    </>
  );
}
