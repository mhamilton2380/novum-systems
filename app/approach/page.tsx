"use client";
import Link from "next/link";

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
    <>
      {/* Hero */}
      <section
        style={{
          padding: "160px 32px 100px",
          background: "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(59,107,240,0.05) 0%, transparent 60%), var(--ink)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ maxWidth: "700px" }}>
            <div className="tag" style={{ marginBottom: "28px" }}>Our Approach</div>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: "1.08",
                letterSpacing: "-0.02em",
                marginBottom: "28px",
              }}
            >
              We don&apos;t sell software.
              <br />
              <span className="gold-shimmer">We design systems.</span>
            </h1>
            <p style={{ color: "var(--ivory-muted)", fontSize: "1.1rem", lineHeight: "1.8", maxWidth: "560px" }}>
              There&apos;s a meaningful difference between deploying software and designing an operational system. One puts a tool in your hands. The other changes how your business operates.
            </p>
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section style={{ padding: "100px 32px", borderTop: "1px solid rgba(245,242,236,0.06)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }}
            className="two-col"
          >
            <div style={{ position: "sticky", top: "100px" }}>
              <h2
                className="font-serif"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: "1.15", marginBottom: "20px" }}
              >
                What makes Novum different.
              </h2>
              <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", fontSize: "0.95rem", marginBottom: "32px" }}>
                We&apos;re not a dev shop. We&apos;re not a SaaS company. We&apos;re a systems practice — and that distinction changes everything about how we work and what we deliver.
              </p>
              <div
                style={{
                  padding: "20px 24px",
                  background: "rgba(201,169,110,0.06)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "10px",
                }}
              >
                <p style={{ color: "var(--gold)", fontSize: "0.85rem", lineHeight: "1.7", margin: 0 }}>
                  &ldquo;The system should match the business. Not the other way around.&rdquo;
                </p>
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "32px",
                }}
                className="compare-grid"
              >
                <div
                  style={{
                    padding: "28px",
                    background: "rgba(255,80,80,0.04)",
                    border: "1px solid rgba(255,80,80,0.12)",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,120,120,0.7)",
                      marginBottom: "16px",
                    }}
                  >
                    Generic Software
                  </p>
                  {[
                    "Built for the average business",
                    "You adapt to the platform",
                    "One-size pricing",
                    "Self-serve with poor support",
                    "Features you don't need",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
                      <span style={{ color: "rgba(255,120,120,0.5)", fontSize: "0.9rem", marginTop: "1px" }}>✕</span>
                      <span style={{ color: "var(--ivory-muted)", fontSize: "0.88rem", lineHeight: "1.5" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: "28px",
                    background: "rgba(201,169,110,0.05)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "16px",
                    }}
                  >
                    Novum Systems
                  </p>
                  {[
                    "Built around your operations",
                    "The system adapts to you",
                    "Scoped to your exact needs",
                    "Dedicated delivery & support",
                    "Only what your business needs",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-start" }}>
                      <span style={{ color: "var(--gold)", fontSize: "0.9rem", marginTop: "1px" }}>✓</span>
                      <span style={{ color: "var(--ivory-muted)", fontSize: "0.88rem", lineHeight: "1.5" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section
        style={{
          padding: "100px 32px",
          background: "var(--ink-soft)",
          borderTop: "1px solid rgba(245,242,236,0.06)",
          borderBottom: "1px solid rgba(245,242,236,0.06)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div className="tag" style={{ marginBottom: "20px", display: "inline-flex" }}>Our Principles</div>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}>
              How we think. How we work.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {principles.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "40px",
                  padding: "40px 48px",
                  border: "1px solid rgba(245,242,236,0.07)",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.02)",
                  transition: "border-color 0.3s",
                }}
                className="principle-row"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,242,236,0.07)"; }}
              >
                <div>
                  <span
                    className="font-serif"
                    style={{ fontSize: "2.5rem", color: "rgba(201,169,110,0.3)", letterSpacing: "-0.03em" }}
                  >
                    {p.num}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: "1.3rem", letterSpacing: "-0.01em", marginBottom: "12px" }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ color: "var(--ivory-muted)", fontSize: "0.95rem", lineHeight: "1.8", margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 64px" }}>
            <div className="tag" style={{ marginBottom: "20px", display: "inline-flex" }}>Who We Work With</div>
            <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", lineHeight: "1.15" }}>
              Built for operational businesses.
            </h2>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
            className="who-grid"
          >
            {[
              {
                icon: "🔧",
                title: "Field Service",
                desc: "HVAC, plumbing, electrical, landscaping, equipment service — any business with teams dispatched to job sites.",
              },
              {
                icon: "📐",
                title: "Project-Based",
                desc: "General contractors, specialty trades, creative agencies, IT firms — businesses that run on projects with budgets and timelines.",
              },
              {
                icon: "🏢",
                title: "Multi-Location",
                desc: "Operators managing multiple teams, locations, or franchises who need visibility and coordination across their full operation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-hover"
                style={{
                  padding: "36px",
                  border: "1px solid rgba(245,242,236,0.08)",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.025)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: "20px",
                    display: "block",
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--ivory-muted)", fontSize: "0.9rem", lineHeight: "1.75" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 32px", textAlign: "center", borderTop: "1px solid rgba(245,242,236,0.06)" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Sound like the right fit?
          </h2>
          <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", marginBottom: "36px" }}>
            A discovery call is how every Novum engagement starts. It&apos;s 30 minutes, no obligation, and we&apos;ll give you honest feedback on whether we&apos;re the right fit for your operation.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
            style={{ padding: "15px 36px", borderRadius: "10px", textDecoration: "none", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Book a Discovery Call →
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
          .who-grid { grid-template-columns: 1fr !important; }
          .principle-row { grid-template-columns: 1fr !important; padding: 28px !important; }
        }
      `}</style>
    </>
  );
}
