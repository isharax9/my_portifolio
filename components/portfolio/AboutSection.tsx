"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "3", label: "Countries Worked" },
  { value: "∞", label: "Coffee Consumed" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p
            className="font-mono text-sm mb-2"
            style={{ color: "var(--accent-green)" }}
          >
            01. About
          </p>
          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Who Am I?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              I&apos;m <strong style={{ color: "var(--text-primary)" }}>Ishara Lakshitha</strong>, a Software Engineer & DevOps specialist currently working at{" "}
              <strong style={{ color: "var(--accent-green)" }}>KingIT Solutions</strong> (UK, Remote). I build and maintain scalable cloud infrastructure and distributed systems.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              My journey started with freelance graphic design on Fiverr, evolved through junior software development, and accelerated with DevOps engineering — giving me a unique full-stack perspective on building products end-to-end.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              I hold a BSc (Hons) in Computer Science from the University of Plymouth (through NIBM Sri Lanka). I&apos;m passionate about automation, CI/CD, cloud-native architectures, and writing clean, maintainable code.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["AWS", "Node.js", "Docker", "PostgreSQL", "Next.js", "Jenkins"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(29, 158, 117, 0.1)",
                      border: "1px solid var(--border-accent)",
                      color: "var(--accent-green)",
                    }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="card p-6 text-center"
                >
                  <div
                    className="text-4xl font-bold font-mono mb-2"
                    style={{ color: "var(--accent-green)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className="card p-6"
              style={{ borderColor: "var(--border-accent)" }}
            >
              <p
                className="font-mono text-sm mb-1"
                style={{ color: "var(--accent-green)" }}
              >
                📍 Location
              </p>
              <p style={{ color: "var(--text-primary)" }}>
                United Kingdom (Remote)
              </p>
              <p
                className="font-mono text-sm mb-1 mt-4"
                style={{ color: "var(--accent-green)" }}
              >
                🎓 Education
              </p>
              <p style={{ color: "var(--text-primary)" }}>
                BSc (Hons) Computer Science
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                University of Plymouth · NIBM Sri Lanka
              </p>
              <p
                className="font-mono text-sm mb-1 mt-4"
                style={{ color: "var(--accent-green)" }}
              >
                📧 Email
              </p>
              <a
                href="mailto:isharax9@gmail.com"
                style={{ color: "var(--text-primary)" }}
              >
                isharax9@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
