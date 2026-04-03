"use client";
import Link from "next/link";

export default function SystemsPage() {
  const systems = [
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
        {
          name: "Operational Architecture",
          desc: "Full discovery and design of your operational model — data structure, workflow logic, and system hierarchy built from scratch.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" stroke={a} strokeWidth="1.4"/><rect x="11" y="1" width="4" height="4" rx="1" stroke={a} strokeWidth="1.4"/><rect x="1" y="11" width="4" height="4" rx="1" stroke={a} strokeWidth="1.4"/><rect x="11" y="11" width="4" height="4" rx="1" stroke={a} strokeWidth="1.4"/><line x1="5" y1="3" x2="11" y2="3" stroke={a} strokeWidth="1.2"/><line x1="3" y1="5" x2="3" y2="11" stroke={a} strokeWidth="1.2"/><line x1="13" y1="5" x2="13" y2="11" stroke={a} strokeWidth="1.2"/><line x1="5" y1="13" x2="11" y2="13" stroke={a} strokeWidth="1.2"/></svg>,
        },
        {
          name: "Custom Data Model",
          desc: "Your terminology, your entities, your relationships. No force-fitting your business into someone else's schema.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke={a} strokeWidth="1.4"/><line x1="2" y1="6" x2="14" y2="6" stroke={a} strokeWidth="1.2"/><line x1="2" y1="9.5" x2="14" y2="9.5" stroke={a} strokeWidth="1.2"/><line x1="6.5" y1="6" x2="6.5" y2="13.5" stroke={a} strokeWidth="1.2"/></svg>,
        },
        {
          name: "Proprietary Workflow Engine",
          desc: "Workflows built around exactly how your business moves — approvals, triggers, automations, and exceptions.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="3" cy="8" r="2" stroke={a} strokeWidth="1.4"/><circle cx="13" cy="4" r="2" stroke={a} strokeWidth="1.4"/><circle cx="13" cy="12" r="2" stroke={a} strokeWidth="1.4"/><line x1="5" y1="7.2" x2="11" y2="4.6" stroke={a} strokeWidth="1.2"/><line x1="5" y1="8.8" x2="11" y2="11.4" stroke={a} strokeWidth="1.2"/></svg>,
        },
        {
          name: "White-Glove Deployment",
          desc: "End-to-end build, testing, training, and handoff. We don't ship until you're fully operational.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C9.5 3.5 12 6 12 9.5H4C4 6 6.5 3.5 8 1.5z" stroke={a} strokeWidth="1.4" strokeLinejoin="round"/><path d="M4 9.5L3.5 13.5H12.5L12 9.5" stroke={a} strokeWidth="1.4" strokeLinejoin="round"/><circle cx="8" cy="6.5" r="1.4" stroke={a} strokeWidth="1.2"/></svg>,
        },
      ],
    },
    {
      id: "opscore",
      name: "OpsCore",
      subtitle: "Operational Command Center",
      accent: "#c8581a",
      accentBg: "#fdf0e8",
      accentBorder: "#f0c4a0",
      tagline: "Visibility across every part of your business.",
      desc: "OpsCore is the operational layer that ties everything together. Custom dashboards, automated workflows, and reporting designed around the KPIs that actually matter to your business.",
      forWho: ["Multi-location operators", "Franchise systems", "Teams with complex approval workflows", "Businesses needing cross-department reporting"],
      modules: [
        {
          name: "Custom Dashboards",
          desc: "Role-based dashboards showing each team member exactly what they need to see — nothing more, nothing less.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="4" rx="1" stroke={a} strokeWidth="1.4"/><rect x="9" y="1" width="6" height="4" rx="1" stroke={a} strokeWidth="1.4"/><rect x="1" y="7" width="6" height="8" rx="1" stroke={a} strokeWidth="1.4"/><rect x="9" y="7" width="6" height="4" rx="1" stroke={a} strokeWidth="1.4"/></svg>,
        },
        {
          name: "Workflow Automation",
          desc: "Automate repetitive processes, approvals, and notifications. Define the rules once; the system handles it from there.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 6A5 5 0 103 8" stroke={a} strokeWidth="1.4" strokeLinecap="round"/><polyline points="1,6 3,8 5,6" stroke={a} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/></svg>,
        },
        {
          name: "Reporting Engine",
          desc: "Custom reports and KPI tracking across locations, teams, and time periods. Exportable and schedulable.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="10" width="3" height="5" rx="0.8" stroke={a} strokeWidth="1.3"/><rect x="6" y="6" width="3" height="9" rx="0.8" stroke={a} strokeWidth="1.3"/><rect x="11" y="2" width="3" height="13" rx="0.8" stroke={a} strokeWidth="1.3"/></svg>,
        },
        {
          name: "Access & Permissions",
          desc: "Granular role-based access control. Every team member sees and can edit exactly what they should.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4v5c0 3.5 2.7 5.8 6 6.5 3.3-.7 6-3 6-6.5V4L8 1.5z" stroke={a} strokeWidth="1.4" strokeLinejoin="round"/><circle cx="8" cy="8" r="1.8" stroke={a} strokeWidth="1.2"/></svg>,
        },
      ],
    },
    {
      id: "projectops",
      name: "ProjectOps",
      subtitle: "Project-Based Business Management",
      accent: "#3d6e8a",
      accentBg: "#eef3f7",
      accentBorder: "#b0c8d8",
      tagline: "Run every project on budget and on time.",
      desc: "ProjectOps gives project-based businesses a command center for managing complex jobs from bid to close. Track milestones, budgets, vendors, and profitability across every project.",
      forWho: ["General contractors", "Specialty trades & subcontractors", "IT & tech project firms", "Marketing & creative agencies"],
      modules: [
        {
          name: "Project Dashboard",
          desc: "Real-time view of all active projects — status, budget burn, milestone completion, and team assignments.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="10" rx="1.5" stroke={a} strokeWidth="1.4"/><line x1="1" y1="5" x2="15" y2="5" stroke={a} strokeWidth="1.2"/><line x1="5" y1="5" x2="5" y2="11" stroke={a} strokeWidth="1.2"/><line x1="4" y1="13" x2="12" y2="13" stroke={a} strokeWidth="1.4" strokeLinecap="round"/></svg>,
        },
        {
          name: "Budget Tracking",
          desc: "Live budget-vs-actual across all cost categories. Flag overruns early and protect your margins.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polyline points="1,12 5,8 8,10 12,5 15,7" stroke={a} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/><polyline points="12,5 15,5 15,8" stroke={a} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/></svg>,
        },
        {
          name: "Vendor & Sub Management",
          desc: "Track vendor bids, contracts, payments, and performance. All connected to the project it belongs to.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="2.5" stroke={a} strokeWidth="1.4"/><circle cx="11" cy="5" r="2.5" stroke={a} strokeWidth="1.4"/><path d="M1 14c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={a} strokeWidth="1.4" strokeLinecap="round"/><path d="M11 10c1.8.4 3 2 3 4" stroke={a} strokeWidth="1.4" strokeLinecap="round"/></svg>,
        },
        {
          name: "Milestone & Timeline",
          desc: "Gantt-style milestone tracking with dependency management and automated progress reports.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="1" y1="8" x2="15" y2="8" stroke={a} strokeWidth="1.3"/><circle cx="3" cy="8" r="2" stroke={a} strokeWidth="1.3" fill="none"/><circle cx="8" cy="8" r="2" stroke={a} strokeWidth="1.3" fill="none"/><circle cx="13" cy="8" r="2" stroke={a} strokeWidth="1.3" fill="none"/><line x1="3" y1="4" x2="3" y2="6" stroke={a} strokeWidth="1.3"/><line x1="8" y1="4" x2="8" y2="6" stroke={a} strokeWidth="1.3"/><line x1="13" y1="4" x2="13" y2="6" stroke={a} strokeWidth="1.3"/></svg>,
        },
      ],
    },
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
        {
          name: "Scheduling & Dispatch",
          desc: "Visual scheduling board built around your team, territories, and job types. Drag-and-drop dispatch with real-time updates.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="1.5" stroke={a} strokeWidth="1.4"/><line x1="1" y1="7" x2="15" y2="7" stroke={a} strokeWidth="1.2"/><line x1="5" y1="1" x2="5" y2="5" stroke={a} strokeWidth="1.4" strokeLinecap="round"/><line x1="11" y1="1" x2="11" y2="5" stroke={a} strokeWidth="1.4" strokeLinecap="round"/><line x1="5" y1="10" x2="11" y2="10" stroke={a} strokeWidth="1.2" strokeLinecap="round"/></svg>,
        },
        {
          name: "Job Management",
          desc: "Full job lifecycle from work order to completion. Field team access, photo uploads, notes, and status tracking.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="1.5" width="10" height="13" rx="1.5" stroke={a} strokeWidth="1.4"/><line x1="6" y1="1.5" x2="6" y2="4.5" stroke={a} strokeWidth="1.2"/><line x1="10" y1="1.5" x2="10" y2="4.5" stroke={a} strokeWidth="1.2"/><line x1="6" y1="3" x2="10" y2="3" stroke={a} strokeWidth="1.2"/><polyline points="5.5,8 7.5,10 11,7" stroke={a} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/></svg>,
        },
        {
          name: "Invoicing & Payments",
          desc: "Automated invoicing tied to job completion. Configurable pricing rules, line items, and payment collection.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke={a} strokeWidth="1.4"/><line x1="5.5" y1="5" x2="10.5" y2="5" stroke={a} strokeWidth="1.2" strokeLinecap="round"/><line x1="5.5" y1="7.5" x2="10.5" y2="7.5" stroke={a} strokeWidth="1.2" strokeLinecap="round"/><line x1="5.5" y1="10" x2="8" y2="10" stroke={a} strokeWidth="1.2" strokeLinecap="round"/></svg>,
        },
        {
          name: "Customer Records",
          desc: "Complete customer and property history. Service records, equipment tracking, and communication logs.",
          icon: (a: string) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke={a} strokeWidth="1.4"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={a} strokeWidth="1.4" strokeLinecap="round"/></svg>,
        },
      ],
    },
  ];

  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414",
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
              Custom systems.<br />
              <span style={{ color: "rgba(240,196,160,0.85)", fontStyle: "italic", fontWeight: 300 }}>One coherent operation.</span>
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
                  background: "#141414", color: "#fff",
                  fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = sys.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#141414"}
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
                        {mod.icon(sys.accent)}
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
          background: "#141414", borderRadius: "20px",
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
