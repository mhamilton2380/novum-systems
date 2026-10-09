import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { ProcessTimeline, type ProcessStep } from "@/components/ProcessTimeline";
import { ThirtyDayCard, Guarantee, GUARANTEE, RulesBand, HandoffDoc, ScopeMeters, type IconName } from "@/components/PageVisuals";
import { DiscoveryArtifacts } from "@/components/DiscoveryArtifacts";

export const metadata: Metadata = {
  title: "How We Work · Novum AI",
  description: "Discovery, training, build, and run. How Novum learns your work, puts AI to work in it, and hands everything over in your company's name.",
};

const STEPS: ProcessStep[] = [
  {
    title: "Discovery",
    tag: "First build live within 30 days",
    body: "We sit with your team, map how the work actually moves, and audit every tool you pay for. Then we put AI to work on your own data, so you see it running before you commit to anything bigger.",
    gets: [
      "A map of how the work moves today",
      "Every tool you pay for, what it costs, and what to keep, connect, replace, or cut, within 7 days",
      "A written AI usage policy for your team",
      "A hands-on training session on your own work, recorded as the first entry in your training library",
      "The first build live on your own data, within 30 days",
      "A written plan with prices for what comes next",
    ],
    ask: "Access to the tools you use, and time with the people who do the work.",
  },
  {
    title: "Train",
    tag: "Built into every phase",
    body: "Before each piece goes live, we train the people who will use it, on their own work and your data. AI the team doesn't use saves nothing, so training is part of every step.",
    gets: ["Hands-on sessions for each team", "Written guides for every tool and agent", "Follow-up coaching after launch", "A short list of agents worth building next"],
    link: { href: "/training", label: "Want only this? Book a training day" },
  },
  {
    title: "Build and connect",
    tag: "One live before the next starts",
    body: "On an AI Officer plan, agents, integrations, and tools ship one after another, each in use before the next begins. Prefer one project? We scope it in writing and build it at a fixed price.",
    gets: [
      "An AI assistant that answers across your systems, with sources",
      "Agents on the repeat work, with a person approving before anything leaves the company",
      "The tools you keep, connected so data entered once shows up everywhere",
      "Your data migrated where a platform gets replaced",
    ],
  },
  {
    title: "Run",
    tag: "Your AI Officer",
    body: "You pay for hosting, storage, and security. Your AI Officer keeps the team trained, tests new AI on your data, audits your tools each quarter, and keeps what we built current.",
    gets: [
      "Ongoing training as the tools change",
      "Monitoring, backups, and security updates",
      "New agents, changes, and fixes through your queue",
      "Six months minimum on a plan, then month to month",
    ],
  },
];

const RULES: { icon: IconName; title: string; body: string }[] = [
  { icon: "pen", title: "Written scope and price first", body: "You know what's being built and what it costs before we start." },
  { icon: "check", title: "A person approves", body: "Agents draft. Someone on your team reviews and signs off before anything leaves the company." },
  { icon: "noseat", title: "No seats, no revenue share", body: "Adding people or growing the business adds no license fees. Your bill doesn't climb when you do." },
  { icon: "lock", title: "Your data stays yours", body: "AI works on your data, sees only what each role allows, and never trains on your records." },
];

const HANDOFF: { icon: IconName; title: string; body: string; foot: string; where: string }[] = [
  { icon: "code", title: "The code", body: "The full source, in a repository your company owns. Any developer can work on it.", foot: "Owner: your company", where: "github.com/your-company/operations" },
  { icon: "db", title: "The data", body: "Every record, in a database on an account in your company's name.", foot: "Owner: your company", where: "Database on your company's account" },
  { icon: "key", title: "The accounts", body: "Hosting, services, and the AI account itself, set up in your company's name. You pay the AI provider at cost, with no markup.", foot: "Owner: your company", where: "Hosting, services, and AI account, billed to you" },
  { icon: "book", title: "The know-how", body: "Documentation, a recorded training library, and trained people, so your team knows how everything works.", foot: "Owner: your company", where: "Docs and the training library, yours to keep" },
];

const DRIVERS: { icon: IconName; title: string; body: string; lo: string; hi: string; at: number }[] = [
  { icon: "box", title: "How much we build", body: "A few agents on the tools you have is a smaller scope than a full platform replacement.", lo: "A few agents on your tools", hi: "A full platform replacement", at: 35 },
  { icon: "link", title: "How many tools we connect", body: "Each integration adds work, and some systems are easier to connect than others.", lo: "One or two", hi: "Every system you run", at: 55 },
  { icon: "move", title: "How much data moves", body: "Years of records from old systems take longer to migrate than a clean start.", lo: "A clean start", hi: "Years of records", at: 25 },
  { icon: "users", title: "How big the team is", body: "More people to train and more workflows to map means a larger discovery.", lo: "One team", hi: "Every department", at: 65 },
];

const FAQ = [
  { q: "Is there a guarantee?", a: `Yes. ${GUARANTEE.text} The terms: ${GUARANTEE.terms.join(" ")}` },
  { q: "What does it cost?", a: "We start with a discovery, quoted in writing by company size and tools. It ends with your first build live, and the fee is credited toward what comes next. After that you pick an AI Officer plan (six months minimum, then month to month) or a one-time project quoted in writing. Training days are quoted by team size." },
  { q: "Can we just book training?", a: "Yes. A training day is five hours, tailored to your company type, and you can request one without a discovery. Many teams start there and add an AI Officer once they see what to build." },
  { q: "Do we have to replace our software?", a: "No. Most clients keep the tools that work. We connect them and put AI on top. We only rebuild a platform when owning it costs less than the subscription." },
  { q: "Do we pay per user?", a: "No. There are no seats and no revenue share. Adding people or growing the business adds no license fees." },
  { q: "How long until we see something working?", a: "Your tool and cost report arrives within 7 days of kickoff, and your first build is live on your own data within 30 days. After that, work ships in phases, so your team is using each piece before the next starts." },
  { q: "If you replace a platform, what happens to our data?", a: "We move it. Migration is part of the work, so your history comes with you." },
  { q: "What if we stop working with you?", a: "The hosting accounts are in your company's name, so the system keeps running and you keep paying the host directly. What stops is our support. Hire another developer, or bring us back." },
];

export default function HowWeWorkPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="How we work"
        title={<>We learn how you work <span className="h-grad">first</span>.</>}
        sub="Every company runs differently. We start by learning how yours does and where AI fits, and nothing gets built until the scope and price are agreed in writing."
        side={<ThirtyDayCard />}
        ctas={false}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The process" title="Four steps, from first conversation to running." sub="Scroll through it. Each step lists exactly what you get." />
          <ProcessTimeline steps={STEPS} />
          <div style={{ marginTop: 48 }}><Guarantee /></div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What discovery hands you" title="Four documents. Yours either way." sub="Whatever you decide next, you keep the map, the tool report, the policy, and the plan. Click through an example of each." />
          <DiscoveryArtifacts />
        </div>
      </section>

      <RulesBand rules={RULES} />

      <section className="h-sec">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">At handoff</div>
            <h2>Everything is yours.</h2>
            <p className="pv-lead">Whether you stay on a plan or stop after a project, every account is in your company&apos;s name from day one. Handoff just makes it official: the code, the data, the accounts, and the know-how, signed over.</p>
          </div>
          <HandoffDoc items={HANDOFF} />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What shapes the price" title="Scoped to your company, never per seat." sub="Every discovery and project is quoted in writing. These are the things that move the number." />
          <ScopeMeters items={DRIVERS} />
          <p style={{ marginTop: 28, color: "var(--ink-2)", maxWidth: 720 }}>
            Not ready for a discovery? Start with a <Link href="/training" style={{ color: "inherit", fontWeight: 700 }}>training day</Link>.
          </p>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Questions" title="What people ask first." center />
          <div className="h-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Step one is a conversation." body="Tell us how your team works today. If a discovery makes sense, you get the scope and the price in writing before anything starts." />
    </div>
  );
}
