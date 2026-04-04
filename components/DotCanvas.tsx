"use client";
import { useEffect, useRef } from "react";

export default function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const SPACING = 22, DOT_R = 1.1;
    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    function tick(ts: number) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      const cx = canvas!.width * 0.5, cy = canvas!.height * 0.5;
      const wt = ts * 0.00045;
      const cols = Math.ceil(canvas!.width / SPACING) + 1;
      const rows = Math.ceil(canvas!.height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING, y = r * SPACING;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const wave = Math.sin(wt * 1.6 - dist * 0.026) * 0.5 + 0.5;
          const a = 0.08 + 0.52 * wave * wave;
          ctx.beginPath();
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,200,122,${a})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
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
