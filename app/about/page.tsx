import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { USE_CASE_NAV } from "@/lib/nav";
import "./about.css";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About Novum AI · AI Implementation, Run by Operators",
  description: "Novum AI implements AI in operational businesses: training, agents, custom software, and a fractional AI Officer. Operators first. You own all of it.",
});

const STORY = [
  { k: "The starting point", t: "Software built for the average company", d: "Most operational businesses run on software paid for by the seat, with a workaround for every part that does not fit and a bill that climbs as the company grows." },
  { k: "The gap", t: "AI access is not AI use", d: "Logins are easy. Getting a team to use AI on its real work, on its own data, is where most efforts stall." },
  { k: "The method", t: "Map, build, train", d: "We train people on their own jobs, build the assistant and agents, connect the tools worth keeping, and replace what costs more than owning." },
  { k: "The result", t: "A company that owns it", d: "Code, data, accounts and know-how sit in your company's name, and one accountable lead keeps it current." },
];

const BELIEFS = [
  { title: "Training is the job", body: "A tool nobody knows how to use saves nothing. We teach your team on their own work before anything goes live.", practice: "Monthly sessions, and a recorded library your team keeps" },
  { title: "AI should fit the work", body: "Your team shouldn't bend its workflow to a template. The tools should be built around how you already work.", practice: "We map how the work moves before we build anything" },
  { title: "You should own what you pay for", body: "The code, the data, the accounts, and the training library belong to your company, in its name.", practice: "Hosting and accounts set up under your company from day one" },
  { title: "AI should keep getting better", body: "Models and tools change every few weeks. What we build gets tested against what ships, and upgraded when something better earns its place.", practice: "A monthly check on every agent and tool" },
  { title: "AI should work on your data", body: "An assistant and agents that know your business, see only what each role allows, and never train on your records.", practice: "Access limited by role, and a person approves what goes out" },
  { title: "Map before you build", body: "We learn how the work moves before we write a line of code.", practice: "Every engagement starts with a discovery" },
];

const SIGNALS = [
  "Your team already pays for AI tools nobody uses well.",
  "The work runs on several tools that don't talk to each other.",
  "You pay real money for a platform your team works around.",
];

const HOLD = [
  { k: "In person", d: "We train your team on site, on their own work." },
  { k: "Mapped first", d: "How the work moves, before any build starts." },
  { k: "First build", d: "Live on your own data, in use by your team." },
  { k: "In your name", d: "Code, data, accounts, and the training library." },
];

const WILL = [
  "Map how your work moves before we propose anything.",
  "Train your team on their own tasks and your own data.",
  "Put a person's approval in front of anything sent, filed or paid.",
  "Set up the code, data and accounts in your company's name.",
  "Test new models on your work, and move only when one beats what runs today.",
];
const WONT = [
  "Sell you a tool your team will not open after the first week.",
  "Hold your code, data or accounts as leverage.",
  "Train a model on your records.",
  "Quote a saving we have not measured on your work.",
  "Tell you a tool you already pay for is bad. Some are good at what they were built for.",
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "About", path: "/about" }])]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">About Novum</div>
          <h1>AI implementation, run by operators.</h1>
          <p className="lead">We implement AI across companies the way an operator would: map the work, build what pays, train the people, and stay accountable for the results.</p>
          <div className="ctas">
            <Link className="btn" href="/contact">Start a conversation <span aria-hidden="true">→</span></Link>
            <Link className="btn ghost" href="/how-we-work">How we work</Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="ab-story-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>Our approach</div>
          <h2 className="h2" id="ab-story-h">Operators first, <span className="mute">software second.</span></h2>
          <p className="lead">We approach this as operators. The hard part of AI was never the login.</p>
          <ol className="ab-story">
            {STORY.map((s) => (
              <li key={s.t}>
                <span className="ab-k">{s.k}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="ab-bel-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>What we believe</div>
          <h2 className="h2" id="ab-bel-h">How we build, and what it looks like on the job.</h2>
          <ol className="ab-beliefs">
            {BELIEFS.map((b, i) => (
              <li className="ab-belief" key={b.title}>
                <span className="ab-n">0{i + 1}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
                <div className="ab-p"><small>In practice</small>{b.practice}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec light" aria-labelledby="ab-fit-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Who we work with</div>
          <h2 className="h2" id="ab-fit-h">Built for the businesses <span className="mute">that run on operations.</span></h2>
          <div className="ab-fit">
            <div>
              <p className="lead" style={{ marginTop: 0 }}>For COOs, CFOs and owners of operational businesses that know AI matters and don&apos;t know how to put it to work day to day. Usually no CTO, and nobody whose job is AI.</p>
              <h3 className="ab-sub" style={{ marginTop: 36 }}>You&apos;ll recognize at least one</h3>
              <ul>{SIGNALS.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div>
              <h3>Industries we&apos;ve mapped</h3>
              <ul className="ab-ind">
                {USE_CASE_NAV.map((u) => <li key={u.slug}><Link href={`/use-cases/${u.slug}`}>{u.label}</Link></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="ab-hold-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Our word</div>
          <h2 className="h2" id="ab-hold-h">What you can <span className="mute">hold us to.</span></h2>
          <div className="ab-hold">
            {HOLD.map((h) => <div key={h.k}><b>{h.k}</b><span>{h.d}</span></div>)}
          </div>
          <div className="ab-pol">
            <div className="ab-yes"><h3>What we do</h3><ul>{WILL.map((w) => <li key={w}>{w}</li>)}</ul></div>
            <div className="ab-no"><h3>What we won&apos;t do</h3><ul>{WONT.map((w) => <li key={w}>{w}</li>)}</ul></div>
          </div>
          <div style={{ marginTop: 56 }}>
            <p className="lead" style={{ marginTop: 0 }}>Tell us how the work moves today and what the software costs. We&apos;ll tell you where AI fits, and where it doesn&apos;t.</p>
            <div className="ctas" style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <Link className="btn" href="/contact">Let&apos;s talk about your operation <span aria-hidden="true">→</span></Link>
              <Link className="btn ghost" href="/security">Security and data</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
