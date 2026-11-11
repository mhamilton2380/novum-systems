import type { Walk } from "./types";

// Real estate brokerage: one residential listing from the CMA to the commission split (eight stages),
// then the commercial desk's two checks in their own phase so the two businesses are not mixed.
// In this trade "agent" means a person, so the software is called "AI" throughout.
export const realEstateBrokerage: Walk = {
  sectionLabel: "Follow one listing",
  h2: ["From the CMA to the commission check.", "AI reads the file, the broker signs off."],
  demoTitle: "One listing, CMA to commission, plus the commercial desk",
  demoSub: "Eight points on one listing and two on the commercial desk where AI reads the paperwork and a person signs off",
  aiName: "AI",
  replay: "Replay from the CMA",
  railLabel: "Stages of the listing and the commercial desk",
  closed: "Listing closed and paid. Commercial desk checked.",
  stages: [
    { title: "CMAs drafted from MLS comps", phase: "List", label: "CMA", doc: "CMA · sold, pending and active MLS comps", tag: "XLS",
      checks: ["Sold, pending and active comps", "Adjusted for size, beds, baths and condition", "Days on market noted", "Suggested price range", "Reasoning behind each comp"], approver: "Listing agent" },
    { title: "Listing prep disclosures checked per file", phase: "List", label: "Listing disclosures", doc: "Listing file · disclosures and HOA documents", tag: "PDF",
      checks: ["Lead-based paint disclosure for pre-1978 homes", "HOA documents", "Seller disclosure", "Signatures and dates on each form", "What is missing before it goes live"], approver: "Listing agent and broker" },
    { title: "Listing details checked against public records", phase: "List", label: "MLS data check", doc: "MLS input · against county assessor records", tag: "XLS",
      checks: ["County assessor records", "Permit history", "The prior listing", "Each mismatch with its source"], approver: "Listing agent, with the managing broker" },
    { title: "Contingency deadlines across every open deal", phase: "Contract", label: "Contingency dates", doc: "Deadline calendar · agreement and addenda", tag: "LOG",
      checks: ["Executed purchase agreement", "Every addendum", "Deadline calendar for the deal", "Reminders to both agents drafted"], approver: "Agent of record" },
    { title: "Earnest money tracked to the escrow receipt", phase: "Contract", label: "Earnest money", doc: "Purchase agreement · escrow receipts", tag: "MAIL",
      checks: ["Earnest money amount and due date", "Escrow receipts in email", "The transaction platform", "Reminder to the agents drafted"], approver: "Transaction coordinator" },
    { title: "Missing signatures and dates in deal files", phase: "Contract", label: "File compliance", doc: "Transaction file · compliance checklist", tag: "PDF",
      checks: ["Every document in the file", "Brokerage compliance checklist", "State's required forms", "Missing signatures, initials and dates", "Missing disclosures"], approver: "Transaction coordinator, then the managing broker" },
    { title: "Wire instructions checked before money moves", phase: "Close", label: "Wire check", doc: "Deal email thread · wiring instructions", tag: "MAIL",
      checks: ["Wiring or payoff instructions", "Sender domain", "Account details and phone numbers", "Escrow officer's verified contact on file"], approver: "Transaction coordinator" },
    { title: "Commission splits checked before disbursement", phase: "Pay", label: "Commission split", doc: "Settlement statement · disbursement authorization", tag: "XLS",
      checks: ["Settlement statement", "Agent's commission plan and cap progress", "Referral agreements", "What each party is owed", "Disbursement authorization before escrow"], approver: "Managing broker" },
    { title: "Offering memorandums from rent roll and CoStar", phase: "Commercial", label: "Offering memorandum", doc: "OM draft · rent roll, T-12 and leases", tag: "PDF",
      checks: ["Rent roll against the leases", "T-12", "CoStar exports the license allows", "Tenant profiles and lease expirations", "Numbers that don't reconcile"], approver: "Listing broker" },
    { title: "Option and renewal windows across the book", phase: "Commercial", label: "Option windows", doc: "Lease abstracts · client book", tag: "PDF",
      checks: ["Expirations", "Option notice windows", "Rent bumps", "Termination rights", "Calendar of who to call and when"], approver: "Leasing broker" },
  ],
};
