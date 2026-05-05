"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const socialLinks = [
  { name: "GitHub", url: "https://github.com/isharax9", icon: <GithubIcon /> },
  { name: "LinkedIn", url: "https://linkedin.com/in/isharax9", icon: <LinkedInIcon /> },
  { name: "Twitter / X", url: "https://twitter.com/isharax9", icon: <TwitterIcon /> },
  { name: "YouTube", url: "https://youtube.com/@isharax9", icon: <PlayIcon /> },
];

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-shell">
        <div className="section-header">
          <div>
            <span className="section-label">Contact</span>
            <h2 className="section-title mt-4">
              Let&apos;s make the next build <span className="gradient-text">feel sharper</span>
            </h2>
          </div>
          <p className="section-copy">
            If you&apos;re hiring, planning a product, or need help making an existing stack more
            dependable, I&apos;d love to hear what you&apos;re building.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4"
          >
            <div className="surface-panel-strong p-6 sm:p-7">
              <span className="pill pill-strong w-fit px-3 py-1.5 text-[0.72rem]">
                Available for freelance and full-time work
              </span>
              <p className="mt-5 text-2xl font-semibold text-white">
                Best contact method
              </p>
              <a
                href="mailto:isharax9@gmail.com"
                className="mt-3 inline-flex items-center gap-3 text-lg text-cyan-100 transition-colors hover:text-white"
              >
                <MailIcon />
                isharax9@gmail.com
              </a>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Typical topics: product builds, cloud architecture, CI/CD improvements,
                performance cleanups, and maintainability work on existing codebases.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-panel flex items-center gap-4 p-5 transition-colors hover:border-cyan-200/18"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-cyan-100">
                    {link.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{link.name}</p>
                    <p className="text-sm text-slate-400">Open profile</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="surface-panel p-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">
                Working style
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <InfoStrip title="Clear communication" copy="Fast updates, honest tradeoffs, and low-ego collaboration." />
                <InfoStrip title="Practical delivery" copy="I care about shipping, not just perfect diagrams." />
                <InfoStrip title="Long-term thinking" copy="Performance, reliability, and maintainability stay in scope." />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08 }}
            className="surface-panel p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    placeholder="Jane Doe"
                    className={inputClassName}
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="jane@example.com"
                    className={inputClassName}
                  />
                </Field>
              </div>

              <Field label="Subject" error={errors.subject?.message}>
                <input
                  {...register("subject")}
                  placeholder="How can we work together?"
                  className={inputClassName}
                />
              </Field>

              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={6}
                  placeholder="Tell me a little about the product, challenge, or role."
                  className={`${inputClassName} min-h-36 resize-none`}
                />
              </Field>

              {status === "success" && (
                <div className="rounded-[1.15rem] border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                  Message sent successfully. I&apos;ll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-[1.15rem] border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`button-primary w-full ${status === "loading" ? "cursor-not-allowed opacity-75" : ""}`}
              >
                {status === "loading" ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-[#04101a]/40 border-t-[#04101a] animate-spin" />
                    Sending message
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/68">
        {label}
      </span>
      {children}
      {error && <span className="text-sm text-rose-200">{error}</span>}
    </label>
  );
}

function InfoStrip({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[1rem] border border-white/7 bg-white/4 px-4 py-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
    </div>
  );
}

const inputClassName =
  "w-full rounded-[1rem] border border-white/10 bg-[#091728]/78 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-200/28";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 3a10.9 10.9 0 0 1-3.1 1.5A4.5 4.5 0 0 0 12 7.5v1A10.7 10.7 0 0 1 3 4s-4 9 5 13a11.7 11.7 0 0 1-7 2c9 5 20 0 20-11.5 0-.3 0-.6-.1-.8A7.7 7.7 0 0 0 23 3Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22.5 6.4a2.8 2.8 0 0 0-2-1.9C18.9 4 12 4 12 4s-6.9 0-8.5.5a2.8 2.8 0 0 0-2 1.9A30 30 0 0 0 1 12a30 30 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 1.9C5.1 20 12 20 12 20s6.9 0 8.5-.5a2.8 2.8 0 0 0 2-1.9A30 30 0 0 0 23 12a30 30 0 0 0-.5-5.6Z" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}
