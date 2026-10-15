"use client";
// Qualifying contact form. Posts to /api/contact (saved to Supabase, emailed via Resend).
// Team size, first need and teams travel in the message so the API contract stays the same.
import { useState } from "react";

const TEAMS = ["Leadership", "Finance", "Accounting", "Operations", "Sales", "Marketing", "Customer service", "HR", "Admin", "Underwriting", "Other"];

export function ContactForm({ source = "Website" }: { source?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [other, setOther] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const otherTeam = String(f.get("team-other-name") || "").trim();
    const teams = TEAMS.filter((t) => f.get(`team-${t}`)).map((t) => (t === "Other" && otherTeam ? `Other: ${otherTeam}` : t));
    const message = [
      `Team size: ${f.get("size") || "not given"}`,
      `Needs first: ${f.get("need") || "not given"}`,
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
      <label>What do you need first?
        <select name="need" id="f-need" defaultValue=""><option value="" disabled>Select</option><option>Train our team on AI</option><option>Agents on repeat work</option><option>Custom software or replacing a tool</option><option>An ongoing AI Officer</option><option>Not sure yet</option></select>
      </label>
      <fieldset className="full"><legend>Which teams</legend>
        <div className="chips">{TEAMS.map((t) => <label key={t}><input type="checkbox" name={`team-${t}`} id={`t-${t.replace(/\s+/g, "-")}`} onChange={t === "Other" ? (ev) => setOther(ev.target.checked) : undefined} /><span>{t}</span></label>)}</div>
        {other && <input name="team-other-name" id="f-other-team" className="other-team" placeholder="Which team?" aria-label="Which other team" />}
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
