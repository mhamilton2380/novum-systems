import Link from "next/link";
import { FEATURES, PLANS, TERMS, startHref } from "@/lib/aiOfficerPlans";

const cell = (v: string | boolean) => (typeof v === "string" ? <span className="pc-cell-t">{v}</span> : v ? <span className="pc-yes" aria-label="Included">✓</span> : <span className="pc-no" aria-label="Not included">–</span>);

export function PlanCards() {
  return (
    <div>
      <div className="pc-grid">
        {PLANS.map((p, i) => (
          <div className={`pc-card ${p.id}`} key={p.id} style={{ ["--i" as string]: i }}>
            {p.badge && <span className="pc-badge">{p.badge}</span>}
            <span className="pc-tag">{p.tagline}</span>
            <h3>{p.name}</h3>
            <div className="pc-lanes" aria-label={p.lanesLabel}>
              <div className="pc-lane-bars" aria-hidden="true">
                {Array.from({ length: p.lanes }).map((_, n) => <i key={n} style={{ ["--n" as string]: n }} />)}
              </div>
              <span>{p.lanesLabel}</span>
            </div>
            <ul className="pc-points">
              {p.points.map((x) => <li key={x}><b aria-hidden="true">✓</b>{x}</li>)}
            </ul>
            <p className="pc-terms">{p.startable ? TERMS : "Scoped to your team after a discovery."}</p>
            <Link href={startHref(p)} className="pc-cta">{p.startable ? "Start with a discovery" : "Talk to us"} <i aria-hidden="true">→</i></Link>
          </div>
        ))}
      </div>

      <details className="pc-compare">
        <summary>Compare every feature</summary>
        <div className="pc-table-wrap">
          <table className="pc-table">
            <thead>
              <tr><th scope="col"><span className="sr-only">Feature</span></th>{PLANS.map((p) => <th scope="col" key={p.id}>{p.name}</th>)}</tr>
            </thead>
            {FEATURES.map((g) => (
              <tbody key={g.group}>
                <tr className="pc-group"><th colSpan={4}>{g.group}</th></tr>
                {g.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.v.map((c, i) => <td key={i}>{cell(c)}</td>)}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </details>
    </div>
  );
}
