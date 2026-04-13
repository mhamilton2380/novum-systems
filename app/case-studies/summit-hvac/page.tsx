"use client";
import Link from "next/link";
import DotCanvas from "@/components/DotCanvas";

export default function SummitHvacPage() {
  const accent = "#236B4E";
  const accentBg = "#EEF7F3";
  const accentBorder = "#C4E0D5";

  return (
    <div style={{ background: "#f5f4f1", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "100px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Link href="/case-studies" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", textDecoration: "none",
              marginBottom: "32px", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
            >
              ← Case Studies
            </Link>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px", flexWrap: "wrap" }}>
              <span style={{
                padding: "4px 14px", borderRadius: "100px",
                background: "rgba(35,107,78,0.2)", border: "1px solid rgba(35,107,78,0.4)",
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#6EE7B7",
              }}>HVAC & Field Service</span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>FieldOps · OpsCore</span>
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              lineHeight: 1.06, letterSpacing: "-0.035em",
              color: "#fff", marginBottom: "20px", maxWidth: "780px",
            }}>
              Summit Mechanical replaced a whiteboard and group text with a live operational system.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1rem", lineHeight: 1.8, maxWidth: "600px" }}>
              A 22-tech HVAC operation running on spreadsheets, phone calls, and tribal knowledge. Dispatchers were managing chaos. Invoices were going out late. Jobs were slipping through.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stat Bar ── */}
      <section style={{ padding: "0 24px" }}>
        <div style={{
          background: "#fff", border: "1px solid #EDECEA", borderRadius: "16px",
          padding: "40px 56px", margin: "0",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px",
        }} className="stat-bar">
          {[
            { stat: "28%", label: "Increase in job completion rate" },
            { stat: "3 days", label: "Faster average invoice turnaround" },
            { stat: "22", label: "Technicians dispatched from a single live board" },
          ].map(s => (
            <div key={s.stat} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 700, letterSpacing: "-0.04em", color: accent, marginBottom: "6px" }}>{s.stat}</div>
              <div style={{ fontSize: "0.85rem", color: "#7A7774", lineHeight: 1.6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Situation ── */}
      <section style={{ padding: "80px 40px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="two-col">
            <div style={{ position: "sticky", top: "88px" }}>
              <span style={{
                display: "inline-flex", padding: "5px 14px", borderRadius: "100px",
                background: accentBg, border: `1px solid ${accentBorder}`,
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: accent, marginBottom: "20px",
              }}>The Situation</span>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "18px",
              }}>They had grown faster than their systems could handle.</h2>
              <p style={{ color: "#7A7774", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Summit Mechanical had doubled in size over three years. What worked at 10 techs — a whiteboard in the dispatch office, a shared spreadsheet, a group text chain — completely broke at 22. Jobs were being scheduled without knowing a tech was already committed. Invoices sat unsigned. The owner was fielding calls that should have never reached him.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Dispatch running blind", desc: "Scheduling was done from memory and a spreadsheet that was never fully up to date. Double-bookings happened weekly. Techs were showing up to jobs that had been rescheduled, or not showing up to ones that hadn't been communicated." },
                { title: "No real-time job status", desc: "The only way to know where a job stood was to call the tech. There was no structured way to log job updates, capture photos, or track completion status from the field." },
                { title: "Invoicing was manual and slow", desc: "After job completion, invoices were created manually from handwritten tech notes — when those notes existed. Billing was running 5–7 days behind job close, and follow-up was inconsistent." },
                { title: "Customer history lived nowhere", desc: "Every repeat customer visit started from scratch. Techs had no access to prior service history, installed equipment, or notes from previous visits unless they happened to remember." },
              ].map(item => (
                <div key={item.title} style={{
                  padding: "28px 32px", background: "#fff",
                  border: "1px solid #EDECEA", borderRadius: "14px",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accentBorder}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"}
                >
                  <h4 style={{ fontWeight: 600, fontSize: "0.975rem", marginBottom: "8px", color: "#1A1A1A" }}>{item.title}</h4>
                  <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Built ── */}
      <section style={{ padding: "80px 24px 0" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "80px 60px", position: "relative", overflow: "hidden",
          maxWidth: "1280px", margin: "0 auto",
        }}>
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ marginBottom: "52px" }}>
              <span style={{
                display: "inline-flex", padding: "5px 14px", borderRadius: "100px",
                background: "rgba(35,107,78,0.15)", border: "1px solid rgba(35,107,78,0.35)",
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
                color: "#6EE7B7", marginBottom: "20px",
              }}>What We Built</span>
              <h2 style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff",
              }}>Two systems that eliminated the gaps.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="built-grid">
              {[
                {
                  name: "FieldOps",
                  sub: "Field Service Management",
                  points: [
                    "Visual dispatch board showing every tech, every job, every territory — live",
                    "Mobile access for techs to update job status, upload photos, and capture notes from the field",
                    "Automated invoicing triggered on job completion — no manual entry, no delay",
                    "Full customer and equipment history attached to every job",
                  ],
                  color: "#6EE7B7", borderColor: "rgba(35,107,78,0.35)", bg: "rgba(35,107,78,0.1)",
                },
                {
                  name: "OpsCore",
                  sub: "Operational Command Center",
                  points: [
                    "Owner dashboard showing job pipeline, revenue, and completion metrics in real time",
                    "Dispatch coordinator view with drag-and-drop scheduling and conflict detection",
                    "Automated alerts when jobs are overdue, techs are unresponsive, or invoices go unpaid past threshold",
                    "Weekly performance reports generated automatically — no manual pulling",
                  ],
                  color: "#86EFAC", borderColor: "rgba(0,200,122,0.25)", bg: "rgba(0,200,122,0.08)",
                },
              ].map(s => (
                <div key={s.name} style={{
                  padding: "36px", background: s.bg,
                  border: `1px solid ${s.borderColor}`, borderRadius: "16px",
                }}>
                  <span style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: "100px",
                    background: "rgba(255,255,255,0.05)", border: `1px solid ${s.borderColor}`,
                    fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: s.color, marginBottom: "16px",
                  }}>{s.sub}</span>
                  <h3 style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "#fff", marginBottom: "20px" }}>{s.name}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {s.points.map(p => (
                      <div key={p} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, flexShrink: 0, marginTop: "7px" }} />
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Outcome ── */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 52px" }}>
            <span style={{
              display: "inline-flex", padding: "5px 14px", borderRadius: "100px",
              background: accentBg, border: `1px solid ${accentBorder}`,
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase",
              color: accent, marginBottom: "20px",
            }}>The Outcome</span>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>The operation finally runs as fast as the team does.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }} className="outcome-grid">
            {[
              { title: "Dispatch runs on a live board", desc: "The whiteboard is gone. Dispatchers work from a real-time view of every tech, every job, and every open slot. Double-bookings haven't happened since go-live." },
              { title: "Invoices go out same day", desc: "Automated invoicing on job completion eliminated the 5–7 day billing lag. Cash flow improved immediately. The billing coordinator now spends her time on exceptions, not data entry." },
              { title: "Techs have what they need in the field", desc: "Every tech has mobile access to job details, prior service history, equipment records, and notes from previous visits. Customer calls to the office asking 'did you fix this last time?' dropped significantly." },
              { title: "The owner stepped back from operations", desc: "The owner went from fielding daily operational calls to checking a dashboard. The system handles escalations, surfaces issues automatically, and routes the right information to the right person." },
            ].map(item => (
              <div key={item.title} style={{
                padding: "36px 40px", background: "#fff",
                border: "1px solid #EDECEA", borderRadius: "16px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accentBorder; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EDECEA"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginBottom: "18px" }} />
                <h4 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "10px", color: "#1A1A1A" }}>{item.title}</h4>
                <p style={{ color: "#7A7774", fontSize: "0.875rem", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{
          background: "#141414", borderRadius: "20px",
          padding: "72px 60px", position: "relative", overflow: "hidden",
          display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "center",
        }} className="cta-row">
          <DotCanvas />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              letterSpacing: "-0.03em", color: "#fff", marginBottom: "12px",
            }}>Running a field service operation?</h2>
            <p style={{ color: "rgba(255,255,255,0.48)", lineHeight: 1.8, margin: 0, fontSize: "0.95rem" }}>
              If your team is managing dispatch, scheduling, and invoicing manually, there&apos;s a better way.
            </p>
          </div>
          <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "14px 32px", borderRadius: "100px",
              background: "#00C87A", color: "#0a1a12",
              fontSize: "0.92rem", fontWeight: 600, textDecoration: "none",
              whiteSpace: "nowrap",
            }}>
              Book a Discovery Call →
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .two-col > div:first-child { position: static !important; }
          .built-grid { grid-template-columns: 1fr !important; }
          .outcome-grid { grid-template-columns: 1fr !important; }
          .stat-bar { grid-template-columns: 1fr !important; }
          .cta-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
