import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Fractional Chief AI Officer · Novum AI",
  description: "A part-time Chief AI Officer for companies without a technical team. We run your systems, audit your tools, and bring in new AI as it arrives.",
};

const MONTHLY = [
  { title: "Maintenance and security", body: "Monitoring, backups, and security updates, so your systems keep running and nobody on your team has to think about it." },
  { title: "A quarterly tool audit", body: "Every tool, what it costs, and where it overlaps. We cut what you don't use and flag what's about to renew." },
  { title: "New AI, tested for you", body: "AI tools change monthly. We test the ones that matter on your data and adopt the ones that pay off." },
  { title: "Ongoing training", body: "Coaching for your team as the tools change, so adoption stays high after launch." },
  { title: "Changes and new agents", body: "A set number each month. New reports, new workflows, new agents for the work your team still does by hand." },
  { title: "One person to call", body: "When something breaks or someone asks \"can AI do this,\" you have an answer within a business day." },
];

const FIT = [
  { title: "No technical team", body: "You run a company of 15 to 100 people, nobody owns software, and tools get bought one at a time." },
  { title: "Software you want kept current", body: "You built with us and want the system maintained and improved as the business grows." },
  { title: "Not ready to build", body: "You want to cut waste and use AI well first. The AI Officer starts there and builds later if it makes sense." },
];

const DRIVERS = [
  { title: "How many systems", body: "More systems and integrations mean more to maintain and monitor." },
  { title: "How many people", body: "A team of 15 needs less training and support than a team of 100." },
  { title: "How much changes", body: "More monthly changes and new agents take more of our time." },
  { title: "Standalone or after a build", body: "If we built your system, we already know it. Starting from an existing stack takes more setup." },
];

const FAQ = [
  { q: "What is a fractional Chief AI Officer?", a: "Most companies under 100 people can't justify a full-time technical executive. We fill the role part-time. We keep your systems running, watch what you spend, and bring in new AI tools when they're worth it." },
  { q: "Do we have to build with you first?", a: "No. Start with a discovery. We map your stack and set up a monthly plan. If a build makes sense later, the discovery fee comes off it." },
  { q: "Can we cancel?", a: "Yes, month to month. Your accounts, data, and code stay in your company's name, so nothing breaks if we part ways." },
  { q: "What's not included?", a: "Large new builds are scoped and priced as projects. The monthly plan covers upkeep, audits, training, and a set number of changes." },
];

export default function AiOfficerPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Fractional Chief AI Officer"
        title={<>Your AI team, <span className="h-grad">on call</span>.</>}
        sub="Most companies under 100 people have no CTO. We act as yours: running your systems, auditing what you pay for, and bringing in new AI as it arrives."
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
          <SectionHead eyebrow="Every month" title="What the retainer covers." sub="A defined scope, so you know what you're getting and what costs extra." />
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
            eyebrow="Pricing"
            title="A monthly fee, set after discovery."
            sub="Discovery is priced case by case, based on the type of business, its size, and the tools in use. It ranges from $2,500 to $15,000, and that fee comes off a build if you go ahead. We then agree the monthly scope and price in writing. No seats, and you can cancel any month."
          />
          <div className="h-grid4">
            {DRIVERS.map((d) => (
              <div className="h-card2" key={d.title}><h3>{d.title}</h3><p>{d.body}</p></div>
            ))}
          </div>
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
