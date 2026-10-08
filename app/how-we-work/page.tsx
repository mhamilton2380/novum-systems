import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "How We Work · Novum AI",
  description: "Discovery, build, train, and run. How Novum scopes, prices, and puts AI to work in your business, with everything handed over in your name.",
};

const STEPS = [
  { title: "Discovery", tag: "First agent live within 30 days", body: "We sit with your team, map how the work actually moves, and list every tool you pay for. Then we put it to work: your team trained on its own work, an AI usage policy, and your first agent live on your own data within 30 days. The fee is credited toward your plan or build.", includes: "a workflow map, a tool and cost report within 7 days, an AI usage policy, a training session on your own work, your first agent live within 30 days, and a written plan with prices for what comes next. All of it is yours either way" },
  { title: "AI Officer, or a one-time project", tag: "Your choice after discovery", body: "Most clients go onto a fractional Chief AI Officer plan: every tool connected, and agents and builds shipping one after another, each live before the next starts. Or take one project at a fixed price. Pro comes with a dedicated AI Officer.", includes: "the AI assistant and agents, integrations with the tools you keep, and data migration where a platform gets replaced" },
  { title: "Train", tag: "Built into every phase", body: "Before each phase goes live, we train the people who will use it, on their own work and your data. AI the team doesn't use saves nothing.", includes: "hands-on sessions per team, written guides, and follow-up coaching after launch" },
  { title: "Run", tag: "Your AI Officer", body: "You pay for hosting, storage, and security. Your AI Officer keeps the team trained, audits your tools each quarter, and brings in new AI as it's worth using.", includes: "ongoing training, monitoring, backups, and security updates, on a 6-month minimum, then month to month" },
];

const HANDOFF = [
  { title: "The code", body: "The full source, in a repository your company owns. Any developer can work on it." },
  { title: "The data", body: "Every record, in a database on an account in your company's name." },
  { title: "The accounts", body: "Hosting and services set up under your company, with your team as the owners." },
  { title: "The playbook", body: "Documentation and trained people, so your team knows how everything works." },
];

const DRIVERS = [
  { title: "How much we build", body: "A few agents on the tools you have is a smaller build than a full platform replacement." },
  { title: "How many tools we connect", body: "Each integration adds work, and some systems are easier to connect than others." },
  { title: "How much data moves", body: "Years of records from old systems take longer to migrate than a clean start." },
  { title: "What the AI does", body: "An assistant is one scope. Agents that take actions with approval steps are another." },
];

const FAQ = [
  { q: "What does it cost?", a: "Start with a discovery, quoted in writing by company size and tools. It ends with your first agent live within 30 days, and the fee is credited toward what comes next. Then you pick an AI Officer plan (six months minimum, then month to month) or a one-time project quoted in writing. Training days are priced by team size on the Training page." },
  { q: "Do we have to replace our software?", a: "No. Most clients keep the tools that work. We connect them and put AI on top. We only rebuild a platform when owning it costs less than renting it." },
  { q: "Do we pay per user?", a: "No. There are no seats and no revenue share. Adding people or growing the business adds no license fees." },
  { q: "How long does a build take?", a: "It depends on the scope. We build in phases, so your team starts using the first piece before the whole system is done." },
  { q: "If you replace a platform, what happens to our data?", a: "We move it. Migration is part of the build, so your history comes with you." },
  { q: "What if we stop working with you?", a: "The hosting accounts are in your company's name, so the system keeps running and you keep paying the host directly. What stops is our support. Hire another developer, or bring us back." },
];

export default function HowWeWorkPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="How we work"
        title={<>We map <span className="h-grad">before</span> we build.</>}
        sub="Every company runs differently. Every project starts by learning how yours does and where AI fits, and nothing gets built until the scope and price are agreed in writing."
      />

      <section className="h-sec">
        <div className="h-wrap h-howgrid">
          <SectionHead eyebrow="The process" title="Four steps. Priced in writing first." sub="You always know what's being built, what it costs, and what comes next." />
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
