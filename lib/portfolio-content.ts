export const fallbackSkills = [
  { id: "skill-ts", name: "TypeScript", iconSlug: "typescript", category: "Languages", level: 5, featured: true },
  { id: "skill-js", name: "JavaScript", iconSlug: "javascript", category: "Languages", level: 5, featured: true },
  { id: "skill-node", name: "Node.js", iconSlug: "nodejs", category: "Frameworks", level: 5, featured: true },
  { id: "skill-next", name: "Next.js", iconSlug: "nextjs", category: "Frameworks", level: 5, featured: true },
  { id: "skill-react", name: "React", iconSlug: "react", category: "Frameworks", level: 5, featured: true },
  { id: "skill-docker", name: "Docker", iconSlug: "docker", category: "DevOps", level: 5, featured: true },
  { id: "skill-jenkins", name: "Jenkins", iconSlug: "jenkins", category: "DevOps", level: 4, featured: false },
  { id: "skill-k8s", name: "Kubernetes", iconSlug: "kubernetes", category: "DevOps", level: 4, featured: false },
  { id: "skill-aws", name: "AWS", iconSlug: "amazonwebservices", category: "Cloud", level: 5, featured: true },
  { id: "skill-gcp", name: "GCP", iconSlug: "googlecloud", category: "Cloud", level: 3, featured: false },
  { id: "skill-postgres", name: "PostgreSQL", iconSlug: "postgresql", category: "Databases", level: 4, featured: true },
  { id: "skill-mysql", name: "MySQL", iconSlug: "mysql", category: "Databases", level: 4, featured: false },
  { id: "skill-linux", name: "Linux", iconSlug: "linux", category: "Tools", level: 5, featured: true },
  { id: "skill-git", name: "Git", iconSlug: "git", category: "Tools", level: 5, featured: false },
  { id: "skill-prisma", name: "Prisma", iconSlug: "prisma", category: "Tools", level: 4, featured: false },
];

export const fallbackExperience = [
  {
    id: "exp-kingit",
    company: "KingIT Solutions",
    role: "Software Engineer & DevOps",
    startDate: "2023-01-01T00:00:00.000Z",
    endDate: null,
    location: "Remote · United Kingdom",
    description:
      "- Build and maintain modern web applications and the infrastructure behind them.\n- Improve CI/CD workflows, deployment confidence, and release reliability across projects.\n- Collaborate across product and engineering to turn requirements into maintainable systems.\n- Strengthen observability and operational guardrails for production services.",
    logoUrl: null,
  },
  {
    id: "exp-dev",
    company: "Freelance & Product Work",
    role: "Full-Stack Developer",
    startDate: "2020-01-01T00:00:00.000Z",
    endDate: "2022-12-01T00:00:00.000Z",
    location: "Sri Lanka · Remote",
    description:
      "- Delivered websites, dashboards, and custom internal tools for clients and growing teams.\n- Worked across frontend, backend, deployment, and database design to ship end-to-end features.\n- Built a stronger product mindset through close collaboration with non-technical stakeholders.",
    logoUrl: null,
  },
  {
    id: "exp-design",
    company: "Fiverr",
    role: "Graphic Designer & Creative Freelancer",
    startDate: "2018-01-01T00:00:00.000Z",
    endDate: "2019-12-01T00:00:00.000Z",
    location: "Sri Lanka",
    description:
      "- Started my client-facing career through freelance design work.\n- Learned to communicate ideas clearly, iterate quickly, and build for real-world outcomes.\n- Developed the visual and UX instincts that still shape how I approach software today.",
    logoUrl: null,
  },
];

export const fallbackProjects = [
  {
    id: "project-devops-dashboard",
    title: "Cloud Operations Dashboard",
    description:
      "An internal dashboard for monitoring deployments, service health, and environment status across multiple cloud-hosted applications. Built to give teams faster visibility into releases and incidents.",
    coverUrl: null,
    githubUrl: "https://github.com/isharax9",
    liveUrl: null,
    tags: ["Next.js", "Node.js", "AWS", "DevOps"],
    featured: true,
  },
  {
    id: "project-portfolio",
    title: "Personal Portfolio Platform",
    description:
      "A full-stack portfolio and content management experience built with Next.js, Prisma, and an admin interface for editing experience, projects, skills, and blog content.",
    coverUrl: null,
    githubUrl: "https://github.com/isharax9",
    liveUrl: null,
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
    featured: false,
  },
  {
    id: "project-cicd",
    title: "CI/CD Automation Pipeline",
    description:
      "A delivery workflow focused on repeatable builds, safer releases, and lower manual overhead using containerization, automated checks, and deployment scripting.",
    coverUrl: null,
    githubUrl: "https://github.com/isharax9",
    liveUrl: null,
    tags: ["Docker", "Jenkins", "CI/CD", "Automation"],
    featured: false,
  },
];

export const fallbackCertifications = [
  {
    id: "cert-grafana",
    name: "Grafana Fundamentals",
    issuer: "Grafana Labs",
    issuedDate: "2024-01-01T00:00:00.000Z",
    credentialUrl: null,
    badgeUrl: null,
  },
  {
    id: "cert-neo4j",
    name: "Neo4j Certified Professional",
    issuer: "Neo4j",
    issuedDate: "2023-01-01T00:00:00.000Z",
    credentialUrl: null,
    badgeUrl: null,
  },
];
