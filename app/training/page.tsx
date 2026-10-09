import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { IconCards, TrainingHeroCard, TrainingLibrary, TeamChallenge, type IconName } from "@/components/PageVisuals";
import { CompanyTypes } from "@/components/CompanyTypes";
import { TrainingBooking } from "./TrainingBooking";

export const metadata: Metadata = {
  title: "AI Training · Novum AI",
  description: "Get your team using AI on the real work: a five-hour on-site training day built from your own work, live sessions every month, and a recorded training library on your own tools that your team keeps for good.",
};

// How training runs: the day starts it, the plan keeps it going (see lib/aiOfficerPlans.ts for what each plan includes).
const PROGRAM: { icon: IconName; tag: string; title: string; body: string }[] = [
  { icon: "users", tag: "Day one", title: "A training day, on site", body: "Five hours with your team, built from the work they do every week. Everyone leaves knowing what to use and when." },
  { icon: "clock", tag: "Every month", title: "Live sessions on your tools", body: "On a plan, your team trains on the assistant and agents as they go live, so what gets built gets used." },
  { icon: "book", tag: "Yours to keep", title: "A training library", body: "Every session recorded on your own tools, with written guides, updated monthly. Your team keeps it for good, like the code." },
  { icon: "grow", tag: "Bigger teams", title: "A team challenge", body: "Departments compete to build the most useful AI workflow for their own job, or a two-week challenge for smaller teams." },
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
  { q: "Can we book just the training day?", a: "Yes. Many teams start with the day, then move onto an AI Officer plan once they see what to build. The plan is where the monthly sessions and the library come in." },
  { q: "What's in the training library?", a: "Recordings of your sessions on your own tools, plus written guides for each assistant and agent. It's updated every month, and it belongs to your company like the code and the data." },
  { q: "How does booking work?", a: "Tell us your company type, team size, and preferred dates. We reply within one business day with a written quote and open dates. Nothing is charged until you approve it." },
];

export default function TrainingPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="AI training"
        title={<>Get your team <span className="h-grad">using AI</span> on the real work.</>}
        sub="It starts with a five-hour day on site, built from your team's own work. On a plan it keeps going: live sessions every month, and a recorded library on your own tools that your team keeps for good."
        side={<TrainingHeroCard />}
        ctas={false}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="How we train" title="A login is not a skill." sub="Most teams get an AI tool and a link to the help docs, try it twice, and go back to the old way. We train on your work until it sticks." />
          <IconCards items={PROGRAM} cols={4} />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="Built for your company" title="Same five hours. Different company." sub="We build the examples from your company type, so a law firm and a roofer practice on different work." />
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
          <SectionHead eyebrow="The training day" title="What five hours covers." />
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

      <CtaBand title="Ready to build on what they learned?" body="A discovery maps how your work moves and puts the first agent live on your own data within 30 days. Your team will already know how to use it." />
    </div>
  );
}
