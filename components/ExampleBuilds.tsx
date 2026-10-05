"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EXAMPLES, type Example } from "./exampleData";
import { USE_CASE_NAV } from "@/lib/nav";

const TICK = 550;
const BARS = [30, 55, 80, 45, 90, 65, 35, 75, 50, 95, 60, 40, 85, 55, 30, 70, 90, 45, 65, 35, 80, 50, 60, 40];
const LINES = [70, 45, 88, 60, 92, 76, 84, 52, 66];

// Tick at which each part of an example appears
function timeline(ex: Example) {
  const read = ex.source.kind === "call" ? ex.source.items.length : 1;
  const fields = read + 1;
  const rows = fields + ex.fields.length + 1;
  const flag = rows + ex.rows.length + 1;
  const pick = flag + 3;
  const approved = pick + 2;
  const posted = approved + 2;
  return { read, fields, rows, flag, pick, approved, posted, end: posted + 7 };
}

function Flow({ ex, t }: { ex: Example; t: number }) {
  const tl = timeline(ex);
  const stage = t >= tl.flag ? 3 : t >= tl.rows ? 2 : t >= tl.read ? 1 : 0;
  const fieldsIn = Math.max(0, Math.min(ex.fields.length, t - tl.fields + 1));
  const rowsIn = Math.max(0, Math.min(ex.rows.length, t - tl.rows + 1));
  const picked = t >= tl.pick;

  return (
    <div className="ia-flow">
      {/* 1. Arrives */}
      <div className={`ia-col${stage === 0 ? " on" : ""}`}>
        <div className="ia-colhead"><span>1</span>{ex.steps[0]}</div>
        {ex.source.kind === "mail" ? (
          <div className="ia-inbox">
            {ex.source.items.map((m, i) => (
              <div className={`ia-mail${i === 0 ? " first" : ""}${i === 0 && t >= 1 ? " read" : ""}`} key={m.subj}>
                <div className="ia-mail-top"><b>{m.from}</b><small>{m.time}</small></div>
                <p>{m.subj}</p>
                {m.file && <span className="ia-att"><span className="sc-file">{m.file.split(".").pop()!.toUpperCase()}</span>{m.file}</span>}
              </div>
            ))}
          </div>
        ) : (
          <div className="ia-call">
            {ex.source.items.map((s, i) => (
              <div className={`ia-said${s.who === "Agent" ? " agent" : ""}${t >= i ? " in" : ""}`} key={s.text}>
                <small>{s.who}</small>{s.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Reads */}
      <div className={`ia-col${stage === 1 ? " on" : ""}`}>
        <div className="ia-colhead"><span>2</span>{ex.steps[1]}</div>
        <div className="ia-doc">
          <div className="ia-doc-head"><span className={`ia-tag ${ex.doc.tag.toLowerCase()}`}>{ex.doc.tag}</span>{ex.doc.name}</div>
          {ex.doc.tag === "CALL" ? (
            <div className="ia-wave">
              {BARS.map((h, i) => <i key={i} style={{ height: `${h}%` }} className={t >= tl.read && t < tl.rows ? "live" : ""} />)}
            </div>
          ) : (
            <div className="ia-doc-body">
              {LINES.map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}
              {t >= tl.read && t < tl.rows && <div className="ia-scan" />}
            </div>
          )}
        </div>
        <div className="ia-fields">
          {ex.fields.map(([k, v], i) => (
            <div className={`ia-field${fieldsIn > i ? " in" : ""}`} key={k}>
              <small>{k}</small><b>{v}</b><em>✓</em>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Drafts */}
      <div className={`ia-col${stage === 2 ? " on" : ""}`}>
        <div className="ia-colhead"><span>3</span>{ex.steps[2]}</div>
        <div className="ia-lines">
          {rowsIn === 0 && <div className="ia-wait">Waiting on step 2…</div>}
          {ex.rows.map((r, i) => {
            const open = r.flag && t >= tl.flag && !picked;
            const showFlag = r.flag && !picked;
            return (
              <div className={`ia-line${rowsIn > i ? " in" : ""}${open ? " flag" : ""}${r.flag && picked ? " fixed" : ""}`} key={r.lead + r.main}>
                <span className="ia-qty">{r.lead}</span>
                <span className="ia-desc">
                  <b>{showFlag ? r.flag!.main : r.main}</b>
                  <small>{showFlag && r.flag!.sub ? r.flag!.sub : r.sub}</small>
                </span>
                <span className="ia-price">{showFlag ? r.flag!.right : r.right}</span>
                <span className={`ia-dot${showFlag ? " warn" : ""}`} />
              </div>
            );
          })}
        </div>
        {ex.total && <div className={`ia-total${t >= tl.approved ? " in" : ""}`}><span>{ex.total[0]}</span><b>{ex.total[1]}</b></div>}
      </div>

      {/* 4. A person approves */}
      <div className={`ia-col${stage === 3 ? " on" : ""}`}>
        <div className="ia-colhead"><span>4</span>{ex.steps[3]}</div>
        {t < tl.flag && <div className="ia-wait ia-wait-box">Nothing goes out until a person approves it.</div>}
        <div className={`ia-review${t >= tl.flag ? " in" : ""}`}>
          <div className="ia-review-q">{ex.review.q}</div>
          <p>{ex.review.p}</p>
          {ex.review.options.map((o, i) => (
            <div className={`ia-opt${picked && i === 0 ? " sel" : ""}`} key={o.b}>
              <b>{o.b}</b>
              <small>{o.small}</small>
            </div>
          ))}
        </div>
        <div className="ia-done">
          {ex.done.map((d, i) => (
            <div className={t >= (i === 0 ? tl.approved : tl.posted + i - 1) ? "in" : ""} key={d}><em>✓</em>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExampleBuilds() {
  const ref = useRef<HTMLDivElement>(null);
  const [{ idx, t }, setPlay] = useState({ idx: 0, t: 0 });
  const [running, setRunning] = useState(false);
  const ex = EXAMPLES[idx];
  const end = timeline(ex).end;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion: show each example finished instead of animating
    const io = new IntersectionObserver(([e]) => {
      if (reduced) { if (e.isIntersecting) setPlay((p) => ({ ...p, t: 99 })); return; }
      setRunning(e.isIntersecting);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Play the example, then move on to the next one
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setPlay((p) => p.t < timeline(EXAMPLES[p.idx]).end ? { ...p, t: p.t + 1 } : { idx: (p.idx + 1) % EXAMPLES.length, t: 0 });
    }, TICK);
    return () => clearInterval(id);
  }, [running]);

  const pick = (i: number) => setPlay({ idx: i, t: running ? 0 : 99 });
  const useCase = USE_CASE_NAV.find((u) => u.slug === ex.slug);

  return (
    <div className="ia" ref={ref}>
      <div className="ia-tabs" role="tablist" aria-label="Example builds">
        {EXAMPLES.map((e, i) => (
          <button
            type="button"
            role="tab"
            aria-selected={i === idx}
            className={`ia-tab${i === idx ? " on" : ""}`}
            key={e.id}
            onClick={() => pick(i)}
          >
            <b>{e.tab}</b>
            <small>{e.industry}</small>
            {i === idx && running && <span className="ia-tabprog" style={{ width: `${Math.min(100, (t / end) * 100)}%` }} />}
          </button>
        ))}
      </div>
      <div className="sc-head">
        <div className="sc-mark" />
        <div>
          <div className="sc-title">{ex.title}</div>
          <div className="sc-sub">{ex.sub}</div>
        </div>
        <span className="sc-industry">Example: {ex.industry}</span>
      </div>

      <Flow ex={ex} t={t} key={ex.id} />

      <div className="ia-foot">
        <span className="ia-foot-label">Every example runs on your own data, and a person approves before anything leaves the company.</span>
        <Link href={`/use-cases/${ex.slug}`} className="ia-foot-link">See the {useCase?.label ?? ex.industry} use case →</Link>
      </div>
    </div>
  );
}
