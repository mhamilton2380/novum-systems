"use client";
// Adds `.in` to each element matching `selector` the first time it scrolls into view.
// For graphics inside a tall block (NvMotion marks the whole block at once, so rows far below the fold would animate unseen).
import { useEffect } from "react";

export function RowReveal({ selector }: { selector: string }) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.2 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return null;
}
