"use client";
import Link from "next/link";
import DotCanvas from "@/components/DotCanvas";

const cases = [
  {
    slug: "meridian-law",
    client: "Meridian Law Group",
    industry: "Legal Services",
    system: "OpsCore + Vault + A.R.I.S",
    headline: "From scattered documents and manual billing to a fully queryable knowledge base.",
    outcome: "40% reduction in time spent on document retrieval. Matter history surfaced instantly.",
    accent: "#1E3A8A",
    accentBg: "#EEF2FF",
    accentBorder: "#C7D2FE",
  },
  {
    slug: "summit-hvac",
    client: "Summit Mechanical",
    industry: "HVAC & Field Service",
    system: "FieldOps + OpsCore",
    headline: "Replaced spreadsheet scheduling and phone dispatch with a live operational system.",
    outcome: "Dispatchers went from managing chaos to managing a board. Job completion rates up 28%.",
    accent: "#236B4E",
    accentBg: "#EEF7F3",
    accentBorder: "#C4E0D5",
  },
];

export default function CaseStudiesPage() {
  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "640px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginBottom: "28px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
              Case Studies
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px",
            }}>
              Real operations.<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(0,200,122,0.9)", textShadow: "0 0 24px rgba(0,200,122,0.5), 0 0 70px rgba(0,200,122,0.2)" }}>Real results.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "520px" }}>
              Every engagement starts with a business that has outgrown its tools. Here&apos;s what happens when we build something that actually fits.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          {cases.map((c) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff", border: "1px solid #EDECEA", borderRadius: "20px",
                padding: "52px 56px",
                display: "grid", gridTemplateColumns: "1fr auto",
                gap: "48px", alignItems: "center",
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.accentBorder;
                  el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#EDECEA";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                    <span style={{
                      padding: "4px 14px", borderRadius: "100px",
                      background: c.accentBg, border: `1px solid ${c.accentBorder}`,
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                      color: c.accent,
                    }}>{c.industry}</span>
                    <span style={{ fontSize: "0.8rem", color: "#B0ADA8" }}>{c.system}</span>
                  </div>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#B0ADA8", marginBottom: "10px" }}>{c.client}</p>
                  <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.025em", lineHeight: 1.2,
                    color: "#1A1A1A", marginBottom: "20px",
                  }}>{c.headline}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.accent, flexShrink: 0 }} />
                    <p style={{ color: "#4A4947", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{c.outcome}</p>
                  </div>
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: "12px",
                  border: `1px solid ${c.accentBorder}`, background: c.accentBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: c.accent, fontSize: "1.2rem",
                }}>→</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "520px", margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.03em", color: "#fff", marginBottom: "18px",
            }}>Your operation could be next.</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, marginBottom: "36px" }}>
              Every engagement starts with a 30-minute discovery call. No obligation — just an honest conversation about what you&apos;re running and whether we&apos;re the right fit.
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "100px",
              background: "#00C87A", color: "#0a1a12",
              fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
            }}>
              Book a Discovery Call →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
