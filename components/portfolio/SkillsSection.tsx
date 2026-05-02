"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Skill {
  id: string;
  name: string;
  iconSlug: string;
  category: string;
  level: number;
  featured: boolean;
}

const CATEGORIES = [
  { key: "All", icon: "✦" },
  { key: "Languages", icon: "🖥️" },
  { key: "Frameworks", icon: "⚙️" },
  { key: "DevOps", icon: "🔄" },
  { key: "Cloud", icon: "☁️" },
  { key: "Databases", icon: "🗄️" },
  { key: "Tools", icon: "🔧" },
];

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  // Group skills by category for the "All" view
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-32 px-6 lg:px-8">
      {/* Background - wrapped in overflow-hidden so decorative elements don't bleed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title mt-4">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Technologies I use to build scalable, reliable systems
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.key
                  ? "bg-emerald-500/[0.15] text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              {cat.key}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory === "All" ? (
              /* Grouped view */
              <div className="space-y-12">
                {Object.entries(grouped).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="text-sm font-mono text-slate-500 mb-4 flex items-center gap-3 px-1">
                      <span className="w-8 h-px bg-white/[0.08]" />
                      {category}
                      <span className="text-emerald-500/50 text-xs">({categorySkills.length})</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {categorySkills.map((skill, i) => (
                        <SkillCard key={skill.id} skill={skill} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Filtered view */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filtered.map((skill, i) => (
                  <SkillCard key={skill.id} skill={skill} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-default flex flex-col items-center gap-3 ${
        skill.featured
          ? "bg-emerald-500/[0.06] border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
      }`}
    >
      {skill.featured && (
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
      )}
      <div className="w-10 h-10 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Image
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.iconSlug}/${skill.iconSlug}-original.svg`}
          alt={skill.name}
          width={40}
          height={40}
          className="object-contain drop-shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.iconSlug}/${skill.iconSlug}-plain.svg`;
          }}
        />
      </div>
      <span className="text-xs text-center font-medium text-slate-300 group-hover:text-white transition-colors">
        {skill.name}
      </span>
      {/* Level bar */}
      <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(skill.level / 5) * 100}%`,
            background: skill.featured
              ? "linear-gradient(to right, #10b981, #06b6d4)"
              : "linear-gradient(to right, #475569, #64748b)",
          }}
        />
      </div>
    </motion.div>
  );
}
