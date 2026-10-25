"use client";
// Partner guide: as each question step crosses the middle of the screen, its clause in the pinned
// contract gets redlined (`.on` for the current one, `.rl-done` for every one reached) and the
// change counter updates. Without JS, or with reduced motion, every clause shows already redlined.
import { useEffect } from "react";

export function RedlineSync({ root }: { root: string }) {
  useEffect(() => {
    const box = document.querySelector<HTMLElement>(root);
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = Array.from(box.querySelectorAll<HTMLElement>(".rl-step"));
    const clauses = Array.from(box.querySelectorAll<HTMLElement>(".rl-doc .rl-clause"));
    const count = box.querySelector<HTMLElement>(".rl-count");
    const doc = box.querySelector<HTMLElement>(".rl-doc");
    box.classList.add("rl-js");
    let reached = -1;
    if (count) count.textContent = "0";
    clauses.forEach((c) => c.classList.remove("rl-done", "on"));
    const show = (i: number) => {
      reached = Math.max(reached, i);
      clauses.forEach((c, k) => { c.classList.toggle("on", k === i); c.classList.toggle("rl-done", k <= reached); });
      steps.forEach((s, k) => { s.classList.toggle("on", k === i); s.classList.toggle("seen", k <= reached); });
      if (count) count.textContent = String(reached + 1);
      // on short screens the contract is capped in height: keep the current clause in view
      const c = clauses[i];
      if (doc && c && doc.scrollHeight > doc.clientHeight) {
        // scroll only as far as needed: the clause sits below the pinned title and above the bottom edge
        const head = doc.querySelector<HTMLElement>(".paper-h")?.offsetHeight ?? 0;
        const pad = parseFloat(getComputedStyle(doc).paddingTop) || 0;
        const top = c.offsetTop - head + pad - 8;
        const bottom = c.offsetTop + c.offsetHeight + pad - doc.clientHeight + 8;
        const to = doc.scrollTop > top ? top : doc.scrollTop < bottom ? bottom : doc.scrollTop;
        if (to !== doc.scrollTop) doc.scrollTo({ top: Math.max(0, to), behavior: "smooth" });
      }
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) show(steps.indexOf(e.target as HTMLElement));
    }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach((s) => io.observe(s));
    return () => { io.disconnect(); box.classList.remove("rl-js"); };
  }, [root]);
  return null;
}
