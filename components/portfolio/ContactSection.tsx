"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const socialLinks = [
  { name: "GitHub", url: "https://github.com/isharax9", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
  { name: "LinkedIn", url: "https://linkedin.com/in/isharax9", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
  { name: "Twitter/X", url: "https://twitter.com/isharax9", icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
  { name: "YouTube", url: "https://youtube.com/@isharax9", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" },
];

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title mt-4">
            Let&apos;s build something{" "}
            <span className="gradient-text">together</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto text-lg">
            Have a project in mind or just want to say hi?
            I&apos;m always open to new opportunities and connections.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Email card */}
            <a
              href="mailto:isharax9@gmail.com"
              className="card p-6 flex items-center gap-4 group hover:border-emerald-500/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                  Email me at
                </p>
                <p className="text-sm text-emerald-400 group-hover:text-emerald-300 transition-colors font-medium">
                  isharax9@gmail.com
                </p>
              </div>
            </a>

            {/* Social links */}
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">
                Connect with me
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card p-4 flex items-center gap-3 group hover:border-emerald-500/20"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300 shrink-0">
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d={link.icon} />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors font-medium">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="card p-5 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <p className="text-sm text-white font-medium">Currently available</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Open for freelance & full-time roles
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="card p-8 lg:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      placeholder="john@example.com"
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    {...register("subject")}
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
                  )}
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-sm">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    Message sent! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-red-400 text-sm">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    Something went wrong. Try again or email me directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    status === "loading"
                      ? "bg-white/[0.05] text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-[#030712] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
