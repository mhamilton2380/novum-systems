import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { ImplementationFlow, StartChooser } from "@/components/ImplementationFlow";
import { HeroReel } from "@/components/HeroReel";
import { PartArt } from "@/components/PageVisuals";

export const metadata: Metadata = {
  title: "AI Implementation · Novum AI",
  description: "Every business has access to AI. Few know how to use it. We train your team, then act as your fractional Chief AI Officer to build the tools, connect your systems, and keep it working. You own all of it.",
};

const PARTS = [
  {
    tag: "Training",
    title: "Your team learns to use AI on their own work.",
    body: "Live sessions every month on your own tools and workflows, a recorded library your team keeps for good, and an on-site training day when you want one.",
    href: "/training",
    more: "See Training →",
  },
  {
    tag: "AI Officer",
    title: "Someone owns AI for you, every month.",
    body: "A fractional Chief AI Officer builds the agents and assistants, connects every tool you use, replaces costly software with software you own, and keeps the team trained as the tools change.",
    href: "/ai-officer",
    more: "See AI Officer →",
  },
];

const FAQ = [
  { q: "What does AI implementation mean here?", a: "Getting AI into the daily work of your business. That takes two things: your people knowing how to use it, and someone building and maintaining the tools around your data. Training covers the first. An AI Officer covers the second." },
  { q: "Do we need both?", a: "No. Some teams book a training day and stop there. Most that go further find the training shows them what to build, and the AI Officer builds it." },
  { q: "Who owns what you build?", a: "You do. The code, the data, and the accounts are in your company's name, and your team keeps the know-how." },
  { q: "Do we have to replace our software?", a: "No. We connect the tools that work and put AI on top. We only rebuild a platform when owning it costs less than the subscription." },
];

export default function AiImplementationPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="AI implementation"
        title={<>Every business has AI. We help yours <span className="h-grad">use it</span>.</>}
        sub="We teach your team, build the tools, connect your systems, and you own all of it. Training gets your people using AI. An AI Officer keeps building and running it with you."
        side={
          <HeroReel
            src="/ai-hero.mp4"
            av1="/ai-hero-av1.mp4"
            poster="/ai-hero-poster.jpg"
            label="Novum AI implementation in 35 seconds: we teach your team, build the tools, connect your systems, and you own all of it."
          />
        }
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Two parts" title="We build it. Then we make sure it gets used." sub="An AI Officer builds the agents and tools. Training on every plan gets your team using them, every month." />
          <div className="h-grid3" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {PARTS.map((p) => (
              <Link href={p.href} className="h-card2 pv-card" key={p.tag}>
                <PartArt kind={p.tag === "Training" ? "training" : "officer"} />
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
          <SectionHead eyebrow="How it runs" title="Four steps, nothing built before it's scoped." sub="Pick a step to see what happens. It plays through on its own." />
          <ImplementationFlow />
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Where to start" title="Pick the door that fits." />
          <StartChooser />
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

      <CtaBand title="Put AI on the real work." body="In 30 days your workflow is mapped, your team has trained on its own work, and your first agent is live on your data." />
    </div>
  );
}
