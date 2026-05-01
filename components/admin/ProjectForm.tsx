"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

interface ProjectFormProps {
  initialData?: {
    id?: string;
    title?: string;
    description?: string;
    content?: string;
    tags?: string[];
    coverUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    order?: number;
  };
}

export default function ProjectForm({ initialData = {} }: ProjectFormProps) {
  const router = useRouter();
  const isEdit = !!initialData.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    content: initialData.content ?? "",
    tags: initialData.tags?.join(", ") ?? "",
    coverUrl: initialData.coverUrl ?? "",
    githubUrl: initialData.githubUrl ?? "",
    liveUrl: initialData.liveUrl ?? "",
    featured: initialData.featured ?? false,
    order: initialData.order ?? 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
    };
    const res = isEdit
      ? await fetch(`/api/projects/${initialData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    } else {
      router.push("/admin/projects");
      router.refresh();
    }
  }

  function field(
    label: string,
    key: keyof typeof form,
    type: "text" | "number" | "checkbox" | "textarea" = "text"
  ) {
    const value = form[key];
    if (type === "checkbox") {
      return (
        <label key={key} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.checked }))}
            className="w-4 h-4"
            style={{ accentColor: "var(--accent-green)" }}
          />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {label}
          </span>
        </label>
      );
    }
    return (
      <div key={key}>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            value={value as string}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        ) : (
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
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {field("Title *", "title")}
      {field("Short Description *", "description", "textarea")}
      {field("Long Description", "content", "textarea")}
      {field("Tags (comma separated)", "tags")}
      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Cover Image
        </label>
        <ImageUpload
          value={form.coverUrl}
          onChange={(url) => setForm((f) => ({ ...f, coverUrl: url }))}
        />
      </div>
      {field("GitHub URL", "githubUrl")}
      {field("Live URL", "liveUrl")}
      {field("Order", "order", "number")}
      {field("Featured", "featured", "checkbox")}

      {error && (
        <p className="font-mono text-sm" style={{ color: "#f87171" }}>
          ✗ {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg font-mono text-sm font-semibold"
          style={{ background: "var(--accent-green)", color: "#000", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </button>
        <a
          href="/admin/projects"
          className="px-6 py-2.5 rounded-lg font-mono text-sm"
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
