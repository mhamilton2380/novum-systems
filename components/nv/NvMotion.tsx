"use client";
// Site-wide motion: blocks slide up the first time they scroll into view, graphics get an `.in`
// class to animate from, and inner-page headlines assemble from particles and break apart on scroll.
// Everything is skipped for visitors who ask for reduced motion.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL = [
  "main .sec .wrap > *",
  "main .phero .lead", "main .phero .ctas", "main .phero .label",
  ".caps4 > *", ".cells > *", ".finds > *", ".pace > *", ".gov > *", ".cadence > *",
  ".pgrid > *", ".mlist > *", "main table tbody tr",
].join(",");
// graphics that animate from their `.in` state (bars, charts, diagrams)
const GRAPHIC = ".proc, .paper, .ctable, .ptable, .rvo-wrap, .casecard, .panel, figure, svg, [class*='chart'], [class*='bar'], [class*='meter']";

export function NvMotion() {
  const path = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("mo");
    const main = document.querySelector("main");
    if (!main) return;

    // reveal: skip the home hero (it has its own intro) and anything already in view on load
    const els = Array.from(main.querySelectorAll<HTMLElement>(REVEAL)).filter((el) => !el.closest(".hero") && !el.closest("#home .hero"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.classList.add("in");
        el.querySelectorAll<HTMLElement>(GRAPHIC).forEach((g) => g.classList.add("in"));
        io.unobserve(el);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    for (const el of els) {
      if (el.classList.contains("rv")) continue;
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL)) : [];
      el.style.setProperty("--rv-d", `${Math.min(sibs.indexOf(el), 8) * 70}ms`);
      el.classList.add("rv");
      io.observe(el);
    }
    const cleanups: Array<() => void> = [() => io.disconnect()];

    const h1 = main.querySelector<HTMLElement>(".phero h1");
    if (h1) cleanups.push(particleHeadline(h1));
    return () => cleanups.forEach((f) => f());
  }, [path]);

  return null;
}

type P = { tx: number; ty: number; sx: number; sy: number; d: number; c: number; s: number; rb: number; sd: number; f: number; jit: number; lv: number };

function particleHeadline(h1: HTMLElement): () => void {
  const sec = h1.closest<HTMLElement>(".phero");
  if (!sec || h1.dataset.pt) return () => {};
  h1.dataset.pt = "1";
  const cs = getComputedStyle(h1);
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.className = "pt-canvas";
  canvas.setAttribute("aria-hidden", "true");
  sec.appendChild(canvas);
  h1.classList.add("pt-h1");

  let W = 0, H = 0, VW = 0, VH = 0, hcx = 0, hcy = 0, S = 0, lx = 0, lw = 0, pts: P[] = [], raf = 0, t0 = 0, dead = false;
  const ink = cs.color;

  function sample() {
    W = sec!.clientWidth; H = sec!.clientHeight; VW = innerWidth; VH = innerHeight;
    // the canvas covers the viewport so the dust can fall past the hero and off the screen
    canvas.width = VW * dpr; canvas.height = VH * dpr;
    canvas.style.width = VW + "px"; canvas.style.height = VH + "px";
    const off = document.createElement("canvas");
    off.width = W; off.height = H;
    const x = off.getContext("2d")!;
    x.fillStyle = "#fff";
    x.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    x.textBaseline = "alphabetic";
    if ("letterSpacing" in x) (x as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = cs.letterSpacing;
    // draw each word where the browser actually laid it out, so wrapping matches exactly
    const sr = sec!.getBoundingClientRect();
    const h1r = h1.getBoundingClientRect();
    hcx = h1r.left - sr.left + h1r.width * 0.45; hcy = h1r.top - sr.top + h1r.height / 2; S = h1r.height;
    // the gradient rule along the bottom of the hero is the line the dust settles on, like the home horizon
    const wrap = h1.closest<HTMLElement>(".wrap")!, wr = wrap.getBoundingClientRect(), ws = getComputedStyle(wrap);
    lx = wr.left - sr.left + parseFloat(ws.paddingLeft); lw = wr.width - parseFloat(ws.paddingLeft) - parseFloat(ws.paddingRight);
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    const fs = parseFloat(cs.fontSize);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const text = n.textContent || "";
      const re = /\S+/g;
      for (let m = re.exec(text); m; m = re.exec(text)) {
        range.setStart(n, m.index); range.setEnd(n, m.index + m[0].length);
        const r = range.getClientRects()[0];
        if (!r) continue;
        const base = r.top - sr.top + (r.height + fs * 0.72) / 2;
        x.fillText(m[0], r.left - sr.left, base);
      }
    }
    const data = x.getImageData(0, 0, W, H).data;
    const step = 2;
    pts = [];
    for (let y = 0; y < H; y += step) for (let xx = 0; xx < W; xx += step) {
      if (data[(y * W + xx) * 4 + 3] < 128) continue;
      const a = Math.random() * Math.PI * 2, r = 60 + Math.random() * Math.max(W, H) * 0.5;
      pts.push({
        tx: xx, ty: y,
        sx: xx + Math.cos(a) * r, sy: y + Math.sin(a) * r * 0.6,
        d: Math.random() * 0.35, c: Math.random(), s: 0.8 + Math.random() * 0.8,
        rb: Math.floor(Math.random() * 7), sd: Math.random(), f: Math.random(), jit: Math.random() - 0.5, lv: Math.random() - 0.5,
      });
    }
  }

  const ease = (v: number) => 1 - Math.pow(1 - v, 3);
  const ease2 = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
  const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const G = [0, 179, 110], B = [59, 111, 224];
  const INK = (ink.match(/\d+/g) || ["238", "240", "234"]).slice(0, 3).map(Number);
  const mix = (a: number[], b: number[], k: number) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

  function frame(now: number) {
    if (dead || !canvas.isConnected) return;
    const ctx = canvas.getContext("2d")!;
    const t = (now - t0) / 1000;
    const oy = sec!.getBoundingClientRect().top;          // section to viewport offset
    // same fall as the home N: progress runs from the first scroll until the hero's bottom line sits mid-screen
    const p = clamp(scrollY / Math.max(160, H - VH * 0.46));
    const built = clamp((t - 1.5) / 0.35);              // real text fades in after assembly
    h1.style.setProperty("--pt-o", String(built * (1 - clamp(p * 18))));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, VW, VH);
    const show = 1 - built * (1 - clamp(p * 18));        // canvas visible while assembling or breaking
    // everything fades once the line passes the upper part of the screen
    const fade = clamp((H + oy - VH * 0.12) / (VH * 0.32));
    if (show > 0.01 && fade > 0.001) {
      ctx.globalCompositeOperation = "lighter";
      const ly = H - 1;
      for (const q of pts) {
        const k = ease(clamp((t - q.d) / 1.15));
        const nx = q.sx + (q.tx - q.sx) * k, ny = q.sy + (q.ty - q.sy) * k;
        let x: number, y: number, c: number[], a: number;
        const na = 0.2 + 0.6 * k;
        const nc = k < 1 && q.c < 0.25 ? (q.c < 0.12 ? G : B) : INK;
        // the line: a fine luminous rule, slowly flowing
        const f = (q.f + t * 0.012 * (0.6 + q.sd)) % 1;
        const hx = lx + f * lw, hy = ly + q.lv * 1.6 + Math.sin(f * 14 + t * 0.8 + q.sd * 6) * 0.6;
        const hc = mix(G, B, f), ha = (0.25 + 0.35 * q.sd) * Math.sin(Math.PI * f);
        // the fall: burst out of the words, seven fine ribbons peel off in turn and settle on the line
        const pp = ease2(clamp((p - (q.rb * 0.05 + q.sd * 0.1)) / 0.6));
        if (pp <= 0) { x = nx; y = ny; c = nc; a = na; }
        else if (pp >= 1) { x = hx; y = hy; c = hc; a = ha; }
        else {
          const bx = nx - hcx, by = ny - hcy, bl = Math.hypot(bx, by) + 1;
          const burst = Math.sin(Math.min(1, pp * 3) * Math.PI) * S * (0.3 + q.sd * 0.3);
          const side = VW < 700 ? (q.rb % 2 ? 1 : -1) * 0.2 : (q.rb - 3) * 0.045 + 0.06;
          const c1x = hcx + side * W + q.jit * 28, c1y = hcy + S * 0.75 + q.jit * 36;
          const c2x = lx + lw * (0.55 + q.rb * 0.06), c2y = ly - VH * 0.3 + q.jit * 36;
          const w = 1 - pp, b0 = w * w * w, b1 = 3 * w * w * pp, b2 = 3 * w * pp * pp, b3 = pp * pp * pp;
          x = b0 * nx + b1 * c1x + b2 * c2x + b3 * hx + (bx / bl) * burst;
          y = b0 * ny + b1 * c1y + b2 * c2y + b3 * hy + (by / bl) * burst;
          const glow = Math.sin(pp * Math.PI);
          c = mix(mix(nc, mix(G, B, q.rb / 6), glow * 0.8), hc, pp * pp);
          a = na + (ha - na) * pp + 0.4 * glow;
        }
        ctx.globalAlpha = Math.min(1, a) * show * fade;
        ctx.fillStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
        ctx.fillRect(x, y + oy, q.s, q.s);
      }
    }
    raf = requestAnimationFrame(frame);
  }

  const start = () => { sample(); t0 = performance.now(); raf = requestAnimationFrame(frame); };
  if (document.fonts?.ready) document.fonts.ready.then(() => !dead && start()); else start();
  let rt = 0;
  const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { if (!dead) { sample(); t0 = performance.now() - 3000; } }, 200); };
  addEventListener("resize", onResize);

  return () => {
    dead = true; cancelAnimationFrame(raf); removeEventListener("resize", onResize);
    canvas.remove(); h1.classList.remove("pt-h1"); h1.style.removeProperty("--pt-o"); delete h1.dataset.pt;
  };
}
