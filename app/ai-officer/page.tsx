import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { PlanCards } from "@/components/PlanCards";

export const metadata: Metadata = {
  title: "Fractional Chief AI Officer · Novum AI",
  description: "A part-time Chief AI Officer for companies without a technical team. Every tool connected, unlimited agents and builds, and your team trained. Plans from $3,500 a month."
};

const MONTHLY = [
  { title: "Ongoing training", body: "Sessions and coaching for your team on their own work, as the tools change, so people keep using what you paid for." },
  { title: "New AI, tested for you", body: "AI tools change monthly. We test the ones that matter on your data and adopt the ones that pay off." },
  { title: "Agents and builds, nonstop", body: "Ask for as many agents, integrations, and tools as you want. We work through them in order, each one live before the next starts. Pro runs two at once." },
  { title: "Every tool connected", body: "Your accounting, CRM, project, and document tools wired together, so data entered once shows up everywhere and the AI can see all of it." },
  { title: "Costly software, replaced", body: "When a SaaS tool costs more than it's worth, we build the version that fits through your build queue and hand you the code. Pro takes on full platforms." },
  { title: "Audits and security", body: "A quarterly audit of every tool and what it costs, plus monitoring, backups, and security updates on everything we set up." },
];

const FIT = [
  { title: "No technical team", body: "You run a company of 15 to 100 people, nobody owns software, and tools get bought one at a time." },
  { title: "Software you want kept current", body: "You built with us and want the system maintained and improved as the business grows." },
  { title: "Ready to see it work", body: "You'd rather see one agent working on your own data before committing. Discovery ends with exactly that." },
];


const FAQ = [
  { q: "What is a fractional Chief AI Officer?", a: "Most companies under 100 people can't justify a full-time technical executive. We fill the role part-time. We train your team, test new AI on your data, keep your systems running, and cut tools that don't earn their price." },
  { q: "How does it start?", a: "With a discovery, priced $2,500 for a 10-person team up to $15,000 by size and tools. We map how your work moves, audit every tool you pay for (that report lands within 7 days), write your AI usage policy, train your team on its own work, and put your first agent live on your data within 30 days. The fee is credited toward your plan." },
  { q: "What does 'one build at a time' mean?", a: "There's no limit on how many agents, integrations, or tools you ask for. We work on one until it's live, then start the next. Pro works on two at once. Bigger projects, like replacing a platform, are split into steps that go live one by one." },
  { q: "Do we keep what you build if we leave?", a: "Yes. Replacements, agents, and integrations are built on accounts in your company's name. The code, data, and accounts stay yours." },
  { q: "How long is the commitment?", a: "Six months, then month to month. Pay yearly and it's 10% off. Your accounts, data, and code stay in your company's name either way, so nothing breaks if we part ways." },
  { q: "What about marketing?", a: "SEO, social reels, and explainer videos are available as an add-on, priced separately. They aren't part of the AI Officer plans." },
];

export default function AiOfficerPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Fractional Chief AI Officer"
        title={<>Your AI team, <span className="h-grad">on call</span>.</>}
        sub="Most companies under 100 people have no one whose job is AI. We act as yours: every tool connected, agents and builds shipping one after another, and your team trained to use them. Plans from $3,500 a month."
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Who it's for" title="Companies that need technical leadership and can't hire it." />
          <div className="h-grid3">
            {FIT.map((f) => (
              <div className="h-card2" key={f.title}><h3>{f.title}</h3><p>{f.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="The role" title="What an AI Officer does." sub="Your plan sets how much of each you get, so you know what's included and what costs extra." />
          <div className="h-grid3">
            {MONTHLY.map((m) => (
              <div className="h-card2" key={m.title}><h3>{m.title}</h3><p>{m.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec" id="pricing">
        <div className="h-wrap">
          <SectionHead
            eyebrow="Plans"
            title="Two plans. Start with a discovery."
            sub="Every plan starts with a discovery that ends with your first agent live within 30 days, priced $2,500 to $15,000 by company size and credited toward your plan. Then six months minimum, month to month after that."
          />
          <PlanCards />
          <p style={{ marginTop: 28, color: "var(--ink-2)", maxWidth: 720 }}>
            Want one project without a plan? See{" "}
            <Link href="/build" style={{ color: "inherit", fontWeight: 700 }}>Build</Link>.
          </p>
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
