import type { Metadata } from "next";
import Link from "next/link";
import { USE_CASES } from "@/lib/useCases";
import { REPEAT_WORK, firmHours } from "@/lib/nv/useCaseExtras";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import "./use-cases.css";

export const metadata: Metadata = pageMetadata({
  path: "/use-cases",
  title: "AI Use Cases by Industry: Agents and Training · Novum AI",
  description: "AI agents, training and custom software for ten industries, from construction, legal and accounting to insurance, manufacturing and distribution.",
});

export default function UseCasesPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Use Cases", path: "/use-cases" }])]} />
      <section className="phero">
        <div className="wrap">
          <div className="label">Industries</div>
          <h1>AI at work in your industry.</h1>
          <p className="lead">Every business runs differently. These are the ten industries we&apos;ve mapped, the repeat work each one carries, and where AI takes the hours back. Novum implements AI across departments in any operational business, so if yours is not listed, the same method applies.</p>
          <div className="ctas">
            <Link className="btn" href="/contact">Start a conversation</Link>
            <Link className="btn ghost" href="/assessment">Take the AI Readiness Score</Link>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>By industry</div>
          <h2 className="h2">Ten industries, <span className="mute">one method.</span></h2>
          <p className="lead">Each page is a sector brief: the situation, the work AI takes on, what gets connected and what gets replaced and what manual work goes away, and how an engagement starts.</p>
          <div className="uc-index" role="list">
            <div className="uc-head" aria-hidden="true"><span>No.</span><span>Industry and where AI helps</span><span>Repeat work it carries</span><span>Example day</span><span /></div>
            {USE_CASES.map((u, i) => (
              <Link key={u.slug} href={`/use-cases/${u.slug}`} className="uc-row" role="listitem">
                <span className="uc-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{u.name}</h3>
                  <span className="uc-sub">{u.headline}.</span>
                </div>
                <span className="uc-work">{REPEAT_WORK[u.slug]}</span>
                <span className="uc-hrs">{firmHours(u.departments)} hrs a week<small>for a firm of about 120</small></span>
                <span className="uc-go" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <p className="uc-note">The example day on each page is illustrative: four agent tasks with the time each returns, drawn from the work that industry repeats. Real figures are measured in discovery on your own data.</p>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap uc-others">
          <div className="uc-case-l">
            <div className="label"><span className="ix">02</span>Not on the list</div>
            <h2 className="h2">Other industries <span className="mute">are welcome.</span></h2>
            <p className="lead">The work is the same wherever the business runs on repeat paperwork: finance, accounting, underwriting, operations, admin, sales and HR. Tell us how yours runs and we map it the same way.</p>
            <p><Link className="link" href="/contact">Tell us how yours runs <span aria-hidden="true">→</span></Link></p>
          </div>
          <div>
            <div className="label">Results</div>
            <h3 style={{ fontSize: "clamp(24px,2.2vw,32px)", letterSpacing: "-0.035em", fontWeight: 500, marginTop: 18 }}>A $100,000-a-year platform bill, replaced.</h3>
            <p className="lead" style={{ marginTop: 14 }}>A construction company swapped its project management platform for a system it owns, connected to its billing, with agents drafting PCOs, RFIs, submittal reviews and billing for a project manager to review. They now pay only hosting, storage and security.</p>
            <div className="uc-case-r" style={{ marginTop: 28 }}>
              <div><small>Before</small><strong>$100,000 a year for a project management platform</strong></div>
              <div><small>After</small><strong>A system they own, connected to their billing, with agents drafting paperwork a project manager reviews</strong></div>
            </div>
            <p style={{ marginTop: 26 }}><Link className="link" href="/case-studies">Read the results <span aria-hidden="true">→</span></Link></p>
          </div>
        </div>
      </section>

      <section className="sec light contact" id="contact" aria-labelledby="contact-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="contact-h">Your industry, your workflow.</h2>
            <p className="lead">Every engagement starts from how your teams actually work. A first call covers where the hours go and where AI fits. We reply the same business day.</p>
          </div>
          <ContactForm source="Industries" />
        </div>
      </section>
    </main>
  );
}
