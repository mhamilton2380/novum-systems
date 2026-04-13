"use client";
import Link from "next/link";
import DotCanvas from "@/components/DotCanvas";

export default function SenecaDevelopmentPage() {
  const accent = "#6D4FBB";
  const accentBg = "#F3F0FC";
  const accentBorder = "#D9D0F5";

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
                background: "rgba(109,79,187,0.2)", border: "1px solid rgba(109,79,187,0.4)",
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#C4B5FD",
              }}>Real Estate Development & Investment</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>Forge · OpsCore · Vault · A.R.I.S</span>
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              lineHeight: 1.06, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px", maxWidth: "820px",
            }}>
              Seneca Development Co. unified deal tracking, project execution, and financial oversight into one operational platform.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "640px" }}>
              A vertically integrated real estate firm managing active developments, an investment portfolio, and LP relationships — all from disconnected spreadsheets and email threads. Here&apos;s how that changed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stat Bar ── */}
      <section style={{ padding: "0 24px" }}>
        <div style={{
          background: "#fff", border: "1px solid #EDECEA", borderRadius: "16px",
          padding: "40px 56px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px",
        }} className="stat-bar">
          {[
            { stat: "100%", label: "Deal pipeline visible in real time" },
            { stat: "3 days", label: "Faster LP reporting turnaround" },
            { stat: "1 platform", label: "Replaced 6 disconnected tools" },
            { stat: "< 60 sec", label: "To surface any project's full history via A.R.I.S" },
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
              }}>A complex operation held together by spreadsheets and institutional memory.</h2>
              <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Seneca Development Co. operates across the full real estate lifecycle — sourcing and underwriting deals, managing active ground-up developments, running a growing portfolio of income-producing assets, and maintaining relationships with a network of limited partners. Each of these functions had its own system. None of them talked to each other.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Deal pipeline with no single source of truth", desc: "Acquisition targets, LOIs, due diligence status, and go/no-go decisions were tracked across individual spreadsheets and email chains. Leadership had no reliable real-time view of where each deal stood or what was actively being worked." },
                { title: "Project execution tracked in silos", desc: "Active developments had no unified tracking layer. Budget-to-actual comparisons required manual pulls from accounting. Schedule milestones lived in project manager notebooks. Change orders were reconciled retroactively." },
                { title: "LP reporting was a manual production", desc: "Quarterly investor reports were built from scratch each cycle — pulling data from accounting software, spreadsheets, and bank statements, then formatted manually. The process took over a week and introduced errors." },
                { title: "Documents and deal history were unsearchable", desc: "Years of contracts, appraisals, pro formas, loan documents, and correspondence were stored in a folder structure that only made sense to the person who built it. Finding anything required knowing exactly where to look." },
                { title: "No visibility across the portfolio", desc: "Understanding performance across the full asset base — occupancy, NOI, debt service coverage, cap rate trends — required assembling data from multiple systems. There was no single view of the portfolio at any given moment." },
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
                background: "rgba(109,79,187,0.15)", border: "1px solid rgba(109,79,187,0.35)",
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#C4B5FD", marginBottom: "20px",
              }}>What We Built</span>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff",
              }}>A fully custom platform built around how real estate actually works.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }} className="built-grid">
              {[
                {
                  name: "Forge",
                  sub: "Custom Operational Architecture",
                  desc: "Because no off-the-shelf tool maps cleanly to a vertically integrated development and investment operation, we built from scratch. The data model was designed around Seneca's specific deal stages, project types, asset classes, and LP structure — not adapted from a template.",
                  color: "#C4B5FD", borderColor: "rgba(109,79,187,0.35)", bg: "rgba(109,79,187,0.1)",
                },
                {
                  name: "OpsCore",
                  sub: "Operational Command Center",
                  desc: "A unified dashboard layer giving each role exactly what they need. Leadership sees portfolio performance, deal pipeline, and active project status. Project managers see budgets, milestones, and vendor activity. The accounting team sees financial performance by asset. Role-based, real time, no manual pulls.",
                  color: "#6EE7B7", borderColor: "rgba(0,200,122,0.25)", bg: "rgba(0,200,122,0.08)",
                },
              ].map(s => (
                <div key={s.name} style={{
                  padding: "36px", background: s.bg,
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="built-grid">
              {[
                {
                  name: "Vault",
                  sub: "Encrypted Document Intelligence",
                  desc: "Every deal document, appraisal, loan agreement, operating agreement, and LP communication is now encrypted, structured, and stored by deal or asset. Sensitive financial documents are access-controlled by role — partners see everything, investors see their positions.",
                  color: "#93C5FD", borderColor: "rgba(30,58,138,0.3)", bg: "rgba(30,58,138,0.08)",
                },
                {
                  name: "A.R.I.S",
                  sub: "Adaptive Response Intelligence System",
                  desc: "The team can now query the firm's entire document history and operational data in plain English. 'What was the all-in cost on the Parkview acquisition?' or 'Pull all executed LOIs from the last 18 months' return answers in seconds — sourced from the actual documents.",
                  color: "#86EFAC", borderColor: "rgba(0,200,122,0.2)", bg: "rgba(0,200,122,0.06)",
                },
              ].map(s => (
                <div key={s.name} style={{
                  padding: "36px", background: s.bg,
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
            }}>The firm operates with the clarity of a much larger organization.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }} className="outcome-grid">
            {[
              { title: "Deal pipeline is visible to everyone who needs it", desc: "Every active acquisition target, its current stage, and the next action required is visible in real time. Nothing falls through because someone forgot to update a spreadsheet. Leadership makes capital allocation decisions with current information." },
              { title: "Project execution is tracked to the dollar", desc: "Active developments now have live budget-to-actual visibility by cost category. Change orders are logged as they happen. Project managers and ownership see the same numbers at the same time." },
              { title: "LP reporting went from a week to a day", desc: "Quarterly investor reports are now generated from live data — portfolio performance, asset-level financials, distributions, and capital accounts pull automatically. The production process that took over a week now takes an afternoon." },
              { title: "The full document history is queryable", desc: "Years of deal documents, contracts, and correspondence are now organized, encrypted, and searchable. A.R.I.S. surfaces the right document in seconds regardless of when it was created or who uploaded it." },
              { title: "Portfolio performance is always current", desc: "Leadership has a real-time view of NOI, occupancy, debt service, and returns across the full asset base. There is no more 'let me pull that together' — the answer is always on the dashboard." },
              { title: "The team scaled without adding headcount", desc: "The operational infrastructure now supports a significantly larger deal volume and asset base than when the firm started. The system absorbed the growth instead of the team absorbing it." },
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
            }}>Running a real estate or investment operation?</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, margin: 0, fontSize: "0.95rem" }}>
              If your operation is more complex than any off-the-shelf tool can handle, that&apos;s exactly what we build for.
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
          .stat-bar { grid-template-columns: 1fr 1fr !important; }
          .cta-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stat-bar { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
