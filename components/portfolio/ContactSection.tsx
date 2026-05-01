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

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/isharax9", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
    { name: "LinkedIn", url: "https://linkedin.com/in/isharax9", icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" },
    { name: "Twitter/X", url: "https://twitter.com/isharax9", icon: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
    { name: "YouTube", url: "https://youtube.com/@isharax9", icon: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" },
    { name: "Medium", url: "https://medium.com/@isharax9", icon: "M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h5.458l4.235 9.26 3.69-9.26h5.49v.404l-2.164 2.12c-.172.164-.266.39-.247.625v10.366c-.02.235.074.46.248.625l2.126 2.118v.4h-6.732v-.4l2.168-2.12c.174-.162.268-.388.248-.623v-8.667l-4.103 9.682h-.766l-4.883-9.682v9.336c.004.316.14.618.374.82l2.677 3.238v.4h-7.39v-.4l2.678-3.24c.234-.202.37-.504.375-.82V6.887z" },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Text & Socials */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div>
            <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
              06. Contact
            </p>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Let's build something together.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Have a project in mind, a question about my work, or just want to say hi? 
              My inbox is always open. I'm currently looking for new opportunities and 
              always excited to connect with other developers.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-sm" style={{ color: "var(--text-primary)" }}>
              Connect with me
            </h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors duration-200 group w-fit"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:text-[var(--accent-green)]"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d={link.icon} />
                    </svg>
                  </span>
                  <span className="group-hover:text-[var(--text-primary)]">{link.name}</span>
                </a>
              ))}
              
              <a
                href="mailto:isharax9@gmail.com"
                className="flex items-center gap-3 text-sm transition-colors duration-200 group w-fit"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:text-[var(--accent-green)]"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="group-hover:text-[var(--text-primary)]">isharax9@gmail.com</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="card p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="block text-sm mb-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  placeholder="John Doe"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent-green)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm mb-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  placeholder="john@example.com"
                  type="email"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent-green)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--border)")
                  }
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                className="block text-sm mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Subject
              </label>
              <input
                {...register("subject")}
                placeholder="Project Inquiry"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--accent-green)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Message
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--accent-green)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border)")
                }
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {status === "success" && (
              <div
                className="text-sm p-3 rounded-lg"
                style={{
                  background: "rgba(29,158,117,0.1)",
                  border: "1px solid var(--border-accent)",
                  color: "var(--accent-green)",
                }}
              >
                ✓ Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div
                className="text-sm p-3 rounded-lg"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
              >
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-lg font-medium text-sm transition-all duration-200"
              style={{
                background:
                  status === "loading" ? "var(--bg-card)" : "var(--accent-green)",
                color: status === "loading" ? "var(--text-muted)" : "#0a0a0a",
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
