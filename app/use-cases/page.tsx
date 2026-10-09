import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { USE_CASES } from "@/lib/useCases";
import { IndustryTicker, IndustryCards } from "@/components/PageVisuals";

export const metadata: Metadata = {
  title: "Use Cases · Novum AI",
  description: "How Novum puts AI to work in construction, field services, legal, accounting, insurance, healthcare, agencies, manufacturing, and wholesale distribution.",
};

export default function UseCasesPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Use cases"
        title={<>AI at work in <span className="h-grad">your industry</span>.</>}
        sub="Every business runs differently. Here's where AI saves the most time across the industries we work with, and what we build to get it there."
        side={<IndustryTicker cases={USE_CASES} />}
      />
      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="By industry" title="Pick yours." sub="Don't see your industry? The same building blocks fit almost any operation. Tell us how yours runs." />
          <IndustryCards cases={USE_CASES} />
        </div>
      </section>
      <section className="h-sec h-soft">
        <div className="h-wrap">
          <Link href="/case-studies" className="h-case" style={{ textDecoration: "none" }}>
            <div className="h-case-l">
              <div className="h-eyebrow">Case study · Construction</div>
              <h3>A $100,000-a-year software bill, replaced.</h3>
              <p>A construction company swapped its construction management subscription for a system it owns, connected to its billing, with agents drafting RFIs and submittals.</p>
              <span className="h-btn h-btn-ghost">Read the case study →</span>
            </div>
            <div className="h-case-r">
              <div><small>Before</small><strong>$100,000 a year for construction management software</strong></div>
              <div><small>After</small><strong>A system they own, connected to their billing, with agents drafting RFIs and submittals</strong></div>
            </div>
          </Link>
        </div>
      </section>
      <CtaBand title="Your industry, your workflow." body="Every build starts from how your team actually works. A discovery maps it and puts the first agent live within 30 days." />
    </div>
  );
}
