"use client";
import Link from "next/link";

export default function SystemsPage() {
  const systems = [
    {
      id: "fieldops",
      name: "FieldOps",
      subtitle: "Field Service Management",
      color: "var(--green-accent)",
      colorBg: "rgba(46,204,143,0.08)",
      colorBorder: "rgba(46,204,143,0.2)",
      tagline: "Schedule, dispatch, and close jobs — without the chaos.",
      desc: "FieldOps is a complete operational system for field service businesses. Built around your specific job types, team structure, and billing needs — not a one-size-fits-all platform.",
      forWho: ["HVAC & mechanical contractors", "Plumbing & electrical", "Landscaping & property maintenance", "Equipment services & repair"],
      modules: [
        {
          name: "Scheduling & Dispatch",
          desc: "Visual scheduling board built around your team, territories, and job types. Drag-and-drop dispatch with real-time updates.",
          icon: "📅",
        },
        {
          name: "Job Management",
          desc: "Full job lifecycle from work order to completion. Field team access, photo uploads, notes, and status tracking.",
          icon: "🔧",
        },
        {
          name: "Invoicing & Payments",
          desc: "Automated invoicing tied to job completion. Configurable pricing rules, line items, and payment collection.",
          icon: "💳",
        },
        {
          name: "Customer Records",
          desc: "Complete customer and property history. Service records, equipment tracking, and communication logs.",
          icon: "📋",
        },
      ],
    },
    {
      id: "projectops",
      name: "ProjectOps",
      subtitle: "Project-Based Business Management",
      color: "#7B9FF5",
      colorBg: "rgba(59,107,240,0.08)",
      colorBorder: "rgba(59,107,240,0.2)",
      tagline: "Run every project on budget and on time.",
      desc: "ProjectOps gives project-based businesses a command center for managing complex jobs from bid to close. Track milestones, budgets, vendors, and profitability across every project.",
      forWho: ["General contractors", "Specialty trades & subcontractors", "IT & tech project firms", "Marketing & creative agencies"],
      modules: [
        {
          name: "Project Dashboard",
          desc: "Real-time view of all active projects — status, budget burn, milestone completion, and team assignments.",
          icon: "📊",
        },
        {
          name: "Budget Tracking",
          desc: "Live budget-vs-actual across all cost categories. Flag overruns early and protect your margins.",
          icon: "💰",
        },
        {
          name: "Vendor & Sub Management",
          desc: "Track vendor bids, contracts, payments, and performance. All connected to the project it belongs to.",
          icon: "🤝",
        },
        {
          name: "Milestone & Timeline",
          desc: "Gantt-style milestone tracking with dependency management and automated progress reports.",
          icon: "📍",
        },
      ],
    },
    {
      id: "opscore",
      name: "OpsCore",
      subtitle: "Operational Command Center",
      color: "var(--gold)",
      colorBg: "rgba(201,169,110,0.08)",
      colorBorder: "rgba(201,169,110,0.2)",
      tagline: "Visibility across every part of your business.",
      desc: "OpsCore is the operational layer that ties everything together. Custom dashboards, automated workflows, and reporting designed around the KPIs that actually matter to your business.",
      forWho: ["Multi-location operators", "Franchise systems", "Teams with complex approval workflows", "Businesses needing cross-department reporting"],
      modules: [
        {
          name: "Custom Dashboards",
          desc: "Role-based dashboards showing each team member exactly what they need to see — nothing more, nothing less.",
          icon: "🖥",
        },
        {
          name: "Workflow Automation",
          desc: "Automate repetitive processes, approvals, and notifications. Define the rules once; the system handles it from there.",
          icon: "⚡",
        },
        {
          name: "Reporting Engine",
          desc: "Custom reports and KPI tracking across locations, teams, and time periods. Exportable and schedulable.",
          icon: "📈",
        },
        {
          name: "Access & Permissions",
          desc: "Granular role-based access control. Every team member sees and can edit exactly what they should.",
          icon: "🔐",
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg"
        style={{
          padding: "160px 32px 100px",
          textAlign: "center",
          background: "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%), var(--ink)",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div className="tag" style={{ marginBottom: "28px", display: "inline-flex" }}>Our Systems</div>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Three systems.<br />
            <span className="gold-shimmer">One coherent operation.</span>
          </h1>
          <p style={{ color: "var(--ivory-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
            Each Novum system is customized to your business. Most clients start with one and expand — or combine them into a fully integrated operational platform.
          </p>
        </div>
      </section>

      {/* Systems Detail */}
      {systems.map((sys, i) => (
        <section
          key={sys.id}
          id={sys.id}
          style={{
            padding: "100px 32px",
            background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
            borderTop: "1px solid rgba(245,242,236,0.06)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "start",
              }}
              className="sys-detail-grid"
            >
              <div style={{ position: "sticky", top: "100px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "5px 14px",
                    background: sys.colorBg,
                    border: `1px solid ${sys.colorBorder}`,
                    borderRadius: "100px",
                    fontSize: "0.72rem",
                    fontWeight: "500",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: sys.color,
                    marginBottom: "24px",
                  }}
                >
                  {sys.subtitle}
                </div>
                <h2
                  className="font-serif"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    letterSpacing: "-0.02em",
                    marginBottom: "16px",
                    lineHeight: "1.05",
                  }}
                >
                  {sys.name}
                </h2>
                <p style={{ color: sys.color, fontSize: "1.05rem", marginBottom: "20px", fontWeight: "400" }}>
                  {sys.tagline}
                </p>
                <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", fontSize: "0.95rem", marginBottom: "36px" }}>
                  {sys.desc}
                </p>
                <div style={{ marginBottom: "32px" }}>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "600",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ivory-muted)",
                      marginBottom: "16px",
                    }}
                  >
                    Built for
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {sys.forWho.map((w) => (
                      <div key={w} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: sys.color,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ color: "var(--ivory-muted)", fontSize: "0.9rem" }}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 28px",
                    borderRadius: "9px",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  Ask about {sys.name} →
                </Link>
              </div>

              {/* Modules */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sys.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="card-hover"
                    style={{
                      padding: "28px 32px",
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(245,242,236,0.08)",
                      borderRadius: "14px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          background: sys.colorBg,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem",
                          flexShrink: 0,
                        }}
                      >
                        {mod.icon}
                      </div>
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            marginBottom: "8px",
                            color: "var(--ivory)",
                          }}
                        >
                          {mod.name}
                        </h4>
                        <p style={{ color: "var(--ivory-muted)", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>
                          {mod.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Combine section */}
      <section
        style={{
          padding: "100px 32px",
          textAlign: "center",
          borderTop: "1px solid rgba(245,242,236,0.06)",
          background: "radial-gradient(ellipse 800px 400px at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
        }}
      >
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Need more than one system?
          </h2>
          <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", marginBottom: "36px" }}>
            Our systems are designed to work together. Many clients run FieldOps and OpsCore in tandem, or combine all three into a fully integrated operational platform.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
            style={{ padding: "15px 36px", borderRadius: "10px", textDecoration: "none", fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Talk to us about your stack →
          </Link>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .sys-detail-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  );
}
