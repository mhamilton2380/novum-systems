"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import DotCanvas from "@/components/DotCanvas";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const SPLINE_SCENE = "https://prod.spline.design/REmq3VZsd3qc2f-0/scene.splinecode";

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
      ctx.strokeStyle = "rgba(0,200,122,0.07)";
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
          tg.addColorStop(0, "rgba(0,200,122,0)");
          tg.addColorStop(1, `rgba(0,200,122,${brightness * p.alpha * 0.55})`);
          ctx.beginPath(); ctx.moveTo(tx, y); ctx.lineTo(px, y);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5; ctx.stroke();
          const gr = ctx.createRadialGradient(px, y, 0, px, y, 14);
          gr.addColorStop(0, `rgba(0,210,130,${brightness * p.alpha * 0.6})`);
          gr.addColorStop(1, "rgba(0,200,122,0)");
          ctx.beginPath(); ctx.arc(px, y, 14, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        } else {
          const x = p.line * SPACING;
          const py2 = p.t * H;
          const ty = t0 * H;
          const tg = ctx.createLinearGradient(x, ty, x, py2);
          tg.addColorStop(0, "rgba(0,200,122,0)");
          tg.addColorStop(1, `rgba(0,200,122,${brightness * p.alpha * 0.55})`);
          ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x, py2);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5; ctx.stroke();
          const gr = ctx.createRadialGradient(x, py2, 0, x, py2, 14);
          gr.addColorStop(0, `rgba(0,210,130,${brightness * p.alpha * 0.6})`);
          gr.addColorStop(1, "rgba(0,200,122,0)");
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

// ─── Operational Engine graphic ───────────────────────────────────────────────
function OperationalEngineGraphic() {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const svgEl = svgRef.current;
    const wrap = wrapRef.current;
    const engine = engineRef.current;
    if (!svgEl || !wrap || !engine) return;
    let raf = 0;

    type PLine = { el: SVGPathElement; len: number; trail: number; pillId?: string; lit?: boolean };
    let inLines: PLine[] = [];
    let outLines: PLine[] = [];

    function getR(el: HTMLElement) {
      const wr = wrap!.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { left: r.left - wr.left, right: r.right - wr.left, midY: r.top - wr.top + r.height / 2 };
    }

    function addPath(d: string, isBase: boolean) {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      if (isBase) {
        p.setAttribute("stroke", "#1e1e1e");
        p.setAttribute("stroke-width", "1");
      } else {
        p.setAttribute("stroke", "#00C87A");
        p.setAttribute("stroke-width", "1.6");
        p.setAttribute("stroke-linecap", "round");
        p.setAttribute("opacity", "0");
      }
      svgEl!.appendChild(p);
      return p;
    }

    function buildConnectors() {
      svgEl!.innerHTML = "";
      inLines = [];
      outLines = [];
      const er = getR(engine!);
      const eMidY = er.midY;
      ["i0","i1","i2","i3","i4","i5","i6","i7"].forEach((id) => {
        const el = pillRefs.current[id];
        if (!el) return;
        const r = getR(el);
        const x1 = r.right, y1 = r.midY, x2 = er.left, y2 = eMidY;
        const mx = (x1 + x2) / 2;
        const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        addPath(d, true);
        const p = addPath(d, false);
        const len = p.getTotalLength(), trail = len * 0.13;
        p.setAttribute("stroke-dasharray", `${trail} ${len}`);
        p.setAttribute("stroke-dashoffset", String(len + trail));
        inLines.push({ el: p, len, trail });
      });
      ["o0","o1","o2","o3","o4","o5"].forEach((id) => {
        const el = pillRefs.current[id];
        if (!el) return;
        const r = getR(el);
        const x1 = er.right, y1 = eMidY, x2 = r.left, y2 = r.midY;
        const mx = (x1 + x2) / 2;
        const d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        addPath(d, true);
        const p = addPath(d, false);
        const len = p.getTotalLength(), trail = len * 0.13;
        p.setAttribute("stroke-dasharray", `${trail} ${len}`);
        p.setAttribute("stroke-dashoffset", String(len + trail));
        outLines.push({ el: p, len, trail, pillId: id, lit: false });
      });
    }

    const IN_DUR = 2400, ENG_DUR = 650, OUT_DUR = 2200, PAUSE_DUR = 1400;
    let phase = "in", phaseStart: number | null = null;

    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
    function resetPulse(p: PLine) {
      p.el.setAttribute("stroke-dashoffset", String(p.len + p.trail));
      p.el.setAttribute("opacity", "0");
    }
    function setEngineGlow(on: boolean) { engine!.classList.toggle("oeg-engine-glow", on); }

    function tick(ts: number) {
      if (!phaseStart) phaseStart = ts;
      const elapsed = ts - phaseStart;
      if (phase === "in") {
        const t = Math.min(1, elapsed / IN_DUR), te = ease(t);
        inLines.forEach((p) => {
          p.el.setAttribute("stroke-dashoffset", String(p.trail + p.len * (1 - te)));
          p.el.setAttribute("opacity", t > 0 ? "1" : "0");
        });
        if (t >= 1) { inLines.forEach(resetPulse); setEngineGlow(true); phase = "engine"; phaseStart = ts; }
      } else if (phase === "engine") {
        if (elapsed >= ENG_DUR) { setEngineGlow(false); outLines.forEach((p) => { p.lit = false; }); phase = "out"; phaseStart = ts; }
      } else if (phase === "out") {
        const t = Math.min(1, elapsed / OUT_DUR), te = ease(t);
        outLines.forEach((p) => {
          p.el.setAttribute("stroke-dashoffset", String(p.trail + p.len * (1 - te)));
          p.el.setAttribute("opacity", t > 0 ? "1" : "0");
          const front = p.trail + p.len * te;
          if (!p.lit && front >= p.len) {
            p.lit = true;
            const pill = p.pillId ? pillRefs.current[p.pillId] : null;
            if (pill) { pill.classList.add("oeg-lit"); setTimeout(() => pill.classList.remove("oeg-lit"), 1400); }
          }
        });
        if (t >= 1) { outLines.forEach(resetPulse); phase = "pause"; phaseStart = ts; }
      } else if (phase === "pause") {
        if (elapsed >= PAUSE_DUR) { phase = "in"; phaseStart = ts; }
      }
      raf = requestAnimationFrame(tick);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => requestAnimationFrame(buildConnectors), 80);
    }
    window.addEventListener("resize", onResize);

    document.fonts.ready.then(() => setTimeout(() => { buildConnectors(); raf = requestAnimationFrame(tick); }, 120));

    return () => { cancelAnimationFrame(raf); clearTimeout(resizeTimer); window.removeEventListener("resize", onResize); };
  }, []);

  const pillBase: CSSProperties = {
    display: "flex", alignItems: "center", gap: 7, padding: "8px 11px",
    border: "1px solid #232323", borderRadius: 5, background: "#171717",
    fontSize: 13, color: "#b0b0b0", fontWeight: 500, whiteSpace: "nowrap",
  };

  const inputs = [
    { id: "i0", label: "Email", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4l7 5 7-5" stroke="currentColor" strokeWidth="1.3"/></svg> },
    { id: "i1", label: "Calendar", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 7h12M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { id: "i2", label: "Team Chat", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M2 2h12v9H9l-3 3v-3H2V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
    { id: "i3", label: "Documents", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M3 1h7l3 3v11H3V1z" stroke="currentColor" strokeWidth="1.3"/><path d="M10 1v3h3" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { id: "i4", label: "CRM Data", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="5" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 5v6c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5V5" stroke="currentColor" strokeWidth="1.3"/></svg> },
    { id: "i5", label: "Accounting", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg> },
    { id: "i6", label: "Project Data", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><rect x="1" y="10" width="3" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><rect x="6" y="7" width="3" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.3"/><rect x="11" y="4" width="3" height="11" rx="0.5" stroke="currentColor" strokeWidth="1.3"/></svg> },
    { id: "i7", label: "Manual Inputs", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M2 12l4-4 3 3 5-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];
  const outputs = [
    { id: "o0", label: "Task Management", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id: "o1", label: "Dashboards", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M2 10h3v4H2zM6.5 6h3v8h-3zM11 2h3v12h-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
    { id: "o2", label: "Communication", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M2 2h12v9H9l-3 3v-3H2V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
    { id: "o3", label: "Reporting", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M3 1h10v14H3V1z" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6h6M5 9h6M5 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
    { id: "o4", label: "Alerts", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 4h4.5l-3.5 2.5 1.3 4.5L8 11l-3.8 2 1.3-4.5L2 6h4.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg> },
    { id: "o5", label: "Automated Workflows", icon: <svg width={12} height={12} viewBox="0 0 16 16" fill="none"><path d="M2 8a6 6 0 1112 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M13 11l1-3-3 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];
  const engineRows = [
    { title: "Data ingestion & structuring", desc: "Normalizes inputs into a unified operational schema" },
    { title: "Workflow engine", desc: "Task creation, routing, and automation" },
    { title: "AI & agents layer", desc: "Email→task, document processing, summaries" },
    { title: "Voice command interface", desc: "Pull reports, send emails, or trigger workflows — just by telling the system what to do" },
  ];

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", background: "transparent", padding: "44px 40px 48px", overflow: "hidden" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ width: 148, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#383838", marginBottom: 11 }}>Operational Inputs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {inputs.map(({ id, label, icon }) => (
              <div key={id} ref={(el) => { pillRefs.current[id] = el; }} className="oeg-pill" style={pillBase}>
                <span style={{ opacity: 0.38, flexShrink: 0, display: "flex" }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div ref={engineRef} className="oeg-engine" style={{ width: "100%", border: "1px solid #0d2418", borderRadius: 7, background: "#0c1510" }}>
            <div style={{ padding: "11px 13px 9px", borderBottom: "1px solid #0d1e14" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00C87A", marginBottom: 3 }}>Novum System</div>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#d8d8d8" }}>Operational Engine</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {engineRows.map(({ title, desc }, i) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "9px 12px", borderBottom: i < engineRows.length - 1 ? "1px solid #1c1c1c" : "none", fontSize: 11.5, color: "#4e4e4e", lineHeight: 1.5 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00C87A", flexShrink: 0, marginTop: 5, opacity: 0.55 }} />
                  <div>
                    <strong style={{ display: "block", fontWeight: 600, color: "#999", fontSize: 12, marginBottom: 1 }}>{title}</strong>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: 148, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#383838", marginBottom: 11, textAlign: "right" }}>Operational Outputs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {outputs.map(({ id, label, icon }) => (
              <div key={id} ref={(el) => { pillRefs.current[id] = el; }} className="oeg-pill" style={{ ...pillBase, flexDirection: "row-reverse", textAlign: "right", justifyContent: "flex-start" }}>
                {label}
                <span style={{ opacity: 0.38, flexShrink: 0, display: "flex" }}>{icon}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg ref={svgRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible", zIndex: 1 } as CSSProperties} />
    </div>
  );
}

// ─── Shared glass card style ──────────────────────────────────────────────────
const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px) saturate(1.4)",
  WebkitBackdropFilter: "blur(12px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.55)",
  boxShadow: "0 8px 32px rgba(22,28,38,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
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

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [graphicReady, setGraphicReady] = useState(false);
  const [fontIdx, setFontIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const spotRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

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

  // GSAP: connector line draws left-to-right on scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = connectorRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        background: "#f5f4f1",
        color: "var(--text)",
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
          background: "radial-gradient(circle, rgba(0,200,122,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-600px, -600px)",
          transition: "transform 0.08s ease-out",
          willChange: "transform",
        }}
      />

      <PlexusBg />

      {/* ── Hero ── */}
      <section style={{ padding: "86px 20px 0", position: "relative", zIndex: 1 }}>
        <div
          className="hero-card"
          style={{
            background: "#0A0C0F",
            borderRadius: 28,
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 36px 90px rgba(15,18,25,0.22)",
            minHeight: "min(86vh, 760px)",
            display: "flex",
            alignItems: "center",
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "linear-gradient(90deg, rgba(10,12,15,0.78) 0%, rgba(10,12,15,0.55) 32%, rgba(10,12,15,0.15) 58%, rgba(10,12,15,0) 80%)",
              pointerEvents: "none",
            }}
          />

          {/* Staggered hero entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13, delayChildren: 0.18 } },
            }}
            style={{
              position: "relative",
              zIndex: 3,
              padding: "0 52px",
              display: "flex",
              flexDirection: "column",
              maxWidth: 720,
            }}
          >
            <motion.div
              variants={fadeUp}
              className="pill-tag"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.48)",
                marginBottom: 28,
                alignSelf: "flex-start",
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.42)", display: "inline-block" }} />
              Operational Software for Growing Businesses
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(3rem, 5vw, 5.4rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "#fff",
                marginBottom: 24,
                maxWidth: 820,
              }}
            >
              Software that{" "}
              <span
                style={{
                  fontFamily: ADAPT_FONTS[fontIdx].font,
                  fontStyle: ADAPT_FONTS[fontIdx].style as "italic" | "normal",
                  fontWeight: ADAPT_FONTS[fontIdx].weight,
                  letterSpacing: ADAPT_FONTS[fontIdx].tracking,
                  color: "#00C87A",
                  textShadow: "0 0 22px rgba(0,200,122,0.55), 0 0 60px rgba(0,200,122,0.2)",
                  opacity: fading ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  display: "inline-block",
                }}
              >
                adapts
              </span>
              <br />
              to your business.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.12rem)",
                color: "rgba(255,255,255,0.56)",
                lineHeight: 1.85,
                maxWidth: 680,
                marginBottom: 38,
              }}
            >
              We replace rigid, expensive software with operational systems
              designed around how your business actually runs, with one
              intelligent layer across projects, teams, field work, and reporting.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  background: "#00C87A",
                  color: "#0a1a12",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Book a Discovery Call
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/systems"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.72)",
                  background: "rgba(255,255,255,0.02)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                See Our Systems
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="problem-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
          >
            {/* Left: text staggered up */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} className="pill-tag" style={{ ...glassCard, color: "var(--text-soft)", marginBottom: 28 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                The Problem
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-serif"
                style={{ fontSize: "clamp(1.95rem, 3.5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 24 }}
              >
                Your operations are unique.
                <br />
                <span style={{ color: "var(--text-soft)", fontStyle: "italic" }}>Your software isn&apos;t.</span>
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: "var(--text-soft)", lineHeight: 1.88, fontSize: "0.98rem", marginBottom: 16, maxWidth: 560 }}>
                Off-the-shelf platforms were designed for the average business,
                which means they fit nobody perfectly. You end up bending your
                workflows to match your software instead of the other way around.
              </motion.p>
              <motion.p variants={fadeUp} style={{ color: "var(--text-soft)", lineHeight: 1.88, fontSize: "0.98rem", maxWidth: 560 }}>
                The result is fragmented operations, manual workarounds, and a
                team spending too much energy managing tools instead of managing
                the business.
              </motion.p>
            </motion.div>

            {/* Right: cards slide in from right, staggered */}
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            >
              {[
                "Generic platforms that force you to work around them",
                "Expensive enterprise tools built for companies 10x your size",
                "Disconnected tools requiring manual data entry between systems",
                "No visibility into your actual operations across teams",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeRight}
                  style={{
                    ...glassCard,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "20px 24px",
                    border: "1px solid rgba(192,57,43,0.12)",
                    borderRadius: 16,
                    transition: "transform 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(22,28,38,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(22,28,38,0.06)";
                  }}
                >
                  <span style={{ color: "var(--red)", fontSize: "0.85rem", marginTop: 1, fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <p style={{ color: "var(--text-mid)", fontSize: "0.92rem", lineHeight: 1.68, margin: 0 }}>{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            background: "linear-gradient(180deg, #1c1814 0%, #141414 100%)",
            borderRadius: 24,
            padding: "84px 60px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 28px 70px rgba(15,18,25,0.18)",
          }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.8 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 64px" }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fadeUp} className="pill-tag" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.45)", display: "inline-block" }} />
                The Novum Approach
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-serif" style={{ fontSize: "clamp(1.95rem, 3.6vw, 3rem)", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: 18, color: "#fff" }}>
                Systems built around how you actually run.
              </motion.h2>
              <motion.p variants={fadeUp} style={{ color: "rgba(255,255,255,0.54)", lineHeight: 1.82, fontSize: "0.98rem" }}>
                We start with your operation, not a generic template. Every
                system is structured around your workflows, team, reporting
                needs, and business model.
              </motion.p>
            </motion.div>

            {/* Operational Engine diagram — visualizes the approach in action */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                marginBottom: 56,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
                overflow: "hidden",
                padding: "24px 0",
              }}
            >
              {graphicReady ? <OperationalEngineGraphic /> : null}
            </motion.div>

            {/* Approach cards — staggered */}
            <motion.div
              className="solution-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
            >
              {[
                {
                  title: "Mapped to your operations",
                  desc: "We document how your business works before building anything. The result reflects your reality, not a generic software pattern.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="3.5" r="2" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                      <circle cx="3.5" cy="16" r="2" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                      <circle cx="16.5" cy="16" r="2" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                      <line x1="10" y1="5.5" x2="3.5" y2="14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                      <line x1="10" y1="5.5" x2="16.5" y2="14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                      <line x1="5.5" y1="16" x2="14.5" y2="16" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2"/>
                    </svg>
                  ),
                },
                {
                  title: "Fast to deploy, built to last",
                  desc: "You get a working operational layer quickly, built on a structure that can evolve with your business as complexity increases.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M11 2L3.5 11.5H9L7 18 16.5 8.5H11L13 2z" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  title: "One system, not many tools",
                  desc: "We consolidate projects, communication, reporting, scheduling, and workflows into one coherent operating system.",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="rgba(255,255,255,0.68)" strokeWidth="1.4"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  style={{
                    padding: 32,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,200,122,0.32)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.06)", borderRadius: 12, marginBottom: 20, border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: "1.16rem", marginBottom: 12, letterSpacing: "-0.01em", color: "#fff" }}>{item.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.92rem", lineHeight: 1.76, margin: 0 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Systems ── */}
      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <div>
              <motion.div variants={fadeUp} className="pill-tag" style={{ ...glassCard, color: "var(--text-soft)", marginBottom: 18 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
                Our Systems
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-serif" style={{ fontSize: "clamp(1.95rem, 3.5vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
                Every operation covered.
                <br />
                One platform.
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/systems" className="btn-outline">View All Systems →</Link>
            </motion.div>
          </motion.div>

          {/* System rows — slide in from left, staggered */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              {
                name: "Forge",
                badge: "Fully Custom",
                badgeColor: "#7756C9",
                badgeBg: "rgba(119,86,201,0.08)",
                badgeBorder: "rgba(119,86,201,0.18)",
                desc: "For operations that do not fit any mold. Forge is architected from the ground up around your structure, workflows, terminology, and reporting logic.",
                features: ["Custom operational architecture", "Tailored data model", "Workflow engine", "White-glove deployment"],
              },
              {
                name: "OpsCore",
                badge: "Operations Hub",
                badgeColor: "var(--accent)",
                badgeBg: "rgba(0,200,122,0.08)",
                badgeBorder: "rgba(0,200,122,0.2)",
                desc: "A unified command center for tasks, communication, projects, budgets, reporting, and integrations. OpsCore creates structure across the entire business.",
                features: ["AI task generation", "Team chat and notes", "Project calendars and tasks", "QuickBooks and CRM integrations", "Role dashboards", "Workflow automation"],
              },
              {
                name: "ProjectOps",
                badge: "Project-Based",
                badgeColor: "#3d6e8a",
                badgeBg: "rgba(61,110,138,0.08)",
                badgeBorder: "rgba(61,110,138,0.2)",
                desc: "Project lifecycle management from estimate to closeout, with live budget visibility, timeline tracking, document workflows, and profitability reporting.",
                features: ["Budget vs actuals", "Vendor management", "Milestone tracking", "Document workflows", "Profitability reporting"],
              },
              {
                name: "FieldOps",
                badge: "Field Service",
                badgeColor: "#237259",
                badgeBg: "rgba(35,114,89,0.08)",
                badgeBorder: "rgba(35,114,89,0.18)",
                desc: "Field service management built around your crews, territories, scheduling model, and invoicing process from dispatch through completion.",
                features: ["Scheduling and dispatch", "Mobile field access", "Automated invoicing", "Customer history"],
              },
            ].map((system) => (
              <motion.div
                key={system.name}
                className="sys-row"
                variants={fadeLeft}
                style={{
                  ...glassCard,
                  display: "grid",
                  gridTemplateColumns: "240px 1fr auto",
                  gap: 48,
                  alignItems: "center",
                  padding: "34px 38px",
                  borderRadius: 18,
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0,200,122,0.28)";
                  e.currentTarget.style.boxShadow = "0 16px 38px rgba(22,28,38,0.08)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(22,28,38,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <h3 className="font-serif" style={{ fontSize: "1.74rem", letterSpacing: "-0.03em", marginBottom: 10, color: "var(--text)" }}>{system.name}</h3>
                  <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", background: system.badgeBg, border: `1px solid ${system.badgeBorder}`, borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", color: system.badgeColor }}>{system.badge}</span>
                </div>
                <div>
                  <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.78, marginBottom: 14 }}>{system.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {system.features.map((feature) => (
                      <span key={feature} style={{ padding: "4px 12px", background: "rgba(255,255,255,0.52)", border: "1px solid rgba(229,225,216,0.92)", borderRadius: 8, fontSize: "0.77rem", color: "var(--text-soft)" }}>{feature}</span>
                    ))}
                  </div>
                </div>
                <Link href="/systems" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, border: "1px solid rgba(229,225,216,0.9)", borderRadius: 12, color: "var(--text-soft)", textDecoration: "none", flexShrink: 0 }}>→</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Enterprise Banner ── */}
      <section style={{ padding: "40px 24px 0", position: "relative", zIndex: 1 }}>
        <motion.div
          style={{
            background: "#141414", borderRadius: 24,
            padding: "64px 60px", position: "relative", overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center",
            maxWidth: "1400px", margin: "0 auto",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
          <motion.div variants={fadeUp} style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
              Enterprise
            </div>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: 14 }}>
              Running a larger operation?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 580, margin: 0 }}>
              We deploy the full Novum stack — OpsCore, Vault, A.R.I.S, and more — as an integrated platform for multi-team organizations. Encrypted, role-controlled, and built around how your business actually operates.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
            <Link href="/enterprise"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 100, background: "#00C87A", color: "#0a1a12", fontSize: "0.92rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.88"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Learn about Enterprise →
            </Link>
          </motion.div>
        </motion.div>
      </section>
      {/* ── The Problem ── */}
      <section style={{ padding: "96px 40px", borderTop: "1px solid #EDECEA" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="two-col">
            <div style={{ position: "sticky", top: "88px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "5px 14px", borderRadius: "100px",
                border: "1px solid #E8E6E1", background: "#F7F6F3",
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#7A7774", marginBottom: "20px",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7A7774", display: "inline-block" }} />
                The Problem
              </div>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
              }}>
                Growing organizations outgrow their tools. Fast.
              </h2>
              <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
                The platforms that worked at 20 people break at 100. Data lives in disconnected systems. Teams work around tools instead of with them. Leadership makes decisions with incomplete information. And no one can answer a simple question without digging through three different apps.
              </p>
            </div>
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
                  padding: "28px 32px", background: "#fff",
                  border: "1px solid #EDECEA", borderRadius: "14px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <h4 style={{ fontWeight: 600, fontSize: "0.975rem", marginBottom: "8px", color: "#1A1A1A" }}>{item.problem}</h4>
                  <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Deploy ── */}
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "12px" }} className="stack-grid">
              {[
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
      <section style={{ padding: "96px 40px", borderTop: "1px solid #EDECEA" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid #E8E6E1", background: "#F7F6F3",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "#7A7774", marginBottom: "20px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7A7774", display: "inline-block" }} />
              Security & Compliance
            </div>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px",
            }}>Security isn&apos;t a feature. It&apos;s the foundation.</h2>
            <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
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
                padding: "32px", background: "#fff",
                border: "1px solid #EDECEA", borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.accentBorder; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 48, height: 48, background: item.accentBg,
                  border: `1px solid ${item.accentBorder}`, borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "0.975rem", marginBottom: "10px", color: "#1A1A1A" }}>{item.title}</h3>
                <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Engage ── */}
      <section style={{ padding: "0 24px" }}>
        <div style={{
          background: "#fff", border: "1px solid #EDECEA", borderRadius: "20px",
          padding: "80px 60px",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }} className="engage-col">
              <div style={{ position: "sticky", top: "88px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "5px 14px", borderRadius: "100px",
                  border: "1px solid #E8E6E1", background: "#F7F6F3",
                  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                  color: "#7A7774", marginBottom: "20px",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7A7774", display: "inline-block" }} />
                  How We Engage
                </div>
                <h2 style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
                }}>We map before we build. Always.</h2>
                <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
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
                    background: "#F7F6F3", border: "1px solid #EDECEA",
                    borderRadius: "14px", transition: "border-color 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"}
                  >
                    <span style={{
                      fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em",
                      color: "#DDDBD7", lineHeight: 1,
                    }}>{step.num}</span>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: "0.975rem", marginBottom: "8px", color: "#1A1A1A" }}>{step.title}</h4>
                      <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{step.desc}</p>
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
            <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
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
                padding: "36px", background: "#fff",
                border: "1px solid #EDECEA", borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#a0e8cb"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C87A", marginBottom: "20px" }} />
                <h3 style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.015em", marginBottom: "10px", color: "#1A1A1A" }}>{item.title}</h3>
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

      {/* ── How It Works ── */}
      <section style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div style={{ ...glassCard, maxWidth: "1400px", margin: "0 auto", padding: "72px 60px", borderRadius: 24 }}>
          <motion.div
            style={{ textAlign: "center", marginBottom: 64 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="pill-tag" style={{ ...glassCard, color: "var(--text-soft)", marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-soft)", display: "inline-block" }} />
              How It Works
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif" style={{ fontSize: "clamp(1.95rem, 3.5vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              From discovery to deployed, in three steps.
            </motion.h2>
          </motion.div>

          <motion.div
            className="process-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {/* Connector line — GSAP draws it left-to-right on scroll */}
            <div
              ref={connectorRef}
              className="process-connector"
              style={{
                position: "absolute",
                top: 48,
                left: "calc(16.67% + 36px)",
                right: "calc(16.67% + 36px)",
                height: 1,
                background: "rgba(201,197,188,0.8)",
              }}
            />

            {[
              { step: "01", title: "Discovery", desc: "We spend time with your team to understand how the business actually runs, where the friction lives, and what information matters." },
              { step: "02", title: "System Design", desc: "We architect the operational model around your workflows so you can see exactly what is being built before it gets deployed." },
              { step: "03", title: "Build & Deploy", desc: "We configure, ship, and launch your system with training, handoff, and continued support once it is live." },
            ].map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                style={{ textAlign: "center", padding: "0 20px" }}
              >
                <motion.div
                  style={{
                    ...glassCard,
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    position: "relative",
                    zIndex: 1,
                  }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-serif" style={{ fontSize: "1.45rem", color: "var(--accent)", letterSpacing: "-0.03em" }}>{step.step}</span>
                </motion.div>
                <h3 className="font-serif" style={{ fontSize: "1.3rem", marginBottom: 14, letterSpacing: "-0.02em", color: "var(--text)" }}>{step.title}</h3>
                <p style={{ color: "var(--text-soft)", fontSize: "0.92rem", lineHeight: 1.82 }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: "40px 24px 88px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "76px 64px",
            background: "linear-gradient(180deg, #1c1814 0%, #141414 100%)",
            borderRadius: 28,
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 28px 70px rgba(15,18,25,0.18)",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div variants={fadeUp} className="pill-tag" style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.45)", display: "inline-block" }} />
              Ready to Build
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.06, letterSpacing: "-0.04em", marginBottom: 20, color: "#fff" }}>
              Stop adapting to your software.
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: "rgba(255,255,255,0.56)", fontSize: "1rem", lineHeight: 1.82, marginBottom: 44 }}>
              Book a discovery call and let&apos;s map out what an operational
              system built specifically for your business could look like.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{ padding: "15px 32px", borderRadius: "999px", background: "#FFFFFF", color: "var(--text)", fontSize: "0.92rem", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "transform 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Book a Discovery Call →
              </Link>
              <Link href="/systems" style={{ padding: "15px 28px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.72)", background: "transparent", fontSize: "0.92rem", fontWeight: 500, textDecoration: "none" }}>
                Explore Systems
              </Link>
            </motion.div>
          </div>
        </motion.div>
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
