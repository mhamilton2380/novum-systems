"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export type ProcessStep = { title: string; tag: string; body: string; gets: string[]; ask?: string; link?: { href: string; label: string } };

// A vertical timeline whose line fills as you scroll. Each step lights up when the line reaches it.
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0..1 fill of the line
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const frac = reduce ? 1 : Math.min(1, Math.max(0, (mid - r.top) / r.height));
      setP(frac);
      const nodes = el.querySelectorAll<HTMLElement>("[data-step]");
      let hit = -1;
      nodes.forEach((n, i) => {
        if (reduce || n.getBoundingClientRect().top < mid) hit = i;
      });
      setReached(hit);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="pt" ref={ref} style={{ ["--p" as string]: p }}>
      <div className="pt-line" aria-hidden="true"><i /></div>
      {steps.map((s, i) => (
        <div className={`pt-step${i <= reached ? " on" : ""}`} data-step key={s.title}>
          <div className="pt-node" aria-hidden="true">{i <= reached ? "✓" : i + 1}</div>
          <div className="pt-card">
            <div className="pt-head">
              <h3>{s.title}</h3>
              <span className="h-badge">{s.tag}</span>
            </div>
            <p>{s.body}</p>
            <ul className="pt-gets" aria-label={`What you get in ${s.title}`}>
              {s.gets.map((g, gi) => (
                <li key={g} style={{ ["--i" as string]: gi }}><b aria-hidden="true">✓</b>{g}</li>
              ))}
            </ul>
            {s.ask && <p className="pt-ask"><strong>What we ask of you.</strong> {s.ask}</p>}
            {s.link && <Link href={s.link.href} className="pt-link">{s.link.label} →</Link>}
          </div>
        </div>
      ))}
    </div>
  );
}
