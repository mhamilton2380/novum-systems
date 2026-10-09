import type { Metadata } from "next";
import { PageHero } from "@/components/PageBits";
import { Assessment } from "@/components/Assessment";
import { ProductivityEvidence } from "@/components/PageVisuals";

export const metadata: Metadata = {
  title: "Free AI Readiness Score · Novum AI",
  description: "12 questions, about 2 minutes. Get a score out of 100, the three things holding your company back on AI, and an estimate of the hours on the table. No email needed to see it.",
};

export default function AssessmentPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Free · about 2 minutes"
        title={<>How ready is your company to <span className="h-grad">put AI to work</span>?</>}
        sub="12 questions, one tap each. You get a score out of 100, the three things holding you back, and an estimate of the hours your team could take back. Your results show on screen, no email needed."
        side={
          <div className="h-phero-card as-preview">
            <div className="oc-hero-h"><span className="oc-live" /><strong>AI Readiness Score</strong><em>What you get</em></div>
            <ul>
              <li><b>1</b>Your score, and where it comes from: team use, guardrails, connected systems, software spend, fit</li>
              <li><b>2</b>The three things holding you back, and what fixes each one</li>
              <li><b>3</b>The hours and dollars on the table, from published studies</li>
            </ul>
            <a href="#quiz" className="h-btn h-btn-light">Start the assessment →</a>
          </div>
        }
        ctas={false}
      />
      <section className="h-sec h-soft as-sec">
        <div className="h-wrap">
          <Assessment />
        </div>
      </section>

      <ProductivityEvidence />
    </div>
  );
}
