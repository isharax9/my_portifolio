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

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-sm mb-2" style={{ color: "var(--accent-green)" }}>
            06. Contact
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Get In Touch
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Or reach me directly at{" "}
            <a
              href="mailto:isharax9@gmail.com"
              style={{ color: "var(--accent-green)" }}
            >
              isharax9@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
