"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    <section
      id="projects"
      className="py-24 px-6"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            04. Projects
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Things I&apos;ve Built
          </h2>
        </motion.div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...allTags].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
              style={{
                background:
                  activeTag === tag ? "var(--accent-green)" : "var(--bg-card)",
                color: activeTag === tag ? "#0a0a0a" : "var(--text-secondary)",
                border: "1px solid",
                borderColor:
                  activeTag === tag ? "var(--accent-green)" : "var(--border)",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div
            className="text-center py-16 font-mono text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            &gt; More projects coming soon...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card overflow-hidden flex flex-col"
              >
                {project.coverUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.coverUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {!project.coverUrl && (
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(29,158,117,0.1), rgba(127,119,221,0.1))",
                    }}
                  >
                    <span
                      className="font-mono text-3xl"
                      style={{ color: "var(--accent-green)" }}
                    >
                      &lt;/&gt;
                    </span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="font-semibold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(239,159,39,0.1)",
                          color: "var(--accent-amber)",
                          border: "1px solid rgba(239,159,39,0.3)",
                        }}
                      >
                        Featured
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-4 flex-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: "rgba(29,158,117,0.08)",
                          color: "var(--accent-green)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono transition-colors duration-200"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text-primary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--text-muted)")
                        }
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono transition-colors duration-200"
                        style={{ color: "var(--accent-green)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--accent-green-bright)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--accent-green)")
                        }
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
