// Training day: one 5-hour on-site AI training day, priced by team size. Prices are public
// (decided 2026-10-08), unlike the AI Officer plans. Teams over 75 request a quote.
import { USE_CASE_NAV } from "./nav";

export const TRAINING_HOURS = 5;
export const MAX_ONLINE_HEADCOUNT = 75;

export const COMPANY_TYPES = [...USE_CASE_NAV.map((u) => u.label), "Other"];

export type TrainingTier = { label: string; min: number; max: number | null; price: number | null };

export const TRAINING_TIERS: TrainingTier[] = [
  { label: "1 to 20 people", min: 1, max: 20, price: 2500 },
  { label: "21 to 40 people", min: 21, max: 40, price: 5000 },
  { label: "41 to 75 people", min: 41, max: 75, price: 7500 },
  { label: "76 or more people", min: 76, max: null, price: null }, // from $10,000, quoted
];

export const LARGE_FROM = 10000;
export const LARGE_PER_100 = 12500;

export const tierFor = (headcount: number) => TRAINING_TIERS.find((t) => headcount >= t.min && (t.max === null || headcount <= t.max));

// Server and client share this, and the server is the one that charges.
export const trainingPrice = (headcount: number): number | null => {
  if (!Number.isInteger(headcount) || headcount < 1) return null;
  return tierFor(headcount)?.price ?? null;
};

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
