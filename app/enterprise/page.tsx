"use client";
import Link from "next/link";
import DotCanvas from "@/components/DotCanvas";

export default function EnterprisePage() {
  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "700px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginBottom: "28px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
              Enterprise
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px",
            }}>
              Built for operations<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(0,200,122,0.9)", textShadow: "0 0 24px rgba(0,200,122,0.5), 0 0 70px rgba(0,200,122,0.2)" }}>at scale.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "580px", marginBottom: "40px" }}>
              Larger organizations don&apos;t need more software. They need a coherent operational layer — one that connects their teams, surfaces their data, and enforces the right access at every level. That&apos;s what we build.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "100px",
                background: "#00C87A", color: "#0a1a12",
                fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
              }}>
                Schedule a conversation →
              </Link>
              <Link href="/systems" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 32px", borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
                fontSize: "0.92rem", fontWeight: 500, textDecoration: "none",
              }}>
                View our systems
              </Link>
            </div>
          </div>
        </div>
      </section>


      <style jsx>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .two-col > div:first-child { position: static !important; }
        }
      `}</style>
    </div>
  );
}
