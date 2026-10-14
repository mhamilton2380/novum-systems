"use client";

import { Icon, type IconName } from "@/components/PageVisuals";

// ─── hero card: a week with your AI Officer ─────────────────────────────────
const WEEK: { t: string; d: string; s: string; icon: IconName }[] = [
  { t: "Agent live", d: "Renewal quote drafts, held for approval", s: "Live", icon: "bot" },
  { t: "Training", d: "Sales team learns the new assistant on live deals", s: "Done", icon: "users" },
  { t: "New AI tested", d: "Meeting-notes tool, trialed on your data", s: "Kept", icon: "ai" },
  { t: "Tool audit", d: "Two unused subscriptions flagged to cut", s: "Saved", icon: "coin" },
];

export function OfficerHeroCard() {
  return (
    <div className="h-phero-card oc-hero oc-hero-ic" aria-label="Example week with an AI Officer">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Your AI Officer</strong>
        <em>Example week</em>
      </div>
      <ul>
        {WEEK.map((w, i) => (
          <li key={w.t} style={{ ["--i" as string]: i }}>
            <span className="hx-ic"><Icon name={w.icon} size={18} /><b aria-hidden="true">✓</b></span>
            <span><strong>{w.t}</strong><small>{w.d}</small></span>
            <i>{w.s}</i>
          </li>
        ))}
      </ul>
      <div className="hx-meter" aria-hidden="true">
        <span>Building next: CRM to accounting sync</span><b>In progress</b>
        <div><i style={{ ["--w" as string]: "64%" }} /></div>
      </div>
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
