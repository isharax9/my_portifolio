"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function ExperienceItem({ exp, index, isLast }: { exp: Experience; index: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const bullets = exp.description
    .split("\n")
    .map((line) => line.trim().replace(/^- /, ""))
    .filter(Boolean);
  const displayBullets = expanded ? bullets : bullets.slice(0, 2);
  const hasMore = bullets.length > 2;
  const isCurrent = !exp.endDate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex gap-6 lg:gap-10"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0">
        {/* Node */}
        <div
          className={`w-4 h-4 rounded-full border-2 z-10 ${
            isCurrent
              ? "border-emerald-400 bg-emerald-400/20 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              : "border-slate-600 bg-slate-800"
          }`}
        />
        {/* Connector */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-white/[0.08] to-transparent mt-2" />
        )}
      </div>

      {/* Card */}
      <div className="card p-6 lg:p-8 flex-1 mb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white leading-tight">
              {exp.role}
            </h3>
            <p className="text-sm text-emerald-400 font-mono mt-1">
              {exp.company}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span>{formatDate(exp.startDate)}</span>
              <span>—</span>
              {isCurrent ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-emerald-400 text-[10px] font-semibold bg-emerald-500/[0.1] border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PRESENT
                </span>
              ) : (
                <span>{formatDate(exp.endDate!)}</span>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {exp.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="text-sm text-slate-400 leading-relaxed">
          <AnimatePresence>
            {displayBullets.map((bullet, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-3 py-1"
              >
                <span className="text-emerald-500/50 mt-0.5 shrink-0">▸</span>
                <span className="text-slate-300">{bullet}</span>
              </motion.p>
            ))}
          </AnimatePresence>

          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
            >
              {expanded ? (
                <>
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="18 15 12 9 6 15"/></svg>
                  Show less
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="6 9 12 15 18 9"/></svg>
                  Show more
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.015] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title mt-4">
            Work <span className="gradient-text-purple">History</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            My professional journey from freelancing to enterprise cloud engineering
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {experience.map((exp, i) => (
            <ExperienceItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
