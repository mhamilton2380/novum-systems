import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "About · Novum AI",
  description: "Novum builds custom software businesses own, with AI built in, for a fraction of what they pay in subscriptions.",
};

const BELIEFS = [
  { title: "Software should fit the business", body: "Your team shouldn't bend its workflow to a template. The system should be built around how you already work." },
  { title: "You should own what you pay for", body: "The code, the data, and the accounts belong to you. If we part ways, nothing breaks." },
  { title: "Growth shouldn't raise your bill", body: "No seats, no revenue share. Hiring people and winning work adds nothing to your software cost." },
  { title: "AI should work on your data", body: "An assistant and agents that know your business, see only what each role allows, and never train on your records." },
  { title: "Map before you build", body: "We learn how the work moves before we write a line of code, and you get the scope and price in writing first. The discovery fee comes off your build." },
  { title: "Plain English, always", body: "No jargon, no slide decks. You'll always know what we're building and why." },
];

export default function AboutPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="About Novum"
        title={<>We built it for ourselves <span className="h-grad">first</span>.</>}
        sub="We were business owners and operators, paying every year for software that never fit how we worked. So we built our own. Now we build them for other businesses."
      />

      <section className="h-sec">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">Our story</div>
            <h2>Operators first, software second.</h2>
          </div>
          <div className="h-prose">
            <p>We came to software as operators, not engineers. We spent years running a business on platforms we paid for by the seat, building workarounds for the parts that never fit, and watching the bill climb every year as we grew.</p>
            <p>AI changed the math. A custom system used to cost more than a subscription, so almost nobody built one. Now it costs a fraction, and the calculation runs the other way. We built our own, retired the subscriptions, and handed the repetitive work to agents that run in the background.</p>
            <p><strong>Novum exists to do the same for other businesses:</strong> one system for the whole operation, built around how you work, with AI built in, that you own outright.</p>
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we believe" title="How we build." />
          <div className="h-grid3">
            {BELIEFS.map((b) => (
              <div className="h-card2" key={b.title}><h3>{b.title}</h3><p>{b.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Let's talk about your operation." />
    </div>
  );
}
