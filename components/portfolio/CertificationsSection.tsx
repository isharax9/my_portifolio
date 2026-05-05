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

const issuerAccents: Record<string, string> = {
  Neo4j: "from-cyan-300/25 to-sky-400/8 border-cyan-200/20",
  "Grafana Labs": "from-amber-300/24 to-orange-400/10 border-amber-200/20",
};

function formatYear(date: string) {
  return new Date(date).getFullYear();
}

export default function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="relative">
      <div className="section-shell">
        <div className="section-header">
          <div>
            <span className="section-label">Certifications</span>
            <h2 className="section-title mt-4">
              Proof of practice, not just <span className="gradient-text">theory</span>
            </h2>
          </div>
          <p className="section-copy">
            Certifications are a smaller part of the story, but they reflect the areas I keep
            sharpening around cloud tooling, observability, and data systems.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.05 }}
              className="surface-panel overflow-hidden p-5 sm:p-6"
            >
              <div
                className={`rounded-[1.35rem] border bg-gradient-to-br p-4 ${
                  issuerAccents[cert.issuer] ?? "from-emerald-300/24 to-cyan-400/8 border-emerald-200/18"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07111f]/72 text-white">
                    <BadgeIcon />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.26em] text-slate-100/72">
                    {formatYear(cert.issuedDate)}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">{cert.issuer}</p>
              </div>

              <h3 className="mt-5 text-lg font-semibold leading-7 text-white">{cert.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Credential earned through {cert.issuer}, reinforcing hands-on knowledge in
                production tooling and platform engineering.
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="pill px-3 py-1.5 text-[0.72rem]">{cert.issuer}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-100 transition-colors hover:text-white"
                  >
                    Verify
                    <ArrowIcon />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="m8.2 13.9-1.2 9.1L12 20l5 3-1.2-9.1" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
