// One industry's click-through: follow one piece of work from start to finish.
// Every stage is one scenario from SCENARIOS[slug] (lib/nv/useCaseScenarios.ts), matched by title.
// The flagged line shown on screen is the scenario's own "catch"; the approver line is its "person".
// Nothing in a walk may add a fact: no numbers, names, tools or claims that are not in that scenario's text.
export type WalkStage = {
  title: string; // must equal Scenario.title exactly
  phase: string; // one word; consecutive stages share a phase (4 to 6 phases across the ten stages)
  label: string; // short name for the rail, 1 to 4 words
  doc: string; // the document or screen the agent works in, as that trade would name it
  tag: string; // file-type badge: PDF, XLS, LOG, DOC or MAIL
  checks: string[]; // 3 to 6 short lines, each lifted from the scenario's own "ai" text
  approver: string; // short form of the scenario's "person" (a role, not a sentence)
};

export type Walk = {
  sectionLabel: string; // small index label, e.g. "Follow one job"
  h2: [string, string]; // bright clause, then the muted clause
  demoTitle: string; // e.g. "One job, bid set to final payment"
  demoSub: string; // e.g. "Ten points where an agent reads the paperwork and a person signs off"
  replay: string; // e.g. "Replay from the bid set"
  railLabel: string; // screen-reader name for the rail, e.g. "Stages of the job"
  closed: string; // shown after the last sign-off, e.g. "Job closed out."
  aiName?: string; // what to call the software on screen. Default "agent"; use "AI" in trades where "agent" means a person (real estate, insurance)
  stages: WalkStage[]; // exactly ten, in the order the work really happens
};
