"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About", num: "01" },
  { href: "#skills", label: "Skills", num: "02" },
  { href: "#experience", label: "Experience", num: "03" },
  { href: "#projects", label: "Projects", num: "04" },
  { href: "#contact", label: "Contact", num: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-mono text-xs font-bold text-[#030712] transition-transform duration-300 group-hover:scale-110">
            IL
          </div>
          <span className="font-mono text-sm font-semibold text-white/90 hidden sm:block">
            ishara<span className="text-emerald-400">.dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[10px] text-emerald-500/60">
                    {link.num}
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-emerald-500/[0.08] rounded-lg border border-emerald-500/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
          <li className="ml-1">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-all duration-300"
            >
              Blog
            </Link>
          </li>
          <li className="ml-3">
            <a
              href="https://github.com/isharax9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden relative w-10 h-10 rounded-lg border border-white/[0.08] flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className="block w-full h-0.5 bg-white rounded transition-all duration-300 origin-center"
              style={{
                transform: menuOpen ? "rotate(45deg) translate(4px, 5px)" : "",
              }}
            />
            <span
              className="block w-3/4 h-0.5 bg-white rounded transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "translateX(10px)" : "",
              }}
            />
            <span
              className="block w-full h-0.5 bg-white rounded transition-all duration-300 origin-center"
              style={{
                transform: menuOpen ? "rotate(-45deg) translate(4px, -5px)" : "",
              }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-mono text-xs text-emerald-500/60 w-6">
                    {link.num}
                  </span>
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/blog"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-mono text-xs text-emerald-500/60 w-6">
                    ✦
                  </span>
                  <span className="text-sm font-medium">Blog</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
