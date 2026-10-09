import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { IconCards, TrainingHeroCard, TrainingLibrary, TeamChallenge, EvidenceBand, type IconName } from "@/components/PageVisuals";
import { CompanyTypes } from "@/components/CompanyTypes";
import { TrainingBooking } from "./TrainingBooking";

export const metadata: Metadata = {
  title: "AI Training · Novum AI",
  description: "Training comes with every AI Officer plan: live sessions every month on your own tools and workflows, a recorded training library your team keeps for good, and team challenges. Add an on-site training day when you want one.",
};

// Training is built into every plan, never sold as an advisory retainer; the on-site day is the add-on (and the way to start before a plan fits).
// What each plan includes: lib/aiOfficerPlans.ts. Positioning: ~/Desktop/Novum/novum-vault/CONTEXT.md.
const PROGRAM: { icon: IconName; tag: string; title: string; body: string }[] = [
  { icon: "clock", tag: "Every plan", title: "Live sessions every month", body: "Your team trains on your own tools and workflows, and on each assistant and agent as it goes live, so what gets built gets used." },
  { icon: "book", tag: "Every plan", title: "A library you keep", body: "Every session recorded on your own tools, with written guides, updated monthly. Your team keeps it for good, like the code." },
  { icon: "grow", tag: "Bigger teams", title: "A team challenge", body: "Departments compete to build the most useful AI workflow for their own job, or a two-week challenge for smaller teams." },
  { icon: "users", tag: "Add-on", title: "A day on site", body: "Five hours in the room with your team, to kick off a plan or to get started before a plan fits the budget." },
];

const COVERED: { icon: IconName; title: string; body: string }[] = [
  { icon: "ai", title: "How AI actually works", body: "Plain English. What it does well, where it fails, and how to ask so it gives you something usable." },
  { icon: "tools", title: "The tools that matter for you", body: "Which AI tools are worth your team's time for your kind of business, and what to use when." },
  { icon: "hand", title: "Hands-on, on your work", body: "Your team practices on tasks from their own week, so they leave knowing what to try on Monday." },
  { icon: "bot", title: "Agents worth building", body: "Which repeat jobs an agent should take over first, and what each would save." },
  { icon: "shield", title: "What stays private", body: "What data is safe to put where, and when a person has to check the AI's work." },
  { icon: "doc", title: "Guides they keep", body: "Written guides for every tool covered, so the day doesn't fade by Friday." },
];

const FAQ = [
  { q: "Who is it for?", a: "Everyone on the team. It works for a ten-person shop and for a department of seventy. We tailor the examples to your company type, so a law firm and a roofer see different things." },
  { q: "Where does it happen?", a: "We come to your team. Tell us your location in the form and we'll confirm the details when we lock in the date." },
  { q: "Is training sold separately?", a: "Training comes with every AI Officer plan, because a build nobody uses gets cancelled. The on-site day is the one piece you can book on its own: as an add-on to a plan, or as a start before a plan fits the budget." },
  { q: "What's in the training library?", a: "Recordings of your sessions on your own tools, plus written guides for each assistant and agent. It's updated every month, and it belongs to your company like the code and the data." },
  { q: "How does booking work?", a: "Tell us your company type, team size, and preferred dates. We reply within one business day with a written quote and open dates. Nothing is charged until you approve it." },
];

export default function TrainingPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="AI training"
        title={<>Training that makes the AI <span className="h-grad">stick</span>.</>}
        sub="We train in person, and every AI Officer plan keeps it going on your own tools and workflows: live sessions every month, a recorded library your team keeps for good, and challenges that get departments building. Want a day in the room? Add an on-site training day."
        side={<TrainingHeroCard />}
        ctas={false}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="How we train" title="A login is not a skill." sub="Most teams get an AI tool and a link to the help docs, try it twice, and go back to the old way. Training comes with the build, so what we build gets used." />
          <IconCards items={PROGRAM} cols={4} />
        </div>
      </section>

      <EvidenceBand />

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="Built from your work" title="Your tools. Your workflows." sub="Every session uses the work your team already does, so a law firm and a roofer practice on different things." />
          <CompanyTypes />
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">The training library</div>
            <h2>Your team keeps what it learns.</h2>
            <p className="pv-lead">Every session is recorded on your own tools and filed with written guides for each assistant and agent. New people learn from it on day one. It&apos;s updated every month, and like the code and the data, it belongs to your company.</p>
          </div>
          <TrainingLibrary />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap h-feature">
          <TeamChallenge />
          <div>
            <div className="h-eyebrow">Team challenge</div>
            <h2>Make it a competition.</h2>
            <p className="pv-lead">For bigger teams, departments compete to build the most useful AI workflow for their own job. Smaller teams run a two-week challenge. The best workflows go into your library, and the winners show everyone else how they did it.</p>
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Add-on" title="Want a day on site?" sub="A five-hour training day in the room with your team. Add it to a plan to kick things off, or book it on its own to get started before a plan fits the budget." />
          <IconCards items={COVERED} />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <TrainingBooking />
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Questions" title="What people ask first." center />
          <div className="h-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Ready to build on what they learned?" body="A discovery maps how your work moves and puts the first build live on your own data within 30 days. Your team will already know how to use it." />
    </div>
  );
}
