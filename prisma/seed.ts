import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "isharax9@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        company: "KingIT Solutions",
        role: "Software Engineer - Development & DevOps",
        startDate: new Date("2026-01-01"),
        endDate: null,
        location: "United Kingdom (Remote)",
        description:
          "Promoted from Associate DevOps Engineer. Building scalable cloud and distributed systems. AWS, Node.js, CI/CD pipelines.",
        order: 0,
      },
      {
        company: "KingIT Solutions",
        role: "Associate DevOps Engineer",
        startDate: new Date("2025-05-01"),
        endDate: new Date("2026-02-01"),
        location: "London, United Kingdom",
        description:
          "DevOps engineering role managing cloud infrastructure, deployments, and CI/CD.",
        order: 1,
      },
      {
        company: "KingIT Solutions",
        role: "Associate Tech-Ops Engineer",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2025-04-01"),
        location: "London, United Kingdom",
        description: "Technical operations engineering.",
        order: 2,
      },
      {
        company: "Block-Stars Pvt. Ltd.",
        role: "DevOps Engineer Intern",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-08-01"),
        location: "Kurunegala, Sri Lanka",
        description:
          "Jenkins CI/CD pipelines, Docker containerisation, AWS EC2/S3/RDS, Zabbix & Datadog monitoring, GitLab administration, Linux system administration.",
        order: 3,
      },
      {
        company: "Bitrate Solutions (Pvt) Ltd.",
        role: "Junior Software Developer",
        startDate: new Date("2023-10-01"),
        endDate: new Date("2024-03-01"),
        location: "Kurunegala, Sri Lanka",
        description:
          "Laravel web development, Flutter mobile app (Suvillippuamo for Italian client), cybersecurity mentorship.",
        order: 4,
      },
      {
        company: "Fiverr",
        role: "Freelance Graphic Designer & Video Editor",
        startDate: new Date("2019-12-01"),
        endDate: new Date("2023-11-01"),
        location: "Remote",
        description:
          "Adobe Photoshop, Illustrator, Premiere Pro. Branding, social media graphics, video editing for clients worldwide.",
        order: 5,
      },
    ],
  });

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { name: "TypeScript", iconSlug: "typescript", category: "Languages", level: 5, featured: true, order: 0 },
      { name: "JavaScript", iconSlug: "javascript", category: "Languages", level: 5, featured: true, order: 1 },
      { name: "Python", iconSlug: "python", category: "Languages", level: 4, featured: false, order: 2 },
      { name: "PHP", iconSlug: "php", category: "Languages", level: 4, featured: false, order: 3 },
      { name: "Java", iconSlug: "java", category: "Languages", level: 3, featured: false, order: 4 },
      { name: "Dart", iconSlug: "dart", category: "Languages", level: 3, featured: false, order: 5 },
      { name: "Bash", iconSlug: "bash", category: "Languages", level: 4, featured: false, order: 6 },
      { name: "Node.js", iconSlug: "nodejs", category: "Frameworks", level: 5, featured: true, order: 0 },
      { name: "Next.js", iconSlug: "nextjs", category: "Frameworks", level: 5, featured: true, order: 1 },
      { name: "React", iconSlug: "react", category: "Frameworks", level: 4, featured: true, order: 2 },
      { name: "Laravel", iconSlug: "laravel", category: "Frameworks", level: 4, featured: false, order: 3 },
      { name: "Flutter", iconSlug: "flutter", category: "Frameworks", level: 3, featured: false, order: 4 },
      { name: "Express.js", iconSlug: "express", category: "Frameworks", level: 4, featured: false, order: 5 },
      { name: "Docker", iconSlug: "docker", category: "DevOps", level: 5, featured: true, order: 0 },
      { name: "Jenkins", iconSlug: "jenkins", category: "DevOps", level: 5, featured: true, order: 1 },
      { name: "Git", iconSlug: "git", category: "DevOps", level: 5, featured: true, order: 2 },
      { name: "Linux", iconSlug: "linux", category: "DevOps", level: 5, featured: true, order: 3 },
      { name: "Grafana", iconSlug: "grafana", category: "DevOps", level: 4, featured: false, order: 4 },
      { name: "Nginx", iconSlug: "nginx", category: "DevOps", level: 4, featured: false, order: 5 },
      { name: "AWS", iconSlug: "amazonwebservices", category: "Cloud", level: 5, featured: true, order: 0 },
      { name: "Google Cloud", iconSlug: "googlecloud", category: "Cloud", level: 3, featured: false, order: 1 },
      { name: "Cloudflare", iconSlug: "cloudflare", category: "Cloud", level: 4, featured: false, order: 2 },
      { name: "Vercel", iconSlug: "vercel", category: "Cloud", level: 4, featured: false, order: 3 },
      { name: "DigitalOcean", iconSlug: "digitalocean", category: "Cloud", level: 3, featured: false, order: 4 },
      { name: "PostgreSQL", iconSlug: "postgresql", category: "Databases", level: 5, featured: true, order: 0 },
      { name: "Redis", iconSlug: "redis", category: "Databases", level: 4, featured: true, order: 1 },
      { name: "MySQL", iconSlug: "mysql", category: "Databases", level: 4, featured: false, order: 2 },
      { name: "MongoDB", iconSlug: "mongodb", category: "Databases", level: 4, featured: false, order: 3 },
      { name: "VS Code", iconSlug: "vscode", category: "Tools", level: 5, featured: false, order: 0 },
      { name: "Figma", iconSlug: "figma", category: "Tools", level: 3, featured: false, order: 1 },
      { name: "Postman", iconSlug: "postman", category: "Tools", level: 4, featured: false, order: 2 },
      { name: "Datadog", iconSlug: "datadog", category: "Tools", level: 4, featured: false, order: 3 },
    ],
  });

  await prisma.certification.deleteMany();
  await prisma.certification.createMany({
    data: [
      { name: "Neo4j Certified Professional", issuer: "Neo4j", issuedDate: new Date("2024-01-01"), order: 0 },
      { name: "Grafana Loki", issuer: "Grafana Labs", issuedDate: new Date("2024-01-01"), order: 1 },
      { name: "Introduction to SQL", issuer: "Online", issuedDate: new Date("2023-01-01"), order: 2 },
      { name: "Introduction to HTML", issuer: "Online", issuedDate: new Date("2022-01-01"), order: 3 },
      { name: "AI Free Week Course - Day 1", issuer: "Online", issuedDate: new Date("2024-01-01"), order: 4 },
    ],
  });

  console.log("Seed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
