// Example builds for the homepage showcase. Each runs the same four steps:
// something arrives, the agent reads it, drafts the work, and a person approves.
// Names and numbers are illustrative.

export type Mail = { from: string; subj: string; file?: string; time: string };
export type Said = { who: string; text: string };
export type Row = {
  lead: string;
  main: string;
  sub: string;
  right: string;
  // shown on the row until the person decides
  flag?: { main: string; sub?: string; right: string };
};

export type Example = {
  id: string;
  tab: string;
  industry: string;
  slug: string;
  title: string;
  sub: string;
  steps: [string, string, string, string];
  source: { kind: "mail"; items: Mail[] } | { kind: "call"; items: Said[] };
  doc: { name: string; tag: "PDF" | "FAX" | "CALL" | "API" | "ZIP" };
  fields: [string, string][];
  rows: Row[];
  total?: [string, string];
  review: { q: string; p: string; options: { b: string; small: string }[] };
  done: [string, string, string];
};

export const EXAMPLES: Example[] = [
  {
    id: "orders",
    tab: "Order entry",
    industry: "Wholesale distributor",
    slug: "wholesale-distribution",
    title: "Order inbox agent",
    sub: "Email and fax in · draft sales order out · a rep approves",
    steps: ["Lands in the inbox", "Agent reads it", "Drafts the sales order", "A rep approves"],
    source: {
      kind: "mail",
      items: [
        { from: "Harbor Plumbing Supply", subj: "PO 88213, need by Oct 14", file: "PO_88213.pdf", time: "7:42 AM" },
        { from: "Cascade Mechanical", subj: "Re: Order 4471, add 2 cases", time: "7:38 AM" },
        { from: "Northline Builders", subj: "Price on 40 ball valves, 2\"?", time: "7:31 AM" },
        { from: "Fax · Ridgeway Contractors", subj: "PO scan, 2 pages", file: "Fax_0712.pdf", time: "7:20 AM" },
      ],
    },
    doc: { name: "PO_88213.pdf", tag: "PDF" },
    fields: [
      ["Customer", "Harbor Plumbing Supply · HPS-118"],
      ["PO number", "88213"],
      ["Ship to", "Yard 2 · Tacoma, WA"],
      ["Need by", "Oct 14"],
    ],
    rows: [
      { lead: "120", main: "PXA-050-100", sub: "They wrote: “1/2 PEX-A pipe 100ft”", right: "$38.40" },
      { lead: "60", main: "SB-U008", sub: "They wrote: “SharkBite 1/2 coupling”", right: "$5.12" },
      { lead: "40", main: "BV-075-F", sub: "They wrote: “3/4 ball valve FIP”", right: "$14.85" },
      { lead: "200", main: "EL-PX-075", sub: "They wrote: “3/4 elbow”", right: "$1.36", flag: { main: "2 possible SKUs", right: "?" } },
      { lead: "24", main: "TT-050", sub: "They wrote: “Teflon tape 1/2in”", right: "$0.89" },
    ],
    total: ["Order total", "$5,802.56"],
    review: {
      q: "1 line needs a rep",
      p: "“3/4 elbow” matches two items.",
      options: [
        { b: "EL-PX-075 · PEX elbow", small: "On their last 6 orders" },
        { b: "EL-CU-075 · Copper elbow", small: "Never ordered" },
      ],
    },
    done: ["Approved by K. Ortiz in 1m 40s", "SO-20417 created in NetSuite", "Confirmation drafted to Harbor Plumbing"],
  },
  {
    id: "rfq",
    tab: "RFQ to quote",
    industry: "Machine shop",
    slug: "manufacturing",
    title: "Quote prep agent",
    sub: "RFQ and drawing in · draft quote out · the estimator signs off",
    steps: ["RFQ lands in the inbox", "Agent reads the drawing", "Drafts the quote", "The estimator signs off"],
    source: {
      kind: "mail",
      items: [
        { from: "Pacific Valve Co.", subj: "RFQ: 250 pcs, rev C bracket", file: "PV-1142_RevC.pdf", time: "8:05 AM" },
        { from: "Lindgren Robotics", subj: "Re: Q-3360, can you do 500?", time: "7:51 AM" },
        { from: "Orca Marine", subj: "Updated drawing, rev D", file: "OM-220_RevD.step", time: "7:44 AM" },
        { from: "Delta Ag Equipment", subj: "Can you expedite PO 7781?", time: "7:30 AM" },
      ],
    },
    doc: { name: "PV-1142_RevC.pdf", tag: "PDF" },
    fields: [
      ["Part", "PV-1142 bracket, rev C"],
      ["Material", "6061-T6 aluminum"],
      ["Quantity", "250 pcs"],
      ["Finish", "Clear anodize, Type II"],
      ["Tolerance", "±0.005, bore ±0.0005"],
    ],
    rows: [
      { lead: "Mat", main: "6061-T6 bar, 2.5 × 4", sub: "Last bought in August at $4.10/ft", right: "$1,640" },
      { lead: "Setup", main: "2 ops on the VF-2", sub: "Copied from PV-0988, a similar part", right: "$380" },
      { lead: "Run", main: "6.5 min per part", sub: "Cycle time from the CAM estimate", right: "$2,710" },
      { lead: "Bore", main: "Hone to ±0.0005", sub: "Drawing note 4", right: "$625", flag: { main: "Hone or ream?", right: "?" } },
      { lead: "Finish", main: "Anodize, outside vendor", sub: "Cascade Finishing, last quote", right: "$560" },
    ],
    total: ["250 pcs · $23.66 each", "$5,915.00"],
    review: {
      q: "1 step needs the estimator",
      p: "The bore tolerance is tighter than a reamer holds.",
      options: [
        { b: "Hone to size · +$625", small: "Held ±0.0005 on PV-0988" },
        { b: "Ream only · no added cost", small: "Held ±0.001 last time" },
      ],
    },
    done: ["Signed off by D. Reyes in 3m", "Quote Q-3381 saved to the job", "Reply drafted to Pacific Valve"],
  },
  {
    id: "calls",
    tab: "After-hours calls",
    industry: "HVAC company",
    slug: "field-services",
    title: "After-hours call agent",
    sub: "Call in · job booked on the board · dispatch confirms",
    steps: ["Call comes in at 9:14 PM", "Agent takes the details", "Books the job", "Dispatch confirms"],
    source: {
      kind: "call",
      items: [
        { who: "Caller", text: "Our furnace stopped and it's 50 degrees in here." },
        { who: "Agent", text: "I can help. Is anyone in the home elderly or unwell?" },
        { who: "Caller", text: "No, just us. It's blowing cold air." },
        { who: "Agent", text: "I have 7:30 tomorrow morning. Does that work?" },
        { who: "Caller", text: "Yes, please." },
      ],
    },
    doc: { name: "Call · 2m 11s", tag: "CALL" },
    fields: [
      ["Customer", "Dana Whitfield · since 2021"],
      ["Address", "1418 Alder St, Beaverton"],
      ["Equipment", "Carrier furnace, 2016"],
      ["Issue", "No heat, blowing cold air"],
    ],
    rows: [
      { lead: "When", main: "Tomorrow, 7:30 AM", sub: "First open slot in her area", right: "✓" },
      { lead: "Tech", main: "Marco, heating lead", sub: "Serviced this furnace in March", right: "✓", flag: { main: "Marco has a 7:00 tune-up", right: "!" } },
      { lead: "Job", main: "No-heat diagnostic", sub: "Maintenance plan: no trip fee", right: "$0" },
      { lead: "Parts", main: "Flame sensor, igniter", sub: "Both on Marco's truck", right: "✓" },
    ],
    review: {
      q: "1 conflict needs dispatch",
      p: "Marco already has a 7:00 tune-up two miles away.",
      options: [
        { b: "Move the tune-up to 9:30", small: "That customer said any time works" },
        { b: "Send Jen instead", small: "Hasn't worked on this unit" },
      ],
    },
    done: ["Confirmed by dispatch in 1m", "Job 44812 on Marco's board", "Confirmation text sent to Dana"],
  },
  {
    id: "coi",
    tab: "Certificates",
    industry: "Insurance agency",
    slug: "insurance",
    title: "Certificate request agent",
    sub: "Request in · checked against the policy · a licensed CSR signs off",
    steps: ["Request lands in the inbox", "Agent reads the contract", "Checks every coverage", "A licensed CSR signs off"],
    source: {
      kind: "mail",
      items: [
        { from: "Brightwater Builders", subj: "COI needed: Westlake job", file: "Contract_Exhibit_C.pdf", time: "10:12 AM" },
        { from: "Summit Roofing", subj: "Renewal questions", time: "10:04 AM" },
        { from: "Cole Logistics", subj: "Add a truck to our policy", time: "9:51 AM" },
        { from: "Hartley Dental", subj: "Need a copy of our dec page", time: "9:40 AM" },
      ],
    },
    doc: { name: "Contract_Exhibit_C.pdf", tag: "PDF" },
    fields: [
      ["Insured", "Ridgeline Electric LLC"],
      ["Holder", "Brightwater Builders"],
      ["Project", "Westlake Medical, Building B"],
      ["Requires", "Additional insured, primary"],
      ["Also asks", "Waiver of subrogation on WC"],
    ],
    rows: [
      { lead: "GL", main: "$1M / $2M", sub: "Contract asks $1M / $2M", right: "✓" },
      { lead: "Auto", main: "$1M combined", sub: "Contract asks $1M", right: "✓" },
      { lead: "Umb", main: "$5M umbrella", sub: "Contract asks $2M", right: "✓" },
      { lead: "WC", main: "Waiver requested", sub: "Endorsement request to the carrier", right: "…", flag: { main: "No waiver on the policy", sub: "The contract requires one", right: "!" } },
      { lead: "AI", main: "Additional insured, primary", sub: "Endorsements on file", right: "✓" },
    ],
    review: {
      q: "1 gap needs a licensed CSR",
      p: "The contract requires a waiver the policy doesn't have.",
      options: [
        { b: "Request the endorsement", small: "Hold the certificate until it's added" },
        { b: "Issue it without the waiver", small: "The client may be in breach" },
      ],
    },
    done: ["Reviewed by T. Nguyen, licensed CSR", "Endorsement request drafted to the carrier", "Client told the certificate follows tomorrow"],
  },
  {
    id: "referral",
    tab: "Referrals",
    industry: "Orthopedic clinic",
    slug: "healthcare",
    title: "Referral intake agent",
    sub: "Fax in · chart entry drafted · a coordinator checks it",
    steps: ["Referral arrives by fax", "Agent reads all 6 pages", "Builds the intake checklist", "A coordinator checks it"],
    source: {
      kind: "mail",
      items: [
        { from: "Fax · Westside Family Medicine", subj: "Referral, 6 pages", file: "Fax_1031.pdf", time: "11:02 AM" },
        { from: "Fax · Valley Urgent Care", subj: "Referral, 4 pages", time: "10:47 AM" },
        { from: "Fax · Coastal PT", subj: "Progress notes", time: "10:30 AM" },
        { from: "Patient portal", subj: "Question about my bill", time: "10:12 AM" },
      ],
    },
    doc: { name: "Fax_1031.pdf · 6 pages", tag: "FAX" },
    fields: [
      ["Patient", "J. Morales · DOB 04/11/1968"],
      ["Insurance", "Regence BlueShield · active"],
      ["Referred by", "Dr. Patel, Westside Family"],
      ["Reason", "Right knee pain, 3 months"],
    ],
    rows: [
      { lead: "Chart", main: "New patient record", sub: "No duplicate found", right: "✓" },
      { lead: "Ins", main: "Eligibility checked", sub: "Specialist copay $40", right: "✓" },
      { lead: "Auth", main: "No prior auth needed", sub: "New-visit rule for this plan", right: "✓" },
      { lead: "MRI", main: "MRI requested", sub: "Fax request to Westside drafted", right: "…", flag: { main: "MRI report missing", sub: "Mentioned on page 2, not attached", right: "!" } },
      { lead: "Visit", main: "Dr. Okafor, knees", sub: "First opening: Thursday", right: "✓" },
    ],
    review: {
      q: "1 item needs a coordinator",
      p: "Page 2 mentions an MRI, but the report isn't in the fax.",
      options: [
        { b: "Request it from Westside", small: "Fax request drafted" },
        { b: "Book without it", small: "The visit may need to be redone" },
      ],
    },
    done: ["Checked by A. Brooks in 2m", "Patient added to the chart", "Scheduling text drafted to the patient"],
  },
  {
    id: "dailylog",
    tab: "Daily logs",
    industry: "General contractor",
    slug: "construction",
    title: "Daily log agent",
    sub: "Voice memo in · daily log drafted · the PM approves",
    steps: ["Super records a voice memo", "Agent pulls out the facts", "Drafts the daily log", "The PM approves"],
    source: {
      kind: "call",
      items: [
        { who: "Super", text: "Framing crew of 8 on level 3, about 60% done." },
        { who: "Super", text: "Rained till 10, we lost two hours." },
        { who: "Super", text: "Electrical passed inspection on level 1." },
        { who: "Super", text: "Rebar came 40 bars short. Thursday's pour might slip." },
      ],
    },
    doc: { name: "Voice memo · 1m 48s", tag: "CALL" },
    fields: [
      ["Project", "Westlake Medical, Building B"],
      ["Date", "Tuesday, Oct 7"],
      ["Weather", "Rain until 10 AM, 48°F"],
      ["On site", "14 workers, 3 trades"],
    ],
    rows: [
      { lead: "Work", main: "Level 3 framing, 60%", sub: "Pacific Framing, 8 workers", right: "✓" },
      { lead: "Delay", main: "2 hours lost to rain", sub: "Logged as a weather delay", right: "✓" },
      { lead: "Insp", main: "Electrical passed, level 1", sub: "Inspector: C. Huang", right: "✓" },
      { lead: "Deliv", main: "Rebar reorder for Wednesday", sub: "Email to Cascade Steel drafted", right: "…", flag: { main: "Rebar 40 bars short", sub: "Thursday's pour at risk", right: "!" } },
      { lead: "Photos", main: "12 photos tagged", sub: "Matched to level and area", right: "✓" },
    ],
    review: {
      q: "1 item needs the PM",
      p: "Short rebar puts Thursday's pour at risk.",
      options: [
        { b: "Ask Cascade Steel for Wednesday", small: "Email drafted for your review" },
        { b: "Move the pour to Friday", small: "The concrete sub needs notice" },
      ],
    },
    done: ["Approved by PM L. Grant", "Daily log filed to the project", "Weekly owner report updated"],
  },
  {
    id: "report",
    tab: "Client reports",
    industry: "Marketing agency",
    slug: "marketing-agencies",
    title: "Monthly report agent",
    sub: "Ad and analytics data in · report drafted · the account manager edits",
    steps: ["Data pulled on the 1st", "Agent reads the numbers", "Drafts the report", "The account manager approves"],
    source: {
      kind: "mail",
      items: [
        { from: "Google Ads · Evergreen Credit Union", subj: "September, 31 campaigns", time: "6:00 AM" },
        { from: "Meta Ads", subj: "September, 12 ad sets", time: "6:00 AM" },
        { from: "GA4", subj: "Sessions and goals", time: "6:00 AM" },
        { from: "HubSpot", subj: "Leads and closed loans", time: "6:00 AM" },
      ],
    },
    doc: { name: "September · 4 sources", tag: "API" },
    fields: [
      ["Spend", "$18,420 · on budget"],
      ["Leads", "212 · up 14%"],
      ["Cost per lead", "$86.89 · down 9%"],
      ["Loan applications", "37 · up 6%"],
    ],
    rows: [
      { lead: "1", main: "Summary", sub: "Leads up 14% on the same budget", right: "✓" },
      { lead: "2", main: "Search", sub: "Auto loan terms drove 61% of leads", right: "✓" },
      { lead: "3", main: "Social", sub: "Cost per lead fell with the new video ads", right: "✓" },
      { lead: "4", main: "Website", sub: "Sept 12 form change cut mobile sign-ups", right: "✓", flag: { main: "Website", sub: "Mobile drop-off up to 48%, cause unclear", right: "?" } },
      { lead: "5", main: "Next month", sub: "3 recommendations drafted", right: "✓" },
    ],
    review: {
      q: "1 claim needs the account manager",
      p: "Mobile drop-off jumped mid-month. The data doesn't say why.",
      options: [
        { b: "The Sept 12 form change", small: "Matches the day it started" },
        { b: "Leave it unexplained", small: "Raise it on the client call" },
      ],
    },
    done: ["Edited and approved by R. Kim", "Report saved to the client folder", "Scheduled to send Oct 2, 9 AM"],
  },
  {
    id: "taxdocs",
    tab: "Tax documents",
    industry: "CPA firm",
    slug: "accounting",
    title: "Document chase agent",
    sub: "Client uploads in · checked against last year · staff approve the follow-up",
    steps: ["Client uploads documents", "Agent sorts every file", "Checks against last year", "Staff approve the follow-up"],
    source: {
      kind: "mail",
      items: [
        { from: "Portal · Greg and Ana Lindqvist", subj: "Uploaded 5 files", file: "2025_docs.zip", time: "2:14 PM" },
        { from: "Portal · M. Osei", subj: "Uploaded 2 files", time: "1:58 PM" },
        { from: "Email · Tran family", subj: "Where do I send my 1099?", time: "1:40 PM" },
        { from: "Portal · Birch Dental LLC", subj: "Uploaded Q4 statements", time: "1:22 PM" },
      ],
    },
    doc: { name: "2025_docs.zip · 5 files", tag: "ZIP" },
    fields: [
      ["W-2", "Ana · Lindqvist Design"],
      ["1099-INT", "Columbia Bank"],
      ["1098", "Mortgage interest"],
      ["1099-B", "Schwab brokerage"],
      ["Receipts", "Charitable gifts, $2,400"],
    ],
    rows: [
      { lead: "W-2", main: "Ana's W-2", sub: "Received, matches last year", right: "✓" },
      { lead: "1099", main: "Bank interest", sub: "Received, Columbia Bank", right: "✓" },
      { lead: "1098", main: "Mortgage interest", sub: "Received", right: "✓" },
      { lead: "1099-B", main: "Brokerage", sub: "Received, Schwab", right: "✓" },
      { lead: "K-1", main: "K-1 reminder drafted", sub: "Ridge Partners LP", right: "…", flag: { main: "K-1 missing", sub: "Ridge Partners LP was on last year's return", right: "!" } },
    ],
    review: {
      q: "1 document is missing",
      p: "Last year's return had a K-1 from Ridge Partners LP.",
      options: [
        { b: "Ask the client for it", small: "Reminder email drafted" },
        { b: "Mark the partnership as sold", small: "Remove it from the checklist" },
      ],
    },
    done: ["Approved by J. Webb, staff accountant", "Files renamed and filed to the 2025 return", "Reminder queued to the Lindqvists"],
  },
  {
    id: "intake",
    tab: "Client intake",
    industry: "Personal injury firm",
    slug: "legal",
    title: "Intake agent",
    sub: "Call in after hours · intake memo drafted · an attorney decides",
    steps: ["Lead calls at 8:40 PM", "Agent takes the facts", "Drafts the intake memo", "An attorney decides"],
    source: {
      kind: "call",
      items: [
        { who: "Caller", text: "I was rear-ended on I-5 last week." },
        { who: "Agent", text: "I'm sorry. Were you hurt, and have you seen a doctor?" },
        { who: "Caller", text: "My neck. I went to urgent care the next day." },
        { who: "Agent", text: "Thank you. An attorney will review this by 10 tomorrow." },
      ],
    },
    doc: { name: "Call · 4m 02s", tag: "CALL" },
    fields: [
      ["Caller", "Maria Chen"],
      ["Incident", "Rear-end collision, Sept 29"],
      ["Injury", "Neck pain, urgent care Sept 30"],
      ["Other driver", "Delivery van, Pacific Freight"],
    ],
    rows: [
      { lead: "Facts", main: "Liability looks clear", sub: "Rear-end, police report filed", right: "✓" },
      { lead: "Care", main: "Treatment started", sub: "Urgent care, PT referral", right: "✓" },
      { lead: "Date", main: "Filing deadline tracked", sub: "Calendared from Sept 29", right: "✓" },
      { lead: "Conf", main: "Cleared by an attorney", sub: "Old matter closed 2019, unrelated", right: "✓", flag: { main: "Possible conflict", sub: "Pacific Freight is a former client", right: "!" } },
      { lead: "Next", main: "Consult offered", sub: "Tomorrow, 10:00 AM", right: "✓" },
    ],
    review: {
      q: "1 item needs an attorney",
      p: "The other driver's employer, Pacific Freight, is a former client.",
      options: [
        { b: "Clear it: unrelated, closed 2019", small: "Note added to the conflict log" },
        { b: "Decline and refer out", small: "Referral letter drafted" },
      ],
    },
    done: ["Decided by attorney S. Ford", "Matter opened in Clio", "Consult confirmation drafted to Maria"],
  },
];
