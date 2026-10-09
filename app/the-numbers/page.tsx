import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/PageBits";
import { EvidenceByWork, CostPerTask, PhoneAgents, LongTasks, WhereItGoesWrong, ThreeChoices } from "@/components/PageVisuals";

// Client-facing evidence, all from "How Much Faster AI Makes the Work" (2026-10-08):
// https://claude.ai/code/artifact/ebae361d-f31e-471a-b67f-977d9ded0e2e. Vendor and company-reported figures are labeled.
export const metadata: Metadata = {
  title: "The Numbers · What AI Does to the Work · Novum AI",
  description: "What controlled studies and real companies measured: 25% to 56% less time on work that suits AI, cents per task for an agent against dollars for a person, and why handing people a chatbot moves the needle about 3%.",
};

export default function NumbersPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="The numbers"
        title={<>What AI actually does to <span className="h-grad">the work</span>.</>}
        sub="On work that suits AI, controlled studies measure 25% to 56% less time per task. Hand people a login and nothing else, and it's closer to 3%. Here's what the research and real companies measured, with every source named."
        side={
          <div className="h-phero-card h-stats">
            <div><strong>25% to 56%</strong><small>less time per task in controlled studies</small></div>
            <div><strong>About $0.01</strong><small>for an agent to key an invoice, against $1.89 for a person</small></div>
            <div><strong>About 3%</strong><small>time saved when people just get a login</small></div>
          </div>
        }
      />
      <EvidenceByWork />
      <CostPerTask />
      <PhoneAgents />
      <LongTasks />
      <WhereItGoesWrong />
      <ThreeChoices />
      <CtaBand title="Find your number." body="The free AI Readiness Score gives you an estimate in two minutes. A discovery measures the real number on your own work, and ends with your first build live within 30 days." />
    </div>
  );
}
