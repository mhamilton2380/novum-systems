import type { Walk } from "./types";

// Accounting: one business client's year, from the engagement letter through the books, the return and the notices that follow.
// The deadline tracker and the nexus monitor are firm-wide; they sit where they come up for this client.
export const accounting: Walk = {
  sectionLabel: "Follow one client's year",
  h2: ["From the engagement letter to the IRS notice.", "Every number tied to its source before a CPA signs."],
  demoTitle: "One client, engagement letter to IRS notice",
  demoSub: "Ten points where an agent reads the file and a person signs off",
  replay: "Replay from the engagement letter",
  railLabel: "Stages of the client's year",
  closed: "Year filed and closed.",
  stages: [
    { title: "Engagement letter matched to the actual scope", phase: "Engage", label: "Engagement letter", doc: "Engagement letter · work logged in Karbon or Canopy", tag: "PDF",
      checks: ["Signed engagement letter and proposal", "Last year's invoices", "Work logged in Karbon or Canopy", "Services the letter does not cover", "Scope addendum drafted"], approver: "Engagement partner" },
    { title: "Organizer compared to last year's return", phase: "Gather", label: "Organizer check", doc: "Last year's return · this year's uploads", tag: "PDF",
      checks: ["Last year's return", "Depreciation schedule", "This year's uploaded documents", "Last year's items with no document this year", "Follow-up request drafted"], approver: "Preparer" },
    { title: "Deadline and extension tracker across every entity", phase: "Gather", label: "Due dates and extensions", doc: "Deadline calendar · every entity", tag: "LOG",
      checks: ["Entity records and prior filings", "IRS and state notices in Outlook", "Every return, extension and estimate by client", "Anything without an owner or filed extension"], approver: "Tax manager" },
    { title: "PBC list chased until it is complete", phase: "Gather", label: "PBC list", doc: "PBC list · SmartVault or Liscio uploads", tag: "LOG",
      checks: ["Each item against uploads and Outlook attachments", "Right document", "Right period", "Reminder drafted for only what is missing"], approver: "Engagement senior" },
    { title: "Bank feed coded with a reason on every line", phase: "Books", label: "Bank feed coding", doc: "Bank feed · vendor history, receipts and invoices", tag: "XLS",
      checks: ["Vendor history", "Receipts and invoices", "Account and class proposed with a reason", "Uncertain or unusual lines first"], approver: "Bookkeeper, then the senior on flagged items" },
    { title: "Trial balance analytics before the partner sees it", phase: "Books", label: "Trial balance review", doc: "Trial balance · prior-year TB and general ledger detail", tag: "XLS",
      checks: ["Each account period over period", "Expected relationships between accounts", "Transactions behind each swing", "Review notes drafted"], approver: "Engagement senior, then the partner" },
    { title: "K-1s and 1099s keyed straight from the PDF", phase: "Return", label: "K-1s and 1099s", doc: "K-1s and composite 1099 · import file", tag: "PDF",
      checks: ["K-1 footnotes", "Composite brokerage 1099", "Every box extracted", "Import file for CCH Axcess, UltraTax or Lacerte", "Totals tied back to the source"], approver: "Preparer, then the reviewing CPA" },
    { title: "Return diagnostics and tie-out before signing", phase: "Return", label: "Review and sign", doc: "Draft return · diagnostics and workpapers", tag: "PDF",
      checks: ["Tax software diagnostics", "Workpapers behind each line", "Prior-year carryforward schedules", "Each line tied to its support", "Unresolved diagnostics and missing carryovers"], approver: "Reviewing CPA" },
    { title: "Economic nexus monitor across states", phase: "Advise", label: "Nexus check", doc: "Sales by state · each state's thresholds", tag: "XLS",
      checks: ["Sales data by state", "Dollar and transaction thresholds", "Clients approaching or past nexus", "Registration and filing notes drafted"], approver: "Tax manager" },
    { title: "IRS and state notices triaged the day they land", phase: "Advise", label: "IRS and state notices", doc: "IRS notice · matching return and workpapers", tag: "PDF",
      checks: ["Notice type, tax year and deadline", "Matching return and workpapers", "Client summary drafted", "Response outline for the CPA"], approver: "CPA" },
  ],
};
