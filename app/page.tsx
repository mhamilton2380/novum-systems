"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const SPLINE_SCENE = "https://prod.spline.design/XsPp0DbFEyd8vOws/scene.splinecode";

// ─── Canvas background: animated grid + pulses ───────────────────────────────
function PlexusBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let time = 0;

    const SPACING = 72;
    type GridPulse = { axis: "h" | "v"; line: number; t: number; speed: number; alpha: number };
    const pulses: GridPulse[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      pulses.length = 0;
    };

    const spawnPulse = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.floor(W / SPACING);
      const rows = Math.floor(H / SPACING);
      const axis: "h" | "v" = Math.random() < 0.5 ? "h" : "v";
      const line = axis === "h"
        ? 1 + Math.floor(Math.random() * (rows - 1))
        : 1 + Math.floor(Math.random() * (cols - 1));
      pulses.push({ axis, line, t: 0, speed: 0.0012 + Math.random() * 0.0018, alpha: 0.45 + Math.random() * 0.35 });
    };

    const tick = () => {
      time++;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (time % 90 === 0 && pulses.length < 10) spawnPulse();

      const cols = Math.floor(W / SPACING);
      const rows = Math.floor(H / SPACING);

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(170,195,235,0.07)";
      for (let c = 1; c < cols; c++) {
        ctx.beginPath(); ctx.moveTo(c * SPACING, 0); ctx.lineTo(c * SPACING, H); ctx.stroke();
      }
      for (let r = 1; r < rows; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * SPACING); ctx.lineTo(W, r * SPACING); ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t > 1) { pulses.splice(i, 1); continue; }
        const brightness = Math.sin(p.t * Math.PI);
        const t0 = Math.max(0, p.t - 0.09);

        if (p.axis === "h") {
          const y = p.line * SPACING;
          const px = p.t * W;
          const tx = t0 * W;
          const tg = ctx.createLinearGradient(tx, y, px, y);
          tg.addColorStop(0, "rgba(170,195,235,0)");
          tg.addColorStop(1, `rgba(150,180,235,${brightness * p.alpha * 0.55})`);
          ctx.beginPath(); ctx.moveTo(tx, y); ctx.lineTo(px, y);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5; ctx.stroke();
          const gr = ctx.createRadialGradient(px, y, 0, px, y, 14);
          gr.addColorStop(0, `rgba(200,220,255,${brightness * p.alpha * 0.7})`);
          gr.addColorStop(1, "rgba(170,195,235,0)");
          ctx.beginPath(); ctx.arc(px, y, 14, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        } else {
          const x = p.line * SPACING;
          const py2 = p.t * H;
          const ty = t0 * H;
          const tg = ctx.createLinearGradient(x, ty, x, py2);
          tg.addColorStop(0, "rgba(170,195,235,0)");
          tg.addColorStop(1, `rgba(150,180,235,${brightness * p.alpha * 0.55})`);
          ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x, py2);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5; ctx.stroke();
          const gr = ctx.createRadialGradient(x, py2, 0, x, py2, 14);
          gr.addColorStop(0, `rgba(200,220,255,${brightness * p.alpha * 0.7})`);
          gr.addColorStop(1, "rgba(170,195,235,0)");
          ctx.beginPath(); ctx.arc(x, py2, 14, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    init();
    window.addEventListener("resize", init);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", init); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}


// ─── Shared glass card style (dark) ───────────────────────────────────────────
const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(14px) saturate(1.4)",
  WebkitBackdropFilter: "blur(14px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
};

const ADAPT_FONTS = [
  { font: "'DM Sans', sans-serif",        style: "italic",  weight: 700, tracking: "-0.04em" },
  { font: "Georgia, serif",               style: "italic",  weight: 400, tracking: "-0.01em" },
  { font: "'Courier New', monospace",     style: "normal",  weight: 700, tracking: "0.04em"  },
  { font: "Impact, 'Arial Narrow', sans-serif", style: "normal", weight: 900, tracking: "0.01em" },
  { font: "'Brush Script MT', cursive",   style: "italic",  weight: 400, tracking: "0.01em"  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [graphicReady, setGraphicReady] = useState(false);
  const [fontIdx, setFontIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setGraphicReady(true); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setFontIdx((i) => (i + 1) % ADAPT_FONTS.length);
        setFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Cursor spotlight — direct DOM update to avoid re-renders
  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    const handleMouse = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      style={{
        background: "#0A0C0F",
        color: "#EAEAEA",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(170,200,240,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-600px, -600px)",
          transition: "transform 0.08s ease-out",
          willChange: "transform",
        }}
      />

      <PlexusBg />

      {/* ── Hero (full-bleed) ── */}
      <section
        className="hero-card"
        style={{
          background: "#0A0C0F",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
          {/* Full-bleed Spline scene */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
            }}
          >
            {graphicReady ? <Spline scene={SPLINE_SCENE} /> : null}
          </div>

          {/* Grid overlay — same color/opacity as body PlexusBg so it matches exactly */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(to right, rgba(170,195,235,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,195,235,0.07) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />

          {/* Bottom fade across the whole hero — solid base hides watermark, soft fade unifies the edge */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 180,
              background:
                "linear-gradient(to top, #0A0C0F 0%, #0A0C0F 38%, rgba(10,12,15,0.6) 65%, rgba(10,12,15,0) 100%)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />

          {/* Subtle left-side gradient for text legibility */}
      </section>

      {/* ── The Problem ── */}
      <section style={{ padding: "96px 40px", position: "relative" }}>
        {/* Top fade mirrors the bottom of the Spline hero for a seamless transition */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 180,
            background:
              "linear-gradient(to bottom, #0A0C0F 0%, #0A0C0F 38%, rgba(10,12,15,0.6) 65%, rgba(10,12,15,0) 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Centered header ── */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)", marginBottom: "20px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block" }} />
              The Problem
            </div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
            }}>
              Growing organizations outgrow their tools. Fast.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: "580px", margin: "0 auto" }}>
              The platforms that worked at 20 people break at 100. Data lives in disconnected systems. Teams work around tools instead of with them. Leadership makes decisions with incomplete information.
            </p>
          </div>

          {/* ── Video + cards, equal height ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "stretch" }}>

            {/* Video — fills the full height of the cards column */}
            <div style={{ borderRadius: "20px", overflow: "hidden", minHeight: 0 }}>
              <video
                autoPlay loop muted playsInline
                style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
              >
                <source src="/aris-demo-silent.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                {
                  problem: "Data silos across departments",
                  detail: "Finance, operations, and project teams each have their own tools — and none of them talk to each other. Getting a full picture requires manual aggregation every time.",
                },
                {
                  problem: "No queryable intelligence layer",
                  detail: "Years of documents, contracts, records, and history — all locked in folders. When someone needs an answer, they dig. Every time.",
                },
                {
                  problem: "Access control is an afterthought",
                  detail: "Shared drives with no structure. The wrong people see sensitive financials. The right people can't find what they need. Permissions are a patchwork.",
                },
                {
                  problem: "Generic platforms slow you down",
                  detail: "Off-the-shelf tools force your team to adapt workflows to the software. Every workaround is a tax on productivity — and a gap in your data.",
                },
                {
                  problem: "Compliance exposure",
                  detail: "Sensitive documents sitting in unencrypted shared folders. No audit trail. No enforcement. As organizations scale, this becomes a material risk.",
                },
              ].map((item) => (
                <div key={item.problem} style={{
                  padding: "28px 32px", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px",
                  transition: "border-color 0.2s, box-shadow 0.2s", flex: 1,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <h4 style={{ fontWeight: 600, fontSize: "0.975rem", marginBottom: "8px", color: "#EAEAEA" }}>{item.problem}</h4>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Deploy ── */}
      <section style={{ padding: "60px 24px", position: "relative" }}>
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "80px 60px",
          position: "relative",
        }}>
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
                The Full Stack
              </div>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                letterSpacing: "-0.03em", color: "#fff", marginBottom: "16px",
              }}>One coherent operational platform.</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto" }}>
                Each system works independently. At scale, they&apos;re deployed as an integrated platform — with a shared intelligence layer across the entire operation.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "12px" }} className="stack-grid">
              {[
                { name: "Forge", sub: "Fully Custom", desc: "For operations that do not fit any mold. Forge is architected from the ground up around your structure, workflows, terminology, and reporting logic.", accent: "#7756C9", accentBg: "rgba(119,86,201,0.08)", accentBorder: "rgba(119,86,201,0.2)" },
                { name: "OpsCore", sub: "Command Center", desc: "Cross-department dashboards, workflow automation, and reporting. The operational backbone for multi-team organizations.", accent: "#00C87A", accentBg: "rgba(0,200,122,0.08)", accentBorder: "rgba(0,200,122,0.2)" },
                { name: "ProjectOps", sub: "Project Management", desc: "Full project lifecycle management — budgets, milestones, vendor tracking, and profitability across every active engagement.", accent: "#5B9EC9", accentBg: "rgba(91,158,201,0.08)", accentBorder: "rgba(91,158,201,0.2)" },
                { name: "FieldOps", sub: "Field Operations", desc: "Scheduling, dispatch, job management, and invoicing for distributed teams operating across multiple locations or territories.", accent: "#4BAD8A", accentBg: "rgba(75,173,138,0.08)", accentBorder: "rgba(75,173,138,0.2)" },
              ].map(s => (
                <div key={s.name} style={{
                  padding: "32px", background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${s.accentBorder}`, borderRadius: "16px",
                }}>
                  <span style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: "100px",
                    background: s.accentBg, border: `1px solid ${s.accentBorder}`,
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: s.accent, marginBottom: "16px",
                  }}>{s.sub}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "#fff", marginBottom: "10px" }}>{s.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="stack-grid-2">
              {[
                { name: "Vault", sub: "Encrypted Document Intelligence", desc: "Every document across the organization — encrypted, indexed, and queryable. Drop a file, get an answer. Role-controlled access at every level.", accent: "#8B9FD4", accentBg: "rgba(139,159,212,0.08)", accentBorder: "rgba(139,159,212,0.2)" },
                { name: "A.R.I.S", sub: "Adaptive Response Intelligence System", desc: "The AI layer that ties it all together. Ask anything across every connected system and vault — and get an answer in plain English, instantly.", accent: "#00C87A", accentBg: "rgba(0,200,122,0.08)", accentBorder: "rgba(0,200,122,0.2)" },
              ].map(s => (
                <div key={s.name} style={{
                  padding: "32px", background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${s.accentBorder}`, borderRadius: "16px",
                  display: "flex", flexDirection: "column", gap: "10px",
                }}>
                  <span style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: "100px",
                    background: s.accentBg, border: `1px solid ${s.accentBorder}`,
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: s.accent, alignSelf: "flex-start",
                  }}>{s.sub}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>{s.name}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Security ── */}
      <section style={{ padding: "96px 40px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)", marginBottom: "20px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block" }} />
              Security & Compliance
            </div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px",
            }}>Security isn&apos;t a feature. It&apos;s the foundation.</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Larger organizations face real compliance exposure. Every system we build is designed with encryption, access control, and auditability from day one — not bolted on later.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="sec-grid">
            {[
              {
                title: "Encryption at Rest & in Transit",
                desc: "All data encrypted end-to-end. Files, records, and documents are never exposed in plain text — whether stored or moving between systems.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#1E3A8A" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="#1E3A8A"/></svg>,
                accent: "#1E3A8A", accentBg: "#EEF2FF", accentBorder: "#C7D2FE",
              },
              {
                title: "Role-Based Access Control",
                desc: "Granular permissions enforced at the system level. Every team member sees exactly what they should — nothing more. Enforced automatically, no manual management.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v8c0 5 4 8.5 9 9.5 5-1 9-4.5 9-9.5V7L12 2z" stroke="#236B4E" strokeWidth="1.5" strokeLinejoin="round"/><polyline points="8,12 11,15 16,10" stroke="#236B4E" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/></svg>,
                accent: "#236B4E", accentBg: "#EEF7F3", accentBorder: "#C4E0D5",
              },
              {
                title: "Isolated Data Environments",
                desc: "Each business unit, team, or partner operates within its own data environment. No cross-contamination. No accidental exposure. Clean separation by design.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="9" height="9" rx="1.5" stroke="#6D4FBB" strokeWidth="1.5"/><rect x="13" y="3" width="9" height="9" rx="1.5" stroke="#6D4FBB" strokeWidth="1.5" opacity="0.45"/><rect x="2" y="14" width="9" height="9" rx="1.5" stroke="#6D4FBB" strokeWidth="1.5" opacity="0.45"/><rect x="13" y="14" width="9" height="9" rx="1.5" stroke="#6D4FBB" strokeWidth="1.5"/></svg>,
                accent: "#6D4FBB", accentBg: "#F3F0FC", accentBorder: "#D9D0F5",
              },
              {
                title: "Your Data Stays Yours",
                desc: "We don't aggregate, sell, or train on your data. Everything lives in your infrastructure. You own it fully — before, during, and after the engagement.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="#3d6e8a" strokeWidth="1.5"/><path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#3d6e8a" strokeWidth="1.5"/><path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="#3d6e8a" strokeWidth="1.5"/></svg>,
                accent: "#3d6e8a", accentBg: "#eef3f7", accentBorder: "#b0c8d8",
              },
              {
                title: "Audit-Ready Architecture",
                desc: "Every action in the system is logged. Who accessed what, when, and what changed. When compliance questions arise, the answers are already there.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#00C87A" strokeWidth="1.5"/><line x1="8" y1="7" x2="16" y2="7" stroke="#00C87A" strokeWidth="1.3" strokeLinecap="round"/><line x1="8" y1="11" x2="16" y2="11" stroke="#00C87A" strokeWidth="1.3" strokeLinecap="round"/><line x1="8" y1="15" x2="12" y2="15" stroke="#00C87A" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                accent: "#00C87A", accentBg: "#e6f9f2", accentBorder: "#a0e8cb",
              },
              {
                title: "No Generic AI Exposure",
                desc: "A.R.I.S queries only your data. It doesn't pass documents to public AI models or use your information to train anything external. Intelligent — and contained.",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#B45309" strokeWidth="1.5"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/></svg>,
                accent: "#B45309", accentBg: "#FEF3C7", accentBorder: "#FDE68A",
              },
            ].map(item => (
              <div key={item.title} style={{
                padding: "32px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.accentBorder; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 48, height: 48, background: item.accentBg,
                  border: `1px solid ${item.accentBorder}`, borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "0.975rem", marginBottom: "10px", color: "#EAEAEA" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Engage ── */}
      <section style={{ padding: "0 24px" }}>
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px",
          padding: "80px 60px",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }} className="engage-col">
              <div style={{ position: "sticky", top: "88px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "5px 14px", borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
                  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)", marginBottom: "20px",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block" }} />
                  How We Engage
                </div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
                }}>We map before we build. Always.</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  Enterprise engagements start with a structured discovery phase. We don&apos;t propose solutions before we understand the problem — and we don&apos;t build until we do.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { num: "01", title: "Operational Discovery", desc: "We spend time with your team understanding how your business actually runs — the workflows, the workarounds, the data flows, and the decision-making structure. This informs everything." },
                  { num: "02", title: "System Architecture", desc: "We design the full system architecture before a single line is written — data models, access structure, integration points, and the intelligence layer. You review and approve." },
                  { num: "03", title: "Phased Build & Deployment", desc: "We build in phases, starting with the highest-impact systems. Each phase is tested, trained on, and live before the next begins. No big-bang launches." },
                  { num: "04", title: "Training & Handoff", desc: "Every system comes with structured training and documentation. Your team owns it. We don't create dependency — we create capability." },
                  { num: "05", title: "Ongoing Support", desc: "We remain available after deployment. As your operation evolves, the system evolves with it. Retainer-based support available for enterprise clients." },
                ].map(step => (
                  <div key={step.num} style={{
                    display: "grid", gridTemplateColumns: "64px 1fr",
                    gap: "32px", padding: "32px 36px",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px", transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"}
                  >
                    <span style={{
                      fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em",
                      color: "#DDDBD7", lineHeight: 1,
                    }}>{step.num}</span>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: "0.975rem", marginBottom: "8px", color: "#EAEAEA" }}>{step.title}</h4>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section style={{ padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 56px" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "14px",
            }}>Who this is built for.</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Any organization that has outgrown generic software and needs something that actually matches how they operate.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="who-grid">
            {[
              { title: "Multi-Location Operators", desc: "Organizations running operations across multiple locations, divisions, or territories — who need visibility and coordination across the entire footprint." },
              { title: "Professional Services Firms", desc: "Firms managing client engagements, project budgets, and team utilization — where every job is unique and the data needs to follow it." },
              { title: "Franchise Systems", desc: "Franchise brands that need consistency across locations while preserving flexibility — with a centralized intelligence layer the corporate team can query." },
              { title: "Logistics & Distribution", desc: "Operations with complex routing, vendor relationships, and real-time coordination needs that standard platforms can't model." },
              { title: "Healthcare & Managed Services", desc: "Organizations with compliance requirements, role-based access mandates, and document-heavy workflows that demand auditability at every level." },
              { title: "Growing Mid-Market Businesses", desc: "Companies that have scaled past their original tools and need a system that can grow with them — built once, expanded as the business demands." },
            ].map(item => (
              <div key={item.title} style={{
                padding: "36px", background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C87A", marginBottom: "20px" }} />
                <h3 style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.015em", marginBottom: "10px", color: "#EAEAEA" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "24px 24px 80px" }}>
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          padding: "80px 60px", textAlign: "center",
          position: "relative",
        }}>
          <div style={{ position: "relative", zIndex: 2, maxWidth: "580px", margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.03em", color: "#fff", marginBottom: "18px",
            }}>Ready to talk about your operation?</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, marginBottom: "36px", fontSize: "1rem" }}>
              Enterprise engagements start with a conversation. No slide deck, no sales process — just an honest discussion about what you&apos;re running and whether we&apos;re the right fit.
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 36px", borderRadius: "100px",
              background: "#00C87A", color: "#0a1a12",
              fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
            }}>
              Schedule a conversation →
            </Link>
          </div>
        </div>
      </section>


      <style jsx>{`
        .hero-card {
          grid-template-columns: 1fr 1.08fr;
        }

        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .two-col > div:first-child { position: static !important; }
          .stack-grid { grid-template-columns: 1fr !important; }
          .stack-grid-2 { grid-template-columns: 1fr !important; }
          .sec-grid { grid-template-columns: 1fr !important; }
          .engage-col { grid-template-columns: 1fr !important; }
          .engage-col > div:first-child { position: static !important; }
          .who-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 1080px) {
          .hero-card {
            grid-template-columns: 1fr !important;
          }

          .hero-card > div:first-child {
            padding: 58px 28px 10px !important;
          }

          .hero-card > div:last-child {
            min-height: 540px;
          }

          .problem-grid {
            grid-template-columns: 1fr !important;
          }

          .solution-grid {
            grid-template-columns: 1fr !important;
          }

          .process-grid {
            grid-template-columns: 1fr !important;
          }

          .process-connector {
            display: none;
          }

          .sys-row {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            padding: 24px !important;
          }
        }

        @media (max-width: 720px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .hero-card > div:last-child {
            min-height: 420px;
          }
        }
      `}</style>
    </div>
  );
}
