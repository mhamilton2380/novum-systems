import type { ReactNode } from "react";
import "./lg.css";

export type LegalSection = { h: string; body: ReactNode };

// Placeholder marker: shows clearly in the draft and is easy to search for.
export const PH = ({ children }: { children: ReactNode }) => <span className="lg-ph">[{children}]</span>;

export function Legal({ label, title, lead, updated, sections }: { label: string; title: string; lead: string; updated: string; sections: LegalSection[] }) {
  return (
    <main>
      <section className="phero">
        <div className="wrap">
          <div className="label">{label}</div>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <span className="lg-draft">Draft: pending legal review</span>
        </div>
      </section>
      <section className="sec light">
        <div className="wrap">
          <div className="lg-doc">
            <p className="lg-meta" style={{ marginTop: 0 }}>Draft: pending legal review. Last updated {updated}.</p>
            {sections.map((s) => (
              <section key={s.h}><h2>{s.h}</h2>{s.body}</section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
