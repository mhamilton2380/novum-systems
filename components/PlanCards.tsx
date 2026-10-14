import { INCLUDED } from "@/lib/aiOfficerPlans";

// AI Officer: everything the engagement covers, in four groups. No tiers (decided 2026-10-13).
export function IncludedList() {
  return (
    <div className="inc-grid">
      {INCLUDED.map((g) => (
        <div className="inc-card" key={g.group}>
          <h3>{g.group}</h3>
          <ul>
            {g.items.map((t) => (
              <li key={t}><b aria-hidden="true">✓</b>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
