import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import "./pricing.css";

export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "AI Implementation Pricing: Every Price in Writing · Novum AI",
  description: "A free build on your own work in two weeks, then fixed prices agreed in writing: AI workspace setup, builds, platform replacement, upkeep and a fractional AI Officer. You own all of it.",
});

// Published menu (Michael, 2026-11-14), priced from the cost model in novum-vault/CONTEXT.md:
// $167 per delivery hour, 50% margin. Reverses the 2026-10-16 no-prices rule.
const MENU = [
  { tag: "Start here", name: "Free build", price: "Free", unit: "", time: "Two weeks", body: "One agent or tool, built on your own work and data. Keep it and pay a fixed price for it, or it becomes the start of your engagement. The only thing you sign is a one-page agreement that protects your data." },
  { tag: "Setup", name: "AI workspace setup", price: "from $3,500", unit: "", time: "Days", body: "One team workspace on Claude, ChatGPT or Microsoft Copilot, connected to the tools you use, loaded with your templates and house rules, and your team trained on it." },
  { tag: "Build", name: "Fixed-scope build", price: "from $7,500", unit: "", time: "Weeks", body: "One agent, integration or tool on your data, with training for the people who use it and a support window after launch." },
  { tag: "Replace", name: "Replace a rented platform", price: "from $25,000", unit: "", time: "Module by module", body: "Custom software built around how you work, with your data moved over, replacing a platform you rent. Scoped first, then a fixed price in writing." },
  { tag: "After launch", name: "Upkeep plan", price: "from $1,500", unit: "/ month", time: "Month to month", body: "Monitoring, fixes when a connected tool changes, small changes and a monthly report. Optional: you own the system and can run it without us." },
  { tag: "Ongoing", name: "Fractional AI Officer", price: "from $7,750", unit: "/ month", time: "Six months, then monthly", body: "Live training every month, weekly office hours, builds worked in parallel from one queue, and a roadmap reviewed with your sponsor. Sized to your team and build queue." },
];

const SCHEDULE = [
  { n: "Free build", d: "A working tool on your work", p: "free" },
  { n: "AI workspace setup", d: "Claude, ChatGPT or Copilot, trained", p: "from $3,500" },
  { n: "Fixed-scope build", d: "One agent, integration or tool", p: "from $7,500" },
  { n: "Replace a platform", d: "Custom software you own", p: "from $25,000" },
  { n: "Upkeep plan", d: "Optional, month to month", p: "from $1,500 / mo" },
  { n: "AI Officer", d: "Training, builds, roadmap", p: "from $7,750 / mo" },
];

const BUILDS = [
  {
    name: "Answer every lead",
    body: "Calls, forms and emails answered in minutes, qualifying questions asked, the appointment booked and the CRM updated. Anything unusual goes to a person with the history attached.",
    rows: [["9:14 PM", "Web form: water heater out"], ["9:15 PM", "Reply sent, two questions asked"], ["9:21 PM", "Booked Thu 8:00 AM, CRM updated"]],
  },
  {
    name: "Paperwork to paid",
    body: "Invoices, orders and forms read as they arrive, checked against your rules, posted to your accounting software once a person approves, then billed and followed up.",
    rows: [["PO 48211", "Read, 14 lines matched"], ["Line 9", "Price differs from contract, held"], ["Approved", "Posted, invoice sent"]],
  },
  {
    name: "Private AI workspace",
    body: "An assistant that answers from your own files and cites them, limited by role, running in accounts your company owns. For work you can't paste into a public chatbot.",
    rows: [["Asked", "What did we agree on the cap?"], ["Answer", "12 months of fees, MSA section 9.2"], ["Sources", "Contract v4, two emails"]],
  },
  {
    name: "Connect your AI to your systems",
    body: "Connectors that let Claude, ChatGPT or Copilot look things up in your practice, job or accounting software and take approved actions, with permissions and a log.",
    rows: [["Asked", "Which jobs are over budget?"], ["Looked up", "Job costing, 38 open jobs"], ["Answer", "3 jobs, list sent for review"]],
  },
];

const CUSTODY = [
  ["Your documents and data", "Yours, in your accounts", "No copy kept"],
  ["AI provider account and keys", "In your company's name", "Admin access you can revoke"],
  ["Code and workflows", "Yours, in your repository", "Handed over at launch"],
  ["Hosting and services", "In your company's name", "None after handover"],
  ["Activity log", "Yours", "Read only when you ask"],
  ["Access after launch", "You decide", "Revocable any time"],
];

const FAQ = [
  { q: "What does the free build cost us?", a: "Nothing but some of your team's time: a kickoff, access to the tools involved, and a review at the end. You sign one page that protects your data. If you keep the tool, you pay the fixed price we agreed before we started, or it becomes the start of your engagement." },
  { q: "How is a fixed price set?", a: "We estimate the hours the work takes from what we learn about your workflow, and you get one number in writing before any work starts. The prices on this page are where each item starts." },
  { q: "What does the AI itself cost?", a: "The AI provider bills your company directly, at cost, in your company's name. No markup and no seats. We estimate the monthly cost of each tool before you approve it." },
  { q: "Do we have to keep paying you?", a: "No. You own the code, data and accounts. Run it yourself, hire anyone to work on it, or keep us on the upkeep plan or as your AI Officer." },
  { q: "What about confidential or regulated work?", a: "It runs inside accounts your company owns, limited by role, with an activity log, and nothing trains on your files. For privileged or regulated work we can keep it inside your own cloud account with private networking." },
];

export default function PricingPage() {
  return (
    <main id="pricing">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }]), faqJsonLd(FAQ)]} />

      <section className="phero">
        <div className="wrap pr-hero">
          <div>
            <div className="label">Pricing</div>
            <h1>Every price, in writing, before any work starts.</h1>
            <p className="lead">Start with a free build: a working tool on your own work in two weeks. Keep it and pay a fixed price, or stop there. Everything we build is yours.</p>
            <div className="ctas">
              <Link className="btn" href="/contact">Book a call <span aria-hidden="true">→</span></Link>
              <Link className="btn ghost" href="/contact">Get a written plan, no call</Link>
            </div>
          </div>
          <figure className="pr-sched" aria-label="Schedule of fees">
            <div className="pr-sched-h"><b>Schedule of fees</b></div>
            <ul>
              {SCHEDULE.map((s) => (
                <li key={s.n}>
                  <div><b>{s.n}</b><span>{s.d}</span></div>
                  <em>{s.p}</em>
                </li>
              ))}
            </ul>
            <p className="pr-sched-f">Fixed price agreed in writing before any work starts.</p>
            <span className="pr-stamp" aria-hidden="true"><span>You own it</span></span>
          </figure>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pr-menu-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The menu</div>
          <h2 className="h2" id="pr-menu-h">What it costs.</h2>
          <p className="lead">Most companies start with the free build, add a build or two, and keep us on as their AI Officer once the team is using what we built.</p>
          <div className="pr-menu">
            {MENU.map((m) => (
              <div className={`pr-item${m.price === "Free" ? " pr-free" : ""}`} key={m.name}>
                <span className="meta">{m.tag}</span>
                <h3>{m.name}</h3>
                <p className="pr-price">{m.price}<small>{m.unit}</small></p>
                <p className="pr-body">{m.body}</p>
                <p className="pr-time"><span className="meta">Timing</span>{m.time}</p>
              </div>
            ))}
          </div>
          <p className="fine">Want your team in a room first? An on-site <Link className="link" href="/training">training day</Link> starts at $2,500. AI usage is billed by the AI provider directly to your company, at cost. No seats, no per-user licenses, no revenue share.</p>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="pr-builds-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Builds people start with</div>
          <h2 className="h2" id="pr-builds-h">Where most companies start.</h2>
          <p className="lead">Any of these can be your free build. Example data below.</p>
          <div className="pr-builds">
            {BUILDS.map((b) => (
              <div className="pr-build" key={b.name}>
                <h3>{b.name}</h3>
                <p>{b.body}</p>
                <div className="pr-log" aria-label={`${b.name} example`}>
                  {b.rows.map(([k, v]) => (
                    <div key={k}><span>{k}</span><b>{v}</b></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pr-own-h">
        <div className="wrap own2 pr-split">
          <div>
            <div className="label"><span className="ix">03</span>Who holds it</div>
            <h2 className="h2" id="pr-own-h">Everything sits in your company&apos;s name.</h2>
            <p className="lead">Every system runs in accounts your business owns, on your own AI keys. If you stop working with us, nothing breaks.</p>
            <Link className="link" href="/security">How your data is protected <span aria-hidden="true">→</span></Link>
          </div>
          <div className="paper pr-paper">
            <div className="paper-h"><b>Who holds it</b><span>Every engagement</span></div>
            <div className="pr-tw">
              <table className="ptable">
                <thead><tr><th>What</th><th>Your company</th><th>Novum AI</th></tr></thead>
                <tbody>
                  {CUSTODY.map(([a, b, c]) => (
                    <tr key={a}><td>{a}</td><td><b>{b}</b></td><td>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="pr-faq-h">
        <div className="wrap pr-faqwrap">
          <div>
            <div className="label"><span className="ix">04</span>Questions</div>
            <h2 className="h2" id="pr-faq-h">What people ask about price.</h2>
          </div>
          <div className="pr-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="pr-next-h">
        <div className="wrap">
          <div className="first">
            <div><span className="meta">Start free</span><h3 id="pr-next-h">Pick the job your team is tired of.</h3></div>
            <div>
              <p>We build a working tool on it in two weeks. You decide what happens next.</p>
              <div className="pr-next">
                <Link className="btn" href="/contact">Book a call <span aria-hidden="true">→</span></Link>
                <Link className="link" href="/ai-officer">What the AI Officer includes <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
