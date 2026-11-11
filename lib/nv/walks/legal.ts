import type { Walk } from "./types";

// Legal: one business client from the conflict check through an acquisition, the post-closing dispute that follows, and the final bill.
// Trust reconciliation is firm-wide and monthly; it sits at the end, where the final bill is paid from trust.
export const legal: Walk = {
  sectionLabel: "Follow one client",
  h2: ["From the conflict check to the final bill.", "Every date, cite and charge checked before an attorney signs."],
  demoTitle: "One client, conflict check to final bill",
  demoSub: "Ten points where an agent reads the file and a person signs off",
  replay: "Replay from the conflict check",
  railLabel: "Stages of the client's work",
  closed: "Matter billed and trust reconciled.",
  stages: [
    { title: "Conflicts check across every name in the file", phase: "Intake", label: "Conflict check", doc: "Intake form · conflicts database", tag: "LOG",
      checks: ["Intake form and term sheet", "Client's corporate documents", "Every party, affiliate and individual", "Run against the conflicts database and past matters", "Hits listed with the matter they come from"], approver: "Conflicts attorney or general counsel" },
    { title: "Due diligence across the data room", phase: "Deal", label: "Due diligence", doc: "Data room · diligence chart", tag: "XLS",
      checks: ["Every contract in the data room", "Parties, term and renewal", "Assignment and change-of-control provisions", "Exclusivity and termination", "Diligence chart with page cites"], approver: "Supervising attorney" },
    { title: "Redlines compared turn by turn", phase: "Deal", label: "Redline review", doc: "Redline · Litera or Word compare", tag: "DOC",
      checks: ["Each turn compared for unmarked edits", "Every change against the term sheet", "The firm's playbook", "Each departure from the agreed position"], approver: "Responsible attorney" },
    { title: "Litigation hold tracking per custodian", phase: "Litigate", label: "Litigation hold", doc: "Hold tracker · each custodian", tag: "LOG",
      checks: ["Notice sent", "Acknowledgment received", "Reminders due and drafted", "New custodians named in discovery"], approver: "Responsible attorney" },
    { title: "Deadlines calculated from every new filing", phase: "Litigate", label: "Docketing", doc: "E-filing notices · Clio calendar", tag: "MAIL",
      checks: ["Court e-filing notices and orders", "Each deadline extracted", "Checked against the rules calculator", "Clio entries drafted with the source linked"], approver: "Docketing clerk and responsible attorney" },
    { title: "Discovery documents coded and a privilege log drafted", phase: "Litigate", label: "Document review", doc: "Review set · Relativity or Everlaw", tag: "LOG",
      checks: ["Collected email and documents", "Coded for responsiveness and issues", "Likely privileged items and the attorneys on each thread", "Privilege log entries drafted"], approver: "Reviewing attorney" },
    { title: "Research memo drafted with checked citations", phase: "Litigate", label: "Research memo", doc: "Research memo · LexisNexis or Westlaw", tag: "DOC",
      checks: ["The firm's licensed research access", "Quotes and pin cites", "Each cited case's treatment", "Memo drafted for the attorney"], approver: "Attorney" },
    { title: "Matter status updates drafted weekly", phase: "Litigate", label: "Client update", doc: "Status update · filings, emails and docket", tag: "MAIL",
      checks: ["Recent filings and emails", "Docket entries", "Time entries", "Plain-English update drafted", "Next steps and upcoming deadlines"], approver: "Responsible attorney" },
    { title: "Pre-bills checked against OCG billing guidelines", phase: "Bill", label: "Pre-bill review", doc: "Pre-bill · Clio and the client's guidelines", tag: "PDF",
      checks: ["Each entry against the outside counsel guidelines", "Block billing", "Staffing limits and non-billable tasks", "Rate caps", "Compliant rewording drafted"], approver: "Billing partner" },
    { title: "Trust account and retainer reconciliation", phase: "Bill", label: "Trust reconciliation", doc: "Three-way reconciliation · trust, Clio and QuickBooks", tag: "XLS",
      checks: ["Trust bank statement", "Client ledgers in Clio", "Books in QuickBooks", "Every mismatch and negative balance", "Stale retainers"], approver: "Managing partner or trust account attorney" },
  ],
};
