"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Skill {
  id: string;
  name: string;
  iconSlug: string;
  category: string;
  level: number;
  featured: boolean;
}

const CATEGORIES = ["All", "Languages", "Frameworks", "DevOps", "Cloud", "Databases", "Tools"];

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            02. Skills
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Tech Stack
          </h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200"
              style={{
                background:
                  activeCategory === cat
                    ? "var(--accent-green)"
                    : "var(--bg-card)",
                color: activeCategory === cat ? "#0a0a0a" : "var(--text-secondary)",
                border: "1px solid",
                borderColor:
                  activeCategory === cat
                    ? "var(--accent-green)"
                    : "var(--border)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="card p-4 flex flex-col items-center gap-3 group cursor-default"
            >
              <div className="w-10 h-10 relative flex items-center justify-center">
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.iconSlug}/${skill.iconSlug}-original.svg`}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.iconSlug}/${skill.iconSlug}-plain.svg`;
                  }}
                />
              </div>
              <span
                className="text-xs text-center font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {skill.name}
              </span>
              {/* Level dots */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        dotIdx < skill.level
                          ? "var(--accent-green)"
                          : "var(--border)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
