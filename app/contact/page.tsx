"use client";
import { useState } from "react";
import { PageHero } from "@/components/PageBits";
import { USE_CASE_NAV } from "@/lib/nav";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", industry: "", tools: "", availability: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="home">
      <PageHero
        eyebrow="Contact"
        title={<>Tell us what you&apos;re <span className="h-grad">running</span>.</>}
        sub="Every project starts with a conversation about how your business works and what you pay for today. No slide deck, no sales process."
        ctas={false}
      />

      <section className="h-sec h-soft">
        <div className="h-wrap h-feature" style={{ alignItems: "start" }}>
          <div className="h-contact-side">
            <div><b>What happens next</b><p>We read what you send, then set up a call to walk through how your operation runs.</p></div>
            <div><b>What to bring</b><p>The tools you pay for, roughly what they cost, and where your team loses the most time.</p></div>
            <div><b>When you&apos;ll hear back</b><p>Usually within one business day, with a time that fits what you tell us below.</p></div>
          </div>

          <div className="h-formcard">
            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Got it. Thank you.</h2>
                <p style={{ color: "#64748b" }}>We&apos;ll read what you sent and come back with a time that works, usually within one business day.</p>
              </div>
            ) : (
              <form className="h-form" onSubmit={submit}>
                <div className="h-2col">
                  <label>Name *<input name="name" required value={form.name} onChange={set} /></label>
                  <label>Work email *<input name="email" type="email" required value={form.email} onChange={set} /></label>
                </div>
                <div className="h-2col">
                  <label>Company *<input name="company" required value={form.company} onChange={set} /></label>
                  <label>Industry
                    <select name="industry" value={form.industry} onChange={set}>
                      <option value="">Select one</option>
                      {USE_CASE_NAV.map((u) => <option key={u.slug}>{u.label}</option>)}
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <label>What software do you pay for today?<input name="tools" placeholder="e.g. project management, CRM, accounting" value={form.tools} onChange={set} /></label>
                <label>When are you free to talk?<input name="availability" placeholder="e.g. weekday mornings Pacific, or Tues/Thurs afternoons" value={form.availability} onChange={set} /></label>
                <label>Anything else we should know?<textarea name="message" value={form.message} onChange={set} /></label>
                <input name="website" value={form.website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
                {status === "error" && (
                  <p style={{ color: "#b42318", fontSize: "0.9rem" }}>Something went wrong sending that. Please try again in a moment.</p>
                )}
                <button type="submit" className="h-btn h-btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send"}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
