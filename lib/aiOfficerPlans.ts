// Fractional Chief AI Officer plans. Every plan is a 12-month term with the first two months free.
// Self-serve plans sign up on /ai-officer/signup until a Stripe Payment Link is set for them
// (STRIPE_LINK_BASIC / STRIPE_LINK_GROWTH in Vercel; redeploy after setting).
export type PlanId = "basic" | "growth" | "pro" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number | null;
  pitch: string;
  highlights: string[]; // the short list shown on the sign-up page
  selfServe: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 500,
    pitch: "Your team trained, your tools connected, and your first agents running.",
    highlights: ["Monthly team training", "Connect up to 3 of your tools", "1 new agent a quarter", "A company Vault for every document"],
    selfServe: true,
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 1500,
    pitch: "AI across the business, a costly tool replaced, and marketing handled.",
    highlights: ["2 training sessions a month", "AI Assistant plus 1 new agent a month", "1 costly SaaS tool replaced with software you own", "SEO, 4 reels a month, and an explainer video each quarter"],
    selfServe: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 3500,
    pitch: "Your technical team on call: unlimited replacements, more agents, more marketing.",
    highlights: [],
    selfServe: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    pitch: "For larger teams, regulated work, and full platform replacements.",
    highlights: [],
    selfServe: false,
  },
];

// What each plan includes. A string is the line shown for that plan, true shows the row label, false omits it.
type Cell = string | boolean;
export type FeatureGroup = { group: string; rows: { label: string; v: [Cell, Cell, Cell, Cell] }[] };

export const FEATURES: FeatureGroup[] = [
  {
    group: "Training and support",
    rows: [
      { label: "Live team training", v: ["1 training session a month, up to 10 people", "2 training sessions a month, up to 25 people", "Weekly office hours, any team size", "On-site training, any team size"] },
      { label: "Written guides for every tool and agent we set up", v: [true, true, true, true] },
      { label: "An AI usage policy: what data goes where", v: [true, true, true, true] },
      { label: "Monthly briefing on new AI for your industry", v: [true, true, true, true] },
      { label: "New AI tools tested on your data", v: [false, true, true, true] },
      { label: "Tool and cost audit", v: ["Quarterly review of your tools and what they cost", "Quarterly audit, cutting what you don't use", "Quarterly audit plus a monthly roadmap call", "Quarterly audit plus a monthly roadmap call"] },
      { label: "Response time", v: ["Answers within 2 business days", "Answers within 1 business day", "Same-day answers", "Contractual response times"] },
      { label: "A dedicated AI Officer", v: [false, false, false, true] },
    ],
  },
  {
    group: "Connected systems and security",
    rows: [
      { label: "Connect your existing tools", v: ["Connect up to 3 of your tools", "Connect up to 6 of your tools", "Connect unlimited tools", "Connect unlimited tools"] },
      { label: "Two-way sync, so data entered once updates everywhere", v: [true, true, true, true] },
      { label: "A company Vault: every document encrypted, searchable by meaning, access by role", v: [true, true, true, true] },
      { label: "Hosted on SOC 2 Type 2 infrastructure, encrypted at rest and in transit", v: [true, true, true, true] },
      { label: "Your data in its own database, never shared with other clients", v: [true, true, true, true] },
      { label: "An audit log of every view and edit", v: [true, true, true, true] },
      { label: "SSO, IP allowlisting, your own encryption keys, and an annual pen test", v: [false, false, false, true] },
    ],
  },
  {
    group: "AI at work",
    rows: [
      { label: "AI agents for your repeat work", v: ["1 new agent a quarter", "1 new agent a month", "2 new agents a month", "Agents scoped to every team"] },
      { label: "An AI Assistant that answers questions across your company data, with sources", v: [false, true, true, true] },
      { label: "A scheduling agent that books and confirms meetings", v: [false, true, true, true] },
      { label: "Outreach and follow-up agents, with drafts held for your approval", v: [false, true, true, true] },
      { label: "Reporting agents that build the weekly numbers", v: [false, true, true, true] },
      { label: "A person approves anything before it leaves the company", v: [true, true, true, true] },
    ],
  },
  {
    group: "Software you own",
    rows: [
      { label: "Replace a costly SaaS tool with custom software you own", v: [false, "1 costly SaaS tool replaced each year", "Unlimited replacements, built one at a time", "Several builds at once, including full platforms"] },
      { label: "Your data migrated from the old tool", v: [false, true, true, true] },
      { label: "Changes and new features", v: [false, "4 hours of changes a month", "10 hours of changes a month", "Changes scoped to your team"] },
      { label: "Maintenance, monitoring, and backups for everything we set up", v: [true, true, true, true] },
      { label: "The code, data, and accounts in your company's name", v: [true, true, true, true] },
    ],
  },
  {
    group: "Marketing",
    rows: [
      { label: "SEO without paid ads: site fixes, content, and your Google Business Profile", v: [false, true, true, true] },
      { label: "Social media reels", v: [false, "4 social media reels a month", "8 social media reels a month", "Reels scoped to your brand"] },
      { label: "Explainer videos", v: [false, "1 explainer video a quarter", "2 explainer videos a quarter", "Videos scoped to your brand"] },
      { label: "A monthly report on traffic, rankings, and leads", v: [false, true, true, true] },
    ],
  },
];

const IDX: Record<PlanId, number> = { basic: 0, growth: 1, pro: 2, enterprise: 3 };

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

// Grid rows per card: tag, price, terms, pitch, button, then a heading and the rows for each group.
export const CARD_ROWS = 5 + FEATURES.reduce((n, g) => n + 1 + g.rows.length, 0);

export const FREE_MONTHS = 2;
export const firstYear = (p: Plan) => (p.monthly ? p.monthly * (12 - FREE_MONTHS) : null);
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function signupHref(p: Plan) {
  const stripe = { basic: process.env.STRIPE_LINK_BASIC, growth: process.env.STRIPE_LINK_GROWTH }[p.id as "basic" | "growth"];
  if (p.selfServe) return stripe || `/ai-officer/signup?plan=${p.id}`;
  return "/contact";
}
