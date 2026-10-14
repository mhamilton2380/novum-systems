import type { Metadata } from "next";
import Link from "next/link";
import { Assessment } from "@/components/nv/as/Assessment";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/assessment",
  title: "Free AI Readiness Assessment: Score in 2 Minutes · Novum AI",
  description: "12 questions, about 2 minutes. Get a score out of 100, the three things holding your company back on AI, and the hours on the table. No email needed to see it.",
});

export default function AssessmentPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "AI Readiness Score", path: "/assessment" }])]} />
      <section className="phero">
        <div className="wrap">
          <div className="label">Free · about 2 minutes</div>
          <h1>How ready is your company to put AI to work?</h1>
          <p className="lead">12 questions, one tap each. You get a score out of 100, the three things holding you back, and an estimate of the hours your team could take back. Your results show on screen, no email needed.</p>
          <div className="ctas"><a href="#quiz" className="btn">Start the assessment <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section className="sec light" aria-label="AI Readiness Score">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>What you get</div>
          <h2 className="h2" style={{ marginBottom: 40 }}>A score, three flags, <span className="mute">and the hours on the table.</span></h2>
          <div className="finds" style={{ marginBottom: 56 }}>
            <div><b>Your score</b><span>And where it comes from: team use, guardrails, connected systems, software spend, fit.</span></div>
            <div><b>Three things holding you back</b><span>And what fixes each one.</span></div>
            <div><b>Hours on the table</b><span>The hours and dollars of staff time, from published studies.</span></div>
          </div>
          <Assessment />
          <div className="as-evidence">
            <div className="finds">
              <div><b>25% to 56%</b><span>less time per task in controlled studies</span></div>
              <div><b>About $0.01</b><span>for an agent to key an invoice, against $1.89 for a person</span></div>
              <div><b>About 3%</b><span>time saved when people get AI tools with no training</span></div>
            </div>
            <p className="fine"><Link href="/why-ai" style={{ textDecoration: "underline" }}>Where the numbers come from</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
