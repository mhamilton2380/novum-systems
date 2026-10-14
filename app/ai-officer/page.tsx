import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { PlanCards } from "@/components/PlanCards";
import { AssistantChat } from "@/components/AssistantChat";
import { Reveal } from "@/components/Reveal";
import { MonthView, OfficerHeroCard, RoleCards } from "@/components/OfficerShowcase";
import { IconCards, TrainingLibrary, ShadowAI, CadenceBand, type IconName } from "@/components/PageVisuals";
import { BuildQueue } from "@/components/BuildQueue";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/ai-officer",
  title: "Fractional Chief AI Officer, Without the Hire · Novum AI",
  description: "A part-time Chief AI Officer for 15 to 100 person companies with no tech team: every tool connected, unlimited agents and builds, your team trained.",
});

const MONTHLY = [
  { icon: "train" as const, title: "Ongoing training", body: "Sessions and coaching for your team on their own work, as the tools change, so people keep using what you paid for." },
  { icon: "ai" as const, title: "New AI, tested for you", body: "AI tools change monthly. We test the ones that matter on your data and adopt the ones that pay off." },
  { icon: "queue" as const, title: "Agents and builds, one after another", body: "Ask for as many agents, integrations, and tools as you want. We work through them in order, each one live before the next starts. Pro runs two at once." },
  { icon: "link" as const, title: "Every tool connected", body: "Your accounting, CRM, project, and document tools wired together, Microsoft 365 and Copilot included, so data entered once shows up everywhere and the AI can see all of it." },
  { icon: "swap" as const, title: "Costly software, replaced", body: "When a SaaS tool costs more than it's worth, we build the version that fits through your build queue and hand you the code. Pro takes on full platforms." },
  { icon: "shield" as const, title: "Reporting, audits, and security", body: "A monthly report on hours saved and adoption, a list of every agent and who owns it, a quarterly audit of every tool and what it costs, plus monitoring, backups, and security updates." },
];

const FIT: { icon: IconName; tag: string; title: string; body: string }[] = [
  { icon: "noseat", tag: "No technical team", title: "Nobody owns software", body: "You run a company of 15 to 100 people, and tools get bought one at a time by whoever needed one that week." },
  { icon: "users", tag: "Team on its own", title: "AI that nobody uses", body: "The logins exist. Nobody showed the team how to use them on their actual work, so they went back to the old way." },
  { icon: "tools", tag: "Built, then stuck", title: "Systems nobody keeps current", body: "Something got built once, and now no one maintains it or adds to it as the business grows." },
];

const HONEST: { icon: IconName; title: string; body: string }[] = [
  { icon: "clock", title: "About 1 to 2 hours a month", body: "That's the training time for each person, in sessions built around the work they already do." },
  { icon: "grow", title: "A short dip after each launch", body: "For the first few weeks after something new goes live, work slows a little while people check its output against the old way. That's normal, and it's short." },
  { icon: "doc", title: "A straight answer when AI isn't it", body: "If AI isn't the right tool for a task, we'll tell you, and the discovery report says so in writing." },
];

const OWN: { icon: IconName; title: string; body: string; foot: string }[] = [
  { icon: "code", title: "The code", body: "Every agent, integration, and replacement, in a repository your company owns.", foot: "Owner: your company" },
  { icon: "db", title: "The data", body: "Every record, on accounts in your company's name, never used to train anyone's AI.", foot: "Owner: your company" },
  { icon: "key", title: "The accounts", body: "Hosting, services, and the AI account itself, set up in your company's name. You pay the AI provider at cost, with no markup.", foot: "Owner: your company" },
  { icon: "book", title: "The training library", body: "Every session recorded on your tools, with guides. Your team keeps it for good.", foot: "Owner: your company" },
];


const FAQ = [
  { q: "What is a fractional Chief AI Officer?", a: "Most companies of 15 to 100 people can't justify a full-time technical executive. We fill the role part-time. We train your team, test new AI on your data, keep your systems running, and cut tools that don't earn their price." },
  { q: "How does it start?", a: "With a paid discovery, quoted in writing by company size and tools. We map how your work moves, audit every tool you pay for (that report lands within 7 days), write your AI usage policy, train your team on its own work, and put your first build live on your data. The fee is credited toward your plan." },
  { q: "Can we just buy one project?", a: "Yes. If you don't want a plan, we scope a single build after discovery and quote it in writing: an assistant, agents, integrations, or a platform replacement. You get the same training and you own the code, data, and accounts. Most clients end up on a plan, because the next project always shows up." },
  { q: "What does 'one build at a time' mean?", a: "There's no limit on how many agents, integrations, or tools you ask for. We work on one until it's live, then start the next. Pro works on two at once. Bigger projects, like replacing a platform, are split into steps that go live one by one." },
  { q: "Do we keep what you build if we leave?", a: "Yes. Replacements, agents, and integrations are built on accounts in your company's name. The code, data, and accounts stay yours." },
  { q: "Why keep an AI Officer after the first builds?", a: "Because AI keeps moving. New models ship every few weeks and prices drop fast. Every month we check what changed and keep your agents healthy. Every quarter we move them to better or cheaper models after testing on your work, and audit your tools. Twice a year we redesign the roadmap, refresh your AI policy, and retrain the team on what's new." },
  { q: "How long is the commitment?", a: "Six months, then month to month. Your accounts, data, code, and training library stay in your company's name either way." },
  { q: "What about marketing?", a: "SEO, social reels, and explainer videos are available as an add-on, priced separately. They aren't part of the AI Officer plans." },
];

export default function AiOfficerPage() {
  return (
    <div className="home">
      <JsonLd data={[breadcrumbJsonLd([{ name: "AI Officer", path: "/ai-officer" }]), serviceJsonLd({ name: "Fractional Chief AI Officer", serviceType: "Fractional Chief AI Officer", path: "/ai-officer", description: metadata.description as string }), faqJsonLd(FAQ)]} />
      <PageHero
        eyebrow="Fractional Chief AI Officer"
        title={<>A Chief AI Officer, <span className="h-grad">without the hire</span>.</>}
        side={<OfficerHeroCard />}
        sub="Most companies of 15 to 100 people have no one whose job is AI. We take the role: agents and tools built one after another, every system connected, and your team trained every month. You own all of it."
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The problem" title="Nobody's job is AI." sub="A full-time Chief AI Officer costs more than most companies of 15 to 100 people can justify. So AI gets bought, half used, and never connected. An AI Officer makes it someone's job, part time." />
          <IconCards items={FIT} />
        </div>
      </section>

      <ShadowAI />

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="The role" title="What an AI Officer does." sub="Six jobs, all of them yours to hand off. Your plan sets how much of each you get." />
          <Reveal><RoleCards items={MONTHLY} /></Reveal>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The build queue" title="Ask for anything. It ships one after another." sub="No cap on agents, integrations, or tools. We build one until it's live and your team is trained on it, then start the next. Pro runs two at once." />
          <BuildQueue />
          <div className="pv-qproof">
            <span><strong>Software replacements go through the same queue.</strong> One client replaced a $100,000-a-year platform with a system it owns.</span>
            <Link href="/case-studies">Read the case study →</Link>
          </div>
        </div>
      </section>

      <CadenceBand />

      <section className="h-sec h-soft">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">Training, every month</div>
            <h2>Your team learns each piece as it goes live.</h2>
            <p className="pv-lead">A build nobody uses gets cancelled. So training comes with every plan, on your own tools and workflows, and every session lands in a library your team keeps.</p>
            <div className="pv-chips">
              <span><b>Growth</b> 2 sessions a month</span>
              <span><b>Pro</b> Weekly sessions and office hours</span>
              <span><b>Every plan</b> A library you keep</span>
            </div>
            <p style={{ marginTop: 22 }}><Link href="/training" className="h-more" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "none" }}>How we train →</Link></p>
          </div>
          <TrainingLibrary />
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="A month with us" title="See what each plan looks like in practice." sub="Switch between Growth and Pro. Same role, more of it on Pro, and a dedicated AI Officer." />
          <Reveal><MonthView /></Reveal>
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
          <SectionHead eyebrow="Ownership" title="Everything we build is yours." sub="On a plan or after a project, it all sits in your company's name." />
          <IconCards items={OWN} cols={4} />
        </div>
      </section>

      <section className="h-sec h-soft" id="pricing">
        <div className="h-wrap">
          <SectionHead
            eyebrow="Plans"
            title="Pick a plan. Start with a discovery."
            sub="Every plan starts with a discovery that ends with your first build live, credited toward your plan. Then six months minimum, month to month after that."
          />
          <Reveal><PlanCards /></Reveal>
          <p style={{ marginTop: 28, color: "var(--ink-2)", maxWidth: 720 }}>
            Want one project without a plan? Start with a discovery and we&apos;ll scope it in writing. Want your team trained first? Book a{" "}
            <Link href="/training" style={{ color: "inherit", fontWeight: 700 }}>training day</Link>.
          </p>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The honest part" title="What it asks of your team." sub="AI takes some effort from your people too. Here's how much." />
          <IconCards items={HONEST} />
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

      <CtaBand title="Your AI Officer starts with a discovery." body="Workflow mapped, tools audited, team trained, first build live. The fee is credited toward your plan." />
    </div>
  );
}
