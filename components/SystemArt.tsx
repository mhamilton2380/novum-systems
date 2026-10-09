import { Icon } from "@/components/PageVisuals";

// "What we build" mockups that change by industry: the main screen of the system, and its document store.
// Names and figures are illustrative. Styles: app/visuals.css (prefix sa-).

type Tile = [string, string, boolean?];
type BoardSpec =
  | { kind: "bars"; title: string; tiles: Tile[]; rows: { n: string; v: string; w: number; bad?: boolean; note?: string }[] }
  | { kind: "kanban"; title: string; cols: { h: string; n: number; items: string[]; bad?: boolean }[] }
  | { kind: "steps"; title: string; steps: string[]; rows: { n: string; at: number; flag?: string }[] }
  | { kind: "schedule"; title: string; hours: string[]; rows: { who: string; slots: { t: string; x: number; w: number; c: "ok" | "warn" | "bad" | "next" }[] }[]; key: [string, "ok" | "warn" | "bad" | "next"][] };

type DocsSpec = { search: string; files: { n: string; meta: string; tag: string; c: "ok" | "old" | "lock" | "warn" }[] };

const BOARDS: Record<string, BoardSpec> = {
  construction: {
    kind: "bars", title: "Active jobs · budget used",
    tiles: [["Active jobs", "12"], ["Over budget", "1", true], ["Open change orders", "5"]],
    rows: [
      { n: "Job 214 · Office build", v: "96%", w: 96 },
      { n: "Job 221 · Retail fit-out", v: "104%", w: 100, bad: true, note: "Over" },
      { n: "Job 208 · Warehouse addition", v: "71%", w: 71 },
      { n: "Job 230 · Clinic remodel", v: "88%", w: 88 },
    ],
  },
  "field-services": {
    kind: "kanban", title: "Today's jobs",
    cols: [
      { h: "Scheduled", n: 9, items: ["AC tune-up · 2:00", "Drain clear · 3:30"] },
      { h: "En route", n: 3, items: ["Furnace · Tech 3"] },
      { h: "On site", n: 4, items: ["Panel upgrade · Tech 2"] },
      { h: "Invoiced", n: 11, items: ["Water heater · $1,840", "Thermostat · $310"] },
    ],
  },
  legal: {
    kind: "steps", title: "Open matters",
    steps: ["Intake", "Discovery", "Negotiation", "Closing"],
    rows: [
      { n: "1042 · Commercial lease", at: 2 },
      { n: "1057 · Business purchase", at: 3 },
      { n: "1061 · Contract dispute", at: 1, flag: "Response due Fri" },
      { n: "1066 · Estate plan", at: 0 },
    ],
  },
  accounting: {
    kind: "kanban", title: "Tax season · returns",
    cols: [
      { h: "Waiting on client", n: 14, items: ["Client 022 · K-1s", "Client 058 · 1099s"], bad: true },
      { h: "In prep", n: 9, items: ["Client 031 · 1065"] },
      { h: "Partner review", n: 4, items: ["Client 019 · 1120-S"] },
      { h: "Filed", n: 31, items: ["Client 014 · 1065"] },
    ],
  },
  insurance: {
    kind: "bars", title: "Renewals · next 90 days",
    tiles: [["Renewing", "38"], ["Quoted", "22"], ["Not contacted", "3", true]],
    rows: [
      { n: "Workers comp · Client 112", v: "12 days", w: 13, bad: true, note: "Call today" },
      { n: "General liability · Client 087", v: "41 days", w: 46 },
      { n: "Commercial auto · Client 140", v: "74 days", w: 82 },
      { n: "Property · Client 095", v: "88 days", w: 98 },
    ],
  },
  healthcare: {
    kind: "schedule", title: "Today's clinic",
    hours: ["8a", "10a", "12p", "2p"],
    rows: [
      { who: "Provider 1", slots: [{ t: "Checked in", x: 0, w: 22, c: "ok" }, { t: "Balance due", x: 26, w: 22, c: "warn" }, { t: "10:30", x: 52, w: 20, c: "next" }] },
      { who: "Provider 2", slots: [{ t: "Checked in", x: 6, w: 24, c: "ok" }, { t: "Auth pending", x: 36, w: 26, c: "bad" }, { t: "1:15", x: 70, w: 22, c: "next" }] },
      { who: "NP", slots: [{ t: "Checked in", x: 0, w: 18, c: "ok" }, { t: "11:00", x: 40, w: 20, c: "next" }] },
    ],
    key: [["Checked in", "ok"], ["Balance due", "warn"], ["Auth pending", "bad"]],
  },
  "marketing-agencies": {
    kind: "kanban", title: "Deliverables",
    cols: [
      { h: "Drafting", n: 7, items: ["Spring email · Client B"] },
      { h: "Client review", n: 5, items: ["Landing page · Client A", "Ad set · Client D"], bad: true },
      { h: "Approved", n: 4, items: ["Social pack · Client C"] },
      { h: "Live", n: 12, items: ["Search ads · Client A"] },
    ],
  },
  manufacturing: {
    kind: "steps", title: "Work orders",
    steps: ["Cut", "Weld", "Paint", "QA", "Ship"],
    rows: [
      { n: "WO-5512 · Brackets ×450", at: 1 },
      { n: "WO-5520 · Motor housings", at: 2, flag: "Waiting on parts" },
      { n: "WO-5531 · Gasket kits", at: 3 },
      { n: "WO-5534 · Frames", at: 0 },
    ],
  },
  "wholesale-distribution": {
    kind: "steps", title: "Today's orders",
    steps: ["Entered", "Picked", "Packed", "Shipped"],
    rows: [
      { n: "SO 88213 · 2 lines", at: 3 },
      { n: "SO 88227 · 23 lines", at: 1 },
      { n: "SO 88231 · 8 lines", at: 1, flag: "Backorder B-208" },
      { n: "SO 88240 · 5 lines", at: 0 },
    ],
  },
};

const DOCS: Record<string, DocsSpec> = {
  construction: { search: "Search drawings, permits, and certificates", files: [
    { n: "A-301 Floor plan", meta: "Rev E · issued Oct 2", tag: "Current set", c: "ok" },
    { n: "A-301 Floor plan", meta: "Rev C", tag: "Superseded", c: "old" },
    { n: "Electrical sub · insurance certificate", meta: "Expires Nov 2", tag: "Expires in 24 days", c: "warn" },
  ] },
  "field-services": { search: "Search by address, unit, or serial number", files: [
    { n: "Rooftop unit 3 · service history", meta: "6 visits · last Aug 14", tag: "Latest", c: "ok" },
    { n: "Rooftop unit 3 · warranty", meta: "Parts covered to 2031", tag: "Active", c: "ok" },
    { n: "Maintenance agreement", meta: "Signed, renews Mar 1", tag: "Office only", c: "lock" },
  ] },
  legal: { search: "Search matters, filings, and contracts", files: [
    { n: "Purchase agreement · executed", meta: "Matter 1057 · signed Sep 30", tag: "Final", c: "ok" },
    { n: "Purchase agreement · v7 redline", meta: "Matter 1057", tag: "Superseded", c: "old" },
    { n: "Client intake memo", meta: "Matter 1061", tag: "Matter team only", c: "lock" },
  ] },
  accounting: { search: "Search clients, years, and forms", files: [
    { n: "2025 Form 1065 · working papers", meta: "Client 031 · reviewed", tag: "Latest", c: "ok" },
    { n: "2025 Form 1065 · draft 2", meta: "Client 031", tag: "Superseded", c: "old" },
    { n: "Bank statements · Dec 2025", meta: "Client 031 · uploaded by client", tag: "Partners and preparer", c: "lock" },
  ] },
  insurance: { search: "Search clients, policies, and carriers", files: [
    { n: "Umbrella · 2026 declarations", meta: "Client 112 · bound Oct 1", tag: "In force", c: "ok" },
    { n: "Umbrella · 2025 declarations", meta: "Client 112", tag: "Expired", c: "old" },
    { n: "Loss runs · 5 years", meta: "Client 112 · for remarketing", tag: "Producer only", c: "lock" },
  ] },
  healthcare: { search: "Search patients, authorizations, and forms", files: [
    { n: "Prior authorization · MRI, lumbar", meta: "Patient 4 · approved Oct 7", tag: "Approved", c: "ok" },
    { n: "Insurance card · front and back", meta: "Patient 4 · 2025 plan", tag: "Outdated", c: "old" },
    { n: "Visit note", meta: "Patient 4 · Oct 3", tag: "Clinical staff only", c: "lock" },
  ] },
  "marketing-agencies": { search: "Search clients, campaigns, and assets", files: [
    { n: "Spring campaign · final creative", meta: "Client B · approved Oct 4", tag: "Approved", c: "ok" },
    { n: "Spring campaign · v3", meta: "Client B", tag: "Superseded", c: "old" },
    { n: "Q4 media plan and budgets", meta: "Client B", tag: "Account team only", c: "lock" },
  ] },
  manufacturing: { search: "Search parts, drawings, and lots", files: [
    { n: "Bracket, 4 in · drawing", meta: "Rev D · released Sep 18", tag: "Released", c: "ok" },
    { n: "Bracket, 4 in · drawing", meta: "Rev C", tag: "Obsolete", c: "old" },
    { n: "Inspection log · Lot 2214", meta: "WO-5512", tag: "Quality only", c: "lock" },
  ] },
  "wholesale-distribution": { search: "Search customers, price sheets, and POs", files: [
    { n: "Customer 0418 · contract prices", meta: "Effective Oct 1, 2026", tag: "Current", c: "ok" },
    { n: "Customer 0418 · contract prices", meta: "2025", tag: "Expired", c: "old" },
    { n: "Vendor cost sheet · Q4", meta: "Purchasing", tag: "Purchasing only", c: "lock" },
  ] },
};

export function BoardArt({ slug }: { slug: string }) {
  const b = BOARDS[slug];
  if (!b) return null;
  return (
    <div className={`uc-art sa-board sa-${b.kind}`} aria-hidden="true">
      <div className="uc-win"><i /><i /><i /><span>{b.title}</span></div>
      {b.kind === "bars" && (
        <>
          <div className="sa-tiles">{b.tiles.map(([l, v, bad]) => <div key={l} className={bad ? "bad" : ""}><small>{l}</small><strong>{v}</strong></div>)}</div>
          {b.rows.map((r, i) => (
            <div className={`sa-bar ${r.bad ? "bad" : ""}`} key={r.n} style={{ ["--i" as string]: i }}>
              <span>{r.n}</span><div><i style={{ width: `${r.w}%` }} /></div><em>{r.v}{r.note && <b>{r.note}</b>}</em>
            </div>
          ))}
        </>
      )}
      {b.kind === "kanban" && (
        <div className="sa-cols">
          {b.cols.map((c, i) => (
            <div key={c.h} className={c.bad ? "bad" : ""} style={{ ["--i" as string]: i }}>
              <small>{c.h}<b>{c.n}</b></small>
              {c.items.map((t) => <span key={t}>{t}</span>)}
            </div>
          ))}
        </div>
      )}
      {b.kind === "steps" && (
        <div className="sa-steps" style={{ ["--n" as string]: b.steps.length }}>
          <div className="sa-steps-h"><span />{b.steps.map((s) => <small key={s}>{s}</small>)}</div>
          {b.rows.map((r, i) => (
            <div className={`sa-steps-row ${r.flag ? "bad" : ""}`} key={r.n} style={{ ["--i" as string]: i }}>
              <span>{r.n}{r.flag && <em>{r.flag}</em>}</span>
              {b.steps.map((s, k) => <i key={s} className={k < r.at ? "done" : k === r.at ? "now" : ""} />)}
            </div>
          ))}
        </div>
      )}
      {b.kind === "schedule" && (
        <div className="sa-sched">
          <div className="sa-sched-h"><span />{b.hours.map((h) => <small key={h}>{h}</small>)}</div>
          {b.rows.map((r) => (
            <div className="sa-sched-row" key={r.who}>
              <small>{r.who}</small>
              <div>{r.slots.map((s) => <span key={s.t + s.x} className={s.c} style={{ left: `${s.x}%`, width: `${s.w}%` }}>{s.t}</span>)}</div>
            </div>
          ))}
          <div className="sa-sched-key">{b.key.map(([t, c]) => <span key={t}><i className={c} />{t}</span>)}</div>
        </div>
      )}
    </div>
  );
}

export function DocsArt({ slug }: { slug: string }) {
  const d = DOCS[slug];
  if (!d) return null;
  return (
    <div className="uc-art uc-docs" aria-hidden="true">
      <div className="uc-docs-search"><Icon name="target" size={15} />{d.search}</div>
      {d.files.map((f, i) => (
        <div className={`uc-docs-row sa-doc ${f.c}`} key={f.n + f.meta} style={{ ["--i" as string]: i }}>
          <Icon name={f.c === "lock" ? "lock" : "doc"} size={17} />
          <span><strong>{f.n}</strong><small>{f.meta}</small></span>
          <em>{f.tag}</em>
        </div>
      ))}
    </div>
  );
}
