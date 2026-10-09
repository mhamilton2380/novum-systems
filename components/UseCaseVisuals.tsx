"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/PageVisuals";
import type { UseCase, SystemName } from "@/lib/useCases";
import { ProblemArt, PROBLEM_PAIN } from "@/components/ProblemArt";

// Use case pages (one template, nine industries) and the construction case study.
// Everything is driven by lib/useCases.ts, so each industry gets its own tools, questions and agents.
// Styles live in app/visuals.css (prefix uc-).

function minutes(s: string) {
  const n = parseFloat(s);
  return /hr/.test(s) ? n * 60 : n;
}
function hours(min: number) {
  const h = Math.floor((min / 60) * 2) / 2;
  return `${h % 1 ? h.toFixed(1) : h} hrs`;
}

// ─── hero: the agents' day, with the time it gave back ──────────────────────
export function AgentDayCard({ agents }: { agents: UseCase["agents"] }) {
  const total = agents.reduce((t, a) => t + minutes(a.saved), 0);
  return (
    <div className="h-phero-card uc-day" aria-label="What the agents did today">
      <div className="oc-hero-h"><span className="oc-live" aria-hidden="true" /><strong>Agents working today</strong><em>Example</em></div>
      <ol>
        {agents.map((a, i) => (
          <li key={a.task} style={{ ["--i" as string]: i }}>
            <b aria-hidden="true">✓</b>
            <span>{a.task}</span>
            <small>{a.saved}</small>
          </li>
        ))}
      </ol>
      <div className="uc-day-foot"><span>Back to the team</span><strong>{hours(total)}</strong><em>today</em></div>
    </div>
  );
}

// ─── the problem: each industry's own graphic, beside its pain list ─────────
export function ProblemPanel({ u }: { u: UseCase }) {
  const lit = PROBLEM_PAIN[u.slug] ?? 0;
  return (
    <Reveal>
      <div className="uc-silo">
        <div className="uc-silo-art rv-item" style={{ ["--i" as string]: 0 }}>
          <div className="uc-silo-h"><span>Today</span>{u.pains[lit].title}<em>Example</em></div>
          <ProblemArt slug={u.slug} />
        </div>
        <ol className="uc-pains">
          {u.pains.map((p, i) => (
            <li key={p.title} className={`rv-item ${i === lit ? "lit" : ""}`} style={{ ["--i" as string]: i + 1 }}>
              <b>0{i + 1}</b>
              <div><h3>{p.title}</h3><p>{p.body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

// ─── what we build: pick a piece, see it work ───────────────────────────────
const SYS_ICON: Record<SystemName, IconName> = {
  "Your system": "box",
  "Connected tools": "link",
  Documents: "doc",
  "AI Assistant": "ai",
  Agents: "bot",
};

function SysArt({ sys, u }: { sys: SystemName; u: UseCase }) {
  if (sys === "Your system")
    return (
      <div className="uc-art uc-board" aria-hidden="true">
        <div className="uc-win"><i /><i /><i /><span>{u.name} · Overview</span></div>
        <div className="uc-board-tiles">
          {["Active", "Needs you", "This week"].map((t, i) => <div key={t} style={{ ["--i" as string]: i }}><small>{t}</small><b /></div>)}
        </div>
        {["ok", "ok", "bad", "ok"].map((s, i) => (
          <div className="uc-board-row" key={i} style={{ ["--i" as string]: i }}>
            <i className={s} /><span style={{ width: `${[58, 44, 52, 38][i]}%` }} /><em><b style={{ width: `${[72, 40, 104, 55][i]}%` }} className={s} /></em>
          </div>
        ))}
        <b className="pv-art-key">Yours</b>
      </div>
    );
  if (sys === "Connected tools")
    return (
      <div className="uc-art uc-sync" aria-hidden="true">
        <div className="uc-sync-tools">
          {u.tools.slice(0, 4).map((t, i) => (
            <div key={t} style={{ ["--i" as string]: i }}><span>{t}</span><em><i /></em></div>
          ))}
        </div>
        <div className="uc-sync-hub"><Icon name="db" size={22} /><strong>Your data</strong><small>one place, in sync</small></div>
      </div>
    );
  if (sys === "Documents")
    return (
      <div className="uc-art uc-docs" aria-hidden="true">
        <div className="uc-docs-search"><Icon name="target" size={15} />Search every file</div>
        {[
          { tag: "Latest", c: "ok", w: 62 },
          { tag: "Replaced", c: "old", w: 54 },
          { tag: "Office only", c: "lock", w: 48 },
        ].map((d, i) => (
          <div className={`uc-docs-row ${d.c}`} key={d.tag} style={{ ["--i" as string]: i }}>
            <Icon name="doc" size={17} /><span style={{ width: `${d.w}%` }} />
            <em>{d.c === "lock" && <Icon name="lock" size={12} />}{d.tag}</em>
          </div>
        ))}
      </div>
    );
  if (sys === "AI Assistant")
    return (
      <div className="uc-art uc-ask" aria-hidden="true">
        <div className="uc-ask-q">{u.questions[0]}</div>
        <div className="uc-ask-a">
          <span /><span /><span style={{ width: "62%" }} />
          <div className="uc-ask-src"><small>From</small>{u.tools.slice(0, 2).map((t) => <i key={t}>{t}</i>)}</div>
        </div>
        <div className="uc-ask-more">{u.questions.slice(1, 3).map((q) => <span key={q}>{q}</span>)}</div>
      </div>
    );
  return (
    <div className="uc-art uc-agents" aria-hidden="true">
      {u.agents.slice(0, 3).map((a, i) => (
        <div key={a.task} style={{ ["--i" as string]: i }}>
          <Icon name="bot" size={16} />
          <span>{a.task}</span>
          {i === 0 ? <em className="wait">Awaiting your approval</em> : <em>{a.saved} back</em>}
        </div>
      ))}
    </div>
  );
}

export function SystemPicker({ u }: { u: UseCase }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % u.builds.length), 6000);
    return () => clearInterval(id);
  }, [auto, u.builds.length]);
  const b = u.builds[i];
  return (
    <div className="pv-types uc-pick">
      <div className="pv-types-tabs" role="tablist" aria-label="What we build">
        {u.builds.map((x, k) => (
          <button key={x.system} role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setAuto(false); }}>
            <Icon name={SYS_ICON[x.system]} size={18} />
            <span className="uc-pick-t"><small>{x.system}</small>{x.title}</span>
            {k === i && auto && <i className="pv-types-prog" style={{ animationDuration: "6s" }} />}
          </button>
        ))}
      </div>
      <div className="uc-pick-body" key={b.system}>
        <SysArt sys={b.system} u={u} />
        <div className="uc-pick-copy">
          <div className="pv-label">{b.system}</div>
          <h3>{b.title}</h3>
          <p>{b.body}</p>
        </div>
      </div>
    </div>
  );
}

// ─── what stays, what goes ──────────────────────────────────────────────────
export function KeepReplace({ tools, replaces }: { tools: string[]; replaces: string[] }) {
  return (
    <Reveal>
      <div className="uc-kr">
        <div className="uc-kr-col keep rv-item" style={{ ["--i" as string]: 0 }}>
          <div className="uc-kr-h"><Icon name="link" size={18} />Keeps working, now connected</div>
          <div className="uc-kr-chips">{tools.map((t, k) => <span key={t} style={{ ["--i" as string]: k }}><i aria-hidden="true" />{t}</span>)}</div>
          <p>The tools your team likes stay. We connect them, so the data moves on its own.</p>
        </div>
        <div className="uc-kr-arrow" aria-hidden="true"><Icon name="move" size={22} /></div>
        <div className="uc-kr-col drop rv-item" style={{ ["--i" as string]: 1 }}>
          <div className="uc-kr-h"><Icon name="coin" size={18} />Can come off the bill</div>
          <ul>{replaces.map((t, k) => <li key={t} style={{ ["--i" as string]: k }}><s>{t}</s></li>)}</ul>
          <p>Replaced by a system you own. No seats, no renewal.</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── case study hero: the bill, crossed out ─────────────────────────────────
export function BillCard() {
  return (
    <div className="h-phero-card uc-bill" aria-label="The $100,000 a year subscription, replaced">
      <div className="oc-hero-h"><span className="oc-live" aria-hidden="true" /><strong>The software bill</strong><em>Construction</em></div>
      <div className="uc-bill-old">
        <small>Construction management platform</small>
        <div><strong>$100,000</strong><span>/ year, every year</span></div>
        <i aria-hidden="true" />
        <b className="uc-bill-stamp">Replaced</b>
      </div>
      <div className="uc-bill-rows">
        <div style={{ ["--i" as string]: 0 }}><span>Now</span><strong>Hosting, storage, security</strong></div>
        <div style={{ ["--i" as string]: 1 }}><span>Seats</span><strong>None to buy</strong></div>
        <div style={{ ["--i" as string]: 2 }}><span>Owner</span><strong>The company</strong></div>
      </div>
    </div>
  );
}

// ─── case study: an RFI the agent drafted ───────────────────────────────────
export function RfiDraft() {
  return (
    <Reveal>
      <div className="uc-rfi rv-item" style={{ ["--i" as string]: 0 }}>
        <div className="uc-win"><i /><i /><i /><span>RFI · Draft</span><em>Example</em></div>
        <div className="uc-rfi-body">
          <div className="uc-rfi-agent"><Icon name="bot" size={16} />Drafted by the RFI agent from a field note, 3 photos, and the spec</div>
          <dl>
            <div><dt>Subject</dt><dd>Beam size at grid line C doesn&apos;t match the architectural set</dd></div>
            <div><dt>References</dt><dd>Structural sheet S-201, architectural sheet A-301</dd></div>
            <div><dt>Question</dt><dd>Please confirm which beam size governs at grid C, levels 2 and 3, before steel is ordered.</dd></div>
          </dl>
          <div className="uc-rfi-files">{["Field note", "Photo 1", "Photo 2", "Photo 3", "S-201"].map((f) => <span key={f}><Icon name="doc" size={13} />{f}</span>)}</div>
          <div className="uc-rfi-foot"><span><Icon name="users" size={15} />Project manager reviews</span><button type="button" tabIndex={-1}>Edit</button><button type="button" tabIndex={-1} className="go">Send</button></div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── case study: before and after, line by line ─────────────────────────────
export function Ledger({ rows }: { rows: { icon: IconName; what: string; before: string; after: string }[] }) {
  return (
    <Reveal>
      <div className="uc-ledger">
        <div className="uc-ledger-head" aria-hidden="true"><span /><span className="b">Before</span><span className="a">After</span></div>
        {rows.map((r, i) => (
          <div className="uc-ledger-row rv-item" key={r.what} style={{ ["--i" as string]: i }}>
            <div className="uc-ledger-what"><span className="oc-role-icon"><Icon name={r.icon} size={18} /></span>{r.what}</div>
            <div className="uc-ledger-b"><small>Before</small>{r.before}</div>
            <div className="uc-ledger-a"><small>After</small><b aria-hidden="true">✓</b>{r.after}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
