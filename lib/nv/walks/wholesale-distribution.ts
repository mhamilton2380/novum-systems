import type { Walk } from "./types";

// Wholesale distribution: one contractor order from the material list to cash collected and the
// vendor claim filed. The vendor price file opens the walk because cost sets the sell price; rebate
// claims and the buying-pattern report are recurring reviews, placed where they touch this order.
export const wholesaleDistribution: Walk = {
  sectionLabel: "Follow one order",
  h2: ["From the material list to cash collected.", "An agent checks each document, a person releases it."],
  demoTitle: "One order, material list to cash collected",
  demoSub: "Ten points where an agent reads the paperwork and a person signs off",
  replay: "Replay from the material list",
  railLabel: "Stages of the order",
  closed: "Order paid and the vendor claim filed.",
  stages: [
    { title: "Vendor price file updates", phase: "Quote", label: "Vendor price file", doc: "Vendor price file · current cost in the ERP", tag: "XLS",
      checks: ["Each item against current cost in the ERP", "Contract prices below target margin", "Cost updates staged"], approver: "Purchasing manager, then the sales manager" },
    { title: "Quote from a contractor's material list", phase: "Quote", label: "Quote", doc: "Contractor material list · catalog and branch stock", tag: "PDF",
      checks: ["Each line matched to your catalog", "Approved alternates", "Stock by branch", "Lead times", "Items it could not match called out"], approver: "Sales rep" },
    { title: "Emailed POs keyed into orders", phase: "Order", label: "Order entry", doc: "Customer PO email · new sales order", tag: "MAIL",
      checks: ["PO email and attachment", "Their part numbers mapped to your item numbers", "Sales order built in Prophet 21 or NetSuite", "Price against the contract", "Unit of measure and ship-to"], approver: "Inside sales rep" },
    { title: "Vendor acknowledgement check", phase: "Buy", label: "Vendor acknowledgement", doc: "Vendor acknowledgement · EDI 855", tag: "DOC",
      checks: ["Price against the open PO", "Quantity against the open PO", "Promise date", "Mismatch list for the buyer"], approver: "Buyer" },
    { title: "ASN and receiving mismatches", phase: "Receive", label: "Receiving", doc: "EDI 856 and packing list · PO receipt", tag: "LOG",
      checks: ["Vendor's EDI 856 or packing list", "The PO", "The receipt in the ERP", "Shortage or overage note drafted with line detail"], approver: "Receiving lead, then the buyer" },
    { title: "Three-way match on vendor invoices", phase: "Receive", label: "Three-way match", doc: "Vendor invoice · PO and receipt", tag: "PDF",
      checks: ["Invoice against the PO and the receipt", "Price and quantity", "Freight against terms", "Anything off held with the reason written out"], approver: "AP clerk" },
    { title: "Returns and RMA requests", phase: "Settle", label: "Returns", doc: "Return request · photos and invoice", tag: "MAIL",
      checks: ["Request and photos", "The invoice", "Your return policy", "The vendor's return terms", "RMA drafted with the restock fee", "Whether it goes back to the vendor for credit"], approver: "Customer service manager" },
    { title: "Deductions and short pays", phase: "Settle", label: "Short pays", doc: "Remittance advice · customer emails", tag: "DOC",
      checks: ["Each deduction matched to invoices", "Credits and returns", "Contract terms", "Credit memo or dispute letter drafted with backup"], approver: "AR manager" },
    { title: "Vendor rebates and ship-and-debit claims", phase: "Settle", label: "Ship-and-debit claims", doc: "Ship-and-debit claim · agreement and invoice support", tag: "XLS",
      checks: ["Vendor rebate programs", "Ship-and-debit agreements", "Sales and purchase history", "Amounts owed against amounts filed", "Each claim drafted with invoice support"], approver: "Purchasing manager" },
    { title: "Customers quietly buying less", phase: "Review", label: "Buying less", doc: "Weekly order history · ERP", tag: "XLS",
      checks: ["Order history by customer", "By product line and branch", "Accounts buying less than their usual pattern", "Product lines they stopped ordering"], approver: "Sales manager" },
  ],
};
