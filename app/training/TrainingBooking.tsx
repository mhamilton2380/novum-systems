"use client";

import { useState } from "react";
import { COMPANY_TYPES, LARGE_FROM, LARGE_PER_100, MAX_ONLINE_HEADCOUNT, TRAINING_HOURS, TRAINING_TIERS, tierFor, trainingPrice, usd } from "@/lib/training";

// payOnline is true only when STRIPE_SECRET_KEY is set; otherwise bookings are requests we invoice by hand.
export function TrainingBooking({ payOnline }: { payOnline: boolean }) {
  const [form, setForm] = useState({ industry: "", headcount: "", name: "", email: "", company: "", dates: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "request" | "error">("idle");
  const [error, setError] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const n = parseInt(form.headcount, 10);
  const valid = Number.isInteger(n) && n >= 1;
  const price = valid ? trainingPrice(n) : null;
  const quote = valid && n > MAX_ONLINE_HEADCOUNT;
  const tier = valid ? tierFor(n) : undefined;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/training/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, headcount: n, quote }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again in a moment.");
        setStatus("error");
      } else if (data.mode === "pay" && data.url) {
        window.location.href = data.url;
      } else {
        setStatus("request");
      }
    } catch {
      setError("Something went wrong. Please try again in a moment.");
      setStatus("error");
    }
  };

  if (status === "request") {
    return (
      <div className="h-formcard" style={{ textAlign: "center", padding: "56px 32px", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Got it. We&apos;ll reply within one business day.</h2>
        <p style={{ color: "#64748b" }}>
          {quote ? "We'll scope your day and send a written quote. Nothing is charged until you approve it." : "We'll confirm a date and send an invoice. Nothing is charged until you approve it."}
        </p>
      </div>
    );
  }

  return (
    <div className="h-feature" style={{ alignItems: "start" }}>
      <div>
        <div className="h-eyebrow">Pricing</div>
        <h2>One price per day, set by team size.</h2>
        <p className="h-feature-sub">{TRAINING_HOURS} hours, tailored to your company type, for everyone on the team.</p>
        <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
          {TRAINING_TIERS.map((t) => (
            <div key={t.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 16px", border: "1px solid var(--line)", borderRadius: 12, background: tier === t ? "#fff" : "transparent", fontWeight: tier === t ? 700 : 500 }}>
              <span>{t.label}</span>
              <span>{t.price !== null ? usd(t.price) : `From ${usd(LARGE_FROM)}`}</span>
            </div>
          ))}
        </div>
        <p className="h-plan-terms" style={{ marginTop: 14 }}>
          Past 100 people, each additional 100 adds {usd(LARGE_PER_100)}. Teams over {MAX_ONLINE_HEADCOUNT} get a written quote.
        </p>
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
          {valid && (
            <p style={{ margin: 0, fontWeight: 700 }}>
              {quote ? `Teams of ${n}: from ${usd(LARGE_FROM)}, quoted in writing.` : `${tier?.label}: ${usd(price!)} for the day.`}
            </p>
          )}
          <div className="h-2col">
            <label>Name *<input name="name" required value={form.name} onChange={set} /></label>
            <label>Work email *<input name="email" type="email" required value={form.email} onChange={set} /></label>
          </div>
          <label>Company *<input name="company" required value={form.company} onChange={set} /></label>
          <label>Preferred dates<input name="dates" placeholder="e.g. any Tuesday in November" value={form.dates} onChange={set} /></label>
          <label>What does your team do all day? What should we cover?<textarea name="message" value={form.message} onChange={set} /></label>
          <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
          {status === "error" && <p style={{ color: "#b42318", fontSize: "0.9rem" }}>{error}</p>}
          <button type="submit" className="h-btn h-btn-primary" disabled={status === "sending" || !valid}>
            {status === "sending" ? "Sending..." : quote ? "Request a quote" : valid ? `${payOnline ? "Book and pay" : "Book this day,"} ${usd(price!)}` : payOnline ? "Book and pay" : "Book this day"}
          </button>
          <p className="h-plan-terms" style={{ margin: 0 }}>
            {quote ? "We'll scope your day and send a written quote." : payOnline ? "You pay securely through Stripe. We confirm your date within one business day." : "We confirm your date within one business day and send an invoice. Nothing is charged until then."}
          </p>
        </form>
      </div>
    </div>
  );
}
