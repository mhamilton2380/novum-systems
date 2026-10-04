import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, sub, side, ctas = true }: {
  eyebrow: string; title: ReactNode; sub: ReactNode; side?: ReactNode; ctas?: boolean;
}) {
  return (
    <section className="h-phero">
      <div className={`h-wrap${side ? " h-phero-grid" : ""}`}>
        <div>
          <div className="h-eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="h-phero-sub">{sub}</p>
          {ctas && (
            <div className="h-ctas">
              <Link href="/contact" className="h-btn h-btn-light">Book a conversation</Link>
              <Link href="/how-we-work" className="h-btn h-btn-outline-light">How we work →</Link>
            </div>
          )}
        </div>
        {side}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Start with a discovery.", body = "We spend time with your team, map how work actually moves through the business, and account for every tool you pay for. You get a written assessment of where the work breaks down, what your stack costs over five years, and what a system built around you would replace. If you build with us, the discovery fee comes off the price." }: { title?: string; body?: string }) {
  return (
    <section className="h-sec">
      <div className="h-wrap">
        <div className="h-cta">
          <h2>{title}</h2>
          <p>{body}</p>
          <Link href="/contact" className="h-btn h-btn-light">Book a conversation</Link>
          <p className="h-cta-meta">The first conversation is free. No sales deck.</p>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: ReactNode; sub?: ReactNode; center?: boolean }) {
  return (
    <div className={`h-head${center ? " h-center" : ""}`}>
      <div className="h-eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}
