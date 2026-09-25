import Link from "next/link";
import { ArisChat } from "../components/ArisChat";
import "./home.css";

// ─── Content ──────────────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    title: "Priced to grow with you",
    body: (
      <>
        Procore bills on annual construction volume. Win a bigger year and the bill goes up <em>for the same software</em>. Seat-based tools do the same with every hire. Stop paying and access goes with it.
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
  ["What it costs", "A subscription for every tool, rising every year.", "One build fee, then hosting at cost."],
  ["How it fits", "Your team bends to the template.", "Built around how you already work."],
  ["How many systems", "One per department, stitched together by hand.", "One system, one set of data."],
  ["AI", "Sold as an add-on, one tool at a time.", "Built in, across everything."],
  ["If you stop paying", "Access is cut off.", "It keeps running. It's yours."],
  ["Who can change it", "Only the vendor, on their roadmap.", "Us, your team, or any developer you hire."],
];

const STEPS = [
  {
    title: "Discovery",
    tag: "Flat fee · credits toward the build",
    body: "We sit with your team, map how the work actually moves, and list every tool you pay for and what it costs.",
    includes: "workflow and tool audit, a written scope, a fixed price, and the full fee credited if you build",
  },
  {
    title: "Build",
    tag: "Fixed price · no subscription",
    body: "We build your system in phases, highest-impact first, with A.R.I.S and agents wired into it. Each phase is live and in use before the next starts.",
    includes: "data migrated from your current tools, AI built in, team training, and the code handed to you",
  },
  {
    title: "Run",
    tag: "Hosting at cost · support optional",
    body: "You pay for storage, security, and hosting. Nothing is priced on seats or revenue. Add support when you want new features or new agents.",
    includes: "monitoring, backups, security updates, and month-to-month support you can cancel anytime",
  },
];

const SYSTEMS = [
  {
    title: "Core",
    body: "Projects, schedules, budgets, vendors, and reporting in one place, built around how your team works. This replaces the platforms you rent today.",
  },
  {
    title: "Vault",
    body: "Contracts, drawings, records, and history. Encrypted, indexed, and searchable in plain English, with access controlled by role.",
  },
  {
    title: "A.R.I.S",
    body: "Ask a question about any part of your operation and get the answer in seconds. It runs on your data only.",
  },
  {
    title: "Agents",
    body: "Because everything lives in one system, AI can do real work inside it: draft the RFI, match the invoice to the PO, chase the missing lien waiver, build the weekly report.",
  },
];

const SECURITY = [
  ["Encrypted everywhere", "Files and records are encrypted at rest and in transit."],
  ["Role-based access", "Each person sees exactly what their role allows."],
  ["Your infrastructure", "Deployed on accounts your company owns."],
  ["No data resale", "We never aggregate, sell, or train on your data."],
  ["Full audit trail", "Every view and edit is logged with who and when."],
  ["Private AI", "A.R.I.S and your agents work on your data and nothing else."],
];

const FAQ = [
  {
    q: "What does it cost?",
    a: "Discovery is a flat fee that credits toward the build. The build is a fixed price we quote after discovery. After that you pay hosting, storage, and security at cost. For Seneca Development that runs about $700 a year.",
  },
  {
    q: "Will it do everything Procore (or our current tool) does?",
    a: "It will do what your team uses. Most companies pay for a full platform and use a slice of it. We build that slice around how you work, connect it to the rest of your operation, and add what the platform never had.",
  },
  {
    q: "What can the AI actually do?",
    a: "A.R.I.S answers questions across every project, document, and report in your system. Agents handle the repeat work: drafting, matching, chasing, and reporting. We scope the agents with you during discovery.",
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
            <span className="h-pill">Custom software · AI built in</span>
            <h1>
              One system for your entire operation, at a <span className="h-grad">fraction of the cost</span>.
            </h1>
            <p className="h-hero-sub">
              We replace the software you rent with a platform built around how your team works, then put AI to work inside it. Seneca Development cut a $100,000-a-year software bill to about $700.
            </p>
            <ul className="h-proof">
              <li>Built around your workflows, not a template.</li>
              <li>A.R.I.S and AI agents working across all of it.</li>
              <li>One build fee, then hosting at cost. The code is yours.</li>
            </ul>
            <div className="h-ctas">
              <Link href="/contact" className="h-btn h-btn-primary">Book a conversation</Link>
              <a href="#how" className="h-btn h-btn-ghost">How it works →</a>
            </div>
          </div>

          <div className="h-vis" aria-hidden="true">
            <div className="h-card h-card-rent">
              <div className="h-card-bar"><i /><i /><i /><span>Annual software cost</span></div>
              <div className="h-card-body">
                <div className="h-bill">
                  <div className="h-bill-row h-bill-old"><span>Construction management platform</span><s>$100,000</s></div>
                  <div className="h-bill-row"><span>Novum system: hosting, storage, security</span><b>$700</b></div>
                </div>
              </div>
            </div>

            <div className="h-card h-card-own">
              <div className="h-card-bar"><i /><i /><i /><span>ops.yourcompany.com · agent activity</span></div>
              <div className="h-card-body">
                <div className="h-feed">
                  <div><i className="h-dot" /><span>Drafted RFI #214 from the superintendent&apos;s field note</span><small>2m</small></div>
                  <div><i className="h-dot" /><span>Matched 38 invoices to purchase orders, flagged 2</span><small>14m</small></div>
                  <div><i className="h-dot" /><span>Requested missing lien waiver from Apex Electric</span><small>1h</small></div>
                  <div><i className="h-dot" /><span>Built the weekly owner report for 4 projects</span><small>3h</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strip */}
      <div className="h-strip">
        <div className="h-wrap">
          <p>Built for operators in</p>
          <span>Construction</span>
          <span>Real estate</span>
          <span>Field services</span>
          <span>Professional services</span>
          <span>Logistics</span>
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

      {/* Case study */}
      <section className="h-sec h-soft">
        <div className="h-wrap h-roi">
          <div>
            <div className="h-eyebrow">Case study · Seneca Development Co.</div>
            <h2>What would you do with <span className="h-grad">$99,300</span> back every year?</h2>
            <p className="h-roi-sub">
              Seneca was paying $100,000 a year for construction management software. We rebuilt it around how they run projects, connected it to the rest of the business, and put A.R.I.S on top. After the build, the system costs about $700 a year to host, store, and secure.
            </p>
            <div className="h-chips">
              <span>$100,000/yr before</span>
              <span>~$700/yr after</span>
              <span>99% lower annual cost</span>
            </div>
          </div>
          <div className="h-roi-card">
            <h3>What Seneca runs on now</h3>
            <ul>
              <li><b>Construction management</b> rebuilt around their own workflows, replacing the subscription platform.</li>
              <li><b>Projects, documents, and investor reporting</b> in one system instead of spreadsheets and shared drives.</li>
              <li><b>A.R.I.S</b> answering questions across every project and document the firm has.</li>
            </ul>
            <div className="h-roi-foot">
              <p>One build fee. Then storage, security, and hosting. No seats, no revenue share, no renewal.</p>
              <Link href="/case-studies/seneca-development">Read the full case study →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Systems */}
      <section className="h-sec">
        <div className="h-wrap h-sys">
          <div>
            <div className="h-head" style={{ marginBottom: 32 }}>
              <div className="h-eyebrow">What we build</div>
              <h2>One system. AI across all of it.</h2>
              <p>Each piece works on its own. Together they share one set of data, which is what lets the AI answer real questions and do real work.</p>
            </div>
            <div className="h-syslist">
              {SYSTEMS.map((s) => (
                <div className="h-sysitem" key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-demo">
            <div className="h-demo-bar"><i /><i /><i /><span>A.R.I.S · live demo</span></div>
            <ArisChat height={620} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="h-sec h-soft" id="how">
        <div className="h-wrap">
          <div className="h-howgrid">
            <div className="h-head">
              <div className="h-eyebrow">How it works</div>
              <h2>Three steps. One price for the build.</h2>
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
      <section className="h-sec h-soft">
        <div className="h-wrap">
          <div className="h-head">
            <div className="h-eyebrow">Security</div>
            <h2>Built locked down from day one.</h2>
            <p>Every build ships with these in place.</p>
          </div>
          <div className="h-sec6">
            {SECURITY.map(([t, d]) => (
              <div key={t}><h3>{t}</h3><p>{d}</p></div>
            ))}
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
      <section className="h-sec" style={{ paddingTop: 0 }}>
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
