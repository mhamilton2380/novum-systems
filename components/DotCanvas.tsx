"use client";
import { useEffect, useRef } from "react";

/**
 * Animated grid background — subtle white-blue grid lines with occasional
 * pulses traveling across them. Replaces the previous green dot field.
 * Used as a section background inside dark cards (What We Deploy, CTAs, etc.).
 */
export default function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let frame = 0;

    const SPACING = 56;
    type Pulse = { axis: "h" | "v"; line: number; t: number; speed: number; alpha: number };
    const pulses: Pulse[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      pulses.length = 0;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const W = canvas.width, H = canvas.height;
      if (W < 1 || H < 1) return;
      const cols = Math.floor(W / SPACING);
      const rows = Math.floor(H / SPACING);
      if (cols < 2 || rows < 2) return;
      const axis: "h" | "v" = Math.random() < 0.5 ? "h" : "v";
      const line = axis === "h"
        ? 1 + Math.floor(Math.random() * (rows - 1))
        : 1 + Math.floor(Math.random() * (cols - 1));
      pulses.push({
        axis,
        line,
        t: 0,
        speed: 0.0018 + Math.random() * 0.0026,
        alpha: 0.5 + Math.random() * 0.4,
      });
    };

    const tick = () => {
      frame++;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Static grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(170,195,235,0.06)";
      const cols = Math.floor(W / SPACING);
      const rows = Math.floor(H / SPACING);
      for (let c = 1; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * SPACING, 0);
        ctx.lineTo(c * SPACING, H);
        ctx.stroke();
      }
      for (let r = 1; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * SPACING);
        ctx.lineTo(W, r * SPACING);
        ctx.stroke();
      }

      // Spawn pulses
      if (frame % 70 === 0 && pulses.length < 8) spawn();

      // Render pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t > 1) {
          pulses.splice(i, 1);
          continue;
        }
        const brightness = Math.sin(p.t * Math.PI);
        const t0 = Math.max(0, p.t - 0.1);

        if (p.axis === "h") {
          const y = p.line * SPACING;
          const px = p.t * W;
          const tx = t0 * W;
          const tg = ctx.createLinearGradient(tx, y, px, y);
          tg.addColorStop(0, "rgba(150,180,235,0)");
          tg.addColorStop(1, `rgba(150,180,235,${brightness * p.alpha * 0.6})`);
          ctx.beginPath();
          ctx.moveTo(tx, y);
          ctx.lineTo(px, y);
          ctx.strokeStyle = tg;
          ctx.lineWidth = 1.4;
          ctx.stroke();
          // Glow head
          const gr = ctx.createRadialGradient(px, y, 0, px, y, 12);
          gr.addColorStop(0, `rgba(200,220,255,${brightness * p.alpha * 0.7})`);
          gr.addColorStop(1, "rgba(200,220,255,0)");
          ctx.beginPath();
          ctx.arc(px, y, 12, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        } else {
          const x = p.line * SPACING;
          const py = p.t * H;
          const ty = t0 * H;
          const tg = ctx.createLinearGradient(x, ty, x, py);
          tg.addColorStop(0, "rgba(150,180,235,0)");
          tg.addColorStop(1, `rgba(150,180,235,${brightness * p.alpha * 0.6})`);
          ctx.beginPath();
          ctx.moveTo(x, ty);
          ctx.lineTo(x, py);
          ctx.strokeStyle = tg;
          ctx.lineWidth = 1.4;
          ctx.stroke();
          const gr = ctx.createRadialGradient(x, py, 0, x, py, 12);
          gr.addColorStop(0, `rgba(200,220,255,${brightness * p.alpha * 0.7})`);
          gr.addColorStop(1, "rgba(200,220,255,0)");
          ctx.beginPath();
          ctx.arc(x, py, 12, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };
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
        pointerEvents: "none",
        display: "block",
        zIndex: 1,
      }}
    />
  );
}
