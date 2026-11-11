import type { Walk } from "./types";

// Manufacturing (job shop): one job from the RFQ to the shipped part and the cost review.
// Heat-lot traceability and quoted-versus-actual are reviews that come up after the job ships.
// Views follow one customer PO for a defense program: Talon Peak Systems PO TP-55012, 50 housings
// 4410-200 (17-4 PH, H1025, passivate; job 26-1184) and 50 covers 4410-210 (7075-T651, black
// anodize; job 26-1185), quoted on Q-2611, promise date Fri, Nov 20, 2026.
export const manufacturing: Walk = {
  sectionLabel: "Follow one job",
  h2: ["From the RFQ to the shipped part.", "The agent checks the paperwork, a person makes the call."],
  demoTitle: "One job, RFQ to shipment",
  demoSub: "Ten points where an agent reads the paperwork and a person signs off",
  replay: "Replay from the RFQ",
  railLabel: "Stages of the job",
  closed: "Job shipped and costed.",
  stages: [
    { title: "RFQ package read before quoting", phase: "Quote", label: "RFQ review", doc: "RFQ package · email, drawings and specs", tag: "PDF",
      checks: ["Material and quantities", "Tolerances and finishes", "Heat treat and inspection requirements", "Certification requirements", "Past jobs on similar parts from the ERP", "Quote worksheet drafted"], approver: "Estimator",
      view: {
        kind: "record", title: "RFQ 26-0907 · Talon Peak Systems", meta: "Example · RFQ email Tue, Sep 8, 2026, with drawings and specs", stamp: "Quote worksheet",
        id: "Housing 4410-200 rev B · Cover 4410-210 rev A",
        sections: [
          { name: "RFQ email", fields: [{ k: "Quantity", v: "50 housings, 50 covers" }, { k: "Requested ship", v: "Fri, Nov 13, 2026" }, { k: "Inspection", v: "Standard" }, { k: "Certs", v: "Material certs and CoC" }] },
          { name: "Drawings and specs", fields: [
            { k: "Housing", v: "17-4 PH bar, heat treat H1025" },
            { k: "Cover", v: "7075-T651 bar, anodize Type II, Class 2, black" },
            { k: "Tightest tolerance", v: "Housing bore Ø1.2500 ±.0010" },
            { k: "Housing note 6", v: "Passivate after heat treat", note: "Not in the RFQ email", flag: true },
            { k: "Note 9, both drawings", v: "Full first article report", note: "RFQ email says standard inspection", flag: true },
          ] },
        ],
        lines: [
          { code: "25-0932", text: "Housing 4410-200 rev A, 50 pcs · mill quoted 18.0 h", amount: "21.8 h actual" },
          { code: "26-0418", text: "Housing 4410-200 rev B, 50 pcs · mill quoted 18.0 h", amount: "22.5 h actual" },
          { code: "26-0611", text: "Cover 4410-210 rev A, 50 pcs · anodize outside", amount: "On budget" },
        ],
      },
    },
    { title: "Outside processing and material pricing", phase: "Quote", label: "Vendor pricing", doc: "Quote worksheet · vendor replies", tag: "MAIL",
      checks: ["Outside-process requests drafted", "Material requests drafted", "Vendor replies read as they arrive", "Cost and lead time filled in", "Source quote attached"], approver: "Estimator",
      view: {
        kind: "message", title: "Anodize reply into quote worksheet Q-2611", meta: "Example · cover 4410-210, 50 pcs", stamp: "Outside process",
        msg: {
          from: "Basin Finishing, quoting", to: "Estimating", date: "Thu, Sep 10, 2026", subject: "Re: quote request, cover 4410-210, 50 pcs, anodize Type II, Class 2, black",
          body: [
            { text: "Price: $6.40 per piece, $320.00 for the lot." },
            { text: "Lead time: 15 working days from receipt.", flag: true },
            { text: "Rack marks on the inside face unless the drawing says otherwise." },
          ],
        },
        reply: {
          name: "Quote worksheet Q-2611 · cover line", status: "Updated Sep 10 · source quotes attached",
          lines: [
            { k: "Anodize, Type II, Class 2, black", v: "$320.00 for 50 pcs" },
            { k: "Covers to anodize", v: "Fri, Oct 23" },
            { k: "Back from anodize", v: "Fri, Nov 13, after 15 working days" },
            { k: "Inspect, pack and certs", v: "1 week" },
            { k: "Earliest ship", v: "Fri, Nov 20: a week past the Nov 13 request", flag: true },
          ],
        },
      },
    },
    { title: "Customer PO checked against the quote", phase: "Order", label: "PO review", doc: "Customer PO · against the quote", tag: "PDF",
      checks: ["Price and quantity", "Drawing revision", "Delivery date and terms", "Job history in Epicor Kinetic or JobBOSS", "Sales order drafted with every difference"], approver: "Customer service rep",
      view: {
        kind: "compare", title: "Customer PO TP-55012 against quote Q-2611", meta: "Example · PO received Mon, Sep 28, 2026 · JobBOSS", stamp: "Sales order draft",
        panes: [
          { name: "Quote", ref: "Q-2611 · Sep 15", lines: [{ k: "Housing 4410-200", v: "Rev B", flag: true }, { k: "Cover 4410-210", v: "Rev A" }, { k: "Quantity", v: "50 and 50" }, { k: "Price", v: "$286.00 and $74.00 each" }, { k: "Ship", v: "Fri, Nov 20" }, { k: "Terms", v: "Net 30" }] },
          { name: "Customer PO", ref: "TP-55012 · Sep 28", lines: [{ k: "Housing 4410-200", v: "Rev C", flag: true }, { k: "Cover 4410-210", v: "Rev A" }, { k: "Quantity", v: "50 and 50" }, { k: "Price", v: "$286.00 and $74.00 each" }, { k: "Delivery", v: "Fri, Nov 20" }, { k: "Terms", v: "Net 30" }] },
        ],
        foot: "One difference: the PO calls out housing rev C; the quote was built on rev B. Rev C goes to engineering before the order is released.",
      },
    },
    { title: "Drawing revision compare", phase: "Order", label: "Revision compare", doc: "Drawing revisions · old against new", tag: "PDF",
      checks: ["The revision block", "Changed dimensions and tolerances", "Changed notes and material callouts", "Open jobs and routings on the old revision"], approver: "Manufacturing engineer",
      view: {
        kind: "redline", title: "Housing 4410-200 · rev C against rev D", meta: "Example · rev D received Mon, Oct 12, 2026", stamp: "Revision block",
        versions: ["Rev C", "Rev D"],
        clauses: [
          { ref: "Bore A", parts: [{ t: "Ø1.2500 " }, { t: "±.0010", op: "del" }, { t: "±.0005", op: "ins", flag: true }], note: "Routings and travelers built to rev C: jobs 26-1150, 26-1162 and 26-1184", flag: true },
          { ref: "Note 4", parts: [{ t: "Break sharp edges " }, { t: ".005 to .015", op: "del" }, { t: ".005 to .010", op: "ins" }, { t: "." }] },
          { ref: "Rev block", parts: [{ t: "Rev D: bore A tolerance and note 4 revised." }], note: "After sign-off, job 26-1184 re-released to rev D on Tue, Oct 13" },
        ],
      },
    },
    { title: "Customer flowdowns carried to supplier POs", phase: "Buy", label: "Supplier flowdowns", doc: "Supplier POs · customer quality clauses", tag: "DOC",
      checks: ["Customer PO terms", "Quality clauses", "Every material and outside-process PO on the job", "Each clause not flowed down"], approver: "Purchasing manager, then quality",
      view: {
        kind: "matrix", title: "Flowdowns · PO TP-55012 to supplier POs", meta: "Example · before the supplier POs are placed, Wed, Oct 14, 2026", stamp: "Not placed",
        corner: "Customer clause", cols: ["7702 · 17-4 PH bar", "7703 · heat treat", "7704 · passivate", "7705 · 7075 bar", "7706 · anodize"],
        rows: [
          { name: "DFARS specialty metals", cells: [{ v: "Missing", s: "flag" }, { v: "", s: "na" }, { v: "", s: "na" }, { v: "", s: "na" }, { v: "", s: "na" }] },
          { name: "Material certs with each shipment", cells: [{ v: "✓", s: "ok" }, { v: "", s: "na" }, { v: "", s: "na" }, { v: "✓", s: "ok" }, { v: "", s: "na" }] },
          { name: "Process certs with each lot", cells: [{ v: "", s: "na" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "", s: "na" }, { v: "✓", s: "ok" }] },
          { name: "Customer right of access", cells: [{ v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }] },
          { name: "Notice before a process or source change", cells: [{ v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }, { v: "✓", s: "ok" }] },
        ],
        notes: [
          { text: "PO 7702 for 17-4 PH bar has no DFARS specialty metals clause. Held until it is added.", flag: true },
        ],
      },
    },
    { title: "First article and PPAP paperwork", phase: "Make", label: "First article", doc: "AS9102 forms · ballooned drawing", tag: "PDF",
      checks: ["Characteristic numbers from the ballooning tool", "AS9102 forms or PPAP document list", "CMM values filled in where files exist"], approver: "Quality inspector",
      view: {
        kind: "form", title: "AS9102 Form 3 · cover 4410-210 rev A, first piece before anodize", meta: "Example · job 26-1185, Thu, Oct 22, 2026 · balloons from InspectionXpert", stamp: "Pre-anodize check",
        heads: ["Characteristic", "Drawing requirement", "Measured"],
        fields: [
          { label: "1 · Length", want: "4.000 ±.005", got: "4.002 (CMM)" },
          { label: "2 · Width", want: "2.500 ±.005", got: "2.499 (CMM)" },
          { label: "3 · Thickness", want: ".375 ±.003", got: "Not recorded", flag: true },
          { label: "4 · Hole pattern", want: "4X Ø.201 ±.003", got: "Ø.202, all four (CMM)" },
          { label: "5 · True position, 4 holes", want: "Ø.010 to datums A and B", got: "Not recorded", flag: true },
          { label: "6 · Flatness", want: ".002", got: "Not recorded", flag: true },
          { label: "7 · Edge break", want: ".005 to .015", got: ".008 (visual gauge)" },
        ],
        foot: "Dimensional check before anodize. CMM file loaded for characteristics 1, 2 and 4; characteristics 3, 5 and 6 have no measured value. The finished part is re-checked after anodize before the report is signed.",
      },
    },
    { title: "Late job early warning", phase: "Make", label: "Late job warning", doc: "Morning job status · ERP", tag: "LOG",
      checks: ["Job status and operations remaining", "Outside-process due dates", "Machine load", "Jobs that cannot make their promise date", "The operation holding each one up"], approver: "Production manager",
      view: {
        kind: "board", title: "Morning schedule · Thu, Nov 12, 2026", meta: "Example · job status, outside-process due dates and machine load", stamp: "Promise Nov 20",
        slots: ["Thu 12", "Fri 13", "Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20", "Mon 23", "Tue 24"],
        rows: [
          { name: "Heat treat", sub: "Outside, H1025", blocks: [{ start: 0, span: 4, label: "26-1184 housings · due back Tue 17", flag: true }] },
          { name: "Mill 3", sub: "Machine load", blocks: [{ start: 0, span: 2, label: "26-1201", tone: "soft" }, { start: 2, span: 2, label: "26-1209", tone: "soft" }, { start: 4, span: 1, label: "26-1184 finish bore" }, { start: 5, span: 2, label: "26-1209", tone: "soft" }] },
          { name: "Passivate", sub: "Outside", blocks: [{ start: 5, span: 2, label: "26-1184", tone: "soft" }] },
          { name: "Final inspection", blocks: [{ start: 1, span: 2, label: "26-1185 covers, from anodize", tone: "soft" }, { start: 7, span: 1, label: "26-1184", tone: "soft" }] },
          { name: "Shipping", blocks: [{ start: 6, span: 1, label: "Promise date · TP-55012" }, { start: 8, span: 1, label: "26-1184 ships", flag: true }] },
        ],
        foot: "Housings due back from heat treat Tue, Nov 17. Finish bore Wed 18, passivate Thu 19 and Fri 20, final inspection Mon 23: ship Tue, Nov 24, four days past the Nov 20 promise unless heat treat is expedited today.",
      },
    },
    { title: "Certificate packet per shipment", phase: "Ship", label: "Cert packet", doc: "Cert packet · MTRs, plating and heat treat certs", tag: "PDF",
      checks: ["PO and drawing requirements", "MTRs filed against the job", "Plating and heat treat certs", "Heat numbers, specs and material grade", "Certificate of conformance drafted"], approver: "Quality manager",
      view: {
        kind: "packet", title: "Cert packet · PO TP-55012 shipment", meta: "Example · jobs 26-1184 and 26-1185 · Tue, Nov 24, 2026", stamp: "CoC draft",
        sections: [
          { name: "Requirements", items: [{ ref: "PO TP-55012", text: "Material and process certs and a CoC with each shipment" }, { ref: "4410-210 rev A", text: "Material: 7075-T651" }] },
          { name: "Housing 4410-200 rev D · job 26-1184, re-released from rev C Oct 13", items: [{ ref: "MTR", text: "17-4 PH bar, heat 8H4471, DFARS compliant" }, { ref: "HT-2290", text: "Heat treat cert, H1025" }, { ref: "PV-1187", text: "Passivation cert" }] },
          { name: "Cover 4410-210 rev A · job 26-1185", items: [{ ref: "MTR", text: "Heat 77214: 6061-T6", flag: true }, { ref: "A-3318", text: "Anodize cert, black" }, { ref: "AS9102", text: "First article report, Oct 22" }] },
          { name: "Certificate of conformance", items: [{ ref: "CoC", text: "Drafted for both lines, held for the quality manager" }] },
        ],
      },
    },
    { title: "Heat-lot traceability from a bad lot", phase: "Ship", label: "Lot trace", doc: "Heat lot search · certs, travelers and shipping", tag: "LOG",
      checks: ["Mill certs and receiving records", "Travelers and shipping documents", "Every job, work order and shipment the lot touched", "Customers and ship dates"], approver: "Quality manager",
      view: {
        kind: "sheet", title: "Lot trace · heat 77214, bar from PO 7705", meta: "Example · searched Tue, Nov 24, 2026", stamp: "Hold",
        cols: ["Record", "Ref", "Job", "Customer", "Date", "Status"],
        rows: [
          { cells: ["Mill cert", "Heat 77214", "", "", "Oct 16", "6061-T6, ordered as 7075-T651"] },
          { cells: ["Receiving", "PO 7705, 12 bars", "", "", "Oct 19", "Into stock, rack B4"] },
          { cells: ["Traveler", "Cover 4410-210, 7 bars", "26-1185", "Talon Peak Systems", "Oct 20", "On hold, not shipped"] },
          { cells: ["Traveler", "Bracket 3920-040, 5 bars", "26-1170", "Westfork Avionics", "Oct 20", "Complete"] },
          { cells: ["Shipment", "Packing list 9921, 40 brackets", "26-1170", "Westfork Avionics", "Oct 30", "Shipped"], flag: true },
          { cells: ["Stock", "Rack B4", "", "", "Nov 24", "0 bars left"] },
        ],
      },
    },
    { title: "Quoted versus actual hours by job", phase: "Close", label: "Quoted vs actual", doc: "Closed jobs · quoted against actual", tag: "XLS",
      checks: ["Quoted hours and material", "Outside-process cost", "Actual labor and cost", "Part families that ran over", "The operation where the time went"], approver: "Owner and estimator",
      view: {
        kind: "bars", title: "Housing 4410-200 · quoted against actual mill hours", meta: "Example · weekly summary of closed jobs, week of Nov 30, 2026",
        bars: [
          { label: "Job 25-0932, 50 pcs", sub: "Quoted", value: 18.0, display: "18.0 h" },
          { label: "Job 25-0932, 50 pcs", sub: "Actual", value: 21.8, display: "21.8 h", flag: true },
          { label: "Job 26-0418, 50 pcs", sub: "Quoted", value: 18.0, display: "18.0 h" },
          { label: "Job 26-0418, 50 pcs", sub: "Actual", value: 22.5, display: "22.5 h", flag: true },
          { label: "Job 26-1184, 50 pcs", sub: "Quoted", value: 18.0, display: "18.0 h" },
          { label: "Job 26-1184, 50 pcs", sub: "Actual", value: 23.5, display: "23.5 h", flag: true },
        ],
        note: "Last three closed jobs on the part. Quoted at 0.36 h a piece on the mill; actual ran 0.44, 0.45 and 0.47. The extra time is in the finish bore operation.",
      },
    },
  ],
};
