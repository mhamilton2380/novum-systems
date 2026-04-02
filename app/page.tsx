"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg mesh-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "120px 48px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-3%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,107,240,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1440px", margin: "0 auto", width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            <div>
              <div className="tag animate-fade-up" style={{ marginBottom: "32px" }}>
                Operational Software for Growing Businesses
              </div>

              <h1
                className="font-serif animate-fade-up"
                style={{
                  fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                  marginBottom: "28px",
                  animationDelay: "0.1s",
                  opacity: 0,
                }}
              >
                Software that{" "}
                <em className="gold-shimmer" style={{ fontStyle: "italic" }}>
                  adapts
                </em>{" "}
                <br />
                to your business.
              </h1>

              <p
                className="animate-fade-up"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  color: "var(--ivory-muted)",
                  lineHeight: "1.75",
                  maxWidth: "540px",
                  marginBottom: "44px",
                  animationDelay: "0.2s",
                  opacity: 0,
                }}
              >
                We replace rigid, expensive software with systems built around how your business actually operates — not the other way around.
              </p>

              <div
                className="animate-fade-up"
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  animationDelay: "0.3s",
                  opacity: 0,
                }}
              >
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{
                    padding: "15px 32px",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Book a Discovery Call
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/systems"
                  className="btn-outline"
                  style={{
                    padding: "15px 32px",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  See Our Systems
                </Link>
              </div>
            </div>

            {/* Hero visual — system preview */}
            <div
              className="animate-fade-up hero-visual"
              style={{
                animationDelay: "0.4s",
                opacity: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Mock system card */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "16px",
                  padding: "24px 28px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span className="font-serif" style={{ fontSize: "1rem", color: "var(--ivory)" }}>OpsCore — Command Center</span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--green-accent)", opacity: 0.7 }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gold)", opacity: 0.5 }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  {[
                    { label: "Open Tasks", value: "24", color: "var(--gold)" },
                    { label: "Active Projects", value: "8", color: "var(--blue-accent)" },
                    { label: "Team Online", value: "12", color: "var(--green-accent)" },
                  ].map((kpi) => (
                    <div
                      key={kpi.label}
                      style={{
                        padding: "14px 16px",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "10px",
                        border: "1px solid rgba(245,242,236,0.06)",
                      }}
                    >
                      <div className="font-serif" style={{ fontSize: "1.5rem", color: kpi.color, marginBottom: "4px" }}>{kpi.value}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--ivory-muted)", letterSpacing: "0.04em" }}>{kpi.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { text: "AI generated task from email: 'Review structural drawings — 3rd floor'", done: false },
                    { text: "Budget alert: Site 4 at 91% — flag for PM review", done: false },
                    { text: "Invoice #2041 approved & sent to Greenfield Partners", done: true },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: `1px solid ${item.done ? "rgba(46,204,143,0.15)" : "rgba(245,242,236,0.05)"}` }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "3px", border: `1.5px solid ${item.done ? "var(--green-accent)" : "rgba(245,242,236,0.2)"}`, background: item.done ? "rgba(46,204,143,0.15)" : "transparent", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.76rem", color: item.done ? "var(--ivory-muted)" : "var(--ivory)", lineHeight: "1.5", textDecoration: item.done ? "line-through" : "none", opacity: item.done ? 0.6 : 1 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(46,204,143,0.15)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ fontSize: "0.68rem", color: "var(--green-accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>FieldOps</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ivory-muted)" }}>7 jobs dispatched today · 2 pending invoices</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(59,107,240,0.15)",
                    borderRadius: "12px",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ fontSize: "0.68rem", color: "#7B9FF5", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>ProjectOps</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ivory-muted)" }}>3 milestones due this week · $42k variance flagged</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: "120px 48px", position: "relative" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="problem-grid"
          >
            <div>
              <div className="tag" style={{ marginBottom: "28px" }}>
                The Problem
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: "1.15",
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                }}
              >
                Your operations are unique.
                <br />
                <span style={{ color: "var(--ivory-muted)", fontStyle: "italic" }}>Your software isn&apos;t.</span>
              </h2>
              <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", fontSize: "1rem", marginBottom: "16px" }}>
                Off-the-shelf platforms were designed for the average business — which means they fit nobody perfectly. You end up bending your workflows to match your software, not the other way around.
              </p>
              <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", fontSize: "1rem" }}>
                The result? Disconnected tools, manual workarounds, and a team spending more time fighting software than doing actual work.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "⚠", text: "Generic platforms that force you to work around them" },
                { icon: "⚠", text: "Expensive enterprise tools built for companies 10x your size" },
                { icon: "⚠", text: "Disconnected tools requiring manual data entry between systems" },
                { icon: "⚠", text: "No visibility into your actual operations across teams" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "20px 24px",
                    background: "rgba(255,100,80,0.04)",
                    border: "1px solid rgba(255,100,80,0.12)",
                    borderRadius: "10px",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", marginTop: "2px", opacity: 0.7 }}>{item.icon}</span>
                  <p style={{ color: "var(--ivory-muted)", fontSize: "0.9rem", lineHeight: "1.6", margin: 0 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section
        style={{
          padding: "120px 48px",
          background: "rgba(201,169,110,0.03)",
          borderTop: "1px solid rgba(245,242,236,0.06)",
          borderBottom: "1px solid rgba(245,242,236,0.06)",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 72px" }}>
            <div className="tag" style={{ marginBottom: "24px", display: "inline-flex" }}>
              The Novum Approach
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: "1.15",
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              Systems built around how you actually run.
            </h2>
            <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8" }}>
              We start with your operations — not a template. Every system we deliver is structured around your workflows, your team, and your business model.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="solution-grid"
          >
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 3H5C3.9 3 3 3.9 3 5v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="var(--gold)" strokeWidth="1.5" />
                    <path d="M19 3h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
                    <path d="M9 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5" />
                    <path d="M19 13h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="var(--gold)" strokeWidth="1.5" />
                  </svg>
                ),
                title: "Mapped to your operations",
                desc: "We document how your business works before writing a single line of configuration. The system reflects your reality, not a template.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="var(--gold)" strokeWidth="1.5" />
                    <path d="M12 7v5l3 3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Fast to deploy, built to last",
                desc: "Our structured approach means you get a working system quickly — built on foundations that scale as your business grows.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
                    <path d="M2 12l10 5 10-5" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.75" />
                  </svg>
                ),
                title: "One system, not many tools",
                desc: "We consolidate your operations into a coherent system — eliminating the duct-tape stack of disconnected software.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  padding: "36px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(245,242,236,0.08)",
                  borderRadius: "16px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "rgba(201,169,110,0.1)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-serif"
                  style={{ fontSize: "1.2rem", marginBottom: "12px", letterSpacing: "-0.01em" }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "var(--ivory-muted)", fontSize: "0.92rem", lineHeight: "1.75" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Overview */}
      <section style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "64px",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <div className="tag" style={{ marginBottom: "20px" }}>Our Systems</div>
              <h2
                className="font-serif"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "1.1", letterSpacing: "-0.02em" }}
              >
                Every operation covered.<br />One platform.
              </h2>
            </div>
            <Link
              href="/systems"
              className="btn-outline"
              style={{ padding: "12px 28px", borderRadius: "9px", textDecoration: "none", fontSize: "0.9rem", whiteSpace: "nowrap" }}
            >
              View All Systems →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {[
              {
                name: "OpsCore",
                badge: "Operations Hub",
                badgeColor: "rgba(201,169,110,0.1)",
                badgeBorder: "rgba(201,169,110,0.25)",
                badgeText: "var(--gold)",
                desc: "Your entire operation unified in one intelligent command center. OpsCore uses AI to generate tasks from emails, texts, and documents automatically. Your team communicates via built-in chat, shares notes, tracks projects, monitors budgets, and sees their calendar — all filtered by project. Think Slack, Notion, and your PM tool merged into one system built exactly for how you work.",
                features: ["AI task generation from email/text/PDF", "Built-in team chat & shared notes", "Project-filtered calendar", "Procore & platform integrations", "Custom role dashboards", "Workflow automation"],
              },
              {
                name: "FieldOps",
                badge: "Field Service",
                badgeColor: "rgba(46,204,143,0.12)",
                badgeBorder: "rgba(46,204,143,0.25)",
                badgeText: "var(--green-accent)",
                desc: "End-to-end field service management built around your crews, territories, and job types. From the moment a job is booked to the final invoice — scheduling, dispatch, field access, photo documentation, and automated billing all run through one connected system.",
                features: ["Visual scheduling & dispatch", "Mobile field access & job tracking", "Automated invoicing on completion", "Customer records & property history"],
              },
              {
                name: "ProjectOps",
                badge: "Project-Based",
                badgeColor: "rgba(59,107,240,0.1)",
                badgeBorder: "rgba(59,107,240,0.25)",
                badgeText: "#7B9FF5",
                desc: "Full project lifecycle management from bid to close. Track live budget vs. actuals, manage vendors and subs, monitor milestone completion, and report on profitability across every active project — all in one system built around your workflow.",
                features: ["Live budget-vs-actual tracking", "Vendor & sub management", "Milestone & Gantt-style timelines", "Document & RFI management", "Profitability reporting"],
              },
              {
                name: "Forge",
                badge: "Fully Custom",
                badgeColor: "rgba(167,139,250,0.1)",
                badgeBorder: "rgba(167,139,250,0.25)",
                badgeText: "#A78BFA",
                desc: "For operations that don't fit any mold. Forge is a completely custom-built system designed from the ground up around your unique structure, terminology, and workflows. No templates, no constraints — just your system, architected exactly the way your business runs.",
                features: ["Full operational architecture from scratch", "Custom data model & integrations", "Proprietary workflow engine", "White-glove build & deployment"],
              },
            ].map((sys, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "280px 1fr auto",
                  gap: "48px",
                  alignItems: "center",
                  padding: "40px 48px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(245,242,236,0.07)",
                  borderRadius: "14px",
                  transition: "border-color 0.3s, background 0.3s",
                  cursor: "pointer",
                  borderLeft: i === 0 ? "2px solid rgba(201,169,110,0.3)" : undefined,
                }}
                className="sys-row"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.2)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = i === 0 ? "rgba(201,169,110,0.3)" : "rgba(245,242,236,0.07)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                }}
              >
                <div>
                  <h3 className="font-serif" style={{ fontSize: "1.8rem", letterSpacing: "-0.02em", marginBottom: "10px" }}>
                    {sys.name}
                  </h3>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      background: sys.badgeColor,
                      border: `1px solid ${sys.badgeBorder}`,
                      borderRadius: "100px",
                      fontSize: "0.72rem",
                      fontWeight: "500",
                      letterSpacing: "0.06em",
                      color: sys.badgeText,
                    }}
                  >
                    {sys.badge}
                  </span>
                </div>
                <div>
                  <p style={{ color: "var(--ivory-muted)", fontSize: "0.92rem", lineHeight: "1.75", marginBottom: "16px" }}>
                    {sys.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {sys.features.map((f) => (
                      <span
                        key={f}
                        style={{
                          padding: "4px 12px",
                          background: "rgba(245,242,236,0.05)",
                          border: "1px solid rgba(245,242,236,0.08)",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          color: "var(--ivory-muted)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/systems"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(245,242,236,0.12)",
                    borderRadius: "8px",
                    color: "var(--ivory-muted)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        style={{
          padding: "120px 48px",
          background: "var(--ink-soft)",
          borderTop: "1px solid rgba(245,242,236,0.06)",
          borderBottom: "1px solid rgba(245,242,236,0.06)",
        }}
      >
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <div className="tag" style={{ marginBottom: "24px", display: "inline-flex" }}>How It Works</div>
            <h2
              className="font-serif"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: "1.1", letterSpacing: "-0.02em" }}
            >
              From discovery to deployed — in three steps.
            </h2>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px", position: "relative" }}
            className="process-grid"
          >
            <div
              style={{
                position: "absolute",
                top: "52px",
                left: "calc(16.67% + 40px)",
                right: "calc(16.67% + 40px)",
                height: "1px",
                background: "linear-gradient(90deg, var(--gold-muted), rgba(201,169,110,0.2), var(--gold-muted))",
              }}
              className="process-connector"
            />

            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We spend time with your team to understand every part of how your business operates — the workflows, the friction points, the manual workarounds.",
              },
              {
                step: "02",
                title: "System Design",
                desc: "We design a system architecture around your operations. You see exactly what will be built before we build it — no surprises.",
              },
              {
                step: "03",
                title: "Build & Deploy",
                desc: "We configure, build, and launch your system with training and handoff included. You operate. We support.",
              },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 24px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "var(--ink)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    className="font-serif"
                    style={{ fontSize: "1.5rem", color: "var(--gold)", letterSpacing: "-0.02em" }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "16px", letterSpacing: "-0.01em" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--ivory-muted)", fontSize: "0.92rem", lineHeight: "1.8" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="mesh-bg"
        style={{
          padding: "120px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 900px 500px at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)",
          }}
        />
        <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative" }}>
          <div className="tag" style={{ marginBottom: "32px", display: "inline-flex" }}>
            Ready to Build
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Stop adapting to your software.
          </h2>
          <p style={{ color: "var(--ivory-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginBottom: "44px" }}>
            Book a discovery call and let&apos;s map out what an operational system built for your business would look like.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                padding: "16px 36px",
                borderRadius: "10px",
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Book a Discovery Call →
            </Link>
            <Link
              href="/systems"
              className="btn-outline"
              style={{ padding: "16px 32px", borderRadius: "10px", fontSize: "1rem", textDecoration: "none" }}
            >
              Explore Systems
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
        }
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .solution-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
          .process-connector { display: none; }
          .sys-row { grid-template-columns: 1fr !important; gap: 20px !important; padding: 28px !important; }
        }
      `}</style>
    </>
  );
}
