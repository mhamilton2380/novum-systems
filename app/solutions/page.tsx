import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { DemoPanel } from "@/components/SystemsShowcase";

export const metadata: Metadata = {
  title: "Solutions · Novum AI",
  description: "Core, Integrations, Vault, an AI Assistant, and Agents. One system for your whole operation, built around how you work.",
};

const WAYS = [
  { tag: "Replace", title: "Replace a platform", body: "Swap a subscription you've outgrown for a system built around your workflows. Your data moves over with you." },
  { tag: "Connect", title: "Connect what you have", body: "The tools that work stay. We wire them together so records move on their own and nobody re-types anything." },
  { tag: "Add AI", title: "Put AI to work", body: "An assistant that answers questions across all of it, and agents that handle the repeat work in the background." },
];

const FEATURES = [
  {
    id: "core", n: "01", name: "Core" as const,
    title: "The system your team works in all day.",
    sub: "Clients, projects, jobs, schedules, budgets, and reporting in one place, shaped around how your business actually runs.",
    checks: ["Projects, clients, or jobs tracked the way you track them", "Schedules, assignments, and approvals in one view", "A dashboard for every role, from the owner to the field", "Reports that build themselves from live data"],
    chipLabel: "Replaces", chips: ["Project management subscriptions", "Spreadsheets", "Whiteboards", "Job-tracking apps"],
  },
  {
    id: "integrations", n: "02", name: "Integrations" as const,
    title: "Keep the tools that work. Make them talk.",
    sub: "Most businesses run on a handful of tools that never share data. We connect them so one change updates everywhere.",
    checks: ["Two-way sync with accounting, CRM, email, payroll, and e-sign", "One record per client, job, and invoice across every tool", "Alerts when something changes that someone should know about", "No more copying data between systems by hand"],
    chipLabel: "Works with", chips: ["QuickBooks", "Salesforce", "HubSpot", "Outlook", "Gmail", "Google Drive", "Slack", "DocuSign", "Stripe", "Most tools with an API"],
  },
  {
    id: "vault", n: "03", name: "Vault" as const,
    title: "Every document, found in seconds.",
    sub: "Contracts, client files, drawings, and records, encrypted and searchable by what's inside them, with access set by role.",
    checks: ["Encrypted at rest and in transit", "Search by meaning, not by file name", "Access controlled by role, down to the folder", "Drop in a file and it's filed, indexed, and linked to the right record"],
    chipLabel: "Replaces", chips: ["Shared drives", "Dropbox folders", "Filing cabinets", "Email attachments"],
  },
  {
    id: "assistant", n: "04", name: "AI Assistant" as const,
    title: "Ask your business anything.",
    sub: "A plain-English assistant that knows every record in your system. It answers, shows its sources, and takes action when you ask.",
    checks: ["Questions answered across every connected system", "Every answer cites the records it came from", "Sends, drafts, and schedules on your behalf", "Only sees what the person asking is allowed to see"],
    chipLabel: "Runs on", chips: ["Your data only", "Role-based access", "Private by default"],
  },
  {
    id: "agents", n: "05", name: "Agents" as const,
    title: "AI that does the repeat work.",
    sub: "Because everything lives in one system, agents can do real work inside it, on a schedule or when something happens.",
    checks: ["Runs recurring work: follow-ups, reconciliations, reports", "Follows your rules and approval steps", "Every action logged with what it did and why", "A person signs off before money moves or anything leaves the company"],
    chipLabel: "For example", chips: ["Renewal quotes", "Invoice matching", "Missing-document chasers", "Weekly reports", "Appointment reminders"],
  },
];

export default function SolutionsPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Solutions"
        title={<>Everything your operation runs on, in <span className="h-grad">one system</span>.</>}
        sub="Five pieces that work on their own and work better together. We build the ones you need, connect the tools you keep, and put AI across all of it."
        side={
          <div className="h-stack">
            {FEATURES.map((f) => (
              <a key={f.id} href={`#${f.id}`}>
                <span className="h-stack-n">{f.n}</span>
                <span><b>{f.name}</b><br /><small>{f.title}</small></span>
              </a>
            ))}
          </div>
        }
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Where to start" title="Three ways in." sub="Every company starts somewhere different. Most end up doing all three." />
          <div className="h-ways">
            {WAYS.map((w) => (
              <div className="h-way" key={w.tag}>
                <div className="h-way-tag">{w.tag}</div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
          <div className="h-both">Most companies do all three</div>
        </div>
      </section>

      {FEATURES.map((f, i) => (
        <section className={`h-sec${i % 2 === 0 ? " h-soft" : ""}`} id={f.id} key={f.id} style={{ scrollMarginTop: 80 }}>
          <div className={`h-wrap h-feature${i % 2 === 1 ? " flip" : ""}`}>
            <div>
              <div className="h-eyebrow">{f.n} · {f.name}</div>
              <h2>{f.title}</h2>
              <p className="h-feature-sub">{f.sub}</p>
              <ul className="h-checks">{f.checks.map((c) => <li key={c}>{c}</li>)}</ul>
              <div className="h-chiprow">
                <small>{f.chipLabel}</small>
                {f.chips.map((c) => <span key={c}>{c}</span>)}
              </div>
            </div>
            <DemoPanel name={f.name} />
          </div>
        </section>
      ))}

      <CtaBand />
    </div>
  );
}
