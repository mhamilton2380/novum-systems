"use client";

import { useState } from "react";
import { PLANS, TERMS } from "@/lib/aiOfficerPlans";

const STARTABLE = PLANS.filter((p) => p.startable);

export function SignupForm({ initialPlan }: { initialPlan: "growth" | "pro" }) {
  const [plan, setPlan] = useState<string>(initialPlan);
  const [form, setForm] = useState({ name: "", email: "", company: "", teamSize: "", message: "", agree: false, website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const chosen = STARTABLE.find((p) => p.id === plan)!;

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
        <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Got it. We&apos;ll be in touch within one business day.</h2>
        <p style={{ color: "#64748b" }}>We&apos;ll book a short call, then send a written quote for your discovery. Nothing is charged until you approve it.</p>
      </div>
    );
  }

  return (
    <div className="h-feature" style={{ alignItems: "start" }}>
      <div className="h-plan-pick">
        {STARTABLE.map((p) => (
          <button type="button" key={p.id} className={`h-plan h-plan-option${plan === p.id ? " on" : ""}`} onClick={() => setPlan(p.id)} aria-pressed={plan === p.id}>
            <span className="h-card2-tag">{p.name}</span>
            <p className="h-plan-terms">{TERMS}</p>
            <p className="h-plan-pitch">{p.pitch}</p>
            <ul className="h-checks">{p.highlights.map((f) => <li key={f}>{f}</li>)}</ul>
          </button>
        ))}
        <p className="h-plan-terms"><a href="/ai-officer#pricing">See everything in each plan</a>. Larger team or regulated work? <a href="/contact">Ask about Enterprise</a>.</p>
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
          <label>What should the first agent take off your team&apos;s plate?<textarea name="message" value={form.message} onChange={set} /></label>
          <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
          <label className="h-agree">
            <input type="checkbox" name="agree" required checked={form.agree} onChange={set} />
            <span>I&apos;d like to start {chosen.name} ({TERMS.toLowerCase().replace(/\.$/, "")}) with a discovery, which is credited toward the plan. Nothing is charged until I approve a written quote.</span>
          </label>
          {status === "error" && <p style={{ color: "#b42318", fontSize: "0.9rem" }}>Something went wrong sending that. Please try again in a moment.</p>}
          <button type="submit" className="h-btn h-btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Start with a discovery"}</button>
        </form>
      </div>
    </div>
  );
}
