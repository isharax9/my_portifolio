"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExperienceFormSimple() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    techStack: "",
    order: "0",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      role: form.role,
      company: form.company,
      location: form.location || undefined,
      startDate: form.startDate,
      endDate: form.current ? null : form.endDate || null,
      current: form.current,
      description: form.description,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
    };
    const res = await fetch("/api/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Error");
    } else {
      setForm({ role: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", techStack: "", order: "0" });
      router.refresh();
    }
  }

  const inputStyle = {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <form onSubmit={handleSubmit} className="card p-5 space-y-4">
      {[
        { label: "Role *", key: "role" },
        { label: "Company *", key: "company" },
        { label: "Location", key: "location" },
        { label: "Start Date *", key: "startDate", type: "date" },
        { label: "End Date", key: "endDate", type: "date" },
        { label: "Tech Stack (comma separated)", key: "techStack" },
        { label: "Order", key: "order", type: "number" },
      ].map(({ label, key, type = "text" }) => (
        <div key={key}>
          <label className="block font-mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            {label}
          </label>
          <input
            type={type}
            value={form[key as keyof typeof form] as string}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
        </div>
      ))}
      <div>
        <label className="block font-mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
          style={inputStyle}
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.current}
          onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))}
          style={{ accentColor: "var(--accent-green)" }}
        />
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Current Position
        </span>
      </label>
      {error && <p className="font-mono text-xs" style={{ color: "#f87171" }}>✗ {error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg font-mono text-sm font-semibold"
        style={{ background: "var(--accent-green)", color: "#000", opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Adding..." : "+ Add Experience"}
      </button>
    </form>
  );
}
