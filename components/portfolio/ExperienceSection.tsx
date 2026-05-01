"use client";

import { motion } from "framer-motion";

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
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
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
                    <div className="text-right shrink-0">
                      <p
                        className="font-mono text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {formatDate(exp.startDate)} —{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-muted)" }}
                      >
                        📍 {exp.location}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
