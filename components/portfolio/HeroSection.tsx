"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Software Engineer",
  "DevOps Engineer",
  "Cloud Architect",
  "Full-Stack Developer",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 py-32"
      id="hero"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, var(--accent-green) 0%, transparent 70%)",
          transform: "translate(-30%, -30%)"
        }}
      />
      
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(transparent 50%, rgba(255, 255, 255, 1) 50%)",
          backgroundSize: "100% 4px"
        }}
      />
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="font-mono text-sm mb-4"
            style={{ color: "var(--accent-green)" }}
          >
            &gt; Hello, World!
          </p>
          <h1
            className="text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Ishara
            <br />
            <span style={{ color: "var(--accent-green)" }}>Lakshitha</span>
          </h1>
          <div className="h-8 mb-6">
            <span
              className="text-xl lg:text-2xl font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              {displayed}
              <span
                className="animate-pulse"
                style={{ color: "var(--accent-green)" }}
              >
                |
              </span>
            </span>
          </div>
          <p
            className="text-base leading-relaxed mb-8 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Building scalable cloud systems and distributed architectures at{" "}
            <span style={{ color: "var(--accent-green-bright)" }}>
              KingIT Solutions
            </span>
            . Passionate about DevOps, automation, and clean code.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
              style={{
                background: "var(--accent-green)",
                color: "#0a0a0a",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-green-bright)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent-green)")
              }
            >
              View Projects
            </a>
            <a
              href="/Ishara_Lakshitha_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
              style={{
                border: "1px solid var(--border-accent)",
                color: "var(--accent-green)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(29,158,117,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Download CV
            </a>
          </div>

          <div className="flex gap-6 mt-10">
            {[
              { href: "https://github.com/isharax9", label: "GitHub" },
              { href: "https://linkedin.com/in/isharax9", label: "LinkedIn" },
              { href: "https://twitter.com/isharax9", label: "Twitter" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-green)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--glow-green)",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                background: "var(--bg-secondary)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
              <span
                className="font-mono text-xs ml-2"
                style={{ color: "var(--text-muted)" }}
              >
                ishara@terminal ~ 
              </span>
            </div>
            {/* Terminal content */}
            <div className="p-6 font-mono text-sm space-y-3">
              {[
                { cmd: "whoami", out: "ishara_lakshitha" },
                { cmd: "cat profile.json", out: '{\n  "role": "Software Engineer & DevOps",\n  "location": "Kurunegala, LK"\n}' },
                { cmd: "ls skills/", out: "aws  docker  kubernetes  nextjs  node  postgres  react" },
                { cmd: "echo $STATUS", out: "Available for new opportunities" },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.3 }}
                >
                  <div style={{ color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--accent-green)" }}>❯ </span>
                    {line.cmd}
                  </div>
                  <div style={{ color: "var(--text-primary)", whiteSpace: "pre-wrap" }} className="mt-0.5 pl-4">
                    {line.out}
                  </div>
                </motion.div>
              ))}
              <div style={{ color: "var(--accent-green)" }}>
                ❯ <span className="animate-pulse">█</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" aria-label="Scroll down">
          <svg className="w-6 h-6" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
