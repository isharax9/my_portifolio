"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/projects", label: "Projects", icon: "🚀" },
  { href: "/admin/blog", label: "Blog", icon: "✍️" },
  { href: "/admin/skills", label: "Skills", icon: "⚡" },
  { href: "/admin/experience", label: "Experience", icon: "💼" },
  { href: "/admin/certifications", label: "Certifications", icon: "🏆" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-60 shrink-0 flex flex-col"
      style={{
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        minHeight: "100vh",
      }}
    >
      <div
        className="p-6 font-mono font-bold text-base"
        style={{
          color: "var(--accent-green)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        &gt; admin_panel
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={{
                background: isActive
                  ? "rgba(29,158,117,0.1)"
                  : "transparent",
                color: isActive
                  ? "var(--accent-green)"
                  : "var(--text-secondary)",
                border: isActive
                  ? "1px solid var(--border-accent)"
                  : "1px solid transparent",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#f87171")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <span>🚪</span> Sign Out
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200 mt-1"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <span>🌐</span> View Site
        </Link>
      </div>
    </aside>
  );
}
