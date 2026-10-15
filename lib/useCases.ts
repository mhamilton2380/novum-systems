export type SystemName = "Your system" | "Connected tools" | "Documents" | "AI Assistant" | "Agents";

export type UseCase = {
  slug: string;
  name: string;
  headline: string;
  sub: string;
  pains: { title: string; body: string }[];
  builds: { system: SystemName; title: string; body: string }[];
  questions: string[];
  agents: { task: string; saved: string }[];
  tools: string[];
  replaces: string[];
  removes: string[];
  /** Two or three sentences on a 50 to 250 person firm in this industry. */
  situation: string;
  /** Weekly repeat work by department for a firm of about 120 people. hrs = staff hours a week, our estimate. */
  departments: { dept: string; work: string; ai: string; person: string; hrs: number }[];
  firstAgent: { name: string; why: string; scored: string };
  /** Who approves what before anything leaves the company. */
  approval: string;
};

export const USE_CASES: UseCase[] = [
  {
    slug: "construction",
    name: "Construction",
    headline: "AI that drafts the updates and watches every budget",
    sub: "We train your office and field teams to use AI on real jobs, build agents for the paperwork, and connect it all to the tools your office already runs on.",
    pains: [
      {
        title: "Budgets live in three places",
        body: "Job costs sit in one tool, change orders in email, and the schedule in a spreadsheet someone updates by hand on Fridays.",
      },
      {
        title: "Nobody has the current set of drawings",
        body: "The superintendent is working off a plan revision the office replaced two weeks ago, and no one is sure who has the latest set.",
      },
      {
        title: "Every subscription only covers part of the job",
        body: "You pay for scheduling software, a separate document tool, and a reporting add-on, and none of them talk to each other.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Every job, budget, and schedule in one view",
        body: "Track projects, phases, budgets versus actuals, and crew schedules in one place, built around how your company actually runs jobs.",
      },
      {
        system: "Connected tools",
        title: "QuickBooks and your scheduling tool, connected",
        body: "Job costs post to QuickBooks automatically and schedule changes sync both directions, so field and office never work from different numbers.",
      },
      {
        system: "Documents",
        title: "Plans, permits, and submittals, always current",
        body: "Drawings, permits, and subcontractor certificates live in one searchable place with the latest revision flagged, and access set by role.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any job in plain English",
        body: "Ask which jobs are over budget this month or which permits expire in 30 days, and get an answer pulled straight from your live data.",
      },
      {
        system: "Agents",
        title: "Background work that used to eat an afternoon",
        body: "An agent drafts weekly owner updates from job data and routes them for your approval before anything goes out.",
      },
    ],
    questions: [
      "Which jobs are over budget this month and by how much?",
      "What change orders are still waiting on client sign off?",
      "Which subcontractors have insurance certificates expiring in the next 30 days?",
    ],
    agents: [
      { task: "Drafted 6 owner update emails for active jobs, pending your review", saved: "3 hrs" },
      { task: "Flagged 4 subcontractor insurance certificates expiring within 30 days", saved: "45 min" },
      { task: "Reconciled job cost entries against QuickBooks for 12 open jobs", saved: "2 hrs" },
      { task: "Compiled the weekly safety checklist status across 5 active sites", saved: "1 hr" },
    ],
    situation: "A general contractor with 120 people runs 12 to 20 jobs at once, and most of the office's week goes to paper that moves between project management, accounting and the field. Submittals wait in a project manager's queue, pay applications are assembled by hand from Sage 300 reports, and estimators level subcontractor bids in spreadsheets during the busiest bid weeks.",
    departments: [
      { dept: "Project management", work: "Submittal review, RFI drafting, weekly owner reports across 15 active jobs", ai: "Checks each submittal against the spec section and drafts the review comments; drafts RFIs and owner reports from job data", person: "The project manager edits and sends every review, RFI and report", hrs: 40 },
      { dept: "Accounting", work: "Subcontractor invoice coding, pay application backup, lien waiver tracking", ai: "Codes invoices to job and cost code in Sage 300, assembles pay application backup, tracks missing lien waivers", person: "The controller approves coding and every pay application", hrs: 32 },
      { dept: "Estimating", work: "Bid invitations, scope review, leveling subcontractor bids", ai: "Reads the bid set, builds a scope checklist by trade, levels sub bids into one comparison with exclusions called out", person: "The estimator sets the number and signs the bid", hrs: 24 },
      { dept: "Field operations", work: "Daily reports, safety checklists, photo logs", ai: "Turns superintendent voice notes and photos into the daily report; compiles safety status across sites each week", person: "The superintendent confirms each report", hrs: 22 },
      { dept: "Contracts and risk", work: "Subcontract drafting, insurance certificate tracking, change order logs", ai: "Drafts subcontracts from your templates, flags expiring certificates, posts approved change orders to the job budget", person: "The contracts manager approves every subcontract; the PM approves change orders", hrs: 18 },
    ],
    firstAgent: {
      name: "Submittal review against the specs",
      why: "Each submittal takes a project manager hours of reading against the plan set and owner specifications, and a late review holds up procurement. The right answer is written in the spec section, so the agent's work can be checked line by line.",
      scored: "Before launch it runs on 30 past submittals your PMs already reviewed. We compare its flagged issues with what the PMs actually caught, and it goes live only when it matches the score your team sets.",
    },
    approval: "Project managers approve every submittal review, RFI and owner report. The controller approves invoice coding and pay applications. Nothing reaches an owner, architect or subcontractor without a named person's approval.",
    tools: ["QuickBooks", "Sage 300 CRE", "Bluebeam", "Outlook", "DocuSign"],
    replaces: ["A construction management platform your team works around", "Document storage tools", "Separate reporting software"],
    removes: ["Budget spreadsheets updated by hand", "Change orders tracked in email"],
  },
  {
    slug: "field-services",
    name: "Field Services",
    headline: "AI that dispatches, invoices, and remembers every truck",
    sub: "We train your dispatchers and techs, build an assistant that knows every customer and every truck, and connect dispatch, job history, and billing.",
    pains: [
      {
        title: "Dispatch and invoicing don't talk",
        body: "The dispatch board lives in one app and invoices get written up separately afterward, so jobs slip through and billing runs late.",
      },
      {
        title: "Techs can't see job history in the field",
        body: "A tech shows up to a repeat call with no record of what the last technician found or fixed, and has to start from scratch.",
      },
      {
        title: "You're paying per seat for tools half your team barely uses",
        body: "Scheduling, invoicing, and customer records are three separate subscriptions billed per technician, whether they log in or not.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Jobs, techs, and schedules in one board",
        body: "See every scheduled call, technician location, and job status in one place, with revenue and callback rates tracked automatically.",
      },
      {
        system: "Connected tools",
        title: "QuickBooks and your dispatch software, synced",
        body: "Completed jobs post to QuickBooks the moment a tech closes them out, and dispatch changes reflect everywhere without double entry.",
      },
      {
        system: "Documents",
        title: "Equipment history and warranties on file",
        body: "Every unit's service history, warranty terms, and photos are searchable by address, so any tech can pull it up before a callback.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any customer or job before you arrive",
        body: "Ask what was done at a property last visit or which customers are due for maintenance, and get the answer before the truck rolls.",
      },
      {
        system: "Agents",
        title: "Follow up work handled while you're on the next call",
        body: "An agent drafts maintenance reminder texts for customers due for service and holds them for your approval before sending.",
      },
    ],
    questions: [
      "What was done at this address on the last two visits?",
      "Which customers are due for HVAC maintenance in the next 30 days?",
      "Which jobs this week haven't been invoiced yet?",
    ],
    agents: [
      { task: "Drafted 41 maintenance reminder texts for customers due this month", saved: "2 hrs" },
      { task: "Flagged 8 completed jobs missing a closing invoice", saved: "1 hr" },
      { task: "Matched 15 equipment warranties to open service calls", saved: "1.5 hrs" },
      { task: "Compiled the weekly callback report by technician", saved: "45 min" },
    ],
    situation: "A 120-person service company runs 60 to 80 technicians on trucks, and the office behind them carries the load: dispatch and customer service field status calls all day, billing chases closed jobs with missing paperwork, and service agreement renewals depend on someone working a list. Hours lost in the office show up as late invoices and lapsed agreements.",
    departments: [
      { dept: "Dispatch and customer service", work: "Booking calls, arrival-time questions, reschedules, confirmations", ai: "Drafts confirmations and arrival texts and answers status questions from the dispatch board", person: "A CSR handles anything off script and every complaint", hrs: 34 },
      { dept: "Technicians", work: "Equipment history lookups, job notes, repair quote write-ups", ai: "Pulls the unit's service history before arrival and turns photos and notes into a quote draft", person: "The technician confirms the quote; the customer approves it", hrs: 30 },
      { dept: "Billing", work: "Closing invoices, missing job paperwork, manufacturer warranty claims", ai: "Flags jobs closed without an invoice, drafts invoices from tech notes, prepares warranty claims with serial numbers", person: "The billing lead approves larger invoices and every claim", hrs: 28 },
      { dept: "Service agreements", work: "Maintenance reminders and agreement renewals", ai: "Drafts reminder and renewal messages for customers coming due", person: "The office approves each batch before it sends", hrs: 18 },
      { dept: "Operations management", work: "Callback and first-time-fix reporting by technician", ai: "Compiles the weekly callback report with the likely cause of each repeat visit", person: "The operations manager reviews and acts on it", hrs: 8 },
    ],
    firstAgent: {
      name: "Closed-job invoice drafter",
      why: "Every closed job without an invoice is revenue already earned and not yet billed. The tech's notes, parts used and price book hold everything the invoice needs, so the agent's draft can be checked against what billing would have written.",
      scored: "Before launch it drafts invoices for last month's closed jobs. We compare each line with the invoice billing actually sent, and it goes live only when it meets the accuracy your billing lead sets.",
    },
    approval: "Customer service approves every customer message. The billing lead approves invoices above a set amount and every warranty claim. Technicians confirm every quote before a customer sees it.",
    tools: ["ServiceTitan", "QuickBooks", "Outlook", "Google Calendar", "Stripe"],
    replaces: ["A second dispatch tool where two overlap", "Separate invoicing tools"],
    removes: ["Paper service records", "Maintenance reminders sent by hand"],
  },
  {
    slug: "legal",
    name: "Legal",
    headline: "AI that tracks every matter, deadline, and file",
    sub: "We train your attorneys and staff to use AI on real matters, build tools around how your firm works, and connect them to the systems you rely on, with privileged material walled off by role.",
    pains: [
      {
        title: "Matter status lives in someone's head",
        body: "A partner asks where a matter stands and the answer depends on which associate you catch and what they remember from last week.",
      },
      {
        title: "Deadlines get tracked in three calendars",
        body: "Court dates, filing deadlines, and client follow-ups are split across personal calendars, a docketing tool, and sticky notes.",
      },
      {
        title: "Document versions get lost in email threads",
        body: "The final signed version of a contract is buried forty messages deep in an email chain, and nobody is sure it's actually the final one.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Every matter, deadline, and hour in one view",
        body: "Track matters, court dates, billable time, and client budgets in one place, built around how your firm actually works.",
      },
      {
        system: "Connected tools",
        title: "Outlook and your billing system, connected",
        body: "Calendar entries, time entries, and client communications sync automatically so nothing has to be re-keyed between systems.",
      },
      {
        system: "Documents",
        title: "Every filing and contract, version controlled",
        body: "Pleadings, contracts, and discovery documents live in one searchable place with role-based access, so paralegals and partners see what they should.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any matter in plain English",
        body: "Ask which matters have a deadline in the next two weeks or what the last correspondence with a client said, and get a direct answer.",
      },
      {
        system: "Agents",
        title: "Routine drafting handled in the background",
        body: "An agent drafts status update letters to clients based on matter activity and routes them to you for review before they go out.",
      },
    ],
    questions: [
      "Which matters have a filing deadline in the next two weeks?",
      "What was the last correspondence with this client about?",
      "Which clients haven't been billed in over 60 days?",
    ],
    agents: [
      { task: "Drafted 9 client status update letters based on matter activity", saved: "2.5 hrs" },
      { task: "Flagged 5 matters with filing deadlines inside the next 10 days", saved: "1 hr" },
      { task: "Compiled unbilled time entries across 22 active matters", saved: "1.5 hrs" },
      { task: "Matched incoming discovery documents to the correct matter file", saved: "1 hr" },
    ],
    situation: "A firm of about 120 people, with 40 to 50 attorneys, spends much of its non-billable time on work that repeats matter after matter. Litigation teams summarize depositions and sort productions, transactional teams build first drafts from precedent, and billing partners mark up pre-bills against client guidelines at month end.",
    departments: [
      { dept: "Litigation", work: "Deposition summaries, sorting document productions, docketing from court notices", ai: "Summarizes transcripts by issue, sorts produced documents by issue and custodian, reads court notices and drafts docket entries", person: "An attorney reviews every summary; the docketing clerk confirms each date", hrs: 48 },
      { dept: "Transactional", work: "First drafts from precedent, closing checklists, redline summaries", ai: "Drafts from the firm's own precedents, builds closing checklists, summarizes the other side's changes", person: "The responsible attorney edits and signs off", hrs: 30 },
      { dept: "Billing", work: "Pre-bill review, time entry narratives, unbilled time", ai: "Flags entries that break a client's billing guidelines before the pre-bill goes out", person: "The billing partner approves every bill", hrs: 22 },
      { dept: "Client service", work: "Matter status letters", ai: "Drafts status letters from matter activity", person: "The responsible attorney approves each letter", hrs: 12 },
      { dept: "Intake and conflicts", work: "Conflict checks and engagement letters", ai: "Runs new parties against the client and matter records and drafts the engagement letter", person: "The conflicts attorney clears every match", hrs: 10 },
    ],
    firstAgent: {
      name: "Pre-bill review against client guidelines",
      why: "Write-downs at billing come straight out of realization, and partners spend evenings marking up pre-bills by hand. The client's billing guidelines are written rules, and nothing leaves the firm until a partner approves the bill.",
      scored: "Before launch it reviews last quarter's pre-bills. We compare its flags with the write-downs and client rejections that actually happened, and it goes live only when it catches them at the rate your billing partner sets.",
    },
    approval: "Attorneys approve every draft, summary and letter. Docketing staff confirm every date before it enters the calendar. Nothing reaches a client, court or opposing counsel without an attorney's approval.",
    tools: ["Clio", "Outlook", "QuickBooks", "NetDocuments", "DocuSign", "LexisNexis"],
    replaces: ["Practice add-ons that duplicate what you keep", "Separate document storage"],
    removes: ["Docketing spreadsheets", "Paper file rooms"],
  },
  {
    slug: "accounting",
    name: "Accounting",
    headline: "AI that chases the documents and tracks every deadline",
    sub: "We train your team to use AI on real engagements, build agents for document requests and deadline tracking, and connect them to the tools your firm already uses.",
    pains: [
      {
        title: "Client status is scattered across staff inboxes",
        body: "A partner asks where a return stands and has to check with whichever preparer is handling it, since there's no shared view of progress.",
      },
      {
        title: "Tax deadlines are tracked by memory and spreadsheets",
        body: "Filing deadlines for dozens of clients live in a spreadsheet someone updates manually, and things fall through when that person is out.",
      },
      {
        title: "Working papers get emailed back and forth",
        body: "Client documents and working papers pass through email attachments, so version control depends on someone naming files correctly.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Every client engagement and deadline in one view",
        body: "Track engagements, filing deadlines, staff assignments, and billing in one place, built around how your firm runs tax season.",
      },
      {
        system: "Connected tools",
        title: "QuickBooks and your tax software, connected",
        body: "Client bookkeeping data flows from QuickBooks into your workflow automatically, and engagement status syncs back without re-entry.",
      },
      {
        system: "Documents",
        title: "Working papers and client files, organized and searchable",
        body: "Tax returns, working papers, and client source documents live in one searchable place with access set by staff role.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any client or deadline in plain English",
        body: "Ask which clients still owe documents for their return or which engagements are due this week, and get a direct answer.",
      },
      {
        system: "Agents",
        title: "Document chasing handled without a staff email",
        body: "An agent drafts reminder emails to clients missing source documents and holds them for your approval before sending.",
      },
    ],
    questions: [
      "Which clients still owe documents for their return?",
      "Which engagements are due to file in the next 7 days?",
      "What is the total unbilled work in progress right now?",
    ],
    agents: [
      { task: "Drafted 34 document reminder emails for clients missing source files", saved: "2 hrs" },
      { task: "Flagged 11 engagements due to file within 5 business days", saved: "1 hr" },
      { task: "Reconciled staff time entries against engagement budgets", saved: "1.5 hrs" },
      { task: "Compiled the weekly work in progress report by partner", saved: "1 hr" },
    ],
    situation: "A CPA firm of about 120 people runs out of capacity every tax season, and most of the strain sits outside the actual tax work. Preparers chase missing documents, reviewers become the bottleneck in March and April, and audit and client accounting teams tie out schedules by hand while partners wait on work in progress reports.",
    departments: [
      { dept: "Tax", work: "Chasing client documents, organizer intake, keying source documents", ai: "Drafts each client's document request from last year's return, reads uploaded documents and pre-fills workpapers", person: "The preparer checks every input; the partner signs the return", hrs: 52 },
      { dept: "Client accounting services", work: "Monthly close, bank reconciliations, transaction coding", ai: "Codes transactions, prepares reconciliations and writes variance notes for the close", person: "The accountant approves the close", hrs: 30 },
      { dept: "Review", work: "First-pass review of returns", ai: "Compares each return with the prior year and the source documents and flags variances with notes", person: "The reviewer decides every flag", hrs: 26 },
      { dept: "Audit and assurance", work: "Tie-outs, request lists, confirmation letters", ai: "Ties schedules to the trial balance and drafts request lists and confirmations", person: "The senior and manager sign off", hrs: 24 },
      { dept: "Firm administration", work: "Work in progress reports, engagement letters", ai: "Compiles weekly work in progress by partner and drafts engagement letters", person: "Partners approve", hrs: 10 },
    ],
    firstAgent: {
      name: "Missing-document requests from the prior-year return",
      why: "Document chasing eats preparer hours in the weeks the firm has the least of them. Last year's return already says which forms each client should send, so the request list can be built before anyone asks.",
      scored: "Before launch it builds request lists for 50 clients from last season. We compare them with what preparers actually had to request, and it goes live only when it meets the accuracy your tax partner sets.",
    },
    approval: "Preparers approve every document request before it reaches a client. Reviewers and partners decide every flag on a return. Nothing reaches a client or taxing authority without a CPA's approval.",
    tools: ["CCH Axcess", "UltraTax CS", "Karbon", "QuickBooks Online", "Outlook", "Bill.com"],
    replaces: ["Workflow add-ons that duplicate what you keep", "Separate document portals"],
    removes: ["Deadline spreadsheets", "Document requests chased by email"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    headline: "AI that handles renewals and knows every policy",
    sub: "We train your agency to use AI on real accounts, build agents for renewals and claim files, and connect them to your carrier and CRM tools.",
    pains: [
      {
        title: "Renewals get tracked in a spreadsheet",
        body: "Policy renewal dates live in a spreadsheet someone maintains by hand, and a missed renewal means a client finds out coverage lapsed.",
      },
      {
        title: "Client history is split across the CRM and carrier portals",
        body: "A producer has to check the CRM, then log into three carrier portals, just to answer a basic question about a client's coverage.",
      },
      {
        title: "Quote follow-up depends on someone remembering",
        body: "Quotes go out and follow-up happens only if the producer remembers to check back, so warm leads go cold without anyone noticing.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Every client, policy, and renewal in one view",
        body: "Track clients, policies, renewal dates, and producer pipelines in one place, built around how your agency actually sells and services.",
      },
      {
        system: "Connected tools",
        title: "Salesforce and your carrier systems, connected",
        body: "Client and policy data sync between Salesforce and the tools you already use, so producers stop re-entering the same information twice.",
      },
      {
        system: "Documents",
        title: "Policies, applications, and client files, all searchable",
        body: "Policy documents, applications, and correspondence live in one searchable place with access set by role across your agency.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any client or renewal in plain English",
        body: "Ask which policies renew in the next 30 days or what a client's current coverage looks like, and get a direct answer.",
      },
      {
        system: "Agents",
        title: "Renewal outreach handled before it becomes a fire drill",
        body: "An agent drafts renewal quotes and outreach emails for policies expiring soon and holds them for your approval before sending.",
      },
    ],
    questions: [
      "Which policies are expiring in the next 30 days?",
      "What is this client's current coverage across all their policies?",
      "Which quotes went out more than a week ago with no follow-up?",
    ],
    agents: [
      { task: "Drafted 23 renewal quotes for policies expiring in 30 days, held for approval", saved: "2 hrs" },
      { task: "Drafted follow-up emails for 17 quotes with no response after a week", saved: "1.5 hrs" },
      { task: "Flagged 6 policies with lapsed payment status", saved: "45 min" },
      { task: "Compiled the weekly book of business report by producer", saved: "1 hr" },
    ],
    situation: "An agency of about 120 people carries thousands of commercial and personal policies, and account managers spend most of the week on remarketing and service. Renewal submissions are rebuilt from the management system and loss runs, certificate requests arrive all day, and commission statements are reconciled carrier by carrier.",
    departments: [
      { dept: "Commercial lines", work: "Renewal remarketing, carrier submissions, quote comparisons", ai: "Builds submissions from the management system and loss runs and drafts the proposal comparing carrier quotes", person: "The account manager checks coverage; the producer presents", hrs: 44 },
      { dept: "Service", work: "Certificates of insurance, endorsements, ID cards", ai: "Drafts certificates from policy data and checks them against the contract's insurance requirements", person: "A CSR issues every certificate", hrs: 30 },
      { dept: "Personal lines", work: "Renewal reviews and rate increase outreach", ai: "Flags renewals with large increases and drafts re-quote outreach", person: "An agent approves each message", hrs: 18 },
      { dept: "Accounting", work: "Direct bill commission reconciliation", ai: "Matches carrier commission statements to expected commission by policy", person: "Accounting approves the exceptions", hrs: 14 },
      { dept: "Producers", work: "Prospect research, follow-up on open quotes", ai: "Prepares an account brief before each meeting and drafts follow-ups on open quotes", person: "The producer sends", hrs: 12 },
    ],
    firstAgent: {
      name: "Certificate of insurance drafter",
      why: "Certificates are the highest-volume request a service team handles, and each one must match both the policy and the contract asking for it. The rules are written down, so every draft can be checked.",
      scored: "Before launch it drafts the last 200 certificates your CSRs issued. We compare each with what was actually sent, and it goes live only when it meets the accuracy your service manager sets.",
    },
    approval: "CSRs approve every certificate. Account managers and producers approve every submission, proposal and client message. Nothing reaches a client or carrier without a licensed person's approval.",
    tools: ["Salesforce", "AMS360", "QuickBooks", "Outlook", "EZLynx", "DocuSign"],
    replaces: ["Separate policy management tools", "Standalone certificate tracking tools"],
    removes: ["Renewal spreadsheets", "Paper client files"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "AI that handles scheduling, intake, and reminders",
    sub: "We train your staff to use AI safely, build tools for scheduling, intake, and billing, and connect them with role-based access and a full audit trail on every record.",
    pains: [
      {
        title: "Scheduling and billing run in separate systems",
        body: "The front desk books appointments in one tool while billing happens in another, so no-shows and unpaid balances slip through the gap.",
      },
      {
        title: "Staff spend hours a week on prior authorizations",
        body: "Checking coverage and submitting prior authorizations means logging into separate payer portals for every patient, one at a time.",
      },
      {
        title: "Patient records are split across systems with no single view",
        body: "A provider has to open three different screens to see a patient's history, current medications, and last visit notes in one sitting.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Scheduling, visits, and billing in one view",
        body: "Track appointments, visit status, and billing in one place, built around how your practice actually runs a patient day.",
      },
      {
        system: "Connected tools",
        title: "Your EHR and billing system, connected",
        body: "Scheduling, visit notes, and billing data sync between your existing EHR and practice management tools without duplicate entry.",
      },
      {
        system: "Documents",
        title: "Patient records with role-based access and a full audit trail",
        body: "Records, intake forms, and referrals live in one searchable place, with access set by role and every view logged for accountability.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any patient or schedule in plain English",
        body: "Ask which patients are due for a follow-up or how many appointments are open this week, and get a direct answer from your own data.",
      },
      {
        system: "Agents",
        title: "Follow up and reminders handled in the background",
        body: "An agent drafts appointment reminder messages and follow-up outreach for overdue patients and holds them for staff approval before sending.",
      },
    ],
    questions: [
      "Which patients are overdue for a follow-up visit?",
      "How many appointment slots are open this week?",
      "Which claims from last month are still unpaid?",
    ],
    agents: [
      { task: "Drafted 58 appointment reminder texts for patients scheduled this week", saved: "1.5 hrs" },
      { task: "Flagged 14 claims from last month still showing unpaid", saved: "1 hr" },
      { task: "Compiled the list of patients overdue for a follow-up visit", saved: "1 hr" },
      { task: "Matched incoming referral documents to existing patient records", saved: "45 min" },
    ],
    situation: "A multi-site practice of about 120 people loses clinical time to administration on both sides of the visit. The front desk verifies coverage and works the reminder list, prior authorizations pull staff into payer portals one patient at a time, and the billing team works denials that a complete claim would have avoided.",
    departments: [
      { dept: "Prior authorization", work: "Gathering clinical records, portal submissions, status checks", ai: "Assembles the packet from the chart against the payer's criteria and tracks status", person: "Staff submit each request; a clinician signs where required", hrs: 36 },
      { dept: "Billing and revenue cycle", work: "Denials, unpaid claim follow-up", ai: "Sorts denials by reason and drafts appeals that cite the chart", person: "A biller approves every appeal", hrs: 32 },
      { dept: "Front desk and scheduling", work: "Reminders, reschedules, eligibility checks", ai: "Drafts reminders and checks eligibility before the visit, flagging gaps", person: "Front desk staff confirm", hrs: 30 },
      { dept: "Clinical support", work: "Referral intake, faxed records, refill requests", ai: "Reads incoming faxes, matches them to the patient and routes them", person: "A nurse reviews each item", hrs: 22 },
      { dept: "Practice management", work: "Provider productivity and no-show reports", ai: "Compiles the weekly report by provider and site", person: "The practice manager reviews", hrs: 6 },
    ],
    firstAgent: {
      name: "Prior authorization packet builder",
      why: "Each authorization takes staff time in a payer portal, and an incomplete packet means a delay or a denial. Payer criteria are published, so the agent's packet can be checked against them.",
      scored: "Before launch it builds packets for recent authorizations. We compare each with what the payer approved or denied, and it goes live only when it meets the completeness your billing lead sets.",
    },
    approval: "Staff approve every patient message and every authorization request, and clinicians sign where a payer requires it. Billers approve every appeal. Nothing reaches a patient or payer without a staff member's approval.",
    tools: ["athenahealth", "Availity", "Outlook", "Google Workspace", "QuickBooks"],
    replaces: ["Separate scheduling software", "Standalone billing subscriptions"],
    removes: ["Prior authorization tracked by hand", "Paper intake forms"],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    headline: "AI that builds the reports and tracks every campaign",
    sub: "We train your team to use AI on client work, build agents for reporting and approvals, and connect them to the tools your team already creates in.",
    pains: [
      {
        title: "Client status depends on who you ask",
        body: "A client asks for an update and the account manager has to ping three people before answering, because no one view shows campaign status.",
      },
      {
        title: "Deliverables and approvals live in scattered threads",
        body: "Creative files get approved over email or Slack, so tracking what's final and what's still in review means digging through messages.",
      },
      {
        title: "Reporting is rebuilt by hand every month",
        body: "Someone pulls numbers from four different ad platforms into a spreadsheet by hand to build each client's monthly report.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Every client, campaign, and deadline in one view",
        body: "Track clients, campaigns, deliverables, and budgets in one place, built around how your agency actually runs projects.",
      },
      {
        system: "Connected tools",
        title: "Your ad platforms and CRM, connected",
        body: "Campaign performance data flows in from the ad platforms you already run, and client records sync with your CRM without manual pulls.",
      },
      {
        system: "Documents",
        title: "Creative files and approvals, all in one place",
        body: "Creative assets, contracts, and approval history live in one searchable place with access set by client team and role.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any client or campaign in plain English",
        body: "Ask which campaigns are underperforming this month or which deliverables are still waiting on client approval, and get a direct answer.",
      },
      {
        system: "Agents",
        title: "Reporting handled without the monthly scramble",
        body: "An agent pulls performance data across platforms and drafts the monthly client report, holding it for your review before it ships.",
      },
    ],
    questions: [
      "Which campaigns are underperforming their target this month?",
      "Which deliverables are still waiting on client approval?",
      "What is total billable hours versus budget for this client?",
    ],
    agents: [
      { task: "Drafted 12 monthly client performance reports from ad platform data", saved: "4 hrs" },
      { task: "Flagged 5 campaigns pacing under budget target for the month", saved: "1 hr" },
      { task: "Compiled the list of deliverables pending client approval past 3 days", saved: "45 min" },
      { task: "Matched incoming invoices to the correct client budget", saved: "1 hr" },
    ],
    situation: "An agency of about 120 people serves 40 to 60 retainer clients, and account teams lose the first week of every month to reporting. Media buyers check pacing across platforms by hand, creative teams resize and proof the same assets for every channel, and finance matches media invoices to insertion orders.",
    departments: [
      { dept: "Account management", work: "Monthly client reports, status updates, meeting notes", ai: "Pulls platform data and drafts each report's narrative and recommendations", person: "The account manager edits and sends", hrs: 40 },
      { dept: "Creative", work: "Ad copy variations, asset resizing, proofing against brand guides", ai: "Drafts variations within each client's brand guide and checks specs by channel", person: "The creative director approves", hrs: 30 },
      { dept: "Media", work: "Pacing checks, search term reviews, reallocation notes", ai: "Flags pacing and drafts negative keyword and budget changes", person: "A media buyer approves every change", hrs: 28 },
      { dept: "Finance", work: "Media invoice reconciliation, time against retainer", ai: "Matches vendor invoices to insertion orders and flags scope overruns", person: "Finance approves", hrs: 14 },
      { dept: "Strategy", work: "Competitor scans, research summaries", ai: "Writes weekly summaries of competitor ads and content", person: "The strategist decides what matters", hrs: 12 },
    ],
    firstAgent: {
      name: "Monthly client report drafter",
      why: "Reporting repeats for every client every month and is mostly data assembly. Last month's reports show exactly what good looks like for each client.",
      scored: "Before launch it drafts the last three months of reports for 10 clients. Account managers grade each against what they sent, and it goes live only when it meets the score they set.",
    },
    approval: "Account managers approve every client report and message. Media buyers approve every budget or bid change. Creative directors approve every asset before it runs.",
    tools: ["HubSpot", "Google Ads", "Meta Ads Manager", "QuickBooks", "Outlook", "Asana"],
    replaces: ["A second project tool where teams use two", "Separate approval tools", "Separate file storage subscriptions"],
    removes: ["Reporting spreadsheets", "Approvals chased by email"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    headline: "AI that tracks orders, inventory, and the floor",
    sub: "We train your team to use AI on daily operations, build tools for orders, inventory, and production status, and connect them to the ERP and accounting tools you already run.",
    pains: [
      {
        title: "Inventory counts don't match what's on the floor",
        body: "The system shows one quantity and the shop floor has another, so planning has to double check physical stock before committing to a date.",
      },
      {
        title: "Order status requires calling the floor",
        body: "Sales has to call or walk out to the floor to find out where an order actually stands, because the system doesn't reflect real time status.",
      },
      {
        title: "Reporting means exporting from three systems",
        body: "Building a production or cost report means pulling exports from the ERP, a spreadsheet, and a separate quality log and stitching them together.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Orders, inventory, and production status in one view",
        body: "Track orders, inventory levels, and production stage in one place, built around how your shop actually runs a work order.",
      },
      {
        system: "Connected tools",
        title: "Your ERP and QuickBooks, connected",
        body: "Order and inventory data sync between your existing ERP and accounting systems, so numbers match without manual reconciliation.",
      },
      {
        system: "Documents",
        title: "Specs, quality records, and supplier docs, organized",
        body: "Product specs, quality inspection records, and supplier documents live in one searchable place with access set by role.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any order or inventory level in plain English",
        body: "Ask what's the status of a specific order or which raw materials are running low, and get a direct answer from your live data.",
      },
      {
        system: "Agents",
        title: "Restocking and reporting handled in the background",
        body: "An agent flags materials falling below reorder thresholds and drafts purchase orders, holding them for your approval before they're sent.",
      },
    ],
    questions: [
      "What is the current status of this customer's order?",
      "Which raw materials are below reorder threshold right now?",
      "Which orders are behind their scheduled ship date?",
    ],
    agents: [
      { task: "Drafted 9 purchase orders for materials below reorder threshold", saved: "2 hrs" },
      { task: "Flagged 7 orders currently behind their scheduled ship date", saved: "1 hr" },
      { task: "Compiled the weekly production and scrap rate report by line", saved: "1.5 hrs" },
      { task: "Matched incoming supplier invoices to open purchase orders", saved: "1 hr" },
    ],
    situation: "A manufacturer of about 120 people, most of them on the floor, runs its office lean, and the office sets how much work the shop can take. Estimators turn around a fraction of incoming RFQs, customer service walks the floor to answer ship-date questions, and quality writes certificates and nonconformance reports by hand.",
    departments: [
      { dept: "Quoting and estimating", work: "RFQ review, reading drawings, building quotes", ai: "Reads the RFQ and drawings, pulls similar past jobs and their actual costs, drafts the quote", person: "The estimator sets the price", hrs: 36 },
      { dept: "Customer service", work: "Order entry, order status, ship-date questions", ai: "Drafts sales orders from customer POs and answers status from shop data", person: "A CSR approves each order and reply", hrs: 26 },
      { dept: "Purchasing", work: "Reorder POs, supplier expedites, invoice matching", ai: "Drafts POs for material below reorder point and matches invoices to receipts", person: "A buyer approves every PO", hrs: 24 },
      { dept: "Quality", work: "Inspection reports, nonconformance reports, certificates of conformance", ai: "Drafts NCRs and certificates from inspection data", person: "The quality manager signs", hrs: 18 },
      { dept: "Production planning", work: "Late order lists, scrap reports", ai: "Compiles the daily late list and scrap by line", person: "The planner decides the schedule", hrs: 12 },
    ],
    firstAgent: {
      name: "RFQ to draft quote",
      why: "Quoting capacity caps how much work the shop can win. Your past quotes and job costs already hold the answer for most parts, so the agent's draft can be checked against real outcomes.",
      scored: "Before launch it quotes 50 past RFQs. We compare its drafts with what you quoted and what the jobs actually cost, and it goes live only when it meets the accuracy your estimator sets.",
    },
    approval: "Estimators approve every quote. Buyers approve every purchase order before it reaches a supplier. The quality manager signs every certificate and NCR.",
    tools: ["Epicor Kinetic", "NetSuite", "Microsoft Dynamics 365", "SolidWorks", "QuickBooks", "Outlook"],
    replaces: ["Standalone quality tracking software", "Disconnected purchasing tools"],
    removes: ["Inventory spreadsheets", "Production reports compiled by hand"],
  },
  {
    slug: "wholesale-distribution",
    name: "Wholesale Distribution",
    headline: "AI that turns emailed orders into sales orders",
    sub: "We train your inside sales and customer service teams to use AI on real orders, build agents that read the order inbox and draft the entry, and connect it all to the ERP you already run.",
    pains: [
      {
        title: "Orders arrive in every format",
        body: "Purchase orders come in as email text, PDFs, spreadsheets, and the occasional fax. Someone on inside sales reads each one and types every line into the ERP.",
      },
      {
        title: "\"Where's my order?\" eats the afternoon",
        body: "Customer service looks up the order, checks with the warehouse, and writes back. The same question comes in forty times a day.",
      },
      {
        title: "Pricing lives in one person's head",
        body: "Contract prices, customer part numbers, and substitutions sit in a spreadsheet and a senior rep's memory. When that rep is out, orders slow down.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Open orders, backorders, and margin in one view",
        body: "See every open order, backordered line, and promise date by customer and rep, with margin tracked as orders are entered, built on your ERP data.",
      },
      {
        system: "Connected tools",
        title: "Your ERP, inbox, and accounting, connected",
        body: "The order inbox, the ERP, and accounting share one set of data, so an order entered once shows up everywhere it needs to.",
      },
      {
        system: "Documents",
        title: "Price agreements, spec sheets, and vendor terms, searchable",
        body: "Customer contracts, cross-reference lists, product spec sheets, and vendor terms live in one place, searchable in plain English and limited by role.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any order, customer, or SKU",
        body: "Ask what a customer paid for an item last quarter or which orders are waiting on inbound stock, and get the answer from your live data.",
      },
      {
        system: "Agents",
        title: "Order entry straight from the inbox",
        body: "An agent reads each emailed PO, matches customer part numbers to your SKUs, and drafts the sales order. Lines it isn't sure about are highlighted, and a rep approves every order before it's released.",
      },
    ],
    questions: [
      "Which open orders have lines on backorder past their promise date?",
      "What did Harbor Plumbing pay for 3/4\" PEX elbows last quarter?",
      "Which customers ordered at least 20% less this quarter than last?",
    ],
    agents: [
      { task: "Drafted 46 sales orders from emailed POs, 5 lines flagged for a rep to check", saved: "3 hrs" },
      { task: "Answered 18 order-status emails from live ERP data, pending your review", saved: "1.5 hrs" },
      { task: "Drafted expedite requests to 3 vendors for late inbound purchase orders", saved: "40 min" },
      { task: "Matched 112 vendor invoices to receipts and purchase orders", saved: "2 hrs" },
    ],
    situation: "A distributor of about 120 people takes hundreds of orders a day, and most arrive by email in whatever format the customer prefers. Inside sales re-types every line into the ERP, customer service answers the same status questions all afternoon, and purchasing and AP match paperwork across vendors.",
    departments: [
      { dept: "Inside sales", work: "Order entry from emailed POs, PDFs and spreadsheets", ai: "Reads each PO, maps customer part numbers to your SKUs and drafts the sales order, flagging lines it is unsure of", person: "A rep releases every order", hrs: 48 },
      { dept: "Customer service", work: "Order status emails, returns", ai: "Drafts answers from ERP and carrier tracking data", person: "A CSR sends each reply", hrs: 30 },
      { dept: "Accounts payable", work: "Vendor invoice matching", ai: "Matches invoices to receipts and purchase orders and lists exceptions", person: "An AP clerk approves the exceptions", hrs: 22 },
      { dept: "Purchasing", work: "Expedites, vendor acknowledgments, cost changes", ai: "Drafts expedites and compares vendor acknowledgments with the PO", person: "A buyer approves", hrs: 20 },
      { dept: "Sales management", work: "Accounts buying less", ai: "Lists customers ordering less than last quarter, by product line", person: "The sales manager assigns follow-up", hrs: 6 },
    ],
    firstAgent: {
      name: "Order entry from the inbox",
      why: "Order entry is the largest block of repeat work in the building, and every error ships. Your own order history shows how each customer's part numbers map to your SKUs, so accuracy can be measured line by line.",
      scored: "Before launch it enters 200 past emailed POs. We compare every line with the orders your reps actually entered, and it goes live only when it meets the line accuracy your sales manager sets.",
    },
    approval: "Reps release every sales order. CSRs approve every customer reply. Buyers approve every message to a vendor, and AP approves every exception.",
    tools: ["NetSuite", "Epicor Prophet 21", "Business Central", "Infor", "QuickBooks", "Outlook"],
    replaces: ["Separate quoting tools", "Standalone order portal add-ons"],
    removes: ["Order entry typed by hand", "Order-status phone tag", "Price lists in spreadsheets"],
  },
  {
    slug: "real-estate-brokerage",
    name: "Real Estate Brokerage",
    headline: "AI that runs the transaction file and works every lead",
    sub: "We train your agents, transaction coordinators and office staff to use AI on real deals, build agents for the file work, follow-up and marketing, and connect your CRM, transaction platform and listing data.",
    pains: [
      {
        title: "Every deadline lives in one coordinator's head",
        body: "Inspection, appraisal, financing and closing dates come out of the purchase agreement by hand, into a calendar, a spreadsheet and a dozen emails. One missed contingency date costs a deal.",
      },
      {
        title: "Leads go cold between the portal and the CRM",
        body: "Inquiries arrive from portals, the website, signs and referrals. Most get one reply, and the follow-up that converts them over months never happens.",
      },
      {
        title: "Marketing materials take days per listing",
        body: "Listing copy, flyers, social posts, email blasts, and for commercial deals a full offering memorandum, are rebuilt from scratch for every property.",
      },
    ],
    builds: [
      {
        system: "Your system",
        title: "Every listing, deal and deadline in one view",
        body: "Pipeline, pending deals, contingency dates, commissions and agent production in one place, built around how your brokerage runs transactions.",
      },
      {
        system: "Connected tools",
        title: "CRM, transaction platform and listing data, connected",
        body: "New leads land in your CRM with source and history, deal documents sync from your transaction platform, and closed commissions post to accounting without re-keying.",
      },
      {
        system: "Documents",
        title: "A complete compliance file on every deal",
        body: "Agreements, disclosures, addenda and leases are indexed and searchable, with missing signatures and documents flagged before the file goes to the broker for review.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any deal, listing or lease",
        body: "Ask which deals have contingencies expiring this week or which tenants have options to renew next year, and get the answer with the document it came from.",
      },
      {
        system: "Agents",
        title: "File work, follow-up and marketing drafted for you",
        body: "Agents build deadline calendars from executed agreements, draft lead follow-ups and listing materials, and abstract leases. An agent or coordinator approves before anything goes out.",
      },
    ],
    questions: [
      "Which pending deals have a contingency deadline in the next 7 days?",
      "Which compliance files are missing a signed disclosure before closing?",
      "Which commercial tenants have a renewal option in the next 12 months?",
    ],
    agents: [
      { task: "Built deadline calendars and task lists from 6 executed purchase agreements", saved: "2 hrs" },
      { task: "Drafted 38 personalized follow-ups for leads with no reply in 14 days, pending agent review", saved: "2.5 hrs" },
      { task: "Drafted listing copy, a flyer and 3 social posts for 4 new listings", saved: "3 hrs" },
      { task: "Flagged 5 compliance files missing signatures or disclosures", saved: "1 hr" },
      { task: "Abstracted 9 commercial leases into rent, term and option summaries", saved: "4 hrs" },
    ],
    situation: "A brokerage of about 120 people, agents and staff, closes hundreds of transactions a year, and the office carries every deadline and compliance file. Transaction coordinators key contingency dates by hand, agents lose portal leads after the first reply, and marketing rebuilds materials for every listing.",
    departments: [
      { dept: "Transaction coordination", work: "Deadline calendars from agreements, compliance file checks", ai: "Reads each executed agreement, builds the deadline calendar and flags missing signatures and disclosures", person: "The coordinator confirms dates; the managing broker approves the file", hrs: 36 },
      { dept: "Agents", work: "Lead replies and long-term follow-up", ai: "Drafts personal follow-ups for portal, web and referral leads", person: "The agent sends each one", hrs: 34 },
      { dept: "Marketing", work: "Listing copy, flyers, social posts, offering memoranda", ai: "Drafts materials from listing data and photos and checks fair housing language", person: "The listing agent approves", hrs: 26 },
      { dept: "Commercial leasing", work: "Lease abstracts, renewal option tracking", ai: "Abstracts leases into rent, term and option summaries", person: "The broker checks each abstract", hrs: 18 },
      { dept: "Accounting", work: "Commission disbursements", ai: "Builds the disbursement from the settlement statement and agent splits", person: "The broker approves", hrs: 8 },
    ],
    firstAgent: {
      name: "Deadline calendar from the executed agreement",
      why: "One missed contingency date can cost a deal. Every date is written in the purchase agreement and its addenda, so the agent's calendar can be checked date by date.",
      scored: "Before launch it builds calendars for 50 closed transactions. We compare every date with the file, and it goes live only when it gets them right at the rate your managing broker sets.",
    },
    approval: "Coordinators confirm every date and the managing broker approves every compliance file. Agents approve every follow-up and every piece of listing marketing before it goes out.",
    tools: ["Follow Up Boss", "Dotloop", "SkySlope", "DocuSign", "MLS", "CoStar", "Buildout", "QuickBooks", "Outlook", "Canva"],
    replaces: ["Separate email drip tools", "Standalone transaction checklist tools"],
    removes: ["Deadline spreadsheets", "Listing marketing rebuilt from scratch", "Lease abstracts typed by hand"],
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
