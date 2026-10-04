import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "How We Work · Novum AI",
  description: "Discovery, build, train, and run. How Novum scopes, prices, and hands over custom software you own.",
};

const STEPS = [
  { title: "Discovery", tag: "Credited toward your build", body: "We sit with your team, watch how the work actually moves, and list every tool you pay for and what it costs. If you build with us, the discovery fee comes off the price.", includes: "workflow mapping, a tool and cost audit, a written scope, and a price before anything is built. The scope and audit are yours to keep either way" },
  { title: "Build, or AI Officer, or both", tag: "Your choice after discovery", body: "We build in phases, highest-impact first, each one live and in use before the next starts. Or we start as your fractional Chief AI Officer on a monthly plan and build later.", includes: "data migration, integrations with the tools you keep, and the AI assistant and agents" },
  { title: "Train", tag: "Built into every phase", body: "Before each phase goes live, we train the people who will use it, on your system and your data. A system the team doesn't use saves nothing.", includes: "hands-on sessions per team, written guides, and follow-up coaching after launch" },
  { title: "Run", tag: "Your AI Officer, monthly", body: "You pay for hosting, storage, and security. Your AI Officer keeps everything current, audits your tools each quarter, and brings in new AI as it's worth using.", includes: "monitoring, backups, security updates, ongoing training, and a plan you can cancel anytime" },
];

const HANDOFF = [
  { title: "The code", body: "The full source, in a repository your company owns. Any developer can work on it." },
  { title: "The data", body: "Every record, in a database on an account in your company's name." },
  { title: "The accounts", body: "Hosting and services set up under your company, with your team as the owners." },
  { title: "The playbook", body: "Documentation and trained people, so your team knows how everything works." },
];

const DRIVERS = [
  { title: "How much we build", body: "A full platform replacement is a bigger build than one new tool." },
  { title: "How many tools we connect", body: "Each integration adds work, and some systems are easier to connect than others." },
  { title: "How much data moves", body: "Years of records from old systems take longer to migrate than a clean start." },
  { title: "What the AI does", body: "An assistant is one scope. Agents that take actions with approval steps are another." },
];

const FAQ = [
  { q: "What does it cost?", a: "Discovery is priced case by case, based on the type of business, its size, and the tools in use. It ranges from $2,500 to $15,000 for the initial audit, and it comes off the price of your build if you go ahead. After that it depends on what you need. Some companies need a new system, some need their tools connected, most need a mix. We price every project after discovery, and you get the number in writing before we build." },
  { q: "Do we pay per user?", a: "No. There are no seats and no revenue share. Adding people or growing the business adds no license fees." },
  { q: "How long does a build take?", a: "It depends on the scope. We build in phases, so your team starts using the first piece before the whole system is done." },
  { q: "What happens to our data in the old system?", a: "We move it. Migration is part of the build, so your history comes with you." },
  { q: "What if we stop working with you?", a: "The hosting accounts are in your company's name, so the system keeps running and you keep paying the host directly. What stops is our support. Hire another developer, or bring us back." },
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
          <SectionHead eyebrow="The process" title="Four steps. No subscription." sub="You always know what's being built, what it costs, and what comes next." />
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
