import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { UseCase } from "@/lib/useCases";

// Visuals for the inner pages (Training, About, How We Work, Case Study, Use Cases, Contact, AI Implementation).
// Same language as the home page and the AI Officer hero: glass cards on navy, checks that pop in, live dots, icon cards.
// Styles live in app/visuals.css (prefix pv-); hero step lists reuse the .oc-hero styles.

// ─── icons (24px, stroked) ──────────────────────────────────────────────────
export const ICONS = {
  ai: "M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z",
  tools: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z",
  hand: "M9 11V5a2 2 0 0 1 4 0v5M13 10V8a2 2 0 0 1 4 0v3M17 11a2 2 0 0 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3l-3-5a2 2 0 0 1 3-2l2 2",
  bot: "M5 9h14v10H5zM12 5v4M9 13h.01M15 13h.01M9 16h6",
  shield: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01",
  key: "M15 7a4 4 0 1 1-3.5 6H9v2H7v2H4v-3l6.1-6.1A4 4 0 0 1 15 7zM16 9.5h.01",
  flat: "M3 17h18M3 12l5-3 4 3 4-3 5 3",
  db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M16 11a2.5 2.5 0 1 0 0-5M18 15c2 .5 3 2 3 5",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  check: "M20 6L9 17l-5-5",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  noseat: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M17 8l4 4M21 8l-4 4",
  lock: "M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  box: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  move: "M4 7h12l-3-3M20 17H8l3 3",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5V21h16",
  coin: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5",
  grow: "M3 20h18M7 16v-4M12 16V8M17 16V5",
  // industries
  construction: "M3 18h18M5 18v-3a7 7 0 0 1 14 0v3M10 8V5h4v3",
  "field-services": "M3 6h11v10H3zM14 9h4l3 3v4h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  legal: "M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z",
  accounting: "M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01",
  insurance: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z",
  healthcare: "M12 21s-8-5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6-8 11-8 11zM12 9v5M9.5 11.5h5",
  "marketing-agencies": "M3 11v3l12 5V6zM15 9a3 3 0 0 1 0 6M6 14l1 5h3l-1-4",
  manufacturing: "M3 21V10l6 4V10l6 4V6h6v15zM7 17h2M12 17h2M17 17h2",
  "wholesale-distribution": "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5",
} as const;
export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

// ─── icon cards: the plain text grids, upgraded ─────────────────────────────
type CardItem = { icon: IconName; title: string; body: string; tag?: string; foot?: string };
export function IconCards({ items, cols = 3 }: { items: CardItem[]; cols?: 2 | 3 | 4 }) {
  return (
    <Reveal>
      <div className={`oc-roles pv-cols${cols}`}>
        {items.map((m, i) => (
          <div className="oc-role pv-card rv-item" key={m.title} style={{ ["--i" as string]: i }}>
            <span className="oc-role-icon"><Icon name={m.icon} /></span>
            {m.tag && <span className="h-card2-tag">{m.tag}</span>}
            <h3>{m.title}</h3>
            <p>{m.body}</p>
            {m.foot && <span className="pv-owner"><Icon name="check" size={14} />{m.foot}</span>}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

// ─── hero step list (same look as the AI Officer hero card) ─────────────────
export function HeroSteps({ title, tag, items, label }: { title: string; tag: string; label: string; items: { t: string; d: string; s: string }[] }) {
  return (
    <div className="h-phero-card oc-hero" aria-label={label}>
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>{title}</strong>
        <em>{tag}</em>
      </div>
      <ul>
        {items.map((w, i) => (
          <li key={w.t} style={{ ["--i" as string]: i }}>
            <b aria-hidden="true">✓</b>
            <span><strong>{w.t}</strong><small>{w.d}</small></span>
            <i>{w.s}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Training hero: a team lighting up, and the program that keeps it going ──
const PROGRAM = [
  { t: "Live sessions", d: "On your own tools and workflows", s: "Monthly" },
  { t: "Training library", d: "Recorded on your tools, updated monthly", s: "Yours" },
  { t: "Team challenge", d: "Departments build their own workflows", s: "Live" },
];
export function TrainingHeroCard() {
  return (
    <div className="h-phero-card pv-train" aria-label="Training on every plan: live sessions every month, a library you keep, and team challenges">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Your team</strong>
        <em>On every plan</em>
      </div>
      <div className="pv-team" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }}>
            <svg viewBox="0 0 40 40"><circle cx="20" cy="16" r="7" /><path d="M6 40c0-9 6-13 14-13s14 4 14 13z" /></svg>
          </span>
        ))}
      </div>
      <ul className="pv-tasks">
        {PROGRAM.map((p, i) => (
          <li key={p.t} style={{ ["--i" as string]: i }}><b aria-hidden="true">✓</b><span><strong>{p.t}</strong><small>{p.d}</small></span><i>{p.s}</i></li>
        ))}
      </ul>
    </div>
  );
}

// ─── Training: the recorded library the team keeps ──────────────────────────
const LESSONS = [
  { t: "Your intake assistant, start to finish", m: "8 min", tag: "New" },
  { t: "Drafting client updates from your notes", m: "6 min" },
  { t: "Month-end in QuickBooks, with AI", m: "11 min" },
  { t: "What stays private: your AI usage policy", m: "5 min" },
  { t: "Reviewing what an agent drafted", m: "7 min" },
];
export function TrainingLibrary() {
  return (
    <div className="pv-lib" aria-label="Example of a recorded training library">
      <div className="h-demo-bar"><span className="pv-dots" aria-hidden="true"><i /><i /><i /></span>Training library · your company</div>
      <div className="pv-lib-body">
        <div className="pv-lib-feature" aria-hidden="true">
          <div className="pv-lib-play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg></div>
          <div className="pv-lib-wave">{Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}</div>
          <span className="pv-lib-badge">Recorded on your tools</span>
        </div>
        <ul>
          {LESSONS.map((l, i) => (
            <li key={l.t} style={{ ["--i" as string]: i }}>
              <span className="pv-lib-thumb" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 7.5v9l7.5-4.5z" /></svg></span>
              <span className="pv-lib-t">{l.t}{l.tag && <em>{l.tag}</em>}</span>
              <small>{l.m}</small>
            </li>
          ))}
        </ul>
        <div className="pv-lib-foot"><Icon name="key" size={16} />Updated every month. Yours to keep, like the code.</div>
      </div>
    </div>
  );
}

// ─── Training: a team challenge (department hackathon) ──────────────────────
const TEAMS = [
  { n: "Operations", w: 6, top: "Job summary agent" },
  { n: "Finance", w: 5, top: "Invoice follow-up drafts" },
  { n: "Sales", w: 4, top: "Proposal first drafts" },
  { n: "Customer service", w: 3, top: "Order-status answers" },
];
export function TeamChallenge() {
  const max = Math.max(...TEAMS.map((t) => t.w));
  return (
    <Reveal>
      <div className="pv-board" aria-label="Example team challenge leaderboard">
        <div className="pv-board-h"><strong>Team challenge</strong><em>Example · workflows built</em></div>
        {TEAMS.map((t, i) => (
          <div className="pv-board-row rv-item" key={t.n} style={{ ["--i" as string]: i, ["--w" as string]: `${(t.w / max) * 100}%` }}>
            <span className="pv-board-n">{i === 0 && <b aria-hidden="true">1st</b>}{t.n}</span>
            <span className="pv-board-bar"><i /></span>
            <span className="pv-board-v">{t.w}</span>
            <small>Best: {t.top}</small>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

// ─── About hero: what changed in our own company ────────────────────────────
const OURS = [
  { b: "A seat on every platform", a: "Software we own" },
  { b: "Data spread across five tools", a: "Connected, one source" },
  { b: "AI logins nobody used", a: "A team trained on real work" },
  { b: "Repeat work done by hand", a: "Agents draft, we approve" },
];
export function AboutHeroCard() {
  return (
    <div className="h-phero-card pv-ours" aria-label="What changed in our own company">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Our own company</strong>
        <em>Before → after</em>
      </div>
      <ul>
        {OURS.map((o, i) => (
          <li key={o.a} style={{ ["--i" as string]: i }}>
            <s>{o.b}</s>
            <span className="pv-arrow" aria-hidden="true">→</span>
            <strong>{o.a}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── How We Work hero: the first 30 days ────────────────────────────────────
const DAYS = [
  { d: "Day 1", t: "Kickoff", s: "Workflow mapped with your team" },
  { d: "Day 7", t: "Tool and cost report", s: "Every subscription, what it costs" },
  { d: "Day 30", t: "First build live", s: "On your own data, in use" },
];
export function ThirtyDayCard() {
  return (
    <div className="h-phero-card pv-days" aria-label="The first 30 days of a discovery">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Discovery</strong>
        <em>First 30 days</em>
      </div>
      <div className="pv-track" aria-hidden="true"><i /></div>
      <ol>
        {DAYS.map((x, i) => (
          <li key={x.d} style={{ ["--i" as string]: i }}>
            <b>{x.d}</b>
            <strong>{x.t}</strong>
            <small>{x.s}</small>
          </li>
        ))}
      </ol>
      <div className="pv-days-foot"><span>Then</span> a written plan with prices for what comes next</div>
    </div>
  );
}

// ─── Use Cases hero: agents at work across industries ───────────────────────
export function IndustryTicker({ cases }: { cases: UseCase[] }) {
  const rows = cases.map((u) => ({ slug: u.slug, name: u.name, task: u.agents[0]?.task ?? "", saved: u.agents[0]?.saved ?? "" }));
  return (
    <div className="h-phero-card pv-ticker" aria-label="Examples of agents at work across industries">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Agents at work</strong>
        <em>Example day</em>
      </div>
      <div className="pv-ticker-win">
        <ul>
          {[...rows, ...rows].map((r, i) => (
            <li key={i} aria-hidden={i >= rows.length}>
              <span className="pv-ind"><Icon name={r.slug as IconName} size={16} /></span>
              <span><em>{r.name}</em>{r.task}</span>
              <b>{r.saved}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IndustryCards({ cases }: { cases: UseCase[] }) {
  return (
    <Reveal>
      <div className="pv-inds">
        {cases.map((u, i) => (
          <Link href={`/use-cases/${u.slug}`} className="pv-indcard rv-item" key={u.slug} style={{ ["--i" as string]: i }}>
            <div className="pv-indcard-h">
              <span className="oc-role-icon"><Icon name={u.slug as IconName} /></span>
              <span className="h-card2-tag">{u.name}</span>
            </div>
            <h3>{u.headline}</h3>
            <p>{u.pains[0].title}.</p>
            {u.agents[0] && (
              <div className="pv-indcard-agent"><span className="oc-live" aria-hidden="true" />{u.agents[0].task}</div>
            )}
            <div className="h-more">See the use case →</div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

// ─── Case study: the same work, before and after ────────────────────────────
export function CaseFlow() {
  return (
    <Reveal>
      <div className="pv-flow">
        <div className="pv-flow-panel pv-before rv-item" style={{ ["--i" as string]: 0 }}>
          <div className="pv-flow-h"><span>Before</span>Two systems, typed twice</div>
          <div className="pv-flow-row">
            <div className="pv-node"><Icon name="box" size={18} /><strong>Construction platform</strong><em className="pv-cost">$100,000/yr</em></div>
            <div className="pv-link pv-link-bad" aria-hidden="true"><i /></div>
            <div className="pv-node pv-node-person"><Icon name="users" size={18} /><strong>Re-typed by hand</strong><em>Same project data</em></div>
            <div className="pv-link pv-link-bad" aria-hidden="true"><i /></div>
            <div className="pv-node"><Icon name="coin" size={18} /><strong>Billing app</strong><em>Custom, their own</em></div>
          </div>
          <div className="pv-flow-sub"><Icon name="clock" size={16} />RFIs and submittals written from scratch, hours every week</div>
        </div>
        <div className="pv-flow-panel pv-after rv-item" style={{ ["--i" as string]: 1 }}>
          <div className="pv-flow-h"><span>After</span>One system they own, in sync</div>
          <div className="pv-flow-row">
            <div className="pv-node pv-node-key"><Icon name="key" size={18} /><strong>Their own system</strong><em className="pv-own">Owned</em></div>
            <div className="pv-link pv-link-good" aria-hidden="true"><i /><i /></div>
            <div className="pv-node"><Icon name="coin" size={18} /><strong>Billing app</strong><em>Unchanged, connected</em></div>
          </div>
          <div className="pv-steps">
            <span><Icon name="bot" size={15} />Agent drafts the RFI</span>
            <span className="pv-chev" aria-hidden="true">›</span>
            <span><Icon name="users" size={15} />PM reviews</span>
            <span className="pv-chev" aria-hidden="true">›</span>
            <span className="pv-sent"><Icon name="check" size={15} />Sent</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── AI Implementation "two parts" card art ─────────────────────────────────
export function PartArt({ kind }: { kind: "training" | "officer" | "software" }) {
  if (kind === "software")
    return (
      <div className="pv-art pv-art-soft" aria-hidden="true">
        <div className="pv-art-win"><i /><i /><i /></div>
        <div className="pv-art-grid">{Array.from({ length: 6 }).map((_, i) => <span key={i} style={{ ["--i" as string]: i }} />)}</div>
        <b className="pv-art-key">Yours</b>
      </div>
    );
  if (kind === "training")
    return (
      <div className="pv-art pv-art-team" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => <span key={i} style={{ ["--i" as string]: i }} />)}
      </div>
    );
  return (
    <div className="pv-art pv-art-lanes" aria-hidden="true">
      <div><i style={{ left: "0%", width: "38%" }} /><i style={{ left: "44%", width: "44%" }} /></div>
      <div><i style={{ left: "10%", width: "30%" }} /><i style={{ left: "58%", width: "36%" }} /></div>
      <div><i style={{ left: "0%", width: "96%" }} className="soft" /></div>
    </div>
  );
}

// ─── custom software: the anonymous $100k case, compact ─────────────────────
export function CaseProof() {
  return (
    <Link href="/case-studies" className="pv-proof" aria-label="Case study: a $100,000-a-year platform replaced">
      <div className="pv-proof-h"><span className="oc-live" aria-hidden="true" />Case study · Construction</div>
      <div className="pv-proof-row">
        <div><small>Before</small><strong className="pv-proof-cost">$100,000 a year</strong><em>for a platform the team worked around</em></div>
        <span className="pv-proof-arrow" aria-hidden="true">→</span>
        <div><small>After</small><strong>A system they own</strong><em>connected to billing, agents drafting RFIs</em></div>
      </div>
      <ul>
        <li><Icon name="check" size={15} />Built around how they run projects</li>
        <li><Icon name="check" size={15} />Code, data, and accounts in their name</li>
        <li><Icon name="check" size={15} />Hosting only after the build</li>
      </ul>
      <span className="pv-proof-more">Read the case study →</span>
    </Link>
  );
}

// ─── shadow AI: staff on personal accounts, and what every plan puts in place ─
const GUARDS = ["Company AI accounts, in your name", "A written AI usage policy", "Training on what stays private", "Access limited by role", "An audit log of every view and edit", "A person approves before anything leaves"];
export function ShadowAI({ note }: { note?: string }) {
  return (
    <section className="h-sec h-dark">
      <div className="h-wrap h-feature">
        <div>
          <div className="h-eyebrow">Shadow AI</div>
          <h2>Your team is probably already using AI on personal accounts.</h2>
          <p className="pv-lead pv-lead-dark">The first fix is giving them a safe way to do it.{note ? ` ${note}` : ""} Every plan puts these in place first.</p>
        </div>
        <Reveal>
          <div className="pv-shadow">
            <div className="pv-shadow-alert rv-item" style={{ ["--i" as string]: 0 }}>
              <span className="pv-shadow-dot" aria-hidden="true" />
              <div><strong>Personal chatbot account</strong><small>Client file pasted in · no policy · no log</small></div>
              <b>Today</b>
            </div>
            <ul>
              {GUARDS.map((g, i) => (
                <li key={g} className="rv-item" style={{ ["--i" as string]: i + 1 }}><Icon name="check" size={15} />{g}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── evidence: what controlled studies measured (all from the productivity evidence doc) ─
const STUDIES = [
  { n: "40%", t: "less time writing reports and emails, with quality up 18%", s: "MIT, Science, 2023" },
  { n: "7.5 days", t: "sooner to close the books at accounting firms using AI", s: "Stanford and MIT, 2025" },
  { n: "34%", t: "more issues resolved per hour by the newest support staff", s: "Quarterly Journal of Economics, 2025" },
  { n: "About 3%", t: "time saved when workers were handed a chatbot and nothing else", s: "University of Chicago, 25,000 workers" },
];
export function EvidenceBand() {
  return (
    <section className="h-sec h-dark">
      <div className="h-wrap">
        <div className="h-head">
          <div className="h-eyebrow">What the studies measured</div>
          <h2>Same AI. Very different results.</h2>
          <p>On the right tasks, with people trained to use it, controlled studies measure big gains. Hand people a login and nothing else, and the numbers barely move. <Link href="/the-numbers" style={{ color: "#7fe3c0", fontWeight: 700, textDecoration: "none" }}>See all the numbers →</Link></p>
        </div>
        <Reveal>
          <div className="pv-stats">
            {STUDIES.map((x, i) => (
              <div key={x.n} className={`pv-stat rv-item${i === 3 ? " pv-stat-low" : ""}`} style={{ ["--i" as string]: i }}>
                <strong>{x.n}</strong>
                <p>{x.t}</p>
                <small>{x.s}</small>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── the discovery guarantee (approved by Michael 2026-10-08) ───────────────
export const GUARANTEE = {
  text: "Your first build is live on your own data within 30 days, and the discovery finds more than its fee in yearly savings, in hours back or software you can cut. If either one doesn't happen, you get the fee back, and you keep everything we delivered.",
  terms: [
    "You give us access, the tool list, and interview time on the schedule we agree at kickoff.",
    "Savings are measured the way the discovery report measures them: documented software cuts, plus hours at the wage rates in the report.",
    "Ask for the refund in writing within 14 days of the report.",
  ],
};
export function GuaranteeSeal({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="pv-seal">
      <defs>
        <linearGradient id="pv-seal-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00b36e" /><stop offset="0.55" stopColor="#0891b2" /><stop offset="1" stopColor="#3b6fe0" /></linearGradient>
        <path id="pv-seal-arc" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="#0b1b2e" stroke="url(#pv-seal-g)" strokeWidth="3" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <text fill="#7fe3c0" fontSize="9" fontWeight="700" letterSpacing="2.4"><textPath href="#pv-seal-arc">LIVE IN 30 DAYS · SAVINGS OVER THE FEE ·</textPath></text>
      <path d="M48 61l8 8 16-17" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Guarantee({ compact = false }: { compact?: boolean }) {
  if (compact)
    return (
      <div className="pv-gline">
        <GuaranteeSeal size={54} />
        <p><strong>The discovery guarantee.</strong> First build live in 30 days and more than the fee in yearly savings found, or the fee comes back. <Link href="/how-we-work#guarantee">The terms →</Link></p>
      </div>
    );
  return (
    <div className="pv-guar" id="guarantee">
      <GuaranteeSeal />
      <div>
        <div className="h-eyebrow">The discovery guarantee</div>
        <h3>Live in 30 days, and worth more than the fee, or your money back.</h3>
        <p>{GUARANTEE.text}</p>
        <details>
          <summary>The terms</summary>
          <ul>{GUARANTEE.terms.map((t) => <li key={t}>{t}</li>)}</ul>
        </details>
      </div>
    </div>
  );
}

// ─── How We Work: four rules, as a dark band with big numbers ───────────────
export function RulesBand({ rules }: { rules: { title: string; body: string }[] }) {
  return (
    <section className="h-sec h-dark">
      <div className="h-wrap">
        <div className="h-head">
          <div className="h-eyebrow">How we operate</div>
          <h2>Four rules we work by.</h2>
        </div>
        <Reveal>
          <div className="pv-rules">
            {rules.map((r, i) => (
              <div key={r.title} className="pv-rule rv-item" style={{ ["--i" as string]: i }}>
                <span className="pv-rule-n">0{i + 1}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── How We Work: the handoff, as an ownership transfer ─────────────────────
export function HandoffDoc({ items }: { items: { icon: IconName; title: string; body: string; where: string }[] }) {
  return (
    <Reveal>
      <div className="pv-transfer">
        <div className="pv-transfer-h">
          <span className="pv-dots" aria-hidden="true"><i /><i /><i /></span>
          <strong>Transfer of ownership</strong>
          <em>At handoff</em>
        </div>
        <div className="pv-transfer-body">
          {items.map((it, i) => (
            <div key={it.title} className="pv-transfer-row rv-item" style={{ ["--i" as string]: i }}>
              <span className="oc-role-icon"><Icon name={it.icon} /></span>
              <div><strong>{it.title}</strong><small>{it.body}</small><code>{it.where}</code></div>
              <span className="pv-transfer-ok" aria-label="Transferred"><Icon name="check" size={16} /></span>
            </div>
          ))}
          <div className="pv-transfer-foot">
            <span>Owner on every account</span>
            <strong>Your company</strong>
            <span className="pv-stamp" aria-hidden="true">Signed over</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── How We Work: what moves the price, as scope meters ─────────────────────
export function ScopeMeters({ items }: { items: { icon: IconName; title: string; lo: string; hi: string; body: string; at: number }[] }) {
  return (
    <Reveal>
      <div className="pv-scope">
        {items.map((it, i) => (
          <div key={it.title} className="pv-scope-row rv-item" style={{ ["--i" as string]: i, ["--at" as string]: `${it.at}%` }}>
            <div className="pv-scope-l"><span className="oc-role-icon"><Icon name={it.icon} /></span><div><strong>{it.title}</strong><small>{it.body}</small></div></div>
            <div className="pv-scope-m">
              <div className="pv-scope-track"><i /><b /></div>
              <div className="pv-scope-ends"><span>{it.lo}</span><span>{it.hi}</span></div>
            </div>
          </div>
        ))}
        <div className="pv-scope-foot">
          <span className="pv-noseat">Per seat</span>
          <span className="pv-noseat">Revenue share</span>
          <p>Neither one is ever part of the price. Every discovery and project is quoted in writing first.</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── productivity evidence, by type of work (all from "How Much Faster AI Makes the Work", 2026-10-08) ─
const BY_WORK = [
  { w: "Reports, emails, memos", n: "40% less time", d: "with quality up 18%", s: "MIT, Science, 2023 · about 450 professionals, randomized" },
  { w: "Analysis and writing", n: "25% faster", d: "12% more tasks done, quality up more than 40%", s: "Harvard and BCG, 2023 · 758 consultants, randomized" },
  { w: "Email", n: "About 2 hours", d: "less a week spent on email per person", s: "Microsoft and NBER, 2025 · 7,137 workers at 66 firms" },
  { w: "Accounting", n: "7.5 days sooner", d: "to close the books, with 55% more clients per accountant", s: "Stanford and MIT, 2025 · early working paper" },
  { w: "Customer support", n: "14% more", d: "issues resolved per hour, and 34% for the newest staff", s: "Quarterly Journal of Economics, 2025 · 5,172 agents" },
  { w: "Insurance claims", n: "80% faster", d: "on small claims, with a person still approving each payment", s: "Allianz, 2025 · company-reported" },
  { w: "Underwriting", n: "About half", d: "the review time per application, underwriters still decide", s: "Aviva, 2026 · company-reported" },
  { w: "Documents and reports", n: "87% to 95%", d: "less time per task, across real work conversations", s: "Anthropic, 2025 · an estimate from 100,000 conversations" },
];
const PER_TASK = [
  { t: "Key one invoice into the system", p: "4 minutes, about $1.89", a: "About $0.01", n: "Spot-check a sample" },
  { t: "Draft a two-page memo", p: "45 minutes, about $24.50", a: "About $0.02, plus 10 minutes of review", n: "Review is most of the real cost" },
  { t: "Handle a three-minute phone call", p: "About $1.54", a: "About $0.33 to $0.42", n: "Answers at 2 a.m., many calls at once" },
];
// The numbers page sections (app/the-numbers). Each stands alone so pages can reuse them.
export function EvidenceByWork() {
  return (
    <section className="h-sec">
      <div className="h-wrap">
        <div className="h-head">
          <div className="h-eyebrow">By type of work</div>
          <h2>On work that suits AI, studies measure 25% to 56% less time per task.</h2>
          <p>Every figure comes from a randomized trial, a field study at real companies, or a published company result. Company-reported numbers are marked.</p>
        </div>
        <Reveal>
          <div className="pv-work">
            {BY_WORK.map((x, i) => (
              <div key={x.w} className="pv-workcard rv-item" style={{ ["--i" as string]: i }}>
                <span className="h-card2-tag">{x.w}</span>
                <strong>{x.n}</strong>
                <p>{x.d}</p>
                <small>{x.s}</small>
              </div>
            ))}
          </div>
        </Reveal>
        <p className="pv-fine">Two patterns hold across the studies: the least experienced people gain the most, often two to three times as much, and the gains only show up on tasks that suit AI.</p>
      </div>
    </section>
  );
}

const WAGES = [
  { r: "Receptionist", h: "$26.10", y: "$54,305" },
  { r: "Data entry keyer", h: "$28.40", y: "$59,063" },
  { r: "Customer service representative", h: "$30.76", y: "$63,963" },
  { r: "Administrative assistant", h: "$32.66", y: "$67,920" },
  { r: "Dispatcher", h: "$34.57", y: "$71,921" },
  { r: "Bookkeeping clerk", h: "$34.80", y: "$72,392" },
  { r: "Cargo and freight agent", h: "$35.90", y: "$74,664" },
  { r: "Financial analyst", h: "$70.58", y: "$146,785" },
];
export function CostPerTask() {
  return (
    <section className="h-sec h-soft">
      <div className="h-wrap">
        <div className="h-head">
          <div className="h-eyebrow">Cost per task</div>
          <h2>An agent costs cents per task. A person in the same seat costs dollars.</h2>
          <p>Agents rarely take over a whole job, so the useful comparison is one task at a time. Task times are our estimates. Wages are BLS medians with benefits, and agent costs use published model and voice prices.</p>
        </div>
        <Reveal>
          <div className="pv-pertask">
            <div className="pv-pt-row head"><span>Task</span><span>A person</span><span>An AI agent</span><span>Worth knowing</span></div>
            {PER_TASK.map((r, i) => (
              <div key={r.t} className="pv-pt-row rv-item" style={{ ["--i" as string]: i }}>
                <span>{r.t}</span><span>{r.p}</span><span className="pv-pt-a">{r.a}</span><span className="pv-pt-n">{r.n}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="pv-wages">
          <div>
            <h3>What the person costs</h3>
            <p>Median US wages (BLS, May 2025) with benefits added. Benefits are about 30% of private-sector pay, so wage plus benefits is 1.43 times the wage. Recruiting, training, equipment and supervision come on top.</p>
            <p className="pv-fine" style={{ marginTop: 14 }}>The per-task prices leave out the fixed work: building the agent, connecting it to your systems, and keeping it running. That is what a plan covers.</p>
          </div>
          <Reveal>
            <div className="pv-wtable">
              <div className="pv-wrow head"><span>Role</span><span>Per hour</span><span>Per year</span></div>
              {WAGES.map((w, i) => (
                <div key={w.r} className="pv-wrow rv-item" style={{ ["--i" as string]: i }}><span>{w.r}</span><span>{w.h}</span><span>{w.y}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const VOICE = [
  { c: "Circle Logistics", w: "Freight booking and carrier calls", r: "18% of freight booked with no human involved, and every call answered" },
  { c: "ARL Network", w: "Carrier calls and email", r: "Rep time on calls and email cut from 3 to 4 hours a day to minutes" },
  { c: "Freight brokers on WireBee", w: "Inbound carrier calls", r: "40% to 90% of calls handled fully; tasks cut from 15 to 20 minutes to about 5" },
  { c: "Revolut", w: "Customer service calls", r: "Time to resolve calls more than 8 times lower in the first phase" },
  { c: "Klarna", w: "Customer service chat", r: "Two-thirds of chats handled in the first month, then people rehired when quality dropped" },
];
export function PhoneAgents() {
  return (
    <section className="h-sec">
      <div className="h-wrap">
        <div className="h-head">
          <div className="h-eyebrow">Phone calls and data entry</div>
          <h2>Where agents take over whole tasks.</h2>
          <p>On calls, intake and data entry, agents don&apos;t just speed a person up. They do the task, and a person checks the ones that matter. These results are what the companies and their vendors published, not independent measurements.</p>
        </div>
        <Reveal>
          <div className="pv-voice">
            {VOICE.map((v, i) => (
              <div key={v.c} className="pv-voice-row rv-item" style={{ ["--i" as string]: i }}>
                <div><strong>{v.c}</strong><small>{v.w}</small></div>
                <p>{v.r}</p>
                <em>Vendor-reported</em>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="pv-phone-rules">
          <div><Icon name="users" /><strong>Customers have a say</strong><p>64% of consumers said they would prefer companies not use AI for service. Calls with carriers and vendors are a different audience, and still need testing.</p><small>Gartner, 2024</small></div>
          <div><Icon name="shield" /><strong>The law applies</strong><p>The FCC treats AI voices as artificial under robocall law, so outbound AI calls need prior consent. Opening every call by saying it&apos;s an AI covers the known rules.</p><small>FCC 24-17, 2024</small></div>
          <div><Icon name="check" /><strong>A way out, every time</strong><p>Every call needs a handoff to a person on request, and someone reviewing a sample of calls each week.</p><small>How we set them up</small></div>
        </div>
      </div>
    </section>
  );
}

export function LongTasks() {
  return (
    <section className="h-sec h-soft">
      <div className="h-wrap h-feature">
        <div>
          <div className="h-eyebrow">Longer work</div>
          <h2>The tasks agents can finish on their own keep getting longer.</h2>
          <p className="pv-lead">The length of task an AI agent can finish alone has doubled about every 4 months since 2023. The same research shows why review still matters: counting the expert&apos;s time to check and fix the draft, the real speedup on 7-hour deliverables was 1.1 to 1.4 times, not 90.</p>
        </div>
        <Reveal>
          <div className="pv-long">
            <div className="rv-item" style={{ ["--i" as string]: 0 }}><strong>About 12 hours</strong><p>tasks the best agents finished half the time by early 2026, and 80% of the time on 1.5-hour tasks</p><small>METR, May 2026 · software and research tasks</small></div>
            <div className="rv-item" style={{ ["--i" as string]: 1 }}><strong>47.6%</strong><p>of real 7-hour deliverables from 44 occupations matched or beat the expert&apos;s work, graded blind</p><small>OpenAI GDPval, October 2025</small></div>
            <div className="rv-item" style={{ ["--i" as string]: 2 }}><strong>1.1x to 1.4x</strong><p>faster once the expert&apos;s review and fixes are counted, which is why a person approves the output</p><small>OpenAI GDPval, October 2025</small></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhereItGoesWrong() {
  return (
    <section className="h-sec h-dark">
      <div className="h-wrap h-feature">
        <div>
          <div className="h-eyebrow">Where it goes wrong</div>
          <h2>Handing people a chatbot moves the numbers very little.</h2>
          <p className="pv-lead pv-lead-dark">The big gains come from three choices: picking tasks that suit AI, connecting it to your own data, and training people on where it fails. Skip them and the results look like the numbers on the right.</p>
        </div>
        <Reveal>
          <div className="pv-wrong">
            <div className="pv-wrong-row rv-item" style={{ ["--i" as string]: 0 }}>
              <strong>About 3%</strong>
              <p>time saved when 25,000 workers were given AI with no plan, and no change in hours or earnings</p>
              <small>University of Chicago, 2023 to 2024</small>
            </div>
            <div className="pv-wrong-row rv-item" style={{ ["--i" as string]: 1 }}>
              <strong>84% down to 60% to 70%</strong>
              <p>right answers fell when consultants used AI on a task it handles badly, and the wrong answers read as more polished</p>
              <small>Harvard and BCG, 2023</small>
            </div>
            <div className="pv-wrong-row pv-wrong-ours rv-item" style={{ ["--i" as string]: 2 }}>
              <strong>8 hours to 15 minutes</strong>
              <p>a multi-step analysis and write-up, and a presentation deck from 7 to 10 days down to one, in our own operating work</p>
              <small>Our own numbers, not a study</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CHOICES: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "Pick the tasks", body: "Drafting, compiling reports, data entry and routine admin sit well inside what AI does. Judgment calls on unfamiliar problems sit outside it, and that's where results got worse." },
  { icon: "db", title: "Put it on your own data", body: "A chatbot that can't see your files and systems saves minutes. An assistant and agents connected to them take over whole tasks." },
  { icon: "users", title: "Train people, keep a reviewer", body: "The least experienced staff gain the most, once they know where AI is wrong. The time spent reviewing drafts sets the real speedup." },
];
export function ThreeChoices() {
  return (
    <section className="h-sec">
      <div className="h-wrap">
        <div className="h-head">
          <div className="h-eyebrow">What this means for your team</div>
          <h2>Three choices decide whether you land near 80% or near 3%.</h2>
        </div>
        <IconCards items={CHOICES} />
      </div>
    </section>
  );
}

// A short pointer to the full numbers page (used on the assessment and Training pages).
export function NumbersTeaser() {
  return (
    <Link href="/the-numbers" className="pv-teaser">
      <div className="pv-teaser-stats">
        <span><strong>25% to 56%</strong>less time per task in controlled studies</span>
        <span><strong>About $0.01</strong>for an agent to key an invoice, against $1.89 for a person</span>
        <span><strong>About 3%</strong>when people just get a login</span>
      </div>
      <div className="pv-teaser-cta">Where the numbers come from →</div>
    </Link>
  );
}
