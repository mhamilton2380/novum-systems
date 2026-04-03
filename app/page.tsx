"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// ── Hero animated modules ────────────────────────────────────────────────────
function HeroViz() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  const inputs = ["Email", "PDF / Docs", "Voice", "Messages"];
  const stages = ["AI Extraction", "Workflow Routing", "Team Assignment"];
  const outputs = ["OpsCore", "FieldOps", "ProjectOps"];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* dot grid */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
      {/* radial glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 55% 45% at 60% 55%, rgba(58,85,133,0.14) 0%, transparent 70%)",
      }} />

      {/* Flow diagram — sits bottom half of card */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "0 56px 36px",
        display: "flex", alignItems: "center", gap: "0",
      }}>
        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", flexShrink: 0 }}>
          {inputs.map((label, i) => (
            <div key={i} style={{
              padding: "8px 14px",
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "8px",
              fontSize: "0.78rem", fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              whiteSpace: "nowrap",
            }}>{label}</div>
          ))}
        </div>

        {/* SVG lines left */}
        <div style={{ flex: "0 0 72px", position: "relative", height: "110px" }}>
          <svg width="100%" height="100%" viewBox="0 0 72 110" preserveAspectRatio="none">
            {[14, 37, 60, 84].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="72" y2="55"
                stroke="rgba(100,130,200,0.2)" strokeWidth="1" strokeDasharray="4 3" />
            ))}
          </svg>
        </div>

        {/* Stage modules */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", flexShrink: 0 }}>
          {stages.map((label, i) => (
            <div key={i} style={{
              padding: "10px 18px",
              background: i === active ? "rgba(58,85,133,0.28)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === active ? "rgba(100,140,240,0.5)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "8px",
              fontSize: "0.78rem",
              fontWeight: i === active ? 600 : 400,
              color: i === active ? "rgba(170,200,255,0.95)" : "rgba(255,255,255,0.38)",
              transition: "all 0.5s ease",
              whiteSpace: "nowrap",
              boxShadow: i === active ? "0 0 16px rgba(58,85,133,0.3)" : "none",
            }}>{label}</div>
          ))}
        </div>

        {/* SVG lines right */}
        <div style={{ flex: "0 0 72px", position: "relative", height: "80px" }}>
          <svg width="100%" height="100%" viewBox="0 0 72 80" preserveAspectRatio="none">
            {[14, 40, 66].map((y, i) => (
              <line key={i} x1="0" y1="40" x2="72" y2={y}
                stroke="rgba(100,130,200,0.2)" strokeWidth="1" strokeDasharray="4 3" />
            ))}
          </svg>
        </div>

        {/* Outputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", flexShrink: 0 }}>
          {outputs.map((label, i) => (
            <div key={i} style={{
              padding: "9px 16px",
              background: i === 0 ? "rgba(242,237,216,0.1)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${i === 0 ? "rgba(242,237,200,0.22)" : "rgba(255,255,255,0.09)"}`,
              borderRadius: "8px",
              fontSize: "0.78rem", fontWeight: 500,
              color: i === 0 ? "rgba(242,237,200,0.85)" : "rgba(255,255,255,0.6)",
              whiteSpace: "nowrap",
            }}>{label}</div>
          ))}
        </div>

        {/* Stat cards */}
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px", flexShrink: 0 }}>
          {[["24", "Open Tasks"], ["8", "Active Projects"], ["12", "Team Online"]].map(([n, l], i) => (
            <div key={i} style={{
              padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", marginTop: "4px", whiteSpace: "nowrap" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background: "#fff", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ══ HERO ═════════════════════════════════════════════════════ */}
      <section style={{ padding: "20px 24px 0" }}>
        <div style={{
          background: "#1C1E26",
          borderRadius: "20px",
          minHeight: "600px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* copy — top left */}
          <div style={{ position: "relative", zIndex: 2, padding: "64px 60px 0", maxWidth: "600px" }}>
            <div className="pill pill-ghost pill-dot" style={{ marginBottom: "28px" }}>
              Operational Software for Growing Businesses
            </div>

            <h1 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 5vw, 5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
              marginBottom: "24px",
            }}>
              Software that <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(200,215,255,0.85)" }}>adapts</em><br />
              to your business.
            </h1>

            <p style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.75,
              maxWidth: "440px",
              marginBottom: "36px",
            }}>
              We replace rigid, expensive software with systems built around how your business actually operates — not the other way around.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingBottom: "220px" }}>
              <Link href="/contact" className="btn-cream">
                Book a Discovery Call
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/systems" className="btn-ghost-light">
                See Our Systems
              </Link>
            </div>
          </div>

          {/* animated viz */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <HeroViz />
          </div>
        </div>
      </section>

      {/* ══ PROBLEM ══════════════════════════════════════════════════ */}
      <section style={{ padding: "112px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ maxWidth: "680px", marginBottom: "72px" }}>
            <div className="pill pill-muted pill-dot" style={{ marginBottom: "24px" }}>The Problem</div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}>
              Every growing business<br />knows the pain.
            </h2>
            <p style={{ color: "#7A7774", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "520px" }}>
              Off-the-shelf platforms were designed for the average business — which means they fit nobody perfectly. You end up bending your workflows to match your software, not the other way around.
            </p>
          </div>

          {/* Pain cards — 2 col grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="pain-grid">
            {[
              {
                title: "Generic platforms that fight you",
                body: "You spend more time working around your software than working in it. Features you don't need, missing the ones you do.",
              },
              {
                title: "Enterprise tools for companies 10× your size",
                body: "Priced for Fortune 500s, built for IT departments. You end up paying for complexity your business will never use.",
              },
              {
                title: "Disconnected tools, constant copy-paste",
                body: "Data lives in 6 places. Your team manually bridges the gaps. Every handoff is a chance for something to fall through.",
              },
              {
                title: "Zero visibility across your operations",
                body: "No single view of what's happening. Leadership makes decisions on stale data while the real picture sits in a spreadsheet.",
              },
            ].map((card, i) => (
              <div key={i} style={{
                padding: "36px 40px",
                background: i < 2 ? "#1C1E26" : "#F7F6F3",
                borderRadius: "16px",
                border: i >= 2 ? "1px solid #E8E6E1" : "none",
              }}>
                {i < 2 && (
                  <div style={{
                    width: "32px", height: "2px", background: "rgba(255,255,255,0.2)",
                    borderRadius: "2px", marginBottom: "24px",
                  }} />
                )}
                {i >= 2 && (
                  <div style={{
                    width: "32px", height: "2px", background: "#CDCBC4",
                    borderRadius: "2px", marginBottom: "24px",
                  }} />
                )}
                <h3 style={{
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  color: i < 2 ? "#fff" : "#1A1A1A",
                  marginBottom: "12px",
                }}>{card.title}</h3>
                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: i < 2 ? "rgba(255,255,255,0.48)" : "#7A7774",
                  margin: 0,
                }}>{card.body}</p>
              </div>
            ))}
          </div>

          {/* Secondary copy */}
          <p style={{
            color: "#7A7774", fontSize: "1rem", lineHeight: 1.8,
            maxWidth: "560px", marginTop: "48px",
          }}>
            The result? Disconnected tools, manual workarounds, and a team spending more time fighting software than doing actual work.
          </p>
        </div>
      </section>

      {/* ══ SOLUTION ═════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 24px" }}>
        <div style={{
          background: "#1C1E26",
          borderRadius: "20px",
          padding: "80px 60px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="solution-header-grid">
              <div>
                <div className="pill pill-ghost pill-dot" style={{ marginBottom: "24px" }}>The Novum Approach</div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  marginBottom: "20px",
                }}>
                  Systems built around<br />how you actually run.
                </h2>
              </div>
              <div style={{ paddingTop: "12px" }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.02rem", lineHeight: 1.75 }}>
                  We start with your operations — not a template. Every system we deliver is structured around your workflows, your team, and your business model.
                </p>
              </div>
            </div>

            {/* 3 feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "56px" }} className="features-grid">
              {[
                {
                  title: "Mapped to your operations",
                  desc: "We document how your business works before writing a single line of configuration. The system reflects your reality, not a template.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 3H5C3.9 3 3 3.9 3 5v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" />
                      <path d="M19 3h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" opacity="0.5" />
                      <path d="M9 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" opacity="0.5" />
                      <path d="M19 13h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" />
                    </svg>
                  ),
                },
                {
                  title: "Fast to deploy, built to last",
                  desc: "Our structured approach means you get a working system quickly — built on foundations that scale as your business grows.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" />
                      <path d="M12 7v5l3 3" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  title: "One system, not many tools",
                  desc: "We consolidate your operations into a coherent system — eliminating the duct-tape stack of disconnected software.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M2 17l10 5 10-5" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
                      <path d="M2 12l10 5 10-5" stroke="rgba(160,185,255,0.7)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
                    </svg>
                  ),
                },
              ].map((f, i) => (
                <div key={i} style={{
                  padding: "32px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                }}>
                  <div style={{
                    width: "40px", height: "40px",
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "20px",
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "#fff", marginBottom: "10px", lineHeight: 1.35 }}>{f.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SYSTEMS ══════════════════════════════════════════════════ */}
      <section style={{ padding: "112px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div className="pill pill-muted pill-dot" style={{ marginBottom: "20px" }}>Our Systems</div>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                lineHeight: 1.08, letterSpacing: "-0.03em",
              }}>
                Every operation covered.<br />One platform.
              </h2>
            </div>
            <Link href="/systems" className="btn-outline">View All Systems →</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                name: "Forge", badge: "Fully Custom", bc: "#6D4FBB", bb: "#F3F0FC", bbd: "#D9D0F5",
                desc: "For operations that don't fit any mold. Forge is a completely custom-built system designed from the ground up around your unique structure, terminology, and workflows. No templates, no constraints — just your system, architected exactly the way your business runs.",
                features: ["Full operational architecture", "Custom data model & integrations", "Proprietary workflow engine", "White-glove build & deployment"],
              },
              {
                name: "OpsCore", badge: "Operations Hub", bc: "#3A5585", bb: "#EEF1F7", bbd: "#C4CDE0",
                desc: "Your entire operation unified in one intelligent command center. OpsCore uses AI to generate tasks from emails, texts, and documents automatically. One platform. Every tool. Zero switching.",
                features: ["AI task generation from email/text/PDF", "Built-in team chat & shared notes", "Project-filtered calendar & tasks", "QuickBooks, Salesforce, HubSpot & more", "Custom role dashboards"],
              },
              {
                name: "FieldOps", badge: "Field Service", bc: "#236B4E", bb: "#EEF7F3", bbd: "#C4E0D5",
                desc: "End-to-end field service management built around your crews, territories, and job types. From the moment a job is booked to the final invoice — scheduling, dispatch, field access, photo documentation, and automated billing all run through one connected system.",
                features: ["Visual scheduling & dispatch", "Mobile field access & job tracking", "Automated invoicing on completion", "Customer records & property history"],
              },
              {
                name: "ProjectOps", badge: "Project-Based", bc: "#2C4E8A", bb: "#EEF2FA", bbd: "#C0CEEB",
                desc: "Full project lifecycle management from bid to close. Track live budget vs. actuals, manage vendors and subs, monitor milestone completion, and report on profitability across every active project.",
                features: ["Live budget-vs-actual tracking", "Vendor & sub management", "Milestone & Gantt-style timelines", "Document & RFI management", "Profitability reporting"],
              },
            ].map((sys, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "200px 1fr auto",
                gap: "40px", alignItems: "center",
                padding: "28px 32px",
                background: "#fff",
                border: "1px solid #E8E6E1",
                borderRadius: "14px",
                transition: "border-color 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
                className="sys-row"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#CDCBC4"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E6E1"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.6rem", letterSpacing: "-0.025em", marginBottom: "9px", color: "#1A1A1A" }}>
                    {sys.name}
                  </h3>
                  <span style={{
                    display: "inline-flex", padding: "3px 11px",
                    background: sys.bb, border: `1px solid ${sys.bbd}`,
                    borderRadius: "100px", fontSize: "0.68rem", fontWeight: 600,
                    letterSpacing: "0.06em", color: sys.bc,
                  }}>{sys.badge}</span>
                </div>
                <div>
                  <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "12px" }}>{sys.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {sys.features.map(f => (
                      <span key={f} style={{
                        padding: "3px 11px", background: "#F7F6F3",
                        border: "1px solid #E8E6E1", borderRadius: "6px",
                        fontSize: "0.75rem", color: "#7A7774",
                      }}>{f}</span>
                    ))}
                  </div>
                </div>
                <Link href="/systems" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px", border: "1px solid #E8E6E1",
                  borderRadius: "9px", color: "#7A7774", textDecoration: "none",
                  flexShrink: 0, transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#3A5585"; (e.currentTarget as HTMLElement).style.color = "#3A5585"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E8E6E1"; (e.currentTarget as HTMLElement).style.color = "#7A7774"; }}
                >→</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══════════════════════════════════════════════════ */}
      <section style={{ padding: "0 24px 24px" }}>
        <div style={{
          background: "#F7F6F3",
          borderRadius: "20px",
          padding: "80px 60px",
          border: "1px solid #E8E6E1",
        }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div className="pill pill-muted pill-dot" style={{ display: "inline-flex", marginBottom: "20px" }}>How It Works</div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1.08, letterSpacing: "-0.03em",
            }}>
              From discovery to deployed — in three steps.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", position: "relative" }} className="process-grid">
            {[
              { step: "01", title: "Discovery", desc: "We spend time with your team to understand every part of how your business operates — the workflows, the friction points, the manual workarounds." },
              { step: "02", title: "System Design", desc: "We design a system architecture around your operations. You see exactly what will be built before we build it — no surprises." },
              { step: "03", title: "Build & Deploy", desc: "We configure, build, and launch your system with training and handoff included. You operate. We support." },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "40px 40px",
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #E8E6E1",
                position: "relative",
              }}>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "3rem", fontWeight: 400,
                  color: "#E8E6E1", lineHeight: 1,
                  marginBottom: "20px",
                  letterSpacing: "-0.03em",
                }}>{s.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.015em", color: "#1A1A1A", marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ color: "#7A7774", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "24px 24px 80px" }}>
        <div style={{
          background: "#1C1E26",
          borderRadius: "20px",
          padding: "96px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="pill pill-ghost pill-dot" style={{ display: "inline-flex", marginBottom: "28px" }}>Ready to Build</div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px",
            }}>
              Stop adapting to your software.
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.45)", fontSize: "1.05rem",
              lineHeight: 1.75, maxWidth: "460px", margin: "0 auto 44px",
            }}>
              Book a discovery call and let's map out what an operational system built for your business would look like.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-cream">
                Book a Discovery Call →
              </Link>
              <Link href="/systems" className="btn-ghost-light">
                Explore Systems
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .pain-grid { grid-template-columns: 1fr !important; }
          .solution-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .sys-row { grid-template-columns: 1fr !important; gap: 20px !important; padding: 24px !important; }
        }
        @media (max-width: 640px) {
          .pain-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
