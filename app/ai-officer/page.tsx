import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { PlanCards } from "@/components/PlanCards";

export const metadata: Metadata = {
  title: "Fractional Chief AI Officer · Novum AI",
  description: "A part-time Chief AI Officer for companies without a technical team. Plans from $500 a month, first two months free. We train your team, test new AI on your data, and audit your tools.",
};

const MONTHLY = [
  { title: "Ongoing training", body: "Sessions and coaching for your team on their own work, as the tools change, so people keep using what you paid for." },
  { title: "New AI, tested for you", body: "AI tools change monthly. We test the ones that matter on your data and adopt the ones that pay off." },
  { title: "Costly software, replaced", body: "When a SaaS tool costs more than it's worth, we build the version that fits and hand you the code. Growth includes one a year, Pro is unlimited." },
  { title: "Marketing handled", body: "SEO that doesn't depend on paid ads, social reels, and explainer videos, made for you every month on Growth and Pro." },
  { title: "Audits and security", body: "A quarterly audit of every tool and what it costs, plus monitoring, backups, and security updates on everything we set up." },
];

const FIT = [
  { title: "No technical team", body: "You run a company of 15 to 100 people, nobody owns software, and tools get bought one at a time." },
  { title: "Software you want kept current", body: "You built with us and want the system maintained and improved as the business grows." },
  { title: "Starting small", body: "You want your team using AI well before anything gets built. Start on Basic and move up when the results show." },
];


const FAQ = [
  { q: "What is a fractional Chief AI Officer?", a: "Most companies under 100 people can't justify a full-time technical executive. We fill the role part-time. We train your team, test new AI on your data, keep your systems running, and cut tools that don't earn their price." },
  { q: "Do we need a discovery first?", a: "Not for Basic or Growth. Sign up and we book your first training session. Pro and Enterprise start with a discovery, because they include building and running systems, and the discovery fee comes off any build." },
  { q: "Do we keep what you build if we leave?", a: "Yes. Replacements, agents, and integrations are built on accounts in your company's name. The code, data, and accounts stay yours." },
  { q: "How long is the commitment?", a: "Every plan is 12 months. That commitment is what pays for the two free months. Your accounts, data, and code stay in your company's name either way, so nothing breaks if we part ways." },
  { q: "What's not included?", a: "Anything past your plan's limits, like a second replacement on Growth, is quoted as a project. Pro includes unlimited replacements, built one at a time." },
];

export default function AiOfficerPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Fractional Chief AI Officer"
        title={<>Your AI team, <span className="h-grad">on call</span>.</>}
        sub="Most companies under 100 people have no one whose job is AI. We act as yours: training your team, testing new AI on your data, and auditing what you pay for. Plans from $500 a month, first two months free."
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
            title="Pick a plan. The first two months are free."
            sub="Every plan runs 12 months, and the first two are on us. Basic and Growth start today. Pro and Enterprise start with a discovery, so we can plan the builds before the first month."
          />
          <PlanCards />
          <p style={{ marginTop: 28, color: "var(--ink-2)", maxWidth: 720 }}>
            Need something built? That's a separate project, scoped on our{" "}
            <Link href="/build" style={{ color: "inherit", fontWeight: 700 }}>Build</Link> page.
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
