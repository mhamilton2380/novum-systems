"use client";

import { useState } from "react";
import { PLANS, firstYear, usd } from "@/lib/aiOfficerPlans";

const SELF_SERVE = PLANS.filter((p) => p.selfServe);

export function SignupForm({ initialPlan }: { initialPlan: "basic" | "growth" }) {
  const [plan, setPlan] = useState<string>(initialPlan);
  const [form, setForm] = useState({ name: "", email: "", company: "", teamSize: "", message: "", agree: false, website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const chosen = SELF_SERVE.find((p) => p.id === plan)!;

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          name: form.name,
          email: form.email,
          company: form.company,
          message: [`Team size: ${form.teamSize || "not given"}`, form.message].filter(Boolean).join("\n\n"),
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
        <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>You&apos;re signed up for {chosen.name}.</h2>
        <p style={{ color: "#64748b" }}>We&apos;ll email the agreement and your first invoice within one business day, then book your first training session.</p>
      </div>
    );
  }

  return (
    <div className="h-feature" style={{ alignItems: "start" }}>
      <div className="h-plan-pick">
        {SELF_SERVE.map((p) => (
          <button type="button" key={p.id} className={`h-plan h-plan-option${plan === p.id ? " on" : ""}`} onClick={() => setPlan(p.id)} aria-pressed={plan === p.id}>
            <span className="h-card2-tag">{p.name}</span>
            <div className="h-plan-price"><strong>{usd(p.monthly!)}</strong><span>/month</span></div>
            <p className="h-plan-terms">12-month plan, first 2 months free. {usd(firstYear(p)!)} for the year.</p>
            <ul className="h-checks">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </button>
        ))}
        <p className="h-plan-terms">Need building and upkeep too? Pro and Enterprise start with a <a href="/contact">discovery</a>.</p>
      </div>

      <div className="h-formcard">
        <form className="h-form" onSubmit={submit}>
          <div className="h-2col">
            <label>Name *<input name="name" required value={form.name} onChange={set} /></label>
            <label>Work email *<input name="email" type="email" required value={form.email} onChange={set} /></label>
          </div>
          <div className="h-2col">
            <label>Company *<input name="company" required value={form.company} onChange={set} /></label>
            <label>Team size<input name="teamSize" inputMode="numeric" placeholder="e.g. 18" value={form.teamSize} onChange={set} /></label>
          </div>
          <label>What should AI take off your team&apos;s plate first?<textarea name="message" value={form.message} onChange={set} /></label>
          <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
          <label className="h-agree">
            <input type="checkbox" name="agree" required checked={form.agree} onChange={set} />
            <span>I&apos;m signing up for {chosen.name} at {usd(chosen.monthly!)} a month on a 12-month plan, with the first 2 months free ({usd(firstYear(chosen)!)} for the year). Nothing is charged until we send the agreement.</span>
          </label>
          {status === "error" && <p style={{ color: "#b42318", fontSize: "0.9rem" }}>Something went wrong sending that. Please try again in a moment.</p>}
          <button type="submit" className="h-btn h-btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending..." : `Sign up for ${chosen.name}`}</button>
        </form>
      </div>
    </div>
  );
}
