import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "AI Implementation · Novum AI",
  description: "Every business has access to AI. Few know how to use it. We train your team, then act as your fractional Chief AI Officer to build the tools, connect your systems, and keep it working. You own all of it.",
};

const PARTS = [
  {
    tag: "Training",
    title: "Your team learns to use AI on their own work.",
    body: "A 5-hour training day: how AI works, which tools matter for your kind of business and when to use them, hands-on practice on real tasks, and which agents to build first. Book it online by team size.",
    href: "/training",
    more: "See Training →",
  },
  {
    tag: "AI Officer",
    title: "Someone owns AI for you, every month.",
    body: "A fractional Chief AI Officer builds the agents and assistants, connects every tool you use, replaces costly software with software you own, and keeps the team trained as the tools change. Pro comes with a dedicated AI Officer.",
    href: "/ai-officer",
    more: "See AI Officer →",
  },
];

const STEPS = [
  { title: "Discovery", body: "We map how your work moves, audit every tool and what it costs, write your AI usage policy, and put your first agent live on your own data within 30 days." },
  { title: "Train", body: "Your team learns the tools on their own work, so what gets built gets used." },
  { title: "Build and connect", body: "Agents, an AI assistant, and integrations with the tools you keep, one live before the next starts." },
  { title: "Run", body: "Your AI Officer keeps everything current, tests new AI on your data, and keeps training going." },
];

const START = [
  { title: "Start with a training day", body: "Your team gets up to speed in five hours, with a short list of agents worth building. Prices are on the Training page." },
  { title: "Start with a discovery", body: "We map the work, audit your tools, and put your first agent live. The fee is credited toward what comes next." },
  { title: "Start with an AI Officer", body: "Every plan begins with a discovery, then runs month to month after a six-month minimum." },
];

const FAQ = [
  { q: "What does AI implementation mean here?", a: "Getting AI into the daily work of your business. That takes two things: your people knowing how to use it, and someone building and maintaining the tools around your data. Training covers the first. An AI Officer covers the second." },
  { q: "Do we need both?", a: "No. Some teams book a training day and stop there. Most that go further find the training shows them what to build, and the AI Officer builds it." },
  { q: "Who owns what you build?", a: "You do. The code, the data, and the accounts are in your company's name, and your team keeps the know-how." },
  { q: "Do we have to replace our software?", a: "No. We connect the tools that work and put AI on top. We only rebuild a platform when owning it costs less than renting it." },
];

export default function AiImplementationPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="AI implementation"
        title={<>Every business has AI. We help yours <span className="h-grad">use it</span>.</>}
        sub="We teach your team, build the tools, connect your systems, and you own all of it. Training gets your people using AI. An AI Officer keeps building and running it with you."
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Two parts" title="Training and an AI Officer, working together." sub="Use one or both. Each makes the other work better." />
          <div className="h-grid3" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {PARTS.map((p) => (
              <Link href={p.href} className="h-card2" key={p.tag}>
                <span className="h-card2-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="h-more">{p.more}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="How it runs" title="Four steps, nothing built before it's scoped." />
          <div className="h-grid4">
            {STEPS.map((s) => (
              <div className="h-card2" key={s.title}><h3>{s.title}</h3><p>{s.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Where to start" title="Pick the door that fits." />
          <div className="h-grid3">
            {START.map((s) => (
              <div className="h-card2" key={s.title}><h3>{s.title}</h3><p>{s.body}</p></div>
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
