"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", businessType: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 80px 80px, 80px 80px",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 14px", borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)", marginBottom: "28px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
              Get in Touch
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
              lineHeight: 1.04, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px",
            }}>
              Let&apos;s talk about<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, color: "rgba(240,196,160,0.85)" }}>your operation.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1.02rem", lineHeight: 1.75, maxWidth: "460px" }}>
              A discovery call is how every Novum engagement starts. Tell us about your business and we&apos;ll reach out to schedule time.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section style={{ padding: "80px 40px 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "80px", alignItems: "start" }} className="contact-grid">

            {/* Info column */}
            <div>
              <div style={{ marginBottom: "48px" }}>
                <p style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#B0ADA8", marginBottom: "20px",
                }}>What to expect</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  {[
                    { step: "1", title: "Discovery call", desc: "30 minutes to understand your business, current tools, and what you need a system to do." },
                    { step: "2", title: "System proposal", desc: "We come back with a structured proposal that maps our system to your specific operation." },
                    { step: "3", title: "Build & launch", desc: "We configure and deliver your system, with training and handoff included." },
                  ].map((item) => (
                    <div key={item.step} style={{ display: "flex", gap: "16px" }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        border: "1.5px solid #f0c4a0", background: "#fdf0e8",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontSize: "0.8rem", color: "#c8581a", fontWeight: 600,
                      }}>{item.step}</div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: "0.92rem", marginBottom: "4px", color: "#1A1A1A" }}>{item.title}</p>
                        <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendly */}
              <div style={{
                padding: "24px", background: "#F7F6F3",
                border: "1px solid #E8E6E1", borderRadius: "12px", marginBottom: "36px",
              }}>
                <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "14px" }}>
                  Prefer to book directly?
                </p>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px", background: "#fff",
                  border: "1.5px solid #f0c4a0", borderRadius: "100px",
                  color: "#c8581a", textDecoration: "none",
                  fontSize: "0.875rem", fontWeight: 600, transition: "all 0.2s",
                }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Schedule on Calendly →
                </a>
              </div>

              {/* Email */}
              <div>
                <p style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "#B0ADA8", marginBottom: "14px",
                }}>Direct contact</p>
                <a href="mailto:hello@novumsystems.com" style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  color: "#1A1A1A", textDecoration: "none", fontSize: "0.95rem",
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M3 6l7 5 7-5" stroke="#7A7774" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="#7A7774" strokeWidth="1.5" />
                  </svg>
                  hello@novumsystems.com
                </a>
              </div>
            </div>

            {/* Form */}
            <div style={{
              background: "#F9F8F5",
              border: "1px solid #E8E6E1",
              borderRadius: "20px",
              padding: "48px",
            }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 0" }}>
                  <div style={{
                    width: 64, height: 64,
                    background: "#fdf0e8", border: "1.5px solid #f0c4a0",
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px", fontSize: "1.5rem", color: "#c8581a",
                  }}>✓</div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                    We&apos;ll be in touch.
                  </h3>
                  <p style={{ color: "#7A7774", lineHeight: 1.75 }}>
                    Thanks for reaching out. We typically respond within one business day and will send you a link to book your discovery call.
                  </p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em", marginBottom: "6px" }}>
                    Tell us about your business
                  </h2>
                  <p style={{ color: "#7A7774", fontSize: "0.875rem", marginBottom: "32px" }}>
                    We&apos;ll reach out within one business day.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7774", marginBottom: "7px" }}>Your Name *</label>
                        <input style={{
                          width: "100%", padding: "11px 14px",
                          background: "#fff", border: "1px solid #E8E6E1",
                          borderRadius: "9px", fontSize: "0.925rem",
                          fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A",
                          outline: "none", transition: "border-color 0.2s",
                        }}
                          type="text" name="name" required placeholder="Jane Smith"
                          value={form.name} onChange={handleChange}
                          onFocus={e => (e.target as HTMLElement).style.borderColor = "#c8581a"}
                          onBlur={e => (e.target as HTMLElement).style.borderColor = "#E8E6E1"}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7774", marginBottom: "7px" }}>Work Email *</label>
                        <input style={{
                          width: "100%", padding: "11px 14px",
                          background: "#fff", border: "1px solid #E8E6E1",
                          borderRadius: "9px", fontSize: "0.925rem",
                          fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A",
                          outline: "none", transition: "border-color 0.2s",
                        }}
                          type="email" name="email" required placeholder="jane@company.com"
                          value={form.email} onChange={handleChange}
                          onFocus={e => (e.target as HTMLElement).style.borderColor = "#c8581a"}
                          onBlur={e => (e.target as HTMLElement).style.borderColor = "#E8E6E1"}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7774", marginBottom: "7px" }}>Company Name *</label>
                      <input style={{
                        width: "100%", padding: "11px 14px",
                        background: "#fff", border: "1px solid #E8E6E1",
                        borderRadius: "9px", fontSize: "0.925rem",
                        fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A",
                        outline: "none", transition: "border-color 0.2s",
                      }}
                        type="text" name="company" required placeholder="Acme Services LLC"
                        value={form.company} onChange={handleChange}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = "#c8581a"}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = "#E8E6E1"}
                      />
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7774", marginBottom: "7px" }}>Business Type</label>
                      <select style={{
                        width: "100%", padding: "11px 14px",
                        background: "#fff", border: "1px solid #E8E6E1",
                        borderRadius: "9px", fontSize: "0.925rem",
                        fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A",
                        outline: "none", appearance: "none",
                      }}
                        name="businessType" value={form.businessType} onChange={handleChange}
                      >
                        <option value="">Select your business type</option>
                        <option value="field-service">Field Service (HVAC, Plumbing, Electrical, etc.)</option>
                        <option value="project-based">Project-Based (Construction, Contracting, Agency)</option>
                        <option value="multi-location">Multi-Location Operator</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7774", marginBottom: "7px" }}>Tell us about your operation *</label>
                      <textarea style={{
                        width: "100%", padding: "11px 14px",
                        background: "#fff", border: "1px solid #E8E6E1",
                        borderRadius: "9px", fontSize: "0.925rem",
                        fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A",
                        outline: "none", resize: "vertical",
                        transition: "border-color 0.2s",
                      }}
                        name="message" required rows={5}
                        placeholder="Describe your business, what software you currently use, and what problems you're trying to solve..."
                        value={form.message} onChange={handleChange}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = "#c8581a"}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = "#E8E6E1"}
                      />
                    </div>

                    <button type="submit" disabled={loading} style={{
                      width: "100%", padding: "14px",
                      borderRadius: "100px", fontSize: "0.925rem", fontWeight: 600,
                      border: "none", cursor: loading ? "not-allowed" : "pointer",
                      background: loading ? "#4A4947" : "#141414",
                      color: "#fff", fontFamily: "'DM Sans', sans-serif",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      transition: "background 0.2s",
                    }}
                      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#c8581a"; }}
                      onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#1C1E26"; }}
                    >
                      {loading ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeDasharray="24" strokeDashoffset="8" />
                          </svg>
                          Sending...
                        </>
                      ) : "Send Message →"}
                    </button>
                  </form>
                  <p style={{ textAlign: "center", color: "#B0ADA8", fontSize: "0.75rem", marginTop: "14px" }}>
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
    </div>
  );
}
