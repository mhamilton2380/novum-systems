import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { TrainingBooking } from "./TrainingBooking";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";
import "./training.css";

export const metadata: Metadata = pageMetadata({
  path: "/training",
  title: "AI Training for Employees, On Your Own Work · Novum AI",
  description: "Hands-on AI training on your team's own tools and data: live sessions every month, a recorded library you keep, and an on-site training day when you want one.",
});

// Training is built into every AI Officer engagement, never sold as an advisory retainer; the on-site day is the add-on.
// What the engagement includes: lib/aiOfficerPlans.ts. Positioning: ~/Desktop/Novum/novum-vault/CONTEXT.md.
const PROGRAM = [
  { tag: "Built in · monthly", title: "Live sessions every month", body: "Your team trains on your own tools and workflows, and on each assistant and agent as it goes live, so what gets built gets used." },
  { tag: "Built in · yours", title: "A library you keep", body: "Every session recorded on your own tools, with written guides, updated monthly. Your team keeps it for good, like the code." },
  { tag: "Bigger teams", title: "A team challenge", body: "Departments compete to build the most useful AI workflow for their own job, or a two-week challenge for smaller teams." },
  { tag: "Add-on", title: "A day on site", body: "Five hours in the room with your team, to kick things off or as a first step." },
];

// Evidence: from the productivity evidence doc, as on the live page.
const STUDIES = [
  { n: "40%", t: "less time writing reports and emails, with quality up 18%", s: "MIT, Science, 2023" },
  { n: "7.5 days", t: "sooner to close the books at accounting firms using AI", s: "Stanford and MIT, 2025" },
  { n: "34%", t: "more issues resolved per hour by the newest support staff", s: "Quarterly Journal of Economics, 2025" },
  { n: "About 3%", t: "time saved when workers were handed a chatbot and nothing else", s: "University of Chicago, 25,000 workers" },
];

const TYPES = [
  { name: "Law firm", tasks: ["Summarize a 40-page lease into the terms that matter", "Draft a client status letter from the matter notes", "Pull every deadline out of a scheduling order"], agent: "Intake agent: new matter emails turned into a conflict check" },
  { name: "100-person distributor", tasks: ["Turn a customer PO email into an order entry draft", "Compare three supplier quotes line by line", "Write a backorder update from the inventory report"], agent: "Order entry agent: purchase orders drafted into order entry" },
  { name: "Accounting firm", tasks: ["Write the missing-documents email for every client at once", "Summarize a new client's prior-year return", "Build a month-end checklist from last year's notes"], agent: "Document chase agent: follows up until the file is complete" },
  { name: "Field service company", tasks: ["Write a job summary from a technician's notes", "Answer \"where's my tech?\" from the dispatch board", "Turn a service history into a maintenance proposal"], agent: "Dispatch update agent: customers told when the tech is running late" },
];

const LESSONS = [
  { t: "Your intake assistant, start to finish", m: "8 min", tag: "New" },
  { t: "Drafting client updates from your notes", m: "6 min" },
  { t: "Month-end in QuickBooks, with AI", m: "11 min" },
  { t: "What stays private: your AI usage policy", m: "5 min" },
  { t: "Reviewing what an agent drafted", m: "7 min" },
];

const TEAMS = [
  { n: "Operations", w: 6, top: "Job summary agent" },
  { n: "Finance", w: 5, top: "Invoice follow-up drafts" },
  { n: "Sales", w: 4, top: "Proposal first drafts" },
  { n: "Customer service", w: 3, top: "Order-status answers" },
];

const COVERED = [
  { title: "How AI actually works", body: "Plain English. What it does well, where it fails, and how to ask so it gives you something usable." },
  { title: "The tools that matter for you", body: "Which AI tools are worth your team's time for your kind of business, and what to use when." },
  { title: "Hands-on, on your work", body: "Your team practices on tasks from their own week, so they leave knowing what to try on Monday." },
  { title: "Agents worth building", body: "Which repeat jobs an agent should take over first, and what each would save." },
  { title: "What stays private", body: "What data is safe to put where, and when a person has to check the AI's work." },
  { title: "Guides they keep", body: "Written guides for every tool covered, so the day doesn't fade by Friday." },
];

const FAQ = [
  { q: "Who is it for?", a: "Everyone on the team. It works for a single team of ten and for a department of seventy. We tailor the examples to your company type, so a law firm and a distributor see different things." },
  { q: "Where does it happen?", a: "We come to your team. Tell us your location in the form and we'll confirm the details when we lock in the date." },
  { q: "Is training sold separately?", a: "Training is built into every AI Officer engagement, because a build nobody uses gets cancelled. The on-site day is the one piece you can book on its own." },
  { q: "What's in the training library?", a: "Recordings of your sessions on your own tools, plus written guides for each assistant and agent. It's updated every month, and it belongs to your company like the code and the data." },
  { q: "How does booking work?", a: "Tell us your company type, team size, and preferred dates. We reply the same business day with a written quote and open dates. Nothing is charged until you approve it." },
];

export default function TrainingPage() {
  return (
    <main id="training">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Training", path: "/training" }]), serviceJsonLd({ name: "AI training for teams", serviceType: "AI training", path: "/training", description: metadata.description as string }), faqJsonLd(FAQ)]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">AI training</div>
          <h1>Training on your own work, so your team uses the AI.</h1>
          <p className="lead">We train in person, and an AI Officer keeps it going on your own tools and workflows: live sessions every month, a recorded library your team keeps for good, and challenges that get departments building. Want a day in the room? Add an on-site training day.</p>
          <div className="ctas">
            <a className="btn" href="#book">Request a training day <span aria-hidden="true">→</span></a>
            <Link className="btn ghost" href="/how-we-work">How training fits the work</Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="tr-prog-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>How we train</div>
          <h2 className="h2" id="tr-prog-h">A login is not a skill.</h2>
          <p className="lead">Most teams get an AI tool and a link to the help docs, try it twice, and go back to the old way. Training comes with the build, so what we build gets used.</p>
          <div className="caps4">
            {PROGRAM.map((p) => (
              <div className="cap flip" key={p.title}>
                <span className="meta">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="tr-ev-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>What the studies measured</div>
          <h2 className="h2" id="tr-ev-h">Same AI. <span className="mute">Very different results.</span></h2>
          <p className="lead">On the right tasks, with people trained to use it, controlled studies measure big gains. Give people AI tools with no training, and the numbers barely move.</p>
          <div className="tr-ev">
            {STUDIES.map((x, i) => (
              <div key={x.n} className={i === 3 ? "tr-ev-low" : undefined}>
                <b>{x.n}</b>
                <p>{x.t}</p>
                <span className="src">{x.s}</span>
              </div>
            ))}
          </div>
          <p className="fine">The first three are trained use on the right tasks. The last is what happens with a login and nothing else. <Link className="link" href="/why-ai">See all the numbers <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="tr-types-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Built from your work</div>
          <h2 className="h2" id="tr-types-h">Your tools. Your workflows.</h2>
          <p className="lead">Every session uses the work your team already does, so a law firm and a distributor practice on different things. Four examples of what a team practices on, and the first build worth making.</p>
          <div className="caps4 tr-types">
            {TYPES.map((t) => (
              <div className="cap" key={t.name}>
                <span className="meta">Your team practices on</span>
                <h3>{t.name}</h3>
                <ul>{t.tasks.map((x) => <li key={x}>{x}</li>)}</ul>
                <p className="tr-agent"><span className="meta">First build worth building</span>{t.agent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="tr-lib-h">
        <div className="wrap own2 tr-split">
          <div>
            <div className="label"><span className="ix">04</span>The training library</div>
            <h2 className="h2" id="tr-lib-h">Your team keeps what it learns.</h2>
            <p className="lead">Every session is recorded on your own tools and filed with written guides for each assistant and agent. New people learn from it on day one. It&apos;s updated every month, and like the code and the data, it belongs to your company.</p>
          </div>
          <div className="paper tr-paper">
            <div className="paper-h"><b>Training library · your company</b><span>Example</span></div>
            <table className="ptable">
              <thead><tr><th>Lesson, recorded on your tools</th><th className="tr-r">Length</th></tr></thead>
              <tbody>
                {LESSONS.map((l) => (
                  <tr key={l.t}><td>{l.t}{l.tag && <span className="tr-new">{l.tag}</span>}</td><td className="tr-r">{l.m}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="fine tr-pfine">Updated every month. Yours to keep, like the code.</p>
          </div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="tr-ch-h">
        <div className="wrap own2 tr-split">
          <div>
            <div className="label"><span className="ix">05</span>Team challenge</div>
            <h2 className="h2" id="tr-ch-h">Make it a competition.</h2>
            <p className="lead">For bigger teams, departments compete to build the most useful AI workflow for their own job. Smaller teams run a two-week challenge. The best workflows go into your library, and the winners show everyone else how they did it.</p>
          </div>
          <figure className="tr-board" aria-label="Example team challenge leaderboard">
            <div className="tr-board-h"><span>Team challenge</span><span className="meta">Example · workflows built</span></div>
            <table>
              <thead><tr><th>Team</th><th className="tr-r">Built</th><th>Best workflow</th></tr></thead>
              <tbody>
                {TEAMS.map((t, i) => (
                  <tr key={t.n}>
                    <td>{t.n}{i === 0 && <span className="tr-first">1st</span>}</td>
                    <td className="tr-r">{t.w}</td>
                    <td>{t.top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </figure>
        </div>
      </section>

      <section className="sec light" aria-labelledby="tr-day-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Add-on</div>
          <h2 className="h2" id="tr-day-h">Want a day on site?</h2>
          <p className="lead">A five-hour training day in the room with your team. Book it to kick things off, or on its own as a first step.</p>
          <div className="panel tr-panel">
            <span className="meta">What the day covers</span>
            <div className="gov">
              {COVERED.map((c) => (
                <div key={c.title}><h4>{c.title}</h4><p>{c.body}</p></div>
              ))}
            </div>
          </div>
          <TrainingBooking />
        </div>
      </section>

      <section className="sec rule" aria-labelledby="tr-faq-h">
        <div className="wrap tr-faqwrap">
          <div>
            <div className="label"><span className="ix">07</span>Questions</div>
            <h2 className="h2" id="tr-faq-h">What people ask first.</h2>
          </div>
          <div className="tr-faq">
            {FAQ.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="tr-next-h">
        <div className="wrap">
          <div className="first">
            <div><span className="meta">After the training</span><h3 id="tr-next-h">Ready to build on what they learned?</h3></div>
            <div>
              <p>A discovery maps how your work moves and puts a working tool on your own data. Your team will already know how to use it.</p>
              <div className="tr-next">
                <Link className="btn" href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
                <Link className="link" href="/how-we-work">How we work <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
