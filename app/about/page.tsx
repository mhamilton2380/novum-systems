import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";

export const metadata: Metadata = {
  title: "About · Novum AI",
  description: "Novum helps operational businesses put AI to work. We teach your team, build the tools, connect your systems, and you own all of it."
};

const BELIEFS = [
  { title: "Training is the job", body: "A tool nobody knows how to use saves nothing. We teach your team on their own work before anything goes live." },
  { title: "AI should fit the work", body: "Your team shouldn't bend its workflow to a template. The tools should be built around how you already work." },
  { title: "You should own what you pay for", body: "The code, the data, and the accounts belong to you. If we part ways, nothing breaks." },
  { title: "Growth shouldn't raise your bill", body: "No seats, no revenue share. Hiring people and winning work adds nothing to your software cost." },
  { title: "AI should work on your data", body: "An assistant and agents that know your business, see only what each role allows, and never train on your records." },
  { title: "Map before you build", body: "We learn how the work moves before we write a line of code, and you get the scope and price in writing first. The discovery fee is credited toward what comes next." },
];

export default function AboutPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="About Novum"
        title={<>We built it for ourselves <span className="h-grad">first</span>.</>}
        sub="We were business owners and operators. We put AI to work in our own company before we did it for anyone else: trained the team, built the tools, connected everything. Now we do it for other businesses."
      />

      <section className="h-sec">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">Our story</div>
            <h2>Operators first, software second.</h2>
          </div>
          <div className="h-prose">
            <p>We came to software as operators, not engineers. We spent years running a business on platforms we paid for by the seat, building workarounds for the parts that never fit, and watching the bill climb every year as we grew.</p>
            <p>Then AI arrived, and the hard part turned out to be using it. Logins were easy. Getting a team to use AI on the real work, on our own data, took training and tools built around how we ran. So we did that: trained our people, built the assistant and agents, connected the tools we kept, and retired the subscriptions that cost more than owning.</p>
            <p><strong>Novum exists to do the same for other businesses:</strong> we teach your team, build the tools, connect your systems, and you own all of it.</p>
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
