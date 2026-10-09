import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconName } from "@/components/PageVisuals";
import { USE_CASE_NAV } from "@/lib/nav";

// About page visuals. Styles live in app/visuals.css (prefix ab-).

// ─── our story, as a track that fills ───────────────────────────────────────
const STORY: { icon: IconName; k: string; t: string; d: string }[] = [
  { icon: "coin", k: "Where we started", t: "We ran a business", d: "On software paid for by the seat, with a workaround for every part that didn't fit, and a bill that climbed as we grew." },
  { icon: "ai", k: "The catch", t: "AI showed up", d: "Logins were easy. Getting the team to use it on the real work, on our own data, wasn't." },
  { icon: "tools", k: "What we did", t: "We did the work", d: "Trained our people on their own jobs, built the assistant and agents, connected the tools we kept, and cut what cost more than owning." },
  { icon: "key", k: "Now", t: "We do it for you", d: "Same order for your business: teach the team, build the tools, connect the systems. You own all of it." },
];
export function StoryTrack() {
  return (
    <Reveal>
      <div className="ab-story">
        <div className="ab-story-track" aria-hidden="true"><i /></div>
        <ol>
          {STORY.map((s, i) => (
            <li key={s.t} className="rv-item" style={{ ["--i" as string]: i * 2 }}>
              <span className="ab-story-dot"><Icon name={s.icon} size={20} /></span>
              <small>{s.k}</small>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

// ─── who we work with ───────────────────────────────────────────────────────
const SIGNALS = [
  "Your team already pays for AI tools nobody uses well.",
  "The work runs on several tools that don't talk to each other.",
  "You pay real money for a platform your team works around.",
];
export function FitPanel() {
  return (
    <Reveal>
      <div className="ab-fit">
        <div className="ab-fit-size rv-item" style={{ ["--i" as string]: 0 }}>
          <div className="ab-fit-dots" aria-hidden="true">
            {Array.from({ length: 100 }).map((_, i) => <span key={i} className={i < 15 ? "core" : ""} style={{ ["--i" as string]: i }} />)}
          </div>
          <strong>15 to 100 people</strong>
          <p>Operational businesses that know AI matters and don&apos;t know how to put it to work day to day. Usually no CTO, and nobody whose job is AI.</p>
        </div>
        <div className="ab-fit-right">
          <div className="pv-label">You&apos;ll recognize at least one</div>
          <ul>
            {SIGNALS.map((s, i) => (
              <li key={s} className="rv-item" style={{ ["--i" as string]: i + 1 }}><b aria-hidden="true">✓</b>{s}</li>
            ))}
          </ul>
          <div className="pv-label">Industries we know well</div>
          <div className="ab-fit-inds">
            {USE_CASE_NAV.map((u) => (
              <Link key={u.slug} href={`/use-cases/${u.slug}`}><Icon name={u.slug as IconName} size={15} />{u.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── what we believe, each with what it means in practice ───────────────────
export function Beliefs({ items }: { items: { icon: IconName; title: string; body: string; practice: string }[] }) {
  return (
    <Reveal>
      <div className="ab-beliefs">
        {items.map((b, i) => (
          <div className="ab-belief rv-item" key={b.title} style={{ ["--i" as string]: i }}>
            <div className="ab-belief-h"><span className="oc-role-icon"><Icon name={b.icon} size={20} /></span><em>0{i + 1}</em></div>
            <h3>{b.title}</h3>
            <p>{b.body}</p>
            <div className="ab-belief-p"><small>In practice</small>{b.practice}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

// ─── what you can hold us to ────────────────────────────────────────────────
const HOLD: { icon: IconName; k: string; d: string }[] = [
  { icon: "users", k: "In person", d: "We train your team on site, on their own work." },
  { icon: "doc", k: "In writing", d: "Scope and price before any build starts." },
  { icon: "clock", k: "In 30 days", d: "Your first build, live on your own data." },
  { icon: "key", k: "In your name", d: "Code, data, accounts, and the training library." },
];
export function HoldUsTo() {
  return (
    <Reveal>
      <div className="ab-hold">
        {HOLD.map((h, i) => (
          <div key={h.k} className="rv-item" style={{ ["--i" as string]: i }}>
            <Icon name={h.icon} size={22} />
            <strong>{h.k}</strong>
            <span>{h.d}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
