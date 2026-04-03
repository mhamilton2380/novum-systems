"use client";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

// ── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-section");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Full-page plexus background ──────────────────────────────────────────────
function PlexusBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight || window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const count = Math.floor((canvas.width * canvas.height) / 28000);
      nodesRef.current = Array.from({ length: Math.min(count, 55) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const DIST = 160;

    const tick = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DIST) {
            const alpha = (1 - dist / DIST) * 0.09;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(58,85,133,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(58,85,133,0.18)";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ── Hero viz — calm plexus on dark card ──────────────────────────────────────
function HeroViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; label: string }[]>([]);
  const tRef = useRef(0);

  const LABELS = ["Accounting", "Reporting", "Scheduling", "Workflows", "Tasks", "Documents", "Field Ops", "Integrations"];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tRef.current += 0.008; // slow
    const t = tRef.current;

    ctx.clearRect(0, 0, W, H);

    // Subtle dot grid
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let x = 0; x < W; x += 30) for (let y = 0; y < H; y += 30) { ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill(); }

    // Faint grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.018)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Fixed node positions (no jitter — calm layout)
    const cx = W * 0.5;
    const cy = H * 0.52;
    const nodePositions: [string, number, number][] = [
      ["Accounting",   W * 0.08, H * 0.22],
      ["Reporting",    W * 0.08, H * 0.42],
      ["Scheduling",   W * 0.08, H * 0.62],
      ["Workflows",    W * 0.08, H * 0.80],
      ["Tasks",        W * 0.92, H * 0.22],
      ["Documents",    W * 0.92, H * 0.42],
      ["Field Ops",    W * 0.92, H * 0.62],
      ["Integrations", W * 0.92, H * 0.80],
    ];

    // Draw static connection lines
    nodePositions.forEach(([, nx, ny]) => {
      ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(cx, cy);
      ctx.strokeStyle = "rgba(100,130,200,0.1)";
      ctx.lineWidth = 0.8; ctx.stroke();
    });

    // One slow pulse travels per line, staggered
    nodePositions.forEach(([label, nx, ny], i) => {
      // Each line has its own slow pulse, offset by index, never resets abruptly
      const period = 5.5; // seconds per full traverse
      const phase = ((t / period) + i / nodePositions.length) % 1;

      const px = nx + (cx - nx) * phase;
      const py = ny + (cy - ny) * phase;
      const p0 = Math.max(0, phase - 0.08);
      const sx = nx + (cx - nx) * p0;
      const sy = ny + (cy - ny) * p0;

      const brightness = Math.sin(phase * Math.PI) * 0.85 + 0.15;

      // Glow streak
      const grad = ctx.createLinearGradient(sx, sy, px, py);
      grad.addColorStop(0, "rgba(100,160,255,0)");
      grad.addColorStop(1, `rgba(170,210,255,${brightness * 0.75})`);
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(px, py);
      ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();

      // Glow dot
      const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
      g.addColorStop(0, `rgba(160,205,255,${brightness * 0.85})`);
      g.addColorStop(1, "rgba(100,155,240,0)");
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();

      // Node pill
      ctx.font = "400 11px 'DM Sans', sans-serif";
      ctx.textBaseline = "middle";
      const tw = ctx.measureText(label).width;
      const pw = tw + 20; const ph = 24;
      const px2 = nx < W * 0.5 ? nx : nx - pw;
      const py2 = ny - ph / 2;

      ctx.fillStyle = "rgba(255,255,255,0.055)";
      ctx.strokeStyle = "rgba(255,255,255,0.13)";
      ctx.lineWidth = 0.7;
      pillRect(ctx, px2, py2, pw, ph, 6); ctx.fill(); ctx.stroke();

      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillText(label, px2 + 9, ny);

      // Node dot
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath(); ctx.arc(nx < W * 0.5 ? px2 - 1 : px2 + pw + 1, ny, 2.5, 0, Math.PI * 2); ctx.fill();
    });

    // Center hub glow
    const hub = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
    hub.addColorStop(0, "rgba(80,110,200,0.16)");
    hub.addColorStop(1, "rgba(80,110,200,0)");
    ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.fillStyle = hub; ctx.fill();

    // Hub ring pulse
    const ringScale = 1 + Math.sin(t * 1.2) * 0.06;
    ctx.beginPath(); ctx.arc(cx, cy, 18 * ringScale, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(100,140,240,${0.25 + Math.sin(t * 1.2) * 0.1})`;
    ctx.lineWidth = 1; ctx.stroke();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, [draw]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}

function pillRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

// ── Phone mockup ─────────────────────────────────────────────────────────────
function Phone() {
  const rows = [
    { label: "OpsCore",    sub: "Command Center",  accent: true  },
    { label: "FieldOps",   sub: "Crew Dispatch",   accent: false },
    { label: "ProjectOps", sub: "Budget Tracking", accent: false },
    { label: "Forge",      sub: "Custom Build",    accent: false },
  ];
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: "translate(-50%, -42%)",
      width: 148, zIndex: 3,
      filter: "drop-shadow(0 24px 56px rgba(0,0,0,0.55))",
    }}>
      <div style={{ background: "#0C0E13", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: "26px", padding: "11px 8px 15px" }}>
        <div style={{ width: 36, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, margin: "0 auto 9px" }} />
        <div style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", textAlign: "center", marginBottom: 8 }}>Novum Systems</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ padding: "7px 8px", background: r.accent ? "rgba(58,85,133,0.4)" : "rgba(255,255,255,0.04)", border: `1px solid ${r.accent ? "rgba(100,145,240,0.45)" : "rgba(255,255,255,0.07)"}`, borderRadius: 7 }}>
              <div style={{ fontSize: "0.58rem", fontWeight: 600, color: r.accent ? "rgba(170,200,255,0.95)" : "rgba(255,255,255,0.72)", marginBottom: 2 }}>{r.label}</div>
              <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.27)" }}>{r.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ width: 32, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, margin: "9px auto 0" }} />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--white)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>

      {/* Full-page plexus background */}
      <PlexusBg />

      {/* All content sits above the background */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Hero ── */}
        <section style={{ padding: "76px 24px 0" }}>
          <div style={{
            background: "var(--hero)", borderRadius: "20px",
            minHeight: "580px", position: "relative", overflow: "hidden",
            display: "grid", gridTemplateColumns: "1fr 1fr",
          }} className="hero-card">
            <div style={{ position: "relative", zIndex: 4, padding: "68px 0 68px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="pill-tag" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", marginBottom: 28, alignSelf: "flex-start" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
                Operational Software for Growing Businesses
              </div>
              <h1 className="font-serif" style={{ fontSize: "clamp(2.6rem, 3.8vw, 4.4rem)", lineHeight: 1.04, letterSpacing: "-0.025em", color: "#fff", marginBottom: 22 }}>
                Software that{" "}
                <em style={{ fontStyle: "italic", color: "rgba(190,210,255,0.85)" }}>adapts</em>
                <br />to your business.
              </h1>
              <p style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
                We replace rigid, expensive software with systems built around how your business actually operates — not the other way around.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/contact" style={{ padding: "13px 28px", borderRadius: "100px", background: "#F2EDD8", color: "#1A1A1A", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "transform 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
                >
                  Book a Discovery Call
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <Link href="/systems" style={{ padding: "13px 28px", borderRadius: "100px", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.65)", background: "transparent", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}>
                  See Our Systems
                </Link>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <HeroViz />
              <Phone />
            </div>
          </div>
        </section>

        {/* ── Problem ── */}
        <section style={{ padding: "100px 48px" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="problem-grid">
              <div className="fade-section">
                <div className="pill-tag" style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", color: "var(--text-soft)", marginBottom: 28 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                  The Problem
                </div>
                <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "1.15", letterSpacing: "-0.02em", marginBottom: 24 }}>
                  Your operations are unique.
                  <br /><span style={{ color: "var(--text-soft)", fontStyle: "italic" }}>Your software isn&apos;t.</span>
                </h2>
                <p style={{ color: "var(--text-soft)", lineHeight: "1.85", fontSize: "0.97rem", marginBottom: 16 }}>
                  Off-the-shelf platforms were designed for the average business — which means they fit nobody perfectly. You end up bending your workflows to match your software, not the other way around.
                </p>
                <p style={{ color: "var(--text-soft)", lineHeight: "1.85", fontSize: "0.97rem" }}>
                  The result? Disconnected tools, manual workarounds, and a team spending more time fighting software than doing actual work.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="fade-section">
                {[
                  "Generic platforms that force you to work around them",
                  "Expensive enterprise tools built for companies 10x your size",
                  "Disconnected tools requiring manual data entry between systems",
                  "No visibility into your actual operations across teams",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 24px", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(192,57,43,0.18)", borderRadius: 14, transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <span style={{ color: "var(--red)", fontSize: "0.85rem", marginTop: 1, fontWeight: 600, flexShrink: 0 }}>✕</span>
                    <p style={{ color: "var(--text-mid)", fontSize: "0.9rem", lineHeight: "1.65", margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Solution ── */}
        <section style={{ padding: "0 24px" }}>
          <div style={{ background: "var(--hero)", borderRadius: 20, padding: "80px 60px", position: "relative", overflow: "hidden" }} className="fade-section">
            <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 64px" }}>
                <div className="pill-tag" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", marginBottom: 24 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
                  The Novum Approach
                </div>
                <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "1.15", letterSpacing: "-0.02em", marginBottom: 18, color: "#fff" }}>
                  Systems built around how you actually run.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.8", fontSize: "0.97rem" }}>
                  We start with your operations — not a template. Every system we deliver is structured around your workflows, your team, and your business model.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="solution-grid">
                {[
                  { title: "Mapped to your operations", desc: "We document how your business works before writing a single line of configuration. The system reflects your reality, not a template.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 3H5C3.9 3 3 3.9 3 5v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" /><path d="M19 3h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" opacity="0.5" /><path d="M9 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" opacity="0.5" /><path d="M19 13h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" /></svg> },
                  { title: "Fast to deploy, built to last", desc: "Our structured approach means you get a working system quickly — built on foundations that scale as your business grows.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" /><path d="M12 7v5l3 3" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" strokeLinecap="round" /></svg> },
                  { title: "One system, not many tools", desc: "We consolidate your operations into a coherent system — eliminating the duct-tape stack of disconnected software.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" strokeLinejoin="round" /><path d="M2 17l10 5 10-5" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" /><path d="M2 12l10 5 10-5" stroke="rgba(160,185,255,0.75)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" /></svg> },
                ].map((item, i) => (
                  <div key={i} style={{ padding: 32, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, transition: "border-color 0.25s, background 0.25s, transform 0.25s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,145,240,0.4)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.07)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>{item.icon}</div>
                    <h3 className="font-serif" style={{ fontSize: "1.15rem", marginBottom: 12, letterSpacing: "-0.01em", color: "#fff" }}>{item.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.91rem", lineHeight: "1.75", margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Systems Overview ── */}
        <section style={{ padding: "100px 48px" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }} className="fade-section">
              <div>
                <div className="pill-tag" style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", color: "var(--text-soft)", marginBottom: 18 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                  Our Systems
                </div>
                <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>
                  Every operation covered.<br />One platform.
                </h2>
              </div>
              <Link href="/systems" className="btn-outline">View All Systems →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { name: "Forge", badge: "Fully Custom", bc: "#6D4FBB", bb: "rgba(111,79,187,0.08)", bbd: "rgba(111,79,187,0.2)", desc: "For operations that don't fit any mold. Forge is a completely custom-built system designed from the ground up around your unique structure, terminology, and workflows. No templates, no constraints — just your system, architected exactly the way your business runs.", features: ["Full operational architecture from scratch", "Custom data model & integrations", "Proprietary workflow engine", "White-glove build & deployment"] },
                { name: "OpsCore", badge: "Operations Hub", bc: "var(--accent)", bb: "rgba(58,85,133,0.07)", bbd: "rgba(58,85,133,0.2)", desc: "Your entire operation unified in one intelligent command center. OpsCore uses AI to generate tasks from emails, texts, and documents automatically. Your team communicates via built-in chat, shares notes, tracks projects, and monitors budgets — all in one place. And it connects to the tools you already use: accounting platforms like QuickBooks, CRMs like Salesforce or HubSpot, project tools like Monday or Asana, communication tools like Gmail or Outlook, ERP systems, and more. One platform. Every tool. Zero switching.", features: ["AI task generation from email/text/PDF", "Built-in team chat & shared notes", "Project-filtered calendar & tasks", "QuickBooks, Salesforce, HubSpot & more", "Custom role dashboards", "Workflow automation"] },
                { name: "FieldOps", badge: "Field Service", bc: "#236B4E", bb: "rgba(35,107,78,0.07)", bbd: "rgba(35,107,78,0.2)", desc: "End-to-end field service management built around your crews, territories, and job types. From the moment a job is booked to the final invoice — scheduling, dispatch, field access, photo documentation, and automated billing all run through one connected system.", features: ["Visual scheduling & dispatch", "Mobile field access & job tracking", "Automated invoicing on completion", "Customer records & property history"] },
                { name: "ProjectOps", badge: "Project-Based", bc: "#2C4E8A", bb: "rgba(44,78,138,0.07)", bbd: "rgba(44,78,138,0.2)", desc: "Full project lifecycle management from bid to close. Track live budget vs. actuals, manage vendors and subs, monitor milestone completion, and report on profitability across every active project — all in one system built around your workflow.", features: ["Live budget-vs-actual tracking", "Vendor & sub management", "Milestone & Gantt-style timelines", "Document & RFI management", "Profitability reporting"] },
              ].map((sys, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "240px 1fr auto", gap: 48, alignItems: "center", padding: "34px 38px", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(232,230,225,0.8)", borderRadius: 16, transition: "border-color 0.2s, box-shadow 0.2s, transform 0.25s", cursor: "pointer" }}
                  className="sys-row fade-section"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(58,85,133,0.3)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,230,225,0.8)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div>
                    <h3 className="font-serif" style={{ fontSize: "1.7rem", letterSpacing: "-0.02em", marginBottom: 10, color: "var(--text)" }}>{sys.name}</h3>
                    <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 12px", background: sys.bb, border: `1px solid ${sys.bbd}`, borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", color: sys.bc }}>{sys.badge}</span>
                  </div>
                  <div>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: "1.75", marginBottom: 14 }}>{sys.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {sys.features.map(f => <span key={f} style={{ padding: "3px 12px", background: "rgba(247,246,243,0.8)", border: "1px solid var(--border)", borderRadius: 6, fontSize: "0.77rem", color: "var(--text-soft)" }}>{f}</span>)}
                    </div>
                  </div>
                  <Link href="/systems" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-soft)", textDecoration: "none", flexShrink: 0, transition: "border-color 0.2s, color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-soft)"; }}
                  >→</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(232,230,225,0.8)", borderRadius: 20, padding: "72px 60px", maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }} className="fade-section">
              <div className="pill-tag" style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.7)", color: "var(--text-soft)", marginBottom: 20 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                How It Works
              </div>
              <h2 className="font-serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: "1.1", letterSpacing: "-0.02em" }}>
                From discovery to deployed — in three steps.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative" }} className="process-grid">
              <div style={{ position: "absolute", top: 48, left: "calc(16.67% + 36px)", right: "calc(16.67% + 36px)", height: 1, background: "var(--border)" }} className="process-connector" />
              {[
                { step: "01", title: "Discovery", desc: "We spend time with your team to understand every part of how your business operates — the workflows, the friction points, the manual workarounds." },
                { step: "02", title: "System Design", desc: "We design a system architecture around your operations. You see exactly what will be built before we build it — no surprises." },
                { step: "03", title: "Build & Deploy", desc: "We configure, build, and launch your system with training and handoff included. You operate. We support." },
              ].map((step, i) => (
                <div key={i} style={{ textAlign: "center", padding: "0 20px" }} className="fade-section">
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", position: "relative", zIndex: 1, transition: "border-color 0.25s, transform 0.25s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                  >
                    <span className="font-serif" style={{ fontSize: "1.4rem", color: "var(--accent)", letterSpacing: "-0.02em" }}>{step.step}</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: "1.3rem", marginBottom: 14, letterSpacing: "-0.01em", color: "var(--text)" }}>{step.title}</h3>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: "1.8" }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section style={{ padding: "40px 24px 80px", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "72px 64px", background: "var(--hero)", borderRadius: 24, position: "relative", overflow: "hidden" }} className="fade-section">
            <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="pill-tag" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block" }} />
                Ready to Build
              </div>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: "1.1", letterSpacing: "-0.025em", marginBottom: 20, color: "#FFFFFF" }}>
                Stop adapting to your software.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: "1.8", marginBottom: 44 }}>
                Book a discovery call and let&apos;s map out what an operational system built for your business would look like.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact" style={{ padding: "15px 32px", borderRadius: "100px", background: "#FFFFFF", color: "var(--text)", fontSize: "0.92rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "transform 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
                >
                  Book a Discovery Call →
                </Link>
                <Link href="/systems" style={{ padding: "15px 28px", borderRadius: "100px", border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", background: "transparent", fontSize: "0.92rem", fontWeight: 500, textDecoration: "none" }}>
                  Explore Systems
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>{/* end content wrapper */}

      <style jsx>{`
        .hero-card { grid-template-columns: 1fr 1fr; }
        @media (max-width: 960px) {
          .hero-card { grid-template-columns: 1fr !important; }
          .hero-card > div:last-child { min-height: 320px; }
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
