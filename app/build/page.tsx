import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Build · Novum AI",
  description: "AI tools built around how your business works, connected to the tools you keep, with your team trained on every piece. You own the code, the data, and the accounts.",
};

const PIECES = [
  { tag: "AI Assistant", title: "Ask your business anything", body: "Plain-English answers across every connected system, citing the records they came from." },
  { tag: "Agents", title: "AI doing the repeat work", body: "Drafting, matching, chasing, and reporting on your rules, with a person approving before anything leaves the company." },
  { tag: "Integrations", title: "The tools you keep, connected", body: "QuickBooks, Salesforce, HubSpot, Outlook, DocuSign, Stripe, and most things with an API. One change updates everywhere." },
  { tag: "Vault", title: "Every document, searchable", body: "Encrypted, indexed by meaning, and limited by role." },
  { tag: "Core", title: "The system your team works in", body: "Clients, projects, jobs, schedules, budgets, and reporting, shaped around how you run. Built when it costs less than the platform you rent." },
];

const PHASES = [
  { title: "Phase by phase", body: "We build the highest-impact piece first. Each phase is live and in use before the next one starts." },
  { title: "Your data comes with you", body: "Years of records move over from the old tools as part of the build." },
  { title: "Your team gets trained", body: "Before each phase goes live, we train the people who will use it, on your system and your data." },
  { title: "Handed over clean", body: "The full source, the database, and the hosting accounts, all in your company's name, with documentation." },
];

const DRIVERS = [
  { title: "How much we build", body: "A few agents on the tools you have is a smaller build than a full platform replacement." },
  { title: "How many tools we connect", body: "Each integration adds work, and some systems are easier to connect than others." },
  { title: "How much data moves", body: "Years of records from old systems take longer to migrate than a clean start." },
  { title: "What the AI does", body: "An assistant is one scope. Agents that take actions with approval steps are another." },
];

export default function BuildPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Build"
        title={<>AI tools built around how you work. <span className="h-grad">You own them.</span></>}
        sub="We build an AI assistant and agents on your data, connect the tools you keep, and train your team on every piece. Where a platform costs more to rent than to own, we rebuild it. No seats, no revenue share."
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="What we build" title="One system, five pieces." sub="You get the pieces your operation needs. None of them are sold separately." />
          <div className="h-grid3">
            {PIECES.map((p) => (
              <Link href="/solutions" className="h-card2" key={p.tag}>
                <span className="h-card2-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="h-more">See how it works →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="How a build runs" title="Scoped and priced before we write a line." />
          <div className="h-grid4">
            {PHASES.map((p) => (
              <div className="h-card2" key={p.title}><h3>{p.title}</h3><p>{p.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec" id="pricing">
        <div className="h-wrap">
          <SectionHead
            eyebrow="Pricing"
            title="Discovery first. The build is priced after."
            sub="Discovery is priced case by case, based on the type of business, its size, and the tools in use. It ranges from $2,500 to $15,000 for the initial audit, and that fee comes off your build if you go ahead. You keep the written scope and tool audit either way. The build is quoted in writing before we start, and never priced per seat."
          />
          <div className="h-grid4">
            {DRIVERS.map((d) => (
              <div className="h-card2" key={d.title}><h3>{d.title}</h3><p>{d.body}</p></div>
            ))}
          </div>
          <p style={{ marginTop: 28, color: "var(--ink-2)", maxWidth: 720 }}>
            After the build you pay for hosting, storage, and security. Most clients then keep us on as their{" "}
            <Link href="/ai-officer" style={{ color: "inherit", fontWeight: 700 }}>fractional Chief AI Officer</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
