"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SkillsForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    level: "3",
    iconSlug: "",
    order: "0",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, level: Number(form.level), order: Number(form.order) }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Error");
    } else {
      setForm({ name: "", category: "", level: "3", iconSlug: "", order: "0" });
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
        { label: "Name *", key: "name" },
        { label: "Category *", key: "category", placeholder: "e.g. Frontend" },
        { label: "Icon Slug", key: "iconSlug", placeholder: "e.g. react" },
        { label: "Level (1-5)", key: "level", type: "number" },
        { label: "Order", key: "order", type: "number" },
      ].map(({ label, key, type = "text", placeholder }) => (
        <div key={key}>
          <label className="block font-mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>
            {label}
          </label>
          <input
            type={type}
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            placeholder={placeholder}
            min={type === "number" ? "0" : undefined}
            max={key === "level" ? "5" : undefined}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={inputStyle}
          />
        </div>
      ))}
      {error && <p className="font-mono text-xs" style={{ color: "#f87171" }}>✗ {error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg font-mono text-sm font-semibold"
        style={{ background: "var(--accent-green)", color: "#000", opacity: loading ? 0.6 : 1 }}
      >
        {loading ? "Adding..." : "+ Add Skill"}
      </button>
    </form>
  );
}
