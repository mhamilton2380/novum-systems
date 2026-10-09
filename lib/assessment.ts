// AI Readiness Score: questions, scoring, flags, the opportunity estimate, and lead tiers.
// Built from the spec doc (2026-10-08): https://claude.ai/code/artifact/ecd6d725-c58d-47df-b1a0-3b2de014968b
// Shared by the page (scores in the browser) and /api/assessment (re-scores on the server before saving).
// No prices anywhere. Never show a "compared to other companies" figure until 100 real responses exist.

export type QId =
  | "desk_staff" | "repeat_hours" | "weekly_use" | "training" | "personal_accounts" | "policy"
  | "ai_location" | "retyping" | "software_spend" | "unused_seats" | "workaround" | "ai_owner";
export type Area = "team" | "guardrails" | "connected" | "spend" | "fit";
type Option = { label: string; points?: number; value?: number };
export type Question = { id: QId; q: string; note?: string; area?: Area; options: Option[] };

export const QUESTIONS: Question[] = [
  { id: "desk_staff", q: "How many of your people spend most of the day at a computer?", note: "Office, project, sales, and management staff. Leave out field crews.",
    options: [{ label: "1 to 9", value: 5 }, { label: "10 to 24", value: 17 }, { label: "25 to 49", value: 37 }, { label: "50 to 99", value: 75 }, { label: "100 or more", value: 120 }] },
  { id: "repeat_hours", q: "In a typical week, how many hours does one of those people spend on work that's the same every time?", note: "Entering the same data, chasing updates, building the same report, answering the same questions.",
    options: [{ label: "Under 2", value: 1 }, { label: "2 to 5", value: 3.5 }, { label: "5 to 10", value: 7.5 }, { label: "More than 10", value: 12 }] },
  { id: "weekly_use", area: "team", q: "How many of them use AI in their work every week?",
    options: [{ label: "None", points: 0 }, { label: "A few", points: 3 }, { label: "About half", points: 7 }, { label: "Most of them", points: 10 }] },
  { id: "training", area: "team", q: "Has anyone trained your team to use AI on your actual work?",
    options: [{ label: "No", points: 0 }, { label: "They taught themselves", points: 3 }, { label: "One session", points: 6 }, { label: "Yes, and it's ongoing", points: 10 }] },
  { id: "personal_accounts", area: "guardrails", q: "Do people use their own personal AI accounts, like a personal ChatGPT, for company work?",
    options: [{ label: "Yes, often", points: 0 }, { label: "Not sure", points: 2 }, { label: "Some do", points: 4 }, { label: "No, company accounts only", points: 10 }] },
  { id: "policy", area: "guardrails", q: "Do you have written rules for what company information can go into AI tools?",
    options: [{ label: "No", points: 0 }, { label: "Being written", points: 5 }, { label: "Yes", points: 10 }] },
  { id: "ai_location", area: "connected", q: "Where does AI show up in your work today?",
    options: [{ label: "Nowhere yet", points: 0 }, { label: "In a separate chat window", points: 3 }, { label: "Inside one of our tools", points: 6 }, { label: "Connected to our email, files, and systems", points: 10 }] },
  { id: "retyping", area: "connected", q: "How often does someone type the same information into two different systems?",
    options: [{ label: "Every day", points: 0 }, { label: "Every week", points: 3 }, { label: "Rarely", points: 7 }, { label: "Never", points: 10 }] },
  { id: "software_spend", area: "spend", q: "Roughly how much does the company spend on software a year?", note: "A ballpark is fine. Knowing the number is what counts.",
    options: [{ label: "Not sure", points: 0 }, { label: "Under $25,000", points: 10 }, { label: "$25,000 to $75,000", points: 10 }, { label: "$75,000 to $200,000", points: 10 }, { label: "Over $200,000", points: 10 }] },
  { id: "unused_seats", area: "spend", q: "Are you paying for software or AI logins that people don't really use?",
    options: [{ label: "Yes", points: 0 }, { label: "Probably", points: 4 }, { label: "No", points: 10 }] },
  { id: "workaround", area: "fit", q: "Does the software you run the business on fit how your team works?", note: "Signs it doesn't: spreadsheets on the side, workarounds everyone knows, features you pay for and never use.",
    options: [{ label: "No, the team works around our main system", points: 0 }, { label: "Mostly, but one smaller tool gets worked around", points: 5 }, { label: "Yes, it fits", points: 10 }] },
  { id: "ai_owner", area: "fit", q: "Whose job is it to make AI work at your company?",
    options: [{ label: "Nobody's", points: 0 }, { label: "Someone's, on top of their real job", points: 5 }, { label: "A person or partner whose job it is", points: 10 }] },
];

export type Answers = Partial<Record<QId, number>>; // option index per question

export const AREAS: { id: Area; name: string; headline: string }[] = [
  { id: "team", name: "Team use", headline: "AI isn't part of your team's week yet." },
  { id: "guardrails", name: "Guardrails", headline: "There are no guardrails on how AI touches company data." },
  { id: "connected", name: "Connected systems", headline: "AI isn't connected to the systems where your work lives." },
  { id: "spend", name: "Software spend", headline: "Your software spend isn't under control." },
  { id: "fit", name: "Fit and ownership", headline: "Your systems don't fit how you work, and nobody owns fixing it." },
];

export const BANDS = [
  { min: 80, name: "Running", headline: "You're ahead of most companies your size. The question is what to build next." },
  { min: 55, name: "Building", headline: "You've started. The next gains come from connecting it to your systems." },
  { min: 30, name: "Scattered", headline: "A few people use AI. The company doesn't, yet." },
  { min: 0, name: "Starting line", headline: "AI hasn't reached your team's real work yet. That's where most companies your size are." },
];

// Flags and tiers key off the answer's position, so question wording can change without breaking the logic.
const idx = (a: Answers, id: QId) => a[id] ?? -1;
const label = (a: Answers, id: QId) => {
  const i = a[id];
  return i === undefined ? "" : QUESTIONS.find((q) => q.id === id)!.options[i].label;
};

export type Flag = { id: number; title: string; text: string; fix: string; writeup: string };

// Priority order. The first three that fire are shown; the email write-up lists every one that fired.
export function flagsFor(a: Answers): Flag[] {
  const out: Flag[] = [];
  const bigSpend = idx(a, "software_spend") >= 3; // $75,000 or more
  if (idx(a, "personal_accounts") >= 0 && idx(a, "personal_accounts") <= 2) // Yes often, Not sure, Some do
    out.push({ id: 1, title: "Data leaving through personal accounts", fix: "A usage policy, company accounts, and training",
      text: "Company data is going into personal AI accounts you can't see or control. That's the first thing to fix.",
      writeup: "Companies that get this right give everyone a company AI account, write a one-page policy on what data can go where, and train people on it the same week. Use goes up, not down, because people stop hiding it." });
  if (idx(a, "workaround") === 0) // works around the main system
    out.push({ id: 2, title: "A platform you've outgrown", fix: "Software built around how you work",
      text: bigSpend
        ? "Your team works around its main system. At your software spend, owning one core system can cost less within a few years."
        : "Your team works around its main system. When owning software costs less than the subscription, replacing it pays for itself.",
      writeup: "When a team works around its main system, the workarounds usually cost more than anyone tracks: spreadsheets, double entry, the one person who knows the trick. Companies that fix it map the real workflow first, then decide whether to connect, reconfigure, or replace. Replacing only makes sense when owning the software costs less over a few years, and a discovery does that math." });
  if (idx(a, "repeat_hours") >= 2) // 5 to 10, More than 10
    out.push({ id: 3, title: "Hours of repeat work", fix: "Agents on the repeat work, with a person approving",
      text: `Each person spends ${label(a, "repeat_hours").toLowerCase()} hours a week on work that looks the same every time. That's the work to hand off first.`,
      writeup: "The work to hand off first usually arrives in an inbox, gets read, and gets retyped or answered the same way every time. Companies start with one task, put an agent on the first draft, and keep a person approving the output. The result shows up within weeks." });
  if (idx(a, "retyping") >= 0 && idx(a, "retyping") <= 1) // every day or week
    out.push({ id: 4, title: "Retyping between tools", fix: "Connecting the tools you keep",
      text: "Your tools don't talk to each other, so people do the connecting by hand.",
      writeup: "Retyping between tools is usually fixed by connecting them, not replacing them. Once data entered once shows up everywhere, the double-entry errors stop and AI can see the whole picture." });
  if (idx(a, "training") >= 0 && idx(a, "training") <= 1 && idx(a, "weekly_use") >= 0 && idx(a, "weekly_use") <= 1)
    out.push({ id: 5, title: "Paying for AI nobody was taught", fix: "Hands-on training on your own work, and a library you keep",
      text: "You have AI access and nobody showing the team how to use it on real work.",
      writeup: "Access without training barely moves the numbers: a study of 25,000 workers found about 3% time saved. Companies that see real gains train people on their own work, show them where AI gets things wrong, and keep training as the tools change." });
  if (idx(a, "ai_owner") === 0)
    out.push({ id: 6, title: "Nobody owns AI", fix: "A fractional Chief AI Officer",
      text: "Nobody's job is to make AI work here, so it doesn't happen.",
      writeup: "AI improves where it's someone's job. Most companies of 15 to 100 people can't justify a full-time hire for it, so they use a fractional Chief AI Officer: someone who owns the plan, builds the tools, and keeps the team trained." });
  if (idx(a, "software_spend") === 0 || (idx(a, "unused_seats") >= 0 && idx(a, "unused_seats") <= 1))
    out.push({ id: 7, title: "Unknown software spend", fix: "A tool and cost audit",
      text: "You're likely paying for software nobody uses. Most companies can't say what their stack costs.",
      writeup: "Most companies can't say what their software costs. Pulling every subscription into one list, with seats and renewal dates, almost always turns up a tool nobody uses. It's the fastest money a company finds." });
  if (idx(a, "policy") === 0 && !out.some((f) => f.id === 1))
    out.push({ id: 8, title: "No AI policy", fix: "A written usage policy",
      text: "There's no written rule for what data goes into AI tools.",
      writeup: "A one-page AI policy says what data can go into which tools, and when a person has to check the output. It takes about a week to write, and it lets people use AI without guessing." });
  return out;
}

export type Estimate = { skip: true } | { skip: false; hoursLow: number; hoursHigh: number; dollarsLow: number; dollarsHigh: number };
const roundHours = (h: number) => (h < 1000 ? Math.round(h / 10) * 10 : Math.round(h / 100) * 100);
const roundDollars = (d: number) => Math.round(d / 1000) * 1000;
// 25% to 50% of repeat-work time back (controlled studies: 25% to 56%), 48 working weeks, $33 an hour (BLS wage plus benefits).
export function estimateFor(a: Answers): Estimate {
  const people = QUESTIONS[0].options[a.desk_staff ?? 0].value!;
  const rh = QUESTIONS[1].options[a.repeat_hours ?? 0];
  if ((a.repeat_hours ?? 0) === 0) return { skip: true }; // Under 2
  const lo = people * rh.value! * 0.25 * 48, hi = people * rh.value! * 0.5 * 48;
  return { skip: false, hoursLow: roundHours(lo), hoursHigh: roundHours(hi), dollarsLow: roundDollars(lo * 33), dollarsHigh: roundDollars(hi * 33) };
}

export type Result = {
  score: number;
  band: (typeof BANDS)[number];
  areas: { id: Area; name: string; score: number }[];
  flags: Flag[]; // all that fired
  top: { title: string; text: string; fix?: string }[]; // the three shown
  estimate: Estimate;
};

export function scoreFor(a: Answers): Result {
  const pts = (q: Question) => q.options[a[q.id] ?? 0].points ?? 0;
  const areas = AREAS.map((ar) => ({ id: ar.id, name: ar.name, score: QUESTIONS.filter((q) => q.area === ar.id).reduce((s, q) => s + pts(q), 0) }));
  const score = areas.reduce((s, x) => s + x.score, 0);
  const band = BANDS.find((b) => score >= b.min)!;
  const flags = flagsFor(a);
  const top: Result["top"] = flags.slice(0, 3).map((f) => ({ title: f.title, text: f.text, fix: f.fix }));
  // Fewer than three flags: fill with the lowest-scoring areas (10 or less out of 20), using their headline.
  for (const ar of [...areas].sort((x, y) => x.score - y.score)) {
    if (top.length >= 3) break;
    if (ar.score <= 10) top.push({ title: ar.name, text: AREAS.find((x) => x.id === ar.id)!.headline });
  }
  return { score, band, areas, flags, top, estimate: estimateFor(a) };
}

export type Tier = "Call today" | "Nurture" | "Anonymous";
export function tierFor(a: Answers, hasEmail: boolean, flags: Flag[]): Tier {
  if (!hasEmail) return "Anonymous";
  const fit = idx(a, "desk_staff") >= 1 && idx(a, "desk_staff") <= 3; // 10 to 99 desk staff
  return fit && flags.some((f) => f.id === 2 || f.id === 3) ? "Call today" : "Nurture";
}

export const complete = (a: Answers) => QUESTIONS.every((q) => typeof a[q.id] === "number" && a[q.id]! >= 0 && a[q.id]! < q.options.length);
export const answerLabel = label;
export const fmt = (n: number) => n.toLocaleString("en-US");
