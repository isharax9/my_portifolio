"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    title: "Started in creative freelancing",
    copy: "Early graphic design work taught me how to think visually, communicate clearly, and design for real client outcomes.",
  },
  {
    title: "Moved into software development",
    copy: "That design-first mindset evolved into building full web products, APIs, and practical business tools.",
  },
  {
    title: "Specialized in DevOps and cloud",
    copy: "Today I focus on deployment pipelines, infrastructure reliability, and systems that scale without turning brittle.",
  },
];

const factList = [
  { label: "Current role", value: "Software Engineer & DevOps", note: "KingIT Solutions" },
  { label: "Location", value: "Sri Lanka", note: "Working with remote teams" },
  { label: "Education", value: "BSc (Hons) Computer Science", note: "University of Plymouth via NIBM" },
];

const stack = ["AWS", "Docker", "Kubernetes", "Next.js", "Node.js", "PostgreSQL", "Jenkins", "Linux"];

export default function AboutSection() {
  return (
    <section id="about" className="relative">
      <div className="section-shell">
        <div className="section-header">
          <div>
            <span className="section-label">About</span>
            <h2 className="section-title mt-4">
              From design roots to <span className="gradient-text">production-grade engineering</span>
            </h2>
          </div>
          <p className="section-copy">
            My work sits at the intersection of product thinking, software engineering,
            and cloud operations. I like building systems that feel polished to users and
            dependable to the teams maintaining them.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="surface-panel-strong p-6 sm:p-8"
          >
            <p className="text-lg leading-8 text-slate-100">
              I&apos;m Ishara Lakshitha, a software engineer and DevOps specialist building
              modern web products and the infrastructure that keeps them fast, observable,
              and easy to evolve.
            </p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
              <p>
                My path has been unusually cross-functional: I started with freelance design,
                moved into software delivery, and then leaned deeply into cloud operations and
                release engineering. That mix helps me think beyond isolated features.
              </p>
              <p>
                I care about developer experience, maintainable code, deployment confidence,
                and interfaces that make technical work feel simpler instead of more complex.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {stack.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="surface-panel p-5 sm:p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
                Career arc
              </p>
              <div className="mt-5 space-y-4">
                {milestones.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.15rem] border border-white/7 bg-white/4 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-white sm:text-base">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
            >
              {factList.map((fact) => (
                <div key={fact.label} className="surface-panel p-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-cyan-200/66">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-base font-semibold text-white">{fact.value}</p>
                  <p className="mt-1 text-sm text-slate-300">{fact.note}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
