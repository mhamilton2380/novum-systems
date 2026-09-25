"use client";
import { useEffect, useState } from "react";
import { AssistantChat } from "./AssistantChat";

// ─── Slides ───────────────────────────────────────────────────────────────────
type Slide = { title: string; body: string; head: string; sub: string; ms: number };

const SLIDES: Slide[] = [
  {
    title: "Core",
    body: "Projects, schedules, budgets, vendors, and reporting in one place, built around how your team works. This replaces the platforms you rent today.",
    head: "Core", sub: "Projects · budgets · schedules", ms: 8000,
  },
  {
    title: "Integrations",
    body: "Keep the tools that work. We connect QuickBooks, Salesforce, Outlook, and the rest so data moves between them on its own and nobody types the same thing twice.",
    head: "Integrations", sub: "6 tools connected · syncing live", ms: 9000,
  },
  {
    title: "Vault",
    body: "Contracts, drawings, records, and history. Encrypted, indexed, and searchable in plain English, with access controlled by role.",
    head: "Vault", sub: "Encrypted document search", ms: 10000,
  },
  {
    title: "AI Assistant",
    body: "Ask a question about any part of your operation and get the answer in seconds. It runs on your data only.",
    head: "AI Assistant", sub: "Connected to Core, Vault, QuickBooks, Outlook", ms: 22000,
  },
  {
    title: "Agents",
    body: "Because everything lives in one system, AI can do real work inside it: draft the RFI, match the invoice to the PO, chase the missing lien waiver, build the weekly report.",
    head: "Agents", sub: "Running in the background", ms: 11000,
  },
];

// Reveal n items one at a time after mount
function useStep(count: number, gap: number, start = 300) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= count; i++) timers.push(setTimeout(() => setN(i), start + gap * (i - 1)));
    return () => timers.forEach(clearTimeout);
  }, [count, gap, start]);
  return n;
}

// ─── Core: project dashboard ──────────────────────────────────────────────────
const PROJECTS = [
  { name: "Riverside Clinic", pm: "D. Reyes", pct: 78, ok: false },
  { name: "Oak St. Retail", pm: "K. Okafor", pct: 54, ok: true },
  { name: "Harbor Warehouse", pm: "L. Brandt", pct: 91, ok: false },
  { name: "Lincoln School", pm: "T. Nguyen", pct: 36, ok: true },
  { name: "Pine Ridge Offices", pm: "S. Patel", pct: 22, ok: true },
];

function CoreDemo() {
  const n = useStep(PROJECTS.length + 1, 220);
  return (
    <div className="sc-body">
      <div className="sc-kpis">
        <div><small>Active projects</small><strong>6</strong></div>
        <div><small>Budget used</small><strong>62%</strong></div>
        <div><small>On schedule</small><strong>4 of 6</strong></div>
      </div>
      <div className="sc-table">
        <div className="sc-thead"><span>Project</span><span>Budget used</span><span>Status</span></div>
        {PROJECTS.map((p, i) => (
          <div className={`sc-trow${n > i ? " in" : ""}`} key={p.name}>
            <span><b>{p.name}</b><small>{p.pm}</small></span>
            <span className="sc-bar"><span className="sc-track"><i style={{ width: n > i ? `${p.pct}%` : 0, background: p.ok ? "#00b36e" : "#e8a33d" }} /></span><em>{p.pct}%</em></span>
            <span className={`sc-chip ${p.ok ? "ok" : "warn"}`}>{p.ok ? "On track" : "At risk"}</span>
          </div>
        ))}
      </div>
      <div className={`sc-note${n > PROJECTS.length ? " in" : ""}`}>Updated 2 minutes ago from field logs, timecards, and QuickBooks</div>
    </div>
  );
}

// ─── Integrations: hub + sync log ─────────────────────────────────────────────
const TOOLS = ["QuickBooks", "Salesforce", "Outlook", "Google Drive", "Slack", "Gusto"];
const SYNCS = [
  { from: "QuickBooks", to: "Core", what: "Invoice #1042 posted to Riverside Clinic" },
  { from: "Salesforce", to: "Core", what: "Oak St. deal won, project created" },
  { from: "Outlook", to: "Vault", what: "3 attachments filed to Harbor Warehouse" },
  { from: "Gusto", to: "Core", what: "Crew hours synced to job costs" },
  { from: "Core", to: "Slack", what: "Budget alert posted to #ops" },
];

function IntegrationsDemo() {
  const n = useStep(SYNCS.length, 1300, 700);
  const active = n > 0 ? TOOLS.indexOf(SYNCS[n - 1].from === "Core" ? SYNCS[n - 1].to : SYNCS[n - 1].from) : -1;
  const R = 118, cx = 190, cy = 138;
  return (
    <div className="sc-body">
      <svg className="sc-hub" viewBox="0 0 380 276" aria-hidden="true">
        {TOOLS.map((t, i) => {
          const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
          const on = i === active;
          return (
            <g key={t}>
              <line x1={cx} y1={cy} x2={x} y2={y} className={`sc-link${on ? " on" : ""}`} />
              <rect x={x - 46} y={y - 15} width="92" height="30" rx="8" className={`sc-node${on ? " on" : ""}`} />
              <text x={x} y={y + 4} textAnchor="middle" className="sc-node-t">{t}</text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="40" className="sc-core" />
        <text x={cx} y={cy - 2} textAnchor="middle" className="sc-core-t">Your</text>
        <text x={cx} y={cy + 13} textAnchor="middle" className="sc-core-t">system</text>
      </svg>
      <div className="sc-log">
        {SYNCS.slice(0, n).reverse().map((s) => (
          <div className="sc-logrow" key={s.what}>
            <span className="sc-route">{s.from} → {s.to}</span>
            <span>{s.what}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Vault: document search ───────────────────────────────────────────────────
const QUERY = "Which subcontracts have a 10% retainage clause?";
const DOCS = [
  { name: "Subcontract_ApexElectric.pdf", proj: "Riverside Clinic", page: "p. 14", pre: "Owner shall withhold ", hit: "ten percent (10%) retainage", post: " from each progress payment…" },
  { name: "Subcontract_NorthwestSteel.pdf", proj: "Oak St. Retail", page: "p. 9", pre: "Contractor will retain ", hit: "10% of each payment", post: " until substantial completion…" },
  { name: "Subcontract_CascadeConcrete.pdf", proj: "Harbor Warehouse", page: "p. 11", pre: "A ", hit: "retainage of 10%", post: " applies to all invoiced work…" },
];

function VaultDemo() {
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => { i++; setTyped(i); if (i < QUERY.length) t = setTimeout(tick, 32); };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);
  const done = typed >= QUERY.length;
  const n = useStep(DOCS.length + 1, 450, 500 + QUERY.length * 32 + 600);
  return (
    <div className="sc-body">
      <div className="sc-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <span>{QUERY.slice(0, typed)}{!done && <i className="sc-caret" />}</span>
      </div>
      <div className="sc-docs">
        {DOCS.map((d, i) => (
          <div className={`sc-doc${n > i ? " in" : ""}`} key={d.name}>
            <div className="sc-doc-head">
              <span className="sc-file">PDF</span>
              <b>{d.name}</b>
              <small>{d.proj} · {d.page}</small>
            </div>
            <p>{d.pre}<mark>{d.hit}</mark>{d.post}</p>
          </div>
        ))}
      </div>
      <div className={`sc-note${n > DOCS.length ? " in" : ""}`}>
        <span className="sc-lock">Encrypted</span> Searched 12,480 documents in 0.8s · showing only files your role can open
      </div>
    </div>
  );
}

// ─── Agents: task runs ────────────────────────────────────────────────────────
const RUNS = [
  { agent: "RFI agent", task: "Drafted RFI #214 from the superintendent's field note", saved: "25 min" },
  { agent: "AP agent", task: "Matched 38 invoices to POs, flagged 2 for review", saved: "2.5 hrs" },
  { agent: "Compliance agent", task: "Requested missing lien waiver from Apex Electric", saved: "15 min" },
  { agent: "Reporting agent", task: "Built the weekly owner report for 4 projects", saved: "3 hrs" },
];

function AgentsDemo() {
  // each run: appears, runs ~1.2s, then completes
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 400);
    return () => clearInterval(id);
  }, []);
  const state = (i: number) => {
    const start = 1 + i * 5;
    if (t < start) return "hidden";
    if (t < start + 3) return "running";
    return "done";
  };
  const doneCount = RUNS.filter((_, i) => state(i) === "done").length;
  return (
    <div className="sc-body">
      <div className="sc-kpis">
        <div><small>Agents running</small><strong>4</strong></div>
        <div><small>Finished today</small><strong>{128 + doneCount}</strong></div>
        <div><small>Hours saved this week</small><strong>{212 + doneCount * 2}</strong></div>
      </div>
      <div className="sc-runs">
        {RUNS.map((r, i) => {
          const s = state(i);
          return (
            <div className={`sc-run ${s}`} key={r.agent}>
              <span className={`sc-status ${s}`}>{s === "done" ? "✓" : <i className="sc-spin" />}</span>
              <div>
                <b>{r.agent}</b>
                <p>{r.task}</p>
              </div>
              <small>{s === "done" ? `Saved ${r.saved}` : "Working"}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const DEMOS = [CoreDemo, IntegrationsDemo, VaultDemo, null, AgentsDemo];

// ─── Showcase ─────────────────────────────────────────────────────────────────
export function SystemsShowcase() {
  const [idx, setIdx] = useState(0);
  const [run, setRun] = useState(0); // bumps to restart timers on click

  useEffect(() => {
    const t = setTimeout(() => setIdx((i) => (i + 1) % SLIDES.length), SLIDES[idx].ms);
    return () => clearTimeout(t);
  }, [idx, run]);

  const pick = (i: number) => { setIdx(i); setRun((r) => r + 1); };
  const slide = SLIDES[idx];
  const Demo = DEMOS[idx];

  return (
    <div className="h-sys">
      <div>
        <div className="h-head" style={{ marginBottom: 32 }}>
          <div className="h-eyebrow">What we build</div>
          <h2>One system. AI across all of it.</h2>
          <p>Each piece works on its own. Together they share one set of data, which is what lets the AI answer real questions and do real work.</p>
        </div>
        <div className="h-syslist">
          {SLIDES.map((s, i) => (
            <button
              type="button"
              className={`h-sysitem${i === idx ? " active" : ""}`}
              key={s.title}
              onClick={() => pick(i)}
              aria-pressed={i === idx}
            >
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              {i === idx && <span className="h-sysprog" key={`${idx}-${run}`} style={{ animationDuration: `${s.ms}ms` }} />}
            </button>
          ))}
        </div>
      </div>

      <div className="h-demo">
        <div className="h-demo-bar"><i /><i /><i /><span>Live demo · {slide.head}</span></div>
        <div className="sc-head">
          <div className="sc-mark" />
          <div>
            <div className="sc-title">{slide.head}</div>
            <div className="sc-sub">{slide.sub}</div>
          </div>
          <span className="sc-online"><i />Live</span>
        </div>
        <div className="sc-stage" key={`${idx}-${run}`}>
          {Demo ? <Demo /> : <AssistantChat height={560} compact bare />}
        </div>
      </div>
    </div>
  );
}
