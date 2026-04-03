"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

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

      // Grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(80,120,200,0.07)";
      for (let c = 1; c < cols; c++) {
        ctx.beginPath(); ctx.moveTo(c * SPACING, 0); ctx.lineTo(c * SPACING, H); ctx.stroke();
      }
      for (let r = 1; r < rows; r++) {
        ctx.beginPath(); ctx.moveTo(0, r * SPACING); ctx.lineTo(W, r * SPACING); ctx.stroke();
      }

      // Pulses
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
          tg.addColorStop(0, "rgba(100,150,240,0)");
          tg.addColorStop(1, `rgba(110,165,245,${brightness * p.alpha * 0.65})`);
          ctx.beginPath(); ctx.moveTo(tx, y); ctx.lineTo(px, y);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5; ctx.stroke();
          const gr = ctx.createRadialGradient(px, y, 0, px, y, 14);
          gr.addColorStop(0, `rgba(130,185,255,${brightness * p.alpha * 0.7})`);
          gr.addColorStop(1, "rgba(100,160,255,0)");
          ctx.beginPath(); ctx.arc(px, y, 14, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        } else {
          const x = p.line * SPACING;
          const py2 = p.t * H;
          const ty = t0 * H;
          const tg = ctx.createLinearGradient(x, ty, x, py2);
          tg.addColorStop(0, "rgba(100,150,240,0)");
          tg.addColorStop(1, `rgba(110,165,245,${brightness * p.alpha * 0.65})`);
          ctx.beginPath(); ctx.moveTo(x, ty); ctx.lineTo(x, py2);
          ctx.strokeStyle = tg; ctx.lineWidth = 1.5; ctx.stroke();
          const gr = ctx.createRadialGradient(x, py2, 0, x, py2, 14);
          gr.addColorStop(0, `rgba(130,185,255,${brightness * p.alpha * 0.7})`);
          gr.addColorStop(1, "rgba(100,160,255,0)");
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

function HeroWorkflowGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let time = 0;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const allLabels = [
      "Email", "Calendar", "Accounting", "Documents",
      "Tasks", "Schedules", "Team Updates", "AI Agents",
      "Team Chat", "Reports", "Bookkeeping", "Forecasting",
      "Integrations", "Workflows",
    ];

    type Pt = { x: number; y: number };

    function rr(x: number, y: number, w: number, h: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    function drawCard(x: number, y: number, w: number, h: number, label: string, side: "left" | "right") {
      const g = ctx.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, "rgba(255,255,255,0.11)");
      g.addColorStop(1, "rgba(255,255,255,0.055)");
      rr(x, y, w, h, 10);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.17)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.84)";
      ctx.font = `500 13px "DM Sans", sans-serif`;
      ctx.textBaseline = "middle";
      if (side === "left") {
        ctx.textAlign = "left";
        ctx.fillText(label, x + 12, y + h / 2);
      } else {
        ctx.textAlign = "right";
        ctx.fillText(label, x + w - 12, y + h / 2);
      }
    }

    function drawLine(from: Pt, to: Pt) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = "rgba(100,148,255,0.14)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawDevice(DEV_X: number, DEV_Y: number, DEV_W: number, DEV_H: number, W: number, H: number) {
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.035);

      // Outer ambient glow
      const gg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 130);
      gg.addColorStop(0, `rgba(90,140,255,${pulse * 0.14})`);
      gg.addColorStop(1, "rgba(90,140,255,0)");
      ctx.fillStyle = gg;
      ctx.fillRect(W / 2 - 130, H / 2 - 130, 260, 260);

      // Device background
      const bg = ctx.createLinearGradient(DEV_X, DEV_Y, DEV_X, DEV_Y + DEV_H);
      bg.addColorStop(0, "rgba(80,115,205,0.22)");
      bg.addColorStop(1, "rgba(50,80,175,0.11)");
      rr(DEV_X, DEV_Y, DEV_W, DEV_H, 14);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.strokeStyle = `rgba(120,168,255,${0.26 + 0.18 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Top edge highlight
      ctx.beginPath();
      ctx.moveTo(DEV_X + 14, DEV_Y + 0.5);
      ctx.lineTo(DEV_X + DEV_W - 14, DEV_Y + 0.5);
      ctx.strokeStyle = `rgba(200,220,255,${0.24 + 0.12 * pulse})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner wire grid
      const iX = DEV_X + 14;
      const iY = DEV_Y + 14;
      const iW = DEV_W - 28;
      const iH = DEV_H - 28;
      const cols = 5;
      const rows = 4;

      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        const x = iX + (c / cols) * iW;
        const a = 0.07 + 0.06 * Math.sin(time * 0.04 + c * 0.9);
        ctx.strokeStyle = `rgba(140,182,255,${a})`;
        ctx.beginPath();
        ctx.moveTo(x, iY);
        ctx.lineTo(x, iY + iH);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        const y = iY + (r / rows) * iH;
        const a = 0.07 + 0.06 * Math.sin(time * 0.04 + r * 1.3);
        ctx.strokeStyle = `rgba(140,182,255,${a})`;
        ctx.beginPath();
        ctx.moveTo(iX, y);
        ctx.lineTo(iX + iW, y);
        ctx.stroke();
      }

      // Grid intersection dots
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = iX + (c / cols) * iW;
          const y = iY + (r / rows) * iH;
          const a = 0.18 + 0.15 * Math.sin(time * 0.035 + c * 0.8 + r * 1.1);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160,205,255,${a})`;
          ctx.fill();
        }
      }

      // Animated scan line
      const scanY = iY + ((time * 0.4) % (iH + 1));
      const sg = ctx.createLinearGradient(iX, scanY - 6, iX, scanY + 6);
      sg.addColorStop(0, "rgba(120,180,255,0)");
      sg.addColorStop(0.5, `rgba(140,192,255,${0.11 + 0.09 * pulse})`);
      sg.addColorStop(1, "rgba(120,180,255,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(iX, scanY - 6, iW, 12);

      // Corner accent dots
      const ca = 0.5 + 0.3 * pulse;
      const corners: [number, number][] = [
        [DEV_X + 6, DEV_Y + 6],
        [DEV_X + DEV_W - 6, DEV_Y + 6],
        [DEV_X + 6, DEV_Y + DEV_H - 6],
        [DEV_X + DEV_W - 6, DEV_Y + DEV_H - 6],
      ];
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,212,255,${ca})`;
        ctx.fill();
      });
    }

    function tick() {
      time++;
      const W = canvas!.offsetWidth;
      const H = canvas!.offsetHeight;
      // Re-apply DPR transform every frame so retina displays stay crisp
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      if (!W || !H) { raf = requestAnimationFrame(tick); return; }

      ctx.clearRect(0, 0, W, H);

      const N = allLabels.length;
      const DEV_W = Math.min(136, W * 0.19);
      const DEV_H = 108;
      const CX = W / 2;
      const CY = H / 2;
      const DEV_X = CX - DEV_W / 2;
      const DEV_Y = CY - DEV_H / 2;

      const CARD_W = 100;
      const CARD_H = 28;
      const RING_R = Math.min(W, H) * 0.38;

      // Precompute card positions
      const cards: { cx: number; cy: number; angle: number }[] = allLabels.map((_, i) => {
        const angle = -Math.PI / 2 + (i / N) * Math.PI * 2;
        return { cx: CX + Math.cos(angle) * RING_R, cy: CY + Math.sin(angle) * RING_R, angle };
      });

      // Draw static lines from card center to device edge
      cards.forEach(({ cx, cy, angle }) => {
        const edgeX = CX + Math.cos(angle) * (DEV_W / 2 + 2);
        const edgeY = CY + Math.sin(angle) * (DEV_H / 2 + 2);
        drawLine({ x: cx, y: cy }, { x: edgeX, y: edgeY });
      });

      // Draw inward pulses
      cards.forEach(({ cx, cy, angle }, i) => {
        const edgeX = CX + Math.cos(angle) * (DEV_W / 2 + 2);
        const edgeY = CY + Math.sin(angle) * (DEV_H / 2 + 2);
        const pulseT = (time * 0.005 + i / N) % 1;
        const brightness = Math.sin(pulseT * Math.PI);
        const px = cx + (edgeX - cx) * pulseT;
        const py = cy + (edgeY - cy) * pulseT;
        const t0 = Math.max(0, pulseT - 0.12);
        const tx = cx + (edgeX - cx) * t0;
        const ty = cy + (edgeY - cy) * t0;
        const tg = ctx.createLinearGradient(tx, ty, px, py);
        tg.addColorStop(0, "rgba(160,210,255,0)");
        tg.addColorStop(1, `rgba(160,210,255,${brightness * 0.8})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = tg;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 6);
        gr.addColorStop(0, `rgba(190,228,255,${brightness * 0.9})`);
        gr.addColorStop(1, "rgba(120,172,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      // Draw device
      drawDevice(DEV_X, DEV_Y, DEV_W, DEV_H, W, H);

      // Draw label cards
      cards.forEach(({ cx, cy }, i) => {
        const g = ctx.createLinearGradient(cx - CARD_W / 2, cy - CARD_H / 2, cx - CARD_W / 2, cy + CARD_H / 2);
        g.addColorStop(0, "rgba(255,255,255,0.11)");
        g.addColorStop(1, "rgba(255,255,255,0.055)");
        ctx.beginPath();
        ctx.roundRect(cx - CARD_W / 2, cy - CARD_H / 2, CARD_W, CARD_H, 7);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.17)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.82)";
        ctx.font = "500 11px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(allLabels[i], cx, cy);
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 4,
        pointerEvents: "none",
      }}
    />
  );
}

const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(12px) saturate(1.4)",
  WebkitBackdropFilter: "blur(12px) saturate(1.4)",
  border: "1px solid rgba(255,255,255,0.55)",
  boxShadow: "0 8px 32px rgba(22,28,38,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
};

export default function HomePage() {
  useScrollReveal();
  const [graphicReady, setGraphicReady] = useState(false);

  useEffect(() => {
    setGraphicReady(true);
  }, []);

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at 12% 8%, rgba(91,125,186,0.06), transparent 22%), radial-gradient(circle at 88% 14%, rgba(121,161,229,0.04), transparent 20%), #f5f4f1",
        color: "var(--text)",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <PlexusBg />

      <section style={{ padding: "86px 20px 0", position: "relative", zIndex: 1 }}>
        <div
          className="hero-card"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(102,142,214,0.16), transparent 28%), radial-gradient(circle at 88% 24%, rgba(88,130,214,0.12), transparent 26%), linear-gradient(180deg, #191c24 0%, #151821 100%)",
            borderRadius: 28,
            minHeight: 660,
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1.08fr",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 36px 90px rgba(15,18,25,0.22)",
          }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, zIndex: 0 }} />
          <div
            style={{
              position: "relative",
              zIndex: 3,
              padding: "72px 32px 72px 52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              className="pill-tag"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.48)",
                marginBottom: 28,
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.42)",
                  display: "inline-block",
                }}
              />
              Operational Software for Growing Businesses
            </div>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(3rem, 5vw, 5.4rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "#fff",
                marginBottom: 24,
                maxWidth: 520,
              }}
            >
              Software that{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "rgba(188,208,255,0.96)",
                  textShadow:
                    "0 0 18px rgba(125,171,255,0.42), 0 0 42px rgba(125,171,255,0.18)",
                  animation: "adaptsGlow 2.8s ease-in-out infinite",
                }}
              >
                adapts
              </em>
              <br />
              to your business.
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.12rem)",
                color: "rgba(255,255,255,0.56)",
                lineHeight: 1.85,
                maxWidth: 470,
                marginBottom: 38,
              }}
            >
              We replace rigid, expensive software with operational systems
              designed around how your business actually runs, with one
              intelligent layer across projects, teams, field work, and reporting.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  background: "#efe4cc",
                  color: "#17181B",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book a Discovery Call
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
            </div>
          </div>

          <div style={{ position: "relative", minHeight: 660 }}>
            {graphicReady ? <HeroWorkflowGraphic /> : null}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="problem-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
          >
            <div className="fade-section">
              <div
                className="pill-tag"
                style={{
                  ...glassCard,
                  color: "var(--text-soft)",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--text-soft)",
                    display: "inline-block",
                  }}
                />
                The Problem
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.95rem, 3.5vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginBottom: 24,
                }}
              >
                Your operations are unique.
                <br />
                <span style={{ color: "var(--text-soft)", fontStyle: "italic" }}>
                  Your software isn&apos;t.
                </span>
              </h2>
              <p
                style={{
                  color: "var(--text-soft)",
                  lineHeight: 1.88,
                  fontSize: "0.98rem",
                  marginBottom: 16,
                  maxWidth: 560,
                }}
              >
                Off-the-shelf platforms were designed for the average business,
                which means they fit nobody perfectly. You end up bending your
                workflows to match your software instead of the other way around.
              </p>
              <p
                style={{
                  color: "var(--text-soft)",
                  lineHeight: 1.88,
                  fontSize: "0.98rem",
                  maxWidth: 560,
                }}
              >
                The result is fragmented operations, manual workarounds, and a
                team spending too much energy managing tools instead of managing
                the business.
              </p>
            </div>

            <div
              className="fade-section"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {[
                "Generic platforms that force you to work around them",
                "Expensive enterprise tools built for companies 10x your size",
                "Disconnected tools requiring manual data entry between systems",
                "No visibility into your actual operations across teams",
              ].map((item) => (
                <div
                  key={item}
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
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-2px)";
                    event.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(22,28,38,0.06)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(22,28,38,0.06)";
                  }}
                >
                  <span
                    style={{
                      color: "var(--red)",
                      fontSize: "0.85rem",
                      marginTop: 1,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </span>
                  <p
                    style={{
                      color: "var(--text-mid)",
                      fontSize: "0.92rem",
                      lineHeight: 1.68,
                      margin: 0,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div
          className="fade-section"
          style={{
            background:
              "radial-gradient(circle at 20% 18%, rgba(101,142,214,0.16), transparent 26%), linear-gradient(180deg, #181b24 0%, #14171f 100%)",
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
            <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 64px" }}>
              <div
                className="pill-tag"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.45)",
                    display: "inline-block",
                  }}
                />
                The Novum Approach
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.95rem, 3.6vw, 3rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  marginBottom: 18,
                  color: "#fff",
                }}
              >
                Systems built around how you actually run.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.54)",
                  lineHeight: 1.82,
                  fontSize: "0.98rem",
                }}
              >
                We start with your operation, not a generic template. Every
                system is structured around your workflows, team, reporting
                needs, and business model.
              </p>
            </div>

            <div
              className="solution-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
            >
              {[
                {
                  title: "Mapped to your operations",
                  desc: "We document how your business works before building anything. The result reflects your reality, not a generic software pattern.",
                },
                {
                  title: "Fast to deploy, built to last",
                  desc: "You get a working operational layer quickly, built on a structure that can evolve with your business as complexity increases.",
                },
                {
                  title: "One system, not many tools",
                  desc: "We consolidate projects, communication, reporting, scheduling, and workflows into one coherent operating system.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: 32,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor = "rgba(122,166,255,0.28)";
                    event.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    event.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    event.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    event.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      marginBottom: 20,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.16rem",
                      marginBottom: 12,
                      letterSpacing: "-0.01em",
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.92rem",
                      lineHeight: 1.76,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="fade-section"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div
                className="pill-tag"
                style={{
                  ...glassCard,
                  color: "var(--text-soft)",
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--text-soft)",
                    display: "inline-block",
                  }}
                />
                Our Systems
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.95rem, 3.5vw, 3rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                }}
              >
                Every operation covered.
                <br />
                One platform.
              </h2>
            </div>
            <Link href="/systems" className="btn-outline">
              View All Systems →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                name: "Forge",
                badge: "Fully Custom",
                badgeColor: "#7756C9",
                badgeBg: "rgba(119,86,201,0.08)",
                badgeBorder: "rgba(119,86,201,0.18)",
                desc: "For operations that do not fit any mold. Forge is architected from the ground up around your structure, workflows, terminology, and reporting logic.",
                features: [
                  "Custom operational architecture",
                  "Tailored data model",
                  "Workflow engine",
                  "White-glove deployment",
                ],
              },
              {
                name: "OpsCore",
                badge: "Operations Hub",
                badgeColor: "var(--accent)",
                badgeBg: "rgba(69,99,145,0.08)",
                badgeBorder: "rgba(69,99,145,0.2)",
                desc: "A unified command center for tasks, communication, projects, budgets, reporting, and integrations. OpsCore creates structure across the entire business.",
                features: [
                  "AI task generation",
                  "Team chat and notes",
                  "Project calendars and tasks",
                  "QuickBooks and CRM integrations",
                  "Role dashboards",
                  "Workflow automation",
                ],
              },
              {
                name: "FieldOps",
                badge: "Field Service",
                badgeColor: "#237259",
                badgeBg: "rgba(35,114,89,0.08)",
                badgeBorder: "rgba(35,114,89,0.18)",
                desc: "Field service management built around your crews, territories, scheduling model, and invoicing process from dispatch through completion.",
                features: [
                  "Scheduling and dispatch",
                  "Mobile field access",
                  "Automated invoicing",
                  "Customer history",
                ],
              },
              {
                name: "ProjectOps",
                badge: "Project-Based",
                badgeColor: "#2D5599",
                badgeBg: "rgba(45,85,153,0.08)",
                badgeBorder: "rgba(45,85,153,0.18)",
                desc: "Project lifecycle management from estimate to closeout, with live budget visibility, timeline tracking, document workflows, and profitability reporting.",
                features: [
                  "Budget vs actuals",
                  "Vendor management",
                  "Milestone tracking",
                  "Document workflows",
                  "Profitability reporting",
                ],
              },
            ].map((system) => (
              <div
                key={system.name}
                className="sys-row fade-section"
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
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = "rgba(69,99,145,0.22)";
                  event.currentTarget.style.boxShadow = "0 16px 38px rgba(22,28,38,0.08)";
                  event.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                  event.currentTarget.style.boxShadow = "0 8px 32px rgba(22,28,38,0.06)";
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.74rem",
                      letterSpacing: "-0.03em",
                      marginBottom: 10,
                      color: "var(--text)",
                    }}
                  >
                    {system.name}
                  </h3>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      background: system.badgeBg,
                      border: `1px solid ${system.badgeBorder}`,
                      borderRadius: "999px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: system.badgeColor,
                    }}
                  >
                    {system.badge}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--text-soft)",
                      fontSize: "0.92rem",
                      lineHeight: 1.78,
                      marginBottom: 14,
                    }}
                  >
                    {system.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {system.features.map((feature) => (
                      <span
                        key={feature}
                        style={{
                          padding: "4px 12px",
                          background: "rgba(255,255,255,0.52)",
                          border: "1px solid rgba(229,225,216,0.92)",
                          borderRadius: 8,
                          fontSize: "0.77rem",
                          color: "var(--text-soft)",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/systems"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(229,225,216,0.9)",
                    borderRadius: 12,
                    color: "var(--text-soft)",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            ...glassCard,
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "72px 60px",
            borderRadius: 24,
          }}
        >
          <div className="fade-section" style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              className="pill-tag"
              style={{
                ...glassCard,
                color: "var(--text-soft)",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--text-soft)",
                  display: "inline-block",
                }}
              />
              How It Works
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(1.95rem, 3.5vw, 3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              From discovery to deployed, in three steps.
            </h2>
          </div>

          <div
            className="process-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              position: "relative",
            }}
          >
            <div
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
              {
                step: "01",
                title: "Discovery",
                desc: "We spend time with your team to understand how the business actually runs, where the friction lives, and what information matters.",
              },
              {
                step: "02",
                title: "System Design",
                desc: "We architect the operational model around your workflows so you can see exactly what is being built before it gets deployed.",
              },
              {
                step: "03",
                title: "Build & Deploy",
                desc: "We configure, ship, and launch your system with training, handoff, and continued support once it is live.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="fade-section"
                style={{ textAlign: "center", padding: "0 20px" }}
              >
                <div
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
                    transition: "border-color 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor = "var(--accent-border)";
                    event.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                    event.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span
                    className="font-serif"
                    style={{
                      fontSize: "1.45rem",
                      color: "var(--accent)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "1.3rem",
                    marginBottom: 14,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-soft)",
                    fontSize: "0.92rem",
                    lineHeight: 1.82,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 24px 88px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          className="fade-section"
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "76px 64px",
            background:
              "radial-gradient(circle at 20% 15%, rgba(96,138,214,0.16), transparent 28%), linear-gradient(180deg, #171b24 0%, #141821 100%)",
            borderRadius: 28,
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 28px 70px rgba(15,18,25,0.18)",
          }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              className="pill-tag"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.45)",
                  display: "inline-block",
                }}
              />
              Ready to Build
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                marginBottom: 20,
                color: "#fff",
              }}
            >
              Stop adapting to your software.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.56)",
                fontSize: "1rem",
                lineHeight: 1.82,
                marginBottom: 44,
              }}
            >
              Book a discovery call and let&apos;s map out what an operational
              system built specifically for your business could look like.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  padding: "15px 32px",
                  borderRadius: "999px",
                  background: "#FFFFFF",
                  color: "var(--text)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book a Discovery Call →
              </Link>
              <Link
                href="/systems"
                style={{
                  padding: "15px 28px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.72)",
                  background: "transparent",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Explore Systems
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes adaptsGlow {
          0%, 100% { text-shadow: 0 0 18px rgba(125,171,255,0.42), 0 0 42px rgba(125,171,255,0.18); }
          50% { text-shadow: 0 0 32px rgba(125,171,255,0.85), 0 0 70px rgba(125,171,255,0.45), 0 0 100px rgba(125,171,255,0.2); }
        }

        .hero-card {
          grid-template-columns: 1fr 1.08fr;
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
