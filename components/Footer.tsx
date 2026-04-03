"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #E8E6E1", background: "#FAFAF8", padding: "64px 40px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "48px", marginBottom: "56px" }} className="footer-grid">

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "24px", background: "#1C1E26", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.45" />
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.45" />
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
                </svg>
              </div>
              <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "#1A1A1A", letterSpacing: "-0.01em" }}>Novum Systems</span>
            </div>
            <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: "1.7", maxWidth: "260px" }}>
              Software that adapts to your business. Operational systems tailored to how you actually run.
            </p>
            <p style={{ color: "#B0ADA8", fontSize: "0.75rem", marginTop: "24px" }}>
              © {new Date().getFullYear()} Novum Systems LLC
            </p>
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B0ADA8", marginBottom: "18px" }}>Systems</p>
            {[["OpsCore", "/systems#opscore"], ["FieldOps", "/systems#fieldops"], ["ProjectOps", "/systems#projectops"], ["Forge", "/systems#forge"]].map(([n, h]) => (
              <Link key={n} href={h} style={{ display: "block", color: "#7A7774", fontSize: "0.875rem", textDecoration: "none", marginBottom: "11px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#1A1A1A"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#7A7774"}
              >{n}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B0ADA8", marginBottom: "18px" }}>Company</p>
            {[["Approach", "/approach"], ["Systems", "/systems"], ["Contact", "/contact"]].map(([n, h]) => (
              <Link key={n} href={h} style={{ display: "block", color: "#7A7774", fontSize: "0.875rem", textDecoration: "none", marginBottom: "11px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#1A1A1A"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#7A7774"}
              >{n}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B0ADA8", marginBottom: "18px" }}>Get Started</p>
            <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: "1.65", marginBottom: "18px" }}>
              Ready to build a system around your operations?
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", padding: "10px 22px", borderRadius: "100px",
              background: "#1C1E26", color: "#fff", fontSize: "0.85rem", fontWeight: 600,
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#3A5585"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1C1E26"}
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>

        <div style={{ height: "1px", background: "#E8E6E1" }} />
        <p style={{ textAlign: "center", color: "#B0ADA8", fontSize: "0.75rem", marginTop: "28px", letterSpacing: "0.03em" }}>
          Built for operators. Designed to last.
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
