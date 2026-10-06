// Homepage example demos. Each takes the current tick and draws its state.
// Names and numbers are illustrative.

// ─── Phone agent: after-hours call booked onto the dispatch board ────────────
const CALL = [
  { who: "Caller", text: "Our furnace stopped and it's 50 degrees in here." },
  { who: "Agent", text: "I can help. Is anyone in the home elderly or unwell?" },
  { who: "Caller", text: "No, just us. It's blowing cold air." },
  { who: "Agent", text: "I have 7:30 tomorrow morning with Marco. Does that work?" },
  { who: "Caller", text: "Yes, please." },
];
const HOURS = ["7", "8", "9", "10", "11", "12"];
const pos = (start: number, dur: number) => ({ left: `${((start - 7) / 6) * 100}%`, width: `${(dur / 6) * 100}%` });

export const PHONE_END = 19;
export function PhoneDemo({ t }: { t: number }) {
  const placed = t >= 6, moved = t >= 10, confirmed = t >= 11;
  return (
    <div className="ex-2col">
      <div className="ex-card">
        <div className="ex-cardhead"><span className="h-live"><i />Incoming call · 9:14 PM</span><small>After hours</small></div>
        <div className="ia-call ex-pad">
          {CALL.map((s, i) => (
            <div className={`ia-said${s.who === "Agent" ? " agent" : ""}${t >= i ? " in" : ""}`} key={s.text}><small>{s.who}</small>{s.text}</div>
          ))}
        </div>
      </div>
      <div className="ex-stack">
        <div className="ex-card">
          <div className="ex-cardhead"><b>Tomorrow&apos;s board</b><small>Wed, Oct 8</small></div>
          <div className="ex-board">
            <div className="ex-hours"><span />{HOURS.map((h) => <span key={h}>{h}</span>)}</div>
            <div className="ex-lane"><b>Marco</b><div className="ex-track">
              <i className={`ex-job${placed && !moved ? " warn" : ""}`} style={moved ? pos(9.5, 1) : pos(7, 1)}>Tune-up · Patel</i>
              {placed && <i className={`ex-job new${confirmed ? " ok" : " warn"}`} style={pos(7.5, 1)}>No heat · Whitfield</i>}
              <i className="ex-job" style={pos(11, 2)}>Install · Greene</i>
            </div></div>
            <div className="ex-lane"><b>Jen</b><div className="ex-track">
              <i className="ex-job" style={pos(8, 2)}>Repair · Ortiz</i>
              <i className="ex-job" style={pos(11, 1)}>Tune-up · Lam</i>
            </div></div>
            <div className="ex-lane"><b>Luis</b><div className="ex-track">
              <i className="ex-job" style={pos(7, 4.5)}>Install · Brooks</i>
            </div></div>
          </div>
        </div>
        <div className={`ia-review${t >= 7 ? " in" : ""}`}>
          <div className="ia-review-q">Dispatch: 1 conflict</div>
          <p>Marco has a 7:00 tune-up. Mr. Patel said any time works.</p>
          <div className="ex-btns">
            <span className={`ex-btn${t >= 9 ? " sel" : ""}`}>Move the tune-up to 9:30</span>
            <span className="ex-btn">Send Jen instead</span>
          </div>
        </div>
        <div className="ia-done">
          <div className={confirmed ? "in" : ""}><em>✓</em>Job 44812 confirmed on Marco&apos;s board</div>
          <div className={t >= 12 ? "in" : ""}><em>✓</em>Text to Dana: Marco arrives at 7:30</div>
          <div className={t >= 13 ? "in" : ""}><em>✓</em>Mr. Patel asked to confirm 9:30</div>
        </div>
      </div>
    </div>
  );
}

// ─── Report writer: monthly client report drafted from live data ─────────────
const MONTHS = [["Apr", 148], ["May", 160], ["Jun", 171], ["Jul", 165], ["Aug", 186], ["Sep", 212]] as const;
const PARAS = [
  "Leads rose 14% to 212 on the same $18,420 budget. Auto loan searches drove 61% of them.",
  "Cost per lead fell 9% to $86.89 after the new video ads went live on Meta.",
];
const FLAGGED = "Mobile sign-ups fell after the September 12 form change. We recommend restoring the shorter form.";
const words = (s: string) => s.split(" ");
const TYPE_START = 4, PER_TICK = 6;

export const REPORT_END = 26;
export function ReportDemo({ t }: { t: number }) {
  let budget = Math.max(0, (t - TYPE_START) * PER_TICK);
  const typed = [...PARAS, FLAGGED].map((p) => {
    const w = words(p);
    const n = Math.min(w.length, budget);
    budget -= n;
    return w.slice(0, n).join(" ");
  });
  const doneTyping = typed[2].length === FLAGGED.length;
  const confirmed = t >= 18;
  return (
    <div className="ex-2col wide-left">
      <div className="ex-card ex-doc">
        <div className="ex-dochead">
          <div><b>Evergreen Credit Union</b><small>September performance report</small></div>
          <span className={`sc-chip ${t >= 19 ? "ok" : "warn"}`}>{t >= 19 ? "Approved" : "Draft"}</span>
        </div>
        <div className="ex-kpis">
          {[["Leads", "212", "+14%"], ["Cost per lead", "$86.89", "−9%"], ["Loan applications", "37", "+6%"]].map(([k, v, d], i) => (
            <div className={t >= 1 + i ? "in" : ""} key={k}><small>{k}</small><b>{v}</b><em>{d}</em></div>
          ))}
        </div>
        <div className="ex-bars">
          {MONTHS.map(([m, v], i) => (
            <div key={m}><i style={{ height: t >= 2 ? `${((v - 110) / 102) * 100}%` : 0, transitionDelay: `${i * 80}ms` }} className={i === 5 ? "last" : ""} /><small>{m}</small></div>
          ))}
        </div>
        <div className="ex-prose">
          <p>{typed[0]}{typed[0] && typed[0].length < PARAS[0].length && <i className="sc-caret" />}</p>
          <p>{typed[1]}{typed[1] && typed[1].length < PARAS[1].length && <i className="sc-caret" />}</p>
          <p><mark className={!doneTyping ? "" : confirmed ? "ok" : "warn"}>{typed[2]}</mark>{typed[2] && !doneTyping && <i className="sc-caret" />}</p>
        </div>
      </div>
      <div className="ex-stack">
        <div className="ex-card ex-pad">
          <div className="ex-label">Pulled on the 1st</div>
          <div className="ex-chips">{["Google Ads", "Meta Ads", "GA4", "HubSpot"].map((x, i) => <span className={t >= i ? "in" : ""} key={x}>✓ {x}</span>)}</div>
        </div>
        <div className={`ia-review${doneTyping ? " in" : ""}`}>
          <div className="ia-review-q">{confirmed ? "Confirmed by R. Kim" : "Agent note for the account manager"}</div>
          <p>The drop started the day the form changed. The data can&apos;t prove the form caused it. Keep this sentence?</p>
          <div className="ex-btns">
            <span className={`ex-btn${confirmed ? " sel" : ""}`}>Keep it</span>
            <span className="ex-btn">Soften it</span>
          </div>
        </div>
        <div className="ia-done">
          <div className={t >= 19 ? "in" : ""}><em>✓</em>Approved by R. Kim in 4 minutes</div>
          <div className={t >= 20 ? "in" : ""}><em>✓</em>Scheduled to send Oct 2, 9 AM</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tool audit: every subscription, what it costs, what to do about it ─────
const TOOLS: { name: string; seats: string; cost: number; used: number; verdict: string; kind: "keep" | "cut" | "trim" | "replace"; save: number }[] = [
  { name: "Practice management", seats: "22 seats", cost: 26400, used: 95, verdict: "Keep", kind: "keep", save: 0 },
  { name: "Document storage", seats: "22 seats", cost: 9240, used: 88, verdict: "Keep, connect it", kind: "keep", save: 0 },
  { name: "AI research add-on", seats: "22 seats", cost: 18480, used: 14, verdict: "Trim to 4 seats", kind: "trim", save: 15120 },
  { name: "E-signature, second plan", seats: "8 seats", cost: 3840, used: 0, verdict: "Cut", kind: "cut", save: 3840 },
  { name: "Intake and scheduling forms", seats: "3 tools", cost: 7800, used: 41, verdict: "Replace with one intake agent", kind: "replace", save: 7800 },
  { name: "Video meetings, two vendors", seats: "22 seats", cost: 4560, used: 50, verdict: "Keep one", kind: "trim", save: 2280 },
  { name: "Billing and payments", seats: "Firm plan", cost: 6000, used: 100, verdict: "Keep", kind: "keep", save: 0 },
];
const SPEND = TOOLS.reduce((n, x) => n + x.cost, 0);
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export const AUDIT_END = 24;
export function AuditDemo({ t }: { t: number }) {
  const judged = Math.max(0, Math.min(TOOLS.length, t - 8));
  const found = TOOLS.slice(0, judged).reduce((n, x) => n + x.save, 0);
  return (
    <div className="ex-stack">
      <div className="sc-kpis">
        <div><small>Software spend per year</small><strong>{money(SPEND)}</strong></div>
        <div><small>Savings found</small><strong className="ex-green">{money(found)}</strong></div>
        <div><small>Share of spend</small><strong>{Math.round((found / SPEND) * 100)}%</strong></div>
      </div>
      <div className="ex-card">
        <div className="ex-audit ex-audit-head"><span>Tool</span><span>Per year</span><span>Actually used</span><span>Recommendation</span></div>
        {TOOLS.map((x, i) => (
          <div className={`ex-audit${t >= i ? " in" : ""}`} key={x.name}>
            <span><b>{x.name}</b><small>{x.seats}</small></span>
            <span className="ex-cost">{money(x.cost)}</span>
            <span className="sc-bar"><span className="sc-track"><i style={{ width: t >= 7 ? `${x.used}%` : 0, background: x.used < 30 ? "#d64545" : x.used < 60 ? "#e8a33d" : "#00b36e" }} /></span><em>{x.used}%</em></span>
            <span>{judged > i && <span className={`ex-verdict ${x.kind}`}>{x.verdict}{x.save > 0 && ` · saves ${money(x.save)}`}</span>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Team training: adoption and playbooks built on the firm's own work ─────
const WEEKS = [3, 7, 12, 16, 19, 22, 24, 26];
const PLAYBOOKS = [
  { name: "Client email replies", team: "Tax team", hrs: 9 },
  { name: "IRS notice responses", team: "Tax team", hrs: 4 },
  { name: "Month-end commentary", team: "Advisory", hrs: 6 },
  { name: "Bank reconciliation prep", team: "Bookkeeping", hrs: 7 },
];

export const TRAINING_END = 21;
export function TrainingDemo({ t }: { t: number }) {
  const weeks = Math.max(0, Math.min(WEEKS.length, t + 1));
  const books = Math.max(0, Math.min(PLAYBOOKS.length, t - 7));
  const hrs = PLAYBOOKS.slice(0, books).reduce((n, x) => n + x.hrs, 0);
  return (
    <div className="ex-2col">
      <div className="ex-card ex-pad">
        <div className="ex-label">Staff using AI on real work, by week <span>of 30</span></div>
        <div className="ex-bars tall">
          {WEEKS.map((v, i) => (
            <div key={i}><b className={weeks > i ? "in" : ""}>{v}</b><i style={{ height: weeks > i ? `${(v / 30) * 100}%` : 0 }} className={i === weeks - 1 ? "last" : ""} /><small>Wk {i + 1}</small></div>
          ))}
        </div>
        <div className="ex-session">This week&apos;s session: {["AI basics on your client files", "Email drafts that sound like you", "Reading IRS notices", "Month-end narratives", "Bank rec prep", "Prompting for review, not answers", "Tax season prep", "Agents on your own data"][Math.max(0, weeks - 1)]}</div>
      </div>
      <div className="ex-stack">
        <div className="sc-kpis two">
          <div><small>Using AI weekly</small><strong>{WEEKS[Math.max(0, weeks - 1)]} of 30</strong></div>
          <div><small>Hours saved a week</small><strong className="ex-green">{hrs}</strong></div>
        </div>
        <div className="ex-card">
          <div className="ex-cardhead"><b>Playbooks built from your own work</b></div>
          {PLAYBOOKS.map((p, i) => (
            <div className={`ex-book${books > i ? " in" : ""}`} key={p.name}>
              <span><b>{p.name}</b><small>{p.team}</small></span>
              <em>{p.hrs} hrs/wk</em>
            </div>
          ))}
        </div>
        <div className="ia-done">
          <div className={t >= 13 ? "in" : ""}><em>✓</em>AI usage policy signed by 30 of 30</div>
          <div className={t >= 14 ? "in" : ""}><em>✓</em>Client data stays in approved tools only</div>
        </div>
      </div>
    </div>
  );
}

// ─── Software you own: rent vs. own, and what's in your name ─────────────────
const OWN = [
  "Source code in your company's repository",
  "Database on your company's account",
  "Hosting in your company's name",
  "Guides and training for every team",
  "If you stop working with us, nothing breaks",
];
// cumulative cost, as a share of the chart height
const RENT = [0.18, 0.36, 0.54, 0.72, 0.9];
const OWNED = [0.15, 0.17, 0.19, 0.21, 0.23];
const pts = (ys: number[]) => ys.map((y, i) => `${40 + i * 85},${210 - y * 200}`).join(" ");

export const OWN_END = 20;
export function OwnDemo({ t }: { t: number }) {
  const drawn = t >= 1;
  return (
    <div className="ex-2col wide-left">
      <div className="ex-card ex-pad">
        <div className="ex-label">Five years of a $100,000-a-year platform</div>
        <svg className="ex-chart" viewBox="0 0 420 240" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => <line key={i} x1="40" x2="400" y1={30 + i * 60} y2={30 + i * 60} className="ex-grid" />)}
          <polygon points={`${pts(RENT)} ${pts(OWNED).split(" ").reverse().join(" ")}`} className={`ex-gap${t >= 5 ? " in" : ""}`} />
          <polyline points={pts(RENT)} className={`ex-line rent${drawn ? " in" : ""}`} />
          <polyline points={pts(OWNED)} className={`ex-line own${drawn ? " in" : ""}`} />
          {RENT.map((_, i) => <text key={i} x={40 + i * 85} y="232" className="ex-axis" textAnchor="middle">Year {i + 1}</text>)}
          <text x="392" y={210 - 0.9 * 200 - 10} textAnchor="end" className={`ex-tag rent${t >= 3 ? " in" : ""}`}>Renting: $500,000</text>
          <text x="392" y={210 - 0.23 * 200 - 10} textAnchor="end" className={`ex-tag own${t >= 4 ? " in" : ""}`}>Owning: one build, then hosting</text>
          <text x="300" y="120" textAnchor="middle" className={`ex-gaptext${t >= 5 ? " in" : ""}`}>What you keep</text>
        </svg>
        <div className="ex-caption">Illustrative. Your build is priced in writing after discovery.</div>
      </div>
      <div className="ex-stack">
        <div className="ex-card">
          <div className="ex-cardhead"><b>What&apos;s in your name</b></div>
          {OWN.map((o, i) => (
            <div className={`ex-own${t >= 6 + i ? " in" : ""}`} key={o}><em>✓</em>{o}</div>
          ))}
        </div>
        <div className={`ex-quote${t >= 12 ? " in" : ""}`}>No seats, no renewal, no price increase when you hire.</div>
      </div>
    </div>
  );
}
