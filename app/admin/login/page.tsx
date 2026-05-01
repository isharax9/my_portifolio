"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="card p-8 w-full max-w-md">
        <div className="mb-8 text-center">
          <p
            className="font-mono text-sm mb-1"
            style={{ color: "var(--accent-green)" }}
          >
            &gt; authenticate
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Admin Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block font-mono text-xs mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
          <div>
            <label
              className="block font-mono text-xs mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
              style={{
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--border-accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {error && (
            <p className="text-sm font-mono" style={{ color: "#f87171" }}>
              ✗ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-mono text-sm font-semibold transition-opacity"
            style={{
              background: "var(--accent-green)",
              color: "#000",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Authenticating..." : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}
