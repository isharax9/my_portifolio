# Portfolio Website — Complete Build Prompt
**For: Ishara Lakshitha | isharax9**
**Use with: Claude Code, Cursor, Windsurf, or any AI coding assistant**

---

## Project Overview

Build a full-stack personal portfolio website with a password-protected back office (admin panel) for Ishara Lakshitha — a Software Engineer & DevOps Engineer based in Kurunegala, Sri Lanka, currently working at KingIT Solutions (UK).

The site must have two distinct parts:
1. **Public portfolio** — a dark, terminal/cyberpunk-themed showcase site
2. **Admin back office** — a clean CRUD panel at `/admin/*` to manage all content

---

## Tech Stack (non-negotiable)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| ORM | Prisma |
| Database | PostgreSQL (use `DATABASE_URL` env var, compatible with Neon.tech) |
| Auth | NextAuth.js v5 (Credentials provider) |
| Validation | Zod |
| Forms | React Hook Form + Zod resolver |
| UI components (admin only) | shadcn/ui |
| Image storage | Cloudinary (use `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` env vars) |
| Blog editor | @mdxeditor/editor |
| Email (contact form) | Resend API (`RESEND_API_KEY` env var) |
| Hosting target | Vercel |

---

## Folder Structure

```
/
├── app/
│   ├── (portfolio)/           # Public site layout
│   │   ├── page.tsx           # Landing page (all sections)
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/page.tsx # Blog post
│   │   └── layout.tsx
│   ├── admin/                 # Back office (protected)
│   │   ├── layout.tsx         # Admin shell with sidebar
│   │   ├── page.tsx           # Dashboard
│   │   ├── login/page.tsx     # Login page
│   │   ├── projects/
│   │   │   ├── page.tsx       # List
│   │   │   ├── new/page.tsx   # Create
│   │   │   └── [id]/page.tsx  # Edit
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── experience/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── certifications/
│   │       ├── page.tsx
│   │       ├── new/page.tsx
│   │       └── [id]/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── projects/route.ts + [id]/route.ts
│       ├── blog/route.ts + [id]/route.ts
│       ├── skills/route.ts + [id]/route.ts
│       ├── experience/route.ts + [id]/route.ts
│       ├── certifications/route.ts + [id]/route.ts
│       └── contact/route.ts
├── components/
│   ├── portfolio/             # Public site components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Navbar.tsx
│   └── admin/                 # Admin UI components
│       ├── AdminSidebar.tsx
│       ├── ImageUpload.tsx
│       └── MdxEditor.tsx
├── lib/
│   ├── auth.ts                # NextAuth config
│   ├── prisma.ts              # Prisma client singleton
│   ├── cloudinary.ts          # Upload helper
│   └── validations/           # Zod schemas
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                # Pre-seeded with Ishara's real data
├── middleware.ts              # Protect /admin/* routes
└── .env.local.example
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  content     String?  // longer markdown description
  coverUrl    String?
  githubUrl   String?
  liveUrl     String?
  tags        String[]
  featured    Boolean  @default(false)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum PostStatus {
  DRAFT
  PUBLISHED
}

model BlogPost {
  id          String     @id @default(cuid())
  title       String
  slug        String     @unique
  excerpt     String?
  content     String     // MDX content
  coverUrl    String?
  tags        String[]
  status      PostStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model Skill {
  id       String  @id @default(cuid())
  name     String
  iconSlug String  // devicons slug e.g. "typescript", "docker"
  category String  // "Languages" | "DevOps" | "Cloud" | "Databases" | "Frameworks" | "Tools"
  level    Int     @default(3) // 1-5
  featured Boolean @default(false)
  order    Int     @default(0)
}

model Experience {
  id          String    @id @default(cuid())
  company     String
  role        String
  startDate   DateTime
  endDate     DateTime? // null = present
  location    String
  description String    // markdown bullets
  logoUrl     String?
  order       Int       @default(0)
}

model Certification {
  id            String    @id @default(cuid())
  name          String
  issuer        String
  issuedDate    DateTime
  credentialUrl String?
  badgeUrl      String?
  order         Int       @default(0)
}
```

---

## Seed Data (use this exact data in `prisma/seed.ts`)

```typescript
// Pre-seed with Ishara's real data

const experience = [
  {
    company: "KingIT Solutions",
    role: "Software Engineer - Development & DevOps",
    startDate: new Date("2026-01-01"),
    endDate: null,
    location: "United Kingdom (Remote)",
    description: "Promoted from Associate DevOps Engineer. Building scalable cloud and distributed systems. AWS, Node.js, CI/CD pipelines.",
    order: 0,
  },
  {
    company: "KingIT Solutions",
    role: "Associate DevOps Engineer",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2026-02-01"),
    location: "London, United Kingdom",
    description: "DevOps engineering role managing cloud infrastructure, deployments, and CI/CD.",
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
    description: "Jenkins CI/CD pipelines, Docker containerisation, AWS EC2/S3/RDS, Zabbix & Datadog monitoring, GitLab administration, Linux system administration.",
    order: 3,
  },
  {
    company: "Bitrate Solutions (Pvt) Ltd.",
    role: "Junior Software Developer",
    startDate: new Date("2023-10-01"),
    endDate: new Date("2024-03-01"),
    location: "Kurunegala, Sri Lanka",
    description: "Laravel web development, Flutter mobile app (Suvillippuamo for Italian client), cybersecurity mentorship.",
    order: 4,
  },
  {
    company: "Fiverr",
    role: "Freelance Graphic Designer & Video Editor",
    startDate: new Date("2019-12-01"),
    endDate: new Date("2023-11-01"),
    location: "Remote",
    description: "Adobe Photoshop, Illustrator, Premiere Pro. Branding, social media graphics, video editing for clients worldwide.",
    order: 5,
  },
];

const skills = [
  // Languages
  { name: "TypeScript", iconSlug: "typescript", category: "Languages", level: 5, featured: true, order: 0 },
  { name: "JavaScript", iconSlug: "javascript", category: "Languages", level: 5, featured: true, order: 1 },
  { name: "Python", iconSlug: "python", category: "Languages", level: 4, featured: false, order: 2 },
  { name: "PHP", iconSlug: "php", category: "Languages", level: 4, featured: false, order: 3 },
  { name: "Java", iconSlug: "java", category: "Languages", level: 3, featured: false, order: 4 },
  { name: "Dart", iconSlug: "dart", category: "Languages", level: 3, featured: false, order: 5 },
  { name: "Bash", iconSlug: "bash", category: "Languages", level: 4, featured: false, order: 6 },
  // Frameworks
  { name: "Node.js", iconSlug: "nodejs", category: "Frameworks", level: 5, featured: true, order: 0 },
  { name: "Next.js", iconSlug: "nextjs", category: "Frameworks", level: 5, featured: true, order: 1 },
  { name: "React", iconSlug: "react", category: "Frameworks", level: 4, featured: true, order: 2 },
  { name: "Laravel", iconSlug: "laravel", category: "Frameworks", level: 4, featured: false, order: 3 },
  { name: "Flutter", iconSlug: "flutter", category: "Frameworks", level: 3, featured: false, order: 4 },
  { name: "Express.js", iconSlug: "express", category: "Frameworks", level: 4, featured: false, order: 5 },
  // DevOps
  { name: "Docker", iconSlug: "docker", category: "DevOps", level: 5, featured: true, order: 0 },
  { name: "Jenkins", iconSlug: "jenkins", category: "DevOps", level: 5, featured: true, order: 1 },
  { name: "Git", iconSlug: "git", category: "DevOps", level: 5, featured: true, order: 2 },
  { name: "Linux", iconSlug: "linux", category: "DevOps", level: 5, featured: true, order: 3 },
  { name: "Grafana", iconSlug: "grafana", category: "DevOps", level: 4, featured: false, order: 4 },
  { name: "Nginx", iconSlug: "nginx", category: "DevOps", level: 4, featured: false, order: 5 },
  // Cloud
  { name: "AWS", iconSlug: "amazonwebservices", category: "Cloud", level: 5, featured: true, order: 0 },
  { name: "Google Cloud", iconSlug: "googlecloud", category: "Cloud", level: 3, featured: false, order: 1 },
  { name: "Cloudflare", iconSlug: "cloudflare", category: "Cloud", level: 4, featured: false, order: 2 },
  { name: "Vercel", iconSlug: "vercel", category: "Cloud", level: 4, featured: false, order: 3 },
  { name: "DigitalOcean", iconSlug: "digitalocean", category: "Cloud", level: 3, featured: false, order: 4 },
  // Databases
  { name: "PostgreSQL", iconSlug: "postgresql", category: "Databases", level: 5, featured: true, order: 0 },
  { name: "Redis", iconSlug: "redis", category: "Databases", level: 4, featured: true, order: 1 },
  { name: "MySQL", iconSlug: "mysql", category: "Databases", level: 4, featured: false, order: 2 },
  { name: "MongoDB", iconSlug: "mongodb", category: "Databases", level: 4, featured: false, order: 3 },
  // Tools
  { name: "VS Code", iconSlug: "vscode", category: "Tools", level: 5, featured: false, order: 0 },
  { name: "Figma", iconSlug: "figma", category: "Tools", level: 3, featured: false, order: 1 },
  { name: "Postman", iconSlug: "postman", category: "Tools", level: 4, featured: false, order: 2 },
  { name: "Datadog", iconSlug: "datadog", category: "Tools", level: 4, featured: false, order: 3 },
];

const certifications = [
  { name: "Neo4j Certified Professional", issuer: "Neo4j", issuedDate: new Date("2024-01-01"), order: 0 },
  { name: "Grafana Loki", issuer: "Grafana Labs", issuedDate: new Date("2024-01-01"), order: 1 },
  { name: "Introduction to SQL", issuer: "Online", issuedDate: new Date("2023-01-01"), order: 2 },
  { name: "Introduction to HTML", issuer: "Online", issuedDate: new Date("2022-01-01"), order: 3 },
  { name: "AI Free Week Course - Day 1", issuer: "Online", issuedDate: new Date("2024-01-01"), order: 4 },
];
```

---

## Design System — Dark Cyberpunk Theme

### Color Palette
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-card: #161616;
  --bg-card-hover: #1c1c1c;
  --border: rgba(255, 255, 255, 0.07);
  --border-accent: rgba(29, 158, 117, 0.4);
  --text-primary: #f0f0f0;
  --text-secondary: #888888;
  --text-muted: #555555;
  --accent-green: #1D9E75;        /* primary accent */
  --accent-green-bright: #2DD4A0; /* hover/glow */
  --accent-purple: #7F77DD;       /* secondary accent */
  --accent-amber: #EF9F27;        /* warning/highlight */
  --glow-green: 0 0 20px rgba(29, 158, 117, 0.15);
  --glow-purple: 0 0 20px rgba(127, 119, 221, 0.15);
}
```

### Typography
```css
/* Install via next/font */
/* Display: JetBrains Mono (for hero, code elements, terminal) */
/* Body: Inter (clean, readable) */
font-family: 'JetBrains Mono', monospace;   /* terminal elements, name, accent text */
font-family: 'Inter', sans-serif;            /* body, descriptions */
```

### Design Rules
- Background: near-black `#0a0a0a`, not pure black
- Cards: `#161616` with `1px solid rgba(255,255,255,0.07)` border
- On hover: border shifts to `rgba(29,158,117,0.4)`, subtle green glow shadow
- Accent color: teal-green `#1D9E75` for links, active states, highlights
- Secondary accent: purple `#7F77DD` for tags, badges, secondary elements
- No pure white — use `#f0f0f0` for headings
- Section separators: thin `1px` horizontal lines with low opacity
- Scrollbar: custom styled dark with green thumb

### Key Visual Elements
- **Terminal cursor blink** on hero section (`_` blinking after typewriter text)
- **Scanline texture overlay** on hero (subtle, 2% opacity repeating linear-gradient)
- **Grid dot pattern** as page background (CSS radial-gradient dots, 5% opacity)
- **Glowing borders** on featured cards and active nav items
- **Monospace font for all technical terms**: role names, skill names, dates

---

## Section-by-Section Requirements

### 1. Navbar
- Fixed top, backdrop blur `blur(12px)` with dark bg
- Logo: `ishara.dev` in JetBrains Mono with a green `>_` prefix
- Links: About · Skills · Experience · Projects · Blog · Contact
- Active section highlighted with green underline (intersection observer)
- Mobile: hamburger menu → full-screen overlay
- GitHub icon link (top right)

### 2. Hero Section
- Full viewport height
- Left side: text content. Right side: animated terminal window component
- Typewriter animation cycling through roles:
  - `Software Engineer`
  - `DevOps Engineer`
  - `Cloud Architect`
  - `Full Stack Developer`
- Name in large JetBrains Mono: `Ishara Lakshitha`
- Subtitle: `Building scalable systems that last.`
- Two CTA buttons: `View Projects` (solid green) + `Download CV` (outlined)
- Animated terminal window (right side) showing fake `$ whoami` output with his actual info
- Scroll indicator arrow at bottom
- Background: grid dot pattern + very subtle green radial glow top-left

**Terminal component content:**
```
> whoami
ishara-lakshitha

> cat profile.json
{
  "role": "Software Engineer & DevOps",
  "company": "KingIT Solutions",
  "location": "Kurunegala, LK",
  "degree": "BSc (Hons) Software Engineering",
  "grade": "First Class Honours",
  "focus": ["Cloud", "DevOps", "Backend", "Web3"]
}

> ls skills/
AWS/  Docker/  Node.js/  PostgreSQL/  Redis/  Next.js/

> echo $STATUS
Available for opportunities ✓
```

### 3. About Section
- Two columns: text left, stats/highlights right
- Short bio paragraph (pull from LinkedIn summary)
- Highlight cards (4 cards in a 2x2 grid):
  - `18 months` — Intern → Mid-level SE
  - `First Class Honours` — BSc Software Engineering
  - `DevOps + SE` — Hybrid expertise
  - `6+` — Years of professional experience
- LinkedIn + GitHub + Email links

### 4. Skills Section
- Section title: `Tech Stack`
- Filter bar: All · Languages · Frameworks · DevOps · Cloud · Databases · Tools
- Skill cards in a responsive grid (5 cols desktop, 3 tablet, 2 mobile)
- Each card: devicon SVG icon + name + subtle level indicator (filled dots)
- Use `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{slug}/{slug}-original.svg` for icons
- Featured skills get a subtle green border glow
- Filter animation: Framer Motion `AnimatePresence` for smooth show/hide

### 5. Experience Section
- Title: `Career Timeline`
- Vertical timeline layout with a central line
- Each entry: company logo placeholder + role + company + dates + location + description bullets
- Current role (KingIT) gets a green `● PRESENT` badge
- Expand/collapse for bullet points (show top 3, "show more" toggle)
- Dates formatted as: `Jan 2026 — Present`

### 6. Projects Section
- Title: `Projects`
- Tag filter bar (pull tags from DB dynamically)
- Card grid (3 cols desktop, 2 tablet, 1 mobile)
- Project card:
  - Cover image (if set) or gradient placeholder with project initial
  - Title + description (truncated to 2 lines)
  - Tags as small badges
  - GitHub link + Live link icons (hide if not set)
  - Featured projects get a `★ Featured` badge
- Empty state: "More projects coming soon"

### 7. Certifications Section
- Title: `Certifications`
- Horizontal scrolling card row (snap scroll on mobile)
- Each card: badge image or icon placeholder + cert name + issuer + date
- Cards have a subtle holographic shimmer animation on hover (CSS `@keyframes` gradient shift)

### 8. Contact Section
- Title: `Get In Touch`
- Two columns: left = text + social links, right = contact form
- Form fields: Name, Email, Subject, Message
- Submit → POST `/api/contact` → sends email via Resend
- Social links: GitHub, LinkedIn, Twitter/X, YouTube, Medium, Email
- Success/error state with animated feedback

### 9. Blog Listing Page (`/blog`)
- Grid of blog post cards
- Each card: cover image, title, excerpt, tags, published date, read time estimate
- Filter by tag
- Draft posts hidden (only published shown)
- Empty state if no posts yet

### 10. Blog Post Page (`/blog/[slug]`)
- MDX rendering with custom components (code blocks with syntax highlighting via `shiki`)
- Author card (Ishara's info)
- Table of contents (generated from headings)
- Share buttons (Twitter, LinkedIn, copy link)
- Related posts (same tags)

---

## Admin Back Office Requirements

### Admin Layout
- Sidebar navigation (collapsible on mobile)
- Sidebar links: Dashboard · Projects · Blog · Skills · Experience · Certifications
- Top bar: admin email + logout button
- Dark theme matching the portfolio but lighter cards (`#1a1a1a` base)

### Admin Login Page (`/admin/login`)
- Minimal centered card
- Email + Password fields
- NextAuth Credentials sign-in
- Redirect to `/admin` on success

### Admin Dashboard (`/admin`)
- Stat cards: total projects, published posts, draft posts, skill count, experience count
- Quick links to create new content
- Recent activity list (last 5 updated items across all models)

### CRUD Pages Pattern (apply to all 5 modules)
Each module has:
- **List page**: table with columns, Edit button, Delete button (with confirmation dialog), Create New button
- **Create/Edit page**: form with all fields, image upload where applicable, save button, cancel button
- **Delete**: confirmation modal → API DELETE → optimistic UI update → toast notification

### Blog Editor
- Use `@mdxeditor/editor` for rich MDX editing
- Fields: title, slug (auto-generated from title, editable), excerpt, content (MDX editor), cover image upload, tags (comma-separated input), status toggle (Draft / Published)
- Preview button that shows rendered MDX

### Image Upload Component
- Drag and drop zone + click to browse
- Upload to Cloudinary via signed upload
- Show preview after upload
- Loading spinner during upload
- Store returned `secure_url` in form state

### Skills Admin
- Drag-and-drop reordering (use `@dnd-kit/core`)
- Inline edit for quick field changes
- Category grouping tabs

---

## API Routes

All API routes follow REST conventions:
- `GET /api/[resource]` — list all (admin: include all, public: exclude drafts etc.)
- `POST /api/[resource]` — create (admin only)
- `PUT /api/[resource]/[id]` — update (admin only)
- `DELETE /api/[resource]/[id]` — delete (admin only)

Public-facing GET endpoints (projects, published blog posts, skills, experience, certifications) are public (no auth required). All mutation endpoints check the session via `auth()` from NextAuth and return 401 if not authenticated.

---

## Middleware (protect admin routes)

```typescript
// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const session = req.auth;

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

## Environment Variables

Create `.env.local` with:
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Resend (contact form email)
RESEND_API_KEY=""
RESEND_TO_EMAIL="isharax9@gmail.com"

# Admin account (used in seed)
ADMIN_EMAIL="isharax9@gmail.com"
ADMIN_PASSWORD="your-secure-password"
```

---

## SEO & Metadata

```typescript
// app/layout.tsx metadata
export const metadata: Metadata = {
  title: "Ishara Lakshitha — Software Engineer & DevOps",
  description: "Software Engineer & DevOps at KingIT Solutions. Building scalable cloud systems. AWS, Node.js, Next.js, Docker, PostgreSQL.",
  keywords: ["Software Engineer", "DevOps", "AWS", "Node.js", "Sri Lanka", "KingIT"],
  openGraph: {
    title: "Ishara Lakshitha — Software Engineer & DevOps",
    description: "Building scalable systems that last.",
    url: "https://isharalakshitha.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@isharax9",
  },
};
```

---

## Build Order (follow this sequence)

1. `npx create-next-app@latest portfolio --typescript --tailwind --app`
2. Install all dependencies listed above
3. Set up Prisma schema + run `prisma generate` + `prisma db push`
4. Create seed file with the data above + run `prisma db seed`
5. Set up NextAuth with Credentials provider + bcryptjs password check
6. Build middleware for `/admin/*` protection
7. Build all API routes (CRUD for each model)
8. Build admin layout + sidebar
9. Build all admin CRUD pages
10. Build the public portfolio (section by section, top to bottom)
11. Add Framer Motion animations last (after logic is working)
12. Test all CRUD operations end-to-end
13. Deploy to Vercel, add env vars, run `prisma db push` on production DB

---

## Important Notes

- The admin panel is for **one user only** (Ishara). No registration page needed.
- The seed creates the admin user with a hashed password from `ADMIN_PASSWORD` env var.
- All date fields stored as UTC in PostgreSQL.
- Devicons are loaded from CDN — no need to install a devicons package.
- `endDate: null` on Experience = "Present" — display as "Present" in the UI.
- Blog slugs must be unique — auto-generate from title using `slugify` package but allow manual override.
- MDX content stored as raw string in PostgreSQL. Rendered on the fly with `next-mdx-remote` on the post page.
- The portfolio is a single-page app with smooth scroll between sections (except /blog which is a separate page).
- Use `next/image` for all images with Cloudinary domain added to `next.config.ts`.
- Add `images.domains: ['res.cloudinary.com']` to `next.config.ts`.

---

## Deliverable Checklist

- [ ] Project bootstrapped and running locally
- [ ] Database connected and seeded with Ishara's real data
- [ ] Admin login working
- [ ] All 5 admin CRUD modules working (Projects, Blog, Skills, Experience, Certifications)
- [ ] Image upload to Cloudinary working
- [ ] MDX blog editor working with draft/publish toggle
- [ ] All public portfolio sections rendering data from DB
- [ ] Typewriter hero animation
- [ ] Skills filter working
- [ ] Contact form sending email via Resend
- [ ] Responsive on mobile
- [ ] Deployed to Vercel with all env vars set
