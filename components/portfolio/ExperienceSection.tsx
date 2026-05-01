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

function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false);
  
  // Parse description into bullets
  const bullets = exp.description
    .split("\n")
    .map(line => line.trim().replace(/^- /, ""))
    .filter(Boolean);

  const displayBullets = expanded ? bullets : bullets.slice(0, 3);
  const hasMore = bullets.length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-16"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 -translate-x-1/2"
        style={{
          background: "var(--bg-primary)",
          borderColor: "var(--accent-green)",
          boxShadow: "0 0 8px rgba(29,158,117,0.4)",
        }}
      />

      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3
              className="font-semibold text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              {exp.role}
            </h3>
            <p
              className="font-mono text-sm"
              style={{ color: "var(--accent-green)" }}
            >
              {exp.company}
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <div
              className="font-mono text-xs flex items-center sm:justify-end gap-2"
              style={{ color: "var(--text-muted)" }}
            >
              {formatDate(exp.startDate)} —{" "}
              {exp.endDate ? (
                formatDate(exp.endDate)
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[var(--accent-green)] text-[10px]"
                  style={{ background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse"></span>
                  PRESENT
                </span>
              )}
            </div>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              📍 {exp.location}
            </p>
          </div>
        </div>
        
        <div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <ul className="space-y-2 list-disc list-outside ml-4">
            <AnimatePresence>
              {displayBullets.map((bullet, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--text-primary)" }}>{bullet}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          
          {hasMore && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="mt-4 font-mono text-xs transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{ color: "var(--accent-green)" }}
            >
              {expanded ? "− Show less" : "+ Show more"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            03. Experience
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Work History
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <ExperienceItem key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
