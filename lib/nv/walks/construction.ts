import type { Walk } from "./types";

// Construction: one job from the bid set to closeout and final payment. Order follows the life of a job.
export const construction: Walk = {
  sectionLabel: "Follow one job",
  h2: ["From the bid set to final payment.", "The agent reads, a person signs off."],
  demoTitle: "One job, bid set to final payment",
  demoSub: "Ten points where an agent reads the paperwork and a person signs off",
  replay: "Replay from the bid set",
  railLabel: "Stages of the job",
  closed: "Job closed out.",
  stages: [
    { title: "Takeoff, model and estimate from the bid set", phase: "Bid", label: "Takeoff and estimate", doc: "Bid set · drawings, specs and addenda", tag: "PDF",
      checks: ["Quantities taken off by CSI division", "Model built from the plans", "Estimate priced from your costs on past jobs", "Architectural checked against structural and MEP", "Schedules checked against plans", "Bid set checked against every addendum"], approver: "Chief estimator" },
    { title: "Bid packages built from drawings and specs", phase: "Bid", label: "Bid packages", doc: "Bid package · one per trade", tag: "PDF",
      checks: ["Drawing sheets for the trade", "Spec sections and addenda", "Written scope of work, from your past scope sheets", "Bid form"], approver: "Preconstruction manager" },
    { title: "Bid leveling sub quotes line by line", phase: "Bid", label: "Bid leveling", doc: "Leveling sheet · quotes from Outlook and the bid folder", tag: "XLS",
      checks: ["Inclusions and exclusions", "Alternates and allowances", "Qualifications", "Normalized by CSI division, like for like"], approver: "Chief estimator" },
    { title: "Scope gaps between sub bids and the spec book", phase: "Bid", label: "Scope gaps", doc: "Gap list · sub scopes against the spec book", tag: "XLS",
      checks: ["Each sub's written scope and exclusions", "The spec book", "General notes on the drawings", "Your scope sheets"], approver: "Project executive" },
    { title: "Sub insurance read before they mobilize", phase: "Buyout", label: "Sub insurance", doc: "Sub file · COIs and endorsements", tag: "PDF",
      checks: ["Limits against the subcontract", "Policy dates", "Additional insured wording", "Waiver of subrogation wording", "Request to the sub's agent drafted"], approver: "Project administrator" },
    { title: "Drawings, model and spec book disagree", phase: "Build", label: "Drawing conflicts", doc: "Conflict list · drawings, model and spec book", tag: "LOG",
      checks: ["Sheet notes, schedules and details across disciplines", "Quantities and schedules exported from the model", "Navisworks clashes turned into an RFI log with sheet references"], approver: "Project manager" },
    { title: "Submittal review against the spec section", phase: "Build", label: "Submittals", doc: "Submittal package · against the spec section", tag: "PDF",
      checks: ["Spec section, line by line", "Approved substitutions", "The drawings", "Review summary drafted for the PM"], approver: "Project manager" },
    { title: "RFIs and change orders tied to the contract", phase: "Build", label: "RFIs and change orders", doc: "RFI responses, ASIs and the architect's email", tag: "LOG",
      checks: ["Each answer compared to the contract documents", "Affected sub scopes listed", "PCO drafted with a request for sub pricing"], approver: "Project manager, then the owner's rep" },
    { title: "Pay apps, lien waivers and retainage", phase: "Bill", label: "Pay apps", doc: "Sub pay app · Sage 300 CRE", tag: "XLS",
      checks: ["Commitment and approved COs", "Percent complete against the schedule of values", "Lien waiver for the period", "Owner's G702 and G703 drafted"], approver: "Controller" },
    { title: "Closeout checked against Division 01", phase: "Close", label: "Closeout", doc: "Closeout log · Division 01, by sub", tag: "LOG",
      checks: ["Warranties", "O&M manuals", "Attic stock", "As-builts", "Training records"], approver: "Project manager" },
  ],
};
