"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/PageVisuals";

// How We Work: what a discovery hands you, shown as the documents themselves. Example content; cycles until clicked.
const TABS: { id: string; name: string; when: string; icon: IconName }[] = [
  { id: "map", name: "Workflow map", when: "Week 1", icon: "map" },
  { id: "tools", name: "Tool and cost report", when: "Day 7", icon: "coin" },
  { id: "policy", name: "AI usage policy", when: "Week 2", icon: "shield" },
  { id: "plan", name: "Written plan with prices", when: "Day 30", icon: "pen" },
];

const FLOW = [
  { t: "Request in", note: "" },
  { t: "Quote", note: "agent" },
  { t: "Approval", note: "" },
  { t: "Job", note: "" },
  { t: "Invoice", note: "retyped" },
  { t: "Report", note: "agent" },
];
const TOOLS = [
  { c: "Project management", s: 24, y: "$14,400", v: "Keep, connect", tone: "keep" },
  { c: "Scheduling add-on", s: 18, y: "$6,480", v: "Replace", tone: "swap" },
  { c: "Document tool", s: 24, y: "$5,760", v: "Cut, overlaps", tone: "cut" },
  { c: "Reporting plugin", s: 6, y: "$2,160", v: "Cut, unused", tone: "cut" },
  { c: "Accounting", s: 5, y: "$3,000", v: "Keep, connect", tone: "keep" },
];
const OK = ["Drafting emails from your own notes", "Summarizing internal documents", "Company questions in your own assistant"];
const NEVER = ["Client financials in public chatbots", "Passwords or account numbers", "Anything sent out before a person reviews it"];
const PLAN = [
  { t: "Intake assistant", d: "Live in about 3 weeks" },
  { t: "CRM to accounting sync", d: "About 2 weeks" },
  { t: "Scheduling tool replacement", d: "Three steps, each live on its own" },
  { t: "Training every month", d: "On every plan" },
];

function Doc({ id }: { id: string }) {
  if (id === "map")
    return (
      <div className="pv-doc-map">
        <div className="pv-doc-flow">
          {FLOW.map((f, i) => (
            <div key={f.t} className={`pv-doc-node ${f.note}`} style={{ ["--i" as string]: i }}>
              {f.t}
              {f.note === "agent" && <em>Agent here</em>}
              {f.note === "retyped" && <em>Typed twice</em>}
            </div>
          ))}
        </div>
        <div className="pv-doc-legend"><span className="g" />Where an agent takes the repeat work<span className="r" />Where time leaks today</div>
      </div>
    );
  if (id === "tools")
    return (
      <div className="pv-doc-table">
        <div className="pv-doc-tr head"><span>Tool</span><span>Seats</span><span>Per year</span><span>Verdict</span></div>
        {TOOLS.map((r, i) => (
          <div className="pv-doc-tr" key={r.c} style={{ ["--i" as string]: i }}>
            <span>{r.c}</span><span>{r.s}</span><span>{r.y}</span><span><b className={r.tone}>{r.v}</b></span>
          </div>
        ))}
        <div className="pv-doc-total">Flagged to cut or replace <strong>$14,400 a year</strong></div>
      </div>
    );
  if (id === "policy")
    return (
      <div className="pv-doc-policy">
        <div><div className="pv-doc-k ok">Fine to use AI for</div>{OK.map((x, i) => <p key={x} style={{ ["--i" as string]: i }}><b className="ok">✓</b>{x}</p>)}</div>
        <div><div className="pv-doc-k no">Never</div>{NEVER.map((x, i) => <p key={x} style={{ ["--i" as string]: i + 3 }}><b className="no">✕</b>{x}</p>)}</div>
      </div>
    );
  return (
    <div className="pv-doc-plan">
      {PLAN.map((p, i) => (
        <div className="pv-doc-line" key={p.t} style={{ ["--i" as string]: i }}>
          <span className="pv-doc-n">{i + 1}</span>
          <span><strong>{p.t}</strong><small>{p.d}</small></span>
          <span className="pv-doc-price">Priced in writing</span>
        </div>
      ))}
      <div className="pv-doc-total">Your discovery fee <strong>credited toward it</strong></div>
    </div>
  );
}

export function DiscoveryArtifacts() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % TABS.length), 5600);
    return () => clearInterval(id);
  }, [auto]);
  const t = TABS[i];
  return (
    <div className="pv-types pv-arts">
      <div className="pv-types-tabs" role="tablist" aria-label="Discovery deliverables">
        {TABS.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setAuto(false); }}>
            <Icon name={x.icon} size={18} />
            <span className="pv-arts-t">{x.name}<small>{x.when}</small></span>
            {k === i && auto && <i className="pv-types-prog" style={{ animationDuration: "5.6s" }} />}
          </button>
        ))}
      </div>
      <div className="pv-arts-body" key={t.id}>
        <div className="pv-doc">
          <div className="pv-doc-bar"><span className="pv-dots" aria-hidden="true"><i /><i /><i /></span>{t.name}<em>Example</em></div>
          <div className="pv-doc-body"><Doc id={t.id} /></div>
        </div>
      </div>
    </div>
  );
}
