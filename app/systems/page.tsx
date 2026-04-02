"use client";
import Link from "next/link";

export default function SystemsPage() {
  const systems = [
    {
      id: "opscore",
      name: "OpsCore",
      subtitle: "Operational Command Center",
      color: "var(--gold)",
      colorBg: "rgba(201,169,110,0.08)",
      colorBorder: "rgba(201,169,110,0.2)",
      tagline: "Your entire operation, unified in one intelligent system.",
      desc: "OpsCore is more than a dashboard — it's a live operational brain for your business. Powered by AI, it automatically generates tasks from incoming emails, text messages, and documents so nothing slips through the cracks. Your team communicates via built-in project chat, shares notes, tracks deadlines on a unified calendar, and monitors budgets — all filtered by project, all in one place. Think Slack, Notion, and your PM tool merged into a single system built exactly around how you operate.",
      forWho: ["Construction & development firms", "Multi-location operators", "Teams managing multiple concurrent projects", "Organizations with complex approval workflows"],
      modules: [
        {
          name: "AI Task Engine",
          desc: "Drop in a text message, email, or PDF — OpsCore reads it and automatically creates tasks, assigns steps, sets priorities, and routes them to the right team member. No manual intake, no dropped balls.",
          icon: "🤖",
        },
        {
          name: "Team Command Center",
          desc: "Built-in Slack-style chat organized by project and team. Shared notes, versioned documents, and a live calendar — all in context with the project you're working in. Full team visibility without switching apps.",
          icon: "💬",
        },
        {
          name: "Project Intelligence Board",
          desc: "Every task, message, note, and document attached to its project. See your full project board at a glance — status, blockers, upcoming milestones, budget health, and team activity all in one view.",
          icon: "📊",
        },
        {
          name: "Procore & Platform Integrations",
          desc: "Pull live budgets, drawings, RFIs, and submittals directly from Procore into your OpsCore workspace. Plus native integrations for email, calendar, QuickBooks, and the other tools your team already uses.",
          icon: "🔗",
        },
        {
          name: "Custom Role Dashboards",
          desc: "Every team member sees a view built for their role. Executives get KPIs and cross-project visibility. Project managers get milestones and budget burn. Field leads get today's jobs and open tasks. Nothing more, nothing less.",
          icon: "🖥",
        },
        {
          name: "Workflow Automation",
          desc: "Define your processes once — OpsCore runs them every time. Automated approvals, triggered notifications, escalation paths, and status updates. If an email comes in that requires action, the system already knows what to do.",
          icon: "⚡",
        },
      ],
    },
    {
      id: "fieldops",
      name: "FieldOps",
      subtitle: "Field Service Management",
      color: "var(--green-accent)",
      colorBg: "rgba(46,204,143,0.08)",
      colorBorder: "rgba(46,204,143,0.2)",
      tagline: "Dispatch smarter. Close faster. Get paid automatically.",
      desc: "FieldOps is a complete end-to-end system for businesses with teams in the field. From the moment a job is booked to the final invoice — scheduling, dispatch, field access, photo documentation, and payment collection all run through one connected system. Built around your specific job types, crew structure, territories, and billing rules — not a one-size-fits-all platform you have to work around.",
      forWho: ["HVAC & mechanical contractors", "Plumbing & electrical", "Landscaping & property maintenance", "Equipment services & repair"],
      modules: [
        {
          name: "Scheduling & Dispatch Board",
          desc: "Visual drag-and-drop scheduling built around your crews, territories, and job types. Real-time job assignments push directly to field techs — no phone tag, no confusion, no double-booking.",
          icon: "📅",
        },
        {
          name: "Job Management & Field Access",
          desc: "Full job lifecycle from work order to sign-off. Field techs access jobs on mobile — upload photos, add notes, update job status, capture signatures on-site, and flag issues in real time.",
          icon: "🔧",
        },
        {
          name: "Automated Invoicing & Payments",
          desc: "Invoices generate automatically on job completion based on your pricing rules, line items, and labor rates. Collect payment in the field or trigger automated billing — no manual entry, no billing delays.",
          icon: "💳",
        },
        {
          name: "Customer Records & Property History",
          desc: "Complete history per customer and property — every service visit, piece of equipment installed, past invoice, and communication log. Your team always walks in informed.",
          icon: "📋",
        },
        {
          name: "Asset & Equipment Tracking",
          desc: "Track the equipment and assets you service or maintain at each property. Service intervals, warranty records, and replacement histories tied to the customer and job record.",
          icon: "🔩",
        },
        {
          name: "Reporting & Ops Visibility",
          desc: "Track technician performance, job completion rates, revenue by service type, and invoice aging. See what's actually happening across your field operation — not just what's scheduled.",
          icon: "📈",
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
      tagline: "From bid to close — every project on budget and on time.",
      desc: "ProjectOps gives project-based businesses a full command center for running complex jobs from the first estimate to final billing. Track live budget vs. actuals, manage vendors and subcontractors, monitor milestone completion, handle RFIs and change orders, and report on profitability across every active project — all in one system configured around how your business actually runs jobs.",
      forWho: ["General contractors", "Specialty trades & subcontractors", "IT & tech project firms", "Marketing & creative agencies"],
      modules: [
        {
          name: "Project Dashboard & Status",
          desc: "Real-time view across all active projects — budget burn, milestone completion, team assignments, and open issues. Spot problems before they become overruns. Know where every project stands without asking.",
          icon: "📊",
        },
        {
          name: "Budget Tracking & Cost Control",
          desc: "Live budget-vs-actual across all cost categories — labor, materials, subs, equipment, overhead. Track committed costs and change orders as they happen, not after the project closes.",
          icon: "💰",
        },
        {
          name: "Vendor & Subcontractor Management",
          desc: "Track bids, contracts, scopes of work, lien waivers, payments, and performance for every vendor and sub — all tied to the project, phase, and cost code they belong to.",
          icon: "🤝",
        },
        {
          name: "Milestone & Timeline Tracking",
          desc: "Gantt-style milestone tracking with dependency management. Flag at-risk milestones, automate progress reports, and keep stakeholders informed without extra manual effort.",
          icon: "📍",
        },
        {
          name: "Document & RFI Management",
          desc: "Centralize drawings, submittals, RFIs, and change orders in one version-controlled repository. No more digging through email chains — every document attached to its project and phase.",
          icon: "📁",
        },
        {
          name: "Profitability Reporting",
          desc: "See margin, labor cost, and overhead broken down by project, client, or job type. Know which work makes money and which doesn't — with data that updates in real time as costs come in.",
          icon: "📈",
        },
      ],
    },
    {
      id: "forge",
      name: "Forge",
      subtitle: "Custom-Built Operational Systems",
      color: "#A78BFA",
      colorBg: "rgba(167,139,250,0.08)",
      colorBorder: "rgba(167,139,250,0.2)",
      tagline: "No template. No limits. Built entirely from scratch.",
      desc: "Forge is Novum's highest-tier engagement — a completely custom operational system designed from the ground up around your unique business. No templates, no premade modules to configure, no compromises. If your operation is complex, specialized, or simply unlike anything else, Forge starts with a blank slate and builds the exact system your business needs to run at full capacity.",
      forWho: ["Organizations with complex or unique operational structures", "Businesses that have outgrown off-the-shelf and pre-built platforms", "Companies requiring deep integrations across multiple systems", "High-growth operators who need a system that scales with them"],
      modules: [
        {
          name: "Full Operational Architecture",
          desc: "We design your system from the ground up — custom data model, user roles, permission structures, workflows, and integrations all architected around your exact business before a single line is written.",
          icon: "🏗",
        },
        {
          name: "Custom Integrations & Data Layer",
          desc: "Connect anything — Procore, QuickBooks, Salesforce, your ERP, your CRM, proprietary databases, or legacy tools. We build the data pipelines, sync logic, and APIs your operation actually needs.",
          icon: "🔌",
        },
        {
          name: "Proprietary Workflow Engine",
          desc: "Your processes encoded into the system — custom approval chains, conditional logic, automated routing, and escalation paths built to match exactly how your team operates, not a generic template.",
          icon: "⚙",
        },
        {
          name: "AI & Automation Layer",
          desc: "Where applicable, we layer in AI capabilities — intelligent task generation, document parsing, predictive alerts, and automated decision routing — built for your specific data and workflows.",
          icon: "🤖",
        },
        {
          name: "White-Glove Build & Deployment",
          desc: "Dedicated build team, full system documentation, and a structured rollout with role-based training and change management. You don't go live until every part of your team is confident.",
          icon: "🚀",
        },
        {
          name: "Ongoing Evolution",
          desc: "A Forge system isn't a one-time delivery — it's a living platform. As your business grows and changes, we evolve the system with you. Quarterly reviews, feature expansions, and dedicated support.",
          icon: "🔄",
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
          padding: "160px 48px 100px",
          textAlign: "center",
          background: "radial-gradient(ellipse 900px 500px at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 60%), var(--ink)",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
            Custom systems.
            <br />
            <span className="gold-shimmer">One coherent operation.</span>
          </h1>
          <p style={{ color: "var(--ivory-muted)", fontSize: "1.05rem", lineHeight: "1.8", maxWidth: "580px", margin: "0 auto" }}>
            Every Novum system is built and configured around your specific business — not a template you adapt to. Start with one system or combine them into a fully integrated operational platform.
          </p>

          {/* System nav pills */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "48px" }}>
            {[
              { name: "OpsCore", color: "var(--gold)", id: "opscore" },
              { name: "FieldOps", color: "var(--green-accent)", id: "fieldops" },
              { name: "ProjectOps", color: "#7B9FF5", id: "projectops" },
              { name: "Forge", color: "#A78BFA", id: "forge" },
            ].map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  padding: "8px 20px",
                  borderRadius: "100px",
                  border: `1px solid ${s.color}40`,
                  background: `${s.color}10`,
                  color: s.color,
                  fontSize: "0.82rem",
                  fontWeight: "500",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Detail */}
      {systems.map((sys, i) => (
        <section
          key={sys.id}
          id={sys.id}
          style={{
            padding: "100px 48px",
            background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
            borderTop: "1px solid rgba(245,242,236,0.06)",
          }}
        >
          <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
            {/* System header */}
            <div style={{ marginBottom: "56px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
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
                  }}
                >
                  {sys.subtitle}
                </div>
                {i === 0 && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "5px 14px",
                      background: "rgba(201,169,110,0.06)",
                      border: "1px solid rgba(201,169,110,0.2)",
                      borderRadius: "100px",
                      fontSize: "0.72rem",
                      fontWeight: "500",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                    }}
                  >
                    Most Popular
                  </div>
                )}
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                  lineHeight: "1.05",
                }}
              >
                {sys.name}
              </h2>
              <p style={{ color: sys.color, fontSize: "1.1rem", marginBottom: "0", fontWeight: "400" }}>
                {sys.tagline}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: "80px",
                alignItems: "start",
              }}
              className="sys-detail-grid"
            >
              {/* Left col — description & for who */}
              <div style={{ position: "sticky", top: "100px" }}>
                <p style={{ color: "var(--ivory-muted)", lineHeight: "1.85", fontSize: "0.97rem", marginBottom: "40px" }}>
                  {sys.desc}
                </p>
                <div style={{ marginBottom: "40px" }}>
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

              {/* Modules grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
                className="modules-grid"
              >
                {sys.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="card-hover"
                    style={{
                      padding: "26px 28px",
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(245,242,236,0.08)",
                      borderRadius: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: sys.colorBg,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        marginBottom: "16px",
                      }}
                    >
                      {mod.icon}
                    </div>
                    <h4
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: "var(--ivory)",
                      }}
                    >
                      {mod.name}
                    </h4>
                    <p style={{ color: "var(--ivory-muted)", fontSize: "0.87rem", lineHeight: "1.7", margin: 0 }}>
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section
        style={{
          padding: "100px 48px",
          textAlign: "center",
          borderTop: "1px solid rgba(245,242,236,0.06)",
          background: "radial-gradient(ellipse 800px 400px at 50% 50%, rgba(167,139,250,0.04) 0%, rgba(201,169,110,0.03) 60%, transparent 80%)",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="tag" style={{ marginBottom: "28px", display: "inline-flex" }}>Not Sure Where to Start?</div>
          <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em", marginBottom: "20px" }}>
            We&apos;ll figure it out together.
          </h2>
          <p style={{ color: "var(--ivory-muted)", lineHeight: "1.8", marginBottom: "36px" }}>
            Most clients start with a single system and expand. Some need Forge from day one. A 30-minute discovery call is how we figure out what your operation actually needs — no pitch, no pressure.
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
        @media (max-width: 1100px) {
          .sys-detail-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .modules-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
