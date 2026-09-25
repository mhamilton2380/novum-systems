import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { USE_CASES } from "@/lib/useCases";

export const metadata: Metadata = {
  title: "Use Cases · Novum AI",
  description: "How Novum builds one system, with AI built in, for construction, field services, legal, accounting, insurance, healthcare, agencies, and manufacturing.",
};

export default function UseCasesPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Use cases"
        title={<>Built around how <span className="h-grad">your industry</span> works.</>}
        sub="Every business runs differently. Here's what one system, with AI built in, looks like across the industries we build for."
      />
      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="By industry" title="Pick yours." sub="Don't see your industry? The same five pieces fit almost any operation. Tell us how yours runs." />
          <div className="h-grid4">
            {USE_CASES.map((u) => (
              <Link href={`/use-cases/${u.slug}`} className="h-card2" key={u.slug}>
                <span className="h-card2-tag">{u.name}</span>
                <h3>{u.headline}</h3>
                <p>{u.pains[0].title}.</p>
                <div className="h-more">See the use case →</div>
              </Link>
            ))}
          </div>
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
      <CtaBand />
    </div>
  );
}
