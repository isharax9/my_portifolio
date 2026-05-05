"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About", num: "01" },
  { href: "#skills", label: "Skills", num: "02" },
  { href: "#experience", label: "Experience", num: "03" },
  { href: "#projects", label: "Projects", num: "04" },
  { href: "#certifications", label: "Certifications", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);

      for (const link of [...navLinks].reverse()) {
        const section = document.getElementById(link.href.slice(1));
        if (section && window.scrollY >= section.offsetTop - 160) {
          setActiveSection(link.href.slice(1));
          return;
        }
      }
      setActiveSection("");
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto w-full max-w-6xl rounded-[1.35rem] border transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#07111f]/78 shadow-[0_20px_60px_rgba(3,8,18,0.4)] backdrop-blur-2xl"
            : "border-white/6 bg-[#07111f]/44 backdrop-blur-xl"
        }`}
      >
        <nav className="flex items-center justify-between px-4 py-3 sm:px-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-sky-400 font-mono text-sm font-bold text-[#04101a] shadow-[0_16px_28px_rgba(61,217,179,0.28)]">
              IL
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-cyan-300/75">
                Portfolio
              </p>
              <p className="text-sm font-semibold text-white sm:text-base">
                Ishara Lakshitha
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[0.68rem] text-cyan-300/60">
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-cyan-300/18 bg-cyan-300/10"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/blog" className="button-secondary px-4 py-2.5 text-sm">
              Blog
            </Link>
            <a href="#contact" className="button-primary px-4 py-2.5 text-sm">
              Let&apos;s Talk
            </a>
          </div>

          <button
            type="button"
            className="icon-button lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-3.5 rounded-full bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-auto mt-3 w-full max-w-6xl rounded-[1.75rem] border border-white/10 bg-[#07111f]/94 p-4 shadow-[0_24px_80px_rgba(1,8,20,0.56)] backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/3 px-4 py-3.5 text-slate-100 transition-colors hover:border-cyan-300/18 hover:bg-cyan-300/6"
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="font-mono text-xs text-cyan-300/60">{link.num}</span>
                </a>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                href="/blog"
                className="button-secondary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Read Blog
              </Link>
              <a
                href="#contact"
                className="button-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
