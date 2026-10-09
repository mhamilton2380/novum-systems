import { Icon } from "@/components/PageVisuals";

// One graphic per industry, each showing that industry's own problem, the way it looks on a normal day.
// Figures and names are illustrative (the panel says "Example"). Styles: app/visuals.css (prefix pa-).
// `pain` is the index in lib/useCases.ts pains that the graphic illustrates; the list beside it highlights it.

export const PROBLEM_PAIN: Record<string, number> = {
  construction: 0, "field-services": 0, legal: 1, accounting: 1, insurance: 0,
  healthcare: 1, "marketing-agencies": 2, manufacturing: 0, "wholesale-distribution": 0,
};

function Construction() {
  // Bar runs $350k to $450k. Budget $430k sits at 80%.
  const src = [
    { s: "Job cost software", v: "$412,800", n: "Spent to date", total: 412800 },
    { s: "Change orders in email", v: "+$18,400", n: "Approved, never posted", total: 431200 },
    { s: "The Friday spreadsheet", v: "$397,150", n: "Last updated 6 days ago", total: 397150 },
  ];
  const at = (n: number) => ((n - 350000) / 100000) * 100;
  return (
    <div className="pa pa-con">
      <div className="pa-q">Job 214, office build: are we over budget?</div>
      <div className="pa-con-cards">
        {src.map((x, i) => (
          <div key={x.s}><b>{i + 1}</b><small>{x.s}</small><strong>{x.v}</strong><em>{x.n}</em></div>
        ))}
      </div>
      <div className="pa-con-bar">
        <div>
          <span className="budget" style={{ left: "80%" }}><small>Budget $430,000</small></span>
          {src.map((x, i) => (
            <b key={x.s} className={x.total > 430000 ? "over" : ""} style={{ left: `${at(x.total)}%` }}>{i + 1}</b>
          ))}
        </div>
        <div className="pa-con-legend"><span>1 says $17,200 under</span><span className="over">1 + 2 says $1,200 over</span><span>3 says $32,850 under</span></div>
      </div>
      <div className="pa-foot bad">Under or over budget depends on which tool you open.</div>
    </div>
  );
}

function Field() {
  const techs = [
    { t: "Tech 1", jobs: [{ x: 0, w: 28, j: "Water heater", inv: true }, { x: 34, w: 30, j: "AC tune-up", inv: false, d: 3 }, { x: 70, w: 26, j: "Thermostat", inv: true }] },
    { t: "Tech 2", jobs: [{ x: 6, w: 38, j: "Panel upgrade", inv: false, d: 5 }, { x: 52, w: 24, j: "Drain clear", inv: true }] },
    { t: "Tech 3", jobs: [{ x: 0, w: 22, j: "Repeat call", inv: true }, { x: 28, w: 34, j: "Furnace", inv: false, d: 2 }] },
  ];
  return (
    <div className="pa pa-field">
      <div className="pa-field-hours" aria-hidden="true"><span>8a</span><span>10a</span><span>12p</span><span>2p</span></div>
      {techs.map((r, i) => (
        <div className="pa-field-row" key={r.t}>
          <small>{r.t}</small>
          <div>
            {r.jobs.map((j, k) => (
              <span key={j.j} className={j.inv ? "ok" : "bad"} style={{ left: `${j.x}%`, width: `${j.w}%`, ["--i" as string]: i * 3 + k }}>
                <b>✓ {j.j}</b>
                <em>{j.inv ? "Invoiced" : `No invoice · ${j.d} days`}</em>
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="pa-foot bad"><strong>3 of 7</strong> finished jobs haven&apos;t been billed. The dispatch board doesn&apos;t know.</div>
    </div>
  );
}

function Legal() {
  const rows: { s: string; m: { d: number; t: string; only?: boolean; miss?: boolean }[] }[] = [
    { s: "Docketing tool", m: [{ d: 1, t: "Hearing" }] },
    { s: "Partner's calendar", m: [{ d: 1, t: "Hearing" }, { d: 3, t: "Client call" }] },
    { s: "Sticky note", m: [{ d: 4, t: "Response due", only: true }] },
    { s: "What the firm sees", m: [{ d: 1, t: "Hearing" }, { d: 3, t: "Client call" }, { d: 4, t: "Nothing due", miss: true }] },
  ];
  return (
    <div className="pa pa-legal">
      <div className="pa-legal-days" aria-hidden="true"><span /> {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => <span key={d}>{d}</span>)}</div>
      {rows.map((r, i) => (
        <div className={`pa-legal-row ${i === 2 ? "note" : i === 3 ? "firm" : ""}`} key={r.s}>
          <small>{r.s}</small>
          {[0, 1, 2, 3, 4].map((d) => {
            const m = r.m.find((x) => x.d === d);
            return <span key={d}>{m && <b className={m.only ? "only" : m.miss ? "miss" : ""} style={{ ["--i" as string]: i * 2 + d }}>{m.t}</b>}</span>;
          })}
        </div>
      ))}
      <div className="pa-foot bad">Friday&apos;s response deadline is on one sticky note, on one desk.</div>
    </div>
  );
}

function Accounting() {
  const rows = [
    { c: "Client 014", f: "1065", d: "Mar 16", s: "Filed", t: "ok" },
    { c: "Client 022", f: "1120-S", d: "Mar 16", s: "Waiting on K-1s", t: "warn" },
    { c: "Client 031", f: "1065", d: "Mar 16", s: "?", t: "bad" },
    { c: "Client 047", f: "1040", d: "Apr 15", s: "Ask J.", t: "bad" },
  ];
  return (
    <div className="pa pa-acct">
      <div className="pa-sheet-bar"><Icon name="doc" size={14} />deadlines_FINAL_v3.xlsx<em>Last edited by J., out this week</em></div>
      <div className="pa-sheet">
        <div className="h"><span>Client</span><span>Form</span><span>Due</span><span>Status</span></div>
        {rows.map((r, i) => (
          <div key={r.c} style={{ ["--i" as string]: i }}><span>{r.c}</span><span>{r.f}</span><span>{r.d}</span><span className={r.t}>{r.s}</span></div>
        ))}
      </div>
      <div className="pa-acct-clock"><strong>6 days</strong><span>to March 16. One of those returns has no status, and the only person who knows is out.</span></div>
    </div>
  );
}

function Insurance() {
  // Track: 90 days out at 0%, renewal day at 84%, past it is the lapse zone.
  const pol = [
    { p: "Commercial auto", d: 74 },
    { p: "General liability", d: 41 },
    { p: "Workers comp", d: 12 },
    { p: "Umbrella", d: -6 },
  ];
  const at = (d: number) => ((90 - d) / 90) * 84;
  return (
    <div className="pa pa-ins">
      <div className="pa-ins-axis" aria-hidden="true">
        <div>{[90, 60, 30].map((d) => <span key={d} style={{ left: `${at(d)}%` }}>{d === 90 ? "90 days out" : d}</span>)}<span className="due" style={{ left: "84%" }}>Renewal</span></div>
      </div>
      {pol.map((x, i) => (
        <div className={`pa-ins-row ${x.d < 0 ? "bad" : x.d < 20 ? "warn" : ""}`} key={x.p} style={{ ["--i" as string]: i }}>
          <small>{x.p}</small>
          <div><i style={{ width: `${at(x.d)}%` }} /><b style={{ left: `${at(x.d)}%` }} /></div>
          <em>{x.d < 0 ? "Lapsed" : `${x.d} days`}</em>
        </div>
      ))}
      <div className="pa-sheet-bar"><Icon name="doc" size={14} />renewals_2026.xlsx · Umbrella · renewal 10/03<em>Called client: (blank)</em></div>
      <div className="pa-foot bad">The umbrella renewal passed six days ago. Nobody called, and the client finds out at claim time.</div>
    </div>
  );
}

function Healthcare() {
  return (
    <div className="pa pa-hc">
      <div className="pa-hc-tabs" aria-hidden="true">
        {["Payer A portal", "Payer B portal", "Payer C portal", "Payer D portal"].map((t, i) => <span key={t} className={i === 1 ? "on" : ""}>{t}</span>)}
      </div>
      <div className="pa-hc-body">
        <div className="pa-hc-login">
          <small>Payer B · provider sign in</small>
          <span /><span /><b>Sign in</b>
          <em>Session expired. Sign in again.</em>
        </div>
        <div className="pa-hc-queue">
          <small>Prior auths today</small>
          <strong>3 <span>of 14</span></strong>
          <div><i style={{ width: "21%" }} /></div>
          <em>2 hrs 10 min so far</em>
        </div>
      </div>
      <div className="pa-hc-next">
        {[["Patient 4", "MRI, lumbar", "Payer B"], ["Patient 5", "Physical therapy", "Payer D"], ["Patient 6", "Sleep study", "Payer A"]].map(([p, w, y]) => (
          <div key={p}><span>{p}</span><span>{w}</span><em>{y} portal</em></div>
        ))}
      </div>
      <div className="pa-foot bad">Every patient means another portal, another login, another form.</div>
    </div>
  );
}

function Marketing() {
  const src = ["Google Ads", "Meta Ads Manager", "HubSpot", "Analytics"];
  return (
    <div className="pa pa-mkt">
      <div className="pa-mkt-src">
        {src.map((s, i) => <span key={s} style={{ ["--i" as string]: i }}><Icon name="doc" size={13} />{s}<em>export.csv</em></span>)}
      </div>
      <div className="pa-mkt-paste" aria-hidden="true"><b>Copy</b><i /><b>Paste</b></div>
      <div className="pa-mkt-sheet">
        <small>Client report · October</small>
        <div>
          {["Channel", "Spend", "Clicks", "Leads"].map((h) => <span key={h} className="h">{h}</span>)}
          {[["Google Ads", "$4,210", "3,118", "41"], ["Meta", "$2,860", "5,402", "27"], ["HubSpot", "", "", "68"]].flat().map((c, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>{c}</span>
          ))}
        </div>
      </div>
      <div className="pa-foot bad">Now do that for 12 clients, by hand, the first week of every month.</div>
    </div>
  );
}

function Manufacturing() {
  const rows = [
    { p: "Steel bracket, 4 in", s: 480, f: 412, max: 500 },
    { p: "Gasket kit", s: 96, f: 131, max: 140 },
    { p: "Motor housing", s: 18, f: 11, max: 20 },
  ];
  return (
    <div className="pa pa-mfg">
      <div className="pa-mfg-key" aria-hidden="true"><span><i className="sys" />In the system</span><span><i className="floor" />Counted on the floor</span></div>
      {rows.map((r, i) => {
        const g = r.f - r.s;
        return (
          <div className="pa-mfg-row" key={r.p} style={{ ["--i" as string]: i }}>
            <small>{r.p}</small>
            <div>
              <span className="sys" style={{ width: `${(r.s / r.max) * 100}%` }}><b>{r.s}</b></span>
              <span className="floor" style={{ width: `${(r.f / r.max) * 100}%` }}><b>{r.f}</b></span>
            </div>
            <em>{g > 0 ? `+${g}` : g}</em>
          </div>
        );
      })}
      <div className="pa-mfg-order">
        <Icon name="box" size={16} />
        <span><strong>Order 5512</strong> needs 450 brackets. The system says ship Friday.</span>
        <em>Floor is 38 short</em>
      </div>
      <div className="pa-foot bad">So someone walks the floor before anyone can promise a date.</div>
    </div>
  );
}

function Wholesale() {
  const fmt = [
    { f: "Email", l: ["Hi, can we get", "40 cs of the 12oz", "same as last time"] },
    { f: "PDF", l: ["PO 88213", "Line 1 · 24 ea", "Line 2 · 6 cs"] },
    { f: "Spreadsheet", l: ["SKU  QTY", "A-114  12", "B-208  30"] },
    { f: "Fax", l: ["PO 4471?", "12 cs B-2O8", "RUSH pls"] },
  ];
  return (
    <div className="pa pa-whl">
      <div className="pa-whl-in">
        {fmt.map((x, i) => (
          <div key={x.f} className={x.f === "Fax" ? "fax" : ""} style={{ ["--i" as string]: i }}>
            <small>{x.f}</small>{x.l.map((l) => <span key={l}>{l}</span>)}
          </div>
        ))}
      </div>
      <div className="pa-whl-erp">
        <small>ERP · new sales order</small>
        <div><span>Item</span><span>Qty</span></div>
        <div><span>12oz case</span><span>40</span></div>
        <div className="typing"><span>A-114<i /></span><span /></div>
        <em>Line 7 of 23, typed by hand</em>
      </div>
      <div className="pa-foot bad">Four formats in, one person re-typing every line into the ERP.</div>
    </div>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  construction: Construction, "field-services": Field, legal: Legal, accounting: Accounting, insurance: Insurance,
  healthcare: Healthcare, "marketing-agencies": Marketing, manufacturing: Manufacturing, "wholesale-distribution": Wholesale,
};

export function ProblemArt({ slug }: { slug: string }) {
  const A = ART[slug];
  return A ? <A /> : null;
}
