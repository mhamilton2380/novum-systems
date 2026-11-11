import type { Walk } from "./types";

// Manufacturing (job shop): one job from the RFQ to the shipped part and the cost review.
// Heat-lot traceability and quoted-versus-actual are reviews that come up after the job ships.
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
      checks: ["Material and quantities", "Tolerances and finishes", "Heat treat and inspection requirements", "Certification requirements", "Past jobs on similar parts from the ERP", "Quote worksheet drafted"], approver: "Estimator" },
    { title: "Outside processing and material pricing", phase: "Quote", label: "Vendor pricing", doc: "Quote worksheet · vendor replies", tag: "MAIL",
      checks: ["Outside-process requests drafted", "Material requests drafted", "Vendor replies read as they arrive", "Cost and lead time filled in", "Source quote attached"], approver: "Estimator" },
    { title: "Customer PO checked against the quote", phase: "Order", label: "PO review", doc: "Customer PO · against the quote", tag: "PDF",
      checks: ["Price and quantity", "Drawing revision", "Delivery date and terms", "Job history in Epicor Kinetic or JobBOSS", "Sales order drafted with every difference"], approver: "Customer service rep" },
    { title: "Drawing revision compare", phase: "Order", label: "Revision compare", doc: "Drawing revisions · old against new", tag: "PDF",
      checks: ["The revision block", "Changed dimensions and tolerances", "Changed notes and material callouts", "Open jobs and routings on the old revision"], approver: "Manufacturing engineer" },
    { title: "Customer flowdowns carried to supplier POs", phase: "Buy", label: "Supplier flowdowns", doc: "Supplier POs · customer quality clauses", tag: "DOC",
      checks: ["Customer PO terms", "Quality clauses", "Every material and outside-process PO on the job", "Each clause not flowed down"], approver: "Purchasing manager, then quality" },
    { title: "First article and PPAP paperwork", phase: "Make", label: "First article", doc: "AS9102 forms · ballooned drawing", tag: "PDF",
      checks: ["Characteristic numbers from the ballooning tool", "AS9102 forms or PPAP document list", "CMM values filled in where files exist"], approver: "Quality inspector" },
    { title: "Late job early warning", phase: "Make", label: "Late job warning", doc: "Morning job status · ERP", tag: "LOG",
      checks: ["Job status and operations remaining", "Outside-process due dates", "Machine load", "Jobs that cannot make their promise date", "The operation holding each one up"], approver: "Production manager" },
    { title: "Certificate packet per shipment", phase: "Ship", label: "Cert packet", doc: "Cert packet · MTRs, plating and heat treat certs", tag: "PDF",
      checks: ["PO and drawing requirements", "MTRs filed against the job", "Plating and heat treat certs", "Heat numbers, specs and material grade", "Certificate of conformance drafted"], approver: "Quality manager" },
    { title: "Heat-lot traceability from a bad lot", phase: "Ship", label: "Lot trace", doc: "Heat lot search · certs, travelers and shipping", tag: "LOG",
      checks: ["Mill certs and receiving records", "Travelers and shipping documents", "Every job, work order and shipment the lot touched", "Customers and ship dates"], approver: "Quality manager" },
    { title: "Quoted versus actual hours by job", phase: "Close", label: "Quoted vs actual", doc: "Closed jobs · quoted against actual", tag: "XLS",
      checks: ["Quoted hours and material", "Outside-process cost", "Actual labor and cost", "Part families that ran over", "The operation where the time went"], approver: "Owner and estimator" },
  ],
};
