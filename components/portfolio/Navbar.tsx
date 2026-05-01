"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of sections.reverse()) {
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10, 10, 10, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-lg font-bold"
          style={{ color: "var(--accent-green)" }}
        >
          <span style={{ color: "var(--text-muted)" }}>&gt;</span> ishara
          <span className="animate-pulse">_</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm transition-colors duration-200"
                style={{
                  color:
                    activeSection === link.href.slice(1)
                      ? "var(--accent-green)"
                      : "var(--text-secondary)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    activeSection === link.href.slice(1)
                      ? "var(--accent-green)"
                      : "var(--text-secondary)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--text-primary)",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--text-primary)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "var(--text-primary)",
              transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-6"
            style={{
              background: "rgba(10, 10, 10, 0.97)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-sm py-1"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="block text-sm py-1"
                  style={{ color: "var(--text-secondary)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
