import type { Walk } from "./types";

// Field services: one service call from the work order to the last supplier bill matched.
// The call becomes a repair, a callback, a replacement sale and an install, the way a residential
// and light-commercial HVAC shop sees it. License tracking, contract visits and callbacks are
// recurring reviews, placed where they come up on this call (licenses checked before dispatch).
// Views follow one call: work order 4471, Maple Court Apartments, Building B, Unit 12 (Hawthorne
// Property Group), a dual-fuel system (heat pump with a gas furnace). Repair job 50217 on Oct 5, 2026,
// callback job 50391 on Oct 19, changeout job 50502 sold Nov 2 and installed Nov 17.
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
      checks: ["Site, trade and priority from the email", "Job created in ServiceTitan", "NTE limit recorded", "Overages that need pre-approval flagged", "Invoice later compared to the NTE"], approver: "Dispatcher, then the bookkeeper",
      view: {
        kind: "message", title: "Work order 4471 · Maple Court Apartments", meta: "Example · property-managed apartments · ServiceTitan", stamp: "NTE",
        msg: {
          from: "Hawthorne Property Group, maintenance", to: "Dispatch", date: "Mon, Oct 5, 2026", subject: "WO 4471 · Maple Court, Building B, Unit 12 · no heat",
          body: [
            { text: "Tenant reports no heat since last night. Building B, Unit 12." },
            { text: "Priority: urgent, same day. Tenant home after 9 am." },
            { text: "NTE $650. Call for approval before going over.", flag: true },
            { text: "Bill to Hawthorne Property Group, reference WO 4471." },
          ],
        },
        reply: {
          name: "Job 50217", status: "Created Oct 5 · invoice checked Oct 6",
          lines: [
            { k: "Site", v: "Maple Court Apartments, Building B, Unit 12" },
            { k: "Trade", v: "HVAC, heating" },
            { k: "Priority", v: "Urgent, same day" },
            { k: "NTE", v: "$650.00" },
            { k: "Invoice, all tasks", v: "$990.00" },
            { k: "Over NTE", v: "$340.00 · pre-approval request drafted to Hawthorne", flag: true },
          ],
        },
      },
    },
    { title: "Tech licenses and certifications tracked", phase: "Dispatch", label: "Licenses and cards", doc: "License file · company and each tech", tag: "LOG",
      checks: ["CCB license and bond", "Journeyman or limited energy license", "CE hours", "Vehicle registration and CDL medical card", "EPA 608 type on file", "Reminders drafted to the tech and service manager"], approver: "Service manager",
      view: {
        kind: "board", title: "Schedule board · weeks of Oct 5 to Nov 16", meta: "Example · techs with the license card on file", stamp: "Permit work",
        slots: ["Oct 5", "Oct 12", "Oct 19", "Oct 26", "Nov 2", "Nov 9", "Nov 16"],
        rows: [
          { name: "Dale R.", sub: "Journeyman electrician card to Nov 10", blocks: [{ start: 0, span: 1, label: "Service · Maple Court Unit 12" }, { start: 1, span: 4, label: "Service route", tone: "soft" }, { start: 6, span: 1, label: "Changeout · Alder St. duplex · permit", flag: true }] },
          { name: "Marcus T.", sub: "Journeyman electrician card to Mar 2028", blocks: [{ start: 0, span: 7, label: "Service route", tone: "soft" }] },
          { name: "Ana L.", sub: "Journeyman electrician card to Aug 2027", blocks: [{ start: 0, span: 2, label: "Changeouts · permit jobs" }, { start: 2, span: 2, label: "Changeouts · permit jobs" }, { start: 4, span: 3, label: "Changeouts · permit jobs" }] },
          { name: "Priya S.", sub: "Limited energy technician card to Jun 2027", blocks: [{ start: 0, span: 3, label: "Thermostats and controls" }, { start: 3, span: 4, label: "Thermostat and controls calls", tone: "soft" }] },
        ],
        foot: "Dale R.'s journeyman electrician card lapses Tue, Nov 10. He is on the Alder St. permit job the week of Nov 16. Reminder drafted to Dale and the service manager.",
      },
    },
    { title: "Maintenance contracts checked against the work done", phase: "Dispatch", label: "Contract visits", doc: "Maintenance agreement · ServiceTitan work orders", tag: "PDF",
      checks: ["Every task and frequency the agreement promises", "By site and unit", "Matched to completed work orders", "Visits due or missed", "Visits billed without the work behind them"], approver: "Commercial service manager",
      view: {
        kind: "matrix", title: "Maintenance agreements · 2026 visits against work orders", meta: "Example · commercial agreements, as of Oct 5, 2026", stamp: "Billed in advance",
        corner: "Agreement", cols: ["Q1", "Q2", "Q3", "Q4"],
        rows: [
          { name: "Eastside Family Clinic", sub: "14 rooftop units · filters quarterly", cells: [{ v: "Done Mar 10", s: "ok" }, { v: "Billed, no work order", s: "flag" }, { v: "Done Aug 4", s: "ok" }, { v: "Billed, not scheduled", s: "flag" }] },
          { name: "Riverbend Dental", sub: "6 rooftop units · filters quarterly", cells: [{ v: "Done Feb 17", s: "ok" }, { v: "Done May 12", s: "ok" }, { v: "Done Aug 18", s: "ok" }, { v: "Scheduled Oct 20", s: "ok" }] },
          { name: "Maple Court Apartments", sub: "Office and clubhouse, 3 split systems · twice a year", cells: [{ v: "", s: "na" }, { v: "Done Apr 14", s: "ok" }, { v: "", s: "na" }, { v: "Scheduled Oct 26", s: "ok" }] },
          { name: "Larch Street Offices", sub: "2 boilers · once a year", cells: [{ v: "", s: "na" }, { v: "", s: "na" }, { v: "Done Sep 9", s: "ok" }, { v: "", s: "na" }] },
        ],
        notes: [
          { text: "Clinic: billed for four quarterly filter visits on 14 rooftop units this year. Work orders show two.", flag: true },
        ],
      },
    },
    { title: "Tech notes into complete invoices", phase: "Service", label: "Invoice from tech notes", doc: "Job invoice · tech notes, photos and price book", tag: "PDF",
      checks: ["Tech notes and photos", "Parts pulled from the truck", "Invoice against the price book", "Missing parts, labor and trip charges listed"], approver: "Office manager",
      view: {
        kind: "sheet", title: "Invoice draft · Job 50217, Maple Court Unit 12", meta: "Example · tech notes and photos against the price book", stamp: "Draft",
        cols: ["Price book task", "Tech notes and photos", "On invoice", "Price"], num: [3],
        rows: [
          { cells: ["Trip charge", "Arrived 10:05 am", "Yes", "99.00"] },
          { cells: ["Diagnostic, heating", "Heat pump not running, furnace not lighting", "Yes", "149.00"] },
          { cells: ["Replace dual run capacitor", "Capacitor bulged, replaced. Photo 2", "Yes", "195.00"] },
          { cells: ["Replace contactor, 2-pole", "Contactor pitted, replaced. Photo 3", "No", "255.00"], flag: true, note: "Pulled from the truck, not billed" },
          { cells: ["Replace hot surface igniter", "Igniter cracked, replaced from truck stock. Photo 4", "Yes", "292.00"] },
        ],
        total: ["Invoice as drafted", "", "", "735.00"],
        foot: [
          { k: "Contactor, from the tech's notes", v: "255.00", flag: true },
          { k: "Invoice with every task", v: "990.00" },
          { k: "NTE on WO 4471", v: "650.00" },
          { k: "Over NTE, needs pre-approval", v: "340.00" },
        ],
      },
    },
    { title: "Callbacks traced to the cause", phase: "Service", label: "Callbacks", doc: "Callback jobs · with the original visit", tag: "LOG",
      checks: ["Tech and equipment model", "Parts used on the original visit", "Supplier invoice the parts came from", "Callbacks grouped by shared cause"], approver: "Service manager",
      view: {
        kind: "bars", title: "No-heat callbacks by cause · October 2026", meta: "Example · 9 callbacks, each traced to its original visit",
        bars: [
          { label: "Igniter IG-3417", sub: "Sep 28 shipment, Northfork Supply · includes Maple Court Unit 12", value: 7, display: "7", flag: true },
          { label: "Flame sensor dirty", sub: "Tune-up skipped", value: 1, display: "1" },
          { label: "Thermostat wiring", sub: "Loose terminal", value: 1, display: "1" },
        ],
        note: "7 of 9 no-heat callbacks trace to igniter IG-3417 from the Sep 28 shipment. Pull the rest off the trucks today.",
      },
    },
    { title: "Unsold estimates followed up", phase: "Sell", label: "Estimate follow-up", doc: "Open estimates · tech notes and equipment age", tag: "MAIL",
      checks: ["Every open estimate", "Tech's notes and equipment age", "Options presented", "Financing and any rebate that applies", "Follow-ups drafted by text and email"], approver: "Comfort advisor or service manager",
      view: {
        kind: "sheet", title: "Open estimates · Fri, Oct 30, 2026", meta: "Example · follow-ups drafted by text and email", stamp: "Follow-up queue",
        cols: ["Customer", "System and age", "Options", "Incentive on the estimate", "Next follow-up"],
        rows: [
          { cells: ["Hawthorne Property Group · Maple Court Unit 12", "Heat pump and gas furnace, 18 yr", "3", "Utility rebate", "Text, Mon Nov 2"] },
          { cells: ["Lindqvist residence", "Gas furnace and AC, 21 yr", "3", "Federal 25C tax credit", "Held"], flagCells: [3] },
          { cells: ["Okonkwo residence", "Heat pump, 16 yr", "2", "Federal 25C tax credit, utility rebate", "Held"], flagCells: [3] },
          { cells: ["Barrett residence", "Gas furnace, 24 yr", "2", "Utility rebate, financing", "Email, Tue Nov 3"] },
          { cells: ["Tran residence", "Ductless heat pump, new zone", "2", "Federal 25C tax credit", "Held"], flagCells: [3] },
          { cells: ["Moreau residence", "Heat pump and air handler, 19 yr", "3", "Federal 25C tax credit, financing", "Held"], flagCells: [3] },
        ],
        foot: [
          { k: "Open estimates still quoting the federal 25C credit", v: "14 of 37", flag: true },
          { k: "25C ended for systems installed after", v: "Dec 31, 2025" },
          { k: "Shown here", v: "6 of the 37 open estimates, 4 of the 14 flagged" },
        ],
      },
    },
    { title: "Replacement quotes with rebate paperwork", phase: "Sell", label: "Rebate packet", doc: "Sold proposal · rebate packet", tag: "PDF",
      checks: ["Sold proposal and equipment", "Utility and manufacturer rebate rules", "Install photos", "AHRI match", "Missing items listed"], approver: "Install coordinator",
      view: {
        kind: "form", title: "Rebate packet · Maple Court Unit 12 changeout", meta: "Example · job 50502, proposal sold Mon, Nov 2, 2026", stamp: "Before install",
        heads: ["Item", "Utility rebate requires", "Sold proposal shows"],
        fields: [
          { label: "Outdoor unit", want: "HP-24, as on the AHRI match", got: "HP-24, 2-ton heat pump" },
          { label: "Indoor coil", want: "CA-24, as on the AHRI match", got: "CA-30", flag: true },
          { label: "Furnace", want: "GF-60, as on the AHRI match", got: "GF-60, 60,000 Btu" },
          { label: "AHRI certificate", want: "One certificate for the system sold", got: "None on file for HP-24, CA-30, GF-60", flag: true },
          { label: "Install photos", want: "Nameplates, outdoor and indoor", got: "Not yet: taken at install" },
          { label: "Owner signature", want: "Property owner or agent", got: "Not yet: Hawthorne to sign" },
        ],
        foot: "The certificate on file is for HP-24, CA-24 and GF-60. Change the coil to CA-24 before install, or the system sold has no certificate. Also missing before submission: install photos and the owner's signature.",
      },
    },
    { title: "Install permits closed out", phase: "Install", label: "Permit final", doc: "Install jobs · city and county permit portals", tag: "LOG",
      checks: ["Every install job in ServiceTitan", "Permit status from the portals", "Permits with no final inspection", "Inspection request drafted", "Customer scheduling message drafted"], approver: "Install coordinator",
      view: {
        kind: "calendar", title: "Open install permits · city and county portals", meta: "Example · as of Wed, Nov 18, 2026 · ServiceTitan install jobs", stamp: "Final inspections",
        from: "Install jobs with no final inspection on the portal",
        events: [
          { month: "Nov", day: "18", weekday: "Wed", label: "Maple Court Unit 12, final inspection", basis: "Mechanical permit M-26-1472, installed Tue, Nov 17", status: "Request and tenant message drafted" },
          { month: "Nov", day: "18", weekday: "Wed", label: "23 install permits from 2025, final never called", basis: "Portal status against install jobs", status: "Listed for the coordinator", flag: true },
          { month: "Dec", day: "1", weekday: "Tue", label: "Permit M-25-0612 expires · Hollis residence", basis: "180 days after the last approved inspection, Thu, Jun 4, 2026 (county portal)", status: "Inspection request drafted", flag: true },
          { month: "Dec", day: "14", weekday: "Mon", label: "Permit M-25-0877 expires · Pruitt residence", basis: "180 days after the last approved inspection, Wed, Jun 17, 2026 (city portal)", status: "Inspection request drafted", flag: true },
        ],
      },
    },
    { title: "Warranty registrations and parts claims filed on time", phase: "Install", label: "Warranty and claims", doc: "Install serials · distributor parts claims", tag: "DOC",
      checks: ["Install jobs and serial numbers", "Manufacturer registrations drafted within the window", "Warranty parts used on service calls", "Claims not yet filed with the distributor"], approver: "Office manager",
      view: {
        kind: "recon", title: "Warranty parts against distributor claims · Oct and Nov 2026", meta: "Example · service calls against claims filed with Northfork Supply", stamp: "Claims",
        sides: ["Warranty parts used", "Claims filed"],
        rows: [
          { ref: "Job 50391", label: "Igniter IG-3417 · Maple Court Unit 12 callback", cells: ["48.60", "48.60"] },
          { ref: "6 jobs", label: "Igniter IG-3417 · the other October callbacks, 6 x 48.60", cells: ["291.60", "291.60"] },
          { ref: "Job 50456", label: "Inducer motor · Pruitt residence", cells: ["212.40", "212.40"] },
          { ref: "Job 50471", label: "Compressor, swapped under warranty · Delgado residence · S/N 2509K41772", cells: ["1,186.00", ""], flag: true },
        ],
        totals: ["1,738.60", "552.60"],
        diff: { k: "Warranty credit not claimed", v: "1,186.00", flag: true },
      },
    },
    { title: "Supplier invoices matched to job POs", phase: "Bill", label: "Supplier bills", doc: "Supplier invoice · ServiceTitan PO and QuickBooks", tag: "PDF",
      checks: ["Every supplier invoice and statement", "Matched to the PO and job", "Quantity and price against the quote", "Bill prepared in QuickBooks, job coded"], approver: "Bookkeeper",
      view: {
        kind: "compare", title: "Supplier invoices · Job 50502, Maple Court Unit 12 changeout", meta: "Example · Northfork Supply invoices against the job PO", stamp: "Hold",
        panes: [
          { name: "Job PO", ref: "PO 7731 · Nov 9", lines: [{ k: "HP-24 heat pump", v: "1 x 3,420.00 = 3,420.00" }, { k: "CA-24 coil", v: "1 x 640.00 = 640.00" }, { k: "GF-60 furnace", v: "1 x 1,180.00 = 1,180.00" }, { k: "Line set 3/8 x 3/4, 25 ft", v: "1 x 186.00 = 186.00" }, { k: "Pad and fittings", v: "1 lot = 148.00" }, { k: "PO total", v: "5,574.00" }] },
          { name: "Invoice 228104", ref: "Mon, Nov 16", lines: [{ k: "HP-24 heat pump", v: "1 x 3,420.00 = 3,420.00" }, { k: "CA-24 coil", v: "1 x 640.00 = 640.00" }, { k: "GF-60 furnace", v: "1 x 1,180.00 = 1,180.00" }, { k: "Line set 3/8 x 3/4, 25 ft", v: "1 x 186.00 = 186.00", flag: true }, { k: "Invoice total", v: "5,426.00" }] },
          { name: "Invoice 228311", ref: "Fri, Nov 20", lines: [{ k: "Line set 3/8 x 3/4, 25 ft", v: "1 x 186.00 = 186.00", flag: true }, { k: "Pad and fittings", v: "1 lot = 148.00" }, { k: "Invoice total", v: "334.00" }] },
        ],
        foot: "Invoices total 5,760.00 against the PO's 5,574.00. The 186.00 difference is the second line set: the PO and the job used one. Bill prepared in QuickBooks, coded to job 50502, with the second line set held.",
      },
    },
  ],
};
