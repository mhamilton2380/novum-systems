import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { AboutHeroCard, Guarantee, type IconName } from "@/components/PageVisuals";
import { StoryTrack, FitPanel, Beliefs, HoldUsTo } from "@/components/AboutVisuals";

export const metadata: Metadata = {
  title: "About · Novum AI",
  description: "Novum helps operational businesses put AI to work. We teach your team, build the tools, connect your systems, and you own all of it."
};

const BELIEFS: { icon: IconName; title: string; body: string; practice: string }[] = [
  { icon: "users", title: "Training is the job", body: "A tool nobody knows how to use saves nothing. We teach your team on their own work before anything goes live.", practice: "Monthly sessions, and a recorded library your team keeps" },
  { icon: "target", title: "AI should fit the work", body: "Your team shouldn't bend its workflow to a template. The tools should be built around how you already work.", practice: "We map how the work moves before we build anything" },
  { icon: "key", title: "You should own what you pay for", body: "The code, the data, the accounts, and the training library belong to your company, in its name.", practice: "Hosting and accounts set up under your company from day one" },
  { icon: "flat", title: "Growth shouldn't raise your bill", body: "No seats, no revenue share. Hiring people and winning work adds nothing to your software cost.", practice: "A build, then hosting. No per-person pricing" },
  { icon: "db", title: "AI should work on your data", body: "An assistant and agents that know your business, see only what each role allows, and never train on your records.", practice: "Access limited by role, and a person approves what goes out" },
  { icon: "map", title: "Map before you build", body: "We learn how the work moves before we write a line of code, and you get the scope and price in writing first.", practice: "The discovery fee is credited toward what comes next" },
];

export default function AboutPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="About Novum"
        title={<>We built it for ourselves <span className="h-grad">first</span>.</>}
        sub="We were business owners and operators. We put AI to work in our own company before we did it for anyone else: trained the team, built the tools, connected everything. Now we do it for other businesses."
        side={<AboutHeroCard />}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Our story" title="Operators first, software second." sub="We came to this as operators, not engineers. The hard part of AI was never the login." />
          <StoryTrack />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="Who we work with" title="Built for the businesses that run on operations." />
          <FitPanel />
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="What we believe" title="How we build, and what it looks like on the job." />
          <Beliefs items={BELIEFS} />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="Our word" title="What you can hold us to." />
          <HoldUsTo />
          <div style={{ marginTop: 24 }}><Guarantee compact /></div>
        </div>
      </section>

      <CtaBand title="Let's talk about your operation." body="Tell us how the work moves today and what the software costs. We'll tell you where AI fits, and where it doesn't." />
    </div>
  );
}
