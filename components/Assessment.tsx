"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AREAS, QUESTIONS, answerLabel, fmt, scoreFor, type Answers } from "@/lib/assessment";
import { Guarantee } from "@/components/PageVisuals";

// The AI Readiness Score: one question per screen, scored in the browser. Nothing is sent until the visitor
// asks for the full write-up (then /api/assessment saves the lead and emails it).
const AREA_NAME = Object.fromEntries(AREAS.map((a) => [a.id, a.name]));
const SIZES = ["1 to 14", "15 to 49", "50 to 99", "100 to 249", "250 or more"];

function Ring({ score }: { score: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const k = reduce ? 1 : Math.min(1, (t - t0) / 1200); setShown(Math.round(score * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);
  const C = 2 * Math.PI * 54;
  return (
    <div className="as-ring">
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <defs><linearGradient id="as-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00b36e" /><stop offset="0.55" stopColor="#0891b2" /><stop offset="1" stopColor="#3b6fe0" /></linearGradient></defs>
        <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="10" />
        <circle cx="64" cy="64" r="54" fill="none" stroke="url(#as-g)" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - shown / 100)} transform="rotate(-90 64 64)" />
      </svg>
      <div><strong>{shown}</strong><small>out of 100</small></div>
    </div>
  );
}

export function Assessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const q = QUESTIONS[step];

  const choose = (i: number) => {
    const next = { ...answers, [q.id]: i };
    setAnswers(next);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) setStep(step + 1);
      else { setDone(true); top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }, 220);
  };
  const restart = () => { setAnswers({}); setStep(0); setDone(false); };

  return (
    <div ref={top} className="as-wrap" id="quiz">
      {!done ? (
        <div className="as-card">
          <div className="as-top">
            <span>Question {step + 1} of {QUESTIONS.length}</span>
            <em>{q.area ? AREA_NAME[q.area] : "About you"}</em>
          </div>
          <div className="as-prog"><i style={{ width: `${(step / QUESTIONS.length) * 100}%` }} /></div>
          <div className="as-q" key={q.id}>
            <h2>{q.q}</h2>
            {q.note && <p className="as-note">{q.note}</p>}
            <div className="as-opts" role="radiogroup" aria-label={q.q}>
              {q.options.map((o, i) => (
                <button key={o.label} role="radio" aria-checked={answers[q.id] === i} className={answers[q.id] === i ? "on" : ""} onClick={() => choose(i)} style={{ ["--i" as string]: i }}>
                  <span className="as-dot" aria-hidden="true" />{o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="as-nav">
            {step > 0 ? <button className="as-back" onClick={() => setStep(step - 1)}>← Back</button> : <span />}
            <small>Takes about 2 minutes. Nothing is sent unless you ask for the write-up.</small>
          </div>
        </div>
      ) : (
        <Results answers={answers} onRestart={restart} />
      )}
    </div>
  );
}

function Results({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const r = scoreFor(answers);
  const [form, setForm] = useState({ name: "", company: "", email: "", size: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, answers }) });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="as-results">
      <div className="as-hero">
        <Ring score={r.score} />
        <div>
          <div className="as-band">{r.band.name}</div>
          <h2>{r.band.headline}</h2>
          <div className="as-areas">
            {r.areas.map((a, i) => (
              <div key={a.id} className="as-area" style={{ ["--i" as string]: i }}>
                <span>{a.name}</span>
                <i><b style={{ width: `${a.score * 5}%` }} /></i>
                <em>{a.score}/20</em>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 className="as-h">What&apos;s holding you back</h3>
      <div className="as-flags">
        {r.top.map((f, i) => (
          <div key={f.title} className="as-flag" style={{ ["--i" as string]: i }}>
            <span className="as-flag-n">{i + 1}</span>
            <strong>{f.title}</strong>
            <p>{f.text}</p>
            {f.fix && <small>What fixes it: {f.fix}</small>}
          </div>
        ))}
      </div>

      <div className="as-est">
        <div>
          <div className="as-band">Hours on the table</div>
          {r.estimate.skip ? (
            <p className="as-est-big">Your team doesn&apos;t report much repeat work. The bigger gains may be in connecting your tools or replacing one you&apos;ve outgrown.</p>
          ) : (
            <>
              <p className="as-est-big">About <strong>{fmt(r.estimate.hoursLow)} to {fmt(r.estimate.hoursHigh)} hours</strong> a year, worth roughly <strong>${fmt(r.estimate.dollarsLow)} to ${fmt(r.estimate.dollarsHigh)}</strong> in wages and benefits.</p>
              <small>Based on published studies of AI on routine office work. Your discovery measures your real number.</small>
            </>
          )}
        </div>
        <div className="as-compare">
          <strong>39%</strong>
          <span>of US workers use AI at work every week <em>(St. Louis Fed, mid-2026)</em></span>
          <span className="as-you">Your team: <b>{answerLabel(answers, "weekly_use")}</b></span>
        </div>
      </div>

      <div className="as-next">
        <div className="as-mail">
          {status === "sent" ? (
            <div className="as-sent"><strong>On its way.</strong> Check your inbox for the full write-up: every flag, what other companies do about each one, and your estimate.</div>
          ) : (
            <form onSubmit={send}>
              <strong>Send me the full write-up</strong>
              <p>Every flag that fired, not just three, with what other companies do about each one. Optional.</p>
              <div className="as-fields">
                <input name="name" placeholder="Name" required value={form.name} onChange={set} aria-label="Name" />
                <input name="company" placeholder="Company" required value={form.company} onChange={set} aria-label="Company" />
                <input name="email" type="email" placeholder="Work email" required value={form.email} onChange={set} aria-label="Work email" />
                <select name="size" value={form.size} onChange={set} aria-label="Company size">
                  <option value="">Company size</option>
                  {SIZES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
              {status === "error" && <p className="as-err">Something went wrong sending that. Please try again in a moment.</p>}
              <button type="submit" className="h-btn h-btn-ghost" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Email my write-up"}</button>
            </form>
          )}
        </div>
        <div className="as-cta">
          <strong>Want the real number?</strong>
          <p>A discovery measures it on your own work, and ends with your first build live within 30 days.</p>
          <Link href="/contact" className="h-btn h-btn-primary">Book a discovery call</Link>
          <Guarantee compact />
          <button className="as-restart" onClick={onRestart}>Retake the assessment</button>
        </div>
      </div>
    </div>
  );
}
