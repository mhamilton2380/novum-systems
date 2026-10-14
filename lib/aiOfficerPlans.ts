// What a fractional Chief AI Officer engagement covers. One engagement, sized to the company in
// discovery; no named tiers on the site (decided 2026-10-13). The internal quoting ladder
// (Growth / Pro / Enterprise) and prices live in novum-vault/CONTEXT.md.
export type IncludedGroup = { group: string; items: string[] };

export const INCLUDED: IncludedGroup[] = [
  {
    group: "Training and support",
    items: [
      "Live training every month, on your own tools and work",
      "Office hours for questions as they come up",
      "A recorded training library, updated monthly, yours to keep",
      "Written guides for every tool and agent we set up",
      "An AI usage policy: what data goes where, kept current",
      "A monthly report: hours saved, adoption, and what's next",
    ],
  },
  {
    group: "Connected systems and security",
    items: [
      "Every tool you use, connected, with two-way sync",
      "Built inside Microsoft 365 and Copilot if that's what you run",
      "Every document encrypted, searchable by meaning, access by role",
      "Hosted on SOC 2 Type 2 infrastructure, your data in its own database",
      "An audit log of every view and edit",
    ],
  },
  {
    group: "AI at work",
    items: [
      "An AI assistant that answers across your company data, with sources",
      "A prioritized roadmap of agents and builds, worked in order and reviewed monthly with your sponsor",
      "A person approves anything before it leaves the company",
      "A list of every agent, what it does, and who owns it",
      "New models and tools tested on your data as they ship",
    ],
  },
  {
    group: "Software you own",
    items: [
      "Costly software replaced with a system that fits how you work",
      "Your data migrated from the old tool",
      "Changes and fixes through the same queue",
      "Maintenance, monitoring, and backups for everything we build",
      "The code, data, and accounts in your company's name",
    ],
  },
];
