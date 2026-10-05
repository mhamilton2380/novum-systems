import Link from "next/link";
import { SystemsShowcase } from "../components/SystemsShowcase";
import { HeroReel } from "../components/HeroReel";
import { ExampleBuilds } from "../components/ExampleBuilds";

// ─── Content ──────────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    title: "A login is not a skill",
    body: (
      <>
        Someone buys seats for an AI tool and sends the link. Nobody shows the team how to use it on their actual work, so they try it twice and <em>go back to the old way</em>.
      </>
    ),
  },
  {
    title: "AI can't see your business",
    body: (
      <>
        Projects in one system, accounting in another, documents on a shared drive. AI pasted into a chat window <em>only knows what someone copies in</em>.
      </>
    ),
  },
  {
    title: "Nobody is steering it",
    body: (
      <>
        Your team tries a chatbot, a vendor adds an AI tier, someone buys another tool. <em>Nobody decides</em> which ones work on your data or earn their price.
      </>
    ),
  },
];

const COMPARE = [
  ["Who sets it up", "Whoever has time that week.", "We do, around how your team works."],
  ["Training", "A login and a link to the help docs.", "Hands-on sessions on your own work and data."],
  ["Your data", "Pasted into chat windows.", "AI works inside your systems, limited by role."],
  ["Your tools", "Another AI subscription per department.", "Connected to the tools you keep."],
  ["Who's in charge", "Nobody. Tools get bought one at a time.", "A Chief AI Officer on call who knows your whole stack."],
  ["What it costs", "A seat for every person, in every tool.", "No seats. A build, then hosting."],
  ["If you stop", "Access and history stay with the vendor.", "The code, data, and accounts are in your name."],
];

const STEPS = [
  {
    title: "Discovery",
    tag: "Credited toward your build",
    body: "We sit with your team, map how the work actually moves, and find where AI saves the most hours. We list every tool you pay for and what it costs. If you build with us, the discovery fee comes off the price.",
    includes: "a workflow and tool audit, a written plan for what to train, build, and connect, and a price before anything is built. The plan and audit are yours either way",
  },
  {
    title: "Build, or AI Officer, or both",
    tag: "Your choice after discovery",
    body: "We build the tools in phases, highest-impact first, each one live and in use before the next starts. Or start with an AI Officer plan, training your team first, and build later.",
    includes: "an AI assistant and agents on your data, integrations with the tools you keep, a custom system where it pays, and the code handed to you",
  },
  {
    title: "Train",
    tag: "Built into every phase",
    body: "Before each phase goes live, we train the people who will use it, on their own work and your data. AI the team doesn't use saves nothing.",
    includes: "hands-on sessions per team, written guides, and follow-up coaching after launch",
  },
  {
    title: "Run",
    tag: "Your AI Officer · plans from $500/mo",
    body: "You pay for hosting, storage, and security. Nothing is priced on seats or revenue. Your AI Officer keeps the team trained and brings in new AI as it's worth using.",
    includes: "ongoing training, new AI tested on your data, a quarterly tool audit, maintenance, and new agents and changes on a schedule set by your plan",
  },
];

const INDUSTRIES = [
  "Professional services", "Field services", "Legal", "Accounting", "Construction", "Sales teams",
  "Marketing agencies", "Insurance", "Healthcare", "Manufacturing", "Logistics", "Distribution",
  "Engineering", "Architecture", "Home services", "Staffing", "Franchises", "Hospitality",
  "Financial services", "Nonprofits",
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
  { who: "Renewal agent", role: "AI", what: "drafted 23 renewal quotes for review", ok: true },
  { who: "S. Patel", role: "Paralegal", what: "edited Engagement_Letter_v4", ok: true },
  { who: "Unknown device", role: "Blocked", what: "sign-in attempt from new location", ok: false },
];

const FAQ = [
  {
    q: "What does it cost?",
    a: "Discovery is priced case by case, based on the type of business, its size, and the tools in use. It ranges from $2,500 to $15,000, and it comes off the price of your build if you go ahead. After that it depends on what you need: some companies need their team trained and a few agents built, some need their tools connected, some need a new system. We price every project after discovery, in writing. AI Officer plans run $500, $1,500, or $3,500 a month on a 12-month plan, with the first two months free. Enterprise is priced per company. Growth includes replacing one costly SaaS tool a year and Pro is unlimited, so most clients never need a separate build.",
  },
  {
    q: "We already pay for AI tools. Why would we need you?",
    a: "Most companies do. The tools are fine. What's missing is someone to set them up around the work, connect them to your data, and teach your team to use them every day. That's the job.",
  },
  {
    q: "What does training look like?",
    a: "Hands-on sessions for each team, on their own work and your data, before each piece goes live. Then written guides and follow-up coaching. Your AI Officer keeps training going as the tools change.",
  },
  {
    q: "What is a fractional Chief AI Officer?",
    a: "Most companies under 100 people can't justify a full-time technical executive. We fill the role part-time. We train your team, test new AI on your data, keep your systems running, and cut tools that don't earn their price.",
  },
  {
    q: "Do we have to replace our software?",
    a: "No. Most clients keep the tools that work. We connect them and put AI on top. We only rebuild a platform when owning it costs less than renting it.",
  },
  {
    q: "What can the AI actually do?",
    a: "The AI assistant answers questions across every project, document, and report you connect, and cites where each answer came from. Agents handle the repeat work: drafting, matching, chasing, and reporting, with a person approving before anything goes out. We scope both with you during discovery.",
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
          <div className="h-hero-text">
            <h1>
              We put AI <span className="h-grad">to work</span> in your business.
            </h1>
            <p className="h-hero-sub">
              Every business has access to AI. Few know how to use it on the actual work. We teach your team, build the tools, connect your systems, and you own all of it.
            </p>
            <ul className="h-proof">
              <li>Training on your team&apos;s own work and data, not a generic course.</li>
              <li>An AI assistant and agents built around how you operate, connected to the tools you keep.</li>
              <li>No seats, no revenue share. The code, data, and accounts are yours.</li>
            </ul>
            <div className="h-ctas">
              <Link href="/contact" className="h-btn h-btn-primary">Start with a discovery</Link>
              <a href="#how" className="h-btn h-btn-ghost">How it works →</a>
            </div>
          </div>

          <HeroReel />
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
            <h2>Everyone has AI. Almost nobody is using it on the real work.</h2>
            <p>Most companies under 100 people have no one whose job is AI. Tools get bought by whoever needed one that week, nobody gets trained, and nothing connects to the data the business runs on.</p>
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

      {/* Example builds */}
      <section className="h-sec h-soft">
        <div className="h-wrap">
          <div className="h-ia-head">
            <div className="h-head">
              <div className="h-eyebrow">See it work</div>
              <h2>Nine jobs your team does by hand. An agent drafts each one. A person checks it.</h2>
              <p>Pick one. Each runs on the company&apos;s own data and tools, and nothing leaves the company until someone on the team approves it.</p>
            </div>
            <ul className="h-ia-points">
              <li><span><b>Reads whatever arrives.</b> Email, PDFs, faxes, calls, voice memos, and spreadsheets.</span></li>
              <li><span><b>Checks it against your data.</b> Order history, the policy on file, last year&apos;s return.</span></li>
              <li><span><b>Shows what it isn&apos;t sure about.</b> Then waits for a person to decide.</span></li>
            </ul>
          </div>
          <ExampleBuilds />
        </div>
      </section>

      {/* Systems */}
      <section className="h-sec">
        <div className="h-wrap">
          <SystemsShowcase />
        </div>
      </section>

      {/* Case study */}
      <section className="h-sec h-soft">
        <div className="h-wrap h-roi">
          <div>
            <div className="h-eyebrow">Case study · Construction company</div>
            <h2>Agents drafting the paperwork, and a <span className="h-grad">$100,000</span> software bill gone.</h2>
            <p className="h-roi-sub">
              A construction company was paying $100,000 a year for construction management software. We rebuilt it around how they run projects, connected it to their custom billing application, and put agents to work drafting RFIs and submittals. After the build, they pay only for hosting, storage, and security, a small fraction of what the subscription cost.
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
              <li><b>Their custom billing application</b> connected, so project and billing data stay in sync with no double entry.</li>
              <li><b>Agents drafting RFIs and submittals</b> for the project team to review and send, saving hours every week.</li>
            </ul>
            <div className="h-roi-foot">
              <p>One build fee. Then storage, security, and hosting. No seats, no revenue share, no renewal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="h-sec">
        <div className="h-wrap">
          <div className="h-head h-center">
            <div className="h-eyebrow">The difference</div>
            <h2>Buying AI tools vs. putting AI to work.</h2>
            <p>Most companies already pay for AI. What&apos;s missing is someone to set it up around the work and teach the team to use it.</p>
          </div>
          <div className="h-table">
            <div className="h-trow h-thead"><div /><div>AI on your own</div><div>AI with Novum</div></div>
            {COMPARE.map(([label, rent, own]) => (
              <div className="h-trow" key={label}><div>{label}</div><div>{rent}</div><div>{own}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Two ways */}
      <section className="h-sec h-soft">
        <div className="h-wrap">
          <div className="h-head h-center">
            <div className="h-eyebrow">Two ways we work with you</div>
            <h2>A plan, or a one-time build.</h2>
            <p>Most clients choose an AI Officer plan: training, agents, connected tools, and costly software replaced, all in one monthly price. A one-time build is there for companies that want a project without a plan.</p>
          </div>
          <div className="h-grid3" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <Link href="/ai-officer" className="h-card2">
              <span className="h-card2-tag">AI Officer plans · most clients</span>
              <h3>Your AI team, on call, from $500 a month.</h3>
              <p>Team training, connected tools, an AI assistant and agents, a company Vault, and on Growth and up, costly SaaS replaced with software you own plus SEO, reels, and explainer videos. 12-month plans, first two months free.</p>
              <div className="h-more">See plans and sign up →</div>
            </Link>
            <Link href="/build" className="h-card2">
              <span className="h-card2-tag">One-time build</span>
              <h3>A project, without a plan.</h3>
              <p>We scope it in a paid discovery, then build the tools, connect your systems, train your team, and hand you the code. Priced per project and quoted in writing. You own all of it.</p>
              <div className="h-more">See Build and pricing →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="h-sec" id="how">
        <div className="h-wrap">
          <div className="h-howgrid">
            <div className="h-head">
              <div className="h-eyebrow">How it works</div>
              <h2>Four steps. Priced in writing first.</h2>
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

      {/* CTA */}
      <section className="h-sec">
        <div className="h-wrap">
          <div className="h-cta">
            <h2>Start with a discovery.</h2>
            <p>We spend time with your team, map how work actually moves, and account for every tool you pay for. You get a written plan: where AI saves the most hours, what to train, what to build, what to connect, and what it costs. If the numbers don&apos;t justify a build, we say so. If they do, the discovery fee comes off your build.</p>
            <Link href="/contact" className="h-btn h-btn-light">Book a conversation</Link>
            <p className="h-cta-meta">The first conversation is free. No sales deck.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
