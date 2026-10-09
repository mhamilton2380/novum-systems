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
  { t: "Training day", d: "On site, five hours, on your own work", s: "Day 1" },
  { t: "Live sessions", d: "Every month, on the tools you just got", s: "Monthly" },
  { t: "Training library", d: "Recorded on your tools, updated monthly", s: "Yours" },
];
export function TrainingHeroCard() {
  return (
    <div className="h-phero-card pv-train" aria-label="How we train your team: a training day, live sessions every month, and a library you keep">
      <div className="oc-hero-h">
        <span className="oc-live" aria-hidden="true" />
        <strong>Your team</strong>
        <em>Getting up to speed</em>
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
  { d: "Day 30", t: "First agent live", s: "On your own data, in use" },
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
export function PartArt({ kind }: { kind: "training" | "officer" }) {
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
