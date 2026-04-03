import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "64px 48px 40px", background: "var(--surface)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "48px",
          marginBottom: "64px",
        }}>
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "26px", height: "26px",
                background: "var(--hero)",
                borderRadius: "6px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                  <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                  <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                  <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
                </svg>
              </div>
              <span className="font-serif" style={{ fontSize: "1rem", color: "var(--text)" }}>Novum Systems</span>
            </div>
            <p style={{ color: "var(--text-soft)", fontSize: "0.88rem", lineHeight: "1.7", maxWidth: "280px" }}>
              Software that adapts to your business. Operational systems tailored to how you actually run.
            </p>
            <p style={{ color: "var(--text-soft)", fontSize: "0.78rem", marginTop: "24px", opacity: 0.6 }}>
              © {new Date().getFullYear()} Novum Systems LLC
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "20px" }}>Systems</p>
            {[
              { name: "OpsCore", href: "/systems#opscore" },
              { name: "FieldOps", href: "/systems#fieldops" },
              { name: "ProjectOps", href: "/systems#projectops" },
              { name: "Forge", href: "/systems#forge" },
            ].map((s) => (
              <Link key={s.name} href={s.href} style={{ display: "block", color: "var(--text-soft)", fontSize: "0.88rem", textDecoration: "none", marginBottom: "12px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-soft)"}
              >{s.name}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "20px" }}>Company</p>
            {[{ label: "Approach", href: "/approach" }, { label: "Systems", href: "/systems" }, { label: "Contact", href: "/contact" }].map((l) => (
              <Link key={l.label} href={l.href} style={{ display: "block", color: "var(--text-soft)", fontSize: "0.88rem", textDecoration: "none", marginBottom: "12px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-soft)"}
              >{l.label}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-soft)", marginBottom: "20px" }}>Get Started</p>
            <p style={{ color: "var(--text-soft)", fontSize: "0.88rem", marginBottom: "16px", lineHeight: "1.6" }}>
              Ready to build a system around your operations?
            </p>
            <Link href="/contact" style={{
              display: "inline-block",
              padding: "10px 22px",
              borderRadius: "100px",
              background: "var(--text)",
              color: "#fff",
              fontSize: "0.85rem",
              fontWeight: "600",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--accent)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--text)"}
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border)" }} />
        <p style={{ textAlign: "center", color: "var(--text-soft)", fontSize: "0.75rem", marginTop: "32px", letterSpacing: "0.03em", opacity: 0.6 }}>
          Built for operators. Designed to last.
        </p>
      </div>
    </footer>
  );
}
