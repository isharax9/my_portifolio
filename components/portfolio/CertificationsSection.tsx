"use client";

import { motion } from "framer-motion";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialUrl: string | null;
  badgeUrl: string | null;
}

function formatYear(dateStr: string) {
  return new Date(dateStr).getFullYear();
}

const ISSUER_COLORS: Record<string, string> = {
  "Neo4j": "from-cyan-500 to-blue-500",
  "Grafana Labs": "from-orange-500 to-amber-500",
  "default": "from-emerald-500 to-cyan-500",
};

export default function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.015] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Certifications</span>
          <h2 className="section-title mt-4">
            <span className="gradient-text">Credentials</span> & Badges
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto">
            Professional certifications and learning milestones
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const gradientClass = ISSUER_COLORS[cert.issuer] || ISSUER_COLORS["default"];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group card p-6 relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${gradientClass} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Badge icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#030712" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>

                <h3 className="font-semibold text-white text-sm leading-tight mb-2 group-hover:text-emerald-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-xs text-emerald-400 font-mono mb-4">
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-mono text-xs text-slate-500">
                    {formatYear(cert.issuedDate)}
                  </span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors font-mono"
                    >
                      Verify
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
