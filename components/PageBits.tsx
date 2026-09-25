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

export function CtaBand({ title = "Tell us what you pay for today.", body = "Send us your software stack and what it costs. We'll tell you what we'd replace, what we'd connect, and where AI would do the work." }: { title?: string; body?: string }) {
  return (
    <section className="h-sec">
      <div className="h-wrap">
        <div className="h-cta">
          <h2>{title}</h2>
          <p>{body}</p>
          <Link href="/contact" className="h-btn h-btn-light">Book a conversation</Link>
          <p className="h-cta-meta">No obligation. No sales deck.</p>
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
