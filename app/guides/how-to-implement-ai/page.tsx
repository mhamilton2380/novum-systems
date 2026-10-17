import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, articleJsonLd, faqJsonLd } from "@/lib/seo";
import "../../compare.css";

// Guide for "how to implement AI in business", "AI implementation plan / roadmap / steps".
// Numbers come from /why-ai (sources named there). Company byline only: no Person schema, no author name.
const PATH = "/guides/how-to-implement-ai";
const TITLE = "How to Implement AI in a Small Business: A 5-Step Plan";
const DESC = "A 5-step AI implementation plan for a small business: map the work, set the rules, pick the first build, train the team on its own work, and keep it measured.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: `${TITLE.replace(": A 5-Step Plan", "")} · Novum AI`, description: DESC });

const STEPS: { t: string; p: string; list?: string[] }[] = [
  {
    t: "Map the work before you pick a tool",
    p: "Sit with the people who do the work and write down how it actually moves: who touches each step, which programs they use, and how long each step takes. Cut the steps that shouldn't exist before you automate anything. The output is a list of repeat tasks with a volume and a time for each.",
    list: ["How many times a week does it happen?", "How many minutes does it take each time?", "Does it follow rules someone could write down?", "Who checks the result today?"],
  },
  {
    t: "Audit your tools and write the rules",
    p: "List every program you pay for, what it costs and who uses it. Decide for each one: keep it, connect it, replace it, or cut it. Then write a one-page AI usage policy, because your team is probably already pasting work into personal chatbot accounts.",
    list: ["Which data may go into which AI tools", "Company accounts instead of personal ones", "A person approves anything sent, filed or paid", "A log of what the AI did and who approved it"],
  },
  {
    t: "Pick one first build and define what correct looks like",
    p: "Start where the volume is high, the steps are repeatable, and a person can check the result quickly: invoice entry, intake forms, order entry from email, renewal drafts, status reports. Before launch, the person who owns the work grades a set of real past cases, and the build is scored against them.",
    list: ["High volume and the same steps each time", "Clear rules for the right answer", "Connected to your own systems and data", "A person reviews before anything leaves the company"],
  },
  {
    t: "Train the team on its own work",
    p: "This step decides the result. Controlled studies measured 25% to 56% less time per task on work that suits AI once people were trained. A study of 25,000 workers handed AI tools with no training found about 3%. Train on the team's own tools and tasks, show where the AI gets things wrong, and record the sessions so new hires can catch up.",
  },
  {
    t: "Keep it measured and current",
    p: "Re-score every live build on the same cases each month. New AI models ship every few weeks, so test the ones that matter on your work and switch only when the score goes up. Then move to the next task on the list. Keep the code, data and AI accounts in your company's name, so the work survives any vendor or staff change.",
  },
];

const MISTAKES = [
  { h: "Tools with no training", p: "Seats get bought, a few people try them, and the time saved rounds to zero." },
  { h: "The wrong first task", p: "On work outside AI's strengths, one study found right answers fell from 84.5% to 60% to 70%, and the wrong ones read as more polished." },
  { h: "Nobody owns it", p: "AI improves where it is someone's job. Without an owner, nothing gets measured and nothing gets updated." },
  { h: "AI that can't see your data", p: "A chatbot without your files and systems saves minutes. Connected to them, it takes over routine steps." },
  { h: "No approval step", p: "Anything that goes to a customer, a regulator or a bank needs a person to sign off first." },
  { h: "Rented, not owned", p: "If the vendor holds the code, data and accounts, you start over when you leave." },
];

const FAQ = [
  { q: "What is AI implementation?", a: "AI implementation means putting AI into the daily work: training the team on its own tools, building agents on the company's data, and connecting the systems it already runs." },
  { q: "Where should a small business start with AI?", a: "With a map of the work. List the repeat tasks with their volume and time, write an AI usage policy, then pick one high-volume task with clear rules as the first build. Train the team on it before starting the next." },
  { q: "Do we need a data scientist or a technical team?", a: "No. Most of the work is mapping tasks, connecting the programs you already use, training people and measuring results. Someone has to own it, either a person on staff with the time or a fractional AI Officer." },
  { q: "How do we keep our data safe?", a: "Use company accounts, never personal ones. Keep data in systems in your company's name, give the AI access by role, log what it does, and have a person approve anything sent, filed or paid." },
  { q: "How do we know it's working?", a: "Define what correct looks like before launch, score the build on real past cases, and re-score it every month. Track hours saved per task against the time it took before." },
];

export default function HowToImplementAiPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "How to implement AI", path: PATH }]), articleJsonLd({ headline: TITLE, description: DESC, path: PATH, published: "2026-10-17" }), faqJsonLd(FAQ)]} />

      <section className="phero" aria-labelledby="gd-h1">
        <div className="wrap">
          <div className="label">Guide</div>
          <h1 id="gd-h1">How to implement AI in a small business.</h1>
          <p className="lead">Five steps: map the work, set the rules, pick one first build, train the team on its own work, and keep every build measured. The order matters more than the tools. Teams handed AI with no training saved about 3% of their time; trained teams on the right tasks saved 25% to 56%.</p>
          <p className="gd-meta">Novum AI · Updated October 17, 2026</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gd-steps-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The plan</div>
          <h2 className="h2" id="gd-steps-h">An AI implementation plan in five steps.</h2>
          <ol className="gd-steps">
            {STEPS.map((s) => (
              <li key={s.t}>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                  {s.list && <ul>{s.list.map((x) => <li key={x}>{x}</li>)}</ul>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gd-mis-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Where it goes wrong</div>
          <h2 className="h2" id="gd-mis-h">Six mistakes that stall AI in a small business.</h2>
          <p className="lead">Most stalled projects skipped a step above. The research behind these numbers is on <Link href="/why-ai">Why AI</Link>, with every source named.</p>
          <div className="gov">
            {MISTAKES.map((m) => <div key={m.h}><h4>{m.h}</h4><p>{m.p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gd-who-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Doing it yourself</div>
          <h2 className="h2" id="gd-who-h">You can run this plan in-house. <span className="mute">It needs an owner with time.</span></h2>
          <p className="lead">The steps are the same whoever does them. What usually runs short is time: someone has to map the work, build and connect the tools, train the team, and re-test every month. Companies with nobody whose job that is bring in a <Link href="/ai-officer">fractional Chief AI Officer</Link> to own it, or start with a <Link href="/training">training day</Link>.</p>
          <div className="gd-next">
            <Link className="link" href="/assessment">Score your company in 2 minutes <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/guides/ai-implementation-cost">What AI implementation costs <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/ai-implementation">How we implement AI <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gd-faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Questions</div>
          <h2 className="h2" id="gd-faq-h">What owners ask first.</h2>
          <div className="gd-faq">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="contact" aria-labelledby="gd-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="gd-cta-h">Want this plan run on your company?</h2>
            <p className="lead">A discovery maps your work, audits your tools, writes your AI policy, trains your team, and ends with your first build live.</p>
          </div>
          <ContactForm source="Guide: how to implement AI" />
        </div>
      </section>
    </main>
  );
}
