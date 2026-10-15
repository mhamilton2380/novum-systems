import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { RowReveal } from "@/components/nv/RowReveal";
import { WorkPicker } from "@/components/nv/wy/WorkPicker";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import "./why-ai.css";

// Client-facing evidence, all from "How Much Faster AI Makes the Work" (2026-10-08):
// https://claude.ai/code/artifact/ebae361d-f31e-471a-b67f-977d9ded0e2e. Vendor and company-reported figures are labeled.
export const metadata: Metadata = pageMetadata({
  path: "/why-ai",
  title: "Does AI Save Time at Work? What Studies Measured · Novum AI",
  description: "Controlled studies measured 25% to 56% less time on work that suits AI. Agents cost cents per task. Handing people a chatbot moves the needle about 3%.",
});

// ─── data, ported from the live page and components/WhyAi.tsx ───────────────
const FINDINGS = [
  { n: "25% to 56%", t: "Less time per task on work that suits AI, once people are trained.", s: "Controlled studies, incl. MIT and Harvard with BCG, 2023" },
  { n: "About 3%", t: "Time saved when people get AI tools with no training.", s: "University of Chicago, 25,000 workers" },
  { n: "About $0.01", t: "For an agent to key one invoice, against about $1.89 for a person.", s: "Task time is our estimate; BLS wages; published model prices" },
  { n: "About 4 months", t: "How often the length of task an agent finishes on its own has doubled since 2023.", s: "METR" },
  { n: "60% to 70%", t: "Right answers with AI on a task outside its strengths, against 84.5% without it.", s: "Harvard and BCG, 2023" },
];

const TASKS = [
  { t: "Key one invoice into the system", n: "Spot-check a sample", p: 1.89, pl: "4 minutes, about $1.89", a: 0.01, al: "About $0.01" },
  { t: "Draft a two-page memo", n: "Review is most of the real cost", p: 24.5, pl: "45 minutes, about $24.50", a: 5.46, al: "About $0.02, plus 10 minutes of review (about $5.44)" },
  { t: "Handle a three-minute phone call", n: "Answers any hour, many calls at once", p: 1.54, pl: "About $1.54", a: 0.42, al: "About $0.33 to $0.42" },
];

const WAGES = [
  { r: "Receptionist", h: 26.1, y: "$54,305" },
  { r: "Data entry keyer", h: 28.4, y: "$59,063" },
  { r: "Customer service rep", h: 30.76, y: "$63,963" },
  { r: "Administrative assistant", h: 32.66, y: "$67,920" },
  { r: "Dispatcher", h: 34.57, y: "$71,921" },
  { r: "Bookkeeping clerk", h: 34.8, y: "$72,392" },
  { r: "Cargo and freight agent", h: 35.9, y: "$74,664" },
  { r: "Financial analyst", h: 70.58, y: "$146,785" },
];
const WAGE_MAX = 80;

const CALLS = [
  { t: "2:04 a.m.", w: "Carrier check call, load 4471", r: "On time, logged", s: "Agent" },
  { t: "7:15 a.m.", w: "Customer: where's my order?", r: "Answered from the order system", s: "Agent" },
  { t: "9:32 a.m.", w: "Billing dispute", r: "Handed to a person", s: "Person" },
  { t: "11:48 a.m.", w: "Service visit request", r: "Visit requested for Thursday, confirmed by dispatch", s: "Agent" },
];

const VOICE = [
  { n: "18%", d: "of freight booked with no human involved, and every call answered", c: "Circle Logistics", l: "Vendor-reported" },
  { n: "Hours to minutes", d: "rep time on carrier calls and email, from 3 to 4 hours a day", c: "ARL Network", l: "Vendor-reported" },
  { n: "40% to 90%", d: "of inbound carrier calls handled fully, tasks from 15 to 20 minutes down to about 5", c: "Freight brokers on WireBee", l: "Vendor-reported" },
  { n: "8x", d: "faster to resolve customer service calls in the first phase", c: "Revolut", l: "Vendor-reported" },
];

const CHOICES = [
  { t: "Pick the tasks", b: "Drafting, compiling reports, data entry and routine admin sit well inside what AI does. Judgment calls on unfamiliar problems sit outside it, and that's where results got worse." },
  { t: "Put it on your own data", b: "A chatbot that can't see your files and systems saves minutes. An assistant and agents connected to them take over the routine steps, and a person approves the result." },
  { t: "Train people, keep a reviewer", b: "The least experienced staff gain the most, once they know where AI is wrong. The time spent reviewing drafts sets the real speedup." },
];

// ─── METR doubling curve ─────────────────────────────────────────────────────
// Task length the best agents finish half the time: about 12 hours by May 2026, doubling about every 4 months.
// Earlier points are back-calculated from that doubling rate, so they're approximate.
function DoublingChart() {
  const W = 600, H = 320, P = { l: 52, r: 24, t: 24, b: 44 };
  const t0 = 2023, t1 = 2026.4, endMin = 720;
  const y = (t: number) => endMin * Math.pow(2, (t - t1) / (4 / 12));
  const X = (t: number) => P.l + ((t - t0) / (t1 - t0)) * (W - P.l - P.r);
  const Y = (m: number) => H - P.b - (m / endMin) * (H - P.t - P.b);
  const pts = Array.from({ length: 69 }, (_, k) => t0 + (k / 68) * (t1 - t0));
  const d = pts.map((t, k) => `${k ? "L" : "M"}${X(t).toFixed(1)},${Y(y(t)).toFixed(1)}`).join(" ");
  const marks = [
    { t: 2024, l: "about 5 min" },
    { t: 2025, l: "about 40 min" },
    { t: 2026, l: "about 5 hrs" },
    { t: 2026.4, l: "about 12 hrs" },
  ];
  return (
    <figure className="wy-chart">
      <div className="wy-chart-h"><b>Length of task an agent finishes on its own</b><span className="meta">Half the time · METR</span></div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Curve: about 5 minutes in 2024, 40 minutes in 2025, 5 hours in 2026, 12 hours by May 2026">
        {[0, 3, 6, 9, 12].map((h) => (
          <g key={h}>
            <line x1={P.l} x2={W - P.r} y1={Y(h * 60)} y2={Y(h * 60)} className="wy-grid" />
            <text x={P.l - 10} y={Y(h * 60) + 4} textAnchor="end" className="wy-axis">{h}h</text>
          </g>
        ))}
        {[2023, 2024, 2025, 2026].map((t) => <text key={t} x={X(t)} y={H - 16} textAnchor="middle" className="wy-axis">{t}</text>)}
        <path d={`${d} L${X(t1)},${Y(0)} L${X(t0)},${Y(0)} Z`} className="wy-area" />
        <path d={d} fill="none" className="wy-line" strokeWidth="3" strokeLinecap="round" pathLength={1} />
        {marks.map((m) => (
          <g key={m.t}>
            <circle cx={X(m.t)} cy={Y(y(m.t))} r="5" className="wy-dot" strokeWidth="2.5" />
            <text x={X(m.t) - 10} y={Y(y(m.t)) - 12} textAnchor="end" className="wy-mark-l">{m.l}</text>
          </g>
        ))}
      </svg>
      <figcaption className="wy-src">The May 2026 point is from METR; earlier points are back-calculated from its doubling rate of about 4 months. Software and research tasks, so read it as direction for office work.</figcaption>
    </figure>
  );
}

export default function WhyAiPage() {
  return (
    <main className="wy">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Why AI", path: "/why-ai" }])]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">Why implement AI</div>
          <h1>What AI actually does to the work.</h1>
          <p className="lead">On work that suits AI, controlled studies measure 25% to 56% less time per task. Give people AI tools with no training, and it&apos;s closer to 3%. Here&apos;s what the research and real companies measured, with every source named.</p>
          <div className="ctas">
            <Link className="btn" href="/assessment">Find your number <span aria-hidden="true">→</span></Link>
            <Link className="btn ghost" href="/contact">Start a conversation</Link>
          </div>
        </div>
      </section>

      {/* 01 summary: thesis, the three-ways chart, key findings */}
      <section className="sec light" aria-labelledby="wy-sum-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>Summary</div>
          <h2 className="h2" id="wy-sum-h">The same tool, three results. <span className="mute">The task and the training decide which one you get.</span></h2>
          <div className="wy-sum">
            <figure className="wy-three" aria-label="Time to do the same task: no AI, AI tools with no training, or trained on the right task">
              <div className="wy-three-h"><span className="meta">Same task, three ways</span><span className="meta">Time it takes</span></div>
              <div className="wy-three-row">
                <div className="wy-three-l"><b>No AI</b><small>The baseline</small></div>
                <div className="wy-three-t"><i className="base" style={{ width: "100%" }} /><em>100%</em></div>
              </div>
              <div className="wy-three-row">
                <div className="wy-three-l"><b>AI tools, no training</b><small>About 3% saved · University of Chicago</small></div>
                <div className="wy-three-t"><i className="flat" style={{ width: "97%" }} /><em>About 97%</em></div>
              </div>
              <div className="wy-three-row">
                <div className="wy-three-l"><b>Trained, on the right task</b><small>25% to 56% saved · controlled studies</small></div>
                <div className="wy-three-t"><i className="win" style={{ width: "44%" }} /><i className="rng" style={{ left: "44%", width: "31%" }} /><em>44% to 75%</em></div>
              </div>
              <div className="wy-three-scale" aria-hidden="true"><span /><div>{[0, 25, 50, 75, 100].map((t) => <i key={t} style={{ left: `${t}%` }}>{t}%</i>)}</div></div>
              <figcaption>The difference is the task you pick and whether the team was trained.</figcaption>
            </figure>
            <div className="wy-keys">
              <span className="meta">Key findings</span>
              <ol>
                {FINDINGS.map((f, k) => (
                  <li key={f.n}>
                    <span className="wy-k-ix">{String(k + 1).padStart(2, "0")}</span>
                    <div><b>{f.n}</b><p>{f.t}</p><small>{f.s}</small></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 02 by type of work: the one interactive element */}
      <section className="sec light" aria-labelledby="wy-type-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>By type of work</div>
          <h2 className="h2" id="wy-type-h">On work that suits AI, the time drops by a quarter to a half.</h2>
          <p className="lead">Pick a kind of work. Every figure comes from a randomized trial, a field study at real companies, or a published company result, and company numbers are marked.</p>
          <WorkPicker />
          <p className="fine">Two patterns hold across the studies: the least experienced people gain the most, often two to three times as much, and the gains only show up on tasks that suit AI.</p>
        </div>
      </section>

      {/* 03 cost per task */}
      <section className="sec light" aria-labelledby="wy-cost-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Cost per task</div>
          <h2 className="h2" id="wy-cost-h">An agent costs cents per task. <span className="mute">A person in the same seat costs dollars.</span></h2>
          <p className="lead">Agents rarely take over a whole job, so the useful comparison is one task at a time. Task times are our estimates; agent costs use published model and voice prices.</p>
          <div className="wy-costs">
            <RowReveal selector=".wy-cost" />
            {TASKS.map((x) => (
              <div key={x.t} className="wy-cost">
                <div className="wy-cost-h"><b>{x.t}</b><span>{x.n}</span></div>
                <div className="wy-cost-bar wy-person"><span>A person</span><div className="wy-track"><i style={{ width: "100%" }} /></div><em>{x.pl}</em></div>
                <div className="wy-cost-bar wy-agent"><span>An agent</span><div className="wy-track"><i style={{ width: `${Math.max(0.8, (x.a / x.p) * 100)}%` }} /></div><em>{x.al}</em></div>
              </div>
            ))}
            <p className="wy-src">Bars are scaled within each task: the person&apos;s cost is the full bar. Person: value of staff time, not cash.</p>
          </div>
          <div className="wy-split">
            <div>
              <h3 className="wy-h3">The real cost of the agent is the setup.</h3>
              <p>The per-task prices leave out the fixed work: building the agent, connecting it to your systems, monitoring it, and keeping it current. That&apos;s what an AI Officer covers.</p>
              <p>The numbers favor agents on high-volume, repeatable tasks: invoices, intake, scheduling, status calls. On judgment work, the agent does the first pass: it reads the file, pulls the facts, flags the risks, and recommends a call. Your people make the decision, and make more of them in the same hours.</p>
            </div>
            <figure className="wy-wages">
              <div className="wy-chart-h"><b>What the person costs</b><span className="meta">Wage plus benefits, per hour</span></div>
              <div className="wy-wage-axis" aria-hidden="true"><span /><div>{[0, 20, 40, 60, 80].map((t) => <i key={t} style={{ left: `${(t / WAGE_MAX) * 100}%` }}>${t}</i>)}</div><span /></div>
              {WAGES.map((w) => (
                <div key={w.r} className="wy-wage">
                  <span>{w.r}</span>
                  <div className="wy-track"><i style={{ width: `${(w.h / WAGE_MAX) * 100}%` }} /></div>
                  <em>${w.h.toFixed(2)}<small>{w.y} a year</small></em>
                </div>
              ))}
              <figcaption className="wy-src">BLS median wages, May 2025, with benefits at 1.43 times the wage. Recruiting, training, and supervision come on top.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 04 phone calls and data entry (dark: AI at work) */}
      <section className="sec rule" aria-labelledby="wy-call-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Phone calls and data entry</div>
          <h2 className="h2" id="wy-call-h">Where agents take over the routine work.</h2>
          <div className="wy-split wy-split-c">
            <p className="lead">On calls, intake, and data entry, an agent handles the routine steps under rules you set. Anything outside those rules, and every outbound message, waits for a person.</p>
            <figure className="wy-calls" aria-label="Example call log for a phone agent">
              <div className="wy-calls-h"><b>Phone agent</b><span className="meta">Example day</span></div>
              <table>
                <tbody>
                  {CALLS.map((c) => (
                    <tr key={c.t} className={c.s === "Person" ? "human" : ""}>
                      <td className="wy-call-t">{c.t}</td>
                      <td><b>{c.w}</b><small>{c.r}</small></td>
                      <td className="wy-call-s">{c.s}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <figcaption>Every call opens by saying it&apos;s an AI, and anyone can ask for a person.</figcaption>
            </figure>
          </div>
          <div className="wy-voice">
            <div className="wy-voice-h"><span className="meta">Published results from phone and service agents</span></div>
            <table className="wy-tbl">
              <thead><tr><th>Result</th><th>What was measured</th><th>Company</th><th>Source type</th></tr></thead>
              <tbody>
                {VOICE.map((v) => (
                  <tr key={v.c}><td className="wy-tbl-n">{v.n}</td><td>{v.d}</td><td>{v.c}</td><td className="wy-tbl-l">{v.l}</td></tr>
                ))}
                <tr className="warn">
                  <td className="wy-tbl-n">Two-thirds, then a step back</td>
                  <td>Klarna&apos;s assistant handled two-thirds of chats in its first month. The company later hired people again when quality slipped. Cost alone is the wrong target.</td>
                  <td>Klarna</td>
                  <td className="wy-tbl-l">Company-reported</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="gov wy-rules">
            <div><h4>Customers have a say</h4><p>64% of consumers said they would prefer companies not use AI for service. Calls with carriers and vendors are a different audience, and still need testing.</p><small className="wy-src">Gartner, 2024</small></div>
            <div><h4>The law applies</h4><p>The FCC treats AI voices as artificial under robocall law, so outbound AI calls need prior consent. Opening every call by saying it&apos;s an AI covers the known rules.</p><small className="wy-src">FCC 24-17, 2024</small></div>
            <div><h4>A way out, every time</h4><p>Every call needs a handoff to a person on request, and someone reviewing a sample of calls each week.</p><small className="wy-src">How we set them up</small></div>
          </div>
        </div>
      </section>

      {/* 05 longer work */}
      <section className="sec light" aria-labelledby="wy-long-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Longer work</div>
          <h2 className="h2" id="wy-long-h">The tasks agents finish on their own keep getting longer.</h2>
          <div className="wy-split wy-split-long">
            <div>
              <p className="lead">The length of task an AI agent can finish alone has doubled about every 4 months since 2023.</p>
              <div className="wy-mini">
                <div><b>47.6%</b><span>of real 7-hour deliverables from 44 occupations matched or beat the expert&apos;s work, graded blind</span></div>
                <div><b>1.1x to 1.4x</b><span>the real speedup once the expert&apos;s review and fixes are counted, which is why a person approves the output</span></div>
              </div>
              <p className="wy-src">OpenAI GDPval, October 2025</p>
            </div>
            <DoublingChart />
          </div>
        </div>
      </section>

      {/* 06 where it goes wrong (dark) */}
      <section className="sec rule" aria-labelledby="wy-wrong-h">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Where it goes wrong</div>
          <h2 className="h2" id="wy-wrong-h">Handing people a chatbot moves the numbers very little.</h2>
          <p className="lead">The big gains come from three choices: picking tasks that suit AI, connecting it to your own data, and training people on where it fails. Skip them and the results look like this.</p>
          <div className="wy-wrong">
            <div className="wy-w">
              <div className="wy-w-h"><b>AI tools, no training</b><span className="meta">Time saved</span></div>
              <div className="wy-meter"><div className="wy-track"><i className="red" style={{ width: "3%" }} /></div><span>about 3%</span></div>
              <div className="wy-meter"><div className="wy-track"><i className="green" style={{ left: "25%", width: "31%" }} /></div><span>25% to 56% when trained, on the right task</span></div>
              <small className="wy-src">University of Chicago, 25,000 workers · controlled studies</small>
            </div>
            <div className="wy-w">
              <div className="wy-w-h"><b>The wrong task</b><span className="meta">Right answers</span></div>
              <div className="wy-meter"><div className="wy-track"><i className="base" style={{ width: "84.5%" }} /></div><span>84.5% without AI</span></div>
              <div className="wy-meter"><div className="wy-track"><i className="red" style={{ width: "60%" }} /><i className="redr" style={{ left: "60%", width: "10%" }} /></div><span>60% to 70% with AI, and the wrong answers read as more polished</span></div>
              <small className="wy-src">Harvard and BCG, 2023</small>
            </div>
            <div className="wy-w wy-ours">
              <div className="wy-w-h"><b>Operating work</b><span className="meta">Client results</span></div>
              <div className="wy-pair"><span><b>10 hours</b> to <b>1.5 hours</b></span><small>Bank draw applications, per application (a construction company)</small></div>
              <div className="wy-pair"><span><b>4 hours</b> to <b>15 minutes</b></span><small>Submittal review, per submittal (a construction company)</small></div>
              <small className="wy-src">From our client work. Per-task times, not a study.</small>
            </div>
          </div>
          <p className="fine">Meters run from 0 to 100%. The striped segment marks the range a study reported.</p>
        </div>
      </section>

      {/* 07 what this means */}
      <section className="sec light" aria-labelledby="wy-choice-h">
        <div className="wrap">
          <div className="label"><span className="ix">07</span>What this means for your team</div>
          <h2 className="h2" id="wy-choice-h">Three choices decide whether you land in the 25% to 56% range or near 3%.</h2>
          <ol className="wy-choices">
            {CHOICES.map((c, k) => (
              <li key={c.t} className="flip">
                <span className="wy-k-ix">{String(k + 1).padStart(2, "0")}</span>
                <h3>{c.t}</h3>
                <p>{c.b}</p>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 36 }}><Link className="link" href="/ai-implementation">How we implement AI <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      {/* close: find your number */}
      <section className="sec rule contact" aria-labelledby="wy-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="wy-cta-h">Find your number.</h2>
            <p className="lead">The free AI Readiness Score gives you an estimate in two minutes. A discovery measures the real number on your own work, and ends with your first build live.</p>
            <div className="alt">
              <Link className="btn" href="/assessment">Take the AI Readiness Score <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <ContactForm source="Why AI page" />
        </div>
      </section>
    </main>
  );
}
