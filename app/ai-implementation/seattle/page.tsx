import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import "../../compare.css";

// Seattle page, modeled on the Portland page but with Seattle facts, not a name swap. Targets "AI implementation Seattle",
// "AI consulting Seattle". No Seattle office or local clients claimed (Novum is Portland-based), no prices, case studies
// anonymous and never blended. Counts from Census cbp23co, King, Pierce and Snohomish counties, pulled 2026-10-24.
const PATH = "/ai-implementation/seattle";
const DESC = "AI implementation and consulting for Seattle-area companies: we train your team on its own work, build agents and custom software inside the tools you run, and you own all of it.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: "AI Implementation and Consulting in Seattle · Novum AI", description: DESC });

// Census County Business Patterns 2023, Seattle-Tacoma-Bellevue metro, establishments with 20 to 99 employees.
// Wholesale is durable-goods merchant wholesalers (NAICS 423), the same cut as the Portland page.
const INDUSTRIES = [
  { n: "481", t: "Wholesale distribution", b: "Order entry from the inbox, tested on 200 past emailed POs", href: "/use-cases/wholesale-distribution" },
  { n: "274+", t: "Trucking, warehousing and freight", b: "Load updates, carrier calls and paperwork drafted for dispatch to approve", href: "/use-cases" },
  { n: "166+", t: "Metals and machinery", b: "RFQ to a draft quote, tested on 50 past RFQs", href: "/use-cases/manufacturing" },
  { n: "64+", t: "Accounting", b: "Missing-document requests, tested on 50 clients", href: "/use-cases/accounting" },
  { n: "48+", t: "Insurance agencies", b: "Certificate drafter, tested on 200 certificates", href: "/use-cases/insurance" },
];

const START = [
  { b: "Workflow map", s: "How the work actually moves, step by step, with the people who do it" },
  { b: "Tool and cost report", s: "Every program you pay for: keep it, connect it, replace it, or cut it" },
  { b: "AI usage policy", s: "Which data goes where, and who approves what goes out" },
  { b: "Team trained", s: "A session on your own work, recorded for a library you keep" },
  { b: "A working tool", s: "An agent, a connected tool, or the first piece of custom software, on your own data" },
];

const PROOF = [
  { n: "10 hrs → 1.5 hrs", t: "Per bank draw application, with agents drafting and a project manager reviewing", s: "A construction company" },
  { n: "$60,000 a year", t: "Investor platform replaced with one it owns, with a portal for every investor", s: "A real estate developer" },
  { n: "95% less", t: "Data entry, with staff reviewing what the agent flags", s: "A 15-person bookkeeping firm" },
];

const FAQ = [
  { q: "What does an AI consultant in Seattle actually do?", a: "We map how your work moves, audit every tool you pay for, write your AI usage policy, train your team on its own work, and put a working tool on your own data. Then you get a written plan for what comes next. Everything we deliver is yours." },
  { q: "We already pay for Microsoft 365 and Copilot. Do we need more?", a: "Often not more software, just better use of what you have. We build inside Microsoft 365 and Copilot where you run them, connect them to the systems Copilot can't see, and train your team on its own work so the licenses get used." },
  { q: "Are you based in Seattle?", a: "We're based in Portland, Oregon, and work with Seattle-area teams on site and remotely. Training days happen at your office. Builds, check-ins and monthly training run remotely between visits." },
  { q: "Which Seattle-area companies are a fit?", a: "Operational businesses of 15 people and up with no one whose job is AI: distributors, freight and logistics firms around the ports, manufacturers, accounting firms, insurance agencies, construction, legal, healthcare and more. The strongest fit has repeat paperwork or phone volume and tools that don't talk to each other." },
  { q: "What does AI implementation cost?", a: "It depends on team size, how many systems connect, how many builds run at once, and whether you replace software. Every engagement starts with a discovery, sized to your company, that ends with a written plan and prices for what comes next." },
];

export default function SeattlePage() {
  return (
    <main>
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "AI Implementation", path: "/ai-implementation" }, { name: "Seattle", path: PATH }]),
        { ...serviceJsonLd({ name: "AI implementation in Seattle, Washington", serviceType: "AI implementation", path: PATH, description: DESC }), areaServed: [{ "@type": "City", name: "Seattle, Washington" }, { "@type": "AdministrativeArea", name: "Seattle-Tacoma-Bellevue metro area" }] },
        faqJsonLd(FAQ),
      ]} />

      <section className="phero" aria-labelledby="sea-h1">
        <div className="wrap gd-hgrid">
          <div>
            <div className="label">AI implementation · Seattle, Washington</div>
            <h1 id="sea-h1">AI implementation for Seattle-area companies.</h1>
            <p className="lead">Novum AI implements AI inside Seattle, Tacoma and Bellevue companies: we train your team on its own work, build agents and custom software, connect the tools you keep, and everything we deliver is yours. For operational businesses of 15 people and up with no one whose job is AI.</p>
            <div className="ctas">
              <Link className="btn" href="#contact">Start a conversation</Link>
              <Link className="btn ghost" href="/how-we-work">How an engagement runs</Link>
            </div>
          </div>
          <figure className="gd-doc" aria-label="Seattle metro firms with 20 to 99 employees, by industry">
            <div className="gd-doc-h"><span>Seattle metro firms</span><span className="meta">20 to 99 employees</span></div>
            <table>
              <thead><tr><th scope="col">Industry</th><th scope="col" className="r">Firms</th></tr></thead>
              <tbody>
                {INDUSTRIES.map((r) => <tr key={r.t}><td>{r.t}</td><td className="r">{r.n}</td></tr>)}
              </tbody>
            </table>
            <figcaption><span className="dot" /><span>U.S. Census Bureau, <b>County Business Patterns 2023</b>.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-what-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>What we do</div>
          <h2 className="h2" id="sea-what-h">AI implementation across your company. <span className="mute">You own all of it.</span></h2>
          <p className="lead">Training, agents, custom software, and a fractional Chief AI Officer. We teach your team on its own work, build the tools, connect the systems you keep, and replace software that no longer fits. A person approves anything before it is sent, filed or paid.</p>
          <div className="gd-next">
            <Link className="link" href="/training">Training <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/ai-implementation">AI implementation <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/ai-officer">Fractional AI Officer <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-m365-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Microsoft 365 and Copilot</div>
          <h2 className="h2" id="sea-m365-h">Most Seattle teams already pay for AI. <span className="mute">Few use it on the real work.</span></h2>
          <p className="lead">If your company runs on Microsoft 365, the AI is often already in the license. We build inside Microsoft 365 and Copilot where you run them, connect them to the ERP, accounting and job systems Copilot can&apos;t see, and train each team on its own tasks, so the seats you pay for start saving hours.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-ind-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Seattle industries</div>
          <h2 className="h2" id="sea-ind-h">Where the repeat work is in the Seattle metro.</h2>
          <p className="lead">More than 1,000 firms in King, Pierce and Snohomish counties in these five industries have 20 to 99 people. Freight moving through the ports of Seattle and Tacoma feeds a large base of distributors, carriers and warehouses, and most of them run on repeat paperwork and tools that don&apos;t talk. Each has a clear place to start.</p>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead><tr><th scope="col">Industry</th><th scope="col">Seattle-area firms</th><th scope="col" className="us">A typical place to start</th></tr></thead>
              <tbody>
                {INDUSTRIES.map((r) => (
                  <tr key={r.t}>
                    <td><Link href={r.href}>{r.t}</Link></td>
                    <td data-l="Seattle-area firms">{r.n}</td>
                    <td data-l="A typical place to start" className="us">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cmp-note">Establishments with 20 to 99 employees, Seattle-Tacoma-Bellevue metro (King, Pierce and Snohomish counties). Wholesale counts durable-goods merchant wholesalers. U.S. Census Bureau, County Business Patterns 2023. Counts marked + are lower bounds because Census withholds small cells. Starting points are examples from our industry pages.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-start-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>How it starts</div>
          <h2 className="h2" id="sea-start-h">Every engagement starts with a discovery. <span className="mute">It ends with a working tool on your own data.</span></h2>
          <ul className="mlist">
            {START.map((x) => <li key={x.b}><b>{x.b}</b><span>{x.s}</span></li>)}
          </ul>
          <p className="cmp-note">You keep everything we deliver, whatever you decide next.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-train-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>On-site training</div>
          <h2 className="h2" id="sea-train-h">A training day at your office.</h2>
          <p className="lead">Five hours in the room with your team, on their own work: how AI works, which tools fit your company, hands-on practice on tasks from their week, which agents to build first, and what data stays private. We come to you anywhere in the Seattle area. Written guides stay with the team.</p>
          <p style={{ marginTop: 32 }}><Link className="link" href="/training">Request a training day <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-proof-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Results</div>
          <h2 className="h2" id="sea-proof-h">Three engagements, measured.</h2>
          <div className="finds" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            {PROOF.map((p) => <div key={p.s}><b>{p.n}</b><span>{p.t}</span><small>{p.s}</small></div>)}
          </div>
          <p style={{ marginTop: 32 }}><Link className="link" href="/case-studies">Read the case studies <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-own-h">
        <div className="wrap">
          <div className="label"><span className="ix">07</span>What you own</div>
          <h2 className="h2" id="sea-own-h">Code, data and accounts in your company&apos;s name.</h2>
          <p className="lead">Every agent, integration and piece of software sits in a repository and on accounts your company owns, including the AI account, which you pay at cost. If you stop working with us, nothing breaks. Hosted on SOC 2 Type 2 infrastructure.</p>
          <p style={{ marginTop: 32 }}><Link className="link" href="/security">Security and data <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sea-faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">08</span>Questions</div>
          <h2 className="h2" id="sea-faq-h">What Seattle owners ask first.</h2>
          <div className="gd-faq">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="contact" aria-labelledby="sea-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="sea-cta-h">Tell us how your business runs.</h2>
            <p className="lead">We reply the same business day. Or write to <a href="mailto:hello@thenovumai.com">hello@thenovumai.com</a>.</p>
          </div>
          <ContactForm source="Seattle page" />
        </div>
      </section>
    </main>
  );
}
