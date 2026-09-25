export type SystemName = "Core" | "Integrations" | "Vault" | "AI Assistant" | "Agents";

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
};

export const USE_CASES: UseCase[] = [
  {
    slug: "construction",
    name: "Construction",
    headline: "One system for every job, budget, and crew",
    sub: "Novum builds you a system that holds every project, budget, and document in one place, connected to the tools your office already runs on.",
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
        system: "Core",
        title: "Every job, budget, and schedule in one view",
        body: "Track projects, phases, budgets versus actuals, and crew schedules from a single dashboard built around how your company actually runs jobs.",
      },
      {
        system: "Integrations",
        title: "QuickBooks and your scheduling tool, connected",
        body: "Job costs post to QuickBooks automatically and schedule changes sync both directions, so field and office never work from different numbers.",
      },
      {
        system: "Vault",
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
    tools: ["QuickBooks", "Buildertrend", "Outlook", "DocuSign", "Sage 300 CRE"],
    replaces: ["Project management subscriptions", "Document storage tools", "Manual budget spreadsheets", "Separate reporting software"],
  },
  {
    slug: "field-services",
    name: "Field Services",
    headline: "Dispatch, invoicing, and history in one place",
    sub: "Novum builds you a system that connects dispatch, job history, and billing, with an assistant that knows every customer and every truck.",
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
        system: "Core",
        title: "Jobs, techs, and schedules in one board",
        body: "See every scheduled call, technician location, and job status on one dashboard, with revenue and callback rates tracked automatically.",
      },
      {
        system: "Integrations",
        title: "QuickBooks and your dispatch software, synced",
        body: "Completed jobs post to QuickBooks the moment a tech closes them out, and dispatch changes reflect everywhere without double entry.",
      },
      {
        system: "Vault",
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
    tools: ["QuickBooks", "ServiceTitan", "Housecall Pro", "Outlook", "Google Calendar", "Stripe"],
    replaces: ["Dispatch software subscriptions", "Separate invoicing tools", "Paper service records", "Manual maintenance reminders"],
  },
  {
    slug: "legal",
    name: "Legal",
    headline: "Every matter, deadline, and file in one system",
    sub: "Novum builds you a system that holds every matter, deadline, and document, connected to the tools your firm already relies on.",
    pains: [
      {
        title: "Matter status lives in someone's head",
        body: "A partner asks where a matter stands and the answer depends on which associate you catch and what they remember from last week.",
      },
      {
        title: "Deadlines get tracked in three calendars",
        body: "Court dates, filing deadlines, and client follow ups are split across personal calendars, a docketing tool, and sticky notes.",
      },
      {
        title: "Document versions get lost in email threads",
        body: "The final signed version of a contract is buried forty messages deep in an email chain, and nobody is sure it's actually the final one.",
      },
    ],
    builds: [
      {
        system: "Core",
        title: "Every matter, deadline, and hour in one view",
        body: "Track matters, court dates, billable time, and client budgets from a single dashboard built around how your firm actually works.",
      },
      {
        system: "Integrations",
        title: "Outlook and your billing system, connected",
        body: "Calendar entries, time entries, and client communications sync automatically so nothing has to be re-keyed between systems.",
      },
      {
        system: "Vault",
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
    tools: ["Clio", "Outlook", "QuickBooks", "NetDocuments", "DocuSign", "LexisNexis"],
    replaces: ["Practice management subscriptions", "Separate document storage", "Manual docketing spreadsheets", "Paper file rooms"],
  },
  {
    slug: "accounting",
    name: "Accounting",
    headline: "Every client, deadline, and file in one place",
    sub: "Novum builds you a system that holds every client engagement, deadline, and working paper, connected to the tools your firm already uses.",
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
        system: "Core",
        title: "Every client engagement and deadline in one view",
        body: "Track engagements, filing deadlines, staff assignments, and billing from a single dashboard built around how your firm runs tax season.",
      },
      {
        system: "Integrations",
        title: "QuickBooks and your tax software, connected",
        body: "Client bookkeeping data flows from QuickBooks into your workflow automatically, and engagement status syncs back without re-entry.",
      },
      {
        system: "Vault",
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
    tools: ["QuickBooks", "Intuit ProConnect", "Drake Tax", "Outlook", "Karbon", "Bill.com"],
    replaces: ["Practice management subscriptions", "Separate document portals", "Manual deadline spreadsheets", "Email based document requests"],
  },
  {
    slug: "insurance",
    name: "Insurance",
    headline: "Every policy, renewal, and client in one system",
    sub: "Novum builds you a system that holds every client, policy, and renewal, connected to the carrier and CRM tools your agency already runs on.",
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
        title: "Quote follow up depends on someone remembering",
        body: "Quotes go out and follow up happens only if the producer remembers to check back, so warm leads go cold without anyone noticing.",
      },
    ],
    builds: [
      {
        system: "Core",
        title: "Every client, policy, and renewal in one view",
        body: "Track clients, policies, renewal dates, and producer pipelines from a single dashboard built around how your agency actually sells and services.",
      },
      {
        system: "Integrations",
        title: "Salesforce and your carrier systems, connected",
        body: "Client and policy data sync between Salesforce and the tools you already use, so producers stop re-entering the same information twice.",
      },
      {
        system: "Vault",
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
      "Which quotes went out more than a week ago with no follow up?",
    ],
    agents: [
      { task: "Sent 23 renewal quotes for policies expiring in 30 days", saved: "2 hrs" },
      { task: "Drafted follow up emails for 17 quotes with no response after a week", saved: "1.5 hrs" },
      { task: "Flagged 6 policies with lapsed payment status", saved: "45 min" },
      { task: "Compiled the weekly book of business report by producer", saved: "1 hr" },
    ],
    tools: ["Salesforce", "AMS360", "QuickBooks", "Outlook", "EZLynx", "DocuSign"],
    replaces: ["CRM subscriptions", "Separate policy management tools", "Manual renewal spreadsheets", "Paper client files"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Patient records, scheduling, and billing, connected",
    sub: "Novum builds you a system that connects scheduling, patient records, and billing, with role-based access and a full audit trail on every record.",
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
        system: "Core",
        title: "Scheduling, visits, and billing in one view",
        body: "Track appointments, visit status, and billing from a single dashboard built around how your practice actually runs a patient day.",
      },
      {
        system: "Integrations",
        title: "Your EHR and billing system, connected",
        body: "Scheduling, visit notes, and billing data sync between your existing EHR and practice management tools without duplicate entry.",
      },
      {
        system: "Vault",
        title: "Patient records with role-based access and a full audit trail",
        body: "Records, intake forms, and referrals live in one searchable place, with access set by role and every view logged for accountability.",
      },
      {
        system: "AI Assistant",
        title: "Ask about any patient or schedule in plain English",
        body: "Ask which patients are due for a follow up or how many appointments are open this week, and get a direct answer from your own data.",
      },
      {
        system: "Agents",
        title: "Follow up and reminders handled in the background",
        body: "An agent drafts appointment reminder messages and follow up outreach for overdue patients and holds them for staff approval before sending.",
      },
    ],
    questions: [
      "Which patients are overdue for a follow up visit?",
      "How many appointment slots are open this week?",
      "Which claims from last month are still unpaid?",
    ],
    agents: [
      { task: "Drafted 58 appointment reminder texts for patients scheduled this week", saved: "1.5 hrs" },
      { task: "Flagged 14 claims from last month still showing unpaid", saved: "1 hr" },
      { task: "Compiled the list of patients overdue for a follow up visit", saved: "1 hr" },
      { task: "Matched incoming referral documents to existing patient records", saved: "45 min" },
    ],
    tools: ["athenahealth", "Google Workspace", "QuickBooks", "Outlook", "DrChrono", "Availity"],
    replaces: ["Separate scheduling software", "Manual prior authorization tracking", "Paper intake forms", "Standalone billing subscriptions"],
  },
  {
    slug: "marketing-agencies",
    name: "Marketing Agencies",
    headline: "Every client, campaign, and file in one place",
    sub: "Novum builds you a system that holds every client, campaign, and deliverable, connected to the tools your team already creates in.",
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
        system: "Core",
        title: "Every client, campaign, and deadline in one view",
        body: "Track clients, campaigns, deliverables, and budgets from a single dashboard built around how your agency actually runs projects.",
      },
      {
        system: "Integrations",
        title: "Your ad platforms and CRM, connected",
        body: "Campaign performance data flows in from the ad platforms you already run, and client records sync with your CRM without manual pulls.",
      },
      {
        system: "Vault",
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
    tools: ["HubSpot", "Google Ads", "Meta Ads Manager", "QuickBooks", "Outlook", "Asana"],
    replaces: ["Project management subscriptions", "Manual reporting spreadsheets", "Separate approval tools", "Scattered file storage"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    headline: "Orders, inventory, and floor status in one system",
    sub: "Novum builds you a system that connects orders, inventory, and production status, tied to the ERP and accounting tools you already run.",
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
        system: "Core",
        title: "Orders, inventory, and production status in one view",
        body: "Track orders, inventory levels, and production stage from a single dashboard built around how your shop actually runs a work order.",
      },
      {
        system: "Integrations",
        title: "Your ERP and QuickBooks, connected",
        body: "Order and inventory data sync between your existing ERP and accounting systems, so numbers match without manual reconciliation.",
      },
      {
        system: "Vault",
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
    tools: ["NetSuite", "SAP", "QuickBooks", "Fishbowl", "Outlook", "Microsoft Dynamics"],
    replaces: ["Separate inventory spreadsheets", "Manual production reports", "Standalone quality logs", "Disconnected purchasing tools"],
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
