"use client";
import Link from "next/link";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background: "#0b1b2e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ padding: "72px 48px 0", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 24 }}><Logo dark /></div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>We replace SaaS subscriptions with custom software built around how your business actually works.</p>
          </div>

          {/* Systems */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#EAEAEA", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Systems</p>
            {([["Core", "core"], ["Integrations", "integrations"], ["Vault", "vault"], ["AI Assistant", "assistant"], ["Agents", "agents"]] as const).map(([s, id]) => (
              <Link key={s} href={`/solutions#${id}`}
                style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 11, transition: "color 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EAEAEA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
              >{s}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#EAEAEA", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Company</p>
            {([["Solutions", "/solutions"], ["Use Cases", "/use-cases"], ["How We Work", "/how-we-work"], ["About", "/about"], ["Case Study", "/case-studies"]] as const).map(([label, href]) => (
              <Link key={label} href={href}
                style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 11, transition: "color 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EAEAEA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
              >{label}</Link>
            ))}
          </div>

          {/* Get Started */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#EAEAEA", marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Get Started</p>
            {([["Book a Call", "/contact"], ["Explore Solutions", "/solutions"]] as const).map(([label, href]) => (
              <Link key={label} href={href}
                style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 11, transition: "color 0.18s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#EAEAEA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"; }}
              >{label}</Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{ padding: "18px 0 0" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>Novum AI © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Big NOVUM wordmark */}
      <div style={{ overflow: "hidden", lineHeight: 0.82, marginTop: 8 }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(90px, 22.5vw, 280px)",
          color: "#EAEAEA",
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
