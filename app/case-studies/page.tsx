import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Case Study · Novum AI",
  description: "How a construction company replaced a $100,000-a-year software subscription with a system it owns.",
};

const BEFORE = [
  { title: "Six tools, none of them talking", body: "Projects, budgets, documents, and reporting each lived in a different tool. Getting a full picture meant pulling from all of them by hand." },
  { title: "Budget to actual was a manual job", body: "Comparing job costs to budget meant exporting from accounting and rebuilding the numbers in a spreadsheet every time someone asked." },
  { title: "Reporting took a week", body: "Owner and investor reports were assembled from scratch each cycle, from accounting, spreadsheets, and email." },
  { title: "Documents only one person could find", body: "Years of contracts, drawings, and correspondence sat in a folder structure that made sense to whoever built it." },
];

const BUILT = [
  { tag: "Core", title: "Projects run in one system", body: "Every job, budget, schedule, and change order in one place, with a dashboard for leadership and one for each project manager." },
  { tag: "Integrations", title: "Accounting connected", body: "Job costs flow in from accounting on their own, so budget to actual is always current." },
  { tag: "Vault", title: "Every document, searchable", body: "Contracts, drawings, and records encrypted, organized by project, and searchable by what's inside them." },
  { tag: "AI Assistant", title: "Answers in plain English", body: "The team asks about any project or document and gets the answer, with the source, in seconds." },
];

const RESULTS = [
  { title: "The subscription is gone", body: "The $100,000-a-year platform was replaced. After the build, they pay for hosting, storage, and security, a small fraction of the old bill." },
  { title: "Six tools became one system", body: "One place for projects, documents, and reporting, connected to the accounting they already used." },
  { title: "Reporting went from a week to a day", body: "Reports now pull from live data instead of being rebuilt by hand every cycle." },
  { title: "Any project's history in under a minute", body: "Ask the assistant and it pulls the contract, the change orders, and the numbers, with links to each." },
  { title: "They own it", body: "The code, the data, and the accounts it runs on are in the company's name. No seats, no renewal." },
  { title: "It grows with them", body: "More projects and more people add no new license fees." },
];

export default function CaseStudyPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Case study · Construction"
        title={<>A <span className="h-grad">$100,000-a-year</span> software bill, replaced.</>}
        sub="A construction company was paying six figures a year for project management software that didn't fit how it worked. We built them a system they own, connected it to their accounting, and put an AI assistant on top."
        side={
          <div className="h-phero-card h-stats">
            <div><strong>$100,000/yr</strong><small>Subscription replaced</small></div>
            <div><strong>6 → 1</strong><small>Disconnected tools into one system</small></div>
            <div><strong>A week → a day</strong><small>Reporting turnaround</small></div>
            <div><strong>Under 60 sec</strong><small>To pull any project&apos;s full history</small></div>
          </div>
        }
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Before" title="A growing company held together by spreadsheets and memory." />
          <div className="h-grid4">
            {BEFORE.map((b) => (
              <div className="h-card2" key={b.title}><h3>{b.title}</h3><p>{b.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we built" title="One system, built around how they run projects." />
          <div className="h-grid4">
            {BUILT.map((b) => (
              <div className="h-card2" key={b.tag}><span className="h-card2-tag">{b.tag}</span><h3>{b.title}</h3><p>{b.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="After" title="The company runs like a much larger one." />
          <div className="h-grid3">
            {RESULTS.map((r) => (
              <div className="h-card2" key={r.title}><h3>{r.title}</h3><p>{r.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Paying for software that doesn't fit?" />
    </div>
  );
}
