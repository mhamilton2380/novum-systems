import Link from "next/link";
import { SystemsShowcase } from "../components/SystemsShowcase";

// ─── Content ──────────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    title: "Priced to grow with you",
    body: (
      <>
        Most business software bills on your revenue, your project volume, or your headcount. Grow and the bill goes up <em>for the same software</em>. Stop paying and access goes with it.
      </>
    ),
  },
  {
    title: "Tools that don't talk",
    body: (
      <>
        Projects in one system, accounting in another, documents on a shared drive. Your team re-enters the same data three times, and <em>nobody has the full picture</em>.
      </>
    ),
  },
  {
    title: "AI that doesn't know you",
    body: (
      <>
        Vendors sell AI as another upgrade tier, and it only sees the data inside their one tool. It can&apos;t answer a question that <em>spans your business</em>.
      </>
    ),
  },
];

const COMPARE = [
  ["What it costs", "A subscription for every tool, rising every year.", "A build, then hosting. No seats."],
  ["How it fits", "Your team bends to the template.", "Built around how you already work."],
  ["How many systems", "One per department, stitched together by hand.", "One system, connected to the tools you keep."],
  ["AI", "Sold as an add-on, one tool at a time.", "Built in, across everything."],
  ["If you stop paying", "Access is cut off.", "It keeps running. It's yours."],
  ["Who can change it", "Only the vendor, on their roadmap.", "Us, your team, or any developer you hire."],
];

const STEPS = [
  {
    title: "Discovery",
    tag: "The first step on every project",
    body: "We sit with your team, map how the work actually moves, and list every tool you pay for and what it costs.",
    includes: "workflow and tool audit, a written scope, and a price before anything is built",
  },
  {
    title: "Build",
    tag: "Scoped and priced per project",
    body: "We build your system in phases, highest-impact first, with your AI assistant and agents wired into it. Each phase is live and in use before the next starts.",
    includes: "data migrated from your current tools, integrations with the ones you keep, AI built in, team training, and the code handed to you",
  },
  {
    title: "Run",
    tag: "Hosting at cost · support optional",
    body: "You pay for storage, security, and hosting. Nothing is priced on seats or revenue. Add support when you want new features or new agents.",
    includes: "monitoring, backups, security updates, and month-to-month support you can cancel anytime",
  },
];

const INDUSTRIES = [
  "Construction", "Field services", "Professional services", "Legal", "Accounting", "Sales teams",
  "Marketing agencies", "Insurance", "Healthcare", "Manufacturing", "Logistics", "Distribution",
  "Engineering", "Architecture", "Home services", "Staffing", "Franchises", "Hospitality",
  "Financial services", "Nonprofits",
];

const AGENT_FEED = [
  { tag: "Legal", c: "#7c3aed", what: "Redlined 3 NDAs against the firm's playbook", t: "1m" },
  { tag: "Sales", c: "#0891b2", what: "Logged 42 calls to the CRM, booked 6 follow-ups", t: "4m" },
  { tag: "Accounting", c: "#059669", what: "Matched 38 invoices to POs, flagged 2", t: "9m" },
  { tag: "Construction", c: "#d97706", what: "Drafted an RFI from the superintendent's field note", t: "15m" },
  { tag: "Field services", c: "#2563eb", what: "Dispatched 6 techs by skill and drive time", t: "22m" },
  { tag: "Marketing", c: "#db2777", what: "Built the weekly campaign report for 4 clients", t: "38m" },
  { tag: "Insurance", c: "#0d9488", what: "Summarized a 212-page claim file for the adjuster", t: "1h" },
  { tag: "Healthcare", c: "#4f46e5", what: "Sent 19 appointment reminders, rebooked 3", t: "1h" },
];

const SECURITY = [
  { t: "Encrypted everywhere", d: "Files and records are encrypted at rest and in transit.", icon: "M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zM12 15v2" },
  { t: "Role-based access", d: "Each person sees exactly what their role allows.", icon: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4" },
  { t: "Your infrastructure", d: "Deployed on accounts your company owns.", icon: "M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01" },
  { t: "No data resale", d: "We never aggregate, sell, or train on your data.", icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6l12.8 12.8" },
  { t: "Full audit trail", d: "Every view and edit is logged with who and when.", icon: "M8 4h11v16H5V7zM8 4v3H5M9 12h7M9 16h5" },
  { t: "Private AI", d: "Your assistant and agents work on your data and nothing else.", icon: "M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" },
];

const AUDIT = [
  { who: "J. Alvarez", role: "Account manager", what: "opened Halverson_MSA.pdf", ok: true },
  { who: "AI Assistant", role: "AI", what: "answered a Q3 revenue question for Finance", ok: true },
  { who: "Field tablet 07", role: "Technician", what: "uploaded job photos", ok: true },
  { who: "Contractor login", role: "External", what: "tried to open Payroll_Q3.xlsx", ok: false },
  { who: "M. Chen", role: "Finance", what: "exported AP aging report", ok: true },
  { who: "Renewal agent", role: "AI", what: "sent 23 renewal quotes", ok: true },
  { who: "S. Patel", role: "Paralegal", what: "edited Engagement_Letter_v4", ok: true },
  { who: "Unknown device", role: "Blocked", what: "sign-in attempt from new location", ok: false },
];

const FAQ = [
  {
    q: "What does it cost?",
    a: "It depends on what you need. Every company runs differently: some need a new system built from scratch, some need the tools they already use connected, and most need a mix of both. We price every project case by case, after we understand how your business works.",
  },
  {
    q: "Will it do everything our current software does?",
    a: "It will do what your team uses. Most companies pay for a full platform and use a slice of it. We build that slice around how you work, connect it to the rest of your operation, and add what the platform never had.",
  },
  {
    q: "What can the AI actually do?",
    a: "The AI assistant answers questions across every project, document, and report in your system. Agents handle the repeat work: drafting, matching, chasing, and reporting. We scope the agents with you during discovery.",
  },
  {
    q: "What happens to our data in the old system?",
    a: "We move it. Migration from your current tools is part of the build, so your history comes with you.",
  },
  {
    q: "Do we own it?",
    a: "Yes. The code, the database, and the hosting accounts are in your company's name. If we stop working together, nothing breaks.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="h-hero">
        <div className="h-wrap h-hero-grid">
          <div>
            <h1>
              One system for your entire operation, at a <span className="h-grad">fraction of the cost</span>.
            </h1>
            <p className="h-hero-sub">
              We replace the software you rent, connect the tools you keep, and put AI to work across all of it.
            </p>
            <ul className="h-proof">
              <li>Built around your workflows, connected to the tools you already use.</li>
              <li>An AI assistant and agents working across all of it.</li>
              <li>No seats, no revenue share. The code is yours.</li>
            </ul>
            <div className="h-ctas">
              <Link href="/contact" className="h-btn h-btn-primary">Book a conversation</Link>
              <a href="#how" className="h-btn h-btn-ghost">How it works →</a>
            </div>
          </div>

          <div className="h-vis" aria-hidden="true">
            <div className="h-card h-card-rent">
              <div className="h-card-bar"><i /><i /><i /><span>5-year software cost</span></div>
              <div className="h-card-body">
                <div className="h-chart">
                  {[
                    { y: "Yr 1", rent: 74, own: 40, build: true },
                    { y: "Yr 2", rent: 80, own: 5 },
                    { y: "Yr 3", rent: 86, own: 5 },
                    { y: "Yr 4", rent: 93, own: 5 },
                    { y: "Yr 5", rent: 100, own: 5 },
                  ].map((c, i) => (
                    <div className="h-chart-col" key={c.y}>
                      <div className="h-chart-bars">
                        <i className="h-bar-rent" style={{ height: `${c.rent}%`, animationDelay: `${i * 90}ms` }} />
                        <i className={`h-bar-own${c.build ? " build" : ""}`} style={{ height: `${c.own}%`, animationDelay: `${i * 90 + 45}ms` }} />
                      </div>
                      <small>{c.y}</small>
                    </div>
                  ))}
                </div>
                <div className="h-legend">
                  <span><i className="h-bar-rent" />Subscriptions, renewing every year</span>
                  <span><i className="h-bar-own" />Your own system: build once, then hosting</span>
                </div>
              </div>
            </div>

            <div className="h-card h-card-own">
              <div className="h-card-bar"><i /><i /><i /><span>ops.yourcompany.com · agents</span></div>
              <div className="h-card-body">
                <div className="h-dash-stats">
                  <div><small>Agents running</small><strong>12</strong></div>
                  <div><small>Tasks today</small><strong>1,284</strong></div>
                  <div><small>Hours saved this week</small><strong>212</strong></div>
                </div>
                <div className="h-dash-label"><span className="h-live"><i />Live activity</span></div>
                <div className="h-feed-window">
                  <div className="h-feed-track">
                    {[...AGENT_FEED, ...AGENT_FEED].map((a, i) => (
                      <div className="h-feed-row" key={i}>
                        <span className="h-feed-tag" style={{ color: a.c, background: `${a.c}14` }}>{a.tag}</span>
                        <span className="h-feed-what">{a.what}</span>
                        <small>{a.t}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strip */}
      <div className="h-strip">
        <p className="h-strip-label">Built for operators in</p>
        <div className="h-marquee">
          <div className="h-marquee-track">
            {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
              <span key={i} aria-hidden={i >= INDUSTRIES.length}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Problem */}
      <section className="h-sec h-dark">
        <div className="h-wrap">
          <div className="h-head">
            <div className="h-eyebrow">The problem</div>
            <h2>You rent a stack of tools that were never built for you.</h2>
            <p>Each one costs more every year, holds a piece of your data, and makes your team work its way. None of them see the whole business.</p>
          </div>
          <div className="h-cards3">
            {PROBLEMS.map((p, i) => (
              <div className="h-pcard" key={p.title}>
                <div className="h-num">0{i + 1}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="h-sec">
        <div className="h-wrap">
          <SystemsShowcase />
        </div>
      </section>

      {/* How it works */}
      <section className="h-sec h-soft" id="how">
        <div className="h-wrap">
          <div className="h-howgrid">
            <div className="h-head">
              <div className="h-eyebrow">How it works</div>
              <h2>Three steps. No subscription.</h2>
              <p>Nothing gets built until the scope and the price are agreed in writing.</p>
            </div>
            <div className="h-vsteps">
              {STEPS.map((s, i) => (
                <div className="h-vstep" key={s.title}>
                  <div className="h-vstep-n">{i + 1}</div>
                  <div>
                    <div className="h-vstep-head">
                      <h3>{s.title}</h3>
                      <span className="h-badge">{s.tag}</span>
                    </div>
                    <p>{s.body}</p>
                    <div className="h-includes"><b>Includes:</b> {s.includes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="h-sec">
        <div className="h-wrap">
          <div className="h-head h-center">
            <div className="h-eyebrow">The difference</div>
            <h2>Your rented stack vs. your own system.</h2>
            <p>AI cut the cost of building custom software. A system built for you now costs less than the tools you rent.</p>
          </div>
          <div className="h-table">
            <div className="h-trow h-thead"><div /><div>Rented software</div><div>Built by Novum</div></div>
            {COMPARE.map(([label, rent, own]) => (
              <div className="h-trow" key={label}><div>{label}</div><div>{rent}</div><div>{own}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="h-sec h-soft h-secure">
        <div className="h-wrap h-secure-grid">
          <div>
            <div className="h-head" style={{ marginBottom: 36 }}>
              <div className="h-eyebrow">Security</div>
              <h2>Built locked down from day one.</h2>
              <p>Every build ships with these in place. Every action is logged, and every person sees only what their role allows.</p>
            </div>
            <div className="h-secgrid">
              {SECURITY.map((x) => (
                <div className="h-seccard" key={x.t}>
                  <div className="h-secicon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={x.icon} /></svg>
                  </div>
                  <h3>{x.t}</h3>
                  <p>{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-audit" aria-hidden="true">
            <div className="h-audit-bar">
              <span className="h-live"><i />Audit log · live</span>
              <span className="h-enc">Encrypted</span>
            </div>
            <div className="h-audit-window">
              <div className="h-audit-track">
                {[...AUDIT, ...AUDIT].map((a, i) => (
                  <div className={`h-audit-row${a.ok ? "" : " h-denied"}`} key={i}>
                    <div className="h-audit-who"><b>{a.who}</b><span>{a.role}</span></div>
                    <div className="h-audit-what">{a.what}</div>
                    <div className="h-audit-status">{a.ok ? "Allowed" : "Denied"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="h-sec">
        <div className="h-wrap">
          <div className="h-head h-center">
            <div className="h-eyebrow">Questions</div>
            <h2>What people ask first.</h2>
          </div>
          <div className="h-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="h-sec h-soft">
        <div className="h-wrap h-roi">
          <div>
            <div className="h-eyebrow">Case study · Construction company</div>
            <h2>What would you do with a <span className="h-grad">$100,000</span> software bill back?</h2>
            <p className="h-roi-sub">
              A construction company was paying $100,000 a year for construction management software. We rebuilt it around how they run projects, connected it to the rest of the business, and put an AI assistant on top. After the build, they pay only for hosting, storage, and security, a small fraction of what the subscription cost.
            </p>
            <div className="h-chips">
              <span>$100,000/yr before</span>
              <span>One-time build</span>
              <span>Hosting only after that</span>
            </div>
          </div>
          <div className="h-roi-card">
            <h3>What they run on now</h3>
            <ul>
              <li><b>Construction management</b> rebuilt around their own workflows, replacing the subscription platform.</li>
              <li><b>Projects, documents, and investor reporting</b> in one system instead of spreadsheets and shared drives.</li>
              <li><b>An AI assistant</b> answering questions across every project and document the firm has.</li>
            </ul>
            <div className="h-roi-foot">
              <p>One build fee. Then storage, security, and hosting. No seats, no revenue share, no renewal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-sec">
        <div className="h-wrap">
          <div className="h-cta">
            <h2>Tell us what you pay for today.</h2>
            <p>Send us your software stack and what it costs. We&apos;ll tell you what we&apos;d replace, where AI would do the work, and what it would cost to run.</p>
            <Link href="/contact" className="h-btn h-btn-light">Book a conversation</Link>
            <p className="h-cta-meta">No obligation. No sales deck.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
