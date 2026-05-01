"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import dynamic from "next/dynamic";
import slugify from "slugify";

const MdxEditor = dynamic(() => import("./MdxEditor"), { ssr: false });

interface BlogFormProps {
  initialData?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverUrl?: string;
    tags?: string[];
    status?: string;
  };
}

export default function BlogForm({ initialData = {} }: BlogFormProps) {
  const router = useRouter();
  const isEdit = !!initialData.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: initialData.title ?? "",
    slug: initialData.slug ?? "",
    excerpt: initialData.excerpt ?? "",
    content: initialData.content ?? "",
    coverUrl: initialData.coverUrl ?? "",
    tags: initialData.tags?.join(", ") ?? "",
    status: initialData.status ?? "DRAFT",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = isEdit
      ? await fetch(`/api/blog/${initialData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    } else {
      router.push("/admin/blog");
      router.refresh();
    }
  }

  const inputStyle = {
    background: "var(--bg-tertiary)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Title *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => {
            const newTitle = e.target.value;
            setForm((f) => ({ 
              ...f, 
              title: newTitle,
              slug: !isEdit ? slugify(newTitle, { lower: true, strict: true }) : f.slug
            }));
          }}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Slug
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Tags (comma separated)
        </label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Cover Image
        </label>
        <ImageUpload
          value={form.coverUrl}
          onChange={(url) => setForm((f) => ({ ...f, coverUrl: url }))}
        />
      </div>

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Excerpt
        </label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Content (Markdown)
        </label>
        <MdxEditor
          value={form.content}
          onChange={(val) => setForm((f) => ({ ...f, content: val }))}
        />
      </div>

      <div>
        <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        >
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>
      </div>

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
          {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
        </button>
        <a
          href="/admin/blog"
          className="px-6 py-2.5 rounded-lg font-mono text-sm"
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
