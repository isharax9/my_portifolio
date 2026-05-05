"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  logoUrl: string | null;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="relative">
      <div className="section-shell">
        <div className="section-header">
          <div>
            <span className="section-label">Experience</span>
            <h2 className="section-title mt-4">
              Building products with <span className="gradient-text-purple">delivery in mind</span>
            </h2>
          </div>
          <p className="section-copy">
            The thread through my roles has been simple: take ownership, improve the
            development loop, and leave systems easier to run than I found them.
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-5 top-4 hidden w-px bg-gradient-to-b from-cyan-200/30 via-white/10 to-transparent sm:block" />
          <div className="grid gap-5">
            {experience.map((item, index) => (
              <ExperienceCard
                key={item.id}
                experience={item}
                index={index}
                isLast={index === experience.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
  isLast,
}: {
  experience: Experience;
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const bullets = experience.description
    .split("\n")
    .map((line) => line.trim().replace(/^- /, ""))
    .filter(Boolean);
  const visibleBullets = expanded ? bullets : bullets.slice(0, 3);
  const hasMore = bullets.length > 3;
  const active = !experience.endDate;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06 }}
      className="relative grid gap-4 sm:grid-cols-[3rem_minmax(0,1fr)]"
    >
      <div className="hidden items-start justify-center sm:flex">
        <div className="relative flex h-full items-start justify-center">
          <span
            className={`mt-5 h-4 w-4 rounded-full border ${
              active
                ? "border-emerald-200 bg-emerald-300 shadow-[0_0_0_6px_rgba(61,217,179,0.14)]"
                : "border-cyan-200/40 bg-[#0f233a]"
            }`}
          />
          {!isLast && <span className="absolute top-10 h-[calc(100%-1rem)] w-px bg-white/8" />}
        </div>
      </div>

      <div className="surface-panel overflow-hidden p-5 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill pill-strong w-fit px-3 py-1.5 text-[0.72rem]">
                {active ? "Current role" : "Previous role"}
              </span>
              <span className="pill w-fit px-3 py-1.5 text-[0.72rem]">{experience.location}</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{experience.role}</h3>
            <p className="mt-2 text-base text-cyan-100">{experience.company}</p>
          </div>

          <div className="rounded-[1.1rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/72">
              Timeline
            </p>
            <p className="mt-2">
              {formatDate(experience.startDate)}{" "}
              <span className="text-slate-500">→</span>{" "}
              {experience.endDate ? formatDate(experience.endDate) : "Present"}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {visibleBullets.map((bullet) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-3 rounded-[1rem] border border-white/6 bg-white/3 px-4 py-3"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                <p className="text-sm leading-7 text-slate-200">{bullet}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/82 transition-colors hover:text-white"
          >
            <span>{expanded ? "Show less" : "Show more"}</span>
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {expanded ? <path d="m18 15-6-6-6 6" /> : <path d="m6 9 6 6 6-6" />}
            </svg>
          </button>
        )}
      </div>
    </motion.article>
  );
}
