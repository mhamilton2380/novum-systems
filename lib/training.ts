// Training day: one 5-hour on-site AI training day. No prices on the site (decided 2026-10-08):
// teams send a request and Michael quotes by team size. Internal pricing lives in
// novum-vault/CONTEXT.md.
import { USE_CASE_NAV } from "./nav";

export const TRAINING_HOURS = 5;
export const COMPANY_TYPES = [...USE_CASE_NAV.map((u) => u.label), "Other"];
