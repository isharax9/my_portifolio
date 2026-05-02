import CertificationsForm from "@/components/admin/CertificationsForm";

export default function NewCertificationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
        New Certification
      </h1>
      <CertificationsForm />
    </div>
  );
}
