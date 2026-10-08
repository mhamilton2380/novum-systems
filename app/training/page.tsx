import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { TrainingBooking } from "./TrainingBooking";

export const metadata: Metadata = {
  title: "AI Training Day · Novum AI",
  description: "A 5-hour AI training day for your team, tailored to your company type. We show your people the AI tools that matter, how they work, what to use and when, and which agents to build. Request a quote.",
};

const COVERED = [
  { title: "How AI actually works", body: "Plain English. What it does well, where it fails, and how to ask so it gives you something usable." },
  { title: "The tools that matter for you", body: "Which AI tools are worth your team's time for your kind of business, and what to use when." },
  { title: "Hands-on, on your work", body: "Your team practices on tasks from their own week, so they leave knowing what to try on Monday." },
  { title: "Agents worth building", body: "Which repeat jobs in your company an agent should take over first, and what each would save." },
  { title: "Rules of the road", body: "What data is safe to put where, and when a person has to review the AI's work." },
];

const FAQ = [
  { q: "Who is it for?", a: "Everyone on the team. It works for a ten-person shop and for a department of seventy. We tailor the examples to your company type, so a law firm and a roofer see different things." },
  { q: "Where does it happen?", a: "We come to your team. Tell us your location in the form and we'll confirm the details when we lock in the date." },
  { q: "What happens after?", a: "Your team knows what to use and when, and you have a short list of agents worth building first. If you want them built, that's what a discovery and an AI Officer are for." },
  { q: "How does booking work?", a: "Tell us your company type, team size, and preferred dates. We reply within one business day with a written quote and open dates. Nothing is charged until you approve it." },
];

export default function TrainingPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Training day"
        title={<>Five hours that get your team <span className="h-grad">using AI</span>.</>}
        sub="We come to your team and show them the AI tools that matter for your kind of business, how they work, what to use and when, and which agents to build first. Tell us your company type and team size and we send a quote."
        ctas={false}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="What we cover" title="One day, built around your company type." />
          <div className="h-grid3">
            {COVERED.map((c) => (
              <div className="h-card2" key={c.title}><h3>{c.title}</h3><p>{c.body}</p></div>
            ))}
          </div>
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

      <CtaBand title="Want it built, not just taught?" body="Start with a discovery. We map how your work moves, put your first agent live within 30 days, and you can move onto an AI Officer from there." />
    </div>
  );
}
