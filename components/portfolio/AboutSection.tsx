"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "5+", label: "Years Experience", color: "from-emerald-500 to-cyan-500" },
  { value: "20+", label: "Projects Built", color: "from-violet-500 to-pink-500" },
  { value: "3", label: "Countries Worked", color: "from-amber-500 to-orange-500" },
];

const quickFacts = [
  { icon: "📍", label: "Location", value: "United Kingdom (Remote)" },
  { icon: "🎓", label: "Education", value: "BSc (Hons) Computer Science", sub: "University of Plymouth · NIBM Sri Lanka" },
  { icon: "💼", label: "Current Role", value: "Software Engineer & DevOps", sub: "KingIT Solutions" },
];

const techHighlights = ["AWS", "Docker", "Node.js", "Next.js", "PostgreSQL", "Jenkins", "Linux", "React"];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label">About</span>
          <h2 className="section-title mt-4">
            Get to know <span className="gradient-text">me</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
            A passionate engineer with a journey from graphic design to cloud infrastructure
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* About text — 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="card p-8 lg:p-10 space-y-5">
              <p className="text-slate-300 leading-[1.9] text-[15px]">
                I&apos;m <strong className="text-white font-semibold">Ishara Lakshitha</strong>, a
                Software Engineer & DevOps specialist currently working at{" "}
                <strong className="text-emerald-400">KingIT Solutions</strong> (UK, Remote).
                I build and maintain scalable cloud infrastructure and distributed systems.
              </p>
              <p className="text-slate-400 leading-[1.9] text-[15px]">
                My journey started with freelance graphic design on Fiverr, evolved through
                junior software development, and accelerated with DevOps engineering — giving
                me a unique full-stack perspective on building products end-to-end.
              </p>
              <p className="text-slate-400 leading-[1.9] text-[15px]">
                I hold a BSc (Hons) in Computer Science from the University of Plymouth
                (through NIBM Sri Lanka). I&apos;m passionate about automation, CI/CD,
                cloud-native architectures, and writing clean, maintainable code.
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                {techHighlights.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/[0.15] transition-colors duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="card p-6 text-center group"
                >
                  <div className={`text-3xl font-bold font-mono bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Info cards — 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Profile image card */}
            <div className="card p-6 flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shrink-0">
                <Image
                  src="https://github.com/isharax9.png"
                  alt="Ishara Lakshitha"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ishara Lakshitha</h3>
                <p className="text-sm text-emerald-400 font-mono">@isharax9</p>
                <p className="text-xs text-slate-500 mt-1">Software Engineer & DevOps</p>
              </div>
            </div>

            {/* Quick facts */}
            {quickFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i }}
                className="card p-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-lg shrink-0">
                    {fact.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      {fact.label}
                    </p>
                    <p className="text-sm font-medium text-white">{fact.value}</p>
                    {fact.sub && (
                      <p className="text-xs text-slate-500 mt-0.5">{fact.sub}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Email CTA */}
            <a
              href="mailto:isharax9@gmail.com"
              className="card p-5 flex items-center gap-4 group hover:border-emerald-500/30"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  isharax9@gmail.com
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
