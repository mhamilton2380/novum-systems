import Link from "next/link";
import { PLANS, firstYear, signupHref, usd } from "@/lib/aiOfficerPlans";

export function PlanCards() {
  return (
    <div className="h-plans">
      {PLANS.map((p) => {
        const year = firstYear(p);
        return (
          <div className={`h-plan${p.id === "growth" ? " h-plan-hi" : ""}`} key={p.id}>
            <span className="h-card2-tag">{p.name}</span>
            <div className="h-plan-price">
              {p.monthly ? <><strong>{usd(p.monthly)}</strong><span>/month</span></> : <strong>Custom</strong>}
            </div>
            <p className="h-plan-terms">
              {year ? <>12-month plan, first 2 months free. {usd(year)} for the year.</> : <>Scoped to your team after a discovery.</>}
            </p>
            <p className="h-plan-pitch">{p.pitch}</p>
            <ul className="h-checks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <Link href={signupHref(p)} className={`h-btn ${p.selfServe ? "h-btn-primary" : "h-btn-ghost"} h-plan-cta`}>
              {p.selfServe ? `Sign up for ${p.name}` : p.id === "pro" ? "Start with a discovery" : "Talk to us"}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
