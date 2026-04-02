"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    businessType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "160px 32px 80px",
          background: "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 60%), var(--ink)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ maxWidth: "600px" }}>
            <div className="tag" style={{ marginBottom: "28px" }}>Get in Touch</div>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              Let&apos;s talk about<br />your operation.
            </h1>
            <p style={{ color: "var(--ivory-muted)", fontSize: "1rem", lineHeight: "1.8", maxWidth: "480px" }}>
              A discovery call is how every Novum engagement starts. Tell us about your business and we&apos;ll reach out to schedule time.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section
        style={{
          padding: "60px 32px 120px",
          borderTop: "1px solid rgba(245,242,236,0.06)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}
            className="contact-grid"
          >
            {/* Info column */}
            <div>
              {/* What to expect */}
              <div style={{ marginBottom: "48px" }}>
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "20px",
                  }}
                >
                  What to expect
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    {
                      step: "1",
                      title: "Discovery call",
                      desc: "30 minutes to understand your business, current tools, and what you need a system to do.",
                    },
                    {
                      step: "2",
                      title: "System proposal",
                      desc: "We come back with a structured proposal that maps our system to your specific operation.",
                    },
                    {
                      step: "3",
                      title: "Build & launch",
                      desc: "We configure and deliver your system, with training and handoff included.",
                    },
                  ].map((item) => (
                    <div key={item.step} style={{ display: "flex", gap: "16px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "1px solid rgba(201,169,110,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.8rem",
                          color: "var(--gold)",
                          fontWeight: "500",
                        }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <p style={{ fontWeight: "500", fontSize: "0.92rem", marginBottom: "4px" }}>{item.title}</p>
                        <p style={{ color: "var(--ivory-muted)", fontSize: "0.85rem", lineHeight: "1.6", margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendly note */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(201,169,110,0.05)",
                  border: "1px solid rgba(201,169,110,0.15)",
                  borderRadius: "12px",
                  marginBottom: "40px",
                }}
              >
                <p style={{ color: "var(--ivory-muted)", fontSize: "0.88rem", lineHeight: "1.7", marginBottom: "16px" }}>
                  Prefer to book directly?
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    background: "rgba(201,169,110,0.12)",
                    border: "1px solid rgba(201,169,110,0.25)",
                    borderRadius: "8px",
                    color: "var(--gold)",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontWeight: "500",
                    transition: "all 0.2s",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Schedule on Calendly →
                </a>
              </div>

              {/* Contact details */}
              <div>
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ivory-muted)",
                    marginBottom: "16px",
                  }}
                >
                  Direct contact
                </p>
                <a
                  href="mailto:hello@novumsystems.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "var(--ivory)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "color 0.2s",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M3 6l7 5 7-5" stroke="var(--ivory-muted)" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="var(--ivory-muted)" strokeWidth="1.5" />
                  </svg>
                  hello@novumsystems.com
                </a>
              </div>
            </div>

            {/* Form */}
            <div
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(245,242,236,0.08)",
                borderRadius: "20px",
                padding: "48px",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      background: "rgba(201,169,110,0.12)",
                      border: "1px solid rgba(201,169,110,0.3)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      fontSize: "1.8rem",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: "1.6rem", marginBottom: "12px", letterSpacing: "-0.01em" }}
                  >
                    We&apos;ll be in touch.
                  </h3>
                  <p style={{ color: "var(--ivory-muted)", lineHeight: "1.7" }}>
                    Thanks for reaching out. We typically respond within one business day and will send you a link to book your discovery call.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-serif" style={{ fontSize: "1.6rem", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    Tell us about your business
                  </h2>
                  <p style={{ color: "var(--ivory-muted)", fontSize: "0.88rem", marginBottom: "36px" }}>
                    We&apos;ll reach out within one business day.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                      <div>
                        <label className="form-label">Your Name *</label>
                        <input
                          className="form-input"
                          type="text"
                          name="name"
                          required
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="form-label">Work Email *</label>
                        <input
                          className="form-input"
                          type="email"
                          name="email"
                          required
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label className="form-label">Company Name *</label>
                      <input
                        className="form-input"
                        type="text"
                        name="company"
                        required
                        placeholder="Acme Services LLC"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label className="form-label">Business Type</label>
                      <select
                        className="form-input"
                        name="businessType"
                        value={form.businessType}
                        onChange={handleChange}
                        style={{ appearance: "none" }}
                      >
                        <option value="">Select your business type</option>
                        <option value="field-service">Field Service (HVAC, Plumbing, Electrical, etc.)</option>
                        <option value="project-based">Project-Based (Construction, Contracting, Agency)</option>
                        <option value="multi-location">Multi-Location Operator</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                      <label className="form-label">Tell us about your operation *</label>
                      <textarea
                        className="form-input"
                        name="message"
                        required
                        placeholder="Describe your business, what software you currently use, and what problems you're trying to solve..."
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        style={{ resize: "vertical" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "15px",
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.8 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      {loading ? (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{ animation: "spin 0.8s linear infinite" }}
                          >
                            <circle cx="8" cy="8" r="6" stroke="var(--ink)" strokeWidth="2" strokeDasharray="24" strokeDashoffset="8" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>Send Message →</>
                      )}
                    </button>
                  </form>
                  <p style={{ textAlign: "center", color: "rgba(196,191,181,0.4)", fontSize: "0.75rem", marginTop: "16px" }}>
                    No spam. No sales sequences. Just a conversation.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
