// Dev-only: one tiny valid sample of each newer document view kind, so `tsc` proves the shapes compile.
// Not imported by any page. Figures are illustrative and tie out within each sample.
import type { BarsView, BoardView, CalendarView, DocView, ReconView, RecordView, RedlineView } from "@/lib/nv/walks/types";

const calendar: CalendarView = {
  kind: "calendar", title: "Deadlines · Case 26-CV-0418", meta: "Example · civil matter", stamp: "Docket",
  from: "Complaint served Mar 3, 2026",
  events: [
    { month: "Apr", day: "2", weekday: "Thu", label: "Answer due", basis: "30 days from service", status: "Calendared" },
    { month: "Apr", day: "6", weekday: "Mon", label: "Answer due, as docketed", basis: "Counted from filing, not service", status: "Docketed", flag: true },
  ],
};

const redline: RedlineView = {
  kind: "redline", title: "MSA §9.2 · our v3 against their v4", meta: "Example · vendor contract",
  versions: ["our v3", "their v4"],
  clauses: [
    { ref: "9.2", parts: [{ t: "Indemnity is capped at " }, { t: "24", op: "del" }, { t: "12", op: "ins", flag: true }, { t: " months of fees paid." }], note: "Cap halved with no comment in their cover email" },
  ],
};

const board: BoardView = {
  kind: "board", title: "Dispatch · Wed Oct 8", meta: "Example · HVAC service",
  slots: ["7", "8", "9", "10", "11", "12"],
  rows: [
    { name: "Marco", sub: "Truck 4", blocks: [{ start: 0, span: 1, label: "Tune-up · Patel" }, { start: 0.5, span: 1, label: "No heat · Whitfield", flag: true }] },
    { name: "Jen", sub: "Truck 7", blocks: [{ start: 1, span: 2, label: "Repair · Ortiz", tone: "done" }] },
  ],
  foot: "Two jobs on Marco at 7:30.",
};

const recon: ReconView = {
  kind: "recon", title: "Trust account · March 2026", meta: "Example · law firm IOLTA", stamp: "Three-way",
  sides: ["Bank", "Trust ledger", "Client ledgers"],
  rows: [
    { ref: "Dep 0312", label: "Okafor retainer", cells: ["12,000.00", "12,000.00", "12,000.00"] },
    { ref: "Chk 2207", label: "Filing fee, Okafor", cells: ["-2,400.00", "-2,400.00", ""], flag: true },
  ],
  totals: ["9,600.00", "9,600.00", "12,000.00"],
  diff: { k: "Client ledgers over trust ledger", v: "2,400.00", flag: true },
};

const record: RecordView = {
  kind: "record", title: "Visit note · Mar 4, 2026", meta: "Example · family practice", stamp: "Unsigned",
  id: "Patient 10-4471 · Encounter 88213",
  sections: [
    { name: "Visit", fields: [{ k: "Provider", v: "Dr. A. Lee" }, { k: "Visit type", v: "Established patient" }] },
    { name: "Assessment", fields: [{ k: "Diagnosis", v: "Type 2 diabetes" }, { k: "Procedure note", v: "None documented", flag: true }] },
  ],
  lines: [
    { code: "99214", text: "Office visit, moderate", amount: "$168.00" },
    { code: "-25", text: "Separate service modifier", amount: "", flag: true },
  ],
};

const bars: BarsView = {
  kind: "bars", title: "Conversions · March 2026", meta: "Example · paid search account",
  bars: [
    { label: "Ad platform", sub: "as reported", value: 412, display: "412" },
    { label: "Analytics", sub: "same goals", value: 236, display: "236", flag: true },
  ],
  target: { value: 300, label: "Monthly target 300" },
  note: "176 conversions counted by the platform only.",
};

export const VIEW_FIXTURES: DocView[] = [calendar, redline, board, recon, record, bars];
