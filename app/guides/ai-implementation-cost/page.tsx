import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, articleJsonLd, faqJsonLd } from "@/lib/seo";
import "../../compare.css";

// Guide for "AI implementation cost", "AI consultant cost". Rules: no Novum prices, no hosting cost figure,
// and only figures already sourced on /why-ai and /case-studies. Company byline only.
const PATH = "/guides/ai-implementation-cost";
const TITLE = "What AI Implementation Costs: What Drives the Price";
const DESC = "What AI implementation costs a small business: the six cost lines, what moves the price, the hidden costs of the cheap route, and how to compare quotes.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: "What AI Implementation Costs, Line by Line · Novum AI", description: DESC });

// Hero example: a tool and cost report for a sample 40-person company. Fictional monthly costs; no Novum prices.
const TOOLS = [
  { t: "Project management platform", d: "40 seats, price up every renewal", c: 3400, tag: "Replace", k: "go" },
  { t: "AI add-ons in 3 programs", d: "9 of 40 seats used", c: 1800, tag: "Cut", k: "warn" },
  { t: "CRM", d: "12 seats, retyped into accounting", c: 1080, tag: "Connect", k: "go" },
  { t: "Document storage", d: "No search across files", c: 480, tag: "Connect", k: "go" },
  { t: "Accounting software", d: "Works well", c: 290, tag: "Keep" },
  { t: "Scheduling app", d: "Works well", c: 160, tag: "Keep" },
];
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const LINES = [
  { t: "Discovery and plan", b: "Mapping the work, auditing your tools, and writing the AI policy. Scales with team size, number of sites and number of programs.", k: "One time" },
  { t: "Training", b: "Sessions on the team's own tools and tasks. Scales with headcount and how many departments go live.", k: "Ongoing" },
  { t: "Builds", b: "Agents, an assistant and integrations. Scales with how many systems connect and how many builds run at once.", k: "Per build" },
  { t: "AI usage", b: "What the AI provider charges per task. Usually the smallest line: an agent keys an invoice for about a cent.", k: "Usage" },
  { t: "Upkeep", b: "Monitoring, monthly re-scoring, model updates, fixes and backups. The cost most quotes leave out.", k: "Monthly" },
  { t: "Software replacement", b: "A one-time build that ends a subscription. Worth it only when owning costs less than renting over a few years.", k: "One time" },
];

const DRIVERS = [
  { d: "Team size and sites", w: "More people to train, more workflows to map, more approval chains to set up." },
  { d: "Number of systems", w: "Each program that connects needs access, testing and upkeep. Programs with no export or API cost the most." },
  { d: "Builds at once", w: "Running two builds in parallel moves faster and needs more hands than one at a time." },
  { d: "Years of data", w: "Moving old records out of a platform takes cleaning and checking before anyone trusts them." },
  { d: "Assistant or agents that act", w: "An assistant that answers questions is simpler than agents that draft, file or send, which need approval steps and logs." },
  { d: "Rules you must follow", w: "Healthcare, legal and financial work add access controls, audit trails and review." },
];

const TASKS = [
  { t: "Key one invoice into the system", p: "4 minutes, about $1.89", a: "About $0.01" },
  { t: "Draft a two-page memo", p: "45 minutes, about $24.50", a: "About $0.02, plus 10 minutes of review" },
  { t: "Handle a three-minute phone call", p: "About $1.54", a: "About $0.33 to $0.42" },
];

const HIDDEN = [
  { h: "A seat in every tool", p: "Per-person AI add-ons in each program add up across departments, and grow with every hire." },
  { h: "Seats nobody uses", p: "Teams handed AI with no training saved about 3% of their time. The seats get paid for either way." },
  { h: "Data in personal accounts", p: "When there's no approved tool, staff paste client files into personal chatbots. That risk has a cost too." },
  { h: "Starting over", p: "If the vendor holds the code, data and accounts, leaving means rebuilding from zero." },
];

const QUOTE_CHECKS = [
  { b: "Who owns the code, data and accounts?", s: "They should be in your company's name, so nothing breaks if you leave." },
  { b: "Is training included, and on whose work?", s: "Generic courses rarely change how people work. Training on your own tasks does." },
  { b: "Is AI usage marked up?", s: "You can pay the AI provider directly, at cost." },
  { b: "How is each build measured?", s: "Ask for a score on your own past cases before launch, and every month after." },
  { b: "What does upkeep cover?", s: "Model updates, fixes, monitoring and backups, or a new quote each time?" },
  { b: "Is it priced per seat?", s: "Per-seat pricing makes every hire cost more." },
];

const FAQ = [
  { q: "How much does AI implementation cost for a small business?", a: "It depends on six things: team size and sites, how many systems connect, how many builds run at once, how much data moves, whether agents act or only answer, and the rules your industry follows. The AI itself is usually the smallest line. Training, connecting systems and upkeep make up most of it." },
  { q: "Why is the AI the cheapest part?", a: "Model prices are low and keep falling. An agent keys an invoice for about a cent, against about $1.89 of a person's time. The fixed work is building the agent, connecting it to your systems, monitoring it and keeping it current." },
  { q: "Is it cheaper to buy AI add-ons for the software we already have?", a: "Sometimes, for one department. Add-ons are priced per seat in each program, don't connect to each other, and rarely include training on your own work. Compare the total across departments over three years." },
  { q: "When does replacing software with a custom system pay off?", a: "When the subscription is large, rising, and your team works around it. One construction company replaced a $100,000-a-year platform with a system it owns, connected to its billing. For small tools, keeping and connecting them usually costs less." },
  { q: "What does Novum charge?", a: "Every engagement starts with a discovery, sized to your company. It ends with a written plan and prices for what comes next. You pay the AI provider directly, at cost, on an account in your company's name." },
];

export default function AiImplementationCostPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "What AI implementation costs", path: PATH }]), articleJsonLd({ headline: TITLE, description: DESC, path: PATH, published: "2026-10-17" }), faqJsonLd(FAQ)]} />

      <section className="phero" aria-labelledby="gc-h1">
        <div className="wrap gd-hgrid">
          <div>
          <div className="label">Guide</div>
          <h1 id="gc-h1">What AI implementation costs.</h1>
          <p className="lead">AI implementation cost comes down to six lines: the plan, training, builds, AI usage, upkeep and any software you replace. The AI itself is usually the smallest. An agent keys an invoice for about a cent. Most of the cost is the work around it: training, connecting systems and upkeep.</p>
          <p className="gd-meta">Novum AI · Updated October 17, 2026</p>
          </div>
          <figure className="gd-doc" aria-label="Example tool and cost report for a sample 40-person company">
            <div className="gd-doc-h"><span>Tool and cost report</span><span className="meta">Example · 40 people</span></div>
            <table>
              <thead><tr><th scope="col">Tool</th><th scope="col" className="r">A month</th><th scope="col">Call</th></tr></thead>
              <tbody>
                {TOOLS.map((r) => (
                  <tr key={r.t}>
                    <td>{r.t}<small>{r.d}</small></td>
                    <td className="r">{usd(r.c)}</td>
                    <td><i className={`gd-tag${r.k ? ` ${r.k}` : ""}`}>{r.tag}</i></td>
                  </tr>
                ))}
                <tr className="tot"><td>Total</td><td className="r">{usd(TOOLS.reduce((a, r) => a + r.c, 0))}</td><td /></tr>
              </tbody>
            </table>
            <figcaption><span className="dot" /><span>Found: <b>$1,800 a month</b> in AI seats, 9 of 40 used.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gc-lines-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The cost lines</div>
          <h2 className="h2" id="gc-lines-h">Six lines make up the cost. <span className="mute">Most quotes show three.</span></h2>
          <ul className="mlist">
            {LINES.map((l) => <li key={l.t}><b>{l.t}<small className="gd-k">{l.k}</small></b><span>{l.b}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gc-drv-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>What moves the price</div>
          <h2 className="h2" id="gc-drv-h">Six things move the price up or down.</h2>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead><tr><th scope="col">Driver</th><th scope="col">Why it costs more</th></tr></thead>
              <tbody>{DRIVERS.map((x) => <tr key={x.d}><td>{x.d}</td><td data-l="Why it costs more">{x.w}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gc-task-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Cost per task</div>
          <h2 className="h2" id="gc-task-h">The AI costs cents per task. <span className="mute">The setup is the real cost.</span></h2>
          <div className="cmp-wrap">
            <table className="cmp">
              <thead><tr><th scope="col">Task</th><th scope="col">A person</th><th scope="col" className="us">An agent</th></tr></thead>
              <tbody>{TASKS.map((x) => <tr key={x.t}><td>{x.t}</td><td data-l="A person">{x.p}</td><td data-l="An agent" className="us">{x.a}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="cmp-note">Task times are our estimates. Person: BLS median wages with benefits at 1.43 times the wage, the value of staff time, not cash. Agent: published model and voice prices. Sources on <Link href="/why-ai">Why AI</Link>.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gc-hid-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Hidden costs</div>
          <h2 className="h2" id="gc-hid-h">The cheap route has its own costs.</h2>
          <div className="gov">
            {HIDDEN.map((h) => <div key={h.h}><h4>{h.h}</h4><p>{h.p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gc-q-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Comparing quotes</div>
          <h2 className="h2" id="gc-q-h">Six questions to ask any AI implementation quote.</h2>
          <ul className="mlist">
            {QUOTE_CHECKS.map((q) => <li key={q.b}><b>{q.b}</b><span>{q.s}</span></li>)}
          </ul>
          <div className="gd-next">
            <Link className="link" href="/guides/how-to-implement-ai">How to implement AI: a 5-step plan <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/case-studies">Three engagements, measured <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/guides/choose-an-ai-partner">How to choose an AI partner: 5 questions <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/assessment">Score your company in 2 minutes <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gc-faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Questions</div>
          <h2 className="h2" id="gc-faq-h">What owners ask about cost.</h2>
          <div className="gd-faq">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="contact" aria-labelledby="gc-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="gc-cta-h">Get a number for your company.</h2>
            <p className="lead">A discovery measures the work, audits every tool you pay for, and ends with your first build live and a written plan with prices for what comes next.</p>
          </div>
          <ContactForm source="Guide: AI implementation cost" />
        </div>
      </section>
    </main>
  );
}
