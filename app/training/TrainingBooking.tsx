"use client";

import { useState } from "react";
import { COMPANY_TYPES, TRAINING_HOURS } from "@/lib/training";

const STEPS = [
  { t: "Tell us about your team", d: "Company type and team size, so the day fits." },
  { t: "We send a quote and dates", d: "Within one business day, in writing." },
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

  if (status === "sent") {
    return (
      <div className="h-formcard" style={{ textAlign: "center", padding: "56px 32px", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Got it. We&apos;ll reply within one business day.</h2>
        <p style={{ color: "#64748b" }}>We&apos;ll send a written quote and open dates. Nothing is charged until you approve it.</p>
      </div>
    );
  }

  return (
    <div className="h-feature" style={{ alignItems: "start" }}>
      <div>
        <div className="h-eyebrow">Book a day</div>
        <h2>Tell us about your team. We&apos;ll send a quote.</h2>
        <p className="h-feature-sub">One {TRAINING_HOURS}-hour day, tailored to your company type, for everyone on the team.</p>
        <ol className="tr-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <span aria-hidden="true">{i + 1}</span>
              <div><strong>{s.t}</strong><small>{s.d}</small></div>
            </li>
          ))}
        </ol>
      </div>

      <div className="h-formcard" id="book">
        <form className="h-form" onSubmit={submit}>
          <div className="h-2col">
            <label>Company type *
              <select name="industry" required value={form.industry} onChange={set}>
                <option value="">Select one</option>
                {COMPANY_TYPES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>How many people? *<input name="headcount" type="number" min={1} required inputMode="numeric" placeholder="e.g. 18" value={form.headcount} onChange={set} /></label>
          </div>
          <div className="h-2col">
            <label>Name *<input name="name" required value={form.name} onChange={set} /></label>
            <label>Work email *<input name="email" type="email" required value={form.email} onChange={set} /></label>
          </div>
          <label>Company *<input name="company" required value={form.company} onChange={set} /></label>
          <label>Preferred dates<input name="dates" placeholder="e.g. any Tuesday in November" value={form.dates} onChange={set} /></label>
          <label>What does your team do all day? What should we cover?<textarea name="message" value={form.message} onChange={set} /></label>
          <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
          {status === "error" && <p style={{ color: "#b42318", fontSize: "0.9rem" }}>Something went wrong sending that. Please try again in a moment.</p>}
          <button type="submit" className="h-btn h-btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Request a training day"}</button>
          <p className="h-plan-terms" style={{ margin: 0 }}>We reply within one business day with a written quote. Nothing is charged until you approve it.</p>
        </form>
      </div>
    </div>
  );
}
