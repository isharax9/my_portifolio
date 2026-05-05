import Link from "next/link";

const links = [
  { href: "https://github.com/isharax9", label: "GitHub" },
  { href: "https://linkedin.com/in/isharax9", label: "LinkedIn" },
  { href: "https://twitter.com/isharax9", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 px-3 pb-6 pt-2 sm:px-4 sm:pb-8">
      <div className="mx-auto w-full max-w-6xl rounded-[1.6rem] border border-white/8 bg-[#07111f]/70 px-5 py-5 backdrop-blur-xl sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-emerald-400 to-sky-400 font-mono text-sm font-bold text-[#04101a]">
              IL
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Ishara Lakshitha</p>
              <p className="text-sm text-slate-400">
                Software engineer focused on clean products and reliable delivery.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/blog" className="button-secondary px-4 py-2.5 text-sm">
              Blog
            </Link>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-white/8 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Designed for a clearer experience across mobile, tablet, and desktop.</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
