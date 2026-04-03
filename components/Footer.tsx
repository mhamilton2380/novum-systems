"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#f0ede8", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div style={{ padding: "72px 48px 0", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 24 }}>
              <div style={{ width: 28, height: 28, background: "#17181B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white"/>
                  <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.42"/>
                  <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.42"/>
                  <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.975rem", color: "#17181B", letterSpacing: "-0.015em" }}>Novum Systems</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6560", lineHeight: 1.75, margin: "0 0 6px" }}>hello@novumsystems.co</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6560", lineHeight: 1.75, margin: 0 }}>Operational software for growing businesses.</p>
          </div>

          {/* Systems */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#17181B", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Systems</p>
            {(["Forge", "OpsCore", "ProjectOps", "FieldOps"] as const).map((s) => (
              <Link key={s} href="/systems"
                style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6560", textDecoration: "none", marginBottom: 11, transition: "color 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#17181B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
              >{s}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#17181B", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Company</p>
            {([["Approach", "/approach"], ["Systems", "/systems"], ["Contact", "/contact"]] as const).map(([label, href]) => (
              <Link key={label} href={href}
                style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6560", textDecoration: "none", marginBottom: 11, transition: "color 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#17181B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
              >{label}</Link>
            ))}
          </div>

          {/* Get Started */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#17181B", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Get Started</p>
            {([["Book a Discovery Call", "/contact"], ["Explore Systems", "/systems"]] as const).map(([label, href]) => (
              <Link key={label} href={href}
                style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6560", textDecoration: "none", marginBottom: 11, transition: "color 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#17181B"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
              >{label}</Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{ padding: "18px 0 0" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#a09890", margin: 0 }}>Novum Systems © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Big NOVUM wordmark */}
      <div style={{ overflow: "hidden", lineHeight: 0.82, marginTop: 8 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(90px, 22.5vw, 280px)",
          color: "#17181B",
          letterSpacing: "-0.045em",
          margin: 0,
          padding: "0 36px",
          userSelect: "none",
        }}>NOVUM</p>
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
