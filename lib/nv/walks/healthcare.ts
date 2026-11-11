import type { Walk } from "./types";

// Healthcare: one patient visit from the schedule through the claim to payment posted.
// Credentialing sits first (the provider must be enrolled with the payer before the patient is booked).
// Referral follow-up and the record release sit in the visit phase, where the visit creates them;
// the charge review closes the phase because it runs immediately before the claim is submitted.
// Views follow one fictional orthopedic practice and one fictional patient (77-0142) on one fictional
// Medicare Advantage plan (Kettleby Advantage HMO), Jan to Mar 2027. Patient IDs are invented.
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
      checks: ["Licenses, DEA and board certificates", "Malpractice face sheets", "CAQH ProView status", "Expiration and re-attestation dates", "Enrollment or revalidation packet drafted"], approver: "Credentialing coordinator",
      view: {
        kind: "matrix", title: "Provider enrollment · week of Jan 4, 2027", meta: "Example · orthopedic practice, 3 providers", stamp: "CAQH ProView",
        corner: "Provider", cols: ["License and DEA", "Malpractice", "CAQH", "Medicare", "Kettleby Advantage", "Velandra Health"],
        rows: [
          { name: "Dr. M. Reyes", sub: "Orthopedic surgery", cells: [{ v: "Current", s: "ok" }, { v: "To Jul 2027", s: "ok" }, { v: "Attested Nov 19", s: "ok" }, { v: "Enrolled", s: "ok" }, { v: "Enrolled", s: "ok" }, { v: "Revalidate Mar 2027", s: "ok" }] },
          { name: "Dr. S. Nakamura", sub: "New hire, started Jan 4", cells: [{ v: "Current", s: "ok" }, { v: "To Dec 2027", s: "ok" }, { v: "Attested Nov 12", s: "ok" }, { v: "Enrolled", s: "ok" }, { v: "Pending", s: "flag" }, { v: "Enrolled", s: "ok" }] },
          { name: "J. Pratt, PA-C", sub: "Physician assistant", cells: [{ v: "Current", s: "ok" }, { v: "To Jul 2027", s: "ok" }, { v: "Re-attest by Jan 15", s: "ok" }, { v: "Enrolled", s: "ok" }, { v: "Enrolled", s: "ok" }, { v: "Enrolled", s: "ok" }] },
        ],
        notes: [
          { text: "Dr. Nakamura is booked Tue Jan 5 with 2 Kettleby Advantage patients", flag: true },
          { text: "Kettleby Advantage packet sent Nov 20, 2026; no effective date yet" },
          { text: "Velandra Health revalidation packet for Dr. Reyes drafted, due in March" },
        ],
      },
    },
    { title: "Eligibility checked against tomorrow's schedule", phase: "Schedule", label: "Eligibility", doc: "Tomorrow's schedule · 271 response from Availity", tag: "LOG",
      checks: ["Insurance on file against the 271", "Active coverage and plan change", "Copay and deductible left", "Referral needed for the visit type"], approver: "Front desk lead",
      view: {
        kind: "board", title: "Tomorrow's schedule · Tue Jan 5, 2027", meta: "Example · 271 responses run Mon Jan 4, 3 pm", stamp: "Eligibility",
        slots: ["8", "9", "10", "11", "12"],
        rows: [
          { name: "Dr. M. Reyes", sub: "Orthopedics", blocks: [{ start: 0, span: 0.5, label: "77-0118 · Velandra · active" }, { start: 0.5, span: 0.5, label: "77-0142 · Medicare on file", flag: true }, { start: 1, span: 0.5, label: "77-0593 · Kettleby · moved from Dr. Nakamura", tone: "soft" }, { start: 1.5, span: 0.5, label: "77-0367 · Medicare · active" }] },
          { name: "Dr. S. Nakamura", sub: "New hire", blocks: [{ start: 0, span: 1, label: "77-0450 · Velandra · new patient" }, { start: 2, span: 0.5, label: "77-0612 · Medicare · active" }] },
          { name: "J. Pratt, PA-C", sub: "Physician assistant", blocks: [{ start: 0, span: 0.5, label: "77-0231 · Velandra · $1,240 deductible left" }, { start: 1, span: 0.5, label: "77-0388 · Medicare · active" }, { start: 2, span: 0.5, label: "77-0688 · Kettleby · moved from Dr. Nakamura", tone: "soft" }] },
        ],
        foot: "77-0142, 8:30: the 271 returns Kettleby Advantage HMO from Jan 1. Specialist visits need a referral; none on file.",
      },
    },
    { title: "Prior auth packet built from the chart", phase: "Authorize", label: "Prior auth packet", doc: "Payer medical policy · chart notes and imaging", tag: "PDF",
      checks: ["Payer's published medical policy", "Matching chart notes and imaging reports", "Medication history", "Each criterion mapped to its page", "Criteria the chart does not yet show"], approver: "Prior auth coordinator, with the ordering clinician",
      view: {
        kind: "form", title: "Prior auth · MRI right knee, CPT 73721", meta: "Example · patient 77-0142, Kettleby Advantage HMO, ordered Jan 5, 2027", stamp: "Portal draft",
        heads: ["Criterion", "Medical policy requires", "Chart shows"],
        fields: [
          { label: "Diagnosis", want: "Knee osteoarthritis or suspected internal derangement", got: "M17.11, right knee · note Jan 5, p. 2" },
          { label: "X-ray", want: "Weight-bearing X-ray within 6 months", got: "Dec 8, 2026 · imaging report, p. 4" },
          { label: "Conservative therapy", want: "6 weeks documented, PT or home exercise", got: "4 weeks: PT from Dec 8, 2026 to Jan 5, 2027", flag: true },
          { label: "Medication history", want: "NSAID trial or reason not used", got: "Naproxen since Dec 8 · note, p. 3" },
          { label: "Referral", want: "PCP referral on file (HMO)", got: "Referral R-2201, received Jan 5" },
        ],
        foot: "Dr. Reyes decides whether the patient meets criteria. Six weeks of PT is reached Jan 19.",
      },
    },
    { title: "Auth dates matched to the schedule", phase: "Authorize", label: "Auth dates", doc: "Approval letter · against the schedule", tag: "PDF",
      checks: ["Authorized CPT codes and units", "Date range", "Servicing location", "Each scheduled visit and procedure"], approver: "Prior auth coordinator",
      view: {
        kind: "calendar", title: "Auth A-77104 against the schedule · patient 77-0142", meta: "Example · Kettleby Advantage HMO", stamp: "Approved",
        from: "Approval letter received Wed Jan 20, 2027",
        events: [
          { month: "Jan", day: "20", weekday: "Wed", label: "Auth approved: CPT 73721, 1 unit", basis: "Servicing location: main office imaging", status: "Matches order" },
          { month: "Jan", day: "21", weekday: "Thu", label: "Auth period starts", basis: "Approval letter date range", status: "Active" },
          { month: "Feb", day: "18", weekday: "Thu", label: "MRI moved here after the flag", basis: "Rescheduled inside the auth range", status: "Inside auth" },
          { month: "Feb", day: "19", weekday: "Fri", label: "Auth period ends", basis: "Approval letter: Jan 21 to Feb 19", status: "Last valid day" },
          { month: "Feb", day: "22", weekday: "Mon", label: "MRI right knee, as scheduled", basis: "Imaging schedule", status: "3 days after auth ends", flag: true },
        ],
      },
    },
    { title: "Referral loop closure", phase: "Visit", label: "Referral follow-up", doc: "Open referral and imaging orders · EHR", tag: "LOG",
      checks: ["Open referral and imaging orders", "Scheduled appointment or returned result", "Orders past the set window", "Follow-up drafted for the care team"], approver: "Clinician's care team",
      view: {
        kind: "sheet", title: "Open referrals and imaging orders · Wed Feb 24, 2027", meta: "Example · Dr. Reyes's patients", stamp: "Work list",
        cols: ["Ordered", "Patient", "Order", "Priority", "Appointment or result", "Days open"], num: [5],
        rows: [
          { cells: ["Jan 19", "77-0142", "Orthopedic follow-up and injection, right knee", "Routine", "Booked Mar 1", "36"] },
          { cells: ["Jan 25", "77-0631", "Cardiology clearance before knee surgery", "Urgent", "None booked", "30"], flag: true },
          { cells: ["Feb 1", "77-0388", "CT, left wrist", "Routine", "Done Feb 9, report not back", "23"] },
          { cells: ["Feb 10", "77-0214", "Pain management consult", "Routine", "Booked Mar 9", "14"] },
          { cells: ["Feb 16", "77-0502", "EMG, both arms", "Routine", "None booked", "8"] },
        ],
        foot: [{ k: "Follow-up window", v: "Urgent 14 days, routine 30 days" }, { k: "Drafted", v: "Call note for 77-0631 to Dr. Reyes's team" }],
      },
    },
    { title: "Record releases checked against the authorization", phase: "Visit", label: "Record release", doc: "Record request · signed authorization", tag: "DOC",
      checks: ["Authorization scope, recipient and expiry", "Valid right-of-access request", "Minimum necessary for payment and operations", "Every release logged"], approver: "Privacy officer or practice manager",
      view: {
        kind: "compare", title: "Record request against the authorization on file · patient 77-0142", meta: "Example · request received Fri Feb 26, 2027", stamp: "Hold",
        panes: [
          { name: "Record request", ref: "REQ-0226-03", lines: [{ k: "Requested by", v: "Former spouse, by mail" }, { k: "Records", v: "Visit notes and imaging, Jan to Feb 2027" }, { k: "Basis given", v: "Authorization on file" }, { k: "Patient's own request", v: "No" }] },
          { name: "Authorization on file", ref: "AUTH-2024-0506", lines: [{ k: "Signed", v: "May 6, 2024" }, { k: "Recipient", v: "Spouse, named" }, { k: "Scope", v: "Visit notes and billing" }, { k: "Expiry", v: "May 6, 2027" }, { k: "Status", v: "Revoked in writing Sep 14, 2026", flag: true }] },
        ],
        foot: "No valid authorization and no right-of-access request. Nothing released; the request and the hold are logged.",
      },
    },
    { title: "Charges checked against the note before submission", phase: "Visit", label: "Charge review", doc: "Signed visit note · charge lines", tag: "DOC",
      checks: ["Each ICD-10 code against its CPT", "Modifiers 25, 59 and X documented", "NCCI edits and payer rules", "Coder question queued"], approver: "Certified coder",
      view: {
        kind: "record", title: "Visit note and charges · Mon Mar 1, 2027", meta: "Example · patient 77-0142, Kettleby Advantage HMO", stamp: "Signed",
        id: "Patient 77-0142 · Encounter E-30118 · Dr. M. Reyes",
        sections: [
          { name: "Visit", fields: [{ k: "Visit type", v: "Established patient, injection as planned at MRI review" }, { k: "Diagnosis", v: "M17.11 Primary osteoarthritis, right knee" }] },
          { name: "Note", fields: [{ k: "Procedure", v: "Right knee injection, consent, site, technique documented" }, { k: "Separate E/M work", v: "None documented beyond the pre-procedure check", flag: true }] },
        ],
        lines: [
          { code: "99214-25", text: "Office visit, separate service on the day of a procedure", amount: "$168.00", flag: true },
          { code: "20610-RT", text: "Injection, major joint, right knee", amount: "$165.00" },
        ],
      },
    },
    { title: "Timely filing deadlines tracked per payer", phase: "Claim", label: "Filing deadlines", doc: "Clearinghouse rejection report · open A/R", tag: "XLS",
      checks: ["Clearinghouse rejection reports", "Open A/R", "Each payer's filing and appeal window", "Claims listed by days left", "Reason each claim is stuck"], approver: "Billing manager",
      view: {
        kind: "calendar", title: "Unworked rejections against filing limits · week of Mar 8, 2027", meta: "Example · clearinghouse rejection report, Mon Mar 8", stamp: "A/R",
        from: "Report run Mon Mar 8, 2027 · rejected in December, never worked",
        events: [
          { month: "Mar", day: "16", weekday: "Tue", label: "6 claims, J. Pratt, service date Dec 16, 2026", basis: "Velandra Health: 90 days from service", status: "Rejected: rendering NPI invalid", flag: true },
          { month: "Mar", day: "17", weekday: "Wed", label: "5 claims, J. Pratt, service date Dec 17, 2026", basis: "Velandra Health: 90 days from service", status: "Rejected: rendering NPI invalid", flag: true },
          { month: "Mar", day: "18", weekday: "Thu", label: "3 claims, J. Pratt, service date Dec 18, 2026", basis: "Velandra Health: 90 days from service", status: "Rejected: rendering NPI invalid", flag: true },
          { month: "Aug", day: "28", weekday: "Sat", label: "Claim for 77-0142, service date Mar 1, 2027", basis: "Kettleby Advantage: 180 days from service", status: "Accepted Mar 3" },
        ],
      },
    },
    { title: "Denials matched to the payer's actual rule", phase: "Claim", label: "Denials", doc: "ERA denial · CARC and RARC codes", tag: "PDF",
      checks: ["CARC and RARC codes", "The claim and the visit note", "Payer policy or contract clause", "Fix and resubmit, appeal, or write off", "Appeal letter quoting the policy"], approver: "Denials specialist, with the provider",
      view: {
        kind: "message", title: "ERA denial to appeal · claim 27-0301-118", meta: "Example · patient 77-0142, Kettleby Advantage HMO", stamp: "835",
        msg: {
          from: "Kettleby Advantage HMO, ERA", to: "Denials queue", date: "Wed Mar 17, 2027", subject: "Claim 27-0301-118 · service date Mar 1, 2027",
          body: [
            { text: "20610-RT, injection, major joint · billed $165.00 · paid $0.00" },
            { text: "CARC CO-50: not deemed a medical necessity by the payer", flag: true },
            { text: "Diagnosis billed: M17.11, primary osteoarthritis, right knee" },
          ],
        },
        reply: { name: "Appeal letter · reconsideration", status: "Draft for Dr. Reyes to sign", lines: [
          { k: "Route", v: "Appeal, no claim correction needed" },
          { k: "Policy quoted", v: "Kettleby medical policy MP-114, knee joint injections" },
          { k: "Covered diagnoses in MP-114", v: "Include M17.11, the code billed", flag: true },
          { k: "Chart pages cited", v: "Note Mar 1, pp. 2 to 3; MRI report Feb 18" },
        ] },
      },
    },
    { title: "ERA posting reconciled to the contract", phase: "Post", label: "Payment posting", doc: "835 ERA · against contracted rates", tag: "XLS",
      checks: ["Every paid line", "Contracted rate by CPT, payer and place of service", "Lines paid below contract", "CARC and RARC codes used"], approver: "Billing manager",
      view: {
        kind: "recon", title: "835 ERA against the 2027 contract · Kettleby Advantage HMO", meta: "Example · EFT Wed Mar 24, 2027, office place of service", stamp: "Posting",
        sides: ["2027 contract allowed", "ERA allowed"],
        rows: [
          { ref: "77-0142 · Feb 18", label: "73721 MRI knee", cells: ["238.50", "238.50"] },
          { ref: "77-0593 · Mar 2", label: "99213 office visit", cells: ["96.40", "93.10"], flag: true },
          { ref: "77-0705 · Mar 2", label: "99213 office visit", cells: ["96.40", "93.10"], flag: true },
          { ref: "77-0688 · Mar 3", label: "99213 office visit", cells: ["96.40", "93.10"], flag: true },
          { ref: "77-0719 · Mar 4", label: "99213 office visit", cells: ["96.40", "93.10"], flag: true },
          { ref: "77-0726 · Mar 4", label: "99214 office visit", cells: ["134.20", "134.20"] },
        ],
        totals: ["758.30", "745.10"],
        diff: { k: "Allowed below contract: 99213 at the 2026 rate, CARC CO-45", v: "13.20", flag: true },
      },
    },
  ],
};
