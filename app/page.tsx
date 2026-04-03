"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

// ── Animated system visualization ───────────────────────────────────────────
function SystemViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    // Nodes: [x%, y%, label, type]
    const nodes = [
      { x: 0.5,  y: 0.5,  label: "OpsCore",    type: "hub"    },
      { x: 0.18, y: 0.22, label: "Email",       type: "input"  },
      { x: 0.5,  y: 0.12, label: "PDF",         type: "input"  },
      { x: 0.82, y: 0.22, label: "Voice",       type: "input"  },
      { x: 0.15, y: 0.65, label: "Tasks",       type: "output" },
      { x: 0.38, y: 0.82, label: "Projects",    type: "output" },
      { x: 0.62, y: 0.82, label: "Workflows",   type: "output" },
      { x: 0.85, y: 0.65, label: "Teams",       type: "output" },
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3],
      [0, 4], [0, 5], [0, 6], [0, 7],
    ];

    // Particles on edges
    type Particle = { edge: number; progress: number; speed: number };
    const particles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        edge: Math.floor(Math.random() * edges.length),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.004,
      });
    }

    function drawDotGrid() {
      ctx!.fillStyle = "rgba(120,140,200,0.12)";
      const spacing = 28;
      for (let x = 0; x < W; x += spacing) {
        for (let y = 0; y < H; y += spacing) {
          ctx!.beginPath();
          ctx!.arc(x, y, 1, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function getNodePos(n: (typeof nodes)[0]) {
      return { x: n.x * W, y: n.y * H };
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // dot grid
      drawDotGrid();

      // draw edges
      for (const [a, b] of edges) {
        const pa = getNodePos(nodes[a]);
        const pb = getNodePos(nodes[b]);
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.strokeStyle = "rgba(100,120,180,0.18)";
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // draw particles
      for (const p of particles) {
        const [a, b] = edges[p.edge];
        const pa = getNodePos(nodes[a]);
        const pb = getNodePos(nodes[b]);
        const x = pa.x + (pb.x - pa.x) * p.progress;
        const y = pa.y + (pb.y - pa.y) * p.progress;

        // glow
        const grad = ctx!.createRadialGradient(x, y, 0, x, y, 6);
        grad.addColorStop(0, "rgba(100,140,220,0.9)");
        grad.addColorStop(1, "rgba(100,140,220,0)");
        ctx!.beginPath();
        ctx!.arc(x, y, 6, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // dot
        ctx!.beginPath();
        ctx!.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(160,185,255,0.95)";
        ctx!.fill();

        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
      }

      // draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pos = getNodePos(n);
        const isHub = n.type === "hub";
        const pulse = Math.sin(t * 2 + i * 0.8) * 0.5 + 0.5;

        // outer glow ring (hub only)
        if (isHub) {
          const glowR = 38 + pulse * 6;
          const glow = ctx!.createRadialGradient(pos.x, pos.y, 16, pos.x, pos.y, glowR);
          glow.addColorStop(0, "rgba(80,120,200,0.22)");
          glow.addColorStop(1, "rgba(80,120,200,0)");
          ctx!.beginPath();
          ctx!.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        // node circle
        const r = isHub ? 30 : n.type === "input" ? 20 : 18;
        ctx!.beginPath();
        ctx!.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        if (isHub) {
          const g = ctx!.createRadialGradient(pos.x - 6, pos.y - 6, 2, pos.x, pos.y, r);
          g.addColorStop(0, "rgba(90,120,200,0.9)");
          g.addColorStop(1, "rgba(50,75,150,0.9)");
          ctx!.fillStyle = g;
        } else if (n.type === "input") {
          ctx!.fillStyle = "rgba(50,65,100,0.85)";
        } else {
          ctx!.fillStyle = "rgba(38,50,80,0.85)";
        }
        ctx!.fill();

        // border
        ctx!.strokeStyle = isHub
          ? `rgba(120,155,240,${0.5 + pulse * 0.4})`
          : "rgba(90,120,180,0.35)";
        ctx!.lineWidth = isHub ? 1.5 : 1;
        ctx!.stroke();

        // label
        ctx!.fillStyle = isHub ? "rgba(255,255,255,0.95)" : "rgba(200,215,255,0.8)";
        ctx!.font = isHub ? "600 11px 'DM Sans', sans-serif" : "500 9px 'DM Sans', sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(n.label, pos.x, pos.y);
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", borderRadius: "16px" }}
    />
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ padding: "130px 48px 100px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }} className="hero-grid">

          {/* Left */}
          <div>
            <div className="pill-tag" style={{
              border: "1px solid var(--accent-border)",
              background: "var(--accent-bg)",
              color: "var(--accent)",
              marginBottom: "36px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              Operational Software for Growing Businesses
            </div>

            <h1 className="font-serif" style={{
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              lineHeight: "1.05",
              letterSpacing: "-0.025em",
              marginBottom: "28px",
              color: "var(--text)",
            }}>
              Software that{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>adapts</em>
              <br />to your business.
            </h1>

            <p style={{
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              color: "var(--text-soft)",
              lineHeight: "1.8",
              maxWidth: "500px",
              marginBottom: "44px",
            }}>
              We replace rigid, expensive software with systems built around how your business actually operates — not the other way around.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary">
                Book a Discovery Call
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/systems" className="btn-outline">
                See Our Systems
              </Link>
            </div>
          </div>

          {/* Right — animated system visualization */}
          <div style={{
            background: "var(--hero)",
            borderRadius: "20px",
            height: "440px",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* subtle top gradient overlay */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
              background: "linear-gradient(160deg, rgba(60,80,150,0.12) 0%, transparent 60%)",
            }} />
            <div style={{ position: "absolute", inset: 0 }}>
              <SystemViz />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 48px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="problem-grid">

            <div>
              <div className="pill-tag" style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-soft)",
                marginBottom: "28px",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                The Problem
              </div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                lineHeight: "1.15", letterSpacing: "-0.02em", marginBottom: "24px",
              }}>
                Your operations are unique.
                <br />
                <span style={{ color: "var(--text-soft)", fontStyle: "italic" }}>Your software isn&apos;t.</span>
              </h2>
              <p style={{ color: "var(--text-soft)", lineHeight: "1.85", fontSize: "0.97rem", marginBottom: "16px" }}>
                Off-the-shelf platforms were designed for the average business — which means they fit nobody perfectly. You end up bending your workflows to match your software, not the other way around.
              </p>
              <p style={{ color: "var(--text-soft)", lineHeight: "1.85", fontSize: "0.97rem" }}>
                The result? Disconnected tools, manual workarounds, and a team spending more time fighting software than doing actual work.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Generic platforms that force you to work around them",
                "Expensive enterprise tools built for companies 10x your size",
                "Disconnected tools requiring manual data entry between systems",
                "No visibility into your actual operations across teams",
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  padding: "20px 24px",
                  background: "var(--red-bg)",
                  border: "1px solid var(--red-border)",
                  borderRadius: "12px",
                }}>
                  <span style={{ color: "var(--red)", fontSize: "0.85rem", marginTop: "1px", fontWeight: "600", flexShrink: 0 }}>✕</span>
                  <p style={{ color: "var(--text-mid)", fontSize: "0.9rem", lineHeight: "1.65", margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution ────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 48px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 64px" }}>
            <div className="pill-tag" style={{
              border: "1px solid var(--accent-border)",
              background: "var(--accent-bg)",
              color: "var(--accent)",
              marginBottom: "24px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              The Novum Approach
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: "1.15", letterSpacing: "-0.02em", marginBottom: "18px",
            }}>
              Systems built around how you actually run.
            </h2>
            <p style={{ color: "var(--text-soft)", lineHeight: "1.8", fontSize: "0.97rem" }}>
              We start with your operations — not a template. Every system we deliver is structured around your workflows, your team, and your business model.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="solution-grid">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M9 3H5C3.9 3 3 3.9 3 5v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="var(--accent)" strokeWidth="1.5" />
                    <path d="M19 3h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
                    <path d="M9 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
                    <path d="M19 13h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="var(--accent)" strokeWidth="1.5" />
                  </svg>
                ),
                title: "Mapped to your operations",
                desc: "We document how your business works before writing a single line of configuration. The system reflects your reality, not a template.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="var(--accent)" strokeWidth="1.5" />
                    <path d="M12 7v5l3 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Fast to deploy, built to last",
                desc: "Our structured approach means you get a working system quickly — built on foundations that scale as your business grows.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
                    <path d="M2 12l10 5 10-5" stroke="var(--accent)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
                  </svg>
                ),
                title: "One system, not many tools",
                desc: "We consolidate your operations into a coherent system — eliminating the duct-tape stack of disconnected software.",
              },
            ].map((item, i) => (
              <div key={i} className="card-hover" style={{
                padding: "36px",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
              }}>
                <div style={{
                  width: "48px", height: "48px",
                  background: "var(--accent-bg)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "24px",
                }}>
                  {item.icon}
                </div>
                <h3 className="font-serif" style={{ fontSize: "1.15rem", marginBottom: "12px", letterSpacing: "-0.01em", color: "var(--text)" }}>
                  {item.title}
                </h3>
                <p style={{ color: "var(--text-soft)", fontSize: "0.91rem", lineHeight: "1.75", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems Overview ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "56px",
            flexWrap: "wrap", gap: "24px",
          }}>
            <div>
              <div className="pill-tag" style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-soft)",
                marginBottom: "18px",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                Our Systems
              </div>
              <h2 className="font-serif" style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                lineHeight: "1.1", letterSpacing: "-0.02em",
              }}>
                Every operation covered.<br />One platform.
              </h2>
            </div>
            <Link href="/systems" className="btn-outline">
              View All Systems →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              {
                name: "Forge",
                badge: "Fully Custom",
                badgeColor: "#6D4FBB",
                badgeBg: "#F3F0FC",
                badgeBorder: "#D9D0F5",
                desc: "For operations that don't fit any mold. Forge is a completely custom-built system designed from the ground up around your unique structure, terminology, and workflows. No templates, no constraints — just your system, architected exactly the way your business runs.",
                features: ["Full operational architecture from scratch", "Custom data model & integrations", "Proprietary workflow engine", "White-glove build & deployment"],
              },
              {
                name: "OpsCore",
                badge: "Operations Hub",
                badgeColor: "var(--accent)",
                badgeBg: "var(--accent-bg)",
                badgeBorder: "var(--accent-border)",
                desc: "Your entire operation unified in one intelligent command center. OpsCore uses AI to generate tasks from emails, texts, and documents automatically. Your team communicates via built-in chat, shares notes, tracks projects, and monitors budgets — all in one place. And it connects to the tools you already use: accounting platforms like QuickBooks, CRMs like Salesforce or HubSpot, project tools like Monday or Asana, communication tools like Gmail or Outlook, ERP systems, and more. One platform. Every tool. Zero switching.",
                features: ["AI task generation from email/text/PDF", "Built-in team chat & shared notes", "Project-filtered calendar & tasks", "QuickBooks, Salesforce, HubSpot & more", "Custom role dashboards", "Workflow automation"],
              },
              {
                name: "FieldOps",
                badge: "Field Service",
                badgeColor: "#236B4E",
                badgeBg: "#EEF7F3",
                badgeBorder: "#C4E0D5",
                desc: "End-to-end field service management built around your crews, territories, and job types. From the moment a job is booked to the final invoice — scheduling, dispatch, field access, photo documentation, and automated billing all run through one connected system.",
                features: ["Visual scheduling & dispatch", "Mobile field access & job tracking", "Automated invoicing on completion", "Customer records & property history"],
              },
              {
                name: "ProjectOps",
                badge: "Project-Based",
                badgeColor: "#2C4E8A",
                badgeBg: "#EEF2FA",
                badgeBorder: "#C0CEEB",
                desc: "Full project lifecycle management from bid to close. Track live budget vs. actuals, manage vendors and subs, monitor milestone completion, and report on profitability across every active project — all in one system built around your workflow.",
                features: ["Live budget-vs-actual tracking", "Vendor & sub management", "Milestone & Gantt-style timelines", "Document & RFI management", "Profitability reporting"],
              },
            ].map((sys, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "240px 1fr auto",
                gap: "48px", alignItems: "center",
                padding: "36px 40px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
                className="sys-row"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div>
                  <h3 className="font-serif" style={{ fontSize: "1.7rem", letterSpacing: "-0.02em", marginBottom: "10px", color: "var(--text)" }}>
                    {sys.name}
                  </h3>
                  <span style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "3px 12px",
                    background: sys.badgeBg,
                    border: `1px solid ${sys.badgeBorder}`,
                    borderRadius: "100px",
                    fontSize: "0.7rem", fontWeight: "600",
                    letterSpacing: "0.06em", color: sys.badgeColor,
                  }}>
                    {sys.badge}
                  </span>
                </div>
                <div>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: "1.75", marginBottom: "14px" }}>
                    {sys.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {sys.features.map((f) => (
                      <span key={f} style={{
                        padding: "3px 12px",
                        background: "var(--bg)",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        fontSize: "0.77rem", color: "var(--text-soft)",
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href="/systems" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "38px", height: "38px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px", color: "var(--text-soft)",
                  textDecoration: "none", flexShrink: 0,
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-soft)";
                  }}
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 48px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div className="pill-tag" style={{
              border: "1px solid var(--border)",
              background: "var(--bg)",
              color: "var(--text-soft)",
              marginBottom: "20px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
              How It Works
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: "1.1", letterSpacing: "-0.02em",
            }}>
              From discovery to deployed — in three steps.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", position: "relative" }} className="process-grid">
            <div style={{
              position: "absolute", top: "48px",
              left: "calc(16.67% + 36px)", right: "calc(16.67% + 36px)",
              height: "1px", background: "var(--border)",
            }} className="process-connector" />

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
              <div key={i} style={{ textAlign: "center", padding: "0 20px" }}>
                <div style={{
                  width: "72px", height: "72px", borderRadius: "50%",
                  background: "var(--bg)",
                  border: "1.5px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 32px",
                  position: "relative", zIndex: 1,
                }}>
                  <span className="font-serif" style={{ fontSize: "1.4rem", color: "var(--accent)", letterSpacing: "-0.02em" }}>
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif" style={{ fontSize: "1.3rem", marginBottom: "14px", letterSpacing: "-0.01em", color: "var(--text)" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: "1.8" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: "120px 48px", textAlign: "center" }}>
        <div style={{
          maxWidth: "640px", margin: "0 auto",
          padding: "72px 64px",
          background: "var(--hero)",
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* subtle dot grid inside CTA card */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.4,
            backgroundImage: "radial-gradient(circle, rgba(100,130,200,0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="pill-tag" style={{
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "32px",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block" }} />
              Ready to Build
            </div>
            <h2 className="font-serif" style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              lineHeight: "1.1", letterSpacing: "-0.025em",
              marginBottom: "20px", color: "#FFFFFF",
            }}>
              Stop adapting to your software.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "44px" }}>
              Book a discovery call and let&apos;s map out what an operational system built for your business would look like.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                padding: "15px 32px", borderRadius: "100px",
                background: "#FFFFFF", color: "var(--text)",
                fontSize: "0.92rem", fontWeight: "600",
                textDecoration: "none", display: "inline-flex",
                alignItems: "center", gap: "8px",
                transition: "opacity 0.2s",
              }}>
                Book a Discovery Call →
              </Link>
              <Link href="/systems" style={{
                padding: "15px 28px", borderRadius: "100px",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.7)", background: "transparent",
                fontSize: "0.92rem", fontWeight: "500",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}>
                Explore Systems
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .solution-grid { grid-template-columns: 1fr !important; }
          .process-grid  { grid-template-columns: 1fr !important; }
          .process-connector { display: none; }
          .sys-row { grid-template-columns: 1fr !important; gap: 18px !important; padding: 24px !important; }
        }
      `}</style>
    </div>
  );
}
