import type { Walk } from "./types";

// Insurance agency: one commercial account through a full policy year, from renewal marketing to the premium audit.
// IVANS reconciliation and commission statements are back-office work; they sit where this account's transactions land.
export const insurance: Walk = {
  sectionLabel: "Follow one account",
  h2: ["From the loss runs to the premium audit.", "Nothing reaches a carrier or client unchecked."],
  demoTitle: "One account, loss runs to premium audit",
  demoSub: "Ten points where AI reads the paperwork and a person signs off",
  aiName: "AI",
  replay: "Replay from the loss runs",
  railLabel: "Stages of the account",
  closed: "Term audited and account closed out.",
  stages: [
    { title: "Loss runs read and summarized for underwriters", phase: "Market", label: "Loss runs", doc: "Carrier loss runs · every line", tag: "PDF",
      checks: ["Loss runs in each carrier's format", "Paid, reserved, open and closed claims", "Five-year summary by line", "Large-loss narrative drafted for the producer"], approver: "Producer" },
    { title: "Contract insurance requirements matched to coverage", phase: "Market", label: "Contract requirements", doc: "Contract insurance section · policies in the AMS", tag: "PDF",
      checks: ["Every required coverage and limit", "Required endorsements and form numbers", "Current policies in the AMS", "Each gap listed"], approver: "Licensed account manager" },
    { title: "Renewal submission built from the file", phase: "Market", label: "Renewal submission", doc: "Renewal submission · ACORD applications and SOV", tag: "PDF",
      checks: ["Expiring policy and prior applications", "Updated payroll, sales and SOV", "Client email updates", "ACORD applications and marketing summary drafted", "Every exposure that changed"], approver: "Account manager, then the producer" },
    { title: "Quote comparison and proposal drafted", phase: "Propose", label: "Quote comparison", doc: "Carrier quotes · specimen forms", tag: "PDF",
      checks: ["Premium, limits and deductibles", "Sublimits and exclusions", "Endorsements on each specimen form", "Proposal drafted with every material difference"], approver: "Producer" },
    { title: "Policy checked against the binder and quote", phase: "Bind", label: "Policy check", doc: "Issued policy · binder, quote and expiring policy", tag: "PDF",
      checks: ["Named insureds and locations", "Limits and deductibles", "Forms and endorsements, line by line", "Discrepancy list drafted for the carrier"], approver: "Licensed account manager" },
    { title: "Certificates checked before they go out", phase: "Service", label: "Certificates", doc: "Certificate request · Applied Epic, AMS360 or HawkSoft", tag: "PDF",
      checks: ["Holder's contract requirements", "Every coverage, limit and endorsement listed", "Checked against the policies", "Anything the policy does not support"], approver: "Licensed account manager" },
    { title: "Endorsement requests processed end to end", phase: "Service", label: "Endorsement requests", doc: "Change request · IVANS or carrier portal", tag: "MAIL",
      checks: ["Request email", "Change request drafted with policy details", "Returned endorsement read", "Endorsement matched to the request"], approver: "Licensed account manager" },
    { title: "IVANS downloads reconciled with the AMS", phase: "Reconcile", label: "Download reconciliation", doc: "IVANS download log · policy records in the AMS", tag: "LOG",
      checks: ["IVANS download activity", "Carrier portal transactions", "Commission statements", "Every mismatch with the AMS listed"], approver: "Agency operations manager" },
    { title: "Commission statements matched to policies", phase: "Reconcile", label: "Commission statements", doc: "Carrier commission statement · AMS", tag: "XLS",
      checks: ["Each line matched to policy, premium and rate", "Short-paid items", "Missing and unbooked items", "Follow-up list drafted"], approver: "Agency accountant" },
    { title: "Workers comp audit prep", phase: "Audit", label: "Workers comp audit", doc: "Audit request · payroll and 1099 certificates", tag: "PDF",
      checks: ["Audit request", "Payroll reports", "1099 subcontractor certificates", "Uninsured subs and missing records listed"], approver: "Licensed account manager" },
  ],
};
