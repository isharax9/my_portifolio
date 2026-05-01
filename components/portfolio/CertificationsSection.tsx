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

export default function CertificationsSection({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            05. Certifications
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Credentials
          </h2>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 min-w-64 shrink-0 snap-start relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(29,158,117,0.08) 50%, transparent 60%)",
                  transform: "translateX(-100%)",
                }}
              />

              <div
                className="text-2xl mb-4"
                style={{ color: "var(--accent-purple)" }}
              >
                🏆
              </div>
              <h3
                className="font-semibold text-sm mb-1 leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {cert.name}
              </h3>
              <p
                className="text-xs mb-3"
                style={{ color: "var(--accent-green)" }}
              >
                {cert.issuer}
              </p>
              <p
                className="font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {formatYear(cert.issuedDate)}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs font-mono transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent-green)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  View Credential ↗
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
