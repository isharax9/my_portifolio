"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

interface ExperienceFormProps {
  initialData?: {
    id?: string;
    company?: string;
    role?: string;
    startDate?: string | Date;
    endDate?: string | Date | null;
    location?: string;
    description?: string;
    logoUrl?: string;
    order?: number;
  };
}

export default function ExperienceForm({ initialData = {} }: ExperienceFormProps) {
  const router = useRouter();
  const isEdit = !!initialData.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const initialStartDate = initialData.startDate 
    ? new Date(initialData.startDate).toISOString().split('T')[0] 
    : "";
    
  const initialEndDate = initialData.endDate 
    ? new Date(initialData.endDate).toISOString().split('T')[0] 
    : "";

  const [form, setForm] = useState({
    company: initialData.company ?? "",
    role: initialData.role ?? "",
    startDate: initialStartDate,
    endDate: initialEndDate,
    current: !initialData.endDate && isEdit ? true : false,
    location: initialData.location ?? "",
    description: initialData.description ?? "",
    logoUrl: initialData.logoUrl ?? "",
    order: initialData.order ?? 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        company: form.company,
        role: form.role,
        startDate: new Date(form.startDate).toISOString(),
        endDate: form.current || !form.endDate ? null : new Date(form.endDate).toISOString(),
        location: form.location,
        description: form.description,
        logoUrl: form.logoUrl || null,
        order: Number(form.order),
      };

      const res = isEdit
        ? await fetch(`/api/experience/${initialData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/experience", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      setLoading(false);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
      } else {
        router.push("/admin/experience");
        router.refresh();
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  }

  function field(label: string, key: keyof typeof form, type: "text" | "number" | "date" = "text", required = false) {
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
          required={required}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("Role *", "role", "text", true)}
        {field("Company *", "company", "text", true)}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("Start Date *", "startDate", "date", true)}
        <div>
          <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
            End Date
          </label>
          <input
            type="date"
            value={form.endDate as string}
            onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
            disabled={form.current as boolean}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none disabled:opacity-50"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer mt-2">
        <input
          type="checkbox"
          checked={form.current as boolean}
          onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))}
          className="w-4 h-4"
          style={{ accentColor: "var(--accent-green)" }}
        />
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          I currently work here
        </span>
      </label>

      {field("Location *", "location", "text", true)}
      
      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Logo
        </label>
        <ImageUpload
          value={form.logoUrl as string}
          onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
        />
      </div>

      {field("Order", "order", "number")}

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Description (Markdown bullets) *
        </label>
        <textarea
          value={form.description as string}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={5}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none font-mono"
          style={{
            background: "var(--bg-tertiary)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          required
        />
      </div>

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
          {loading ? "Saving..." : isEdit ? "Update Experience" : "Add Experience"}
        </button>
        <a
          href="/admin/experience"
          className="px-6 py-2.5 rounded-lg font-mono text-sm"
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
