import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { AssistantChat } from "@/components/AssistantChat";

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
        title={<>A one-time build. <span className="h-grad">You own it.</span></>}
        sub="For companies that want a project without a monthly plan. We build an AI assistant and agents on your data, connect the tools you keep, replace what costs more to rent than to own, and train your team on every piece. No seats, no revenue share."
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="What we build" title="One system, five pieces." sub="You get the pieces your operation needs. None of them are sold separately." />
          <div className="h-grid3">
            {PIECES.map((p) => (
              <div className="h-card2" key={p.tag}>
                <span className="h-card2-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">Try it</div>
            <h2>Ask a question the way your team would.</h2>
            <p className="h-feature-sub">This assistant runs on a sample company. Yours answers from your own systems, cites the records it used, and only shows each person what their role allows.</p>
          </div>
          <div className="h-demo" style={{ position: "relative", top: 0 }}>
            <div className="h-demo-bar"><i /><i /><i /><span>Live demo · AI assistant</span></div>
            <AssistantChat height={520} compact bare />
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="How a build runs" title="Scoped and priced before we write a line." />
          <div className="h-grid4">
            {PHASES.map((p) => (
              <div className="h-card2" key={p.title}><h3>{p.title}</h3><p>{p.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft" id="pricing">
        <div className="h-wrap">
          <SectionHead
            eyebrow="Pricing"
            title="Discovery first. The build is priced after."
            sub="Discovery is $2,500 for a 10-person team, up to $15,000 for larger or more complex companies. It ends with your first agent live, a tool audit, and a written scope, and the fee comes off your build. The build is quoted in writing before we start, and never priced per seat."
          />
          <div className="h-grid4">
            {DRIVERS.map((d) => (
              <div className="h-card2" key={d.title}><h3>{d.title}</h3><p>{d.body}</p></div>
            ))}
          </div>
          <p style={{ marginTop: 28, color: "var(--ink-2)", maxWidth: 720 }}>
            After the build you pay for hosting, storage, and security. Want builds as part of a monthly price instead? Growth and Pro include unlimited agents and builds, worked through one or two at a time. See the{" "}
            <Link href="/ai-officer#pricing" style={{ color: "inherit", fontWeight: 700 }}>AI Officer plans</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
