import type { Walk } from "./types";
import { construction } from "./construction";
import { fieldServices } from "./field-services";
import { wholesaleDistribution } from "./wholesale-distribution";
import { manufacturing } from "./manufacturing";
import { accounting } from "./accounting";
import { insurance } from "./insurance";
import { legal } from "./legal";
import { healthcare } from "./healthcare";
import { marketingAgencies } from "./marketing-agencies";
import { realEstateBrokerage } from "./real-estate-brokerage";

export type { Walk, WalkStage } from "./types";

// Industry slug -> its click-through. A slug with no entry keeps the department table and the ten-catches list.
export const WALKS: Record<string, Walk> = {
  construction,
  "field-services": fieldServices,
  "wholesale-distribution": wholesaleDistribution,
  manufacturing,
  accounting,
  insurance,
  legal,
  healthcare,
  "marketing-agencies": marketingAgencies,
  "real-estate-brokerage": realEstateBrokerage,
};
