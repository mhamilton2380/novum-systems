"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/PageVisuals";

// Why AI page visuals. Every figure comes from "How Much Faster AI Makes the Work" (2026-10-08):
// https://claude.ai/code/artifact/ebae361d-f31e-471a-b67f-977d9ded0e2e. Company and vendor results are labeled.

// ─── hero: the same task, three ways ────────────────────────────────────────
export function ThreeWaysCard() {
  const rows: { t: string; s: string; w: number; tone: string; lo?: number; hi?: number }[] = [
    { t: "No AI", s: "The baseline", w: 100, tone: "base" },
    { t: "AI tools, no training", s: "About 3% saved · University of Chicago", w: 97, tone: "flat" },
    { t: "Trained, on the right task", s: "25% to 56% saved · controlled studies", w: 60, lo: 44, hi: 75, tone: "win" },
  ];
  return (
    <div className="h-phero-card wy-three" aria-label="Time to do the same task: no AI, AI tools with no training, or trained on the right task">
      <div className="oc-hero-h"><span className="oc-live" aria-hidden="true" /><strong>Same task, three ways</strong><em>Time it takes</em></div>
      {rows.map((r, i) => (
        <div key={r.t} className={`wy-three-row ${r.tone}`} style={{ ["--i" as string]: i, ["--w" as string]: `${r.w}%` }}>
          <div className="wy-three-l"><strong>{r.t}</strong><small>{r.s}</small></div>
          <div className="wy-three-bar">
            <i />
            {r.lo && <b style={{ left: `${r.lo}%`, width: `${(r.hi ?? r.lo) - r.lo}%` }} />}
          </div>
        </div>
      ))}
      <div className="wy-three-foot"><Icon name="target" size={16} />The difference is the task you pick and whether the team was trained.</div>
    </div>
  );
}

// ─── by type of work: pick one, see before and after ────────────────────────
type Work = { w: string; icon: IconName; n: string; d: string; s: string; kind: "time" | "output" | "stat"; bars?: { l: string; v: number }[]; tag?: string; extra?: { n: string; d: string } };
const WORK: Work[] = [
  { w: "Reports, emails, memos", icon: "doc", n: "40% less time", d: "Quality went up 18% at the same time.", s: "MIT, Science, 2023 · about 450 professionals, randomized", kind: "time", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 60 }] },
  { w: "Analysis and writing", icon: "pen", n: "25% faster", d: "12% more tasks done, and quality up more than 40%, on work inside AI's strengths.", s: "Harvard and BCG, 2023 · 758 consultants, randomized", kind: "time", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 80 }] },
  { w: "Insurance claims", icon: "insurance", n: "80% faster", d: "On small claims, with a person still approving every payment.", s: "Allianz, 2025", tag: "Company-reported", kind: "time", bars: [{ l: "Before", v: 100 }, { l: "With AI", v: 20 }] },
  { w: "Underwriting", icon: "shield", n: "About half", d: "The review time per application. Underwriters still make the call.", s: "Aviva, 2026", tag: "Company-reported", kind: "time", bars: [{ l: "Before", v: 100 }, { l: "With AI", v: 50 }] },
  { w: "Customer support", icon: "users", n: "14% more", d: "Issues resolved per hour, and 34% more for the newest staff.", s: "Quarterly Journal of Economics, 2025 · 5,172 agents", kind: "output", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 114 }, { l: "Newest staff with AI", v: 134 }] },
  { w: "Accounting", icon: "accounting", n: "7.5 days sooner", d: "Sooner to close the books each month after firms adopted AI bookkeeping.", s: "Stanford and MIT, 2025 · early working paper", kind: "stat", extra: { n: "55% more", d: "clients served per accountant" } },
  { w: "Email", icon: "mail", n: "About 2 hours", d: "Less a week spent on email, per person, over six months.", s: "Microsoft and NBER, 2025 · 7,137 workers at 66 firms", kind: "stat", extra: { n: "7,137", d: "workers measured at 66 companies" } },
  { w: "Documents and reports", icon: "book", n: "87% to 95%", d: "Less time per task across real work conversations.", s: "Anthropic, 2025 · an estimate from 100,000 conversations", tag: "Estimate", kind: "time", bars: [{ l: "Without AI", v: 100 }, { l: "With AI", v: 9 }] },
];
export function WorkPicker() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % WORK.length), 4800);
    return () => clearInterval(id);
  }, [auto]);
  const w = WORK[i];
  const max = w.kind === "output" ? 140 : 100;
  return (
    <div className="pv-types wy-pick">
      <div className="pv-types-tabs" role="tablist" aria-label="Type of work">
        {WORK.map((x, k) => (
          <button key={x.w} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setAuto(false); }}>
            <Icon name={x.icon} size={18} />
            {x.w}
            {k === i && auto && <i className="pv-types-prog" style={{ animationDuration: "4.8s" }} />}
          </button>
        ))}
      </div>
      <div className="wy-pick-body" key={w.w}>
        <div className="pv-label">{w.w}{w.tag && <span className="wy-tag">{w.tag}</span>}</div>
        <strong className="wy-big">{w.n}</strong>
        <p className="wy-desc">{w.d}</p>
        {w.bars ? (
          <div className="wy-bars">
            {w.bars.map((b, k) => (
              <div key={b.l} className={`wy-bar ${k === 0 ? "base" : "ai"}`} style={{ ["--i" as string]: k, ["--w" as string]: `${(b.v / max) * 100}%` }}>
                <span>{b.l}</span>
                <i><b /></i>
                <em>{w.kind === "time" ? (k === 0 ? "100% of the time" : `${b.v}% of the time`) : (k === 0 ? "Baseline" : `+${b.v - 100}% per hour`)}</em>
              </div>
            ))}
          </div>
        ) : (
          <div className="wy-statbox"><Icon name="check" size={20} /><div><strong>{w.extra?.n}</strong><span>{w.extra?.d}</span></div></div>
        )}
        <small className="wy-src">{w.s}</small>
      </div>
    </div>
  );
}

// ─── cost per task: a person against an agent ───────────────────────────────
const TASKS = [
  { t: "Key one invoice into the system", p: 1.89, pl: "4 minutes, about $1.89", a: 0.01, al: "About $0.01", n: "Spot-check a sample" },
  { t: "Draft a two-page memo", p: 24.5, pl: "45 minutes, about $24.50", a: 5.46, al: "About $0.02, plus 10 minutes of review (about $5.44)", n: "Review is most of the real cost" },
  { t: "Handle a three-minute phone call", p: 1.54, pl: "About $1.54", a: 0.42, al: "About $0.33 to $0.42", n: "Answers at 2 a.m., many calls at once" },
];
export function CostBars() {
  return (
    <Reveal>
      <div className="wy-cost">
        {TASKS.map((x, i) => (
          <div key={x.t} className="wy-cost-row rv-item" style={{ ["--i" as string]: i }}>
            <div className="wy-cost-h"><strong>{x.t}</strong><span>{x.n}</span></div>
            <div className="wy-cost-bar person"><span>A person</span><i><b style={{ width: "100%" }} /></i><em>{x.pl}</em></div>
            <div className="wy-cost-bar agent"><span>An agent</span><i><b style={{ width: `${Math.max(1.2, (x.a / x.p) * 100)}%` }} /></i><em>{x.al}</em></div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
const WAGES = [
  { r: "Receptionist", h: 26.1, y: "$54,305" },
  { r: "Data entry keyer", h: 28.4, y: "$59,063" },
  { r: "Customer service rep", h: 30.76, y: "$63,963" },
  { r: "Administrative assistant", h: 32.66, y: "$67,920" },
  { r: "Dispatcher", h: 34.57, y: "$71,921" },
  { r: "Bookkeeping clerk", h: 34.8, y: "$72,392" },
  { r: "Cargo and freight agent", h: 35.9, y: "$74,664" },
  { r: "Financial analyst", h: 70.58, y: "$146,785" },
];
export function WageChart() {
  return (
    <Reveal>
      <div className="wy-wages">
        <div className="wy-wages-h"><strong>What the person costs</strong><em>Wage plus benefits, per hour</em></div>
        {WAGES.map((w, i) => (
          <div key={w.r} className="wy-wage rv-item" style={{ ["--i" as string]: i, ["--w" as string]: `${(w.h / 70.58) * 100}%` }}>
            <span>{w.r}</span>
            <i><b /></i>
            <em>${w.h.toFixed(2)}<small>{w.y} a year</small></em>
          </div>
        ))}
        <small className="wy-src">BLS median wages, May 2025, with benefits at 1.43 times the wage. Recruiting, training, and supervision come on top.</small>
      </div>
    </Reveal>
  );
}

// ─── phone agents: an example call log, then the published results ──────────
const CALLS = [
  { t: "2:04 a.m.", w: "Carrier check call, load 4471", r: "On time, logged", s: "Agent" },
  { t: "7:15 a.m.", w: "Customer: where's my order?", r: "Answered from the order system", s: "Agent" },
  { t: "9:32 a.m.", w: "Billing dispute", r: "Handed to a person", s: "Person" },
  { t: "11:48 a.m.", w: "Service visit request", r: "Booked for Thursday, 10 a.m.", s: "Agent" },
];
export function CallLog() {
  return (
    <div className="wy-calls" aria-label="Example call log for a phone agent">
      <div className="wy-calls-h"><span className="oc-live" aria-hidden="true" /><strong>Phone agent</strong><em>Example day</em></div>
      {CALLS.map((c, i) => (
        <div key={c.t} className={`wy-call ${c.s === "Person" ? "human" : ""}`} style={{ ["--i" as string]: i }}>
          <span className="wy-call-t">{c.t}</span>
          <div><strong>{c.w}</strong><small>{c.r}</small></div>
          <b>{c.s === "Person" ? "Person" : "Agent"}</b>
        </div>
      ))}
      <div className="wy-calls-foot">Every call opens by saying it&apos;s an AI, and anyone can ask for a person.</div>
    </div>
  );
}
const VOICE = [
  { n: "18%", d: "of freight booked with no human involved, and every call answered", c: "Circle Logistics" },
  { n: "Hours to minutes", d: "rep time on carrier calls and email, from 3 to 4 hours a day", c: "ARL Network" },
  { n: "40% to 90%", d: "of inbound carrier calls handled fully, tasks from 15 to 20 minutes down to about 5", c: "Freight brokers on WireBee" },
  { n: "8x", d: "faster to resolve customer service calls in the first phase", c: "Revolut" },
];
export function VoiceResults() {
  return (
    <Reveal>
      <div className="wy-voice">
        {VOICE.map((v, i) => (
          <div key={v.c} className="wy-voice-card rv-item" style={{ ["--i" as string]: i }}>
            <strong>{v.n}</strong>
            <p>{v.d}</p>
            <div><span>{v.c}</span><em>Vendor-reported</em></div>
          </div>
        ))}
        <div className="wy-voice-card wy-voice-warn rv-item" style={{ ["--i" as string]: 4 }}>
          <strong>Two-thirds, then a step back</strong>
          <p>Klarna&apos;s assistant handled two-thirds of chats in its first month. The company later hired people again when quality slipped. Cost alone is the wrong target.</p>
          <div><span>Klarna</span><em>Company-reported</em></div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── longer work: the doubling curve (METR) ─────────────────────────────────
// Task length the best agents finish half the time: about 12 hours by May 2026, doubling about every 4 months.
// Earlier points are back-calculated from that doubling rate, so they're approximate.
export function DoublingChart() {
  const W = 560, H = 300, P = { l: 48, r: 20, t: 20, b: 40 };
  const t0 = 2023, t1 = 2026.4, endMin = 720;
  const y = (t: number) => endMin * Math.pow(2, (t - t1) / (4 / 12));
  const X = (t: number) => P.l + ((t - t0) / (t1 - t0)) * (W - P.l - P.r);
  const Y = (m: number) => H - P.b - (m / endMin) * (H - P.t - P.b);
  const pts = Array.from({ length: 69 }, (_, k) => t0 + (k / 68) * (t1 - t0));
  const d = pts.map((t, k) => `${k ? "L" : "M"}${X(t).toFixed(1)},${Y(y(t)).toFixed(1)}`).join(" ");
  const marks = [
    { t: 2024, l: "about 5 min" },
    { t: 2025, l: "about 40 min" },
    { t: 2026, l: "about 5 hrs" },
    { t: 2026.4, l: "about 12 hrs" },
  ];
  return (
    <Reveal>
      <div className="wy-chart">
        <div className="wy-chart-h"><strong>Length of task an agent finishes on its own</strong><em>Half the time · METR</em></div>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Curve: about 5 minutes in 2024, 40 minutes in 2025, 5 hours in 2026, 12 hours by May 2026">
          <defs>
            <linearGradient id="wy-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#00b36e" /><stop offset="0.55" stopColor="#0891b2" /><stop offset="1" stopColor="#3b6fe0" /></linearGradient>
            <linearGradient id="wy-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0891b2" stopOpacity="0.25" /><stop offset="1" stopColor="#0891b2" stopOpacity="0" /></linearGradient>
          </defs>
          {[0, 3, 6, 9, 12].map((h) => (
            <g key={h}>
              <line x1={P.l} x2={W - P.r} y1={Y(h * 60)} y2={Y(h * 60)} stroke="#e2e8f0" />
              <text x={P.l - 8} y={Y(h * 60) + 4} textAnchor="end" className="wy-axis">{h}h</text>
            </g>
          ))}
          {[2023, 2024, 2025, 2026].map((t) => <text key={t} x={X(t)} y={H - 14} textAnchor="middle" className="wy-axis">{t}</text>)}
          <path d={`${d} L${X(t1)},${Y(0)} L${X(t0)},${Y(0)} Z`} fill="url(#wy-fill)" className="wy-area" />
          <path d={d} fill="none" stroke="url(#wy-line)" strokeWidth="3.5" strokeLinecap="round" className="wy-line" pathLength={1} />
          {marks.map((m, k) => (
            <g key={m.t} className="wy-mark" style={{ ["--i" as string]: k }}>
              <circle cx={X(m.t)} cy={Y(y(m.t))} r="5" fill="#fff" stroke="#0891b2" strokeWidth="3" />
              <text x={X(m.t) - 8} y={Y(y(m.t)) - 12} textAnchor="end" className="wy-mark-l">{m.l}</text>
            </g>
          ))}
        </svg>
        <small className="wy-src">The May 2026 point is from METR; earlier points are back-calculated from its doubling rate of about 4 months. Software and research tasks, so read it as direction for office work.</small>
      </div>
    </Reveal>
  );
}

// ─── where it goes wrong: meters ────────────────────────────────────────────
export function WrongMeters() {
  return (
    <Reveal>
      <div className="wy-wrong">
        <div className="wy-wrong-row rv-item" style={{ ["--i" as string]: 0 }}>
          <div className="wy-wrong-h"><strong>AI tools, no training</strong><em>Time saved</em></div>
          <div className="wy-meter"><i style={{ width: "3%" }} className="red" /><span>about 3%</span></div>
          <div className="wy-meter ghost"><i style={{ width: "40%", left: "25%" }} className="green" /><span>25% to 56% when trained, on the right task</span></div>
          <small>University of Chicago, 25,000 workers · controlled studies</small>
        </div>
        <div className="wy-wrong-row rv-item" style={{ ["--i" as string]: 1 }}>
          <div className="wy-wrong-h"><strong>The wrong task</strong><em>Right answers</em></div>
          <div className="wy-meter"><i style={{ width: "84.5%" }} className="base" /><span>84.5% without AI</span></div>
          <div className="wy-meter"><i style={{ width: "65%" }} className="red" /><span>60% to 70% with AI, and the wrong answers read as more polished</span></div>
          <small>Harvard and BCG, 2023</small>
        </div>
        <div className="wy-wrong-row ours rv-item" style={{ ["--i" as string]: 2 }}>
          <div className="wy-wrong-h"><strong>Our own operating work</strong><em>Not a study</em></div>
          <div className="wy-pair"><span><b>8 hours</b> to <b>15 minutes</b></span><small>A multi-step analysis and write-up</small></div>
          <div className="wy-pair"><span><b>7 to 10 days</b> to <b>1 day</b></span><small>A presentation deck</small></div>
        </div>
      </div>
    </Reveal>
  );
}
