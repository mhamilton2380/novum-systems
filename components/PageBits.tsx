import Link from "next/link";
import type { ReactNode } from "react";

// `side` sits in a column next to the copy; `below` gets the full width under it (for a hero video).
export function PageHero({ eyebrow, title, sub, side, below, ctas = true }: {
  eyebrow: string; title: ReactNode; sub: ReactNode; side?: ReactNode; below?: ReactNode; ctas?: boolean;
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
        {below && <div className="h-phero-below">{below}</div>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Start with a discovery.", body = "Your workflow mapped, every tool audited, and your first build live on your own data within 30 days. The discovery fee counts toward whatever comes next." }: { title?: string; body?: string }) {
  return (
    <section className="h-sec">
      <div className="h-wrap">
        <div className="h-cta">
          <h2>{title}</h2>
          <p>{body}</p>
          <Link href="/contact" className="h-btn h-btn-light">Book a conversation</Link>
          <p className="h-cta-meta">The first call is free. Discovery is quoted in writing before it starts.</p>
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
