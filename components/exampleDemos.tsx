// Homepage example demos: agents at work in different kinds of business. Each takes the
// current tick and draws its state. Names and numbers are illustrative.

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

// ─── Shipment agent: logistics, a late load caught before the customer calls ──
const LOADS = [
  { id: "7728", lane: "Reno to Boise", eta: "1:10 PM", st: "On time" },
  { id: "7731", lane: "Tacoma to Spokane", eta: "2:00 PM", st: "On time", late: "5:05 PM" },
  { id: "7735", lane: "Portland to Salem", eta: "11:30 AM", st: "Delivered" },
  { id: "7740", lane: "Eugene to Medford", eta: "8:00 AM +1", st: "On time" },
];

export const SHIPMENT_END = 20;
export function ShipmentDemo({ t }: { t: number }) {
  const late = t >= 5;
  const fixed = t >= 11;
  return (
    <div className="ex-2col wide-left">
      <div className="ex-card">
        <div className="ex-cardhead"><span className="h-live"><i />Watching 38 loads</span><small>Carrier feeds, weather, check calls</small></div>
        <div className="ex-tr head" style={{ ["--cols" as string]: "64px 1.4fr 1fr 1fr" }}><span>Load</span><span>Lane</span><span>ETA</span><span>Status</span></div>
        {LOADS.map((l, i) => {
          const isLate = l.late && late;
          return (
            <div className={`ex-tr${t >= i ? " in" : ""}${isLate && !fixed ? " warn" : ""}${isLate && fixed ? " resolved" : ""}`} style={{ ["--cols" as string]: "64px 1.4fr 1fr 1fr" }} key={l.id}>
              <b>{l.id}</b>
              <span>{l.lane}</span>
              <span>{isLate ? l.late : l.eta}</span>
              <span className={`ex-pill ${isLate ? (fixed ? "ok" : "warn") : l.st === "Delivered" ? "soft" : "ok"}`}>{isLate ? (fixed ? "Dock moved" : "Late 3 hrs") : l.st}</span>
            </div>
          );
        })}
        <div className={`ex-draft${t >= 8 ? " in" : ""}`}>
          <small>Draft to Northline Builders</small>
          <p>Load 7731 is running about 3 hours behind because of a lane closure on I-90. New arrival is 5:05 PM. We&apos;ve asked for a 5:15 PM dock slot.</p>
        </div>
      </div>
      <div className="ex-stack">
        <div className={`ia-review${t >= 7 ? " in" : ""}`}>
          <div className="ia-review-q">Load 7731 will miss its 2:00 PM dock slot</div>
          <p>Receiving closes at 5:30 PM, so the new ETA still fits.</p>
          <div className="ex-btns">
            <span className={`ex-btn${t >= 10 ? " sel" : ""}`}>Move dock to 5:15 PM and notify</span>
            <span className="ex-btn">Rebook with backup carrier</span>
          </div>
        </div>
        <div className="ia-done">
          <div className={t >= 11 ? "in" : ""}><em>✓</em>Approved by M. Reyes in 2 minutes</div>
          <div className={t >= 12 ? "in" : ""}><em>✓</em>Dock appointment moved in the TMS</div>
          <div className={t >= 13 ? "in" : ""}><em>✓</em>Update sent to Northline Builders</div>
        </div>
      </div>
    </div>
  );
}

// ─── Research agent: a law firm asks its own files a question ────────────────
const QUESTION = "What did we agree on the indemnity cap in the Halvorsen MSA, and has our position changed since?";
const ANSWER = "The signed MSA caps indemnity at 12 months of fees (section 9.2). On March 14, J. Park emailed Halvorsen agreeing to 24 months for data breaches only, but the signed redline (v4) still says 12. The email and the contract disagree.";
const SOURCES = ["Document system · 214 files", "Email · 1,380 messages", "Billing notes · 62 entries"];
const CITES = ["Halvorsen MSA §9.2", "Email · J. Park · Mar 14", "Redline v4"];

export const RESEARCH_END = 24;
export function ResearchDemo({ t }: { t: number }) {
  const w = ANSWER.split(" ");
  const n = Math.max(0, Math.min(w.length, (t - 3) * 6));
  const done = n === w.length;
  return (
    <div className="ex-2col wide-left">
      <div className="ex-card ex-chat">
        <div className="ex-ask in"><small>Associate</small>{QUESTION}</div>
        <div className={`ex-ans${t >= 3 ? " in" : ""}`}>
          <small>Assistant</small>
          <p>{w.slice(0, n).join(" ")}{t >= 3 && !done && <i className="sc-caret" />}</p>
          <div className="ex-cites">
            {CITES.map((c, i) => <span className={done && t >= 3 + 9 + i ? "in" : ""} key={c}>{c}</span>)}
          </div>
        </div>
      </div>
      <div className="ex-stack">
        <div className="ex-card ex-pad">
          <div className="ex-label">Searched, limited to what this person may see</div>
          <div className="ex-chips">{SOURCES.map((x, i) => <span className={t >= 1 + i ? "in" : ""} key={x}>✓ {x}</span>)}</div>
          <div className={`ex-lock${t >= 4 ? " in" : ""}`}>2 files hidden: restricted matter</div>
        </div>
        <div className={`ia-review${t >= 15 ? " in" : ""}`}>
          <div className="ia-review-q">Agent note for the attorney</div>
          <p>The email and the contract disagree. Confirm which governs before this goes to the client.</p>
          <div className="ex-btns">
            <span className={`ex-btn${t >= 17 ? " sel" : ""}`}>Flag for partner review</span>
            <span className="ex-btn">Add to matter notes</span>
          </div>
        </div>
        <div className="ia-done">
          <div className={t >= 18 ? "in" : ""}><em>✓</em>Answer saved to the matter with its sources</div>
          <div className={t >= 19 ? "in" : ""}><em>✓</em>Partner review requested</div>
        </div>
      </div>
    </div>
  );
}

// ─── Invoice agent: accounting, three-way match on every vendor bill ─────────
const BILLS = [
  { v: "Ridge Supply", n: "INV-4410", po: "PO-2231", amt: "$6,210", ok: true },
  { v: "Cascade Electric", n: "INV-0982", po: "PO-2240", amt: "$7,480", ok: true },
  { v: "Northwest Lumber", n: "INV-7713", po: "PO-2252", amt: "$4,320", ok: false },
  { v: "Summit Freight", n: "INV-3301", po: "PO-2258", amt: "$4,950", ok: true },
];

export const INVOICE_END = 21;
export function InvoiceDemo({ t }: { t: number }) {
  const matched = Math.max(0, Math.min(BILLS.length, t - 2));
  const fixed = t >= 11;
  return (
    <div className="ex-2col wide-left">
      <div className="ex-card">
        <div className="ex-cardhead"><b>AP inbox · 4 vendor bills</b><small>Matched to purchase order and receiving</small></div>
        <div className="ex-tr head" style={{ ["--cols" as string]: "1.3fr 80px 70px 1fr" }}><span>Vendor</span><span>Invoice</span><span>Amount</span><span>Match</span></div>
        {BILLS.map((b, i) => {
          const shown = matched > i;
          const flagged = !b.ok && shown;
          return (
            <div className={`ex-tr${t >= i ? " in" : ""}${flagged && !fixed ? " warn" : ""}${flagged && fixed ? " resolved" : ""}`} style={{ ["--cols" as string]: "1.3fr 80px 70px 1fr" }} key={b.n}>
              <span><b>{b.v}</b><small>{b.po} + receiving</small></span>
              <span>{b.n}</span>
              <span>{b.amt}</span>
              <span>{shown && <span className={`ex-pill ${b.ok ? "ok" : fixed ? "ok" : "warn"}`}>{b.ok ? "Matched" : fixed ? "Fixed" : "Billed 120, got 100"}</span>}</span>
            </div>
          );
        })}
        <div className={`ex-sum${t >= 7 ? " in" : ""}`}><span>Ready to pay <b>$18,640</b></span><span>Held for review <b>$4,320</b></span></div>
      </div>
      <div className="ex-stack">
        <div className={`ia-review${t >= 8 ? " in" : ""}`}>
          <div className="ia-review-q">1 bill held</div>
          <p>Northwest Lumber billed 120 units. Receiving logged 100.</p>
          <div className="ex-btns">
            <span className={`ex-btn${t >= 10 ? " sel" : ""}`}>Pay 100, request credit for 20</span>
            <span className="ex-btn">Pay as billed</span>
          </div>
        </div>
        <div className="ia-done">
          <div className={t >= 11 ? "in" : ""}><em>✓</em>Approved by S. Patel in 3 minutes</div>
          <div className={t >= 12 ? "in" : ""}><em>✓</em>4 bills posted to QuickBooks for payment</div>
          <div className={t >= 13 ? "in" : ""}><em>✓</em>Credit request drafted to Northwest Lumber</div>
        </div>
      </div>
    </div>
  );
}

// ─── Renewal agent: insurance, a month of renewals assembled for review ──────
const RENEWALS = [
  { c: "Alder Dental Group", l: "Commercial package", flag: false },
  { c: "Brennan Roofing", l: "Workers comp", flag: false },
  { c: "Coastal Cafe", l: "Property", flag: true },
  { c: "Dunmore Logistics", l: "Auto fleet", flag: false },
];

export const RENEWAL_END = 21;
export function RenewalDemo({ t }: { t: number }) {
  const count = Math.min(23, Math.max(0, (t - 1) * 4));
  const fixed = t >= 11;
  return (
    <div className="ex-2col wide-left">
      <div className="ex-stack">
        <div className="ex-kpis3">
          <div><small>Renewals due in 60 days</small><b>23</b></div>
          <div><small>Packets drafted</small><b>{count}</b></div>
          <div><small>Need a producer</small><b className={count >= 23 ? "ex-warnnum" : ""}>{count >= 23 ? 2 : 0}</b></div>
        </div>
        <div className="ex-card">
          <div className="ex-tr head" style={{ ["--cols" as string]: "1.4fr 1fr 1fr" }}><span>Client</span><span>Line</span><span>Status</span></div>
          {RENEWALS.map((r, i) => {
            const shown = t >= 4 + i;
            return (
              <div className={`ex-tr${t >= i ? " in" : ""}${r.flag && shown && !fixed ? " warn" : ""}${r.flag && shown && fixed ? " resolved" : ""}`} style={{ ["--cols" as string]: "1.4fr 1fr 1fr" }} key={r.c}>
                <b>{r.c}</b>
                <span>{r.l}</span>
                <span>{shown && <span className={`ex-pill ${r.flag ? (fixed ? "ok" : "warn") : "ok"}`}>{r.flag ? (fixed ? "Remarketing" : "Claim in June") : "Packet ready"}</span>}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ex-stack">
        <div className={`ia-review${t >= 8 ? " in" : ""}`}>
          <div className="ia-review-q">2 renewals need a producer</div>
          <p>Coastal Cafe filed a property claim in June. Quoting it as is could misprice the account.</p>
          <div className="ex-btns">
            <span className={`ex-btn${t >= 10 ? " sel" : ""}`}>Remarket before quoting</span>
            <span className="ex-btn">Quote as is</span>
          </div>
        </div>
        <div className="ia-done">
          <div className={t >= 11 ? "in" : ""}><em>✓</em>21 renewal packets held for producer sign-off</div>
          <div className={t >= 12 ? "in" : ""}><em>✓</em>Coastal Cafe flagged for remarketing</div>
          <div className={t >= 13 ? "in" : ""}><em>✓</em>Nothing sent to a client yet</div>
        </div>
      </div>
    </div>
  );
}
