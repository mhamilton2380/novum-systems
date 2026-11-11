"use client";
// Industry pages: follow one piece of work from start to finish (one job, one close, one renewal).
// Every stage is one scenario from SCENARIOS[slug] (lib/nv/useCaseScenarios.ts); the stage order, short
// labels, document names and checked lines live in lib/nv/walks/<slug>.ts. The flagged line is the
// scenario's "catch"; the approver is its "person". Nothing here adds facts.
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Scenario } from "@/lib/nv/useCaseScenarios";
import type { Walk } from "@/lib/nv/walks";
import { DocView, viewSteps } from "./DocView";

const TICK = 700;

export function JobWalk({ scenarios, walk }: { scenarios: Scenario[]; walk: Walk }) {
  const steps = walk.stages.flatMap((s) => {
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
  // In real estate and insurance "agent" means a person, so those walks call the software "AI".
  const ai = walk.aiName ?? "agent";
  const Ai = ai === "agent" ? "Agent" : ai;
  const theAi = ai === "agent" ? "the agent" : `the ${ai}`;
  // tick at which each part of a stage appears
  const timing = (k: number) => { const st = steps[k]; const n = !st ? 0 : st.view ? viewSteps(st.view) : st.checks.length; return { flag: n + 1, review: n + 2, approve: n + 4, done: n + 5, next: n + 12 }; };
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
    <div className={`xdemo uc-jw${steps.some((x) => x.view) ? " has-views" : ""}`} ref={root}>
      <div className="x-head">
        <div className="x-mark" />
        <div>
          <div className="x-title">{walk.demoTitle}</div>
          <div className="x-sub">{walk.demoSub}</div>
        </div>
        <button type="button" className="replay uc-jw-replay" onClick={replay}>{walk.replay}</button>
      </div>

      <div className="uc-jw-body">
        <div className="uc-jw-rail" role="tablist" aria-orientation={steps.some((x) => x.view) ? "horizontal" : "vertical"} aria-label={walk.railLabel} onKeyDown={onKey}>
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

          <div className={`x-2col wide-left uc-jw-grid${step.view ? " has-view" : ""}`}>
            <div className="x-card">
              <div className="x-cardhead">
                {step.view
                  ? <span className="uc-jw-doc uc-jw-doc2"><span className="uc-jw-tag">{step.tag}</span><span><b>{step.view.title}{step.view.stamp && <span className="uc-dv-stamp">{step.view.stamp}</span>}</b><small>{step.view.meta}<span className="uc-jw-sr"> · {step.doc}</span></small></span></span>
                  : <span className="uc-jw-doc"><span className="uc-jw-tag">{step.tag}</span><b>{step.doc}</b></span>}
                {shown < at.flag
                  ? <small className="x-live uc-jw-reading"><i />{Ai} reading</small>
                  : <small>{step.view ? "1 flagged" : `${step.checks.length} checked · 1 flagged`}</small>}
              </div>
{step.view ? (
                <>
                  <ul className="uc-jw-sr">{step.checks.map((c) => <li key={c}>{c}</li>)}</ul>
                  <DocView view={step.view} shown={shown} lit={shown >= at.flag} resolved={approved} head={false} />
                  <div className={`uc-jw-line uc-jw-flag uc-jw-callout${cls(shown >= at.flag)}${approved ? " fixed" : ""}`}>
                    <span className={`x-dot${approved ? "" : " warn"}`} aria-hidden="true" />
                    <span><small className="uc-jw-flagq">Flagged</small>{step.sc.catch}</span>
                  </div>
                </>
              ) : (
                            <ul className="uc-jw-lines" aria-label={`What ${theAi} checked`}>
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
              )}
            </div>

            <div className="x-stack">
              <div className="uc-jw-how"><span className="meta">What {theAi} does</span><p>{step.sc.ai}</p></div>
              <div className={`x-review uc-jw-review${cls(shown >= at.review)}`}>
                <div className="x-q">{approved ? `Signed off by the ${step.approver.toLowerCase()}` : `Waiting on the ${step.approver.toLowerCase()}`}</div>
                <p>Nothing goes out until a person approves it. Who approves here: {step.sc.person}.</p>
                <div className="x-btns">
                  <button type="button" className={`uc-jw-btn${approved ? " sel" : ""}`} onClick={approve} aria-pressed={approved}>
                    {/* long roles would wrap the button; the line above already names who is approving */}
                    {step.approver.length > 28
                      ? (approved ? "Approved" : "Approve")
                      : (approved ? `Approved by the ${step.approver.toLowerCase()}` : `Approve as ${step.approver.toLowerCase()}`)}
                  </button>
                </div>
              </div>
              <div className={`x-done uc-jw-done${cls(signed.has(idx) || (approved && t >= at.done))}`} aria-live="polite">
                {approved && <div><em>✓</em>Signed off. {ai === "agent" ? "The agent" : `The ${ai}`} did the reading; the {step.approver.toLowerCase()} made the call.</div>}
                {approved && next && <button type="button" className="uc-jw-next" onClick={() => go(idx + 1, true)}>Next: {next.label} <span aria-hidden="true">→</span></button>}
                {approved && !next && <div><em>✓</em>{walk.closed} {steps.length} stages, {steps.length} sign-offs.</div>}
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
