import type { Walk } from "./types";

// Field services: one service call from the work order to the last supplier bill matched.
// The call becomes a repair, a callback, a replacement sale and an install, the way a residential
// and light-commercial HVAC shop sees it. License tracking, contract visits and callbacks are
// recurring reviews, placed where they come up on this call (licenses checked before dispatch).
export const fieldServices: Walk = {
  sectionLabel: "Follow one service call",
  h2: ["From the work order to the last supplier bill.", "The agent checks each step, a person approves it."],
  demoTitle: "One service call, work order to the last bill",
  demoSub: "Ten points where an agent reads the job and a person signs off",
  replay: "Replay from the work order",
  railLabel: "Stages of the service call",
  closed: "Job closed and every bill matched.",
  stages: [
    { title: "Property manager work orders become jobs", phase: "Call", label: "Work order in", doc: "Work order email · ServiceTitan job", tag: "MAIL",
      checks: ["Site, trade and priority from the email", "Job created in ServiceTitan", "NTE limit recorded", "Overages that need pre-approval flagged", "Invoice later compared to the NTE"], approver: "Dispatcher, then the bookkeeper" },
    { title: "Tech licenses and certifications tracked", phase: "Dispatch", label: "Licenses and cards", doc: "License file · company and each tech", tag: "LOG",
      checks: ["CCB license and bond", "Journeyman or limited energy license", "CE hours", "Vehicle registration and CDL medical card", "EPA 608 type on file", "Reminders drafted to the tech and service manager"], approver: "Service manager" },
    { title: "Maintenance contracts checked against the work done", phase: "Dispatch", label: "Contract visits", doc: "Maintenance agreement · ServiceTitan work orders", tag: "PDF",
      checks: ["Every task and frequency the agreement promises", "By site and unit", "Matched to completed work orders", "Visits due or missed", "Visits billed without the work behind them"], approver: "Commercial service manager" },
    { title: "Tech notes into complete invoices", phase: "Service", label: "Invoice from tech notes", doc: "Job invoice · tech notes, photos and price book", tag: "PDF",
      checks: ["Tech notes and photos", "Parts pulled from the truck", "Invoice against the price book", "Missing parts, labor and trip charges listed"], approver: "Office manager" },
    { title: "Callbacks traced to the cause", phase: "Service", label: "Callbacks", doc: "Callback jobs · with the original visit", tag: "LOG",
      checks: ["Tech and equipment model", "Parts used on the original visit", "Supplier invoice the parts came from", "Callbacks grouped by shared cause"], approver: "Service manager" },
    { title: "Unsold estimates followed up", phase: "Sell", label: "Estimate follow-up", doc: "Open estimates · tech notes and equipment age", tag: "MAIL",
      checks: ["Every open estimate", "Tech's notes and equipment age", "Options presented", "Financing and any rebate that applies", "Follow-ups drafted by text and email"], approver: "Comfort advisor or service manager" },
    { title: "Replacement quotes with rebate paperwork", phase: "Sell", label: "Rebate packet", doc: "Sold proposal · rebate packet", tag: "PDF",
      checks: ["Sold proposal and equipment", "Utility and manufacturer rebate rules", "Install photos", "AHRI match", "Missing items listed"], approver: "Install coordinator" },
    { title: "Install permits closed out", phase: "Install", label: "Permit final", doc: "Install jobs · city and county permit portals", tag: "LOG",
      checks: ["Every install job in ServiceTitan", "Permit status from the portals", "Permits with no final inspection", "Inspection request drafted", "Customer scheduling message drafted"], approver: "Install coordinator" },
    { title: "Warranty registrations and parts claims filed on time", phase: "Install", label: "Warranty and claims", doc: "Install serials · distributor parts claims", tag: "DOC",
      checks: ["Install jobs and serial numbers", "Manufacturer registrations drafted within the window", "Warranty parts used on service calls", "Claims not yet filed with the distributor"], approver: "Office manager" },
    { title: "Supplier invoices matched to job POs", phase: "Bill", label: "Supplier bills", doc: "Supplier invoice · ServiceTitan PO and QuickBooks", tag: "PDF",
      checks: ["Every supplier invoice and statement", "Matched to the PO and job", "Quantity and price against the quote", "Bill prepared in QuickBooks, job coded"], approver: "Bookkeeper" },
  ],
};
