"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ─── Operational Engine graphic ───────────────────────────────────────────────
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

export default function ParkedPage() {
  const [graphicReady, setGraphicReady] = useState(false);
  useEffect(() => { setGraphicReady(true); }, []);

  return (
    <div style={{ background: "#f5f4f1", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", position: "relative", paddingTop: 86 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto 32px", padding: "0 24px" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-soft)", fontWeight: 600 }}>Parked sections</div>
        <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", marginTop: 6 }}>Reference content not currently used on the home page. Pull from here as needed.</p>
      </div>

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

      <style jsx>{`
        @media (max-width: 1080px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .solution-grid { grid-template-columns: 1fr !important; }
          .sys-row { grid-template-columns: 1fr !important; gap: 18px !important; padding: 24px !important; }
        }
        @media (max-width: 720px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </div>
  );
}
