import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "About · Novum AI",
  description: "Novum builds custom software businesses own, with AI built in, for a fraction of what they pay to rent it.",
};

const BELIEFS = [
  { title: "Software should fit the business", body: "Your team shouldn't bend its workflow to a template. The system should be built around how you already work." },
  { title: "You should own what you pay for", body: "The code, the data, and the accounts belong to you. If we part ways, nothing breaks." },
  { title: "Growth shouldn't raise your bill", body: "No seats, no revenue share. Hiring people and winning work adds nothing to your software cost." },
  { title: "AI should work on your data", body: "An assistant and agents that know your business, see only what each role allows, and never train on your records." },
  { title: "Map before you build", body: "We learn how the work moves before we write a line of code, and you get the scope and price in writing first." },
  { title: "Plain English, always", body: "No jargon, no slide decks. You'll always know what we're building and why." },
];

export default function AboutPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="About Novum"
        title={<>We built it for ourselves <span className="h-grad">first</span>.</>}
        sub="Novum started inside a construction company paying $100,000 a year for software that didn't fit how it worked. So we built our own. Now we build them for other businesses."
      />

      <section className="h-sec">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">Our story</div>
            <h2>Operators first, software second.</h2>
          </div>
          <div className="h-prose">
            <p>We came to software as operators. We ran construction projects on a $100,000-a-year management platform that didn't fit our billing process, and our project managers spent hours every week writing RFIs and submittals by hand.</p>
            <p>AI changed the math. Building a custom system used to cost more than renting one. Now it costs a fraction. We rebuilt ours, connected it to our billing, and put agents to work drafting the RFIs and submittals. The subscription went away, and so did the busywork.</p>
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
