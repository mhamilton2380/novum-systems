"use client";
// Qualifying contact form. Posts to /api/contact (saved to Supabase, emailed via Resend).
// Four fields: name, work email, company, and where the team loses time. The source goes in the message.
import { useState } from "react";

export function ContactForm({ source = "Website" }: { source?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = String(f.get("message") || "").trim();
    const message = [`Source: ${source}`, text && "", text].filter((l) => l !== "").join("\n");
    setState("sending"); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.get("name"), company: f.get("company"), email: f.get("email"), message, website: f.get("website") }),
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
      <label>Work email<input name="email" id="f-email" type="email" autoComplete="email" required /></label>
      <label className="full">Company<input name="company" id="f-co" autoComplete="organization" required /></label>
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
