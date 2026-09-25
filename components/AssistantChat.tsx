"use client";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Msg =
  | { kind: "user"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "thinking" }
  | { kind: "budget" }
  | { kind: "followup" };

// ─── Conversation script ──────────────────────────────────────────────────────
const SCRIPT: { msg: Msg; delay: number }[] = [
  { delay: 1000, msg: { kind: "user", text: "Pull the Henderson contract documents and send them to Charlie at Mercer Group." } },
  { delay: 1400, msg: { kind: "thinking" } },
  { delay: 2600, msg: { kind: "ai", text: "Found 3 documents in Vault: the Master Service Agreement, the 2024 Amendment, and the Statement of Work. Sent to Charlie Walsh at Mercer Group from your Outlook." } },
  { delay: 5000, msg: { kind: "user", text: "Which jobs are over budget this month, and why?" } },
  { delay: 1400, msg: { kind: "thinking" } },
  { delay: 2600, msg: { kind: "ai", text: "Four jobs are over. I compared committed costs in Core against actuals in QuickBooks." } },
  { delay: 1800, msg: { kind: "budget" } },
  { delay: 5500, msg: { kind: "user", text: "Email the PMs on those jobs and ask for a recovery plan by Friday." } },
  { delay: 1400, msg: { kind: "thinking" } },
  { delay: 2400, msg: { kind: "ai", text: "Done. Four emails sent. I'll follow up Thursday morning with anyone who hasn't replied." } },
  { delay: 1600, msg: { kind: "followup" } },
];

// ─── Palette (matches home.css) ───────────────────────────────────────────────
const C = {
  ink: "#0b1b2e",
  ink2: "#334155",
  ink3: "#64748b",
  line: "#e2e8f0",
  soft: "#f5f7fa",
  green: "#00b36e",
  greenBg: "#e8f7f0",
  greenInk: "#067a4d",
  teal: "#0e7490",
  red: "#d64545",
};

// ─── Assistant mark ───────────────────────────────────────────────────────────
function Mark({ size = 28 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3, flexShrink: 0,
      background: "linear-gradient(135deg, #00b36e, #0891b2 60%, #3b6fe0)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="white">
        <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4z" />
      </svg>
    </div>
  );
}

// ─── Typewriter text ──────────────────────────────────────────────────────────
function Typewriter({ text, color, speed = 24 }: { text: string; color: string; speed?: number }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++;
      setShown(text.slice(0, i));
      if (i < text.length) t = setTimeout(tick, speed);
      else setDone(true);
    };
    t = setTimeout(tick, 10);
    return () => clearTimeout(t);
  }, [text, speed]);
  return (
    <span style={{ color, fontSize: "0.9rem", lineHeight: 1.6 }}>
      {shown}
      {!done && <span style={{ opacity: 0.5, animation: "ac-blink 0.8s step-end infinite" }}>|</span>}
    </span>
  );
}

function ThinkingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: C.teal,
          animation: `ac-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

// Staggered reveal for card rows
function useReveal(count: number, gap = 160) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => { i++; setN(i); if (i <= count) t = setTimeout(next, gap); };
    t = setTimeout(next, 200);
    return () => clearTimeout(t);
  }, [count, gap]);
  return n;
}

const cardStyle = {
  background: "#fff", border: `1px solid ${C.line}`, borderRadius: 14,
  padding: "18px 20px", boxShadow: "0 8px 24px rgba(11,27,46,0.06)",
};

function CardHead({ tag, title }: { tag: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, marginBottom: 12, borderBottom: `1px solid ${C.line}` }}>
      <span style={{
        padding: "3px 9px", borderRadius: 6, fontSize: "0.66rem", fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase", background: C.greenBg, color: C.greenInk,
      }}>{tag}</span>
      <span style={{ fontSize: "0.88rem", fontWeight: 700, color: C.ink }}>{title}</span>
    </div>
  );
}

function Sources({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
      <span style={{ fontSize: "0.72rem", color: C.ink3 }}>Sources</span>
      {items.map(s => (
        <span key={s} style={{ fontSize: "0.72rem", fontWeight: 600, color: C.ink2, background: C.soft, border: `1px solid ${C.line}`, borderRadius: 6, padding: "2px 8px" }}>{s}</span>
      ))}
    </div>
  );
}

// ─── Budget card ──────────────────────────────────────────────────────────────
const JOBS = [
  { job: "Riverside Clinic", why: "Change order #7 not billed", over: "+$48,200" },
  { job: "Oak St. Retail", why: "Steel price increase", over: "+$31,900" },
  { job: "Harbor Warehouse", why: "Overtime on framing crew", over: "+$18,400" },
  { job: "Lincoln School", why: "Duplicate sub invoice", over: "+$9,750" },
];

function BudgetCard() {
  const n = useReveal(JOBS.length);
  return (
    <div style={cardStyle}>
      <CardHead tag="Report" title="Jobs over budget · September" />
      {JOBS.map((j, i) => (
        <div key={j.job} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 10,
          opacity: n > i ? 1 : 0, transform: n > i ? "none" : "translateY(6px)", transition: "opacity 0.25s, transform 0.25s",
        }}>
          <div>
            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: C.ink }}>{j.job}</div>
            <div style={{ fontSize: "0.78rem", color: C.ink3 }}>{j.why}</div>
          </div>
          <span style={{ fontSize: "0.92rem", fontWeight: 700, color: C.red, whiteSpace: "nowrap" }}>{j.over}</span>
        </div>
      ))}
      {n > JOBS.length && <Sources items={["Core", "QuickBooks", "Vault"]} />}
    </div>
  );
}

// ─── Follow-up card ───────────────────────────────────────────────────────────
const PMS = ["D. Reyes · Riverside Clinic", "K. Okafor · Oak St. Retail", "L. Brandt · Harbor Warehouse", "T. Nguyen · Lincoln School"];

function FollowupCard() {
  const n = useReveal(PMS.length, 140);
  return (
    <div style={cardStyle}>
      <CardHead tag="Task" title="Recovery plans due Friday" />
      {PMS.map((p, i) => (
        <div key={p} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8,
          opacity: n > i ? 1 : 0, transition: "opacity 0.25s",
        }}>
          <span style={{ fontSize: "0.86rem", color: C.ink2 }}>{p}</span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: C.greenInk, background: C.greenBg, borderRadius: 100, padding: "3px 9px" }}>Sent</span>
        </div>
      ))}
      {n > PMS.length && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "ac-pulse 1.6s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: C.ink }}>Follow-up scheduled</span>
          <span style={{ fontSize: "0.78rem", color: C.ink3 }}>Thursday, 9:00 AM</span>
        </div>
      )}
    </div>
  );
}

// ─── Message renderer ─────────────────────────────────────────────────────────
function Message({ msg, isLatest }: { msg: Msg; isLatest: boolean }) {
  const row = { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 } as const;
  if (msg.kind === "thinking") {
    return (
      <div style={row}>
        <Mark />
        <div style={{ background: C.soft, border: `1px solid ${C.line}`, borderRadius: "4px 14px 14px 14px", padding: "10px 16px" }}>
          <ThinkingDots />
        </div>
      </div>
    );
  }
  if (msg.kind === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <div style={{ background: C.ink, borderRadius: "14px 14px 4px 14px", padding: "11px 16px", maxWidth: "80%" }}>
          {isLatest
            ? <Typewriter text={msg.text} color="#fff" />
            : <span style={{ color: "#fff", fontSize: "0.9rem", lineHeight: 1.6 }}>{msg.text}</span>}
        </div>
      </div>
    );
  }
  if (msg.kind === "ai") {
    return (
      <div style={row}>
        <Mark />
        <div style={{ background: C.soft, border: `1px solid ${C.line}`, borderRadius: "4px 14px 14px 14px", padding: "11px 16px", maxWidth: "82%" }}>
          {isLatest
            ? <Typewriter text={msg.text} color={C.ink2} />
            : <span style={{ color: C.ink2, fontSize: "0.9rem", lineHeight: 1.6 }}>{msg.text}</span>}
        </div>
      </div>
    );
  }
  const card = msg.kind === "budget" ? <BudgetCard /> : <FollowupCard />;
  return (
    <div style={row}>
      <div style={{ width: 28, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>{card}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AssistantChat({ height = 600 }: { height?: number }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [listening, setListening] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = () => {
      setMessages([]);
      setListening(false);
      const step = (idx: number) => {
        if (idx >= SCRIPT.length) {
          timerRef.current = setTimeout(run, 6000);
          return;
        }
        const { msg, delay } = SCRIPT[idx];
        timerRef.current = setTimeout(() => {
          setListening(msg.kind === "user");
          setMessages(prev => (msg.kind === "user" || msg.kind === "thinking")
            ? [...prev, msg]
            : [...prev.filter(m => m.kind !== "thinking"), msg]);
          step(idx + 1);
        }, delay);
      };
      step(0);
    };
    run();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); });
  }, [messages]);

  return (
    <div style={{
      background: "#fff", display: "flex", flexDirection: "column",
      width: "100%", height, overflow: "hidden", fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 20px", borderBottom: `1px solid ${C.line}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Mark size={34} />
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: C.ink, letterSpacing: "-0.01em" }}>AI Assistant</div>
            <div style={{ fontSize: "0.74rem", color: C.ink3 }}>Connected to Core, Vault, QuickBooks, Outlook</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "ac-pulse 1.6s ease-in-out infinite" }} />
          <span style={{ fontSize: "0.76rem", color: C.ink3 }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "20px 20px 6px", background: "#fcfdfe", scrollbarWidth: "thin" }}>
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} isLatest={i === messages.length - 1} />
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px 16px", borderTop: `1px solid ${C.line}`, flexShrink: 0 }}>
        <div style={{
          flex: 1, height: 42, borderRadius: 21, background: C.soft,
          border: `1px solid ${listening ? C.teal : C.line}`, transition: "border-color 0.3s",
          display: "flex", alignItems: "center", padding: "0 16px",
        }}>
          {listening ? (
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ width: 3, height: 14, borderRadius: 2, background: C.teal, animation: `ac-wave 0.8s ease-in-out ${i * 0.1}s infinite alternate` }} />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "0.84rem", color: C.ink3 }}>Ask anything about your operation</span>
          )}
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
          background: listening ? C.ink : "#fff", border: `1px solid ${listening ? C.ink : C.line}`,
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
        }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke={listening ? "#fff" : C.ink3} strokeWidth="1.5" strokeLinecap="round">
            <rect x="4" y="1" width="6" height="8" rx="3" />
            <path d="M2 7c0 2.76 2.24 5 5 5s5-2.24 5-5" />
            <line x1="7" y1="12" x2="7" y2="13.5" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes ac-blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes ac-bounce { 0%,80%,100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-5px); opacity: 1; } }
        @keyframes ac-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,179,110,0.45); } 50% { box-shadow: 0 0 0 5px rgba(0,179,110,0); } }
        @keyframes ac-wave { from { height: 4px; } to { height: 16px; } }
      `}</style>
    </div>
  );
}
