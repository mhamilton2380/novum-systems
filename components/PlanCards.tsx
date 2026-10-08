import Link from "next/link";
import { CARD_ROWS, PLANS, TERMS, planLines, startHref } from "@/lib/aiOfficerPlans";

export function PlanCards() {
  return (
    <div className="h-plans">
      {PLANS.map((p) => {
        return (
          <div className={`h-plan${p.id === "growth" ? " h-plan-hi" : ""}`} key={p.id} style={{ gridRow: `span ${CARD_ROWS}` }}>
            <span className="h-card2-tag">{p.name}</span>
            <p className="h-plan-terms">
              {p.startable ? TERMS : "Scoped to your team after a discovery."}
            </p>
            <p className="h-plan-pitch">{p.pitch}</p>
            <Link href={startHref(p)} className={`h-btn ${p.id === "growth" ? "h-btn-primary" : "h-btn-ghost"} h-plan-cta`}>
              {p.startable ? `Start ${p.name} with a discovery` : "Talk to us"}
            </Link>
            {planLines(p.id).flatMap((g) => [
              <h4 className="h-plan-h" key={g.group}>{g.group}</h4>,
              ...g.lines.map((l) => (
                <div className={`h-plan-row${l.included ? "" : " out"}`} key={l.text}>
                  <span aria-hidden="true">{l.included ? "✓" : "–"}</span>
                  {l.text}
                  {!l.included && <span className="sr-only"> (not included)</span>}
                </div>
              )),
            ])}
          </div>
        );
      })}
    </div>
  );
}
