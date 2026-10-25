import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import "../../compare.css";

// Portland page (brief: novum-vault/docs/portland-page-brief-2026-10-20.md). Targets "AI implementation Portland",
// "AI consulting Portland". Real local facts only: Census firm counts and on-site training. No street address,
// no local clients claimed, no prices, case studies anonymous and never blended.
const PATH = "/ai-implementation/portland";
const DESC = "AI implementation and consulting for Portland companies: we train your team on its own work, build agents and custom software, and you own all of it.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: "AI Implementation and Consulting in Portland · Novum AI", description: DESC });

// Census County Business Patterns 2023, Portland metro, establishments with 20 to 99 employees.
// Starting points come from each industry page (lib/useCases.ts). Trucking has no industry page yet.
const INDUSTRIES = [
  { n: "335", t: "Wholesale distribution", b: "Order entry from the inbox, tested on 200 past emailed POs", href: "/use-cases/wholesale-distribution" },
  { n: "187+", t: "Metals and machinery", b: "RFQ to a draft quote, tested on 50 past RFQs", href: "/use-cases/manufacturing" },
  { n: "161+", t: "Trucking, warehousing and freight", b: "Load updates, carrier calls and paperwork drafted for dispatch to approve", href: "/use-cases" },
  { n: "47+", t: "Accounting", b: "Missing-document requests, tested on 50 clients", href: "/use-cases/accounting" },
  { n: "33+", t: "Insurance agencies", b: "Certificate drafter, tested on 200 certificates", href: "/use-cases/insurance" },
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
  { q: "What does an AI consultant in Portland actually do?", a: "We map how your work moves, audit every tool you pay for, write your AI usage policy, train your team on its own work, and put a working tool on your own data. Then you get a written plan for what comes next. Everything we deliver is yours." },
  { q: "Do you offer AI classes or training in Portland?", a: "Yes. A five-hour training day at your office, on your team's own work: how AI works, which tools fit your company, which agents to build first, and what data stays private. Request a quote through the training page. Ongoing clients also get live training every month." },
  { q: "How is Novum different from an AI automation agency?", a: "We train your team on your own systems and data, so what gets built gets used. A person approves anything before it is sent, filed or paid. And the code, data and accounts are in your company's name, so nothing breaks if you stop working with us." },
  { q: "Which Portland companies are a fit?", a: "Operational businesses of 15 people and up with no one whose job is AI: distributors, manufacturers, freight and logistics firms, accounting firms, insurance agencies, construction, legal, healthcare and more. The strongest fit has repeat paperwork or phone volume and tools that don't talk to each other." },
  { q: "What does AI implementation cost?", a: "It depends on team size, how many systems connect, how many builds run at once, and whether you replace software. Every engagement starts with a discovery, sized to your company, that ends with a written plan and prices for what comes next." },
];

export default function PortlandPage() {
  return (
    <main>
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "AI Implementation", path: "/ai-implementation" }, { name: "Portland", path: PATH }]),
        { ...serviceJsonLd({ name: "AI implementation in Portland, Oregon", serviceType: "AI implementation", path: PATH, description: DESC }), areaServed: [{ "@type": "City", name: "Portland, Oregon" }, { "@type": "AdministrativeArea", name: "Portland metro area" }] },
        faqJsonLd(FAQ),
      ]} />

      <section className="phero" aria-labelledby="pdx-h1">
        <div className="wrap gd-hgrid">
          <div>
            <div className="label">AI implementation · Portland, Oregon</div>
            <h1 id="pdx-h1">AI implementation for Portland companies.</h1>
            <p className="lead">Novum AI implements AI inside Portland companies: we train your team on its own work, build agents and custom software, connect the tools you keep, and everything we deliver is yours. For operational businesses of 15 people and up with no one whose job is AI.</p>
            <div className="ctas">
              <Link className="btn" href="#contact">Start a conversation</Link>
              <Link className="btn ghost" href="/how-we-work">How an engagement runs</Link>
            </div>
          </div>
          <figure className="gd-doc" aria-label="Portland metro firms with 20 to 99 employees, by industry">
            <div className="gd-doc-h"><span>Portland metro firms</span><span className="meta">20 to 99 employees</span></div>
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

      <section className="sec light" aria-labelledby="pdx-what-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>What we do</div>
          <h2 className="h2" id="pdx-what-h">AI implementation across your company. <span className="mute">You own all of it.</span></h2>
          <p className="lead">Training, agents, custom software, and a fractional Chief AI Officer. We teach your team on its own work, build the tools, connect the systems you keep, and replace software that no longer fits. A person approves anything before it is sent, filed or paid.</p>
          <div className="gd-next">
            <Link className="link" href="/training">Training <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/ai-implementation">AI implementation <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/ai-officer">Fractional AI Officer <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pdx-ind-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Portland industries</div>
          <h2 className="h2" id="pdx-ind-h">Where the repeat work is in Portland.</h2>
          <p className="lead">More than 750 Portland-area firms in these five industries have 20 to 99 people, and most run on repeat paperwork and tools that don&apos;t talk. Each has a clear place to start.</p>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead><tr><th scope="col">Industry</th><th scope="col">Portland firms</th><th scope="col" className="us">A typical place to start</th></tr></thead>
              <tbody>
                {INDUSTRIES.map((r) => (
                  <tr key={r.t}>
                    <td><Link href={r.href}>{r.t}</Link></td>
                    <td data-l="Portland firms">{r.n}</td>
                    <td data-l="A typical place to start" className="us">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cmp-note">Establishments with 20 to 99 employees, Portland metro (Clackamas, Columbia, Multnomah, Washington, Yamhill, Clark and Skamania counties). U.S. Census Bureau, County Business Patterns 2023. Counts marked + are lower bounds because Census withholds small cells. Starting points are examples from our industry pages.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pdx-start-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>How it starts</div>
          <h2 className="h2" id="pdx-start-h">Every engagement starts with a discovery. <span className="mute">It ends with a working tool on your own data.</span></h2>
          <ul className="mlist">
            {START.map((x) => <li key={x.b}><b>{x.b}</b><span>{x.s}</span></li>)}
          </ul>
          <p className="cmp-note">You keep everything we deliver, whatever you decide next.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pdx-train-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>On-site training</div>
          <h2 className="h2" id="pdx-train-h">A training day at your Portland office.</h2>
          <p className="lead">Five hours in the room with your team, on their own work: how AI works, which tools fit your company, hands-on practice on tasks from their week, which agents to build first, and what data stays private. Written guides stay with the team.</p>
          <p style={{ marginTop: 32 }}><Link className="link" href="/training">Request a training day <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pdx-proof-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Results</div>
          <h2 className="h2" id="pdx-proof-h">Three engagements, measured.</h2>
          <div className="finds" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            {PROOF.map((p) => <div key={p.s}><b>{p.n}</b><span>{p.t}</span><small>{p.s}</small></div>)}
          </div>
          <p style={{ marginTop: 32 }}><Link className="link" href="/case-studies">Read the case studies <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pdx-own-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>What you own</div>
          <h2 className="h2" id="pdx-own-h">Code, data and accounts in your company&apos;s name.</h2>
          <p className="lead">Every agent, integration and piece of software sits in a repository and on accounts your company owns, including the AI account, which you pay at cost. If you stop working with us, nothing breaks. Hosted on SOC 2 Type 2 infrastructure.</p>
          <p style={{ marginTop: 32 }}><Link className="link" href="/security">Security and data <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="pdx-faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">07</span>Questions</div>
          <h2 className="h2" id="pdx-faq-h">What Portland owners ask first.</h2>
          <div className="gd-faq">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="contact" aria-labelledby="pdx-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="pdx-cta-h">Tell us how your business runs.</h2>
            <p className="lead">We reply the same business day. Or write to <a href="mailto:hello@thenovumai.com">hello@thenovumai.com</a>.</p>
          </div>
          <ContactForm source="Portland page" />
        </div>
      </section>
    </main>
  );
}
