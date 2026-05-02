import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 lg:px-8 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + credit */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center font-mono text-[10px] font-bold text-[#030712]">
              IL
            </div>
            <p className="font-mono text-xs text-slate-500">
              Designed & Built by{" "}
              <span className="text-slate-300">Ishara Lakshitha</span>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
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
                className="text-xs text-slate-500 hover:text-emerald-400 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Year */}
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
