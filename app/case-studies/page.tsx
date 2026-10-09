import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { IconCards, CaseFlow, Guarantee, type IconName } from "@/components/PageVisuals";
import { BillCard, RfiDraft, Ledger } from "@/components/UseCaseVisuals";

export const metadata: Metadata = {
  title: "Case Study · Novum AI",
  description: "How a construction company replaced a $100,000-a-year construction management subscription with a system it owns, connected to its billing, with agents drafting RFIs and submittals.",
};

const BEFORE: { icon: IconName; title: string; body: string }[] = [
  { icon: "coin", title: "$100,000 a year, every year", body: "The company paid six figures annually for a construction management platform, and the price only went up as the business grew." },
  { icon: "move", title: "Billing ran on its own system", body: "Their billing ran on a custom application and process the platform couldn't fit, so the same project data got entered twice." },
  { icon: "clock", title: "RFIs and submittals by hand", body: "Project managers spent hours every week writing RFIs and assembling submittals from drawings, specs, and field notes." },
];

const BUILT: { icon: IconName; tag: string; title: string; body: string }[] = [
  { icon: "box", tag: "Rebuilt", title: "Construction management, rebuilt", body: "We rebuilt the platform they were paying for around how they run jobs: projects, schedules, RFIs, submittals, and change orders." },
  { icon: "link", tag: "Connected", title: "Connected to their billing", body: "The new system talks to their custom billing application, so project and billing data stay in sync and their billing process didn't have to change." },
  { icon: "bot", tag: "Agents", title: "RFIs and submittals, drafted", body: "Agents draft RFIs and submittal packages from field notes and project documents. A project manager reviews, edits, and sends." },
];

const LEDGER: { icon: IconName; what: string; before: string; after: string }[] = [
  { icon: "coin", what: "The software bill", before: "$100,000 a year, rising as they grew", after: "Hosting, storage, and security, a small fraction of the old bill" },
  { icon: "link", what: "Project and billing data", before: "Typed into two systems by hand", after: "Entered once, synced to billing on its own" },
  { icon: "clock", what: "RFIs and submittals", before: "Written from scratch, hours every week", after: "Start as agent drafts. The PM reviews and sends" },
  { icon: "target", what: "How the software fits", before: "The team bent its process to the platform", after: "Built around how they already run jobs" },
  { icon: "key", what: "Who owns it", before: "Rented seats, renewed every year", after: "Code, data, and accounts in the company's name" },
  { icon: "flat", what: "Growing the business", before: "More people meant more license fees", after: "More projects and people add no license fees" },
];

export default function CaseStudyPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Case study · Construction"
        title={<>A <span className="h-grad">$100,000-a-year</span> software bill, replaced.</>}
        sub="A construction company was paying six figures a year for construction management software that didn't fit how it worked. We rebuilt it as a system they own, connected it to their custom billing application, and put agents to work drafting RFIs and submittals."
        side={<BillCard />}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Before" title="Paying top dollar for software that didn't fit." />
          <IconCards items={BEFORE} />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we built" title="One system, built around how they run projects." />
          <CaseFlow />
          <div style={{ marginTop: 18 }}><IconCards items={BUILT} /></div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap h-feature uc-feature">
          <div>
            <div className="h-eyebrow">The agents</div>
            <h2>Every RFI starts as a draft.</h2>
            <p className="h-feature-sub">The agent reads the field note, the photos, and the drawings it references, then drafts the RFI in the company&apos;s format. The project manager checks it, edits what needs editing, and sends it. Nothing leaves without a person.</p>
          </div>
          <RfiDraft />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="After" title="Lower cost, fewer hours, same process." />
          <Ledger rows={LEDGER} />
          <div style={{ marginTop: 28 }}><Guarantee compact /></div>
        </div>
      </section>

      <CtaBand title="What is your software bill buying you?" body="Bring the bill. We'll map what each tool does for you, what it costs, and what owning the important ones would take." />
    </div>
  );
}
