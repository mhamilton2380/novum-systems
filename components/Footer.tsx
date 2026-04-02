import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(245,242,236,0.08)", padding: "64px 32px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "26px", height: "26px", background: "var(--gold)", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" fill="var(--ink)" />
                  <rect x="9" y="2" width="5" height="5" rx="1" fill="var(--ink)" opacity="0.6" />
                  <rect x="2" y="9" width="5" height="5" rx="1" fill="var(--ink)" opacity="0.6" />
                  <rect x="9" y="9" width="5" height="5" rx="1" fill="var(--ink)" />
                </svg>
              </div>
              <span className="font-serif" style={{ fontSize: "1rem", color: "var(--ivory)" }}>Novum Systems</span>
            </div>
            <p style={{ color: "var(--ivory-muted)", fontSize: "0.88rem", lineHeight: "1.7", maxWidth: "280px" }}>
              Software that adapts to your business. Operational systems tailored to how you actually run.
            </p>
            <p style={{ color: "rgba(196, 191, 181, 0.45)", fontSize: "0.78rem", marginTop: "24px" }}>
              © {new Date().getFullYear()} Novum Systems LLC
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px" }}>Systems</p>
            {["FieldOps", "ProjectOps", "OpsCore"].map((s) => (
              <Link key={s} href="/systems" style={{ display: "block", color: "var(--ivory-muted)", fontSize: "0.88rem", textDecoration: "none", marginBottom: "12px" }}>{s}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px" }}>Company</p>
            {[{ label: "Approach", href: "/approach" }, { label: "Systems", href: "/systems" }, { label: "Contact", href: "/contact" }].map((l) => (
              <Link key={l.label} href={l.href} style={{ display: "block", color: "var(--ivory-muted)", fontSize: "0.88rem", textDecoration: "none", marginBottom: "12px" }}>{l.label}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px" }}>Get Started</p>
            <p style={{ color: "var(--ivory-muted)", fontSize: "0.88rem", marginBottom: "16px", lineHeight: "1.6" }}>Ready to build a system around your operations?</p>
            <Link href="/contact" className="btn-primary" style={{ display: "inline-block", padding: "10px 20px", borderRadius: "7px", fontSize: "0.85rem", textDecoration: "none" }}>
              Book a Discovery Call
            </Link>
          </div>
        </div>

        <div className="divider-line" />
        <p style={{ textAlign: "center", color: "rgba(196, 191, 181, 0.3)", fontSize: "0.75rem", marginTop: "32px", letterSpacing: "0.03em" }}>
          Built for operators. Designed to last.
        </p>
      </div>
    </footer>
  );
}
