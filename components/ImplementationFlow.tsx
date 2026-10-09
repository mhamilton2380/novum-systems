"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

// ─── helpers ────────────────────────────────────────────────────────────────
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false); // latches true, for reveal
  const [live, setLive] = useState(false); // tracks visibility, for autoplay
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setLive(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen, live };
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const q = window.matchMedia(REDUCED_QUERY);
      q.addEventListener("change", cb);
      return () => q.removeEventListener("change", cb);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

// ─── how it runs ────────────────────────────────────────────────────────────
const STEPS = [
  {
    key: "discovery",
    title: "Discovery",
    line: "Map the work. Audit the tools.",
    tag: "First build live in 30 days",
    body: "We map how your work moves, audit every tool and what it costs, write your AI usage policy, and put your first build live on your own data.",
  },
  {
    key: "train",
    title: "Train",
    line: "Your team learns on its own work.",
    tag: "Hands-on, on your data",
    body: "Your team practices on the tasks they do every week, so what gets built gets used. Written guides stay with them afterward.",
  },
  {
    key: "build",
    title: "Build and connect",
    line: "Agents and tools, wired together.",
    tag: "One live before the next starts",
    body: "Agents, an AI assistant, and integrations with the tools you keep. A person approves anything before it leaves the company.",
  },
  {
    key: "run",
    title: "Run",
    line: "An AI Officer keeps it current.",
    tag: "Month to month after six months",
    body: "Your AI Officer maintains everything we build, tests new AI on your data, audits your tools each quarter, and keeps training going.",
  },
] as const;

const INTERVAL = 7500;

function SceneDiscovery() {
  const nodes = ["Request in", "Quote", "Approval", "Invoice", "Report"];
  return (
    <div className="if-scene">
      <div className="if-flowrow">
        {nodes.map((n, i) => (
          <div className="if-flowitem" key={n} style={{ ["--i" as string]: i }}>
            <div className="if-node">{n}</div>
            {i < nodes.length - 1 && <span className="if-conn"><i /></span>}
          </div>
        ))}
      </div>
      <div className="if-timeline">
        <div className="if-track"><i /></div>
        <div className="if-marks">
          <span>Kickoff</span>
          <span>Day 7<small>Tool and cost report</small></span>
          <span>Day 30<small>First build live</small></span>
        </div>
      </div>
      <div className="if-chips">
        <span>Workflow map</span>
        <span>Tool and cost audit</span>
        <span>AI usage policy</span>
      </div>
    </div>
  );
}

function SceneTrain() {
  const tasks = ["Draft a client update from last week's notes", "Summarize a 40-page contract", "Pull last month's numbers into a report"];
  return (
    <div className="if-scene if-train">
      <div className="if-people" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
      <div className="if-card">
        <div className="if-card-h">Hands-on session <em>Sample tasks</em></div>
        {tasks.map((t, i) => (
          <div className="if-task" key={t} style={{ ["--i" as string]: i }}>
            <b aria-hidden="true">✓</b>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TOOLS: [string, number, number][] = [
  ["Accounting", 100, 50],
  ["CRM", 100, 210],
  ["Email", 500, 50],
  ["Documents", 500, 210],
  ["Payments", 300, 252],
];

function SceneBuild({ reduced }: { reduced: boolean }) {
  return (
    <div className="if-scene if-build">
      <svg viewBox="0 0 600 280" role="img" aria-label="Illustration: your tools connected to one hub of company data">
        {TOOLS.map(([, x, y], i) => (
          <g key={i}>
            <path id={`if-p${i}`} d={`M300,128 L${x},${y}`} className="if-link" style={{ ["--i" as string]: i }} />
            {!reduced && (
              <circle r="3.5" className="if-dot">
                <animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite">
                  <mpath href={`#if-p${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}
        {TOOLS.map(([label, x, y], i) => (
          <g key={label} className="if-tool" style={{ ["--i" as string]: i }}>
            <rect x={x - 58} y={y - 17} width="116" height="34" rx="10" />
            <text x={x} y={y + 4.5} textAnchor="middle">{label}</text>
          </g>
        ))}
        <g className="if-hub">
          <circle cx="300" cy="128" r="46" className="if-hub-ring" />
          <circle cx="300" cy="128" r="34" className="if-hub-core" />
          <text x="300" y="132" textAnchor="middle">Your data</text>
        </g>
      </svg>
      <div className="if-agent">
        <span className="if-agent-dot" aria-hidden="true" />
        <span><b>Renewal agent</b> drafted 23 renewal quotes <em>Example</em></span>
        <span className="if-approve">Awaiting your approval</span>
      </div>
    </div>
  );
}

function SceneRun() {
  const items = ["Quarterly tool audit", "New AI tested on your data", "Training sessions", "Upkeep, monitoring, backups"];
  return (
    <div className="if-scene if-run">
      <div className="if-orbit" aria-hidden="true">
        <i className="if-orbit-ring" />
        <i className="if-orbit-ring r2" />
        <i className="if-orbit-sweep" />
        <div className="if-orbit-core">AI Officer</div>
      </div>
      <ul className="if-cycle">
        {items.map((t, i) => (
          <li key={t} style={{ ["--i" as string]: i }}>
            <b aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ImplementationFlow() {
  const { ref, seen, live } = useInView<HTMLDivElement>(0.3);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps on manual select to restart the progress bar

  const playing = live && !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), INTERVAL);
    return () => clearTimeout(t);
  }, [playing, active, cycle]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); pick((active + 1) % STEPS.length); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); pick((active + STEPS.length - 1) % STEPS.length); }
  };

  const s = STEPS[active];
  return (
    <div
      ref={ref}
      className={`if-flow${seen ? " in" : ""}${playing ? " playing" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="if-rail" role="tablist" aria-label="How an implementation runs" onKeyDown={onKey}>
        {STEPS.map((st, i) => (
          <button
            key={st.key}
            role="tab"
            id={`if-tab-${st.key}`}
            aria-selected={i === active}
            aria-controls="if-stage"
            tabIndex={i === active ? 0 : -1}
            className={`if-step${i === active ? " on" : ""}${i < active ? " done" : ""}`}
            onClick={() => pick(i)}
          >
            <span className="if-num">{i < active ? "✓" : i + 1}</span>
            <span className="if-step-t">
              <strong>{st.title}</strong>
              <small>{st.line}</small>
            </span>
            <span className="if-bar" aria-hidden="true">
              {i === active && <i key={`${active}-${cycle}`} style={{ animationDuration: `${INTERVAL}ms` }} />}
            </span>
          </button>
        ))}
      </div>

      <div className="if-stage" id="if-stage" role="tabpanel" aria-labelledby={`if-tab-${s.key}`}>
        <div className="if-glow" aria-hidden="true" />
        <div className="if-stage-top">
          <span className="if-stage-n">Step {active + 1} of {STEPS.length}</span>
          <span className="if-stage-tag">{s.tag}</span>
        </div>
        <div className="if-scene-wrap" key={`${s.key}-${cycle}`}>
          {s.key === "discovery" && <SceneDiscovery />}
          {s.key === "train" && <SceneTrain />}
          {s.key === "build" && <SceneBuild reduced={reduced} />}
          {s.key === "run" && <SceneRun />}
        </div>
        <p className="if-stage-body">{s.body}</p>
      </div>
    </div>
  );
}

// ─── where to start ─────────────────────────────────────────────────────────
const DOORS = [
  {
    id: "train",
    need: "My team needs to learn AI",
    title: "Start with a training day",
    body: "Your team gets up to speed in five hours, with a short list of tools and a clear sense of what AI can do for them.",
    href: "/training",
    cta: "Book a training day",
    icon: "M4 19V9l8-5 8 5v10M9 19v-6h6v6",
  },
  {
    id: "discovery",
    need: "I know what I want built",
    title: "Start with a discovery",
    body: "We map the work, audit your tools, and put your first build live. The fee is credited toward what comes next.",
    href: "/contact",
    cta: "Book a conversation",
    icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5",
  },
  {
    id: "officer",
    need: "I want someone to own AI for us",
    title: "Start with an AI Officer",
    body: "Every plan begins with a discovery, then runs month to month after a six-month minimum.",
    href: "/ai-officer#pricing",
    cta: "See AI Officer plans",
    icon: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7zM9 12l2 2 4-4",
  },
] as const;

export function StartChooser() {
  const { ref, seen } = useInView<HTMLDivElement>(0.2);
  const [pick, setPick] = useState<string | null>(null);
  const chosen = DOORS.find((d) => d.id === pick);

  return (
    <div ref={ref} className={`if-start${seen ? " in" : ""}`}>
      <div className="if-ask" role="radiogroup" aria-label="What describes you best?">
        <span className="if-ask-l">Which sounds like you?</span>
        {DOORS.map((d) => (
          <button
            key={d.id}
            role="radio"
            aria-checked={pick === d.id}
            className={`if-chip${pick === d.id ? " on" : ""}`}
            onClick={() => setPick(pick === d.id ? null : d.id)}
          >
            {d.need}
          </button>
        ))}
      </div>

      <div className="if-doors">
        {DOORS.map((d, i) => (
          <Link
            href={d.href}
            key={d.id}
            className={`if-door${pick === d.id ? " rec" : ""}${pick && pick !== d.id ? " dim" : ""}`}
            style={{ ["--i" as string]: i }}
          >
            {pick === d.id && <span className="if-rec">Best fit</span>}
            <span className="if-door-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon} /></svg>
            </span>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <span className="if-door-cta">{d.cta} <i aria-hidden="true">→</i></span>
          </Link>
        ))}
      </div>
      <p className="if-pickhint" aria-live="polite">
        {chosen ? `${chosen.title} fits best. Every route can lead to the others.` : "Not sure? Start with a discovery. It points to the right next step."}
      </p>
    </div>
  );
}
