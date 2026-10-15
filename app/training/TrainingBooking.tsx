"use client";

// Training-day request form. Posts to /api/contact with the "TRAINING DAY REQUEST" marker (body fields unchanged).
import { useState } from "react";
import { COMPANY_TYPES, TRAINING_HOURS } from "@/lib/training";

const STEPS = [
  { t: "Tell us about your team", d: "Company type and team size, so the day fits." },
  { t: "We send a quote and dates", d: "The same business day." },
  { t: "We come to your team", d: `${TRAINING_HOURS} hours, hands-on, on your own work.` },
];

export function TrainingBooking() {
  const [form, setForm] = useState({ industry: "", headcount: "", name: "", email: "", company: "", dates: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          industry: form.industry,
          availability: form.dates,
          message: [`TRAINING DAY REQUEST. Team size: ${form.headcount}.`, form.message].filter(Boolean).join("\n\n"),
          website: form.website,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="tr-book" id="book">
      <div>
        <div className="label">Request a day</div>
        <h2 className="h2">Tell us about your team. <span className="mute">We&apos;ll send a quote.</span></h2>
        <p className="lead">One {TRAINING_HOURS}-hour day, tailored to your company type, for everyone on the team.</p>
        <ol className="tr-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <span className="tr-sn" aria-hidden="true">0{i + 1}</span>
              <div><b>{s.t}</b><span>{s.d}</span></div>
            </li>
          ))}
        </ol>
      </div>

      {status === "sent" ? (
        <div className="form-done" role="status">
          <h3>Got it. We&apos;ll reply the same business day.</h3>
          <p>We&apos;ll send a written quote and open dates. Nothing is charged until you approve it.</p>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label>Company type *
            <select name="industry" required value={form.industry} onChange={set}>
              <option value="">Select one</option>
              {COMPANY_TYPES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Team size *
            <select name="headcount" required value={form.headcount} onChange={set}>
              <option value="">Select one</option>
              {["Under 50", "50 to 99", "100 to 249", "250 or more"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label>Name *<input name="name" required autoComplete="name" value={form.name} onChange={set} /></label>
          <label>Work email *<input name="email" type="email" required autoComplete="email" value={form.email} onChange={set} /></label>
          <label className="full">Company *<input name="company" required autoComplete="organization" value={form.company} onChange={set} /></label>
          <label className="full">Preferred dates<input name="dates" placeholder="e.g. any Tuesday in November" value={form.dates} onChange={set} /></label>
          <label className="full">What does your team do all day? What should we cover?<textarea name="message" value={form.message} onChange={set} /></label>
          <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
          <div className="full form-foot">
            <button type="submit" className="btn" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Request a training day <span aria-hidden="true">→</span></>}</button>
            <span className="next">We reply the same business day with a written quote. Nothing is charged until you approve it.</span>
            {status === "error" && <span className="form-err" role="alert">Something went wrong sending that. Please try again in a moment.</span>}
          </div>
        </form>
      )}
    </div>
  );
}
