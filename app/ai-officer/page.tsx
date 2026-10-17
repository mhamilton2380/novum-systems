import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { INCLUDED } from "@/lib/aiOfficerPlans";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import "./ai-officer.css";

export const metadata: Metadata = pageMetadata({
  path: "/ai-officer",
  title: "Fractional Chief AI Officer for Small Business · Novum AI",
  description: "A fractional Chief AI Officer for companies with no one whose job is AI: every tool connected, agents tested on your work, your team trained every month.",
});

const WEEK = [
  { t: "Agent live", d: "Renewal quote drafts, held for approval", s: "Live" },
  { t: "Training", d: "Sales team learns the new assistant on live deals", s: "Done" },
  { t: "New AI tested", d: "Meeting-notes tool, trialed on your data", s: "Kept" },
  { t: "Tool audit", d: "Two unused subscriptions flagged to cut", s: "Saved" },
];

const FIT = [
  { tag: "No technical team", title: "Nobody owns software", body: "Tools get bought one at a time by whoever needed one that week, and nobody is accountable for how they fit together." },
  { tag: "Team on its own", title: "AI that nobody uses", body: "The logins exist. Nobody showed the team how to use them on their actual work, so they went back to the old way." },
  { tag: "Built, then stuck", title: "Systems nobody keeps current", body: "Something got built once, and now no one maintains it or adds to it as the business grows." },
];

const GUARDS = ["Company AI accounts, in your name", "A written AI usage policy", "Training on what stays private", "Access limited by role", "An audit log of every view and edit", "A person approves before anything is sent, filed or paid"];

const JOBS = [
  { title: "Ongoing training", body: "Sessions and coaching for your team on their own work, as the tools change, so people keep using what you paid for." },
  { title: "New AI, tested for you", body: "AI tools change monthly. We test the ones that matter on your data and adopt the ones that pay off." },
  { title: "A prioritized roadmap, worked in order", body: "Agents, integrations, and tools are ranked by value and reviewed monthly with your sponsor. Builds run in priority order. How many run at once is set in discovery, by the size of your team." },
  { title: "Every tool connected", body: "Your accounting, CRM, project, and document tools wired together, Microsoft 365 and Copilot included, so data entered once shows up everywhere and the AI can see all of it." },
  { title: "Costly software, replaced", body: "When a SaaS tool costs more than it's worth, we build the version that fits through your build queue and hand you the code." },
  { title: "Reporting, audits, and security", body: "A monthly report on hours saved and adoption, a list of every agent and who owns it, a quarterly audit of every tool and what it costs, plus monitoring, backups, and security updates." },
];

const QUEUE = {
  live: [
    { t: "Intake assistant", k: "Assistant" },
    { t: "CRM to accounting sync", k: "Integration" },
  ],
  work: [{ t: "Quote drafting agent", k: "Agent" }],
  next: [
    { t: "Scheduling tool, replaced", k: "Replacement" },
    { t: "Weekly report agent", k: "Agent" },
    { t: "Documents searchable by role", k: "Assistant" },
    { t: "Invoice follow-up agent", k: "Agent" },
  ],
};

const MEASURE = [
  { b: "A written definition of correct", s: "Signed off by the person who owns the work, such as your controller or underwriter." },
  { b: "A test set from your real cases", s: "Including the rare and messy ones, refreshed as your work changes." },
  { b: "A score before launch", s: "The agent goes live only once it meets the bar your expert set." },
  { b: "Upgrades have to win", s: "A new model or prompt replaces the old one only if it scores higher on the same cases." },
  { b: "Every miss becomes a test case", s: "So the same mistake gets caught before it ships again." },
];

const UPGRADES = [
  { change: "New model release", note: "Tested the month it shipped", cur: "96.8%", cand: "98.1%", ok: true, dec: "Switched", why: "After review by the controller" },
  { change: "Cheaper model, same task", note: "Quarterly cost review", cur: "98.1%", cand: "97.4%", ok: false, dec: "Not switched", why: "Lower score on the same cases" },
  { change: "Prompt tuned from last month's misses", note: "Four misses added as tests", cur: "98.1%", cand: "98.9%", ok: true, dec: "Switched", why: "Wins on every check" },
];

const PACE = [
  { n: "~6 wks", d: "Average gap between Anthropic's model releases, May 2025 to April 2026", src: "Anthropic release history" },
  { n: "10x", d: "Yearly drop in what AI costs at the same capability", src: "a16z, LLMflation" },
  { n: "12% → 66%", d: "AI agents finishing real computer tasks, in one year", src: "Stanford AI Index 2026" },
];

const CADENCE = [
  { when: "Every month", lead: "Watch and maintain", items: ["What shipped in AI, and whether it touches your work", "Accuracy, cost and error check on every live agent", "A new lesson in your training library"] },
  { when: "Every quarter", lead: "Tune and swap", items: ["Agents moved to cheaper or better models, only if they beat the current score on your own work", "Prompts and agents tuned from what they got wrong", "Tool audit: what to keep, connect, or cut"] },
  { when: "Twice a year", lead: "Reset the plan", items: ["Roadmap and workflows redesigned around what AI can now do", "AI usage policy and guardrails refreshed", "Team training refreshed for the new tools"] },
];

const RHYTHM = [
  { b: "Every month", s: "Live sessions on your tools, as each piece goes live." },
  { b: "Every week", s: "Office hours for questions as they come up." },
  { b: "For good", s: "A recorded library your team keeps, with written guides for every tool and agent." },
];

const LESSONS = [
  { t: "Your intake assistant, start to finish", m: "8 min", tag: "New" },
  { t: "Drafting client updates from your notes", m: "6 min" },
  { t: "Month-end in QuickBooks, with AI", m: "11 min" },
  { t: "What stays private: your AI usage policy", m: "5 min" },
  { t: "Reviewing what an agent drafted", m: "7 min" },
];

const LATE = [
  { job: "Marcus L.", why: "Compressor swap ran 90 min long", over: "2 jobs late" },
  { job: "Priya S.", why: "Waiting on a part from the warehouse", over: "1 job late" },
  { job: "Tom R.", why: "Traffic on I-5, 40 min delay", over: "1 job late" },
  { job: "Alex K.", why: "Customer added a second unit", over: "1 job late" },
];
const WINDOWS = ["J. Ortiz · 2:00 to 4:00 PM", "R. Coleman · 3:00 to 5:00 PM", "B. Walsh · 3:30 to 5:30 PM", "M. Greene · 4:00 to 6:00 PM"];

const OWN = [
  { t: "The code", b: "Every agent, integration, and replacement, in a repository your company owns." },
  { t: "The data", b: "Every record, on accounts in your company's name, never used to train anyone's AI." },
  { t: "The accounts", b: "Hosting, services, and the AI account itself, set up in your company's name. You pay the AI provider at cost, with no markup." },
  { t: "The training library", b: "Every session recorded on your tools, with guides. Your team keeps it for good." },
];

const HONEST = [
  { n: "1 to 2 hours", t: "Training time a month for each person, in sessions built around the work they already do.", s: "Per person, per month" },
  { n: "A short dip", t: "For the first few weeks after something new goes live, work slows a little while people check its output against the old way. That's normal, and it's short.", s: "After each launch" },
  { n: "A straight answer", t: "If AI isn't the right tool for a task, we'll tell you, and the discovery report says so in writing.", s: "When AI isn't it" },
];

const FAQ = [
  { q: "What is a fractional Chief AI Officer?", a: "Most companies can't justify a full-time technical executive for AI. We fill the role part-time. We train your team, test new AI on your data, keep your systems running, and cut tools that don't earn their price." },
  { q: "How does it start?", a: "With a discovery. We map how your work moves, audit every tool you pay for, write your AI usage policy, train your team on its own work, and put your first build live on your data." },
  { q: "How is the engagement sized?", a: "In discovery, to your company: how many people, how many tools, and how much is in the build queue. Builds run in priority order. How many run at once is set in discovery, by the size of your team. It is one engagement covering everything on this page, not a menu of tiers." },
  { q: "Can we just buy one project?", a: "Yes. If you'd rather not keep us on, we scope a single build with you after discovery: an assistant, agents, integrations, or a platform replacement. You get the same training and you own the code, data, and accounts. Most clients keep us on for the upkeep and the builds that come after the first." },
  { q: "How does the queue work?", a: "Agents, integrations and tools all go in one queue. Each build is live and your team is trained on it before it counts as done. Builds run in priority order. How many run at once is set in discovery, by the size of your team. Bigger projects, like replacing a platform, are split into steps that go live one by one." },
  { q: "How do we know an agent is working?", a: "Before launch, the person who owns the work defines what correct looks like and grades a set of your real cases. The agent is scored against them, and the score is checked every month. A new model or prompt replaces the current one only if it scores higher on the same cases." },
  { q: "Do we keep what you build if we leave?", a: "Yes. Replacements, agents, and integrations are built on accounts in your company's name. The code, data, and accounts stay yours." },
  { q: "Why keep an AI Officer after the first builds?", a: "Because AI keeps moving. New models ship every few weeks and prices drop fast. Every month we check what changed and keep your agents healthy. Every quarter we move them to better or cheaper models after testing on your work, and audit your tools. Twice a year we redesign the roadmap, refresh your AI policy, and retrain the team on what's new." },
];

export default function AiOfficerPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "AI Officer", path: "/ai-officer" }]), serviceJsonLd({ name: "Fractional Chief AI Officer", serviceType: "Fractional Chief AI Officer", path: "/ai-officer", description: metadata.description as string }), faqJsonLd(FAQ)]} />

      <section className="phero" aria-labelledby="ao-h1">
        <div className="wrap ao-hgrid">
          <div>
            <div className="label">Fractional Chief AI Officer</div>
            <h1 id="ao-h1">A Chief AI Officer, without the hire.</h1>
            <p className="lead">Most companies have no one whose job is AI. We take the role: agents and tools built in priority order, every system connected, each agent tested on your own work, and your team trained every month. You own all of it.</p>
            <div className="ctas">
              <Link className="btn" href="#contact">Start with a discovery</Link>
              <Link className="btn ghost" href="#included">What&apos;s included</Link>
            </div>
          </div>
          <figure className="ao-doc ao-week" aria-label="Example week with an AI Officer">
            <div className="ao-doc-h"><span>Your AI Officer</span><span className="meta">Example week</span></div>
            <ul>
              {WEEK.map((w) => (
                <li key={w.t}><span><b>{w.t}</b><small>{w.d}</small></span><i>{w.s}</i></li>
              ))}
            </ul>
            <figcaption><span className="dot" /><span>Building next: <b>CRM to accounting sync</b></span><em>In progress</em></figcaption>
          </figure>
        </div>
      </section>

      {/* 01 The problem */}
      <section className="sec ao-fit" aria-labelledby="pr-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The problem</div>
          <h2 className="h2" id="pr-h">Nobody&apos;s job is AI.</h2>
          <p className="lead">A full-time Chief AI Officer costs more than most companies can justify. So AI gets bought, half used, and never connected. An AI Officer makes it someone&apos;s job, part time.</p>
          <div className="finds" style={{ marginTop: "clamp(48px, 5vw, 72px)" }}>
            {FIT.map((f) => (
              <div className="flip" key={f.tag}><b>{f.title}</b><span>{f.body}</span><small>{f.tag}</small></div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Shadow AI */}
      <section className="sec light" aria-labelledby="sh-h">
        <div className="wrap ao-shadow">
          <div>
            <div className="label"><span className="ix">02</span>Shadow AI</div>
            <h2 className="h2" id="sh-h">Your team is probably already using AI on personal accounts.</h2>
            <p className="lead">The first fix is giving them a safe way to do it. We put these in place first, before any agent goes live.</p>
          </div>
          <div className="paper" aria-label="Before and after: AI use without and with guardrails">
            <div className="paper-h"><b>AI use at your company</b><span>Before and after</span></div>
            <div className="pol">
              <div className="no"><h4>Today</h4><ul><li>Personal chatbot account</li><li>Client file pasted in</li><li>No policy</li><li>No log</li></ul></div>
              <div className="ok"><h4>In place first</h4><ul>{GUARDS.map((g) => <li key={g}>{g}</li>)}</ul></div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 The role */}
      <section className="sec ao-sec" id="role" aria-labelledby="ro-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>The role</div>
          <h2 className="h2" id="ro-h">What an AI Officer does. <span className="mute">Six jobs, all of them yours to hand off.</span></h2>
          <p className="lead">Sized to your company in discovery, run by one accountable lead.</p>
          <div className="gov">
            {JOBS.map((j) => <div className="flip" key={j.title}><h4>{j.title}</h4><p>{j.body}</p></div>)}
          </div>
        </div>
      </section>

      {/* 04 The build queue */}
      <section className="sec light ao-sec" id="queue" aria-labelledby="q-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>The build queue</div>
          <h2 className="h2" id="q-h">Every request goes in one queue.</h2>
          <p className="lead">Agents, integrations and tools all run through one queue. Builds run in priority order. How many run at once is set in discovery, by the size of your team.</p>
          <div className="ao-queue">
            <div className="paper" aria-label="Example build queue">
              <div className="paper-h"><b>Your build queue</b><span>Example month</span></div>
              <div className="ao-qcols">
                <div className="live"><h4>Live<em>In use</em></h4><ul>{QUEUE.live.map((x) => <li key={x.t}><small>{x.k}</small>{x.t}</li>)}</ul></div>
                <div className="work"><h4>In progress<em>Priority order</em></h4><ul>{QUEUE.work.map((x) => <li key={x.t}><small>{x.k}</small>{x.t}</li>)}</ul></div>
                <div><h4>Queue<em>Prioritized</em></h4><ul>{QUEUE.next.map((x) => <li key={x.t}><small>{x.k}</small>{x.t}</li>)}</ul></div>
              </div>
              <p className="ao-qnote">Each build is live and your team is trained on it before the next one starts. Bigger projects, like replacing a platform, go live in steps. The roadmap is reviewed monthly with your sponsor.</p>
            </div>
          </div>
          <div className="ao-proof">
            <span><b>Software replacements go through the same queue.</b> A construction company replaced a $100,000-a-year project management platform with a system it owns, and now pays only hosting, storage and security.</span>
            <Link className="link" href="/case-studies">Read the case study <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* 05 Measured */}
      <section className="sec ao-sec" id="measured" aria-labelledby="me-h">
        <div className="wrap measured">
          <div>
            <div className="label"><span className="ix">05</span>Measured</div>
            <h2 className="h2" id="me-h">Every agent is scored on your own cases.</h2>
            <p className="lead">Before launch, your experts define what a correct answer is and grade a set of real cases. The agent is scored against them. After that, nothing changes unless it scores better.</p>
            <ul className="mlist">
              {MEASURE.map((m) => <li key={m.b}><b>{m.b}</b><span>{m.s}</span></li>)}
            </ul>
          </div>
          <figure className="ao-doc ao-log" aria-label="Example upgrade log for one agent">
            <div className="ao-doc-h"><span>Invoice matching agent</span><span className="meta">Example upgrade log</span></div>
            <table>
              <thead><tr><th>Change tested</th><th>Current</th><th>Candidate</th><th>Decision</th></tr></thead>
              <tbody>
                {UPGRADES.map((u) => (
                  <tr key={u.change}>
                    <td>{u.change}<small>{u.note}</small></td>
                    <td className="n" data-l="Current">{u.cur}</td>
                    <td className="n" data-l="Candidate">{u.cand}</td>
                    <td className={u.ok ? "yes" : "no"}>{u.dec}<small>{u.why}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <figcaption><span className="dot" /><span>Scored on the same 240 cases each time, graded by your accounting team.</span></figcaption>
          </figure>
        </div>
      </section>

      {/* 06 Staying current */}
      <section className="sec rule ao-sec" id="current" aria-labelledby="cu-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Staying current</div>
          <h2 className="h2" id="cu-h">AI changes every few weeks. <span className="mute">Every month we test the new releases on your work.</span></h2>
          <p className="lead">A setup that was right in January is behind by summer. Most releases don&apos;t matter to your business, so we test the ones that do on your own work before anything changes.</p>
          <div className="pace">
            {PACE.map((p) => <div key={p.n}><b>{p.n}</b><span>{p.d}</span><small>{p.src}</small></div>)}
          </div>
          <div className="cadence">
            {CADENCE.map((c) => (
              <div className="cad" key={c.when}><span className="meta">{c.when}</span><h4>{c.lead}</h4><ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul></div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Training */}
      <section className="sec light ao-sec" id="training" aria-labelledby="tr-h">
        <div className="wrap">
          <div className="label"><span className="ix">07</span>Training, every month</div>
          <h2 className="h2" id="tr-h">Your team learns each piece as it goes live.</h2>
          <p className="lead">A build nobody uses gets cancelled. So training is built in, on your own tools and workflows, and every session lands in a library your team keeps.</p>
          <div className="ao-split">
            <div>
              <ul className="mlist">
                {RHYTHM.map((r) => <li key={r.b}><b>{r.b}</b><span>{r.s}</span></li>)}
              </ul>
              <div className="ao-links">
                <Link className="link" href="/training">How we train <span aria-hidden="true">→</span></Link>
                <Link className="link" href="/training">Book a training day <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <div className="paper ao-lib" aria-label="Example of a recorded training library">
              <div className="paper-h"><b>Training library</b><span>Example · your company</span></div>
              <ul>{LESSONS.map((l) => <li key={l.t}><b>{l.t}{l.tag && <em>{l.tag}</em>}</b><small>{l.m}</small></li>)}</ul>
              <p className="foot">Updated every month. Yours to keep, like the code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 The assistant */}
      <section className="sec ao-sec" id="assistant" aria-labelledby="as-h">
        <div className="wrap ao-split" style={{ marginTop: 0, alignItems: "center" }}>
          <div>
            <div className="label"><span className="ix">08</span>The assistant</div>
            <h2 className="h2" id="as-h">Ask a question the way your team would.</h2>
            <p className="lead">This exchange runs on a sample field service company. Yours answers from your own systems, cites the records it used, and only shows each person what their role allows.</p>
          </div>
          <figure className="ao-doc ao-chat" aria-label="Example conversation with an AI assistant on a sample company">
            <div className="ao-doc-h"><span>AI assistant</span><span className="meta">Sample company</span></div>
            <div className="ao-turn">
              <p className="q">Send the Miller service agreement and last invoice to Dana Miller.</p>
              <p className="a">Found both in your documents: the 2025 maintenance agreement and invoice #8812. <b>Drafted for Dana Miller. Approved by the ops manager, sent from your Outlook.</b></p>
            </div>
            <div className="ao-turn">
              <p className="q">Which techs are running behind today, and why?</p>
              <p className="a">Four techs are behind. I compared the dispatch board against GPS and job notes.</p>
              <table>
                <thead><tr><th>Tech</th><th>Why</th><th>Impact</th></tr></thead>
                <tbody>{LATE.map((l) => <tr key={l.job}><td>{l.job}</td><td>{l.why}</td><td>{l.over}</td></tr>)}</tbody>
              </table>
              <p className="srcs-l">Sources: Dispatch board · GPS · Job notes</p>
            </div>
            <div className="ao-turn">
              <p className="q">Text the customers on those jobs with a new arrival window.</p>
              <p className="a">Done. <b>Four texts drafted, approved and sent</b> with updated windows. I&apos;ll let you know if anyone asks to reschedule.</p>
              <ul className="win">{WINDOWS.map((w) => <li key={w}>{w}</li>)}</ul>
              <p className="srcs-l">Sent after approval · Watching for replies · Reschedule drafts on</p>
            </div>
          </figure>
        </div>
      </section>

      {/* 09 What's included */}
      <section className="sec light ao-sec" id="included" aria-labelledby="in-h">
        <div className="wrap">
          <div className="label"><span className="ix">09</span>What&apos;s included</div>
          <h2 className="h2" id="in-h">One role, sized to your company.</h2>
          <p className="lead">It starts with a discovery that ends with your first build live. From there, this is what your AI Officer covers.</p>
          <div className="ao-inc">
            {INCLUDED.map((g) => (
              <div className="flip" key={g.group}>
                <h3>{g.group}</h3>
                <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="ao-after">
            Want one project instead? Start with a discovery and we&apos;ll scope it with you. Want your team trained first? Book a{" "}
            <Link href="/training">training day</Link>.
          </p>
        </div>
      </section>

      {/* 10 Ownership */}
      <section className="sec" aria-labelledby="own-h">
        <div className="wrap">
          <div className="label"><span className="ix">10</span>Ownership</div>
          <h2 className="h2" id="own-h">Everything we build is yours.</h2>
          <p className="lead">Whether you keep us on or stop after one project, it all sits in your company&apos;s name.</p>
          <div className="caps4 sw4">
            {OWN.map((o) => (
              <div className="cap flip" key={o.t}><h3>{o.t}</h3><p>{o.b}</p></div>
            ))}
          </div>
          <p className="fine">Owner of each: your company. Hosted on SOC 2 Type 2 infrastructure.</p>
        </div>
      </section>

      {/* 11 The honest part */}
      <section className="sec rule" aria-labelledby="ho-h">
        <div className="wrap">
          <div className="label"><span className="ix">11</span>The honest part</div>
          <h2 className="h2" id="ho-h">What it asks of your team.</h2>
          <p className="lead">AI takes some effort from your people too. Here&apos;s how much.</p>
          <div className="finds" style={{ marginTop: "clamp(48px, 5vw, 72px)" }}>
            {HONEST.map((h) => <div key={h.n}><b>{h.n}</b><span>{h.t}</span><small>{h.s}</small></div>)}
          </div>
        </div>
      </section>

      {/* 12 Questions */}
      <section className="sec light" aria-labelledby="faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">12</span>Questions</div>
          <h2 className="h2" id="faq-h">What people ask first.</h2>
          <div className="ao-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light contact ao-sec" id="contact" aria-labelledby="contact-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="contact-h">Your AI Officer starts with a discovery.</h2>
            <p className="lead">Workflow mapped, tools audited, AI policy written, team trained, first build live. We reply the same business day.</p>
            <div className="alt"><Link className="btn ghost" href="/contact">More ways to reach us</Link></div>
          </div>
          <ContactForm source="AI Officer page" />
        </div>
      </section>
    </main>
  );
}
