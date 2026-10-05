// Fractional Chief AI Officer plans. Every plan is a 12-month term with the first two months free.
// Self-serve plans sign up on /ai-officer/signup until a Stripe Payment Link is set for them
// (STRIPE_LINK_BASIC / STRIPE_LINK_GROWTH in Vercel; redeploy after setting).
export type Plan = {
  id: "basic" | "growth" | "pro" | "enterprise";
  name: string;
  monthly: number | null;
  pitch: string;
  features: string[];
  selfServe: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 500,
    pitch: "For teams getting started with AI.",
    features: [
      "1 live training session a month, up to 10 people",
      "Setup and a usage policy for the AI tools you approve",
      "A quarterly review of your AI tools and what they cost",
      "Answers within 2 business days",
    ],
    selfServe: true,
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 1500,
    pitch: "For teams ready to hand off the repeat work.",
    features: [
      "Everything in Basic",
      "2 training sessions a month, up to 25 people",
      "A quarterly tool audit, cutting what you don't use",
      "1 new agent or automation each quarter",
      "Answers within 1 business day",
    ],
    selfServe: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 3500,
    pitch: "For companies running on systems we built.",
    features: [
      "Everything in Growth",
      "Weekly office hours for any team size",
      "1 new agent a month and about 10 hours of changes",
      "Maintenance, monitoring, and security for what we built",
      "A monthly roadmap call and same-day answers",
    ],
    selfServe: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    pitch: "For larger teams and regulated work.",
    features: [
      "Everything in Pro",
      "A dedicated AI Officer and on-site training",
      "Security reviews and contractual response times",
      "Scoped builds with uptime commitments",
    ],
    selfServe: false,
  },
];

export const FREE_MONTHS = 2;
export const firstYear = (p: Plan) => (p.monthly ? p.monthly * (12 - FREE_MONTHS) : null);
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function signupHref(p: Plan) {
  const stripe = { basic: process.env.STRIPE_LINK_BASIC, growth: process.env.STRIPE_LINK_GROWTH }[p.id as "basic" | "growth"];
  if (p.selfServe) return stripe || `/ai-officer/signup?plan=${p.id}`;
  return "/contact";
}
