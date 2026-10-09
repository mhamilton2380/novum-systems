// Fractional Chief AI Officer plans. Every plan starts with a paid discovery, then runs on
// a 6-month minimum and month to month after that. Prices are not shown on the site (decided
// 2026-10-08): the page says "start with discovery" and Michael quotes. Internal prices live
// in novum-vault/CONTEXT.md.
// Builds are metered by how many are in progress at once, never by count or hours.
export type PlanId = "growth" | "pro" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  startable: boolean; // false = talk to us
  pitch: string;
  highlights: string[]; // the short list shown on the start page
  // The plan card on /ai-officer: short on purpose. The full comparison sits behind a toggle.
  tagline: string;
  lanes: number; // builds in progress at once, drawn as lanes on the card
  lanesLabel: string;
  badge?: string;
  points: string[];
};

export const PLANS: Plan[] = [
  {
    id: "growth",
    name: "Growth",
    startable: true,
    pitch: "Your AI team on call. Every tool connected, and agents and builds shipping one after another.",
    tagline: "Start here",
    lanes: 1,
    lanesLabel: "1 build at a time",
    points: ["Every tool connected", "2 training sessions a month", "Quarterly tool audit", "Answers within 1 business day"],
    highlights: ["2 training sessions a month", "Every tool you use, connected", "Unlimited agents and builds, one at a time", "Upkeep of everything we build"],
  },
  {
    id: "pro",
    name: "Pro",
    startable: true,
    pitch: "A dedicated AI Officer, twice the build speed, full platform replacements, and weekly time with your team.",
    tagline: "Go faster",
    lanes: 2,
    lanesLabel: "2 builds at a time",
    badge: "Dedicated AI Officer",
    points: ["A dedicated AI Officer", "Weekly sessions and office hours", "Full platform replacements", "Same-day answers"],
    highlights: ["A dedicated AI Officer", "Weekly sessions and office hours", "Every tool you use, connected", "Unlimited agents and builds, two at a time", "Full platform replacements"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    startable: false,
    pitch: "For larger teams, regulated work, and several builds at once.",
    tagline: "For bigger teams",
    lanes: 4,
    lanesLabel: "Several builds at once",
    points: ["On-site team sessions", "SSO, IP allowlisting, your own keys", "Annual pen test", "Contractual response times"],
    highlights: [],
  },
];

// What each plan includes. A string is the line shown for that plan, true shows the row label, false omits it.
type Cell = string | boolean;
export type FeatureGroup = { group: string; rows: { label: string; v: [Cell, Cell, Cell] }[] };

export const FEATURES: FeatureGroup[] = [
  {
    group: "Training and support",
    rows: [
      { label: "Live team training", v: ["2 training sessions a month, up to 25 people", "Weekly sessions and office hours, any team size", "On-site training, any team size"] },
      { label: "Written guides for every tool and agent we set up", v: [true, true, true] },
      { label: "An AI usage policy: what data goes where", v: [true, true, true] },
      { label: "New AI tools tested on your data", v: [true, true, true] },
      { label: "Tool and cost audit", v: ["Quarterly audit, cutting what you don't use", "Quarterly audit plus a monthly roadmap call", "Quarterly audit plus a monthly roadmap call"] },
      { label: "Response time", v: ["Answers within 1 business day", "Same-day answers", "Contractual response times"] },
      { label: "A dedicated AI Officer", v: [false, true, true] },
    ],
  },
  {
    group: "Connected systems and security",
    rows: [
      { label: "Every tool you use, connected", v: [true, true, true] },
      { label: "Two-way sync, so data entered once updates everywhere", v: [true, true, true] },
      { label: "Every document encrypted, searchable by meaning, access by role", v: [true, true, true] },
      { label: "Hosted on SOC 2 Type 2 infrastructure, encrypted at rest and in transit", v: [true, true, true] },
      { label: "Your data in its own database, never shared with other clients", v: [true, true, true] },
      { label: "An audit log of every view and edit", v: [true, true, true] },
      { label: "SSO, IP allowlisting, your own encryption keys, and an annual pen test", v: [false, false, true] },
    ],
  },
  {
    group: "AI at work",
    rows: [
      { label: "An AI assistant that answers questions across your company data, with sources", v: [true, true, true] },
      { label: "Agents and builds", v: ["Unlimited, one in progress at a time", "Unlimited, two in progress at a time", "Several at once, scoped to every team"] },
      { label: "Bigger projects split into steps that go live one by one", v: [true, true, true] },
      { label: "Scheduling, outreach, and reporting agents, with drafts held for your approval", v: [true, true, true] },
      { label: "A person approves anything before it leaves the company", v: [true, true, true] },
    ],
  },
  {
    group: "Software you own",
    rows: [
      { label: "Replace costly SaaS with custom software you own", v: ["Smaller tools, through your build queue", "Full platforms, alongside your other builds", "Several platforms at once"] },
      { label: "Your data migrated from the old tool", v: [true, true, true] },
      { label: "Changes and fixes go in the same queue, no hour caps", v: [true, true, true] },
      { label: "Maintenance, monitoring, and backups for everything we build", v: [true, true, true] },
      { label: "The code, data, and accounts in your company's name", v: [true, true, true] },
    ],
  },
];

const IDX: Record<PlanId, number> = { growth: 0, pro: 1, enterprise: 2 };

// Every row for every plan, so cards line up row by row. Rows a plan lacks come back as not included.
export function planLines(id: PlanId) {
  return FEATURES.map((g) => ({
    group: g.group,
    lines: g.rows.map((r) => {
      const c = r.v[IDX[id]];
      return { text: typeof c === "string" ? c : r.label, included: c !== false };
    }),
  }));
}

// Grid rows per card: tag, terms, pitch, button, then a heading and the rows for each group.
export const CARD_ROWS = 4 + FEATURES.reduce((n, g) => n + 1 + g.rows.length, 0);

export const MIN_MONTHS = 6;
export const TERMS = `${MIN_MONTHS}-month minimum, then month to month.`;

export function startHref(p: Plan) {
  return p.startable ? `/ai-officer/signup?plan=${p.id}` : "/contact";
}
