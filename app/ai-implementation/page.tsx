import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import "./ai-implementation.css";

export const metadata: Metadata = pageMetadata({
  path: "/ai-implementation",
  title: "AI Implementation Services for Small Business · Novum AI",
  description: "AI implementation consultants for small business: your team trained in person, agents built on your data, software connected or replaced. You own all of it.",
});

const TOC = [
  { id: "training", n: "01", t: "Training", d: "Your team learns AI on its own work." },
  { id: "agents", n: "02", t: "Agents", d: "AI doing the repeat work inside your systems." },
  { id: "software", n: "03", t: "Custom software", d: "Tools connected, platforms replaced when it pays." },
  { id: "officer", n: "04", t: "AI Officer", d: "Someone owns AI for you, every month." },
];

const EVIDENCE = [
  { n: "About 3%", t: "Time saved when workers were handed a chatbot and nothing else", s: "University of Chicago, 25,000 workers" },
  { n: "40% less time", t: "Writing reports and emails, with quality up 18%", s: "MIT, Science, 2023" },
  { n: "34% more", t: "Issues resolved per hour by the newest support staff", s: "Quarterly Journal of Economics, 2025" },
];

const FORMATS = [
  { b: "Live sessions every month", s: "On your own tools and workflows, as each piece goes live and as the tools change." },
  { b: "Office hours", s: "Questions answered as they come up, between sessions." },
  { b: "A recorded library", s: "Every session recorded on your tools, updated monthly. Your team keeps it for good." },
  { b: "Written guides", s: "For every tool and agent we set up." },
  { b: "An AI usage policy", s: "What data goes where, signed off by your team and kept current." },
  { b: "An on-site training day", s: "Five hours, hands-on, on your team's own work, when you want one." },
];

const LESSONS = [
  { t: "Your intake assistant, start to finish", m: "8 min", tag: "New" },
  { t: "Drafting client updates from your notes", m: "6 min" },
  { t: "Month-end in QuickBooks, with AI", m: "11 min" },
  { t: "What stays private: your AI usage policy", m: "5 min" },
  { t: "Reviewing what an agent drafted", m: "7 min" },
];

const COMPANY_TYPES = [
  { name: "Law firm", tasks: ["Summarize a 40-page lease into the terms that matter", "Draft a client status letter from the matter notes", "Pull every deadline out of a scheduling order"], agent: "Intake agent", does: "New matter emails turned into a conflict check" },
  { name: "100-person distributor", tasks: ["Turn a customer PO email into an order entry draft", "Compare three supplier quotes line by line", "Write a backorder update from the inventory report"], agent: "Order entry agent", does: "Purchase orders drafted into order entry" },
  { name: "Accounting firm", tasks: ["Write the missing-documents email for every client at once", "Summarize a new client's prior-year return", "Build a month-end checklist from last year's notes"], agent: "Document chase agent", does: "Follows up until the file is complete" },
  { name: "Field service company", tasks: ["Write a job summary from a technician's notes", "Answer \"where's my tech?\" from the dispatch board", "Turn a service history into a maintenance proposal"], agent: "Dispatch update agent", does: "Customers told when the tech is running late" },
];

const AGENT_RULES = [
  { b: "Where they run", s: "Inside the tools you keep: accounting, CRM, email, documents, payments, Microsoft 365 and Copilot." },
  { b: "What they do", s: "Drafting, matching, checking and follow-up, on a schedule or when work arrives, following your rules." },
  { b: "Who signs off", s: "A person approves anything before it is sent, filed or paid. Live calls follow rules you set." },
  { b: "How they are judged", s: "Tested on your own cases and scored before launch. An upgrade replaces the old version only if it scores higher." },
  { b: "The assistant over all of it", s: "Plain-English questions answered across every connected system, citing the records it used, limited to what each role may see." },
  { b: "What you can see", s: "A list of every agent, what it does, and who owns it." },
];

const OFFICER_JOBS = [
  { h: "Maintains everything we build", p: "Upkeep, monitoring and backups for every agent, integration and system." },
  { h: "Tests new AI on your data", p: "New models and tools tried on your own work as they ship. You adopt the ones that pay off." },
  { h: "Audits your tools each quarter", p: "Every tool and what it costs, with a call on each: keep, connect, or cut." },
  { h: "Keeps training going", p: "Monthly sessions on your tools, office hours, and a new lesson in your library." },
  { h: "Works the build queue", p: "A prioritized roadmap of agents, integrations and tools, reviewed monthly with your sponsor. Builds run in priority order. How many run at once is set in discovery, by the size of your team." },
  { h: "Reports every month", p: "Hours saved, adoption, and what comes next." },
];

const STEPS = [
  { n: "01", title: "Map the work", line: "How the work actually moves.", body: "We sit with the people who do the work and map each step. Steps that shouldn't exist get cut before anything is automated.", tag: "Where everyone starts" },
  { n: "02", title: "Tool report and AI policy", line: "Every tool, every rule.", body: "Every tool you pay for and what it costs, with a call on each one, plus a written AI usage policy.", tag: "Keep, connect, replace, or cut" },
  { n: "03", title: "Build", line: "Agents and tools, wired together.", body: "Agents, an AI assistant, and integrations with the tools you keep. A person approves anything before it is sent, filed or paid. Live calls follow rules you set.", tag: "One live before the next starts" },
  { n: "04", title: "Train the team", line: "Your team learns on its own work.", body: "Your team practices on the tasks they do every week, so what gets built gets used. Written guides stay with them afterward.", tag: "Hands-on, on your data" },
  { n: "05", title: "Keep it current", line: "An AI Officer keeps it current.", body: "Your AI Officer maintains everything we build, tests new AI on your data, audits your tools each quarter, and keeps training going.", tag: "Ongoing" },
];

const DOORS = [
  { need: "My team needs to learn AI", title: "Start with a training day", body: "Your team gets up to speed in five hours, with a short list of tools and a clear sense of what AI can do for them.", href: "/training", cta: "Book a training day" },
  { need: "I know what I want built", title: "Start with a discovery", body: "We map the work, audit your tools, write your AI policy, and put your first build live.", href: "#contact", cta: "Book a conversation" },
  { need: "I want someone to own AI for us", title: "Start with an AI Officer", body: "Someone who owns AI for your company: building, training, and keeping it current. It starts with a discovery.", href: "/ai-officer", cta: "See the AI Officer role" },
];

const OWN = [
  { t: "The code", b: "Every agent, integration and system, in a repository your company owns. Any developer can work on it." },
  { t: "The data", b: "Every record, in a database on an account in your company's name, never used to train anyone's AI." },
  { t: "The accounts", b: "Hosting, services and the AI account itself, set up in your company's name. You pay the AI provider at cost, with no markup." },
  { t: "The know-how", b: "Guides and a recorded training library on your own tools, so your team understands what it runs." },
];

const FAQ = [
  { q: "What does AI implementation mean here?", a: "Getting AI into the daily work of your business. That takes two things: your people knowing how to use it, and someone building and maintaining the tools around your data. Training covers the first. Agents, custom software and an AI Officer cover the second." },
  { q: "Do we need all four?", a: "No. Some teams book a training day and stop there. Most that go further find the training shows them what to build, and the AI Officer builds it. We start where your teams lose the most hours and add the rest as each piece earns its place." },
  { q: "How does it start?", a: "With a discovery. We map how your work moves, audit every tool you pay for, write your AI usage policy, train your team on its own work, and put your first build live on your data. You keep everything we deliver." },
  { q: "Can we buy one project instead of an ongoing engagement?", a: "Yes. After discovery we scope a single build with you: an assistant, agents, integrations, or a platform replacement. You get the same training and you own the code, data and accounts. Most clients keep us on as their AI Officer for the upkeep and the builds that come after the first." },
  { q: "Who owns what you build?", a: "You do. The code, the data, and the accounts are in your company's name, and your team keeps the know-how." },
  { q: "Do we have to replace our software?", a: "No. We connect the tools that work and put AI on top. We only rebuild a platform when owning it costs less than the subscription." },
];

export default function AiImplementationPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "AI Implementation", path: "/ai-implementation" }]), serviceJsonLd({ name: "AI implementation", serviceType: "AI implementation", path: "/ai-implementation", description: metadata.description as string }), faqJsonLd(FAQ)]} />

      <section className="phero" aria-labelledby="ai-h1">
        <div className="wrap">
          <div className="label">AI implementation</div>
          <h1 id="ai-h1">Every company has AI. We help yours use it on the real work.</h1>
          <p className="lead">AI implementation means putting AI into the daily work: training the team on its own tools, building agents on the company&apos;s data, and connecting the systems it already runs. Novum does all of it for companies with no one whose job is AI. We also replace software that no longer fits, and an AI Officer keeps it current. You own all of it.</p>
          <div className="ctas">
            <Link className="btn" href="#contact">Start a conversation</Link>
            <Link className="btn ghost" href="#how">How an engagement runs</Link>
          </div>
          <nav className="ai-toc" aria-label="On this page">
            {TOC.map((x) => (
              <a href={`#${x.id}`} key={x.id}>
                <span className="meta">{x.n}</span>
                <b>{x.t}<i aria-hidden="true">↓</i></b>
                <span>{x.d}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 01 Training */}
      <section className="sec light ai-sec" id="training" aria-labelledby="tr-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>Training</div>
          <h2 className="h2" id="tr-h">Your team learns AI on its own work. <span className="mute">Before each piece goes live, and every month after.</span></h2>
          <p className="lead">A tool nobody knows how to use saves nothing. We train your people in person, on the tools and workflows they already use, so what gets built gets used. A build nobody uses gets cancelled.</p>
          <div className="finds">
            {EVIDENCE.map((e) => (
              <div key={e.n}><b>{e.n}</b><span>{e.t}</span><small>{e.s}</small></div>
            ))}
          </div>
          <p style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: "14px 32px" }}>
            <Link className="link" href="/why-ai">Read the research behind these numbers <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/guides/how-to-implement-ai">How to implement AI: a 5-step plan <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/guides/ai-implementation-cost">What AI implementation costs <span aria-hidden="true">→</span></Link>
          </p>
          <div className="ai-split">
            <ul className="mlist">
              {FORMATS.map((f) => <li key={f.b}><b>{f.b}</b><span>{f.s}</span></li>)}
            </ul>
            <div className="paper ai-lib" aria-label="Example of a recorded training library">
              <div className="paper-h"><b>Training library</b><span>Example · your company</span></div>
              <ul>
                {LESSONS.map((l) => (
                  <li key={l.t}><b>{l.t}{l.tag && <em>{l.tag}</em>}</b><small>{l.m}</small></li>
                ))}
              </ul>
              <p className="foot">Updated every month. Yours to keep, like the code.</p>
            </div>
          </div>
          <div className="ai-sub">
            <div className="intro">
              <span className="meta">Built from your own work</span>
              <h3>The same five hours, different for every company.</h3>
              <p>A training day runs on the work your team already does. Here is what people practice on, by company type.</p>
            </div>
            <table className="ptable">
              <thead><tr><th>Company</th><th>Your team practices on</th></tr></thead>
              <tbody>
                {COMPANY_TYPES.map((c) => (
                  <tr key={c.name}><td>{c.name}</td><td><ul>{c.tasks.map((t) => <li key={t}>{t}</li>)}</ul></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ai-links">
            <Link className="link" href="/training">How we train <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/training">Book a training day <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* 02 Agents */}
      <section className="sec ai-sec" id="agents" aria-labelledby="ag-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Agents</div>
          <h2 className="h2" id="ag-h">Agents do the repeat work inside your systems.</h2>
          <p className="lead">AI working on a schedule or when work arrives, following your rules, connected to the tools you already keep. Agents draft. A person signs off before anything is sent, filed or paid. Live calls follow rules you set.</p>
          <div className="ai-split">
            <ul className="mlist">
              {AGENT_RULES.map((r) => <li key={r.b}><b>{r.b}</b><span>{r.s}</span></li>)}
            </ul>
            <figure className="ai-fig" aria-label="Example: an agent connected to your tools, holding its work for approval">
              <div className="ai-fig-h"><span>Renewal agent</span><span className="meta">Example</span></div>
              <div className="ai-tools">
                <span>Accounting</span><span>CRM</span><span>Email</span>
                <span>Documents</span><span>Payments</span><span className="hub">Your data</span>
              </div>
              <ul className="ai-runlog">
                <li><span>Trigger</span>Renewals coming due in the CRM</li>
                <li><span>Work</span>Drafted 23 renewal quotes from your records and pricing rules</li>
                <li><span>Check</span>Held for review by the account owner</li>
              </ul>
              <figcaption><span className="dot" /><b>23 drafts ready</b><i>Awaiting your approval</i></figcaption>
            </figure>
          </div>
          <div className="ai-sub">
            <div className="intro">
              <span className="meta">Where to start</span>
              <h3>The first build worth making.</h3>
              <p>Discovery finds the high-volume, repeatable work where AI is proven. Typical first builds:</p>
            </div>
            <table className="ptable">
              <thead><tr><th>Company</th><th>First build</th><th>What it does</th></tr></thead>
              <tbody>
                {COMPANY_TYPES.map((c) => (
                  <tr key={c.name}><td>{c.name}</td><td>{c.agent}</td><td>{c.does}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ai-links">
            <Link className="link" href="/ai-officer#measured">How every agent is tested and scored <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/use-cases">Agents by industry <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* 03 Custom software */}
      <section className="sec rule ai-sec" id="software" aria-labelledby="sw-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Custom software</div>
          <h2 className="h2" id="sw-h">We build the software too. <span className="mute">When owning it costs less than typical SaaS.</span></h2>
          <p className="lead">When a platform costs more than it&apos;s worth, or your team spends the day working around it, we build the version that fits how you work, connected to the tools you keep. The code, data, and accounts are in your company&apos;s name.</p>
          <div className="finds">
            <div><b>Built</b><span>Around your workflow: clients, jobs, projects, schedules, budgets and reporting, shaped to how you run.</span></div>
            <div><b>Connected</b><span>To the tools you keep, with two-way sync. Enter data once and it shows up everywhere.</span></div>
            <div><b>Owned</b><span>By your company. Hosting, storage and security are the ongoing costs.</span></div>
          </div>
          <div className="own2">
            <div>
              <div className="ai-two">
                <div>
                  <span className="meta">Most of the time</span>
                  <h4>Connect what you have</h4>
                  <p>We keep the tools that work and wire them together: QuickBooks, Salesforce, HubSpot, Outlook, DocuSign, Stripe, Microsoft 365 and Copilot, and most things with an API. Then we put AI on top.</p>
                </div>
                <div>
                  <span className="meta">When it pays</span>
                  <h4>Replace a platform</h4>
                  <p>When owning costs less than the SaaS you pay for, we rebuild it around how you work, migrate your data from the old tool, and train the team before launch. The tool report in discovery shows the math first.</p>
                </div>
              </div>
              <div className="ai-size">
                <span className="meta">What sets the size of a build</span>
                <ul>
                  <li>A full platform, or one tool</li>
                  <li>How many systems it connects to</li>
                  <li>Years of data to migrate</li>
                  <li>An assistant only, or agents that act with approval steps</li>
                </ul>
              </div>
            </div>
            <div className="casecard ai-case">
              <span className="meta">One replacement</span>
              <div className="from">$100,000 a year</div>
              <div className="to">Now: hosting, storage and security.</div>
              <p>A construction company paid $100,000 a year for a project management platform its team worked around. We rebuilt it around how they run projects and connected it to their custom billing application. Agents now draft PCOs, RFIs, submittal reviews and billing, and a project manager reviews each one. They now pay only hosting, storage and security.</p>
              <ul>
                <li>Built around how they run projects</li>
                <li>Code, data and accounts in their name</li>
                <li>They now pay only hosting, storage and security</li>
              </ul>
              <Link className="link" href="/case-studies">Read the case study <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 04 AI Officer */}
      <section className="sec ai-sec" id="officer" aria-labelledby="of-h" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="panel">
            <div className="label"><span className="ix">04</span>AI Officer</div>
            <h2 className="h2" id="of-h">Someone owns AI for you, every month.</h2>
            <p className="lead">A fractional Chief AI Officer builds the agents and assistants, connects every tool you use, replaces costly software with software you own, and keeps the team trained as the tools change. One accountable lead, for as long as you keep us on.</p>
            <div className="gov">
              {OFFICER_JOBS.map((j) => <div className="flip" key={j.h}><h4>{j.h}</h4><p>{j.p}</p></div>)}
            </div>
            <Link className="link" href="/ai-officer">See the AI Officer role <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* 05 How it runs */}
      <section className="sec light ai-sec" id="how" aria-labelledby="how-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>How it runs</div>
          <h2 className="h2" id="how-h">Five steps. <span className="mute">Nothing built before it&apos;s scoped.</span></h2>
          <ol className="ai-steps">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="pn">{s.n}</span>
                <h3>{s.title}</h3>
                <span className="line">{s.line}</span>
                <p>{s.body}</p>
                <span className="meta">{s.tag}</span>
              </li>
            ))}
          </ol>
          <div className="first">
            <div><span className="meta">The first engagement</span><h3>Discovery</h3></div>
            <div className="ai-first-p">
              <p>Everyone starts here, and it ends with your first build live on your own data. You keep everything we deliver, whatever you decide next.</p>
              <ul className="ai-deliv">
                <li>Workflow map</li>
                <li>Tool and cost report</li>
                <li>AI usage policy</li>
                <li>A training session on your own work</li>
                <li>Your first build live</li>
                <li>A written plan for what comes next</li>
              </ul>
            </div>
          </div>
          <div className="ai-sub">
            <div className="intro">
              <span className="meta">After discovery</span>
              <h3>Two ways to continue.</h3>
            </div>
            <div className="ai-two">
              <div>
                <span className="meta">Most clients</span>
                <h4>Keep us on as your AI Officer</h4>
                <p>Agents, integrations and tools built one after another, every system connected, and your team trained every month. Sized to your company in discovery.</p>
              </div>
              <div>
                <span className="meta">One project</span>
                <h4>A single build</h4>
                <p>Scoped with you after discovery: an assistant, agents, integrations, or a platform replacement. The same training, and you own the code, data and accounts.</p>
              </div>
            </div>
          </div>
          <div className="ai-sub">
            <div className="intro">
              <span className="meta">Where to start</span>
              <h3>Pick the door that fits.</h3>
              <p>Not sure? Start with a discovery. It points to the right next step, and every route can lead to the others.</p>
            </div>
            <div className="ai-doors" style={{ marginTop: 0 }}>
              {DOORS.map((d) => (
                <Link href={d.href} key={d.title}>
                  <span className="need">{d.need}</span>
                  <div><h4>{d.title}</h4><p>{d.body}</p></div>
                  <span className="go">{d.cta}<i aria-hidden="true">→</i></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 Ownership */}
      <section className="sec rule" aria-labelledby="own-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Ownership</div>
          <h2 className="h2" id="own-h">You own all of it.</h2>
          <p className="lead">If you stop working with us, nothing breaks. You keep running it, hire another developer, or come back.</p>
          <div className="caps4 sw4">
            {OWN.map((o) => (
              <div className="cap flip" key={o.t}><h3>{o.t}</h3><p>{o.b}</p></div>
            ))}
          </div>
          <p className="fine">Hosted on SOC 2 Type 2 infrastructure. Your data is never used to train anyone&apos;s model and never shared across clients.</p>
        </div>
      </section>

      {/* 07 Questions */}
      <section className="sec light" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">07</span>Questions</div>
          <h2 className="h2" id="faq-h">What people ask first.</h2>
          <div className="ai-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light contact ai-sec" id="contact" aria-labelledby="contact-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="contact-h">Put AI on the real work.</h2>
            <p className="lead">Your workflow mapped, your team trained on its own work, and your first build live on your data. We reply the same business day.</p>
            <div className="alt"><Link className="btn ghost" href="/contact">More ways to reach us</Link></div>
          </div>
          <ContactForm source="AI implementation page" />
        </div>
      </section>
    </main>
  );
}
