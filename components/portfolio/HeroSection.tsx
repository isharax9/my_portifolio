"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ROLES = [
  "Software Engineer",
  "DevOps Engineer",
  "Cloud Architect",
  "Full-Stack Developer",
];

const STATS = [
  { value: "5+", label: "Years Exp.", icon: "⚡" },
  { value: "20+", label: "Projects", icon: "🚀" },
  { value: "3", label: "Countries", icon: "🌍" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.05] blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-violet-500/[0.04] blur-[100px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Content — 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono">
                Available for opportunities
              </span>
            </motion.div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="text-white">Hi, I&apos;m</span>
                <br />
                <span className="gradient-text">Ishara</span>{" "}
                <span className="text-white">Lakshitha</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="h-10 flex items-center">
              <span className="font-mono text-xl sm:text-2xl text-slate-400">
                {">"} {displayed}
                <span className="text-emerald-400 animate-pulse ml-0.5">▌</span>
              </span>
            </div>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Building scalable cloud systems and distributed architectures at{" "}
              <span className="text-emerald-400 font-medium">KingIT Solutions</span>.
              Passionate about DevOps, automation, and shipping clean code at scale.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                View Projects
              </a>
              <a
                href="/Ishara_Lakshitha_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
            </div>

            {/* Social row */}
            <div className="flex items-center gap-4 pt-4">
              {[
                { href: "https://github.com/isharax9", label: "GitHub", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
                { href: "https://linkedin.com/in/isharax9", label: "LinkedIn", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
                { href: "https://twitter.com/isharax9", label: "Twitter", icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-all duration-300"
                  aria-label={link.label}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
              <div className="w-px h-6 bg-white/[0.08] mx-1" />
              <span className="text-xs text-slate-500 font-mono">
                isharax9@gmail.com
              </span>
            </div>
          </motion.div>

          {/* Right — Terminal + Stats — 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6 hidden lg:block"
          >
            {/* Terminal card */}
            <div className="card overflow-hidden" style={{ boxShadow: "var(--glow-green)" }}>
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="font-mono text-[11px] text-slate-500 ml-3">
                  ishara@dev ~ zsh
                </span>
              </div>
              {/* Terminal content */}
              <div className="p-5 font-mono text-[13px] space-y-4">
                {[
                  { cmd: "whoami", out: "ishara_lakshitha" },
                  {
                    cmd: "cat profile.json",
                    out: '{\n  "role": "Software Engineer & DevOps",\n  "company": "KingIT Solutions",\n  "location": "Kurunegala, LK 🇱🇰"\n}',
                  },
                  {
                    cmd: "ls tech/",
                    out: "aws  docker  k8s  nextjs  node  postgres  react",
                  },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.4 }}
                  >
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="text-emerald-400">❯</span>
                      <span>{line.cmd}</span>
                    </div>
                    <div className="text-slate-300 pl-5 mt-1 whitespace-pre-wrap leading-relaxed">
                      {line.out}
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 text-emerald-400">
                  ❯ <span className="animate-pulse">▌</span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  className="card p-4 text-center"
                >
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold font-mono gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <span className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-emerald-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
