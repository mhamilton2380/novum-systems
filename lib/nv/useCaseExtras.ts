// Illustrative extras for the industry pages. Names and figures are examples. Core industry data stays in lib/useCases.ts.

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
// One concrete scene per industry, sized for a firm of about 120 people.
export const NORMAL_DAY: Record<string, string> = {
  construction:
    "Job 214, one of 15 active jobs, has a $430,000 budget. Sage 300 shows $412,800 spent, approved change orders sitting in email add $18,400 that never posted, and the Friday spreadsheet says $397,150. Depending on which source the project manager opens, the job is $17,200 under budget, $1,200 over, or $32,850 under, and the same gap exists on every other job.",
  "field-services":
    "By 4 p.m. the board shows 140 jobs closed for the day across 70 trucks. Billing finds 22 with no invoice, 9 missing parts used, and 4 warranty repairs nobody has filed with the manufacturer.",
  legal:
    "It is the last week of the month. Three billing partners are marking up 400 pages of pre-bills by hand, and the litigation group has two deposition transcripts and a 30,000-page production waiting for a first read.",
  accounting:
    "It is ten days to March 16. Of 600 business returns, 140 show no status in the tracker, 90 are waiting on client documents, and four reviewers hold the queue for everything else.",
  insurance:
    "Before noon the service team has 45 certificate requests in the inbox, three of them for contracts with unusual additional insured wording. Meanwhile 60 commercial renewals in the next 90 days still need submissions built for remarketing.",
  healthcare:
    "Across four sites, 38 prior authorizations are open, each in a different payer portal. Scheduling shows the appointment, billing shows the balance, and neither shows which authorizations are still pending.",
  "marketing-agencies":
    "In the first week of the month, eight account managers pull numbers from four ad platforms into spreadsheets for 50 client reports. Media buyers check pacing on 200 campaigns by hand in the same week.",
  manufacturing:
    "Twenty-five RFQs arrived this week and the two estimators will quote eight. Customer service has 30 ship-date questions open, and each one means a walk to the floor.",
  "wholesale-distribution":
    "By 10 a.m. the order inbox holds 180 purchase orders: email text, PDFs, spreadsheets and two faxes. Six inside sales reps re-type every line into the ERP while 40 status questions wait.",
  "real-estate-brokerage":
    "Twelve coordinators manage 160 pending deals, each with inspection, appraisal, financing and closing dates keyed by hand from the agreement. Last month 600 portal leads came in, and most got one reply.",
};

// Industry-specific data and access rule, shown with the approval line on each page.
export const GOV_NOTE: Record<string, { h: string; p: string }> = {
  legal: { h: "Privileged material", p: "Privileged files are walled off by role. A matter's documents are visible to the matter team only, and the assistant answers only from what the person asking may open." },
  healthcare: { h: "Patient data", p: "Where HIPAA applies, patient data is handled under a business associate agreement, access is limited by role, and every view of a record is logged. Novum does not claim HIPAA certification." },
  accounting: { h: "Client source documents", p: "Bank statements and source files are visible to partners and the assigned preparer only. Workpapers carry a version, so the latest reviewed set is always the one on top." },
  insurance: { h: "Client and carrier records", p: "Loss runs and policy files are limited to the producer and account team on each client." },
  "marketing-agencies": { h: "Client separation", p: "Creative, budgets and approvals are limited to the account team for each client, so one client's plans are never visible on another's." },
  manufacturing: { h: "Quality records and drawings", p: "Customer drawings, inspection logs and supplier documents are limited by role, and every certificate traces to the inspection data it came from." },
  "wholesale-distribution": { h: "Pricing and cost", p: "Vendor cost sheets are limited to purchasing, and customer contract prices to the reps on each account." },
  construction: { h: "Field and office", p: "Drawings and certificates carry a status, so the field works from the current set, and job cost data is limited to the project team and accounting." },
  "real-estate-brokerage": { h: "Client data and fair housing", p: "Client financials and commission records are limited by role. Listing copy and ads are checked against fair housing language rules before an agent sees the draft." },
  "field-services": { h: "Customer and equipment records", p: "Equipment history is searchable by address, so a technician can read it before a callback. Agreements and payment records are limited to the office." },
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
