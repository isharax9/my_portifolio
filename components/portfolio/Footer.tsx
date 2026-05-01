export default function Footer() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-primary)",
      }}
    >
      <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
        Designed & Built by{" "}
        <span style={{ color: "var(--accent-green)" }}>Ishara Lakshitha</span>{" "}
        · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
