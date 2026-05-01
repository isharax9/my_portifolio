"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CertificationsFormProps {
  initialData?: {
    id?: string;
    name?: string;
    issuer?: string;
    issuedDate?: string | Date;
    credentialUrl?: string;
    badgeUrl?: string;
    order?: number;
  };
}

export default function CertificationsForm({ initialData = {} }: CertificationsFormProps) {
  const router = useRouter();
  const isEdit = !!initialData.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: initialData.name ?? "",
    issuer: initialData.issuer ?? "",
    issuedDate: initialData.issuedDate 
      ? new Date(initialData.issuedDate).toISOString().split('T')[0] 
      : "",
    credentialUrl: initialData.credentialUrl ?? "",
    badgeUrl: initialData.badgeUrl ?? "",
    order: initialData.order ?? 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        issuedDate: new Date(form.issuedDate).toISOString(),
        order: Number(form.order),
      };

      const res = isEdit
        ? await fetch(`/api/certifications/${initialData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/certifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      setLoading(false);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
      } else {
        router.push("/admin/certifications");
        router.refresh();
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  }

  function field(label: string, key: keyof typeof form, type: "text" | "number" | "date" = "text") {
    const value = form[key];
    return (
      <div key={key}>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          {label}
        </label>
        <input
          type={type}
          value={value as string | number}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          required={key === "name" || key === "issuer" || key === "issuedDate"}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {field("Name *", "name")}
      {field("Issuer *", "issuer")}
      {field("Issued Date *", "issuedDate", "date")}
      {field("Credential URL", "credentialUrl")}
      {field("Badge URL", "badgeUrl")}
      {field("Order", "order", "number")}

      {error && (
        <p className="font-mono text-sm" style={{ color: "#f87171" }}>
          ✗ {error}
        </p>
      )}

      <div className="flex gap-3 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg font-mono text-sm font-semibold"
          style={{ background: "var(--accent-green)", color: "#000", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Saving..." : isEdit ? "Update Certification" : "Create Certification"}
        </button>
        <a
          href="/admin/certifications"
          className="px-6 py-2.5 rounded-lg font-mono text-sm"
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
