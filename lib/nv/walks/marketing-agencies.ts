import type { Walk } from "./types";

// Marketing agencies: one client from the RFP to the monthly report and invoice.
// Usage rights, scope creep and retainer burn run while the campaign is live.
export const marketingAgencies: Walk = {
  sectionLabel: "Follow one client",
  h2: ["From the RFP to the monthly invoice.", "The agent checks the work, your team signs it."],
  demoTitle: "One client, RFP to monthly invoice",
  demoSub: "Ten points where an agent reads the work and a person signs off",
  replay: "Replay from the RFP",
  railLabel: "Stages of the client",
  closed: "Month reported and billed.",
  stages: [
    { title: "RFP response built from past work", phase: "Pitch", label: "RFP response", doc: "RFP · past work from HubSpot and the shared drive", tag: "PDF",
      checks: ["Each RFP requirement mapped to an answer", "Matching case results", "Team bios and past scopes", "Requirements with no proof behind them"], approver: "Head of new business" },
    { title: "Scope priced from real Harvest hours", phase: "Pitch", label: "Scope and pricing", doc: "Draft SOW · against Harvest hours", tag: "XLS",
      checks: ["Each SOW deliverable", "Actual Harvest hours on past clients", "Estimate next to what the work took"], approver: "Agency principal" },
    { title: "Creative checked against brand and specs", phase: "Make", label: "Creative check", doc: "Asset and copy · against the brand guide", tag: "PDF",
      checks: ["Client's brand guide", "Required legal disclaimers", "The approved brief", "Platform size, length and text limits"], approver: "Creative director" },
    { title: "Client approvals matched to what goes live", phase: "Make", label: "Client approvals", doc: "Approval thread · email, Slack and review comments", tag: "MAIL",
      checks: ["Which version the client approved", "Who approved it", "Version scheduled to go live"], approver: "Account director" },
    { title: "Usage rights tracker for licensed assets", phase: "Run", label: "Usage rights", doc: "License, talent and music agreements", tag: "PDF",
      checks: ["Each asset's term", "Media and territory", "Expiry against the flight end", "Renewal request drafted"], approver: "Producer" },
    { title: "Tracking breaks found before the report", phase: "Run", label: "Tracking check", doc: "GA4 against the ad platforms · daily", tag: "LOG",
      checks: ["GA4 sessions by source and medium", "Conversion event counts", "Landing page URLs", "Ad platform clicks", "Campaign naming and UTM convention"], approver: "Analytics lead" },
    { title: "Scope creep caught in the inbox", phase: "Run", label: "Scope creep", doc: "Client requests · email, Slack Connect and Asana", tag: "MAIL",
      checks: ["Client emails and Slack Connect threads", "New Asana or Monday tasks", "Signed SOW deliverables and revision limits", "Change order drafted with hours and price"], approver: "Account director" },
    { title: "Retainer burn tracked weekly", phase: "Run", label: "Retainer burn", doc: "Harvest time · against the SOW and QuickBooks", tag: "XLS",
      checks: ["Harvest time by client and person", "Retainer hours and fee in the SOW", "Invoices in QuickBooks", "Projected month-end hours", "Tasks driving the overrun"], approver: "Finance lead" },
    { title: "Monthly client report drafted from source", phase: "Report", label: "Monthly report", doc: "Monthly report · Google Ads, Meta and GA4", tag: "DOC",
      checks: ["Spend, conversions and revenue", "Platform conversions against GA4", "Commentary on what moved and why", "Each number tied to its source"], approver: "Account manager" },
    { title: "Media spend matched to what the client was billed", phase: "Bill", label: "Media rebilling", doc: "Media spend · IOs and QuickBooks invoices", tag: "XLS",
      checks: ["Spend from Google Ads, Meta and LinkedIn", "Agency card statements", "Client insertion orders and QuickBooks invoices", "Spend never rebilled", "Markups at the wrong rate"], approver: "Controller" },
  ],
};
