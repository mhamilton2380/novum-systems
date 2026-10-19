// Ten specific scenarios per industry page: what the AI does, what it catches, who approves.
// Generated from novum-vault/Outreach/workshop/scenarios.json (checked for trade accuracy 2026-10-19).
// Edit the JSON and regenerate so the site matches the sales decks. Logistics and the developer-side real-estate set have no site page.

export type Scenario = { dept: string; title: string; ai: string; catch: string; person: string };

export const SCENARIOS: Record<string, Scenario[]> = {
  "construction": [
    {
      "dept": "Preconstruction",
      "title": "Takeoff, model and estimate from the bid set",
      "ai": "A takeoff system the company owns reads the drawing set, takes off quantities by CSI division, builds a model from the plans, and prices the estimate from the company's own costs on past jobs. It then checks the set against itself (architectural against structural and MEP, schedules against plans, bid set against every addendum) and lists each conflict and each item it could not count.",
      "catch": "Prices the framing off your last six wood-frame jobs, and flags the doors added in Addendum 2 plus the level 3 beam drawn right where the mechanical sheets run the main duct.",
      "person": "Chief estimator, who sets the carry number"
    },
    {
      "dept": "Estimating",
      "title": "Bid leveling sub quotes line by line",
      "ai": "Reads every sub quote from Outlook and the bid folder, pulls inclusions, exclusions, alternates, allowances and qualifications into one leveling sheet by CSI division, and normalizes them so the low number is compared like for like.",
      "catch": "Shows the low drywall number is low because it excludes the shaft wall and the level 5 finish.",
      "person": "Estimator, with the chief estimator signing off the carry number"
    },
    {
      "dept": "Estimating",
      "title": "Scope gaps between sub bids and the spec book",
      "ai": "Compares each sub's written scope and exclusions against the spec book, the drawings' general notes and the GC's scope sheets, and produces a gap list: work the project requires that no carried sub has included.",
      "catch": "Finds the spec section that requires a fire-rated access panel the electrical and mechanical subs both excluded.",
      "person": "Project executive"
    },
    {
      "dept": "Project closeout",
      "title": "Closeout checked against Division 01",
      "ai": "Reads the Division 01 closeout section and each spec section's closeout requirements, then checks what subs have turned in: warranties, O&M manuals, attic stock, as-builts and training records. Lists every gap by sub before the final pay app.",
      "catch": "Finds the roofing warranty submitted with the wrong term and the missing attic stock for the specified flooring.",
      "person": "Project manager"
    },
    {
      "dept": "Preconstruction",
      "title": "Bid packages built from drawings and specs",
      "ai": "Drafts each trade's bid package: the relevant drawing sheets, spec sections, addenda, a written scope of work, and the bid form, using the GC's past scope sheets as the template, and lists items that fall between two trades for a decision.",
      "catch": "Asks who owns blocking for wall-hung equipment before it falls between framing and the casework sub.",
      "person": "Preconstruction manager"
    },
    {
      "dept": "Preconstruction",
      "title": "Drawings, model and spec book disagree",
      "ai": "Reads sheet notes, schedules and details across disciplines, plus quantities and schedules exported from the model, and lists every conflict with the spec book; spatial clashes still come from a clash detection tool like Navisworks, which the agent turns into an RFI log with sheet references.",
      "catch": "The life safety plan shows a 2-hour stair shaft; the partition schedule and the model both show a 1-hour assembly.",
      "person": "Project manager, who decides which ones go out as RFIs"
    },
    {
      "dept": "Project management",
      "title": "Submittal review against the spec section",
      "ai": "Reads each submittal package from the project management system or email and checks it line by line against the spec section, approved substitutions and the drawings, then drafts a review summary with flagged deviations for the PM.",
      "catch": "Catches a fire damper submittal with a static rating going into ductwork where the fans keep running in a fire, so the spec requires dynamic dampers.",
      "person": "Project manager, before it goes to the architect"
    },
    {
      "dept": "Project management",
      "title": "RFIs and change orders tied to the contract",
      "ai": "Reads every RFI response, ASI and architect's email, compares the answer to the contract documents, and drafts a PCO with the affected sub scopes and a request for sub pricing whenever the answer adds work.",
      "catch": "Spots that the answer to RFI 42 added a second layer of gypsum board and starts the PCO the same day.",
      "person": "Project manager, then the owner's rep approves the CO"
    },
    {
      "dept": "Accounting",
      "title": "Pay apps, lien waivers and retainage",
      "ai": "Reads each sub's pay app against its commitment and approved COs in Sage 300 CRE, checks percent complete against the schedule of values, confirms the right lien waiver is attached for the period, and drafts the owner's G702 and G703.",
      "catch": "Catches a sub billing retainage at 5% when the subcontract holds 10% until the job is 50% complete, and a conditional waiver whose amount doesn't match the check.",
      "person": "Controller, before anything is submitted or paid"
    },
    {
      "dept": "Admin and risk",
      "title": "Sub insurance read before they mobilize",
      "ai": "Reads every COI and endorsement in the sub file, compares limits, dates and additional insured and waiver of subrogation wording to the subcontract requirements, and drafts the request to the sub's agent.",
      "catch": "Finds the framing sub's GL carries a habitational exclusion on a multifamily job, and its additional insured endorsement covers ongoing operations only.",
      "person": "Project administrator"
    }
  ],
  "real-estate-brokerage": [
    {
      "dept": "Brokerage: listings",
      "title": "Listing prep disclosures checked per file",
      "ai": "Reads each listing file and flags the forms the property needs: lead-based paint disclosure for pre-1978 homes, HOA documents, and the seller disclosure. Checks each form for signatures and dates and lists what is missing before the listing goes live.",
      "catch": "Catches the 1962 house with no lead-based paint disclosure and an HOA resale certificate that is out of date.",
      "person": "Listing agent and broker confirm the file"
    },
    {
      "dept": "Brokerage: listings",
      "title": "CMAs drafted from MLS comps",
      "ai": "Pulls sold, pending and active comps from the MLS, adjusts for size, beds, baths, condition notes and DOM, and drafts the CMA with a suggested price range and the reasoning behind each comp.",
      "catch": "Drops the comp whose deed shows a related-party transfer in public records, and flags a pending listing the agent missed.",
      "person": "Listing agent"
    },
    {
      "dept": "Brokerage: listings",
      "title": "Listing details checked against public records",
      "ai": "Compares each new listing's MLS input against county assessor records, permit history and the prior listing, and lists every number that doesn't match with the source for each.",
      "catch": "Finds a listing advertising 4 bedrooms on a house the county records as 3, with no permit for the basement conversion.",
      "person": "Listing agent, with the managing broker on any mismatch"
    },
    {
      "dept": "Brokerage: transaction coordination",
      "title": "Missing signatures and dates in deal files",
      "ai": "Reads every document in the transaction file, checks it against the brokerage's compliance checklist and the state's required forms, and lists missing signatures, initials, dates and disclosures.",
      "catch": "Finds the counteroffer initialed by the buyer but not the seller, and an inspection response signed a day after its own deadline.",
      "person": "Transaction coordinator, then the managing broker approves the file"
    },
    {
      "dept": "Brokerage: transaction coordination",
      "title": "Contingency deadlines across every open deal",
      "ai": "Reads every executed purchase agreement and addendum, builds the deadline calendar for each deal, and drafts reminders to the agent and the other side's agent ahead of each date.",
      "catch": "Notices the financing contingency moved in Addendum 3 and the calendar still shows the old date.",
      "person": "Agent of record"
    },
    {
      "dept": "Brokerage: transaction coordination",
      "title": "Earnest money tracked to the escrow receipt",
      "ai": "Reads each purchase agreement for the earnest money amount and due date, matches it to escrow receipts in email and the transaction platform, and drafts a reminder to the agents before the deadline passes.",
      "catch": "Flags the deal where earnest money was due in three business days and no escrow receipt has come in on day five.",
      "person": "Transaction coordinator"
    },
    {
      "dept": "Brokerage: transaction coordination",
      "title": "Wire instructions checked before money moves",
      "ai": "Reads every email on the deal thread for wiring or payoff instructions, compares the sender domain, account details and phone numbers to the escrow officer's verified contact on file, and alerts the coordinator to anything that differs.",
      "catch": "Flags an 'updated wire instructions' email from a domain one letter off the escrow company's, sent to the buyer the morning before closing.",
      "person": "Transaction coordinator calls escrow at the verified number"
    },
    {
      "dept": "Brokerage: accounting",
      "title": "Commission splits checked before disbursement",
      "ai": "Reads the settlement statement, the agent's commission plan and cap progress, and any referral agreements, works out what each party is owed, and compares it to the disbursement authorization before it goes to escrow.",
      "catch": "Catches an agent paid at 80/20 after hitting their cap, and a 25% referral fee owed to an out-of-state broker that never made the disbursement.",
      "person": "Managing broker approves each disbursement"
    },
    {
      "dept": "Brokerage: commercial",
      "title": "Offering memorandums from rent roll and CoStar",
      "ai": "Reads the rent roll, T-12, leases and CoStar exports the license allows, drafts the OM sections (property summary, tenant profiles, lease expirations, market comps) and flags numbers that don't reconcile.",
      "catch": "The rent roll shows a tenant at a rate its lease doesn't reach until next year.",
      "person": "Listing broker"
    },
    {
      "dept": "Brokerage: commercial leasing",
      "title": "Option and renewal windows across the book",
      "ai": "Reads the leases and abstracts the brokerage holds for its clients, pulls expirations, option notice windows, rent bumps and termination rights, and builds a calendar of who to call and when.",
      "catch": "Flags a tenant client whose renewal option notice window closes in 90 days, nine months before the lease itself expires.",
      "person": "Leasing broker"
    }
  ],
  "field-services": [
    {
      "dept": "Commercial service",
      "title": "Maintenance contracts checked against the work done",
      "ai": "Reads each commercial maintenance agreement, lists every task and frequency it promises per site and unit, and matches them to completed work orders in ServiceTitan, flagging visits that are due, missed or billed without the work behind them.",
      "catch": "Finds the clinic contract billed for quarterly filter changes on 14 rooftop units, with only two of the four visits done this year.",
      "person": "Commercial service manager"
    },
    {
      "dept": "Sales",
      "title": "Unsold estimates followed up",
      "ai": "Reads every open estimate, the tech's notes and the equipment age, and drafts a follow-up schedule by text and email with the options presented, financing and any rebate that applies.",
      "catch": "Flags 14 open estimates still quoting the federal 25C tax credit, which ended for systems installed after December 31, 2025, before a follow-up repeats it.",
      "person": "Comfort advisor or service manager approves each message"
    },
    {
      "dept": "Service",
      "title": "Tech notes into complete invoices",
      "ai": "Compares each job's tech notes, photos and parts pulled from the truck to the invoice and the price book, and lists missing parts, labor and trip charges before the invoice is finalized.",
      "catch": "Notes say a capacitor and contactor were replaced; only the capacitor is on the invoice.",
      "person": "Office manager"
    },
    {
      "dept": "Install and compliance",
      "title": "Install permits closed out",
      "ai": "Reads every install job in ServiceTitan and the permit status from the city and county portals, lists permits with no final inspection, and drafts the inspection request and the customer scheduling message.",
      "catch": "Finds 23 install permits from last year never called for final, two of them expiring next month.",
      "person": "Install coordinator"
    },
    {
      "dept": "Install",
      "title": "Replacement quotes with rebate paperwork",
      "ai": "Reads the sold proposal and equipment, checks it against current utility and manufacturer rebate rules, builds the rebate packet from install photos and the AHRI match, and lists what is missing.",
      "catch": "Flags that the coil sold doesn't match the AHRI rating the rebate requires, before install.",
      "person": "Install coordinator submits it"
    },
    {
      "dept": "Warranty",
      "title": "Warranty registrations and parts claims filed on time",
      "ai": "Reads install jobs and serial numbers, drafts manufacturer registrations within the window, and matches warranty parts used on service calls to claims not yet filed with the distributor.",
      "catch": "Finds a compressor swapped under warranty with no credit claimed from the distributor.",
      "person": "Office manager"
    },
    {
      "dept": "Accounting",
      "title": "Supplier invoices matched to job POs",
      "ai": "Reads every supplier invoice and statement, matches it to the PO and job in ServiceTitan, checks quantity and price against the quote, and prepares the bill in QuickBooks with the job coded.",
      "catch": "Catches a line set billed twice across two invoices on the same job.",
      "person": "Bookkeeper approves before payment"
    },
    {
      "dept": "Dispatch and accounting",
      "title": "Property manager work orders become jobs",
      "ai": "Reads each work order email, creates the job in ServiceTitan with site, trade and priority, and records the NTE limit. Compares each invoice to the NTE and flags overages that need pre-approval.",
      "catch": "Flags the invoice $340 over its NTE before it is submitted and rejected.",
      "person": "Dispatcher confirms each job, bookkeeper approves invoices"
    },
    {
      "dept": "HR and compliance",
      "title": "Tech licenses and certifications tracked",
      "ai": "Tracks the company's CCB license and bond, and each tech's journeyman or limited energy license, CE hours, vehicle registration and CDL medical card. Notes the EPA 608 type on file, since those cards do not expire. Drafts reminders to the tech and the service manager.",
      "catch": "Shows a tech's journeyman card lapses next month while they are scheduled on permit work.",
      "person": "Service manager"
    },
    {
      "dept": "Service quality",
      "title": "Callbacks traced to the cause",
      "ai": "Reads every callback job with its original visit: tech, equipment model, parts used and the supplier invoice they came from, and groups callbacks by shared cause, with the jobs behind each one.",
      "catch": "Traces 7 of 9 no-heat callbacks this month to the same igniter part number from one supplier shipment, so the rest come off the trucks today.",
      "person": "Service manager"
    }
  ],
  "wholesale-distribution": [
    {
      "dept": "Customer service",
      "title": "Emailed POs keyed into orders",
      "ai": "Reads the customer's PO email and attachment, maps their part numbers to your item numbers, builds the sales order in NetSuite, Prophet 21, Business Central or Infor, and flags any line where price, unit of measure or ship-to differs from the contract.",
      "catch": "Catches a PO for 40 cases priced as 40 each against the customer's contract.",
      "person": "Inside sales rep releases the order"
    },
    {
      "dept": "Sales / quoting",
      "title": "Quote from a contractor's material list",
      "ai": "Reads the list or spec sheet, matches each line to your catalog including approved alternates, checks stock by branch, and drafts the quote with lead times and items it could not match called out.",
      "catch": "Flags that the spec names a brand you do not carry and suggests the approved equal already in stock.",
      "person": "Sales rep sets price and sends"
    },
    {
      "dept": "Purchasing",
      "title": "Vendor acknowledgement check",
      "ai": "Reads every vendor acknowledgement or EDI 855, compares price, quantity and promise date to the open PO in the ERP, and lists every mismatch for the buyer.",
      "catch": "Flags a 6% price change on an acknowledgement that the buyer never agreed to.",
      "person": "Buyer accepts or disputes"
    },
    {
      "dept": "Purchasing",
      "title": "Vendor price file updates",
      "ai": "Reads the new vendor price file or letter, compares each item to the current cost in the ERP, shows which customer contract prices now fall below target margin, and stages the cost updates.",
      "catch": "Shows the 12 contract items now selling below cost after the effective date.",
      "person": "Purchasing manager approves cost changes; sales manager decides on sell prices"
    },
    {
      "dept": "Operations / warehouse",
      "title": "ASN and receiving mismatches",
      "ai": "Reads the vendor's EDI 856 or emailed packing list, compares it to the PO and the receipt in the ERP, and drafts a shortage or overage note to the vendor with the line detail.",
      "catch": "Catches a pallet billed and shipped as 60 cartons that receiving counted at 54.",
      "person": "Receiving lead confirms counts; buyer sends the claim"
    },
    {
      "dept": "Purchasing / accounting",
      "title": "Vendor rebates and ship-and-debit claims",
      "ai": "Reads vendor rebate programs and ship-and-debit agreements, matches them to sales and purchase history, and lists amounts owed against amounts filed. Drafts each claim with the invoice support attached.",
      "catch": "Finds a quarter of ship-and-debit sales with no claim filed and the filing window closing in two weeks.",
      "person": "Purchasing manager approves each claim"
    },
    {
      "dept": "Customer service",
      "title": "Returns and RMA requests",
      "ai": "Reads the request and photos, finds the invoice, checks your return policy and the vendor's return terms, and drafts the RMA with the restock fee and whether the item goes back to the vendor for credit.",
      "catch": "Flags a return past the vendor's 30-day window, so you would eat the credit.",
      "person": "Customer service manager approves the RMA"
    },
    {
      "dept": "Accounting / AP",
      "title": "Three-way match on vendor invoices",
      "ai": "Matches every vendor invoice to the PO and the receipt in the ERP, checks price, quantity and freight against terms, and holds anything that does not match with the reason written out.",
      "catch": "Holds an invoice charging freight on an order that met the vendor's prepaid freight minimum.",
      "person": "AP clerk approves payment"
    },
    {
      "dept": "Accounting / AR",
      "title": "Deductions and short pays",
      "ai": "Reads the remittance advice and customer emails, matches each deduction to invoices, credits, returns and contract terms, and drafts either the credit memo or the dispute letter with backup.",
      "catch": "Shows a customer taking a 2% early-pay discount 40 days after the invoice.",
      "person": "AR manager approves the credit or dispute"
    },
    {
      "dept": "Sales / owner reporting",
      "title": "Customers quietly buying less",
      "ai": "Reads order history by customer, product line and branch from the ERP each week, and writes a short list of accounts buying less than their usual pattern, with the product lines they stopped ordering.",
      "catch": "Flags the contractor who stopped ordering wire and conduit from you three months ago but still buys fittings.",
      "person": "Sales manager assigns follow-ups"
    }
  ],
  "manufacturing": [
    {
      "dept": "Sales / quoting",
      "title": "RFQ package read before quoting",
      "ai": "Reads the RFQ email, drawing PDFs and specs, lists material, quantities, tolerances, finishes, heat treat, inspection and certification requirements, and drafts a quote worksheet with past jobs on similar parts pulled from the ERP.",
      "catch": "Flags a drawing note requiring passivation and a full first article report that the RFQ email never mentioned.",
      "person": "Estimator sets hours, price and lead time"
    },
    {
      "dept": "Sales / quoting",
      "title": "Outside processing and material pricing",
      "ai": "Drafts the outside-process and material requests from the quote worksheet, reads the vendor replies as they arrive, and fills cost and lead time into the quote with the source quote attached.",
      "catch": "Shows the anodize vendor's lead time pushes the customer's requested ship date out a week.",
      "person": "Estimator reviews and sends"
    },
    {
      "dept": "Customer service",
      "title": "Customer PO checked against the quote",
      "ai": "Reads the customer PO, compares price, quantity, drawing revision, delivery date and terms to the quote and the job history in Epicor Kinetic, JobBOSS or ProShop, and drafts the sales order with every difference listed.",
      "catch": "Catches a PO calling out revision C when the quote was built on revision B.",
      "person": "Customer service rep releases the order"
    },
    {
      "dept": "Engineering",
      "title": "Drawing revision compare",
      "ai": "Compares the old and new drawing revisions and the revision block, lists every changed dimension, tolerance, note and material callout, and flags open jobs and routings in the ERP built on the old revision. A model-to-drawing geometry check needs CAD tools such as SolidWorks; the AI reads the drawings and notes.",
      "catch": "Shows the bore tolerance tightened on rev D while three jobs are running to rev C.",
      "person": "Manufacturing engineer decides what changes in the routing"
    },
    {
      "dept": "Quality",
      "title": "Certificate packet per shipment",
      "ai": "Reads the PO and drawing requirements, pulls the MTRs, plating and heat treat certs filed against the job, checks that heat numbers, specs and material grade match, and assembles the packet with the certificate of conformance drafted.",
      "catch": "Flags an MTR showing 6061-T6 on a job the drawing calls out as 7075-T651.",
      "person": "Quality manager signs the CoC"
    },
    {
      "dept": "Quality",
      "title": "First article and PPAP paperwork",
      "ai": "A ballooning tool (InspectionXpert or ProShop) assigns characteristic numbers on the drawing. The agent builds the AS9102 forms or PPAP document list from them and fills in CMM values where files exist.",
      "catch": "Flags three ballooned characteristics with no measured value recorded.",
      "person": "Quality inspector verifies every value and signs"
    },
    {
      "dept": "Purchasing and quality",
      "title": "Customer flowdowns carried to supplier POs",
      "ai": "Reads the customer PO terms and quality clauses, then checks every material and outside-process PO tied to the job, and lists each clause that was not flowed down before the order is placed.",
      "catch": "Flags the PO for 17-4 PH bar on a defense job with no DFARS specialty metals clause, which would make every part from it non-conforming.",
      "person": "Purchasing manager, with quality signing off"
    },
    {
      "dept": "Operations / scheduling",
      "title": "Late job early warning",
      "ai": "Reads job status, operations remaining, outside-process due dates and machine load from the ERP each morning, and lists jobs that cannot make their promise date with the operation holding them up.",
      "catch": "Shows the job waiting at heat treat that will miss its ship date by four days unless it is expedited today.",
      "person": "Production manager reschedules and decides what to tell the customer"
    },
    {
      "dept": "Quality / operations",
      "title": "Heat-lot traceability from a bad lot",
      "ai": "Given a heat or lot number, searches mill certs, receiving records, travelers and shipping documents. Lists every job, work order and shipment that lot touched, with customers and ship dates.",
      "catch": "Finds the bar stock split across two jobs, one already shipped to a customer.",
      "person": "Quality manager decides on holds and customer notices"
    },
    {
      "dept": "Owner reporting",
      "title": "Quoted versus actual hours by job",
      "ai": "Compares quoted hours, material and outside-process cost to actual labor and cost on every closed job in the ERP, and writes a weekly summary of jobs and part families that ran over, with the operation where the time went.",
      "catch": "Shows a repeat part that ran over its quoted mill hours on each of its last three jobs.",
      "person": "Owner and estimator decide what to requote"
    }
  ],
  "accounting": [
    {
      "dept": "Intake",
      "title": "Engagement letter matched to the actual scope",
      "ai": "Reads the signed engagement letter, the proposal, last year's invoices and the work logged in Karbon or Canopy, then flags services being performed that the letter does not cover and drafts a scope addendum.",
      "catch": "Finds the second entity's 1120-S you have been preparing for two years with no signed engagement and no fee.",
      "person": "Engagement partner"
    },
    {
      "dept": "Tax production",
      "title": "K-1s and 1099s keyed straight from the PDF",
      "ai": "Reads each source document, including K-1 footnotes and the composite brokerage 1099, extracts every box, builds the import file for CCH Axcess, UltraTax or Lacerte, and ties totals back to the source.",
      "catch": "Catches the Section 199A statement and the state K-1 on page 14 that nobody keyed, plus the corrected 1099 that arrived after the original was entered.",
      "person": "Preparer, then reviewing CPA"
    },
    {
      "dept": "Tax production",
      "title": "Organizer compared to last year's return",
      "ai": "Reads last year's return, the depreciation schedule and this year's uploaded documents, lists every income source, deduction and payment from last year with no matching document this year, and drafts the follow-up request.",
      "catch": "Notices the client had a Schedule E rental and two quarterly estimates last year, and this year sent neither the 1099-MISC nor proof of payment.",
      "person": "Preparer"
    },
    {
      "dept": "Client service",
      "title": "PBC list chased until it is complete",
      "ai": "Tracks every item on the PBC list against uploads in SmartVault or Liscio and attachments in Outlook, reads each file to confirm it is the right document and period, and drafts a reminder listing only what is still missing.",
      "catch": "Spots that the 'bank statements' upload is November, not December, and that the client sent the 2023 lease instead of the amendment.",
      "person": "Engagement senior approves each reminder"
    },
    {
      "dept": "Bookkeeping",
      "title": "Bank feed coded with a reason on every line",
      "ai": "Reads the bank feed, vendor history, receipts and invoices for each client, and proposes the account and class with the reason for each line. Lines flagged as uncertain or unusual come first in each batch.",
      "catch": "Flags the $40,000 'transfer' that is actually a principal payment and the recurring charge to a vendor the client stopped using in March.",
      "person": "Bookkeeper approves each batch, senior on flagged items"
    },
    {
      "dept": "Review",
      "title": "Trial balance analytics before the partner sees it",
      "ai": "Reads the trial balance, prior-year TB and the general ledger detail, compares each account period over period and against expected relationships, and drafts review notes with the transactions behind each swing.",
      "catch": "Points out payroll tax liability growing every month with no matching payments, which points to missed or misposted 941 deposits.",
      "person": "Engagement senior, then partner"
    },
    {
      "dept": "Review",
      "title": "Return diagnostics and tie-out before signing",
      "ai": "Reads the draft return, tax software diagnostics, workpapers and prior-year carryforward schedules, ties each line to its support, and lists every unresolved diagnostic and missing carryover.",
      "catch": "Finds the capital loss carryover and the charitable carryforward from last year that dropped off this year's return.",
      "person": "Reviewing CPA signs"
    },
    {
      "dept": "Compliance",
      "title": "Deadline and extension tracker across every entity",
      "ai": "Reads entity records, prior filings and IRS and state notices from Outlook, builds one calendar of every return, extension and estimate by client, and flags anything without an owner or a filed extension.",
      "catch": "Catches the S corp that switched to a June 30 fiscal year, whose 1120-S was due September 15 with no 7004 on file.",
      "person": "Tax manager"
    },
    {
      "dept": "Client service",
      "title": "IRS and state notices triaged the day they land",
      "ai": "Reads the notice, identifies the type, tax year and response deadline, pulls the matching return and workpapers, and drafts a summary for the client and a response outline for the CPA.",
      "catch": "Shows that the CP2000 is for a 1099-B already reported on the return, and the response is due in 30 days, not 60.",
      "person": "CPA decides the position and signs the response"
    },
    {
      "dept": "Compliance",
      "title": "Economic nexus monitor across states",
      "ai": "Reads each client's sales data by state, compares it to each state's dollar and transaction thresholds, and lists clients approaching or past nexus. Drafts registration and filing notes for each.",
      "catch": "Shows the client past one state's threshold two quarters ago with no registration filed.",
      "person": "Tax manager decides on registrations"
    }
  ],
  "insurance": [
    {
      "dept": "Service",
      "title": "Policy checked against the binder and quote",
      "ai": "Reads the issued policy, the binder, the carrier quote and the expiring policy, compares named insureds, locations, limits, deductibles, forms and endorsements line by line, and drafts a discrepancy list for the carrier.",
      "catch": "Finds the waiver of subrogation and the primary and noncontributory endorsement that were quoted and bound but left off the issued GL policy.",
      "person": "Licensed account manager"
    },
    {
      "dept": "Service",
      "title": "Contract insurance requirements matched to coverage",
      "ai": "Reads the insurance section of the contract or lease, extracts every required coverage, limit, endorsement and form number, and compares it to the client's current policies in the AMS, listing each gap.",
      "catch": "Shows the contract requires CG 20 10 and CG 20 37 completed operations, and the policy only carries a blanket additional insured for ongoing operations.",
      "person": "Licensed account manager; coverage advice stays with them"
    },
    {
      "dept": "Service",
      "title": "Certificates checked before they go out",
      "ai": "Reads the certificate request and the holder's contract requirements, checks every coverage, limit and endorsement listed against the policies in Applied Epic, AMS360 or HawkSoft, and flags anything the policy does not support.",
      "catch": "Stops a certificate showing the umbrella as follow-form over auto when the umbrella schedule only lists GL and employers liability.",
      "person": "Licensed account manager approves issue"
    },
    {
      "dept": "Renewals",
      "title": "Renewal submission built from the file",
      "ai": "Reads the expiring policy, prior applications, loss runs, the client's updated payroll, sales and SOV, and email updates, drafts the ACORD applications and a marketing summary, and lists every exposure that changed.",
      "catch": "Notices the client's emails mention a new warehouse location and a fleet of four added vans that are missing from the renewal SOV and auto schedule.",
      "person": "Account manager, then producer"
    },
    {
      "dept": "Renewals",
      "title": "Loss runs read and summarized for underwriters",
      "ai": "Reads carrier loss runs in their different formats, builds a five-year summary by line with paid, reserved, open and closed claims, and drafts the large-loss narrative for the producer to edit.",
      "catch": "Pulls out the open workers comp claim with a reserve that jumped since last quarter, before the underwriter finds it first.",
      "person": "Producer"
    },
    {
      "dept": "Sales",
      "title": "Quote comparison and proposal drafted",
      "ai": "Reads each carrier quote and specimen form, lines up premium, limits, deductibles, sublimits, exclusions and endorsements, and drafts the proposal with every material difference called out.",
      "catch": "Flags that the cheaper quote carries a classification limitation endorsement and a lower cyber sublimit the client's current program does not have.",
      "person": "Producer presents; coverage recommendation is theirs"
    },
    {
      "dept": "Service",
      "title": "Endorsement requests processed end to end",
      "ai": "Reads the request email, drafts the change request to the carrier with the right policy details, then reads the endorsement that comes back through IVANS or the carrier portal and confirms it matches the request.",
      "catch": "Catches that the carrier endorsement added the vehicle with liability only, while the client asked for physical damage coverage too.",
      "person": "Licensed account manager"
    },
    {
      "dept": "Compliance",
      "title": "IVANS downloads reconciled with the AMS",
      "ai": "Reads IVANS download activity, carrier portal transactions and commission statements, compares them to the policy records in the AMS, and lists every mismatch for the service team.",
      "catch": "Shows a cancellation notice for non-payment sitting in the download log with no activity on the client's account in the AMS.",
      "person": "Agency operations manager"
    },
    {
      "dept": "Accounting",
      "title": "Commission statements matched to policies",
      "ai": "Reads each carrier commission statement, matches every line to the policy, premium and rate in the AMS, and drafts a list of short-paid, missing and unbooked items for follow-up.",
      "catch": "Finds three new policies the carrier paid at the lower renewal commission rate, and one audit premium with no commission at all.",
      "person": "Agency accountant"
    },
    {
      "dept": "Service",
      "title": "Workers comp audit prep",
      "ai": "Reads the audit request, then matches payroll reports and 1099 subcontractor certificates against it. Lists uninsured subs and missing records. Class code decisions stay with the licensed person.",
      "catch": "Finds a 1099 subcontractor with no certificate on file, which the carrier will bill as employee payroll.",
      "person": "Licensed account manager makes class decisions"
    }
  ],
  "legal": [
    {
      "dept": "Intake",
      "title": "Conflicts check across every name in the file",
      "ai": "Reads the intake form, the complaint or term sheet and the client's corporate documents, extracts every party, affiliate and individual, and runs each against the conflicts database and past matters, listing hits with the matter they come from.",
      "catch": "Finds that the target company's parent was an adverse party in a matter the firm closed two years ago.",
      "person": "Conflicts attorney or general counsel decides"
    },
    {
      "dept": "Litigation",
      "title": "Discovery documents coded and a privilege log drafted",
      "ai": "Reads the collected email and documents from NetDocuments or iManage, codes them for responsiveness and issues, flags likely privileged items with the attorneys on each thread, and drafts privilege log entries.",
      "catch": "Flags an email chain forwarded to outside counsel midway, so the earlier messages need a separate privilege decision.",
      "person": "Reviewing attorney makes every privilege call"
    },
    {
      "dept": "Litigation",
      "title": "Deadlines calculated from every new filing",
      "ai": "Reads court e-filing notices and orders, extracts each deadline, and checks it against a rules calculator (CompuLaw or the firm's). Drafts Clio calendar entries with the source document linked.",
      "catch": "Notices the amended scheduling order moved expert disclosures up two weeks, and the old date is still on the calendar.",
      "person": "Docketing clerk and responsible attorney confirm each date"
    },
    {
      "dept": "Transactional",
      "title": "Redlines compared turn by turn",
      "ai": "Runs a compare tool (Litera or Word compare) on each turn so unmarked edits surface, then reads every change against the client's term sheet or the firm's playbook and flags each departure from the agreed position.",
      "catch": "The indemnity cap is untouched, yet 'Losses' now excludes the damages the cap covers.",
      "person": "Responsible attorney"
    },
    {
      "dept": "Transactional",
      "title": "Due diligence across the data room",
      "ai": "Reads every contract in the data room, extracts parties, term, renewal, assignment, change-of-control, exclusivity and termination provisions, and builds the diligence chart with page cites.",
      "catch": "Finds the key customer agreement that terminates automatically on a change of control with no consent right.",
      "person": "Supervising attorney"
    },
    {
      "dept": "Research",
      "title": "Research memo drafted with checked citations",
      "ai": "Searches LexisNexis or Westlaw through the firm's licensed access, drafts a research memo with quotes and pin cites, and checks each cited case's treatment before it goes to the attorney.",
      "catch": "Flags that a case relied on in the draft brief was reversed on the exact point it is cited for.",
      "person": "Attorney reviews every authority"
    },
    {
      "dept": "Billing",
      "title": "Pre-bills checked against OCG billing guidelines",
      "ai": "Reads each pre-bill in Clio and the client's outside counsel guidelines, flags entries that break them (block billing, staffing limits, non-billable tasks, rate caps), and drafts compliant rewording.",
      "catch": "Catches four timekeepers billing the same internal call, when the client's guidelines pay for one attorney per meeting.",
      "person": "Billing partner approves"
    },
    {
      "dept": "Client service",
      "title": "Matter status updates drafted weekly",
      "ai": "Reads the matter's recent filings, emails, docket entries and time entries, and drafts a plain-English status update with next steps and upcoming deadlines.",
      "catch": "Reminds the attorney the client was never told the hearing moved, though it was entered on the calendar last week.",
      "person": "Responsible attorney sends"
    },
    {
      "dept": "Compliance",
      "title": "Trust account and retainer reconciliation",
      "ai": "Reads the trust bank statement, client ledgers in Clio and the books in QuickBooks, performs a three-way reconciliation, and flags every mismatch, negative balance and stale retainer.",
      "catch": "Finds a client ledger that went negative because a refund was paid from trust against the wrong matter.",
      "person": "Managing partner or trust account attorney"
    },
    {
      "dept": "Litigation",
      "title": "Litigation hold tracking per custodian",
      "ai": "Tracks each custodian on a matter's hold: notice sent, acknowledgment received, reminders due. Drafts reminders for the attorney and flags new custodians named in discovery.",
      "catch": "Catches the custodian who never acknowledged the hold and whose email auto-delete is still on.",
      "person": "Responsible attorney sends each notice and reminder"
    }
  ],
  "healthcare": [
    {
      "dept": "Front desk and intake",
      "title": "Eligibility checked against tomorrow's schedule",
      "ai": "Each afternoon it pulls tomorrow's schedule from the EHR, runs 270/271 eligibility through Availity or the clearinghouse, and compares the response to the insurance on file: active coverage, plan change, copay, deductible left, and whether the visit type needs a referral. Runs under a BAA in the practice's own accounts.",
      "catch": "Flags the patient scheduled under traditional Medicare whose 271 shows a Medicare Advantage plan since the 1st, and that plan needs a referral for this visit.",
      "person": "Front desk lead"
    },
    {
      "dept": "Care coordination",
      "title": "Referral loop closure",
      "ai": "Reads open referral and imaging orders in the EHR and lists those with no scheduled appointment or returned result after a set window. Drafts a follow-up for the clinician's team. Runs under a BAA in the practice's own accounts.",
      "catch": "Flags the urgent referral ordered 30 days ago with no appointment booked.",
      "person": "Clinician's care team contacts the patient"
    },
    {
      "dept": "Prior authorization",
      "title": "Prior auth packet built from the chart",
      "ai": "For each ordered procedure or drug it reads the payer's published medical policy, pulls the matching chart notes, imaging reports and medication history, and drafts the portal submission with each criterion mapped to the page that supports it, listing any criterion the chart does not yet show. Runs under a BAA in the practice's own accounts. The clinician decides whether the patient meets criteria.",
      "catch": "Shows the policy wants six weeks of documented conservative therapy and the chart has four.",
      "person": "Prior auth coordinator, with the ordering clinician"
    },
    {
      "dept": "Prior authorization",
      "title": "Auth dates matched to the schedule",
      "ai": "It reads every approval letter for the authorized CPT codes, units, date range and servicing location, then checks each scheduled visit and procedure against them daily. Runs under a BAA in the practice's own accounts.",
      "catch": "Finds the prior auth that expires three days before the scheduled procedure.",
      "person": "Prior auth coordinator"
    },
    {
      "dept": "Coding and billing",
      "title": "Charges checked against the note before submission",
      "ai": "Before the claim leaves, it reads the signed visit note and the charge lines, checks that each ICD-10 code supports its CPT, that modifiers like 25, 59 or the X modifiers are documented, and that NCCI edits and the payer's rules pass, then queues a coder question for anything that does not line up. Runs under a BAA in the practice's own accounts. Coding decisions stay with the certified coder and provider.",
      "catch": "Catches the modifier 25 on a same-day procedure where the note documents no separate E/M work.",
      "person": "Certified coder"
    },
    {
      "dept": "Coding and billing",
      "title": "ERA posting reconciled to the contract",
      "ai": "It reads each 835 ERA, compares every paid line to the contracted rate for that CPT, payer and place of service, and lists lines paid below contract with the CARC and RARC codes used. Runs under a BAA in the practice's own accounts.",
      "catch": "Finds the payer still paying last year's fee schedule on your most common procedure code.",
      "person": "Billing manager"
    },
    {
      "dept": "Denials",
      "title": "Denials matched to the payer's actual rule",
      "ai": "It reads the EOB or ERA denial, the CARC and RARC codes, the claim and the visit note, finds the payer policy or contract clause at issue, sorts the denial into fix and resubmit, appeal, or write off, and drafts the corrected claim or an appeal letter that quotes the policy and cites the chart pages. Runs under a BAA in the practice's own accounts.",
      "catch": "Shows a CO-50 medical necessity denial where the payer's own policy lists the exact diagnosis you billed.",
      "person": "Denials specialist, with the provider signing any clinical appeal"
    },
    {
      "dept": "Denials",
      "title": "Timely filing deadlines tracked per payer",
      "ai": "It reads clearinghouse rejection reports and open A/R, applies each payer's filing and appeal window from the contracts, and lists every claim by days left with the reason it is stuck. Runs under a BAA in the practice's own accounts.",
      "catch": "Flags the batch of claims rejected for a bad NPI that hits the payer's filing limit next week.",
      "person": "Billing manager"
    },
    {
      "dept": "Credentialing",
      "title": "Credentialing packets and expirations tracked",
      "ai": "It reads licenses, DEA and board certificates, malpractice face sheets and CAQH ProView status for every provider, tracks expiration and re-attestation dates, and drafts each payer's enrollment or revalidation packet from those documents with gaps listed.",
      "catch": "Catches the new hire scheduled for patients at a payer where enrollment is still pending.",
      "person": "Credentialing coordinator"
    },
    {
      "dept": "Compliance",
      "title": "Patient messages checked before they're sent",
      "ai": "It reads incoming record requests and outgoing patient messages, and checks each release against the signed authorization's scope, recipient and expiry, or a valid right-of-access request. Minimum necessary applies to payment and operations disclosures. Every release is logged. Runs under a BAA in the practice's own accounts.",
      "catch": "Stops the record release going to an ex-spouse whose authorization was revoked last year.",
      "person": "Privacy officer or practice manager"
    }
  ],
  "marketing-agencies": [
    {
      "dept": "New business",
      "title": "RFP response built from past work",
      "ai": "It reads the RFP or prospect brief, pulls matching case results, team bios and past scopes from HubSpot and the shared drive, and drafts the response with each RFP requirement mapped to an answer, listing any requirement with no proof behind it.",
      "catch": "Flags the RFP's mandatory two healthcare client references, which the draft answers with a retail case study.",
      "person": "Head of new business"
    },
    {
      "dept": "New business",
      "title": "Scope priced from real Harvest hours",
      "ai": "It reads the draft SOW deliverables and compares each one to actual Harvest hours logged for the same deliverable on past clients, then shows the estimate next to what that work really took.",
      "catch": "Shows the monthly content package you are about to sell took past clients about twice the hours in the estimate.",
      "person": "Agency principal"
    },
    {
      "dept": "Account management",
      "title": "Scope creep caught in the inbox",
      "ai": "It reads client emails, Slack Connect threads and new Asana or Monday tasks, compares each request to the signed SOW's deliverables and revision limits, and drafts a change order with the hours and price for anything outside scope.",
      "catch": "Catches the \"quick landing page\" request that is the fourth unscoped page this quarter.",
      "person": "Account director"
    },
    {
      "dept": "Reporting",
      "title": "Monthly client report drafted from source",
      "ai": "It pulls spend, conversions and revenue from Google Ads, Meta Ads Manager and GA4, reconciles platform-reported conversions against GA4, and drafts the report and commentary explaining what moved and why, with each number tied to its source.",
      "catch": "Shows Meta claiming three times the purchases GA4 recorded for the same campaign and dates.",
      "person": "Account manager"
    },
    {
      "dept": "Reporting",
      "title": "Tracking breaks found before the report",
      "ai": "Daily, it compares GA4 sessions by source and medium, conversion event counts and landing page URLs against the ad platforms' clicks and the campaign naming and UTM convention, and flags any drop or mismatch.",
      "catch": "Finds the new campaign sending paid clicks with utm_medium blank, so GA4 files them under the Unassigned channel group.",
      "person": "Analytics lead"
    },
    {
      "dept": "Finance",
      "title": "Media spend matched to what the client was billed",
      "ai": "Pulls actual spend from Google Ads, Meta and LinkedIn and the agency's card statements, matches it to each client's insertion order and the invoices in QuickBooks, and lists spend never rebilled, markups at the wrong rate, and IOs exceeded without a signed change.",
      "catch": "Finds two months of a client's LinkedIn spend charged to the agency card and never rebilled, and a markup invoiced at 10% on a contract that says 15%.",
      "person": "Controller"
    },
    {
      "dept": "Account management",
      "title": "Client approvals matched to what goes live",
      "ai": "Reads email, Slack and review comments on each deliverable, records which version the client approved and who approved it, and checks the version scheduled to go live against it.",
      "catch": "Shows the ad scheduled with a revised headline the client never saw; the only approval in the thread is for version 2.",
      "person": "Account director"
    },
    {
      "dept": "Creative ops",
      "title": "Creative checked against brand and specs",
      "ai": "It reads each asset and its copy before client review and compares it to the client's brand guide, required legal disclaimers, the approved brief, and each platform's size, length and text limits.",
      "catch": "Catches the financial-services ad missing the required disclosure line the client's legal team mandated.",
      "person": "Creative director"
    },
    {
      "dept": "Finance and utilization",
      "title": "Retainer burn tracked weekly",
      "ai": "It reads Harvest time by client and person, the retainer hours and fee in each SOW, and invoices in QuickBooks, then shows burn to date, effective hourly rate and projected month-end hours for every client, with the tasks driving any overrun.",
      "catch": "Shows the retainer that will hit its hours by mid-month at the current pace.",
      "person": "Finance lead or COO"
    },
    {
      "dept": "Production",
      "title": "Usage rights tracker for licensed assets",
      "ai": "Reads license, talent and music agreements and the live campaign list, then tracks each asset's term, media and territory. Flags assets that expire before a flight ends and drafts renewal requests.",
      "catch": "Finds a campaign running past the talent's contracted usage end date.",
      "person": "Producer approves renewals and takedowns"
    }
  ]
};
