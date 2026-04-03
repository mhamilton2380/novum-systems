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

// ── Plexus background component ─────────────────────────────────────────────
function PlexusBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<{x:number;y:number;vx:number;vy:number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const DIST = 155;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodesRef.current = [];
      const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 28000));
      for (let i = 0; i < count; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
        });
      }
    };

    const tick = () => {
      const nodes = nodesRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            const a = (1 - d / DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(58,85,133,${a})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(58,85,133,0.15)";
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    init();
    window.addEventListener("resize", init);
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", init); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ── Hero canvas viz ──────────────────────────────────────────────────────────
function HeroViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    tRef.current += 0.006;
    const t = tRef.current;

    ctx.clearRect(0, 0, W, H);

    // Subtle dot grid
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let x = 0; x < W; x += 32) for (let y = 0; y < H; y += 32) {
      ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI * 2); ctx.fill();
    }

    // Faint grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.016)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 96) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 96) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // Phone dimensions (matches the Phone component)
    const phoneW = 220;
    const phoneH = 340;
    const phoneCx = W * 0.5;
    const phoneCy = H * 0.5;
    const phoneLeft = phoneCx - phoneW / 2;
    const phoneRight = phoneCx + phoneW / 2;
    const phoneTop = phoneCy - phoneH / 2;
    const phoneBottom = phoneCy + phoneH / 2;

    // Node definitions: label, xFrac, yFrac
    // Lines connect from node to NEAREST EDGE of phone, not center
    const nodeDefs: [string, number, number][] = [
      ["Email",        0.06, 0.20],
      ["Calendar",     0.06, 0.38],
      ["Reporting",    0.06, 0.56],
      ["Workflows",    0.06, 0.74],
      ["Tasks",        0.94, 0.20],
      ["Team Chat",    0.94, 0.38],
      ["Field Ops",    0.94, 0.56],
      ["Integrations", 0.94, 0.74],
    ];

    nodeDefs.forEach(([label, xf, yf], i) => {
      const nx = xf * W;
      const ny = yf * H;
      const isLeft = xf < 0.5;

      // Nearest connection point on phone edge
      const connX = isLeft ? phoneLeft : phoneRight;
      const connY = Math.min(Math.max(ny, phoneTop), phoneBottom);

      // Slow pulse — 6s period, staggered
      const period = 6.0;
      const phase = ((t / period) + i / nodeDefs.length) % 1;
      const px = nx + (connX - nx) * phase;
      const py = ny + (connY - ny) * phase;
      const p0 = Math.max(0, phase - 0.09);
      const sx = nx + (connX - nx) * p0;
      const sy = ny + (connY - ny) * p0;

      // Static base line
      ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(connX, connY);
      ctx.strokeStyle = "rgba(100,130,200,0.1)"; ctx.lineWidth = 0.8; ctx.stroke();

      // Glow streak
      const brightness = Math.sin(phase * Math.PI) * 0.85 + 0.15;
      const grad = ctx.createLinearGradient(sx, sy, px, py);
      grad.addColorStop(0, "rgba(100,160,255,0)");
      grad.addColorStop(1, `rgba(170,210,255,${brightness * 0.8})`);
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(px, py);
      ctx.strokeStyle = grad; ctx.lineWidth = 1.6; ctx.stroke();

      // Glow dot at pulse head
      const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
      g.addColorStop(0, `rgba(160,205,255,${brightness * 0.9})`);
      g.addColorStop(1, "rgba(100,155,240,0)");
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();

      // Node pill
      ctx.font = "400 11px 'DM Sans', sans-serif";
      ctx.textBaseline = "middle";
      const tw = ctx.measureText(label).width;
      const pw = tw + 20; const ph = 24;
      const px2 = isLeft ? nx : nx - pw;
      const py2 = ny - ph / 2;

      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 0.7;
      pillRect(ctx, px2, py2, pw, ph, 6); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(label, px2 + 9, ny);
    });

    // Connection point dots on phone edges
    nodeDefs.forEach(([, xf, yf]) => {
      const ny = yf * H;
      const isLeft = xf < 0.5;
      const connX = isLeft ? phoneLeft : phoneRight;
      const connY = Math.min(Math.max(ny, phoneTop), phoneBottom);
      ctx.beginPath(); ctx.arc(connX, connY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(100,140,220,0.4)"; ctx.fill();
    });

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

// ── High-tech dashboard mockup ───────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: "translate(-50%, -50%)",
      width: 220, zIndex: 3,
      filter: "drop-shadow(0 24px 60px rgba(0,0,0,0.6))",
    }}>
      {/* Device shell */}
      <div style={{
        background: "linear-gradient(160deg, #141620 0%, #0e1018 100%)",
        border: "1.5px solid rgba(255,255,255,0.12)",
        borderRadius: "20px",
        padding: "0",
        overflow: "hidden",
      }}>
        {/* Status bar */}
        <div style={{ height: 28, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
          <span style={{ fontSize: "0.52rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.05em" }}>NOVUM</span>
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {[1, 0.7, 0.4].map((o, i) => <div key={i} style={{ width: 3, height: 3 + i * 2, background: `rgba(160,200,255,${o})`, borderRadius: 1 }} />)}
            <div style={{ width: 14, height: 7, border: "1px solid rgba(255,255,255,0.3)", borderRadius: 2, marginLeft: 3, position: "relative" }}>
              <div style={{ position: "absolute", left: 1, top: 1, right: 3, bottom: 1, background: "rgba(160,220,100,0.8)", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ padding: "10px 10px 14px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>OpsCore</span>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(58,85,133,0.5)", border: "1px solid rgba(100,140,240,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(170,200,255,0.9)" }} />
            </div>
          </div>

          {/* Metric row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginBottom: 8 }}>
            {[
              { v: "24", l: "Tasks", c: "rgba(100,180,255,0.9)" },
              { v: "8", l: "Projects", c: "rgba(100,220,160,0.9)" },
              { v: "12", l: "Online", c: "rgba(200,160,255,0.9)" },
            ].map((m, i) => (
              <div key={i} style={{ padding: "6px 6px 5px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: m.c, lineHeight: 1, marginBottom: 2 }}>{m.v}</div>
                <div style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Email notification */}
          <div style={{ padding: "7px 8px", background: "rgba(58,85,133,0.2)", border: "1px solid rgba(100,140,240,0.3)", borderRadius: 8, marginBottom: 5, display: "flex", alignItems: "flex-start", gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(100,140,240,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 1l3 2 3-2" stroke="rgba(160,200,255,0.9)" strokeWidth="0.8" strokeLinecap="round" /><rect x="0.5" y="0.5" width="7" height="5" rx="1" stroke="rgba(160,200,255,0.5)" strokeWidth="0.7" /></svg>
            </div>
            <div>
              <div style={{ fontSize: "0.5rem", fontWeight: 600, color: "rgba(170,205,255,0.85)", marginBottom: 1 }}>AI Task · from email</div>
              <div style={{ fontSize: "0.47rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>Review structural drawings — 3rd floor</div>
            </div>
          </div>

          {/* Calendar row */}
          <div style={{ padding: "6px 8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, marginBottom: 5, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="0.5" y="1.5" width="7" height="6" rx="1" stroke="rgba(200,210,255,0.5)" strokeWidth="0.7" /><path d="M2 0.5v2M6 0.5v2M0.5 3.5h7" stroke="rgba(200,210,255,0.5)" strokeWidth="0.7" strokeLinecap="round" /></svg>
            </div>
            <div>
              <div style={{ fontSize: "0.5rem", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>Site 4 · Budget review</div>
              <div style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)" }}>Today 2:00 PM · 3 attendees</div>
            </div>
            <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "rgba(100,220,160,0.8)", flexShrink: 0 }} />
          </div>

          {/* Chat row */}
          <div style={{ padding: "6px 8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1h6a.5.5 0 01.5.5v4A.5.5 0 017 6H4.5L2.5 7.5V6H1a.5.5 0 01-.5-.5v-4A.5.5 0 011 1z" stroke="rgba(200,210,255,0.5)" strokeWidth="0.7" /></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.5rem", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>Team Chat · Project Alpha</div>
              <div style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Invoice approved — Greenfield Partners</div>
            </div>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(58,85,133,0.6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "0.4rem", color: "rgba(170,200,255,0.9)", fontWeight: 700 }}>3</span>
            </div>
          </div>

          {/* System bars */}
          <div style={{ marginBottom: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)" }}>FieldOps · 7 jobs active</span>
              <span style={{ fontSize: "0.45rem", color: "rgba(100,220,160,0.7)" }}>Live</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{ width: "72%", height: "100%", background: "linear-gradient(90deg, rgba(100,200,140,0.6), rgba(100,220,160,0.9))", borderRadius: 2 }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.3)" }}>ProjectOps · 91% budget used</span>
              <span style={{ fontSize: "0.45rem", color: "rgba(255,160,80,0.8)" }}>Alert</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{ width: "91%", height: "100%", background: "linear-gradient(90deg, rgba(255,140,60,0.5), rgba(255,160,80,0.9))", borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Home bar */}
        <div style={{ height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 40, height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal();
  return (
    <div style={{ background: "#ffffff", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      {/* Plexus canvas sits inside the white page, underneath all content */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <PlexusBg />
      </div>

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
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="problem-grid">
            <div className="fade-section">
              <div className="pill-tag" style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", color: "var(--text-soft)", marginBottom: 28 }}>
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
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 24px", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(192,57,43,0.15)", borderRadius: 14, transition: "transform 0.25s, box-shadow 0.25s" }}
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
              <div className="pill-tag" style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", color: "var(--text-soft)", marginBottom: 18 }}>
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
              { name: "Forge", badge: "Fully Custom", bc: "#6D4FBB", bb: "rgba(111,79,187,0.07)", bbd: "rgba(111,79,187,0.18)", desc: "For operations that don't fit any mold. Forge is a completely custom-built system designed from the ground up around your unique structure, terminology, and workflows. No templates, no constraints — just your system, architected exactly the way your business runs.", features: ["Full operational architecture from scratch", "Custom data model & integrations", "Proprietary workflow engine", "White-glove build & deployment"] },
              { name: "OpsCore", badge: "Operations Hub", bc: "var(--accent)", bb: "rgba(58,85,133,0.06)", bbd: "rgba(58,85,133,0.18)", desc: "Your entire operation unified in one intelligent command center. OpsCore uses AI to generate tasks from emails, texts, and documents automatically. Your team communicates via built-in chat, shares notes, tracks projects, and monitors budgets — all in one place. And it connects to the tools you already use: accounting platforms like QuickBooks, CRMs like Salesforce or HubSpot, project tools like Monday or Asana, communication tools like Gmail or Outlook, ERP systems, and more. One platform. Every tool. Zero switching.", features: ["AI task generation from email/text/PDF", "Built-in team chat & shared notes", "Project-filtered calendar & tasks", "QuickBooks, Salesforce, HubSpot & more", "Custom role dashboards", "Workflow automation"] },
              { name: "FieldOps", badge: "Field Service", bc: "#236B4E", bb: "rgba(35,107,78,0.06)", bbd: "rgba(35,107,78,0.18)", desc: "End-to-end field service management built around your crews, territories, and job types. From the moment a job is booked to the final invoice — scheduling, dispatch, field access, photo documentation, and automated billing all run through one connected system.", features: ["Visual scheduling & dispatch", "Mobile field access & job tracking", "Automated invoicing on completion", "Customer records & property history"] },
              { name: "ProjectOps", badge: "Project-Based", bc: "#2C4E8A", bb: "rgba(44,78,138,0.06)", bbd: "rgba(44,78,138,0.18)", desc: "Full project lifecycle management from bid to close. Track live budget vs. actuals, manage vendors and subs, monitor milestone completion, and report on profitability across every active project — all in one system built around your workflow.", features: ["Live budget-vs-actual tracking", "Vendor & sub management", "Milestone & Gantt-style timelines", "Document & RFI management", "Profitability reporting"] },
            ].map((sys, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "240px 1fr auto", gap: 48, alignItems: "center", padding: "34px 38px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(232,230,225,0.85)", borderRadius: 16, transition: "border-color 0.2s, box-shadow 0.2s, transform 0.25s", cursor: "pointer" }}
                className="sys-row fade-section"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(58,85,133,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,230,225,0.85)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
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
      <section style={{ padding: "0 24px 0" }}>
        <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(232,230,225,0.8)", borderRadius: 20, padding: "72px 60px", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }} className="fade-section">
            <div className="pill-tag" style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.8)", color: "var(--text-soft)", marginBottom: 20 }}>
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
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", position: "relative", zIndex: 1, transition: "border-color 0.25s, transform 0.25s" }}
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

      <style jsx>{`
        .hero-card { grid-template-columns: 1fr 1fr; }
        @media (max-width: 960px) {
          .hero-card { grid-template-columns: 1fr !important; }
          .hero-card > div:last-child { min-height: 340px; }
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
