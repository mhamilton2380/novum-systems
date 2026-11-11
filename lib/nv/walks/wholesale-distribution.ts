import type { Walk } from "./types";

// Wholesale distribution: one contractor order from the vendor price file to cash collected and the
// vendor claim filed. The vendor price file opens the walk because cost sets the sell price; rebate
// claims and the buying-pattern report are recurring reviews, placed where they touch this order.
// Views follow one electrical distributor and one customer: Kestrel Electric, quote Q-60418, customer
// PO 7719, sales order 88412, invoice 90233 ($6,114.00, Dec 4, 2026), wire restocked on PO 31877
// (Granite Wire). PO 31902 (Tamarack Fittings) is a separate couplings receipt the same week.
export const wholesaleDistribution: Walk = {
  sectionLabel: "Follow one order",
  h2: ["From the vendor price file to cash collected.", "An agent checks each document, a person releases it."],
  demoTitle: "One order, vendor price file to cash collected",
  demoSub: "Ten points where an agent reads the paperwork and a person signs off",
  replay: "Replay from the price file",
  railLabel: "Stages of the order",
  closed: "Order paid and the vendor claim filed.",
  stages: [
    { title: "Vendor price file updates", phase: "Quote", label: "Vendor price file", doc: "Vendor price file · current cost in the ERP", tag: "XLS",
      checks: ["Each item against current cost in the ERP", "Contract prices below target margin", "Cost updates staged"], approver: "Purchasing manager, then the sales manager",
      view: {
        kind: "compare", title: "Granite Wire price file · effective Tue, Dec 1, 2026", meta: "Example · received Nov 9 · per 1,000 ft", stamp: "Cost update staged",
        panes: [
          { name: "Cost in the ERP today", ref: "Current", lines: [{ k: "THHN 12 solid", v: "152.00" }, { k: "THHN 12 stranded", v: "156.00" }, { k: "THHN 10 stranded", v: "240.00" }, { k: "MC 12/2", v: "616.00" }, { k: "MC 12/3", v: "864.00" }] },
          { name: "New cost", ref: "From Dec 1", lines: [{ k: "THHN 12 solid", v: "171.00" }, { k: "THHN 12 stranded", v: "175.50" }, { k: "THHN 10 stranded", v: "270.00" }, { k: "MC 12/2", v: "693.00" }, { k: "MC 12/3", v: "972.00" }] },
          { name: "Contract sell price", ref: "Kestrel Electric", lines: [{ k: "THHN 12 solid", v: "166.00", flag: true }, { k: "THHN 12 stranded", v: "181.00" }, { k: "THHN 10 stranded", v: "262.00", flag: true }, { k: "MC 12/2", v: "688.00", flag: true }, { k: "MC 12/3", v: "1,040.00" }] },
        ],
        foot: "From Dec 1, 12 contract items sell below the new cost across four customer contracts. Three are on Kestrel Electric's contract.",
      },
    },
    { title: "Quote from a contractor's material list", phase: "Quote", label: "Quote", doc: "Contractor material list · catalog and branch stock", tag: "PDF",
      checks: ["Each line matched to your catalog", "Approved alternates", "Stock by branch", "Lead times", "Items it could not match called out"], approver: "Sales rep",
      view: {
        kind: "sheet", title: "Quote Q-60418 · Kestrel Electric, Fairview tenant improvement", meta: "Example · material list matched Thu, Nov 12, 2026", stamp: "Draft quote",
        cols: ["Material list", "Qty", "Your item", "Portland", "Salem", "Lead time"], num: [3, 4],
        rows: [
          { cells: ["THHN 12 stranded, black", "5,000 ft", "THHN12S-BK", "18,500 ft", "6,000 ft", "Stock"] },
          { cells: ["MC 12/2", "2,500 ft", "MC122", "3,750 ft", "1,250 ft", "Stock"] },
          { cells: ["EMT 3/4 in.", "1,000 ft", "EMT075", "4,200 ft", "1,800 ft", "Stock"] },
          { cells: ["EMT set screw connector 3/4 in.", "40 cases", "CN-SS-075", "46 cases", "12 cases", "Stock"] },
          { cells: ["Load center, 200 A, 40-space, brand named in spec", "1", "Not carried", "", "", ""], flag: true },
          { cells: ["Approved equal: load center, 200 A, 40-space", "1", "LC-200-40", "4", "1", "Stock"], note: "Suggested in place of the spec brand" },
        ],
      },
    },
    { title: "Emailed POs keyed into orders", phase: "Order", label: "Order entry", doc: "Customer PO email · new sales order", tag: "MAIL",
      checks: ["PO email and attachment", "Their part numbers mapped to your item numbers", "Sales order built in Prophet 21 or NetSuite", "Price against the contract", "Unit of measure and ship-to"], approver: "Inside sales rep",
      view: {
        kind: "message", title: "Customer PO 7719 to sales order 88412", meta: "Example · Kestrel Electric · Prophet 21", stamp: "Held",
        msg: {
          from: "Kestrel Electric, purchasing", to: "Inside sales", date: "Mon, Nov 16, 2026", subject: "PO 7719 · Fairview TI · per quote Q-60418",
          body: [
            { text: "Please ship the attached PO to the Fairview jobsite, need by Fri, Dec 4." },
            { text: "Lines 1 to 3: THHN 12 stranded, MC 12/2 and EMT 3/4 in., per quote Q-60418." },
            { text: "Line 4: EMT set screw connector 3/4 in., 40 CS at $0.58.", flag: true },
            { text: "Line 5: load center LC-200-40, 1 EA at $389.00." },
          ],
        },
        reply: {
          name: "Sales order 88412", status: "Draft · held for the inside sales rep",
          lines: [
            { k: "Ship-to", v: "Fairview jobsite, on the contract ship-to list" },
            { k: "Lines 1 to 3", v: "$905.00 + $1,720.00 + $780.00 = $3,405.00 at contract" },
            { k: "Line 4 as sent", v: "40 CS at $0.58 = $23.20", flag: true },
            { k: "Line 4 at contract", v: "40 CS at $58.00 per case of 100 = $2,320.00" },
            { k: "Line 5", v: "1 EA at $389.00" },
            { k: "Order total at contract", v: "$6,114.00" },
          ],
        },
      },
    },
    { title: "Vendor acknowledgement check", phase: "Buy", label: "Vendor acknowledgement", doc: "Vendor acknowledgement · EDI 855", tag: "DOC",
      checks: ["Price against the open PO", "Quantity against the open PO", "Promise date", "Mismatch list for the buyer"], approver: "Buyer",
      view: {
        kind: "form", title: "Acknowledgement · Granite Wire · PO 31877, line 1", meta: "Example · EDI 855 received Wed, Nov 18, 2026", stamp: "EDI 855",
        heads: ["Line 1, THHN 12 stranded", "Your PO 31877", "Acknowledgement"],
        fields: [
          { label: "Quantity", want: "20,000 ft", got: "20,000 ft" },
          { label: "Unit price, per 1,000 ft", want: "175.50, Dec 1 price file", got: "186.03", flag: true },
          { label: "Extended", want: "3,510.00", got: "3,720.60", flag: true },
          { label: "Price change agreed by the buyer", want: "Required", got: "None on file" },
          { label: "Promise date", want: "Thu, Dec 3", got: "Thu, Dec 3" },
          { label: "Freight", want: "Prepaid, order over the $2,500 minimum", got: "Prepaid" },
        ],
        foot: "Line 1 is acknowledged 6% over the PO price. Listed for the buyer to accept or dispute.",
      },
    },
    { title: "ASN and receiving mismatches", phase: "Receive", label: "Receiving", doc: "EDI 856 and packing list · PO receipt", tag: "LOG",
      checks: ["Vendor's EDI 856 or packing list", "The PO", "The receipt in the ERP", "Shortage or overage note drafted with line detail"], approver: "Receiving lead, then the buyer",
      view: {
        kind: "compare", title: "Receiving · Tamarack Fittings · PO 31902, couplings", meta: "Example · one pallet, received Thu, Dec 3, 2026", stamp: "Shortage",
        panes: [
          { name: "Your PO 31902", ref: "Tue, Nov 17", lines: [{ k: "Item", v: "CP-SS-075, set screw coupling 3/4 in." }, { k: "Cartons", v: "60" }, { k: "Each per carton", v: "50" }] },
          { name: "ASN and invoice", ref: "EDI 856, Dec 2", lines: [{ k: "Item", v: "CP-SS-075, set screw coupling 3/4 in." }, { k: "Cartons shipped", v: "60", flag: true }, { k: "Cartons billed", v: "60", flag: true }] },
          { name: "Receiving count", ref: "Dock 2, Dec 3", lines: [{ k: "Item", v: "CP-SS-075, set screw coupling 3/4 in." }, { k: "Cartons counted", v: "54", flag: true }, { k: "Pallet wrap", v: "Intact" }] },
        ],
        foot: "Shortage note drafted to Tamarack Fittings: 6 cartons short on PO 31902 line 1, shipped and billed as 60. Receiving lead confirms the count; the buyer sends the claim.",
      },
    },
    { title: "Three-way match on vendor invoices", phase: "Receive", label: "Three-way match", doc: "Vendor invoice · PO and receipt", tag: "PDF",
      checks: ["Invoice against the PO and the receipt", "Price and quantity", "Freight against terms", "Anything off held with the reason written out"], approver: "AP clerk",
      view: {
        kind: "recon", title: "Three-way match · Granite Wire invoice GW-40877", meta: "Example · PO 31877, received Dec 3, invoiced Fri, Dec 4, 2026", stamp: "Hold",
        sides: ["PO 31877", "Receipt", "Invoice"],
        rows: [
          { ref: "Line 1", label: "THHN 12 stranded, 20,000 ft at 175.50: acknowledgement dispute settled at the PO price", cells: ["3,510.00", "3,510.00", "3,510.00"] },
          { ref: "Line 2", label: "THHN 10 stranded, 10,000 ft at 270.00", cells: ["2,700.00", "2,700.00", "2,700.00"] },
          { ref: "Line 3", label: "MC 12/2, 5,000 ft at 693.00", cells: ["3,465.00", "3,465.00", "3,465.00"] },
          { ref: "Freight", label: "Prepaid: order over the $2,500 minimum", cells: ["", "", "240.00"], flag: true },
        ],
        totals: ["9,675.00", "9,675.00", "9,915.00"],
        diff: { k: "Held: freight billed on a prepaid order", v: "240.00", flag: true },
      },
    },
    { title: "Returns and RMA requests", phase: "Settle", label: "Returns", doc: "Return request · photos and invoice", tag: "MAIL",
      checks: ["Request and photos", "The invoice", "Your return policy", "The vendor's return terms", "RMA drafted with the restock fee", "Whether it goes back to the vendor for credit"], approver: "Customer service manager",
      view: {
        kind: "message", title: "Return request to RMA 5120", meta: "Example · Kestrel Electric · invoice 90233", stamp: "RMA draft",
        msg: {
          from: "Kestrel Electric, project manager", to: "Customer service", date: "Wed, Dec 16, 2026", subject: "Return · load center on invoice 90233",
          body: [
            { text: "The Fairview owner changed the panel spec. We did not install the LC-200-40." },
            { text: "Still in the box, photos attached. Please credit invoice 90233." },
          ],
        },
        reply: {
          name: "RMA 5120", status: "Draft · Dec 16, 2026",
          lines: [
            { k: "Invoice", v: "90233, Dec 4, 1 EA at $389.00" },
            { k: "Your policy", v: "30 days from invoice, 15% restock: inside the window" },
            { k: "Restock fee", v: "$58.35" },
            { k: "Credit to Kestrel", v: "$330.65, credit memo 90561 on approval" },
            { k: "Vendor return terms", v: "30 days from your purchase on Nov 2: closed Dec 2", flag: true },
            { k: "Back to the vendor for credit", v: "No: into stock" },
          ],
        },
      },
    },
    { title: "Deductions and short pays", phase: "Settle", label: "Short pays", doc: "Remittance advice · customer emails", tag: "DOC",
      checks: ["Each deduction matched to invoices", "Credits and returns", "Contract terms", "Credit memo or dispute letter drafted with backup"], approver: "AR manager",
      view: {
        kind: "sheet", title: "Remittance · Kestrel Electric · check 20931", meta: "Example · received Wed, Jan 13, 2027 · terms 2% 10, net 30", stamp: "Short pay",
        cols: ["Invoice or credit", "Dated", "Amount", "Paid", "Deducted", "Matched to"], num: [2, 3, 4],
        rows: [
          { cells: ["Invoice 90011", "Nov 20, 2026", "4,180.00", "4,180.00", "0.00", "Paid in full"] },
          { cells: ["Invoice 90233", "Dec 4, 2026", "6,114.00", "5,991.72", "122.28", "2% early-pay discount"], flag: true, flagCells: [4] },
          { cells: ["Invoice 90388", "Dec 11, 2026", "2,615.40", "2,615.40", "0.00", "Paid in full"] },
          { cells: ["Credit memo 90561", "Dec 17, 2026", "-330.65", "-330.65", "0.00", "RMA 5120, load center"] },
        ],
        total: ["Check 20931", "", "12,578.75", "12,456.47", "122.28", ""],
        foot: [
          { k: "Discount window on invoice 90233 closed", v: "Dec 14, 2026" },
          { k: "Paid", v: "Jan 13, 2027: 40 days after the invoice", flag: true },
          { k: "Dispute letter drafted with the invoice and terms", v: "122.28" },
        ],
      },
    },
    { title: "Vendor rebates and ship-and-debit claims", phase: "Settle", label: "Ship-and-debit claims", doc: "Ship-and-debit claim · agreement and invoice support", tag: "XLS",
      checks: ["Vendor rebate programs", "Ship-and-debit agreements", "Sales and purchase history", "Amounts owed against amounts filed", "Each claim drafted with invoice support"], approver: "Purchasing manager",
      view: {
        kind: "calendar", title: "Ship-and-debit claims · Granite Wire agreement SD-118", meta: "Example · as of Mon, Feb 15, 2027", stamp: "Claim draft",
        from: "Claims due within 60 days of quarter end, per the agreement",
        events: [
          { month: "Oct", day: "15", weekday: "Thu", label: "Q3 2026 claim filed", basis: "41 invoices, Jul to Sep", status: "Credited by the vendor" },
          { month: "Dec", day: "31", weekday: "Thu", label: "Q4 2026 ends", basis: "Agreement SD-118", status: "Quarter closed" },
          { month: "Feb", day: "15", weekday: "Mon", label: "Q4 claim not filed", basis: "38 invoices, including Kestrel Electric invoice 90233 (MC 12/2)", status: "Claim drafted with invoice support", flag: true },
          { month: "Mar", day: "1", weekday: "Mon", label: "Q4 filing window closes", basis: "60 days after Dec 31, 2026", status: "Two weeks left", flag: true },
        ],
      },
    },
    { title: "Customers quietly buying less", phase: "Review", label: "Buying less", doc: "Weekly order history · ERP", tag: "XLS",
      checks: ["Order history by customer", "By product line and branch", "Accounts buying less than their usual pattern", "Product lines they stopped ordering"], approver: "Sales manager",
      view: {
        kind: "bars", title: "Kestrel Electric · purchases by product line", meta: "Example · weekly report, week of Apr 19, 2027 · Portland branch",
        bars: [
          { label: "Wire", sub: "Per month, prior 12 months", value: 9800, display: "$9,800" },
          { label: "Wire", sub: "Per month, last 3 months", value: 0, display: "$0", flag: true },
          { label: "Conduit", sub: "Per month, prior 12 months", value: 3100, display: "$3,100" },
          { label: "Conduit", sub: "Per month, last 3 months", value: 0, display: "$0", flag: true },
          { label: "Fittings", sub: "Per month, prior 12 months", value: 2200, display: "$2,200" },
          { label: "Fittings", sub: "Per month, last 3 months", value: 2050, display: "$2,050" },
        ],
        note: "No wire or conduit orders from Kestrel Electric since mid-January. Fittings are steady.",
      },
    },
  ],
};
