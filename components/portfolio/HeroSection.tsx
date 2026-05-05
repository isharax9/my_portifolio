"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ROLES = [
  "Software Engineer",
  "DevOps Engineer",
  "Cloud Architect",
  "Full-Stack Builder",
];

const QUICK_STATS = [
  { value: "5+", label: "Years building production systems" },
  { value: "20+", label: "Projects shipped across cloud and web" },
  { value: "24/7", label: "Mindset for reliability, automation, and scale" },
];

const FOCUS_AREAS = [
  "AWS & cloud architecture",
  "CI/CD and DevOps workflows",
  "Next.js, React, and Node.js products",
  "Resilient APIs and databases",
];

const PARTNERS = ["KingIT Solutions", "Remote teams", "Freelance founders"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 70);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 35);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 180);
    }

    return () => clearTimeout(timeout);
  }, [deleting, displayed, roleIndex]);

  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-emerald-300/12 blur-[110px]" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-400/12 blur-[130px]" />
      </div>

      <div className="section-shell pb-8 sm:pb-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="pill pill-strong mb-5 w-fit">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" />
              Open to impactful roles and freelance builds
            </div>

            <div className="max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-200/72">
                Software engineer • DevOps • Cloud systems
              </p>
              <h1 className="mt-4 text-[clamp(3.25rem,12vw,7.1rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white">
                Ishara Lakshitha
              </h1>
              <div className="mt-4 flex min-h-10 items-center font-mono text-base text-cyan-100 sm:text-lg md:text-xl">
                <span className="mr-3 text-emerald-300">{">"}</span>
                <span>{displayed}</span>
                <span className="ml-1 text-emerald-300 animate-pulse">▌</span>
              </div>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I design reliable product experiences and the infrastructure behind them,
                blending frontend craft, backend pragmatism, and DevOps discipline into
                systems that stay fast, readable, and scalable.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#projects" className="button-primary">
                <ArrowRightIcon />
                Explore Projects
              </a>
              <a
                href="/Ishara_Lakshitha_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                <DownloadIcon />
                Download CV
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {PARTNERS.map((item) => (
                <span key={item} className="pill">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {QUICK_STATS.map((stat) => (
                <div key={stat.label} className="surface-panel p-4 sm:p-5">
                  <p className="font-mono text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="surface-panel-strong surface-tint overflow-hidden p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-[1.4rem] border border-white/12 bg-white/5 shadow-[0_18px_42px_rgba(4,12,24,0.28)]">
                  <Image
                    src="https://github.com/isharax9.png"
                    alt="Ishara Lakshitha"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/70">
                    Based in Sri Lanka
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Engineering products from interface to infrastructure
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Currently helping teams deliver cloud-native systems with cleaner
                    pipelines, stronger observability, and more confident releases.
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-6 grid gap-3 sm:grid-cols-2">
                {FOCUS_AREAS.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4 text-sm leading-6 text-slate-200"
                  >
                    <div className="mb-3 h-9 w-9 rounded-2xl bg-emerald-300/12 text-emerald-200 flex items-center justify-center">
                      <SparkIcon />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-6 rounded-[1.4rem] border border-cyan-300/12 bg-[#091728]/78 p-4 sm:p-5">
                <div className="meta-line">
                  <span className="font-mono uppercase tracking-[0.28em] text-[0.68rem] text-cyan-200/70">
                    Operating principles
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <PrincipleItem
                    title="Build with clarity"
                    copy="Interfaces, APIs, and infrastructure should all stay understandable under pressure."
                  />
                  <PrincipleItem
                    title="Automate the boring parts"
                    copy="Reliable delivery comes from guardrails, repeatability, and strong release workflows."
                  />
                  <PrincipleItem
                    title="Ship for the long run"
                    copy="Performance, maintainability, and observability matter just as much as launch speed."
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/isharax9"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com/in/isharax9"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://twitter.com/isharax9"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <span className="pill">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                isharax9@gmail.com
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PrincipleItem({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="flex gap-3 rounded-[1rem] border border-white/6 bg-white/3 px-4 py-3.5">
      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300" />
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.1 1.5A4.5 4.5 0 0 0 12 7.5v1A10.7 10.7 0 0 1 3 4s-4 9 5 13a11.7 11.7 0 0 1-7 2c9 5 20 0 20-11.5 0-.3 0-.6-.1-.8A7.7 7.7 0 0 0 23 3Z" />
    </svg>
  );
}
