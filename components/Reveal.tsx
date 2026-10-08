"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Fades and lifts its children in the first time they scroll into view. Children can stagger
// with style={{ "--i": n }} on any element carrying the .rv-item class.
export function Reveal({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={style} className={`rv${seen ? " in" : ""} ${className}`}>{children}</div>;
}
