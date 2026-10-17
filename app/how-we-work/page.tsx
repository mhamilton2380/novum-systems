import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { HwDocs } from "@/components/nv/hw/HwDocs";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import "./how-we-work.css";

export const metadata: Metadata = pageMetadata({
  path: "/how-we-work",
  title: "How AI Implementation Works: Discovery to Live · Novum AI",
  description: "Map the work, report on every tool, write your AI policy, build, train the team, and keep it current as AI changes. All of it in your company's name.",
});

type Step = {
  n: string;
  title: string;
  tag: string;
  body: string;
  branches?: { b: string; s: string }[];
  who: string;
  ask: string;
  gets: string[];
  link?: { href: string; label: string };
};

const DISCOVERY: Step[] = [
  {
    n: "01",
    title: "Map the work",
    tag: "With your team",
    body: "We sit with the people who do the work and map how it actually moves, step by step: where requests come in, who touches them, where data gets typed twice, and where work waits. Steps that shouldn't exist get cut before anything is automated.",
    who: "A sponsor (usually the COO, CFO or owner) who sets the priorities, the people who do the work in each team in scope, and whoever runs your systems.",
    ask: "Access to the tools you use, and time with the people who do the work: interviews, plus sitting alongside them through a normal day.",
    gets: ["A map of how the work moves today", "Where time leaks, and where AI fits", "The steps to cut before anything is automated"],
  },
  {
    n: "02",
    title: "Tool and cost report and AI usage policy",
    tag: "Every tool, every rule",
    body: "Every tool you pay for, what it costs, and who actually uses it, with a call on each one. Then the rules: which AI tools your team may use, and what data never goes into them.",
    who: "Whoever holds the subscriptions (often finance), your systems lead, and the department heads who sign off on the policy.",
    ask: "Your subscription list and invoices, admin access to see who uses what, and a decision-maker to sign off on the policy.",
    gets: [
      "Every subscription, how many people use it, and what it costs a year",
      "Overlaps and unused licenses flagged",
      "What to keep, connect, replace, or cut",
      "A written AI usage policy your team signs off on",
    ],
  },
  {
    n: "03",
    title: "Build",
    tag: "One live before the next starts",
    body: "We build what the map calls for, highest impact first. Each piece is live and in use before the next starts. Before any agent launches, the person who owns that work defines what a correct answer is, and the agent is scored on your real cases.",
    branches: [
      { b: "Custom software", s: "Where a platform no longer fits. Your data migrated, so your history comes with you." },
      { b: "Connect your tools", s: "The tools you keep, wired together so data entered once shows up everywhere." },
      { b: "Deploy automation", s: "Agents and automations on the repeat work, with a person approving before anything is sent, filed or paid." },
    ],
    who: "A named owner for each build, such as your controller or operations manager, plus the people who will use it.",
    ask: "A written definition of correct from each owner, a set of real past cases to test against, and sign-off before anything goes live.",
    gets: [
      "Custom software, owned by your company",
      "The tools you keep, connected",
      "Agents and automations, with a person approving",
      "Your data migrated where a platform gets replaced",
      "The first build live on your own data",
    ],
  },
];

const OFFICER: Step[] = [
  {
    n: "04",
    title: "Train the team",
    tag: "Before each piece goes live",
    body: "The people who will use each piece train on it first, on their own work and your data, and again every month after. AI the team doesn't use saves nothing.",
    who: "Everyone who will use each piece, plus one person per team who becomes the go-to for questions.",
    ask: "Time on the calendar for sessions. About 1 to 2 hours a month per person, built around the work they already do.",
    gets: ["Hands-on sessions for each team", "Written guides for every tool and agent", "A recorded training library your company keeps", "Follow-up coaching after launch"],
    link: { href: "/training", label: "Want only this? Request a training day" },
  },
  {
    n: "05",
    title: "Keep it current",
    tag: "Your AI Officer",
    body: "AI changes every few weeks. Every month we audit how each agent and tool is performing and fix what slipped. When a better or cheaper model ships, or a new tool earns its place, we test it on your data and switch only if it wins. New builds go back through step 03.",
    who: "Your sponsor, who reviews the monthly report, and the owner of each agent.",
    ask: "A monthly review with your sponsor, and a heads-up when something in your business changes: a new product line, a new system, a new rule.",
    gets: [
      "A monthly performance report: accuracy, hours saved, cost",
      "New models and tools tested on your data, and your AI policy updated to match",
      "Monitoring, backups, and security updates",
      "New agents, changes, and fixes through your queue",
    ],
  },
];

const RULES = [
  { title: "Process before technology", body: "We fix how the work moves before we automate any of it." },
  { title: "A person approves", body: "Agents draft. Someone on your team reviews and signs off before anything is sent, filed or paid. Live calls follow rules you set." },
  { title: "You own all of it", body: "The code, the data, the accounts, and the AI account, in your company's name." },
  { title: "Your data stays yours", body: "AI works on your data, sees only what each role allows, and never trains on your records." },
];

const HANDOFF = [
  { title: "The code", body: "The full source, in a repository your company owns. Any developer can work on it.", where: "github.com/your-company/operations" },
  { title: "The data", body: "Every record, in a database on an account in your company's name.", where: "Database on your company's account" },
  { title: "The accounts", body: "Hosting, services, and the AI account itself, set up in your company's name. You pay the AI provider directly, with no markup.", where: "Hosting, services, and AI account, billed to you" },
  { title: "The know-how", body: "Documentation, a recorded training library, and trained people, so your team knows how everything works.", where: "Docs and the training library, yours to keep" },
];

const FAQ = [
  { q: "Can we just book training?", a: "Yes. A training day is five hours, tailored to your company type, and you can request one without a discovery. Many teams start there and add an AI Officer once they see what to build." },
  { q: "Do we have to replace our software?", a: "No. Most clients keep the tools that work. We connect them and put AI on top. We only rebuild a platform when owning it costs less than the subscription." },
  { q: "How long until we see something working?", a: "Discovery ends with your first build live on your own data. After that, work ships in phases, so your team is using each piece before the next starts." },
  { q: "Who from our side needs to be involved?", a: "A sponsor who sets priorities, the people who do the work in each team in scope, a named owner for each build, and whoever runs your systems. A senior lead from our side runs the engagement from the first conversation on." },
  { q: "If you replace a platform, what happens to our data?", a: "We move it. Migration is part of the work, so your history comes with you." },
  { q: "What if we stop working with you?", a: "The hosting accounts are in your company's name, so the system keeps running and you keep paying the host directly. What stops is our support. Hire another developer, or bring us back." },
];

function StepRow({ s }: { s: Step }) {
  return (
    <article className="hw-step" aria-labelledby={`hw-s${s.n}`}>
      <div className="hw-step-h">
        <span className="hw-n">{s.n}</span>
        <h3 id={`hw-s${s.n}`}>{s.title}</h3>
        <span className="meta">{s.tag}</span>
      </div>
      <div className="hw-step-b">
        <p>{s.body}</p>
        {s.branches && (
          <ul className="hw-branch">
            {s.branches.map((b) => <li key={b.b}><b>{b.b}</b><span>{b.s}</span></li>)}
          </ul>
        )}
        {s.link && <Link className="link hw-steplink" href={s.link.href}>{s.link.label} <span aria-hidden="true">→</span></Link>}
      </div>
      <dl className="hw-dl">
        <div><dt>Who from your side</dt><dd>{s.who}</dd></div>
        <div><dt>What we ask of you</dt><dd>{s.ask}</dd></div>
        <div><dt>You receive</dt><dd><ul>{s.gets.map((g) => <li key={g}>{g}</li>)}</ul></dd></div>
      </dl>
    </article>
  );
}

export default function HowWeWorkPage() {
  return (
    <main id="how-we-work">
      <JsonLd data={[breadcrumbJsonLd([{ name: "How We Work", path: "/how-we-work" }]), faqJsonLd(FAQ)]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">How we work</div>
          <h1>We learn how your teams work first.</h1>
          <p className="lead">Before we build anything, we map how your teams work and where AI saves the most time. Five steps, one fixed order, and every deliverable in your company&apos;s name.</p>
          <div className="ctas">
            <a className="btn" href="#contact">Start a conversation <span aria-hidden="true">→</span></a>
            <a className="btn ghost" href="#documents">See the documents</a>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="hw-proc-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The process</div>
          <h2 className="h2" id="hw-proc-h">Five steps, from first conversation to running.</h2>
          <p className="lead">Discovery covers steps 01 to 03 and a first training session, and ends with your first build live. Training continues in step 04 and the monthly upkeep in step 05, both part of the ongoing AI Officer. Every new build loops back through step 03.</p>
          <div className="proc">
            <div className="brackets" aria-hidden="true">
              <span className="br disc">Discovery<em>ends with the first build live and a first training session</em></span>
              <span className="br off">AI Officer<em>ongoing, for as long as you keep us on</em></span>
            </div>
            <div className="pgrid">
              <div className="pst" style={{ ["--i" as string]: 0 }}><span className="pn">01</span><h3>Map the work</h3><p>Interviews with the people who do it, step by step. We cut what shouldn&apos;t exist before anything is automated.</p><div className="pout"><span>Workflow map</span></div></div>
              <div className="pst" style={{ ["--i" as string]: 1 }}><span className="pn">02</span><h3>Tool report and AI policy</h3><p>Every tool you pay for, what it costs and a call on each. Then the rules for what data goes where.</p><div className="pout"><span>Tool and cost report</span><span>AI usage policy</span></div></div>
              <div className="pst build" style={{ ["--i" as string]: 2 }}><span className="pn">03</span><h3>Build</h3><div className="pbranch"><div><b>Custom software</b><small>Where a platform no longer fits</small></div><div><b>Connect your tools</b><small>Data entered once, everywhere</small></div><div><b>Deploy automation</b><small>Agents on the repeat work</small></div></div><div className="pout"><span>First build live</span></div></div>
              <div className="pst" style={{ ["--i" as string]: 3 }}><span className="pn">04</span><h3>Train the team</h3><p>A first session in discovery, then on their own work before each piece goes live, and every month after.</p><div className="pout"><span>Training library you keep</span></div></div>
              <div className="pst loop" style={{ ["--i" as string]: 4 }}><span className="pn">05</span><h3>Keep it current</h3><p>Monthly performance audits on every agent and tool. New models and tools tested on your data as they ship.</p><div className="pout"><span>Monthly report</span></div></div>
            </div>
            <svg className="ploop" viewBox="0 0 1000 70" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="hwlpg" x1="1" x2="0"><stop offset="0" stopColor="#00b36e" /><stop offset="1" stopColor="#3b6fe0" /></linearGradient></defs>
              <path d="M900 4 V34 Q900 54 880 54 H520 Q500 54 500 34 V8" fill="none" stroke="url(#hwlpg)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M493 16 L500 6 L507 16" fill="none" stroke="#00b36e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="plooptxt">New builds and upgrades go back through step 03, tested on your data before they replace anything.</p>
          </div>
          <p style={{ marginTop: 32 }}><Link className="link" href="/guides/how-to-implement-ai">Running it in-house? Read the 5-step plan <span aria-hidden="true">→</span></Link></p>
          <div className="first">
            <div><span className="meta">The first engagement</span><h3>Discovery</h3></div>
            <div>
              <p>We map how the work moves, report on every tool you pay for, write your AI usage policy, train your team on its own work, and put the first build live on your data. You keep everything we deliver, whatever you decide next. Most clients then keep us on as their AI Officer.</p>
              <ul className="hw-disc">
                <li><b>Work mapped</b><span>How it moves today, with your team</span></li>
                <li><b>Tool and cost report</b><span>Every subscription: keep, connect, or cut</span></li>
                <li><b>Team trained</b><span>On its own work, recorded for the library</span></li>
                <li><b>First build live</b><span>On your own data, in use</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="hw-detail-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Step by step</div>
          <h2 className="h2" id="hw-detail-h">What happens at each step, <span className="mute">and what it takes from your side.</span></h2>
          <p className="lead">A senior lead runs every engagement, from the first conversation on. Here is who we need from your company, what we ask of them, and what you receive.</p>
          <div className="hw-phase">
            <span className="meta">Discovery · steps 01 to 03 and the first training session</span>
            <span>Ends with the first build live on your own data</span>
          </div>
          {DISCOVERY.map((s) => <StepRow key={s.n} s={s} />)}
          <div className="hw-phase off">
            <span className="meta">AI Officer · steps 04 and 05</span>
            <span>Ongoing, for as long as you keep us on</span>
          </div>
          {OFFICER.map((s) => <StepRow key={s.n} s={s} />)}
        </div>
      </section>

      <section className="sec light" id="documents" aria-labelledby="hw-docs-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>The documents</div>
          <h2 className="h2" id="hw-docs-h">Six documents. <span className="mute">Every one written on your work.</span></h2>
          <p className="lead">The workflow map, the tool and cost report and the AI usage policy come out of discovery. The launch note, the training library and the monthly report follow as the work goes live.</p>
          <HwDocs />
        </div>
      </section>

      <section className="sec rule" aria-labelledby="hw-rules-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>How we operate</div>
          <h2 className="h2" id="hw-rules-h">Four rules we work by.</h2>
          <div className="caps4">
            {RULES.map((r, i) => (
              <div className="cap flip" key={r.title}>
                <span className="meta">Rule 0{i + 1}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="hw-hand-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>At handoff</div>
          <h2 className="h2" id="hw-hand-h">Everything is yours.</h2>
          <div className="own2 hw-own">
            <div>
              <p className="lead">Whether you keep us on or stop after one project, every account is in your company&apos;s name from day one. Handoff just makes it official: the code, the data, the accounts, and the know-how, signed over.</p>
              <p className="lead">If you stop working with us, nothing breaks. The system keeps running on accounts you already own. What stops is our support. Hire another developer, or bring us back.</p>
            </div>
            <div className="paper hw-transfer">
              <div className="paper-h"><b>Transfer of ownership</b><span>At handoff</span></div>
              <div className="hw-trows">
                {HANDOFF.map((h) => (
                  <div key={h.title}>
                    <b>{h.title}</b>
                    <p>{h.body}</p>
                    <code>{h.where}</code>
                  </div>
                ))}
              </div>
              <div className="ptotal"><span>Owner on every account</span><span>Your company</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="hw-faq-h">
        <div className="wrap hw-faqwrap">
          <div>
            <div className="label"><span className="ix">06</span>Questions</div>
            <h2 className="h2" id="hw-faq-h">What people ask first.</h2>
          </div>
          <div className="hw-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light contact" id="contact" aria-labelledby="hw-contact-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="hw-contact-h">Step one is a conversation.</h2>
            <p className="lead">Tell us how your team works today, and we&apos;ll tell you where AI fits. We reply the same business day.</p>
            <div className="alt"><Link className="btn ghost" href="/contact">More ways to reach us</Link></div>
          </div>
          <ContactForm source="How we work" />
        </div>
      </section>
    </main>
  );
}
