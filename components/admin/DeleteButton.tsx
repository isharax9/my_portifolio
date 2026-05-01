"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
  endpoint,
}: {
  id: string;
  endpoint: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="font-mono text-xs px-3 py-1.5 rounded-lg transition-colors"
      style={{
        border: "1px solid rgba(248,113,113,0.3)",
        color: "#f87171",
        opacity: loading ? 0.5 : 1,
      }}
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
