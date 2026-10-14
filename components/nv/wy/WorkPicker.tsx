"use client";

// Why AI: the page's one interactive element. Pick a kind of work, see the measured result.
// Figures from "How Much Faster AI Makes the Work" (2026-10-08). Company results and estimates are labeled.
import { useState } from "react";

type Work = {
  w: string;
  n: string;
  d: string;
  s: string;
  kind: "time" | "output" | "stat";
  bars?: { l: string; v: number }[];
  tag?: string;
  extra?: { n: string; d: string };
};

const WORK: Work[] = [
  { w: "Reports, emails, memos", n: "40% less time", d: "Quality went up 18% at the same time.", s: "MIT, Science, 2023 · about 450 professionals, randomized", kind: "time", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 60 }] },
  { w: "Analysis and writing", n: "25% faster", d: "12% more tasks done, and quality up more than 40%, on work inside AI's strengths.", s: "Harvard and BCG, 2023 · 758 consultants, randomized", kind: "time", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 80 }] },
  { w: "Insurance claims", n: "80% faster", d: "On small claims, with a person still approving every payment.", s: "Allianz, 2025", tag: "Company-reported", kind: "time", bars: [{ l: "Before", v: 100 }, { l: "With AI", v: 20 }] },
  { w: "Underwriting", n: "About half", d: "The review time per application. Underwriters still make the call.", s: "Aviva, 2026", tag: "Company-reported", kind: "time", bars: [{ l: "Before", v: 100 }, { l: "With AI", v: 50 }] },
  { w: "Customer support", n: "14% more", d: "Issues resolved per hour, and 34% more for the newest staff.", s: "Quarterly Journal of Economics, 2025 · 5,172 agents", kind: "output", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 114 }, { l: "Newest staff with AI", v: 134 }] },
  { w: "Accounting", n: "7.5 days sooner", d: "Sooner to close the books each month after firms adopted AI bookkeeping.", s: "Stanford and MIT, 2025 · early working paper", kind: "stat", extra: { n: "55% more", d: "clients served per accountant" } },
  { w: "Email", n: "About 2 hours", d: "Less a week spent on email, per person, over six months.", s: "Microsoft and NBER, 2025 · 7,137 workers at 66 firms", kind: "stat", extra: { n: "7,137", d: "workers measured at 66 companies" } },
  { w: "Documents and reports", n: "87% to 95%", d: "Less time per task across real work conversations.", s: "Anthropic, 2025 · an estimate from 100,000 conversations", tag: "Estimate", kind: "time", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 9 }] },
];

export function WorkPicker() {
  const [i, setI] = useState(0);
  const [moved, setMoved] = useState(false); // once a tab is picked, the new bars re-grow
  const pick = (n: number) => { setI(n); setMoved(true); };
  const w = WORK[i];
  const max = w.kind === "output" ? 140 : 100;
  const ticks = w.kind === "output" ? [0, 35, 70, 105, 140] : [0, 25, 50, 75, 100];
  return (
    <div className="wy-pick">
      <div className="wy-pick-list" role="tablist" aria-label="Type of work" aria-orientation="vertical">
        {WORK.map((x, k) => (
          <button
            key={x.w}
            role="tab"
            id={`wy-tab-${k}`}
            aria-selected={k === i}
            aria-controls="wy-pick-panel"
            tabIndex={k === i ? 0 : -1}
            className={k === i ? "on" : ""}
            onClick={() => pick(k)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const n = (k + (e.key === "ArrowDown" ? 1 : WORK.length - 1)) % WORK.length;
                pick(n);
                document.getElementById(`wy-tab-${n}`)?.focus();
              }
            }}
          >
            <span className="wy-pick-ix">{String(k + 1).padStart(2, "0")}</span>
            <span>{x.w}</span>
            <span className="wy-pick-n">{x.n}</span>
          </button>
        ))}
      </div>
      <div className={moved ? "wy-pick-panel sw" : "wy-pick-panel"} id="wy-pick-panel" role="tabpanel" aria-labelledby={`wy-tab-${i}`} key={w.w}>
        <div className="wy-pick-top">
          <span className="meta">{w.w}</span>
          {w.tag && <span className="wy-tag">{w.tag}</span>}
        </div>
        <strong className="wy-big">{w.n}</strong>
        <p className="wy-desc">{w.d}</p>
        {w.bars ? (
          <figure className="wy-hbar" aria-label={w.bars.map((b) => `${b.l}: ${b.v}`).join(", ")}>
            <div className="wy-hbar-axis" aria-hidden="true">
              <span />
              <div>
                {ticks.map((t) => (
                  <i key={t} style={{ left: `${(t / max) * 100}%` }}>{w.kind === "time" ? `${t}%` : t}</i>
                ))}
              </div>
              <span />
            </div>
            {w.bars.map((b, k) => (
              <div key={b.l} className={`wy-hbar-row ${k === 0 ? "base" : "ai"}`}>
                <span>{b.l}</span>
                <div className="wy-hbar-track">
                  <b style={{ width: `${(b.v / max) * 100}%` }} />
                </div>
                <em>{w.kind === "time" ? (k === 0 ? "100% of the time" : `${b.v}% of the time`) : (k === 0 ? "Baseline" : `+${b.v - 100}% per hour`)}</em>
              </div>
            ))}
            <figcaption>{w.kind === "time" ? "Time per task, baseline = 100" : "Issues resolved per hour, baseline = 100"}</figcaption>
          </figure>
        ) : (
          <div className="wy-statbox">
            <strong>{w.extra?.n}</strong>
            <span>{w.extra?.d}</span>
          </div>
        )}
        <p className="wy-src">{w.s}</p>
      </div>
    </div>
  );
}
