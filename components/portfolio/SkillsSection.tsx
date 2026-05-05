"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Skill {
  id: string;
  name: string;
  iconSlug: string;
  category: string;
  level: number;
  featured: boolean;
}

const CATEGORY_ICONS: Record<string, string> = {
  All: "✦",
  Languages: "⌘",
  Frameworks: "▣",
  DevOps: "⟳",
  Cloud: "☁",
  Databases: "◫",
  Tools: "⚒",
};

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") {
      return skills;
    }
    return skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory, skills]);

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  return (
    <section id="skills" className="relative">
      <div className="section-shell">
        <div className="section-header">
          <div>
            <span className="section-label">Skills</span>
            <h2 className="section-title mt-4">
              A toolkit shaped for <span className="gradient-text">shipping real systems</span>
            </h2>
          </div>
          <p className="section-copy">
            My strongest stack sits around modern JavaScript, cloud delivery, and the
            operational tooling needed to keep products reliable once they leave the laptop.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2.5">
          {categories.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2.5 text-sm transition-all ${
                  selected
                    ? "border-cyan-300/28 bg-cyan-300/10 text-white shadow-[0_12px_30px_rgba(86,194,255,0.14)]"
                    : "border-white/8 bg-white/3 text-slate-300 hover:border-white/14 hover:text-white"
                }`}
              >
                <span className="mr-2 font-mono text-xs text-cyan-200/70">
                  {CATEGORY_ICONS[category] ?? "•"}
                </span>
                {category}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            {activeCategory === "All" ? (
              <div className="grid gap-5">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category} className="surface-panel p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
                          {category}
                        </p>
                        <p className="mt-2 text-sm text-slate-300">
                          {categorySkills.length} tools I use in this area
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {categorySkills.map((skill, index) => (
                        <SkillCard key={skill.id} skill={skill} index={index} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
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
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.03 }}
      className={`group rounded-[1.35rem] border p-4 transition-all ${
        skill.featured
          ? "border-emerald-300/24 bg-emerald-300/8 shadow-[0_18px_40px_rgba(61,217,179,0.12)]"
          : "border-white/8 bg-white/4"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#0c2036]">
          <Image
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.iconSlug}/${skill.iconSlug}-original.svg`}
            alt={skill.name}
            width={28}
            height={28}
            className="object-contain"
            onError={(event) => {
              (event.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.iconSlug}/${skill.iconSlug}-plain.svg`;
            }}
          />
        </div>
        {skill.featured && (
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-emerald-100">
            Core
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-white sm:text-base">{skill.name}</p>
        <p className="mt-1 text-xs text-slate-400">{skill.category}</p>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-400">
          <span>Confidence</span>
          <span>{skill.level}/5</span>
        </div>
        <div className="h-2 rounded-full bg-white/8">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(skill.level / 5) * 100}%`,
              background: skill.featured
                ? "linear-gradient(90deg, #8af2d7 0%, #3dd9b3 50%, #56c2ff 100%)"
                : "linear-gradient(90deg, rgba(191,208,228,0.55), rgba(86,194,255,0.75))",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
