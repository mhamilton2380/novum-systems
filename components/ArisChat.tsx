"use client";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Msg =
  | { kind: "user"; text: string }
  | { kind: "aris"; text: string }
  | { kind: "thinking" }
  | { kind: "report" }
  | { kind: "stress" };

// ─── Conversation script ──────────────────────────────────────────────────────
const SCRIPT: { msg: Msg; delay: number }[] = [
  { delay: 1000, msg: { kind: "user", text: "Hey A.R.I.S — pull the Henderson contract documents and send them to Charlie at Mercer Group." } },
  { delay: 1400, msg: { kind: "thinking" } },
  { delay: 3000, msg: { kind: "aris",  text: "Found 3 documents — the Master Service Agreement, the 2024 Amendment, and the Statement of Work. Sending to Charlie Walsh at Mercer Group now. Should I include a message?" } },
  { delay: 5000, msg: { kind: "user",  text: "No — but after that, pull the revenue reports for the last 5 years and show me which SKUs are driving the most losses." } },
  { delay: 1600, msg: { kind: "aris",  text: "Sent. Pulling five years of revenue data now — SKU loss breakdown incoming." } },
  { delay: 2200, msg: { kind: "report" } },
  { delay: 5000, msg: { kind: "user",  text: "Run a stress test on the Henderson financial model — 2008, 2020, 2022. Set up weekly monitoring and alert me if conditions shift." } },
  { delay: 1400, msg: { kind: "thinking" } },
  { delay: 3000, msg: { kind: "aris",  text: "Stress testing against three historical drawdown scenarios. Weekly monitoring is active — I'll flag you the moment volatility or credit spreads cross your thresholds." } },
  { delay: 2000, msg: { kind: "stress" } },
];

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: "#5B8DEF", display: "flex", alignItems: "center",
      justifyContent: "center", flexShrink: 0,
    }}>
      <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 14 14" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" />
        <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.4" />
        <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.4" />
        <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" />
      </svg>
    </div>
  );
}

// ─── Typewriter text ──────────────────────────────────────────────────────────
function Typewriter({ text, speed = 30, color = "#EAEAEA", size = "0.875rem" }: {
  text: string; speed?: number; color?: string; size?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) setTimeout(tick, speed);
      else setDone(true);
    };
    const t = setTimeout(tick, 10);
    return () => clearTimeout(t);
  }, [text, speed]);
  return (
    <span style={{ color, fontSize: size, lineHeight: 1.65 }}>
      {displayed}
      {!done && <span style={{ opacity: 0.6, animation: "blink 0.8s step-end infinite" }}>|</span>}
    </span>
  );
}

// ─── Thinking dots ────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: "#5B8DEF",
          animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── SKU report card ──────────────────────────────────────────────────────────
const SKUS = [
  { code: "SKU-4471", name: "Industrial Valve Kit",  loss: "−$284k" },
  { code: "SKU-2209", name: "Legacy Pump Assembly",  loss: "−$196k" },
  { code: "SKU-8834", name: "Retrofit Bracket Set",  loss: "−$147k" },
  { code: "SKU-1102", name: "Obsolete Fitting",      loss: "−$93k"  },
];

function ReportCard() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const next = () => { i++; setVisible(i); if (i <= SKUS.length + 1) setTimeout(next, 140); };
    setTimeout(next, 200);
  }, []);
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(91,141,239,0.22)",
      borderRadius: 14, padding: "20px 24px", marginTop: 4,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{
          padding: "3px 10px", borderRadius: 100, fontSize: "0.67rem", fontWeight: 700,
          letterSpacing: "0.09em", textTransform: "uppercase" as const,
          background: "rgba(91,141,239,0.1)", border: "1px solid rgba(91,141,239,0.25)", color: "#5B8DEF",
        }}>Report</span>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EAEAEA" }}>SKU Loss — FY2020–2024</span>
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 14 }} />
      {SKUS.map((sku, i) => (
        <div key={sku.code} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 10, opacity: visible > i ? 1 : 0,
          transform: visible > i ? "none" : "translateY(6px)",
          transition: "opacity 0.25s, transform 0.25s",
        }}>
          <div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.05em" }}>{sku.code}</div>
            <div style={{ fontSize: "0.875rem", color: "#EAEAEA" }}>{sku.name}</div>
          </div>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FF6B6B", textShadow: "0 0 12px rgba(255,107,107,0.35)" }}>{sku.loss}</span>
        </div>
      ))}
      {visible > SKUS.length && (
        <div style={{ marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 16px", borderRadius: 100,
            background: "rgba(91,141,239,0.08)", border: "1px solid rgba(91,141,239,0.22)",
            fontSize: "0.8rem", color: "#5B8DEF", fontWeight: 600,
            animation: "pulse 2s ease-in-out infinite",
          }}>
            View Full Report →
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stress test card ─────────────────────────────────────────────────────────
const SCENARIOS = [
  { year: "2008 Financial Crisis", impact: "−38.4%", risk: "High",     color: "#FF6B6B" },
  { year: "2020 COVID Drawdown",   impact: "−22.1%", risk: "Moderate", color: "#FFAA4A" },
  { year: "2022 Rate Hike Cycle",  impact: "−14.7%", risk: "Low",      color: "#FFD966" },
];

function StressTestCard() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    const next = () => { i++; setVisible(i); if (i <= SCENARIOS.length + 1) setTimeout(next, 180); };
    setTimeout(next, 200);
  }, []);
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(91,141,239,0.22)",
      borderRadius: 14, padding: "20px 24px", marginTop: 4,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{
          padding: "3px 10px", borderRadius: 100, fontSize: "0.67rem", fontWeight: 700,
          letterSpacing: "0.09em", textTransform: "uppercase" as const,
          background: "rgba(91,141,239,0.1)", border: "1px solid rgba(91,141,239,0.25)", color: "#5B8DEF",
        }}>Stress Test</span>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EAEAEA" }}>Henderson Financial Model</span>
      </div>
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 14 }} />
      {SCENARIOS.map((sc, i) => (
        <div key={sc.year} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 10, opacity: visible > i ? 1 : 0,
          transform: visible > i ? "none" : "translateY(6px)",
          transition: "opacity 0.25s, transform 0.25s",
        }}>
          <div>
            <div style={{ fontSize: "0.875rem", color: "#EAEAEA" }}>{sc.year}</div>
            <div style={{ fontSize: "0.75rem", color: sc.color, fontWeight: 600, marginTop: 2 }}>● {sc.risk} Risk</div>
          </div>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FF6B6B", textShadow: "0 0 12px rgba(255,107,107,0.35)" }}>{sc.impact}</span>
        </div>
      ))}
      {visible > SCENARIOS.length && (
        <div style={{ marginTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 9, height: 9, borderRadius: "50%", background: "#5B8DEF",
              boxShadow: "0 0 8px #5B8DEF", animation: "pulse 1.5s ease-in-out infinite",
            }} />
            <div>
              <div style={{ fontSize: "0.82rem", color: "#5B8DEF", fontWeight: 600 }}>Monitoring Active</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Weekly scan · Alerts enabled</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Message renderer ─────────────────────────────────────────────────────────
function Message({ msg, isLatest }: { msg: Msg; isLatest: boolean }) {
  if (msg.kind === "thinking") {
    return (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
        <LogoMark size={28} />
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, borderTopLeftRadius: 4, padding: "10px 16px",
        }}>
          <ThinkingDots />
        </div>
      </div>
    );
  }
  if (msg.kind === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <div style={{
          background: "linear-gradient(135deg, #5B8DEF 0%, #3A6AD4 100%)",
          borderRadius: 14, borderBottomRightRadius: 4,
          padding: "12px 18px", maxWidth: "78%",
          boxShadow: "0 4px 20px rgba(91,141,239,0.2)",
          border: "1px solid rgba(91,141,239,0.3)",
        }}>
          {isLatest
            ? <Typewriter text={msg.text} color="#fff" size="0.875rem" />
            : <span style={{ color: "#fff", fontSize: "0.875rem", lineHeight: 1.65 }}>{msg.text}</span>}
        </div>
      </div>
    );
  }
  if (msg.kind === "aris") {
    return (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
        <LogoMark size={28} />
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(91,141,239,0.18)",
          borderRadius: 14, borderTopLeftRadius: 4,
          padding: "12px 18px", maxWidth: "78%",
        }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#5B8DEF", letterSpacing: "0.06em", marginBottom: 6 }}>A.R.I.S</div>
          {isLatest
            ? <Typewriter text={msg.text} color="#EAEAEA" size="0.875rem" />
            : <span style={{ color: "#EAEAEA", fontSize: "0.875rem", lineHeight: 1.65 }}>{msg.text}</span>}
        </div>
      </div>
    );
  }
  if (msg.kind === "report") return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 28, flexShrink: 0 }} />
      <div style={{ flex: 1 }}><ReportCard /></div>
    </div>
  );
  if (msg.kind === "stress") return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 }}>
      <div style={{ width: 28, flexShrink: 0 }} />
      <div style={{ flex: 1 }}><StressTestCard /></div>
    </div>
  );
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ArisChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [inputActive, setInputActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const runScript = () => {
    setMessages([]);
    setInputActive(false);
    const step = (idx: number) => {
      if (idx >= SCRIPT.length) {
        timerRef.current = setTimeout(runScript, 4000);
        return;
      }
      const { msg, delay } = SCRIPT[idx];
      timerRef.current = setTimeout(() => {
        if (msg.kind === "user") setInputActive(true);
        else setInputActive(false);
        setMessages(prev => {
          if (msg.kind === "aris" || msg.kind === "report" || msg.kind === "stress") {
            return [...prev.filter(m => m.kind !== "thinking"), msg];
          }
          return [...prev, msg];
        });
        step(idx + 1);
      }, delay);
    };
    step(0);
  };

  useEffect(() => {
    runScript();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(91,141,239,0.18)",
      borderRadius: 20,
      boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(91,141,239,0.04)",
      display: "flex", flexDirection: "column",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Nav bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LogoMark size={32} />
          <div>
            <div style={{
              fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.02em",
              background: "linear-gradient(115deg, #00D4FF 0%, #5B8DEF 60%, #A0BAFF 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>A.R.I.S</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Adaptive Response Intelligence System</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#5B8DEF", boxShadow: "0 0 8px #5B8DEF" }} />
          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>Connected</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "20px 22px 8px", scrollbarWidth: "none" }}>
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} isLatest={i === messages.length - 1} />
        ))}
      </div>

      {/* Input bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 18px 16px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0,
      }}>
        <div style={{
          flex: 1, height: 40, borderRadius: 20,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${inputActive ? "rgba(91,141,239,0.4)" : "rgba(255,255,255,0.08)"}`,
          display: "flex", alignItems: "center", padding: "0 16px", gap: 10,
          transition: "border-color 0.3s",
        }}>
          {inputActive ? (
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{
                  width: 3, borderRadius: 2, background: "#5B8DEF",
                  animation: `waveBar 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
                  height: 14,
                }} />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>Ask anything about your operation…</span>
          )}
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
          background: inputActive ? "linear-gradient(135deg, #5B8DEF, #3A6AD4)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${inputActive ? "rgba(91,141,239,0.4)" : "rgba(255,255,255,0.08)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: inputActive ? "0 4px 16px rgba(91,141,239,0.3)" : "none",
          transition: "all 0.3s",
        }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <rect x="4" y="1" width="6" height="8" rx="3" stroke={inputActive ? "white" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" />
            <path d="M2 7c0 2.76 2.24 5 5 5s5-2.24 5-5" stroke={inputActive ? "white" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="12" x2="7" y2="13.5" stroke={inputActive ? "white" : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes dotBounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes waveBar {
          from { height: 4px; }
          to   { height: 16px; }
        }
      `}</style>
    </div>
  );
}
