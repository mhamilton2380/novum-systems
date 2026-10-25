"use client";
// The AI Readiness Score, restyled for the new design. Scoring is unchanged (lib/assessment.ts, scored in the browser).
// Nothing is sent until the visitor asks for the write-up: then POST /api/assessment saves the lead and emails it.
import { useRef, useState } from "react";
import Link from "next/link";
import { AREAS, QUESTIONS, answerLabel, fmt, scoreFor, type Answers } from "@/lib/assessment";
import "./as.css";

const AREA_NAME = Object.fromEntries(AREAS.map((a) => [a.id, a.name]));
const SIZES = ["Under 50", "50 to 99", "100 to 249", "250 or more"];

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
          <div className="as-q" key={q.id}>
            <h2>{q.q}</h2>
            {q.note && <p className="as-note">{q.note}</p>}
            <div className="as-opts" role="radiogroup" aria-label={q.q}>
              {q.options.map((o, i) => (
                <button key={o.label} type="button" role="radio" aria-checked={answers[q.id] === i} className={answers[q.id] === i ? "on" : ""} onClick={() => choose(i)}>
                  <span className="as-dot" aria-hidden="true" />{o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="as-nav">
            {step > 0 ? <button type="button" className="as-back" onClick={() => setStep(step - 1)}>← Back</button> : <span />}
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
    <div className="as-results" aria-live="polite">
      <div className="as-score">
        <div className="as-big">{r.score}<small>out of 100</small></div>
        <div>
          <div className="as-band">{r.band.name}</div>
          <h2>{r.band.headline}</h2>
          <table className="as-areas">
            <thead><tr><th>Area</th><th>Score</th></tr></thead>
            <tbody>
              {r.areas.map((a) => <tr key={a.id}><td>{a.name}</td><td className="v">{a.score} / 20</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="as-h">What&apos;s holding you back</h3>
        <div className="as-flags">
          {r.top.map((f) => (
            <div key={f.title} className="as-flag">
              <strong>{f.title}</strong>
              <p>{f.text}</p>
              {f.fix && <small>What fixes it: {f.fix}</small>}
            </div>
          ))}
        </div>
      </div>

      <div className="as-est">
        <div>
          <div className="as-band">Hours on the table</div>
          {r.estimate.skip ? (
            <p className="as-est-big">Your team doesn&apos;t report much repeat work. The bigger gains may be in connecting your tools or replacing one you&apos;ve outgrown.</p>
          ) : (
            <>
              <p className="as-est-big">About <strong>{fmt(r.estimate.hoursLow)} to {fmt(r.estimate.hoursHigh)} hours</strong> a year, a value of roughly <strong>${fmt(r.estimate.dollarsLow)} to ${fmt(r.estimate.dollarsHigh)}</strong> in staff time (wages and benefits).</p>
              <small>Based on published studies of AI on routine office work. This is the value of staff time, not cash. It becomes cash only when it replaces a hire or fills with new work. A discovery measures your real number.</small>
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
              {status === "error" && <p className="as-err" role="alert">Something went wrong sending that. Please try again in a moment.</p>}
              <button type="submit" className="btn" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Email my write-up"}</button>
              <p className="fine" style={{ marginTop: 0 }}>We use your answers and contact details to send the write-up and follow up. See our <Link href="/privacy" style={{ textDecoration: "underline" }}>privacy page</Link>.</p>
            </form>
          )}
        </div>
        <div className="as-cta">
          <strong>Want the real number?</strong>
          <p>A discovery measures it on your own work, and ends with a working tool on your own data.</p>
          <Link href="/contact" className="btn">Talk to us <span aria-hidden="true">→</span></Link>
          <button type="button" className="as-restart" onClick={onRestart}>Retake the assessment</button>
        </div>
      </div>
    </div>
  );
}
