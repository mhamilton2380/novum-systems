"use client";
import Link from "next/link";
import DotCanvas from "@/components/DotCanvas";

export default function ApproachPage() {
  const principles = [
    {
      num: "01",
      title: "We map before we build",
      desc: "Every engagement starts with operational discovery. We spend time understanding how your business actually runs — the job types, the team structure, the edge cases, the manual workarounds. We don't build until we understand.",
    },
    {
      num: "02",
      title: "Systems, not software",
      desc: "We don't sell licenses or subscriptions to generic platforms. We design structured systems — configured around your workflows, your terminology, your team. It's the difference between software you adapt to and a system built for you.",
    },
    {
      num: "03",
      title: "Clarity over complexity",
      desc: "We believe the best operational systems are the ones your team actually uses. We design for clarity and adoption — not to impress with features. Every screen, workflow, and report has a purpose.",
    },
    {
      num: "04",
      title: "Built to outlast the build",
      desc: "We hand off systems your team can own. Documentation, training, and structured foundations mean your operations aren't dependent on us to function — though we're always available when you need us.",
    },
  ];

  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginBottom: "28px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
              Our Approach
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px",
            }}>
              We don&apos;t sell software.<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(0,200,122,0.9)", textShadow: "0 0 24px rgba(0,200,122,0.5), 0 0 70px rgba(0,200,122,0.2)" }}>We design systems.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "540px" }}>
              There&apos;s a meaningful difference between deploying software and designing an operational system. One puts a tool in your hands. The other changes how your business operates.
            </p>
          </div>
        </div>
      </section>

      {/* ── What sets us apart ── */}
      <section style={{ padding: "96px 40px", borderTop: "1px solid #EDECEA" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }} className="two-col">

            <div style={{ position: "sticky", top: "88px" }}>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1,
                marginBottom: "18px",
              }}>
                What makes Novum different.
              </h2>
              <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "28px" }}>
                We&apos;re not a dev shop. We&apos;re not a SaaS company. We&apos;re a systems practice — and that distinction changes everything about how we work and what we deliver.
              </p>
              <div style={{
                padding: "20px 24px",
                background: "#F7F6F3",
                border: "1px solid #E8E6E1",
                borderRadius: "12px",
              }}>
                <p style={{ color: "#4A4947", fontSize: "0.9rem", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                  &ldquo;The system should match the business. Not the other way around.&rdquo;
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="compare-grid">
                {/* Generic col */}
                <div style={{
                  padding: "28px", background: "#FDF2F2",
                  border: "1px solid #EDD5D5", borderRadius: "14px",
                }}>
                  <p style={{
                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#C0392B", marginBottom: "18px",
                  }}>Generic Software</p>
                  {[
                    "Built for the average business",
                    "You adapt to the platform",
                    "One-size pricing",
                    "Self-serve with poor support",
                    "Features you don't need",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "10px", marginBottom: "11px", alignItems: "flex-start" }}>
                      <span style={{ color: "#C0392B", fontSize: "0.85rem", marginTop: "1px", flexShrink: 0 }}>✕</span>
                      <span style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                {/* Novum col */}
                <div style={{
                  padding: "28px", background: "#fdf0e8",
                  border: "1px solid #f0c4a0", borderRadius: "14px",
                }}>
                  <p style={{
                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#00C87A", marginBottom: "18px",
                  }}>Novum Systems</p>
                  {[
                    "Built around your operations",
                    "The system adapts to you",
                    "Scoped to your exact needs",
                    "Dedicated delivery & support",
                    "Only what your business needs",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "10px", marginBottom: "11px", alignItems: "flex-start" }}>
                      <span style={{ color: "#00C87A", fontSize: "0.85rem", marginTop: "1px", flexShrink: 0 }}>✓</span>
                      <span style={{ color: "#4A4947", fontSize: "0.875rem", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section style={{ padding: "0 24px" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "5px 14px", borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)", marginBottom: "20px",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
                Our Principles
              </div>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                letterSpacing: "-0.03em", color: "#fff",
              }}>How we think. How we work.</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {principles.map((p, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "80px 1fr",
                  gap: "40px", padding: "36px 40px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  transition: "border-color 0.2s",
                }}
                  className="principle-row"
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,122,0.35)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"}
                >
                  <div>
                    <span style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "2.4rem", color: "rgba(255,255,255,0.15)",
                      letterSpacing: "-0.03em", lineHeight: 1,
                    }}>{p.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.015em", marginBottom: "10px", color: "#fff" }}>{p.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.925rem", lineHeight: 1.8, margin: 0 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Who we work with ── */}
      <section style={{ padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid #E8E6E1", background: "#F7F6F3",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "#7A7774", marginBottom: "20px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7A7774", display: "inline-block" }} />
              Who We Work With
            </div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>Built for operational businesses.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }} className="who-grid">
            {[
              {
                title: "Field Service",
                desc: "HVAC, plumbing, electrical, landscaping, equipment service — any business with teams dispatched to job sites.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#00C87A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Project-Based",
                desc: "General contractors, specialty trades, creative agencies, IT firms — businesses that run on projects with budgets and timelines.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#00C87A" strokeWidth="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#00C87A" strokeWidth="1.5" opacity="0.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#00C87A" strokeWidth="1.5" opacity="0.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#00C87A" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: "Multi-Location",
                desc: "Operators managing multiple teams, locations, or franchises who need visibility and coordination across their full operation.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#00C87A" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M9 22V12h6v10" stroke="#00C87A" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Forge",
                desc: "Operations that don't fit a template — unique structures, mixed service models, or complex workflows that require a fully custom build.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#00C87A" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" stroke="#00C87A" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2 12l10 5 10-5" stroke="#00C87A" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} style={{
                padding: "36px",
                border: "1px solid #EDECEA",
                borderRadius: "16px",
                background: "#fff",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 48, height: 48, background: "#e6f9f2",
                  border: "1px solid #a0e8cb", borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.015em", marginBottom: "10px", color: "#1A1A1A" }}>{item.title}</h3>
                <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "24px 24px 80px" }}>
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
            }}>Sound like the right fit?</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, marginBottom: "36px" }}>
              A discovery call is how every Novum engagement starts. It&apos;s 30 minutes, no obligation, and we&apos;ll give you honest feedback on whether we&apos;re the right fit for your operation.
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "100px",
              background: "#F2EDD8", color: "#1A1A1A",
              fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
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
          .compare-grid { grid-template-columns: 1fr !important; }
          .who-grid { grid-template-columns: 1fr !important; }
          .principle-row { grid-template-columns: 1fr !important; padding: 24px !important; }
        }
      `}</style>
    </div>
  );
}
