"use client";
// Construction page: follow one job from the bid set to closeout and final payment.
// Every stage is one scenario from SCENARIOS.construction (lib/nv/useCaseScenarios.ts).
// The checked lines below are the items each scenario's own "ai" text names; the flagged
// line is the scenario's "catch"; the approver is its "person". Nothing here adds facts.
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Scenario } from "@/lib/nv/useCaseScenarios";

type Stage = {
  title: string; // matches Scenario.title
  phase: "Bid" | "Buyout" | "Build" | "Bill" | "Close";
  label: string; // short name for the rail
  doc: string; // the document or screen the agent works in
  tag: "PDF" | "XLS" | "LOG";
  checks: string[]; // taken from the scenario's own "ai" text
  approver: string; // short form of the scenario's "person"
};

// Order follows the life of a job.
const STAGES: Stage[] = [
  { title: "Takeoff, model and estimate from the bid set", phase: "Bid", label: "Takeoff and estimate", doc: "Bid set · drawings, specs and addenda", tag: "PDF",
    checks: ["Quantities taken off by CSI division", "Model built from the plans", "Estimate priced from your costs on past jobs", "Architectural checked against structural and MEP", "Schedules checked against plans", "Bid set checked against every addendum"], approver: "Chief estimator" },
  { title: "Bid packages built from drawings and specs", phase: "Bid", label: "Bid packages", doc: "Bid package · one per trade", tag: "PDF",
    checks: ["Drawing sheets for the trade", "Spec sections and addenda", "Written scope of work, from your past scope sheets", "Bid form"], approver: "Preconstruction manager" },
  { title: "Bid leveling sub quotes line by line", phase: "Bid", label: "Bid leveling", doc: "Leveling sheet · quotes from Outlook and the bid folder", tag: "XLS",
    checks: ["Inclusions and exclusions", "Alternates and allowances", "Qualifications", "Normalized by CSI division, like for like"], approver: "Chief estimator" },
  { title: "Scope gaps between sub bids and the spec book", phase: "Bid", label: "Scope gaps", doc: "Gap list · sub scopes against the spec book", tag: "XLS",
    checks: ["Each sub's written scope and exclusions", "The spec book", "General notes on the drawings", "Your scope sheets"], approver: "Project executive" },
  { title: "Sub insurance read before they mobilize", phase: "Buyout", label: "Sub insurance", doc: "Sub file · COIs and endorsements", tag: "PDF",
    checks: ["Limits against the subcontract", "Policy dates", "Additional insured wording", "Waiver of subrogation wording", "Request to the sub's agent drafted"], approver: "Project administrator" },
  { title: "Drawings, model and spec book disagree", phase: "Build", label: "Drawing conflicts", doc: "Conflict list · drawings, model and spec book", tag: "LOG",
    checks: ["Sheet notes, schedules and details across disciplines", "Quantities and schedules exported from the model", "Navisworks clashes turned into an RFI log with sheet references"], approver: "Project manager" },
  { title: "Submittal review against the spec section", phase: "Build", label: "Submittals", doc: "Submittal package · against the spec section", tag: "PDF",
    checks: ["Spec section, line by line", "Approved substitutions", "The drawings", "Review summary drafted for the PM"], approver: "Project manager" },
  { title: "RFIs and change orders tied to the contract", phase: "Build", label: "RFIs and change orders", doc: "RFI responses, ASIs and the architect's email", tag: "LOG",
    checks: ["Each answer compared to the contract documents", "Affected sub scopes listed", "PCO drafted with a request for sub pricing"], approver: "Project manager, then the owner's rep" },
  { title: "Pay apps, lien waivers and retainage", phase: "Bill", label: "Pay apps", doc: "Sub pay app · Sage 300 CRE", tag: "XLS",
    checks: ["Commitment and approved COs", "Percent complete against the schedule of values", "Lien waiver for the period", "Owner's G702 and G703 drafted"], approver: "Controller" },
  { title: "Closeout checked against Division 01", phase: "Close", label: "Closeout", doc: "Closeout log · Division 01, by sub", tag: "LOG",
    checks: ["Warranties", "O&M manuals", "Attic stock", "As-builts", "Training records"], approver: "Project manager" },
];

const TICK = 700;

export function JobWalk({ scenarios }: { scenarios: Scenario[] }) {
  const steps = STAGES.flatMap((s) => {
    const sc = scenarios.find((x) => x.title === s.title);
    return sc ? [{ ...s, sc }] : [];
  });

  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [{ idx, t }, setPlay] = useState({ idx: 0, t: 0 });
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [signed, setSigned] = useState<Set<number>>(() => new Set());

  const step = steps[idx];
  // tick at which each part of a stage appears
  const timing = (k: number) => { const n = steps[k] ? steps[k].checks.length : 0; return { flag: n + 1, review: n + 2, approve: n + 4, done: n + 5, next: n + 12 }; };
  const at = timing(idx);
  const shown = reduced || !auto ? 99 : t;
  const playing = auto && !reduced;
  // in the auto-run the approver signs off on their own; when the visitor drives, they click Approve
  const approved = signed.has(idx) || (playing && t >= at.approve);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    const el = root.current;
    if (!el) return () => mq.removeEventListener("change", set);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); mq.removeEventListener("change", set); };
  }, []);

  // gentle auto-run while on screen, until the visitor takes over
  useEffect(() => {
    if (!auto || reduced || !inView) return;
    const id = setInterval(() => {
      setPlay((p) => {
        if (p.t < timing(p.idx).next) return { ...p, t: p.t + 1 };
        return p.idx + 1 < steps.length ? { idx: p.idx + 1, t: 0 } : p;
      });
    }, TICK);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, reduced, inView, steps.length]);

  // when the rail runs sideways (narrow screens), keep the active stage in view without moving the page
  useEffect(() => {
    const tab = tabs.current[idx];
    const rail = tab?.closest(".uc-jw-rail") as HTMLElement | null;
    if (!tab || !rail || rail.scrollWidth <= rail.clientWidth) return;
    const stop = tab.parentElement as HTMLElement;
    rail.scrollTo({ left: Math.max(0, stop.offsetLeft - 16), behavior: reduced ? "auto" : "smooth" });
  }, [idx, reduced]);

  // stop once the last stage has played through
  useEffect(() => {
    if (auto && idx === steps.length - 1 && t >= at.next) setAuto(false);
  }, [auto, idx, t, at.next, steps.length]);

  const go = useCallback((i: number, focus = false) => {
    setAuto(false);
    setPlay({ idx: i, t: 99 });
    if (focus) tabs.current[i]?.focus();
  }, []);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = steps.length - 1;
    const map: Record<string, number> = { ArrowDown: idx + 1, ArrowRight: idx + 1, ArrowUp: idx - 1, ArrowLeft: idx - 1, Home: 0, End: last };
    if (!(e.key in map)) return;
    e.preventDefault();
    go(Math.max(0, Math.min(last, map[e.key])), true);
  };

  const replay = () => { setSigned(new Set()); setPlay({ idx: 0, t: 0 }); setAuto(!reduced); tabs.current[0]?.focus(); };
  const approve = () => { setAuto(false); setPlay((p) => ({ ...p, t: 99 })); setSigned((s) => new Set(s).add(idx)); };

  if (!step) return null;
  const next = steps[idx + 1];
  const cls = (on: boolean) => (on ? " in" : "");

  return (
    <div className="xdemo uc-jw" ref={root}>
      <div className="x-head">
        <div className="x-mark" />
        <div>
          <div className="x-title">One job, bid set to final payment</div>
          <div className="x-sub">Ten points where an agent reads the paperwork and a person signs off</div>
        </div>
        <button type="button" className="replay uc-jw-replay" onClick={replay}>Replay from the bid set</button>
      </div>

      <div className="uc-jw-body">
        <div className="uc-jw-rail" role="tablist" aria-orientation="vertical" aria-label="Stages of the job" onKeyDown={onKey}>
          {steps.map((s, i) => (
            <div key={s.title} className="uc-jw-stop">
              <button
                type="button"
                role="tab"
                id={`jw-tab-${i}`}
                aria-controls="jw-panel"
                aria-selected={i === idx}
                tabIndex={i === idx ? 0 : -1}
                ref={(el) => { tabs.current[i] = el; }}
                className={`uc-jw-tab${i === idx ? " on" : ""}${i < idx ? " past" : ""}`}
                onClick={() => go(i)}
              >
                <span className="uc-jw-no">{String(i + 1).padStart(2, "0")}</span>
                <b>{s.label}</b>
                {(i === 0 || steps[i - 1].phase !== s.phase) && <span className="uc-jw-phase" aria-hidden="true">{s.phase}</span>}
                <span className="uc-jw-sr">{s.phase} stage, {s.sc.dept}</span>
                {i === idx && auto && !reduced && <span className="uc-jw-prog" style={{ width: `${Math.min(100, (t / at.next) * 100)}%` }} />}
              </button>
            </div>
          ))}
        </div>

        <div className="uc-jw-panel" role="tabpanel" id="jw-panel" aria-labelledby={`jw-tab-${idx}`} key={step.title}>
          <div className="uc-jw-top">
            <div className="meta">Stage {idx + 1} of {steps.length} · {step.phase} · {step.sc.dept}</div>
            <h3>{step.sc.title}</h3>
          </div>

          <div className="x-2col wide-left uc-jw-grid">
            <div className="x-card">
              <div className="x-cardhead">
                <span className="uc-jw-doc"><span className="uc-jw-tag">{step.tag}</span><b>{step.doc}</b></span>
                {shown < at.flag
                  ? <small className="x-live uc-jw-reading"><i />Agent reading</small>
                  : <small>{step.checks.length} checked · 1 flagged</small>}
              </div>
              <ul className="uc-jw-lines" aria-label="What the agent checked">
                {step.checks.map((c, i) => (
                  <li className={`uc-jw-line${cls(shown > i)}`} key={c}>
                    <span className="x-dot" aria-hidden="true" />
                    <span>{c}</span>
                    <em aria-hidden="true">✓</em>
                  </li>
                ))}
                <li className={`uc-jw-line uc-jw-flag${cls(shown >= at.flag)}${approved ? " fixed" : ""}`}>
                  <span className={`x-dot${approved ? "" : " warn"}`} aria-hidden="true" />
                  <span><small className="uc-jw-flagq">Flagged</small>{step.sc.catch}</span>
                </li>
              </ul>
            </div>

            <div className="x-stack">
              <div className="uc-jw-how"><span className="meta">What the agent does</span><p>{step.sc.ai}</p></div>
              <div className={`x-review uc-jw-review${cls(shown >= at.review)}`}>
                <div className="x-q">{approved ? `Signed off by the ${step.approver.toLowerCase()}` : `Waiting on the ${step.approver.toLowerCase()}`}</div>
                <p>Nothing goes out until a person approves it. Who approves here: {step.sc.person}.</p>
                <div className="x-btns">
                  <button type="button" className={`uc-jw-btn${approved ? " sel" : ""}`} onClick={approve} aria-pressed={approved}>
                    {approved ? `Approved by the ${step.approver.toLowerCase()}` : `Approve as ${step.approver.toLowerCase()}`}
                  </button>
                </div>
              </div>
              <div className={`x-done uc-jw-done${cls(signed.has(idx) || (approved && t >= at.done))}`} aria-live="polite">
                {approved && <div><em>✓</em>Signed off. The agent did the reading; the {step.approver.toLowerCase()} made the call.</div>}
                {approved && next && <button type="button" className="uc-jw-next" onClick={() => go(idx + 1, true)}>Next: {next.label} <span aria-hidden="true">→</span></button>}
                {approved && !next && <div><em>✓</em>Job closed out. {steps.length} stages, {steps.length} sign-offs.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="x-foot">
        <span className="x-note">Nothing goes out until a person approves it.</span>
        <span className="x-note uc-jw-hint">Click a stage, or use the arrow keys.</span>
      </div>
    </div>
  );
}
