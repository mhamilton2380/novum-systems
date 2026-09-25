"use client";
import { useState } from "react";
import { PageHero } from "@/components/PageBits";
import { USE_CASE_NAV } from "@/lib/nav";

const EMAIL = "hello@novumsystems.co";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", industry: "", tools: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // No form backend yet: hand the message to the visitor's email app, pre-filled
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Industry: ${form.industry}`,
      `Tools we pay for today: ${form.tools}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Intro: ${form.company || form.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
            <div><b>Prefer email?</b><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          </div>

          <div className="h-formcard">
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h2 style={{ fontSize: "1.8rem", marginBottom: 12 }}>Almost there.</h2>
                <p style={{ color: "#64748b" }}>Your email app should have opened with your message filled in. Hit send and we&apos;ll be in touch. If nothing opened, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
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
                <label>Anything else we should know?<textarea name="message" value={form.message} onChange={set} /></label>
                <button type="submit" className="h-btn h-btn-primary">Send</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
