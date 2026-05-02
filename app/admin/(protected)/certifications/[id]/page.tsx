import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CertificationsForm from "@/components/admin/CertificationsForm";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let cert = null;
  try {
    cert = await prisma.certification.findUnique({ where: { id } });
  } catch {
    // DB not connected
  }
  
  if (!cert) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        Edit Certification
      </h1>
      <CertificationsForm
        initialData={{
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          issuedDate: cert.issuedDate,
          credentialUrl: cert.credentialUrl ?? "",
          badgeUrl: cert.badgeUrl ?? "",
          order: cert.order,
        }}
      />
    </div>
  );
}
