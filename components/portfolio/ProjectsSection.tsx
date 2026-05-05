"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  coverUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  tags: string[];
  featured: boolean;
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => {
    return ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag, projects]);

  const featuredProject = filteredProjects.find((project) => project.featured) ?? filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((project) => project.id !== featuredProject?.id);

  return (
    <section id="projects" className="relative">
      <div className="section-shell">
        <div className="section-header">
          <div>
            <span className="section-label">Projects</span>
            <h2 className="section-title mt-4">
              Selected work across <span className="gradient-text">web, cloud, and DevOps</span>
            </h2>
          </div>
          <p className="section-copy">
            I enjoy projects that have both product shape and operational depth. These are
            the builds that best show how I think about UX, architecture, and delivery.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                activeTag === tag
                  ? "border-emerald-200/26 bg-emerald-300/10 text-white"
                  : "border-white/8 bg-white/3 text-slate-300 hover:border-white/14 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            {filteredProjects.length === 0 ? (
              <div className="surface-panel p-10 text-center">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                  No projects in this filter yet
                </p>
                <p className="mt-3 text-slate-300">More work will show up here soon.</p>
              </div>
            ) : (
              <div className="grid gap-5">
                {featuredProject && <FeaturedProjectCard project={featuredProject} />}

                {secondaryProjects.length > 0 && (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {secondaryProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="surface-panel-strong overflow-hidden"
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]">
        <ProjectVisual project={project} tall />
        <div className="p-6 sm:p-8">
          <span className="pill pill-strong px-3 py-1.5 text-[0.72rem]">Featured project</span>
          <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-300">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button-primary">
                <ArrowIcon />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button-secondary">
                <GithubIcon />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
      className="surface-panel overflow-hidden"
    >
      <ProjectVisual project={project} />
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            {project.featured && (
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.26em] text-emerald-200/75">
                Featured build
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-300">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button-primary px-4 py-3 text-sm">
              <ArrowIcon />
              Visit
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button-secondary px-4 py-3 text-sm">
              <GithubIcon />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectVisual({ project, tall = false }: { project: Project; tall?: boolean }) {
  const containerClasses = tall ? "min-h-[18rem] sm:min-h-[24rem]" : "min-h-[14rem]";

  if (!project.coverUrl) {
    return (
      <div
        className={`relative flex ${containerClasses} items-center justify-center overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(61,217,179,0.16),transparent_34%),linear-gradient(135deg,#0a1a2d,#132843)] lg:border-b-0 lg:border-r`}
      >
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative rounded-[1.4rem] border border-white/10 bg-[#091728]/78 px-6 py-5 text-center shadow-[0_20px_50px_rgba(1,8,20,0.35)]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-100/70">
            Project preview
          </p>
          <p className="mt-3 text-4xl text-emerald-200">&lt;/&gt;</p>
          <p className="mt-3 text-sm text-slate-200">{project.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${containerClasses} overflow-hidden border-b border-white/8 lg:border-b-0 lg:border-r`}>
      <Image
        src={project.coverUrl}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/20 to-transparent" />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22" />
    </svg>
  );
}
