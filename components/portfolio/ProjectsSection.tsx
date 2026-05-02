"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title mt-4">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            A showcase of my work across full-stack, DevOps, and cloud
          </p>
        </motion.div>

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${
                activeTag === tag
                  ? "bg-emerald-500/[0.15] text-emerald-400 border border-emerald-500/30"
                  : "bg-white/[0.03] text-slate-500 border border-white/[0.06] hover:text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🚧</div>
                <p className="font-mono text-sm text-slate-500">
                  More projects coming soon...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group card overflow-hidden flex flex-col"
                  >
                    {/* Cover */}
                    {project.coverUrl ? (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={project.coverUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                        {project.featured && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/[0.15] border border-amber-500/30 text-amber-400 text-[10px] font-mono font-semibold backdrop-blur-sm">
                            ★ Featured
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-44 flex items-center justify-center bg-gradient-to-br from-emerald-500/[0.05] to-cyan-500/[0.05] relative">
                        <span className="font-mono text-4xl text-emerald-500/30">
                          &lt;/&gt;
                        </span>
                        {project.featured && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/[0.15] border border-amber-500/30 text-amber-400 text-[10px] font-mono font-semibold">
                            ★ Featured
                          </div>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors duration-300 font-mono"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                            Source
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors duration-300 font-mono"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
