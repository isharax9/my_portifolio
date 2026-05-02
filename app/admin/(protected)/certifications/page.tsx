import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function CertificationsAdmin() {
  let certs: Awaited<ReturnType<typeof prisma.certification.findMany>> = [];
  try {
    certs = await prisma.certification.findMany({ orderBy: { order: "asc" } });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Certifications
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {certs.length} total
          </p>
        </div>
        <Link
          href="/admin/certifications/new"
          className="px-4 py-2 rounded-lg font-mono text-sm font-semibold"
          style={{ background: "var(--accent-green)", color: "#000" }}
        >
          + New Certification
        </Link>
      </div>

      <div className="space-y-3">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="card p-4 flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <h2
                className="font-semibold text-sm truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {cert.name}
              </h2>
              <p
                className="text-xs mt-0.5 truncate"
                style={{ color: "var(--text-muted)" }}
              >
                {cert.issuer} • {new Date(cert.issuedDate).getFullYear()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/certifications/${cert.id}`}
                className="font-mono text-xs px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                Edit
              </Link>
              <DeleteButton id={cert.id} endpoint="/api/certifications" />
            </div>
          </div>
        ))}
        {certs.length === 0 && (
          <p
            className="text-center py-12 font-mono text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No certifications yet. Add one!
          </p>
        )}
      </div>
    </div>
  );
}
