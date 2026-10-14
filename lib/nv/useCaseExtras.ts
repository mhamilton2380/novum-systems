// Illustrative extras for the industry pages, ported from the old SystemArt and ProblemArt components.
// Names and figures are examples. Core industry data stays in lib/useCases.ts.

export type DocRow = { n: string; meta: string; tag: string };
export type ViewRow = { a: string; b: string; flag?: boolean };

export const REPEAT_WORK: Record<string, string> = {
  construction: "Owner updates, certificate tracking, job cost reconciliation, safety checklists",
  "field-services": "Maintenance reminders, closing invoices, warranty matching, callback reports",
  legal: "Client status letters, deadline watch, unbilled time, discovery filing",
  accounting: "Document chasing, filing deadlines, time against budget, work in progress reports",
  insurance: "Renewal quotes, quote follow-up, lapsed payments, book of business reports",
  healthcare: "Appointment reminders, unpaid claims, follow-up lists, referral matching",
  "marketing-agencies": "Monthly client reports, pacing checks, approval chasing, invoice matching",
  manufacturing: "Purchase orders, late orders, production reports, invoice matching",
  "wholesale-distribution": "Order entry from email, order-status replies, vendor expedites, invoice matching",
  "real-estate-brokerage": "Transaction deadlines, lead follow-up, listing marketing, compliance files, lease abstracts",
};

// One concrete scene per industry: how the problem looks on a normal day.
export const NORMAL_DAY: Record<string, string> = {
  construction:
    "Job 214, an office build, has a $430,000 budget. The job cost software shows $412,800 spent. Change orders in email add $18,400 that were approved and never posted, which makes $431,200. The Friday spreadsheet says $397,150 and was last updated six days ago. Depending on which tool you open, the job is $17,200 under budget, $1,200 over, or $32,850 under.",
  "field-services":
    "Three of seven finished jobs on the board have not been billed, and the dispatch board has no way to know. The invoice is written afterward, by someone else, in another app.",
  legal:
    "A response deadline falls on Friday. It is on one sticky note, on one desk, and in one associate's calendar, and the docketing tool has a different date.",
  accounting:
    "It is six days to March 16. Forty returns show no status in the tracker, and the reviewer who knows where they stand is in client meetings all week.",
  insurance:
    "An umbrella renewal passed six days ago. Nobody called, and the client finds out at claim time.",
  healthcare:
    "Every patient means another payer portal, another login, another form. Scheduling shows the appointment, billing shows the balance, and neither shows the pending authorization.",
  "marketing-agencies":
    "Someone pulls October numbers from four ad platforms into a spreadsheet for one client report. Repeat that for 12 clients, by hand, in the first week of every month.",
  manufacturing:
    "Order 5512 needs 450 brackets and the system says ship Friday. Someone walks the floor to count before anyone can promise a date.",
  "wholesale-distribution":
    "Purchase orders arrive as email text, PDFs, spreadsheets and the occasional fax: four formats in, and one person re-typing every line into the ERP.",
  "real-estate-brokerage":
    "A buyer's inspection contingency ends Thursday. The date is in the purchase agreement, the coordinator's calendar, and an email thread, and the listing agent's CRM shows nothing due. Meanwhile 40 portal leads from last month got one reply each.",
};

export const VIEWS: Record<string, { title: string; cols: [string, string]; rows: ViewRow[] }> = {
  construction: { title: "Active jobs: budget used", cols: ["Job", "Budget used"], rows: [
    { a: "Job 214, office build", b: "96%" },
    { a: "Job 221, retail fit-out", b: "104%, over", flag: true },
    { a: "Job 208, warehouse addition", b: "71%" },
    { a: "Job 230, clinic remodel", b: "88%" },
  ] },
  "field-services": { title: "Today's jobs by stage", cols: ["Stage", "Jobs"], rows: [
    { a: "Scheduled", b: "9" }, { a: "En route", b: "3" }, { a: "On site", b: "4" }, { a: "Invoiced", b: "11" },
  ] },
  legal: { title: "Open matters", cols: ["Matter", "Stage"], rows: [
    { a: "1042, commercial lease", b: "Negotiation" },
    { a: "1057, business purchase", b: "Closing" },
    { a: "1061, contract dispute", b: "Discovery, response due Friday", flag: true },
    { a: "1066, estate plan", b: "Intake" },
  ] },
  accounting: { title: "Tax season: returns by stage", cols: ["Stage", "Returns"], rows: [
    { a: "Waiting on client", b: "14", flag: true }, { a: "In prep", b: "9" }, { a: "Partner review", b: "4" }, { a: "Filed", b: "31" },
  ] },
  insurance: { title: "Renewals: next 90 days", cols: ["Policy", "Days to renewal"], rows: [
    { a: "Workers comp, client 112", b: "12 days, call today", flag: true },
    { a: "General liability, client 087", b: "41 days" },
    { a: "Commercial auto, client 140", b: "74 days" },
    { a: "Property, client 095", b: "88 days" },
  ] },
  healthcare: { title: "Today's clinic", cols: ["Provider", "Status"], rows: [
    { a: "Provider 1", b: "Checked in, balance due, next at 10:30" },
    { a: "Provider 2", b: "Checked in, authorization pending, next at 1:15", flag: true },
    { a: "NP", b: "Checked in, next at 11:00" },
  ] },
  "marketing-agencies": { title: "Deliverables by stage", cols: ["Stage", "Items"], rows: [
    { a: "Drafting", b: "7" }, { a: "Client review", b: "5", flag: true }, { a: "Approved", b: "4" }, { a: "Live", b: "12" },
  ] },
  manufacturing: { title: "Work orders", cols: ["Order", "Stage"], rows: [
    { a: "WO-5512, brackets x450", b: "Weld" },
    { a: "WO-5520, motor housings", b: "Paint, waiting on parts", flag: true },
    { a: "WO-5531, gasket kits", b: "QA" },
    { a: "WO-5534, frames", b: "Cut" },
  ] },
  "wholesale-distribution": { title: "Today's orders", cols: ["Order", "Stage"], rows: [
    { a: "SO 88213, 2 lines", b: "Shipped" },
    { a: "SO 88227, 23 lines", b: "Picked" },
    { a: "SO 88231, 8 lines", b: "Picked, backorder B-208", flag: true },
    { a: "SO 88240, 5 lines", b: "Entered" },
  ] },
  "real-estate-brokerage": { title: "Pending deals: next deadline", cols: ["Deal", "Next deadline"], rows: [
    { a: "Deal 311, single family", b: "Inspection, Thursday", flag: true },
    { a: "Deal 318, condo", b: "Appraisal, 9 days" },
    { a: "Deal 322, retail lease", b: "Tenant estoppel, 12 days" },
    { a: "Deal 325, townhome", b: "Closing, 21 days" },
  ] },
};

export const DOCS: Record<string, { search: string; files: DocRow[] }> = {
  construction: { search: "Search drawings, permits and certificates", files: [
    { n: "A-301 floor plan", meta: "Rev E, issued Oct 2", tag: "Current set" },
    { n: "A-301 floor plan", meta: "Rev C", tag: "Superseded" },
    { n: "Electrical sub insurance certificate", meta: "Expires Nov 2", tag: "Expires in 24 days" },
  ] },
  "field-services": { search: "Search by address, unit or serial number", files: [
    { n: "Rooftop unit 3, service history", meta: "6 visits, last Aug 14", tag: "Latest" },
    { n: "Rooftop unit 3, warranty", meta: "Parts covered to 2031", tag: "Active" },
    { n: "Maintenance agreement", meta: "Signed, renews Mar 1", tag: "Office only" },
  ] },
  legal: { search: "Search matters, filings and contracts", files: [
    { n: "Purchase agreement, executed", meta: "Matter 1057, signed Sep 30", tag: "Final" },
    { n: "Purchase agreement, v7 redline", meta: "Matter 1057", tag: "Superseded" },
    { n: "Client intake memo", meta: "Matter 1061", tag: "Matter team only" },
  ] },
  accounting: { search: "Search clients, years and forms", files: [
    { n: "2025 Form 1065, working papers", meta: "Client 031, reviewed", tag: "Latest" },
    { n: "2025 Form 1065, draft 2", meta: "Client 031", tag: "Superseded" },
    { n: "Bank statements, Dec 2025", meta: "Client 031, uploaded by client", tag: "Partners and preparer" },
  ] },
  insurance: { search: "Search clients, policies and carriers", files: [
    { n: "Umbrella, 2026 declarations", meta: "Client 112, bound Oct 1", tag: "In force" },
    { n: "Umbrella, 2025 declarations", meta: "Client 112", tag: "Expired" },
    { n: "Loss runs, 5 years", meta: "Client 112, for remarketing", tag: "Producer only" },
  ] },
  healthcare: { search: "Search patients, authorizations and forms", files: [
    { n: "Prior authorization, MRI lumbar", meta: "Patient 4, approved Oct 7", tag: "Approved" },
    { n: "Insurance card, front and back", meta: "Patient 4, 2025 plan", tag: "Outdated" },
    { n: "Visit note", meta: "Patient 4, Oct 3", tag: "Clinical staff only" },
  ] },
  "marketing-agencies": { search: "Search clients, campaigns and assets", files: [
    { n: "Spring campaign, final creative", meta: "Client B, approved Oct 4", tag: "Approved" },
    { n: "Spring campaign, v3", meta: "Client B", tag: "Superseded" },
    { n: "Q4 media plan and budgets", meta: "Client B", tag: "Account team only" },
  ] },
  manufacturing: { search: "Search parts, drawings and lots", files: [
    { n: "Bracket, 4 in, drawing", meta: "Rev D, released Sep 18", tag: "Released" },
    { n: "Bracket, 4 in, drawing", meta: "Rev C", tag: "Obsolete" },
    { n: "Inspection log, lot 2214", meta: "WO-5512", tag: "Quality only" },
  ] },
  "wholesale-distribution": { search: "Search customers, price sheets and POs", files: [
    { n: "Customer 0418, contract prices", meta: "Effective Oct 1, 2026", tag: "Current" },
    { n: "Customer 0418, contract prices", meta: "2025", tag: "Expired" },
    { n: "Vendor cost sheet, Q4", meta: "Purchasing", tag: "Purchasing only" },
  ] },
  "real-estate-brokerage": { search: "Search deals, listings and leases", files: [
    { n: "Purchase agreement, executed", meta: "Deal 311, signed Oct 6", tag: "Final" },
    { n: "Seller disclosure", meta: "Deal 311", tag: "Missing buyer signature" },
    { n: "Commission disbursement", meta: "Deal 298", tag: "Broker and accounting only" },
  ] },
};

// Industry-specific governance line, shown beside the standard controls.
export const GOV_NOTE: Record<string, { h: string; p: string }> = {
  legal: { h: "Privileged material", p: "Privileged files are walled off by role. A matter's documents are visible to the matter team only, and the assistant answers only from what the person asking may open." },
  healthcare: { h: "Patient data", p: "Where HIPAA applies, patient data is handled under a business associate agreement, and access is limited by role. Every view of a record is logged. Agents draft reminders and outreach, and staff approve each one." },
  accounting: { h: "Client source documents", p: "Bank statements and source files are visible to partners and the assigned preparer only. Working papers carry a version, so the latest reviewed set is always the one on top." },
  insurance: { h: "Client and carrier records", p: "Loss runs and policy files are limited to the producer on the account. Drafted quotes and outreach wait for an agent or producer to approve them before anything reaches a client or carrier." },
  "marketing-agencies": { h: "Client separation", p: "Creative, budgets and approvals are limited to the account team for each client, so one client's plans are never visible on another's." },
  manufacturing: { h: "Quality records", p: "Inspection logs and supplier documents are limited by role. A drafted purchase order waits for a person to approve it before it goes to a supplier." },
  "wholesale-distribution": { h: "Pricing and cost", p: "Vendor cost sheets are limited to purchasing. Every drafted sales order waits for a rep to approve it before it is released, and lines the agent is unsure about are highlighted." },
  construction: { h: "Field and office", p: "Drawings and certificates carry a status, so the field works from the current set. Owner updates are drafted from job data and approved before they go out." },
  "real-estate-brokerage": { h: "Client data and fair housing", p: "Client financials and commission records are limited by role. Drafted listing copy and ads are checked against fair housing language rules, and every follow-up and listing piece waits for the agent to approve it before it goes out." },
  "field-services": { h: "Customer and equipment records", p: "Equipment history is searchable by address, so a technician can read it before a callback. The maintenance agreement is office only. Customer texts are held for approval before sending." },
};

function minutes(s: string) {
  const n = parseFloat(s);
  return /hr/.test(s) ? n * 60 : n;
}
/** Sum of the "time back" figures in an industry's example agent day, as "6.5 hrs". */
export function dayHours(agents: { saved: string }[]) {
  const total = agents.reduce((t, a) => t + minutes(a.saved), 0);
  const h = Math.floor((total / 60) * 2) / 2;
  return `${h % 1 ? h.toFixed(1) : h} hrs`;
}
