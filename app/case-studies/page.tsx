import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "Case Study · Novum AI",
  description: "How a construction company replaced a $100,000-a-year construction management subscription with a system it owns, connected to its billing, with agents drafting RFIs and submittals.",
};

const BEFORE = [
  { title: "$100,000 a year in rent", body: "The company paid six figures a year for a construction management platform, and the price only went up as the business grew." },
  { title: "Billing ran on its own system", body: "Their billing ran on a custom application and process the platform couldn't fit, so the same project data got entered twice." },
  { title: "RFIs and submittals by hand", body: "Project managers spent hours every week writing RFIs and assembling submittals from drawings, specs, and field notes." },
];

const BUILT = [
  { tag: "Core", title: "Construction management, rebuilt", body: "We rebuilt the platform they were renting around how they run jobs: projects, schedules, RFIs, submittals, and change orders." },
  { tag: "Integrations", title: "Connected to their billing", body: "The new system talks to their custom billing application, so project and billing data stay in sync and their billing process didn't have to change." },
  { tag: "Agents", title: "RFIs and submittals, drafted", body: "Agents draft RFIs and submittal packages from field notes and project documents. A project manager reviews, edits, and sends." },
];

const RESULTS = [
  { title: "The subscription is gone", body: "The $100,000-a-year platform was replaced. After the build, they pay for hosting, storage, and security, a small fraction of the old bill." },
  { title: "No more double entry", body: "Project data flows into billing on its own, so nobody re-types the same numbers into two systems." },
  { title: "Hours back every week", body: "RFIs and submittals that took project managers hours now start as drafts. The team reviews instead of writing from scratch." },
  { title: "Built around their process", body: "The software fits how they already work, including the billing process they'd built up over years." },
  { title: "They own it", body: "The code, the data, and the accounts it runs on are in the company's name. No seats, no renewal." },
  { title: "It grows with them", body: "More projects and more people add no new license fees." },
];

export default function CaseStudyPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Case study · Construction"
        title={<>A <span className="h-grad">$100,000-a-year</span> software bill, replaced.</>}
        sub="A construction company was paying six figures a year for construction management software that didn't fit how it worked. We rebuilt it as a system they own, connected it to their custom billing application, and put agents to work drafting RFIs and submittals."
        side={
          <div className="h-phero-card h-stats">
            <div><strong>$100,000/yr</strong><small>Construction management subscription replaced</small></div>
            <div><strong>Billing, connected</strong><small>Integrated with their custom billing application</small></div>
            <div><strong>RFIs and submittals</strong><small>Drafted by agents, reviewed by the team</small></div>
          </div>
        }
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Before" title="Paying top dollar for software that didn't fit." />
          <div className="h-grid3">
            {BEFORE.map((b) => (
              <div className="h-card2" key={b.title}><h3>{b.title}</h3><p>{b.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we built" title="One system, built around how they run projects." />
          <div className="h-grid3">
            {BUILT.map((b) => (
              <div className="h-card2" key={b.tag}><span className="h-card2-tag">{b.tag}</span><h3>{b.title}</h3><p>{b.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="After" title="Lower cost, fewer hours, same process." />
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
