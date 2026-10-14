"use client";
// Qualifying contact form. Posts to /api/contact (saved to Supabase, emailed via Resend).
// Team size, project size and teams travel in the message so the API contract stays the same.
import { useState } from "react";

const TEAMS = ["Finance", "Accounting", "Underwriting", "Operations", "Admin", "Sales", "HR"];

export function ContactForm({ source = "Website" }: { source?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const teams = TEAMS.filter((t) => f.get(`team-${t}`));
    const message = [
      `Team size: ${f.get("size") || "not given"}`,
      `Project size: ${f.get("budget") || "not given"}`,
      `Teams: ${teams.join(", ") || "not given"}`,
      `Source: ${source}`,
      "",
      String(f.get("message") || ""),
    ].join("\n");
    setState("sending"); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.get("name"), company: f.get("company"), email: f.get("email"), industry: teams.join(", "), message, website: f.get("website") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setState("sent");
    } catch (err) {
      setState("error"); setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "sent") {
    return <div className="form-done"><h3>Thanks. We have it.</h3><p>We reply the same business day with times for a 30-minute call.</p></div>;
  }

  return (
    <form onSubmit={submit} noValidate>
      <label>Name<input name="name" id="f-name" autoComplete="name" required /></label>
      <label>Company<input name="company" id="f-co" autoComplete="organization" required /></label>
      <label className="full">Work email<input name="email" id="f-email" type="email" autoComplete="email" required /></label>
      <label>Team size
        <select name="size" id="f-size" defaultValue=""><option value="" disabled>Select</option><option>Under 50</option><option>50 to 100</option><option>100 to 250</option><option>250 or more</option></select>
      </label>
      <label>Project size
        <select name="budget" id="f-budget" defaultValue=""><option value="" disabled>Select</option><option>Under $25k</option><option>$25k to $50k</option><option>$50k to $150k</option><option>$150k or more</option></select>
      </label>
      <fieldset className="full"><legend>Which teams</legend>
        <div className="chips">{TEAMS.map((t) => <label key={t}><input type="checkbox" name={`team-${t}`} id={`t-${t}`} /><span>{t}</span></label>)}</div>
      </fieldset>
      <label className="full">Where does your team lose the most time?<textarea name="message" id="f-msg" placeholder="For example: month-end close takes our finance team most of a week." /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="full form-foot">
        <button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : <>Send <span aria-hidden="true">→</span></>}</button>
        <span className="next">We reply the same business day with times for a 30-minute call.</span>
        {state === "error" && <span className="form-err" role="alert">{error}</span>}
      </div>
    </form>
  );
}
