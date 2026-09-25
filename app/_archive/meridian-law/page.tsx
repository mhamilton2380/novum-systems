"use client";
import Link from "next/link";
import DotCanvas from "@/components/DotCanvas";

export default function MeridianLawPage() {
  const accent = "#1E3A8A";
  const accentBg = "#EEF2FF";
  const accentBorder = "#C7D2FE";

  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Link href="/case-studies" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textDecoration: "none",
              marginBottom: "32px", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
            >
              ← Case Studies
            </Link>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
              <span style={{
                padding: "4px 14px", borderRadius: "100px",
                background: "rgba(30,58,138,0.2)", border: "1px solid rgba(30,58,138,0.4)",
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#93C5FD",
              }}>Legal Services</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>OpsCore · Vault · A.R.I.S</span>
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              lineHeight: 1.06, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px", maxWidth: "780px",
            }}>
              Meridian Law Group built a firm-wide knowledge system — without changing how their team works.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "600px" }}>
              A 34-attorney regional firm drowning in disconnected documents, inconsistent matter tracking, and no way to query their own institutional knowledge. Here&apos;s what changed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stat Bar ── */}
      <section style={{ padding: "0 24px" }}>
        <div style={{
          background: "#fff", border: "1px solid #EDECEA", borderRadius: "16px",
          padding: "40px 56px", margin: "0",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px",
        }} className="stat-bar">
          {[
            { stat: "40%", label: "Reduction in document retrieval time" },
            { stat: "34", label: "Attorneys on a unified operational system" },
            { stat: "< 2 min", label: "Average time to surface any matter history" },
          ].map(s => (
            <div key={s.stat} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 700, letterSpacing: "-0.04em", color: accent, marginBottom: "6px" }}>{s.stat}</div>
              <div style={{ fontSize: "0.85rem", color: "#7A7774", lineHeight: 1.6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Situation ── */}
      <section style={{ padding: "80px 40px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="two-col">
            <div style={{ position: "sticky", top: "88px" }}>
              <span style={{
                display: "inline-flex", padding: "5px 14px", borderRadius: "100px",
                background: accentBg, border: `1px solid ${accentBorder}`,
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: accent, marginBottom: "20px",
              }}>The Situation</span>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
              }}>A growing firm with an institutional knowledge problem.</h2>
              <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Meridian Law Group had grown from 12 to 34 attorneys over six years. What started as a tight-knit team where everyone knew every matter had become a firm where critical context lived in individual inboxes, shared drives with no structure, and the heads of partners who&apos;d been there since day one.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "No centralized matter history", desc: "Client documents, correspondence, and notes were scattered across email threads, individual drives, and a legacy document management system that nobody trusted. Finding anything required asking someone who might know." },
                { title: "Billing leakage from manual tracking", desc: "Time entries were being missed because attorneys had no streamlined way to log hours against the right matter in real time. The billing team spent days each month reconciling and chasing." },
                { title: "New attorneys couldn't ramp", desc: "Onboarding took months because there was no structured way to access matter history, client context, or firm-wide precedent. Every new hire started from scratch." },
                { title: "No visibility for leadership", desc: "Managing partners had no real-time view into workload distribution, matter status, or billing performance across the firm. Reports were pulled manually — weekly, at best." },
              ].map(item => (
                <div key={item.title} style={{
                  padding: "28px 32px", background: "#fff",
                  border: "1px solid #EDECEA", borderRadius: "14px",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accentBorder}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"}
                >
                  <h4 style={{ fontWeight: 600, fontSize: "0.975rem", marginBottom: "8px", color: "#1A1A1A" }}>{item.title}</h4>
                  <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Built ── */}
      <section style={{ padding: "80px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
          maxWidth: "1280px", margin: "0 auto",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "52px" }}>
              <span style={{
                display: "inline-flex", padding: "5px 14px", borderRadius: "100px",
                background: "rgba(30,58,138,0.15)", border: "1px solid rgba(30,58,138,0.35)",
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#93C5FD", marginBottom: "20px",
              }}>What We Built</span>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff",
              }}>Three systems. One operational layer.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="built-grid">
              {[
                {
                  name: "Vault",
                  sub: "Encrypted Document Intelligence",
                  desc: "Every matter document, client file, and piece of correspondence now lives in a structured, encrypted vault. Organized by client and matter. Accessible by role — partners see everything, associates see their cases, billing sees what they need.",
                  color: "#93C5FD", borderColor: "rgba(30,58,138,0.35)", bg: "rgba(30,58,138,0.1)",
                },
                {
                  name: "A.R.I.S",
                  sub: "Adaptive Response Intelligence System",
                  desc: "Attorneys query matter history, precedent, and client context in plain English. 'What did we argue in the Hartley breach of contract matter?' returns the relevant documents, notes, and correspondence — in under two minutes.",
                  color: "#6EE7B7", borderColor: "rgba(0,200,122,0.25)", bg: "rgba(0,200,122,0.08)",
                },
                {
                  name: "OpsCore",
                  sub: "Operational Command Center",
                  desc: "Managing partners now have a real-time dashboard of matter status, attorney workload, and billing performance across the firm. Time entry is embedded directly in the matter view — no separate system, no reconciliation.",
                  color: "#C4B5FD", borderColor: "rgba(109,79,187,0.3)", bg: "rgba(109,79,187,0.08)",
                },
              ].map(s => (
                <div key={s.name} style={{
                  padding: "32px", background: s.bg,
                  border: `1px solid ${s.borderColor}`, borderRadius: "16px",
                }}>
                  <span style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: "100px",
                    background: "rgba(255,255,255,0.05)", border: `1px solid ${s.borderColor}`,
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: s.color, marginBottom: "16px",
                  }}>{s.sub}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "#fff", marginBottom: "12px" }}>{s.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Outcome ── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 52px" }}>
            <span style={{
              display: "inline-flex", padding: "5px 14px", borderRadius: "100px",
              background: accentBg, border: `1px solid ${accentBorder}`,
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: accent, marginBottom: "20px",
            }}>The Outcome</span>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>The firm operates like it knows itself.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }} className="outcome-grid">
            {[
              { title: "Matter history on demand", desc: "Any attorney can surface the full history of any client or matter in under two minutes — documents, notes, correspondence, billing. No asking around, no digging through drives." },
              { title: "Billing leakage eliminated", desc: "Time entry is now embedded in the matter workflow. Hours are captured as work happens. The billing team&apos;s monthly reconciliation process went from three days to an afternoon." },
              { title: "New attorneys productive on day one", desc: "Onboarding now includes full access to the firm&apos;s structured knowledge base. New hires get up to speed on client history in hours, not months." },
              { title: "Leadership has real visibility", desc: "Managing partners start every day with a live view of matter status, workload, and revenue performance across the firm. Decisions are made on current data, not last week&apos;s report." },
            ].map(item => (
              <div key={item.title} style={{
                padding: "36px 40px", background: "#fff",
                border: "1px solid #EDECEA", borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentBorder; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginBottom: "18px" }} />
                <h4 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: "#1A1A1A" }}>{item.title}</h4>
                <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "72px 60px", position: "relative", overflow: "hidden",
          display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center",
        }} className="cta-row">
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              letterSpacing: "-0.03em", color: "#fff", marginBottom: "12px",
            }}>Running a professional services firm?</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, margin: 0, fontSize: "0.95rem" }}>
              If your team is spending time finding information instead of using it, we should talk.
            </p>
          </div>
          <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "100px",
              background: "#00C87A", color: "#0a1a12",
              fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              Book a Discovery Call →
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .two-col > div:first-child { position: static !important; }
          .built-grid { grid-template-columns: 1fr !important; }
          .outcome-grid { grid-template-columns: 1fr !important; }
          .stat-bar { grid-template-columns: 1fr !important; }
          .cta-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
