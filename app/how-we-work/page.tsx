import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "How We Work · Novum AI",
  description: "Discovery, build, and run. How Novum scopes, prices, and hands over custom software you own.",
};

const STEPS = [
  { title: "Discovery", tag: "The first step on every project", body: "We sit with your team, watch how the work actually moves, and list every tool you pay for and what it costs.", includes: "workflow mapping, a tool and cost audit, a written scope, and a price before anything is built" },
  { title: "Build", tag: "Scoped and priced per project", body: "We build in phases, highest-impact first. Your data moves over from the old tools, and each phase is live and in use before the next one starts.", includes: "data migration, integrations with the tools you keep, the AI assistant and agents, and training for every phase" },
  { title: "Run", tag: "Hosting, plus support if you want it", body: "You pay for hosting, storage, and security. Support is month to month for new features, new agents, and changes as the business grows.", includes: "monitoring, backups, security updates, and support you can cancel anytime" },
];

const HANDOFF = [
  { title: "The code", body: "The full source, in a repository your company owns. Any developer can work on it." },
  { title: "The data", body: "Every record, in a database on an account in your company's name." },
  { title: "The accounts", body: "Hosting and services set up under your company, with your team as the owners." },
  { title: "The playbook", body: "Documentation and training so your team knows how everything works." },
];

const DRIVERS = [
  { title: "How much we build", body: "A full platform replacement is a bigger build than one new tool." },
  { title: "How many tools we connect", body: "Each integration adds work, and some systems are easier to connect than others." },
  { title: "How much data moves", body: "Years of records from old systems take longer to migrate than a clean start." },
  { title: "What the AI does", body: "An assistant is one scope. Agents that take actions with approval steps are another." },
];

const FAQ = [
  { q: "What does it cost?", a: "It depends on what you need. Some companies need a new system, some need their tools connected, most need a mix. We price every project after discovery, and you get the number in writing before we build." },
  { q: "Do we pay per user?", a: "No. There are no seats and no revenue share. Adding people or growing the business adds no license fees." },
  { q: "How long does a build take?", a: "It depends on the scope. We build in phases, so your team starts using the first piece before the whole system is done." },
  { q: "What happens to our data in the old system?", a: "We move it. Migration is part of the build, so your history comes with you." },
  { q: "What if we stop working with you?", a: "Nothing breaks. You own the code, the data, and the accounts. Keep running it, hire another developer, or bring us back." },
];

export default function HowWeWorkPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="How we work"
        title={<>We map <span className="h-grad">before</span> we build.</>}
        sub="Every company runs differently. Every project starts by learning how yours does, and nothing gets built until the scope and price are agreed in writing."
      />

      <section className="h-sec">
        <div className="h-wrap h-howgrid">
          <SectionHead eyebrow="The process" title="Three steps. No subscription." sub="You always know what's being built, what it costs, and what comes next." />
          <div className="h-vsteps">
            {STEPS.map((s, i) => (
              <div className="h-vstep" key={s.title}>
                <div className="h-vstep-n">{i + 1}</div>
                <div>
                  <div className="h-vstep-head"><h3>{s.title}</h3><span className="h-badge">{s.tag}</span></div>
                  <p>{s.body}</p>
                  <div className="h-includes"><b>Includes:</b> {s.includes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="At handoff" title="Everything is yours." sub="When the build is done, you walk away with all of it." />
          <div className="h-grid4">
            {HANDOFF.map((h) => (
              <div className="h-card2" key={h.title}><h3>{h.title}</h3><p>{h.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Pricing" title="Priced case by case, never per seat." sub="Every project is scoped to what you actually need. These are the things that move the price." />
          <div className="h-grid4">
            {DRIVERS.map((d) => (
              <div className="h-card2" key={d.title}><h3>{d.title}</h3><p>{d.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="Questions" title="What people ask first." center />
          <div className="h-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
