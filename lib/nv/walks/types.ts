// One industry's click-through: follow one piece of work from start to finish.
// Every stage is one scenario from SCENARIOS[slug] (lib/nv/useCaseScenarios.ts), matched by title.
// The flagged line shown on screen is the scenario's own "catch"; the approver line is its "person".
// Nothing in a walk may add a fact: no numbers, names, tools or claims that are not in that scenario's text.
export type WalkStage = {
  title: string; // must equal Scenario.title exactly
  phase: string; // one word; consecutive stages share a phase (4 to 6 phases across the ten stages)
  label: string; // short name for the rail, 1 to 4 words
  doc: string; // the document or screen the agent works in, as that trade would name it
  tag: string; // file-type badge: PDF, XLS, LOG, DOC or MAIL
  checks: string[]; // 3 to 6 short lines, each lifted from the scenario's own "ai" text
  approver: string; // short form of the scenario's "person" (a role, not a sentence)
  view?: DocView; // optional: the actual document, drawn with the catch flagged inside it. Without it the stage shows the checks as a list.
};

// ---- Document views ----
// HOW TO WRITE A VIEW (read before adding `view` to any stage)
// 1. Pick the kind that matches the document the person really opens for that stage:
//    sheet    a grid of numbers or lines: takeoff, schedule of values, trial balance, price list, timesheet
//    packet   an index of a file in tabs: bid package, closing binder, claim file, request list
//    matrix   parties against items with a mark in each cell: scope coverage, closeout log, document checklist by client
//    form     required against actual, field by field: certificate of insurance, submittal, policy check, eligibility
//    compare  two or three documents side by side: drawing against schedule, quote against PO, two versions of a report
//    message  an incoming email or note and the record drafted from it: RFI to PCO, customer email to order, demand letter to file note
//    calendar dated deadlines computed from a trigger: court deadlines, tax due dates, contingency dates, permit windows
//    redline  one clause or paragraph across versions, struck and inserted words: contract turns, policy wording against the binder
//    board    a schedule board, resources down the side and slots across: dispatch board, appointment book, production schedule
//    recon    two or three sides matched line by line, each totaled, the difference shown: bank or trust reconciliation, PO-receipt-invoice, remittance against contract rate
//    record   one record as a card with labelled fields in sections and coded lines: chart note, MLS input, claim, RFQ summary
//    bars     a small chart of labelled bars with values and an optional target: platform against analytics, hours used against budget, monthly purchases
// 2. Lead with the kinds your trade really works in. Two industries should not open on the same shape, and
//    no walk should show the same kind on two stages in a row.
// 3. `meta` must start with "Example" (it is printed in the document header). `stamp` is an optional short
//    label printed beside the title, such as "Draft", "Awaiting sign-off" or a form name; use it so your
//    trade's documents do not all share one header look.
// 4. Figures are illustrative but must be realistic for that trade and must tie out: totals add, percentages
//    compute, dates run in order, the same job, client or amount carries across stages. Invented company and
//    person names only; name software or forms only if they appear in that scenario's own text.
// 5. The flagged element IS the scenario's catch, shown where the problem really lives (a cell, a line, a date,
//    a struck word). The full catch sentence is printed under the document anyway, so the view should show it,
//    not restate it. No results, savings or hours claims, no Novum prices, no em dashes.
// 6. Write view data as plain object literals: no `as const`, no type annotations or casts inside the walk file
//    (an independent checker evaluates the file as plain JavaScript). Keep illustrative numbers out of label,
//    doc, checks and approver; the checker compares those four fields against the scenario text.
// 7. Any walk with at least one view switches the stage rail to a timeline across the top on wide screens.
//    Stages without a view still show the checklist card, so a walk can be converted stage by stage.
export type ViewHead = { title: string; meta: string; stamp?: string };
export type KV = { k: string; v: string; flag?: boolean };

// A grid of rows and columns: takeoff, leveling sheet, schedule of values, trial balance, claim ledger.
// `num` lists column indexes that hold numbers (right-aligned, tabular). `flag` on a row marks the whole
// row; `flagCells` marks single cells. `foot` is key/value lines under the grid (retainage, waivers, notes).
// e.g. { kind: "sheet", title: "Trial balance · Mar 2026", meta: "Example · client 0412", cols: ["Account", "Debit", "Credit"], num: [1, 2], rows: [{ cells: ["1010 Cash", "48,200", ""] }] }
export type SheetView = ViewHead & {
  kind: "sheet";
  cols: string[];
  num?: number[];
  rows: { cells: string[]; flag?: boolean; flagCells?: number[]; note?: string }[];
  total?: string[];
  foot?: KV[];
};

// A document index in sections: bid package, closing binder, claim file, audit request list.
// e.g. { kind: "packet", title: "Closing binder · 4410 Elm", meta: "Example", sections: [{ name: "Disclosures", items: [{ ref: "D-1", text: "Seller disclosure" }] }] }
export type PacketView = ViewHead & {
  kind: "packet";
  sections: { name: string; items: { ref: string; text: string; flag?: boolean }[] }[];
};

// Parties across the top, items down the side (or the reverse): scope coverage, closeout log, document
// checklist by client. Cell state: ok, flag, or na (not applicable; leave v empty to show a dot).
// e.g. { kind: "matrix", title: "Year-end documents", meta: "Example", corner: "Client", cols: ["W-2", "1099"], rows: [{ name: "Ortiz", cells: [{ v: "✓", s: "ok" }, { v: "Missing", s: "flag" }] }] }
export type MatrixView = ViewHead & {
  kind: "matrix";
  corner: string;
  cols: string[];
  rows: { name: string; sub?: string; cells: { v: string; s?: "ok" | "flag" | "na" }[] }[];
  notes?: { text: string; flag?: boolean }[];
};

// Required against actual, field by field: certificate of insurance, submittal review, policy check.
// e.g. { kind: "form", title: "Eligibility · visit Mar 4", meta: "Example", heads: ["Check", "Payer requires", "On file"], fields: [{ label: "Prior auth", want: "Required", got: "None", flag: true }] }
export type FormView = ViewHead & {
  kind: "form";
  heads: [string, string, string];
  fields: { label: string; want: string; got: string; flag?: boolean }[];
  foot?: string;
};

// Two or three documents side by side, the disagreeing line flagged in each.
// e.g. { kind: "compare", title: "Quote against PO", meta: "Example", panes: [{ name: "Quote", ref: "Q-118", lines: [{ k: "Unit price", v: "$4.10" }] }, { name: "PO", ref: "PO-2231", lines: [{ k: "Unit price", v: "$4.60", flag: true }] }] }
export type CompareView = ViewHead & {
  kind: "compare";
  panes: { name: string; ref: string; lines: KV[] }[];
  foot?: string;
};

// An incoming message with the line that matters flagged, and the record drafted from it.
// e.g. { kind: "message", title: "Customer email to order", meta: "Example", msg: { from: "Buyer", to: "Orders", date: "Mar 4, 2026", subject: "PO 88213", body: [{ text: "Same as last time, 40 cases", flag: true }] }, reply: { name: "SO-20417", status: "Draft", lines: [{ k: "Qty", v: "40 cases" }] } }
export type MessageView = ViewHead & {
  kind: "message";
  msg: { from: string; to: string; date: string; subject: string; body: { text: string; flag?: boolean }[] };
  reply: { name: string; status: string; lines: KV[] };
};

// Dated deadlines computed from a trigger, drawn as a timeline. `from` is the trigger shown at the top
// (a filing, a signed agreement, a year end). Each event shows its date, what it is, what it was computed
// from (`basis`) and a status. Keep events in date order. `month` is a short month name, `day` the number.
// e.g. { kind: "calendar", title: "Deadlines · Case 26-CV-0418", meta: "Example", from: "Served Mar 3, 2026", events: [{ month: "Apr", day: "2", label: "Answer due", basis: "30 days from service", status: "Calendared" }, { month: "Apr", day: "6", label: "Answer due, docketed", basis: "Wrong count", status: "Docketed", flag: true }] }
export type CalendarView = ViewHead & {
  kind: "calendar";
  from?: string;
  events: { month: string; day: string; weekday?: string; label: string; basis: string; status: string; flag?: boolean }[];
};

// One clause or paragraph across two versions: each clause is a run of text parts, some struck ("del")
// or inserted ("ins"). Flag the part that changed the deal. `note` is a short margin comment.
// e.g. { kind: "redline", title: "MSA §9.2 · our v3 against their v4", meta: "Example", versions: ["Our v3", "Their v4"], clauses: [{ ref: "9.2", parts: [{ t: "Indemnity is capped at " }, { t: "24", op: "del" }, { t: "12", op: "ins", flag: true }, { t: " months of fees." }], note: "Cap halved without comment" }] }
export type RedlineView = ViewHead & {
  kind: "redline";
  versions: [string, string];
  clauses: { ref: string; parts: { t: string; op?: "del" | "ins"; flag?: boolean }[]; note?: string; flag?: boolean }[];
};

// A schedule board: resources down the side, slots across (hours, days, shifts). Blocks start at a slot
// index (0-based, halves allowed) and span a number of slots. `tone` softens a block ("soft") or marks it
// finished ("done"); `flag` marks the catch. `foot` is a short line under the board.
// e.g. { kind: "board", title: "Dispatch · Wed Oct 8", meta: "Example", slots: ["7", "8", "9", "10"], rows: [{ name: "Marco", blocks: [{ start: 0, span: 1, label: "Tune-up · Patel" }, { start: 0.5, span: 1, label: "No heat · Whitfield", flag: true }] }] }
export type BoardView = ViewHead & {
  kind: "board";
  slots: string[];
  rows: { name: string; sub?: string; blocks: { start: number; span: number; label: string; flag?: boolean; tone?: "soft" | "done" }[] }[];
  foot?: string;
};

// A reconciliation: two or three sides matched line by line. Each row has one cell per side ("" where a
// side has no line) and an optional `ref` (check number, PO line, policy). Matched rows show "=" between
// sides; flagged rows show the mismatch. `totals` has one value per side; `diff` is the difference line.
// e.g. { kind: "recon", title: "Trust account · Mar 2026", meta: "Example", sides: ["Bank", "Trust ledger", "Client ledgers"], rows: [{ ref: "Dep 0312", cells: ["12,000", "12,000", "12,000"] }, { ref: "Chk 2207", cells: ["-2,400", "-2,400", ""], flag: true }], totals: ["9,600", "9,600", "12,000"], diff: { k: "Client ledgers over trust ledger", v: "2,400", flag: true } }
export type ReconView = ViewHead & {
  kind: "recon";
  sides: string[];
  rows: { ref?: string; label?: string; cells: string[]; flag?: boolean }[];
  totals: string[];
  diff: KV;
};

// One record as a headed card: an id line, labelled fields grouped in sections, and optional coded lines
// (procedure codes, line items) with amounts. Flag a field or a line.
// e.g. { kind: "record", title: "Visit note · Mar 4, 2026", meta: "Example", id: "Patient 10-4471", sections: [{ name: "Visit", fields: [{ k: "Provider", v: "Dr. Lee" }] }], lines: [{ code: "99214-25", text: "Office visit, separate service", amount: "$168.00", flag: true }] }
export type RecordView = ViewHead & {
  kind: "record";
  id?: string;
  sections: { name: string; fields: { k: string; v: string; note?: string; flag?: boolean }[] }[];
  lines?: { code: string; text: string; amount?: string; flag?: boolean }[];
};

// A small horizontal bar chart, one hue, direct value labels. `value` sets bar length (on a shared scale
// to `max`, or the largest value); `display` is the printed label ("212 h", "$41,800"). `target` draws a
// marker line at that value with its label. `note` is one line under the chart.
// e.g. { kind: "bars", title: "Conversions · March", meta: "Example", bars: [{ label: "Ad platform", value: 412, display: "412" }, { label: "Analytics", value: 236, display: "236", flag: true }] }
export type BarsView = ViewHead & {
  kind: "bars";
  bars: { label: string; sub?: string; value: number; display: string; flag?: boolean }[];
  max?: number;
  target?: { value: number; label: string };
  note?: string;
};

export type DocView = SheetView | PacketView | MatrixView | FormView | CompareView | MessageView
  | CalendarView | RedlineView | BoardView | ReconView | RecordView | BarsView;

export type Walk = {
  sectionLabel: string; // small index label, e.g. "Follow one job"
  h2: [string, string]; // bright clause, then the muted clause
  demoTitle: string; // e.g. "One job, bid set to final payment"
  demoSub: string; // e.g. "Ten points where an agent reads the paperwork and a person signs off"
  replay: string; // e.g. "Replay from the bid set"
  railLabel: string; // screen-reader name for the rail, e.g. "Stages of the job"
  closed: string; // shown after the last sign-off, e.g. "Job closed out."
  aiName?: string; // what to call the software on screen. Default "agent"; use "AI" in trades where "agent" means a person (real estate, insurance)
  stages: WalkStage[]; // exactly ten, in the order the work really happens
};
