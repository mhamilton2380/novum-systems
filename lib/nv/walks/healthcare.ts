import type { Walk } from "./types";

// Healthcare: one patient visit from the schedule through the claim to payment posted.
// Credentialing sits first (the provider must be enrolled with the payer before the patient is booked).
// Referral follow-up and the record release sit in the visit phase, where the visit creates them;
// the charge review closes the phase because it runs immediately before the claim is submitted.
export const healthcare: Walk = {
  sectionLabel: "Follow one visit",
  h2: ["From the schedule to payment posted.", "The agent reads the chart and the claim, your staff decide."],
  demoTitle: "One patient visit, schedule to payment posted",
  demoSub: "Ten points where an agent reads the paperwork and a person signs off",
  replay: "Replay from the schedule",
  railLabel: "Stages of the visit",
  closed: "Claim paid and posted.",
  stages: [
    { title: "Credentialing packets and expirations tracked", phase: "Schedule", label: "Provider enrollment", doc: "Provider file · licenses, DEA and CAQH ProView", tag: "PDF",
      checks: ["Licenses, DEA and board certificates", "Malpractice face sheets", "CAQH ProView status", "Expiration and re-attestation dates", "Enrollment or revalidation packet drafted"], approver: "Credentialing coordinator" },
    { title: "Eligibility checked against tomorrow's schedule", phase: "Schedule", label: "Eligibility", doc: "Tomorrow's schedule · 271 response from Availity", tag: "LOG",
      checks: ["Insurance on file against the 271", "Active coverage and plan change", "Copay and deductible left", "Referral needed for the visit type"], approver: "Front desk lead" },
    { title: "Prior auth packet built from the chart", phase: "Authorize", label: "Prior auth packet", doc: "Payer medical policy · chart notes and imaging", tag: "PDF",
      checks: ["Payer's published medical policy", "Matching chart notes and imaging reports", "Medication history", "Each criterion mapped to its page", "Criteria the chart does not yet show"], approver: "Prior auth coordinator, with the ordering clinician" },
    { title: "Auth dates matched to the schedule", phase: "Authorize", label: "Auth dates", doc: "Approval letter · against the schedule", tag: "PDF",
      checks: ["Authorized CPT codes and units", "Date range", "Servicing location", "Each scheduled visit and procedure"], approver: "Prior auth coordinator" },
    { title: "Referral loop closure", phase: "Visit", label: "Referral follow-up", doc: "Open referral and imaging orders · EHR", tag: "LOG",
      checks: ["Open referral and imaging orders", "Scheduled appointment or returned result", "Orders past the set window", "Follow-up drafted for the care team"], approver: "Clinician's care team" },
    { title: "Record releases checked against the authorization", phase: "Visit", label: "Record release", doc: "Record request · signed authorization", tag: "DOC",
      checks: ["Authorization scope, recipient and expiry", "Valid right-of-access request", "Minimum necessary for payment and operations", "Every release logged"], approver: "Privacy officer or practice manager" },
    { title: "Charges checked against the note before submission", phase: "Visit", label: "Charge review", doc: "Signed visit note · charge lines", tag: "DOC",
      checks: ["Each ICD-10 code against its CPT", "Modifiers 25, 59 and X documented", "NCCI edits and payer rules", "Coder question queued"], approver: "Certified coder" },
    { title: "Timely filing deadlines tracked per payer", phase: "Claim", label: "Filing deadlines", doc: "Clearinghouse rejection report · open A/R", tag: "XLS",
      checks: ["Clearinghouse rejection reports", "Open A/R", "Each payer's filing and appeal window", "Claims listed by days left", "Reason each claim is stuck"], approver: "Billing manager" },
    { title: "Denials matched to the payer's actual rule", phase: "Claim", label: "Denials", doc: "ERA denial · CARC and RARC codes", tag: "PDF",
      checks: ["CARC and RARC codes", "The claim and the visit note", "Payer policy or contract clause", "Fix and resubmit, appeal, or write off", "Appeal letter quoting the policy"], approver: "Denials specialist, with the provider" },
    { title: "ERA posting reconciled to the contract", phase: "Post", label: "Payment posting", doc: "835 ERA · against contracted rates", tag: "XLS",
      checks: ["Every paid line", "Contracted rate by CPT, payer and place of service", "Lines paid below contract", "CARC and RARC codes used"], approver: "Billing manager" },
  ],
};
