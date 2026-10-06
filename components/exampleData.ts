// The order-entry example: something arrives, the agent reads it, drafts the work,
// and a person approves.
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

export const ORDER_EXAMPLE: Example = {
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
};
