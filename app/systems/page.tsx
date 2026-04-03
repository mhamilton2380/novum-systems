"use client";
import Link from "next/link";

export default function SystemsPage() {
  const systems = [
    {
      id: "fieldops",
      name: "FieldOps",
      subtitle: "Field Service Management",
      accent: "#236B4E",
      accentBg: "#EEF7F3",
      accentBorder: "#C4E0D5",
      tagline: "Schedule, dispatch, and close jobs — without the chaos.",
      desc: "FieldOps is a complete operational system for field service businesses. Built around your specific job types, team structure, and billing needs — not a one-size-fits-all platform.",
      forWho: ["HVAC & mechanical contractors", "Plumbing & electrical", "Landscaping & property maintenance", "Equipment services & repair"],
      modules: [
        { name: "Scheduling & Dispatch", desc: "Visual scheduling board built around your team, territories, and job types. Drag-and-drop dispatch with real-time updates." },
        { name: "Job Management", desc: "Full job lifecycle from work order to completion. Field team access, photo uploads, notes, and status tracking." },
        { name: "Invoicing & Payments", desc: "Automated invoicing tied to job completion. Configurable pricing rules, line items, and payment collection." },
        { name: "Customer Records", desc: "Complete customer and property history. Service records, equipment tracking, and communication logs." },
      ],
    },
    {
      id: "projectops",
      name: "ProjectOps",
      subtitle: "Project-Based Business Management",
      accent: "#2C4E8A",
      accentBg: "#EEF2FA",
      accentBorder: "#C0CEEB",
      tagline: "Run every project on budget and on time.",
      desc: "ProjectOps gives project-based businesses a command center for managing complex jobs from bid to close. Track milestones, budgets, vendors, and profitability across every project.",
      forWho: ["General contractors", "Specialty trades & subcontractors", "IT & tech project firms", "Marketing & creative agencies"],
      modules: [
        { name: "Project Dashboard", desc: "Real-time view of all active projects — status, budget burn, milestone completion, and team assignments." },
        { name: "Budget Tracking", desc: "Live budget-vs-actual across all cost categories. Flag overruns early and protect your margins." },
        { name: "Vendor & Sub Management", desc: "Track vendor bids, contracts, payments, and performance. All connected to the project it belongs to." },
        { name: "Milestone & Timeline", desc: "Gantt-style milestone tracking with dependency management and automated progress reports." },
      ],
    },
    {
      id: "opscore",
      name: "OpsCore",
      subtitle: "Operational Command Center",
      accent: "#3A5585",
      accentBg: "#EEF1F7",
      accentBorder: "#C4CDE0",
      tagline: "Visibility across every part of your business.",
      desc: "OpsCore is the operational layer that ties everything together. Custom dashboards, automated workflows, and reporting designed around the KPIs that actually matter to your business.",
      forWho: ["Multi-location operators", "Franchise systems", "Teams with complex approval workflows", "Businesses needing cross-department reporting"],
      modules: [
        { name: "Custom Dashboards", desc: "Role-based dashboards showing each team member exactly what they need to see — nothing more, nothing less." },
        { name: "Workflow Automation", desc: "Automate repetitive processes, approvals, and notifications. Define the rules once; the system handles it from there." },
        { name: "Reporting Engine", desc: "Custom reports and KPI tracking across locations, teams, and time periods. Exportable and schedulable." },
        { name: "Access & Permissions", desc: "Granular role-based access control. Every team member sees and can edit exactly what they should." },
      ],
    },
    {
      id: "forge",
      name: "Forge",
      subtitle: "Fully Custom Build",
      accent: "#6D4FBB",
      accentBg: "#F3F0FC",
      accentBorder: "#D9D0F5",
      tagline: "For operations that don't fit any mold.",
      desc: "Forge is a completely custom-built system designed from the ground up around your unique structure, terminology, and workflows. No templates, no constraints — just your system, architected exactly the way your business runs.",
      forWho: ["Operations with proprietary workflows", "Businesses with unique data models", "Companies needing white-label systems", "Operators who've outgrown every tool they've tried"],
      modules: [
        { name: "Operational Architecture", desc: "Full discovery and design of your operational model — data structure, workflow logic, and system hierarchy built from scratch." },
        { name: "Custom Data Model", desc: "Your terminology, your entities, your relationships. No force-fitting your business into someone else's schema." },
        { name: "Proprietary Workflow Engine", desc: "Workflows built around exactly how your business moves — approvals, triggers, automations, and exceptions." },
        { name: "White-Glove Deployment", desc: "End-to-end build, testing, training, and handoff. We don't ship until you're fully operational." },
      ],
    },
  ];

  return (
    <div style={{ background: "#fff", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#1C1E26",
          borderRadius: "20px",
          padding: "80px 60px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 80px 80px, 80px 80px",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "640px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginBottom: "28px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
              Our Systems
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px",
            }}>
              Four systems.<br />
              <span style={{ color: "rgba(200,215,255,0.8)", fontStyle: "italic", fontWeight: 300 }}>One coherent operation.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "520px" }}>
              Each Novum system is customized to your business. Most clients start with one and expand — or combine them into a fully integrated operational platform.
            </p>
          </div>
        </div>
      </section>

      {/* ── Systems Detail ── */}
      {systems.map((sys, i) => (
        <section key={sys.id} id={sys.id} style={{
          padding: "96px 40px",
          borderTop: "1px solid #EDECEA",
          background: i % 2 === 1 ? "#FAFAF8" : "#fff",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="sys-detail-grid">

              {/* Left — sticky info */}
              <div style={{ position: "sticky", top: "88px" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "5px 14px",
                  background: sys.accentBg, border: `1px solid ${sys.accentBorder}`,
                  borderRadius: "100px",
                  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                  color: sys.accent, marginBottom: "20px",
                }}>{sys.subtitle}</span>

                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.04,
                  marginBottom: "14px", color: "#1A1A1A",
                }}>{sys.name}</h2>

                <p style={{ color: sys.accent, fontSize: "1rem", marginBottom: "18px", fontWeight: 500 }}>
                  {sys.tagline}
                </p>
                <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "32px" }}>
                  {sys.desc}
                </p>

                <div style={{ marginBottom: "32px" }}>
                  <p style={{
                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "#B0ADA8", marginBottom: "14px",
                  }}>Built for</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                    {sys.forWho.map((w) => (
                      <div key={w} style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: sys.accent, flexShrink: 0 }} />
                        <span style={{ color: "#4A4947", fontSize: "0.9rem" }}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "12px 26px", borderRadius: "100px",
                  background: "#1C1E26", color: "#fff",
                  fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = sys.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1C1E26"}
                >
                  Ask about {sys.name} →
                </Link>
              </div>

              {/* Right — modules */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {sys.modules.map((mod) => (
                  <div key={mod.name} style={{
                    padding: "28px 32px",
                    background: "#fff",
                    border: "1px solid #EDECEA",
                    borderRadius: "14px",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = sys.accentBorder; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                      <div style={{
                        width: 40, height: 40, background: sys.accentBg,
                        border: `1px solid ${sys.accentBorder}`,
                        borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <div style={{ width: 16, height: 16, borderRadius: "3px", background: sys.accent, opacity: 0.6 }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.975rem", fontWeight: 600, marginBottom: "7px", color: "#1A1A1A" }}>{mod.name}</h4>
                        <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{mod.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Combine CTA ── */}
      <section style={{ padding: "24px 24px 80px" }}>
        <div style={{
          background: "#1C1E26", borderRadius: "20px",
          padding: "80px 60px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 80px 80px, 80px 80px",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "560px", margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.03em", lineHeight: 1.08,
              color: "#fff", marginBottom: "18px",
            }}>Need more than one system?</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, marginBottom: "36px", fontSize: "1rem" }}>
              Our systems are designed to work together. Many clients run FieldOps and OpsCore in tandem, or combine all four into a fully integrated operational platform.
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "100px",
              background: "#F2EDD8", color: "#1A1A1A",
              fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
            }}>
              Talk to us about your stack →
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .sys-detail-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  );
}
