"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/PageVisuals";

// AI Officer: how the build queue works. Ask for anything; builds go live one after another (Growth: 1 at a time, Pro: 2).
// A small loop: every tick the in-progress builds advance, finished ones move to Live, the next ones start.
const ITEMS: { t: string; k: string; icon: IconName }[] = [
  { t: "Intake assistant", k: "Assistant", icon: "ai" },
  { t: "CRM to accounting sync", k: "Integration", icon: "link" },
  { t: "Quote drafting agent", k: "Agent", icon: "bot" },
  { t: "Scheduling tool, replaced", k: "Replacement", icon: "move" },
  { t: "Weekly report agent", k: "Agent", icon: "bot" },
  { t: "Documents searchable by role", k: "Assistant", icon: "doc" },
  { t: "Invoice follow-up agent", k: "Agent", icon: "bot" },
];
const STEPS = 3; // ticks per build
const TICK = 1100;

export function BuildQueue() {
  const [plan, setPlan] = useState<1 | 2>(1);
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setT((n) => n + 1), TICK);
    return () => clearInterval(id);
  }, []);
  const total = Math.ceil(ITEMS.length / plan) * STEPS + 3; // loop length, with a short hold when everything is live
  const tt = t % total;
  const done = Math.min(ITEMS.length, Math.floor(tt / STEPS) * plan);
  const step = tt % STEPS;
  const working = done >= ITEMS.length ? [] : ITEMS.slice(done, done + plan);
  const queue = ITEMS.slice(done + working.length);
  const live = ITEMS.slice(0, done).reverse();
  const pick = (p: 1 | 2) => { setPlan(p); setT(0); };
  return (
    <div className="pv-q">
      <div className="pv-q-top">
        <div><strong>Your build queue</strong><small>Example month</small></div>
        <div className="pv-q-toggle" role="tablist" aria-label="Plan">
          <button role="tab" aria-selected={plan === 1} className={plan === 1 ? "on" : ""} onClick={() => pick(1)}>Growth</button>
          <button role="tab" aria-selected={plan === 2} className={plan === 2 ? "on" : ""} onClick={() => pick(2)}>Pro</button>
        </div>
      </div>
      <div className="pv-q-cols">
        <div className="pv-q-col">
          <div className="pv-q-h">Queue<em>No limit</em></div>
          {queue.map((it) => (
            <div className="pv-q-item" key={it.t}><span className="pv-q-ic"><Icon name={it.icon} size={16} /></span><span><small>{it.k}</small>{it.t}</span></div>
          ))}
          {!queue.length && <div className="pv-q-empty">Add the next one anytime</div>}
        </div>
        <div className="pv-q-col pv-q-work">
          <div className="pv-q-h">In progress<em>{plan === 1 ? "1 at a time" : "2 at a time"}</em></div>
          {working.map((it) => (
            <div className="pv-q-item on" key={it.t}>
              <span className="pv-q-ic"><Icon name={it.icon} size={16} /></span>
              <span><small>{it.k}</small>{it.t}<i className="pv-q-bar"><b style={{ width: `${((step + 1) / STEPS) * 100}%` }} /></i></span>
            </div>
          ))}
          {!working.length && <div className="pv-q-empty">Everything is live</div>}
        </div>
        <div className="pv-q-col">
          <div className="pv-q-h">Live<em>In use</em></div>
          {live.map((it) => (
            <div className="pv-q-item done" key={it.t}><span className="pv-q-ok" aria-hidden="true">✓</span><span><small>{it.k}</small>{it.t}</span></div>
          ))}
        </div>
      </div>
      <p className="pv-q-foot">Each build is live and your team is trained on it before the next one starts. Bigger projects, like replacing a platform, go live in steps.</p>
    </div>
  );
}
