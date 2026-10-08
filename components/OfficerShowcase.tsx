"use client";

import { useState } from "react";

// ─── hero card: a week with your AI Officer ─────────────────────────────────
const WEEK = [
  { t: "Training", d: "Sales team learns the new assistant on live deals", s: "Done" },
  { t: "Agent live", d: "Renewal quote drafts, held for approval", s: "Live" },
  { t: "New AI tested", d: "Meeting-notes tool, trialed on your data", s: "Kept" },
  { t: "Tool audit", d: "Two unused subscriptions flagged to cut", s: "Saved" },
];

export function OfficerHeroCard() {
  return (
    <div className="h-phero-card oc-hero" aria-label="Example week with an AI Officer">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Your AI Officer</strong>
        <em>Example week</em>
      </div>
      <ul>
        {WEEK.map((w, i) => (
          <li key={w.t} style={{ ["--i" as string]: i }}>
            <b aria-hidden="true">✓</b>
            <span><strong>{w.t}</strong><small>{w.d}</small></span>
            <i>{w.s}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── a month on Growth or Pro ───────────────────────────────────────────────
type Bar = { label: string; from: number; to: number; tone?: "blue" | "soft" };
type Plan = { id: "growth" | "pro"; name: string; note: string; rows: { name: string; bars: Bar[] }[]; facts: string[] };

const PLANS: Plan[] = [
  {
    id: "growth",
    name: "Growth",
    note: "One build in progress at a time.",
    rows: [
      { name: "Training", bars: [{ label: "Team session", from: 1, to: 1 }, { label: "Team session", from: 3, to: 3 }] },
      { name: "Build lane", bars: [{ label: "Intake assistant", from: 1, to: 2, tone: "blue" }, { label: "CRM to accounting sync", from: 3, to: 4, tone: "blue" }] },
      { name: "Support", bars: [{ label: "Answers within 1 business day", from: 1, to: 4, tone: "soft" }] },
      { name: "Reviews", bars: [{ label: "Quarterly tool audit", from: 4, to: 4 }] },
    ],
    facts: ["2 training sessions a month", "1 build at a time", "Quarterly tool audit"],
  },
  {
    id: "pro",
    name: "Pro",
    note: "A dedicated AI Officer, and two builds at once.",
    rows: [
      { name: "Training", bars: [1, 2, 3, 4].map((w) => ({ label: "Weekly session", from: w, to: w })) },
      { name: "Build lane 1", bars: [{ label: "Intake assistant", from: 1, to: 2, tone: "blue" }, { label: "CRM to accounting sync", from: 3, to: 4, tone: "blue" }] },
      { name: "Build lane 2", bars: [{ label: "Quote agent", from: 1, to: 2, tone: "blue" }, { label: "Reporting agent", from: 3, to: 4, tone: "blue" }] },
      { name: "Support", bars: [{ label: "Office hours and same-day answers", from: 1, to: 4, tone: "soft" }] },
      { name: "Reviews", bars: [{ label: "Roadmap call", from: 1, to: 1 }, { label: "Quarterly tool audit", from: 4, to: 4 }] },
    ],
    facts: ["Weekly sessions and office hours", "2 builds at a time", "Monthly roadmap call"],
  },
];

export function MonthView() {
  const [id, setId] = useState<"growth" | "pro">("growth");
  const plan = PLANS.find((p) => p.id === id)!;
  return (
    <div className="oc-month">
      <div className="oc-month-top">
        <div className="oc-seg" role="tablist" aria-label="Compare a month on each plan">
          {PLANS.map((p) => (
            <button key={p.id} role="tab" aria-selected={id === p.id} className={id === p.id ? "on" : ""} onClick={() => setId(p.id)}>
              {p.name}
            </button>
          ))}
        </div>
        <p className="oc-month-note" aria-live="polite">{plan.note}</p>
        <span className="oc-month-ex">Example month</span>
      </div>

      <div className="oc-scroll"><div className="oc-grid" key={plan.id} role="table" aria-label={`A month on ${plan.name}`}>
        <div className="oc-weeks" role="row">
          <span />
          {[1, 2, 3, 4].map((w) => <span key={w} role="columnheader">Week {w}</span>)}
        </div>
        {plan.rows.map((r, ri) => (
          <div className="oc-row" key={r.name} role="row">
            <span className="oc-rname" role="rowheader">{r.name}</span>
            <div className="oc-lane">
              {r.bars.map((b, bi) => (
                <span
                  key={b.label + b.from}
                  role="cell"
                  className={`oc-bar${b.tone ? ` ${b.tone}` : ""}`}
                  style={{ gridColumn: `${b.from} / ${b.to + 1}`, ["--d" as string]: `${(ri * 3 + bi) * 0.12}s` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div></div>

      <ul className="oc-facts">
        {plan.facts.map((f) => <li key={f}>{f}</li>)}
      </ul>
    </div>
  );
}

// ─── role cards with icons ──────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  train: "M3 8l9-4 9 4-9 4zM7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5",
  ai: "M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z",
  queue: "M4 6h16M4 12h10M4 18h6",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  swap: "M7 7h11l-3-3M17 17H6l3 3",
  shield: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4",
};

export function RoleCards({ items }: { items: { icon: keyof typeof ICONS; title: string; body: string }[] }) {
  return (
    <div className="oc-roles">
      {items.map((m, i) => (
        <div className="oc-role rv-item" key={m.title} style={{ ["--i" as string]: i }}>
          <span className="oc-role-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[m.icon]} /></svg>
          </span>
          <h3>{m.title}</h3>
          <p>{m.body}</p>
        </div>
      ))}
    </div>
  );
}
