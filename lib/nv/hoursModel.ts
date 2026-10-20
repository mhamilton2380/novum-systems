// Hours back a week for the industry pages: one sourced method, shared with the industry briefs in novum-vault/docs.
// Inputs per department row and scenario live in hoursInputs.json. Method written 2026-10-19.

import INPUTS from "./hoursInputs.json";

export type Kind = "draft" | "review" | "service" | "entry";

export type Source = { label: string; url: string; kind: "Government data" | "Controlled study" | "Field study" | "Survey" | "Vendor" | "Association" };

export const SOURCES: Record<string, Source> = {
  oews: { label: "BLS Occupational Employment and Wage Statistics, industry staffing patterns, May 2025", url: "https://data.bls.gov/oes/#/home", kind: "Government data" },
  noy: { label: "Noy and Zhang, Science, 2023: writing tasks took 40% less time", url: "https://doi.org/10.1126/science.adh2586", kind: "Controlled study" },
  bcg: { label: "Dell'Acqua et al., Harvard Business School and BCG, 2023: tasks done 25.1% faster", url: "https://papers.ssrn.com/abstract=4573321", kind: "Controlled study" },
  brynjolfsson: { label: "Brynjolfsson, Li and Raymond, NBER 2023 (QJE 2025): 14% more customer issues resolved per hour", url: "https://www.nber.org/papers/w31161", kind: "Field study" },
  caqh: { label: "CAQH Index, 2024: a prior authorization takes 24 minutes by phone, fax or email, and 14 less done electronically", url: "https://www.caqh.org/hubfs/Index/2024%20Index%20Report/CAQH_IndexReport_2024_FINAL.pdf", kind: "Association" },
  stlfed: { label: "Bick, Blandin and Deming, St. Louis Fed, February 2025: workers who use generative AI save 5.4% of work hours", url: "https://www.stlouisfed.org/on-the-economy/2025/feb/impact-generative-ai-work-productivity", kind: "Survey" },
  ukgov: { label: "UK government Microsoft 365 Copilot experiment, 2025: 20,000 staff reported saving 26 minutes a day", url: "https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report", kind: "Survey" },
  humlum: { label: "Humlum and Vestergaard, 2025: 25,000 Danish workers who use chatbots reported saving 2.8% of work hours", url: "https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf", kind: "Survey" },
  tr: { label: "Thomson Reuters Future of Professionals, 2025: professionals expect AI to save them 5 hours a week within a year", url: "https://www.thomsonreuters.com/en/press-releases/2025/june/the-ai-adoption-reality-check-firms-with-ai-strategies-are-twice-as-likely-to-see-ai-driven-revenue-growth-those-without-risk-falling-behind", kind: "Survey" },
  "ama-pa": { label: "AMA prior authorization survey, late 2024: 39 requests per physician a week, 13 hours of physician and staff time", url: "https://www.ama-assn.org/practice-management/prior-authorization/fixing-prior-auth-nearly-40-prior-authorizations-week-way", kind: "Association" },
  payapps: { label: "Payapps contractor survey, 2026: 1.5 hours to prepare a pay application", url: "https://www.pbctoday.co.uk/news/planning-construction-news/construction-applications-for-payment-pain-point-competitive-advantage/166006/", kind: "Vendor" },
  "nar-hours": { label: "NAR Member Profile, 2025: the typical Realtor works 35 hours a week and closed 10 transactions", url: "https://www.floridarealtors.org/sites/default/files/basic-page/attachments/2025-09/2025%20Florida%20Member%20Profile%20Oversample.pdf", kind: "Association" },
  nar: { label: "NAR, 2025: 87% of Realtors are independent contractors at their firms", url: "https://www.nar.realtor/newsroom/realtors-show-strong-commitment-to-profession-amid-market-headwinds-new-nar-report-finds", kind: "Association" },
  "brief-accounting": { label: "a CPA firm case study (vendor): about 90 minutes per return before automated intake", url: "https://tax.thomsonreuters.com/blog/how-sureprep-revolutionized-this-cpa-firm/", kind: "Vendor" },
  "brief-insurance": { label: "an agency case study (vendor): policy checks took up to 4 hours by hand", url: "https://www.coverflow.com/case-studies/how-ellerbrock-norris-shifted-focus-from-paperwork-to-people", kind: "Vendor" },
  "brief-metals-machinery": { label: "Modern Machine Shop, 2021 (sponsored): up to 2 hours to quote a single part", url: "https://www.mmsonline.com/articles/when-it-comes-to-rfq-response-time-is-money", kind: "Vendor" },
};

/** Share of time saved on each kind of work, with the study behind it. */
export const RATES: Record<Kind, { rate: number; what: string; src: string }> = {
  draft: { rate: 0.4, what: "Writing letters, reports, emails and summaries", src: "noy" },
  review: { rate: 0.25, what: "Checking, comparing and first-pass review", src: "bcg" },
  service: { rate: 0.12, what: "Answering customer calls and status questions (14% more per hour is 12% less time each)", src: "brynjolfsson" },
  entry: { rate: 0.5, what: "Reading documents and keying, coding or matching data. No AI trial has measured this yet, so this rate is our estimate, set below published automation results: a prior authorization takes 58% less time done electronically", src: "caqh" },
};

/** Workers who use AI save 5.4% of work hours (St. Louis Fed); applied to office hours the agents don't already cover. */
export const OWN_USE_RATE = 0.054;
export const WEEK = 40;
export const FIRM = 120;

/** Office staff in a firm of about 120, from BLS staffing patterns: management, business and financial, computer, legal, arts and media, sales, and office and admin. */
export const OFFICE: Record<string, { n: number; basis: string; week?: number; unit?: string }> = {
  construction: { n: 47, basis: "38.9% of nonresidential building contractors' staff (NAICS 236200) work in management, business, sales and office roles; the rest are field crews" },
  "field-services": { n: 29, basis: "23.9% of HVAC, plumbing and electrical contractors' staff (NAICS 238200) work in office and management roles; the rest are technicians and crews" },
  legal: { n: 119, basis: "99.3% of law firm staff (NAICS 541100) are lawyers, paralegals, office and management staff" },
  accounting: { n: 115, basis: "95.9% of accounting firm staff (NAICS 541200) work in professional, management and office roles" },
  insurance: { n: 117, basis: "97.2% of agency staff (NAICS 524200) are producers, account managers, service and office staff" },
  healthcare: { n: 39, basis: "32.6% of physician practice staff (NAICS 621100) work in office and management roles; clinicians are not counted" },
  "marketing-agencies": { n: 112, basis: "93.0% of agency staff (NAICS 541800) work in creative, account, media, business and office roles" },
  manufacturing: { n: 28, basis: "23.6% of fabricated metal manufacturers' staff (NAICS 332000) work in office, sales and management roles; the rest are on the floor" },
  "wholesale-distribution": { n: 71, basis: "59.2% of durable goods wholesalers' staff (NAICS 423000) work in sales, office and management roles; the rest are in the warehouse and on trucks" },
  "real-estate-brokerage": { n: 120, basis: "Everyone counts: about 90 agents and 30 staff, all at a desk. Most agents are independent contractors (87%, NAR 2025), so BLS publishes no staffing table for brokerages. Agents work about 35 hours a week (NAR) and staff 40, an average of 36", week: 36, unit: "agent and staff member" },
};

type DeptIn = { dept: string; people: number; hrsEach: number; kind: Kind; basis: string; src: string | null };
type ScenIn = { title: string; hrsToday: number; kind: Kind; overlap: string | null; basis: string; src: string | null };
const DATA = INPUTS as unknown as Record<string, { departments: DeptIn[]; scenarios: ScenIn[] }>;

const r1 = (x: number) => Math.round(x * 10) / 10;

export type DeptHours = DeptIn & { today: number; back: number };
export type IndustryHours = {
  office: number;
  week: number;
  depts: DeptHours[];
  agents: { today: number; back: number };
  catches: { today: number; back: number; counted: number; items: ScenIn[] };
  ownUse: { base: number; back: number };
  total: number;
  perOffice: number;
};

export function industryHours(slug: string): IndustryHours | null {
  const d = DATA[slug];
  const off = OFFICE[slug];
  if (!d || !off) return null;
  const depts = d.departments.map((x) => {
    const today = x.people * x.hrsEach;
    return { ...x, today, back: today * RATES[x.kind].rate };
  });
  const sc = d.scenarios.filter((s) => !s.overlap);
  const agents = { today: depts.reduce((t, x) => t + x.today, 0), back: depts.reduce((t, x) => t + x.back, 0) };
  const catches = {
    today: sc.reduce((t, s) => t + s.hrsToday, 0),
    back: sc.reduce((t, s) => t + s.hrsToday * RATES[s.kind].rate, 0),
    counted: sc.length,
  };
  const week = off.week ?? WEEK;
  const base = off.n * week - agents.today - catches.today;
  const ownUse = { base, back: base * OWN_USE_RATE };
  const exact = agents.back + catches.back + ownUse.back;
  return {
    office: off.n,
    week,
    depts: depts.map((x) => ({ ...x, today: r1(x.today), back: r1(x.back) })),
    agents: { today: r1(agents.today), back: r1(agents.back) },
    catches: { ...catches, today: r1(catches.today), back: r1(catches.back), items: d.scenarios },
    ownUse: { base: r1(base), back: r1(ownUse.back) },
    total: Math.round(exact / 10) * 10,
    perOffice: r1(exact / off.n),
  };
}

/** Hours back for one department row, rounded to a whole hour for the table. */
export function deptBack(slug: string, dept: string) {
  const h = industryHours(slug)?.depts.find((x) => x.dept === dept);
  return h ? Math.round(h.back) : null;
}
