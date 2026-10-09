import type { Metadata } from "next";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { ThreeChoices, Icon } from "@/components/PageVisuals";
import { ThreeWaysCard, WorkPicker, CostBars, WageChart, CallLog, VoiceResults, DoublingChart, WrongMeters } from "@/components/WhyAi";

// Client-facing evidence, all from "How Much Faster AI Makes the Work" (2026-10-08):
// https://claude.ai/code/artifact/ebae361d-f31e-471a-b67f-977d9ded0e2e. Vendor and company-reported figures are labeled.
export const metadata: Metadata = {
  title: "Why AI · What It Does to the Work · Novum AI",
  description: "What controlled studies and real companies measured: 25% to 56% less time on work that suits AI, cents per task for an agent against dollars for a person, and why handing people a chatbot moves the needle about 3%.",
};

export default function WhyAiPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Why implement AI"
        title={<>What AI actually does to <span className="h-grad">the work</span>.</>}
        sub="On work that suits AI, controlled studies measure 25% to 56% less time per task. Give people AI tools with no training, and it's closer to 3%. Here's what the research and real companies measured, with every source named."
        side={<ThreeWaysCard />}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="By type of work" title="On work that suits AI, the time drops by a quarter to a half." sub="Pick a kind of work. Every figure comes from a randomized trial, a field study at real companies, or a published company result, and company numbers are marked." />
          <WorkPicker />
          <p className="pv-fine">Two patterns hold across the studies: the least experienced people gain the most, often two to three times as much, and the gains only show up on tasks that suit AI.</p>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="Cost per task" title="An agent costs cents per task. A person in the same seat costs dollars." sub="Agents rarely take over a whole job, so the useful comparison is one task at a time. Task times are our estimates; agent costs use published model and voice prices." />
          <CostBars />
          <div className="h-feature" style={{ marginTop: 40, alignItems: "start" }}>
            <div>
              <h3 className="wy-h3">The real cost of the agent is the setup.</h3>
              <p className="pv-lead">The per-task prices leave out the fixed work: building the agent, connecting it to your systems, monitoring it, and keeping it current. That&apos;s what an AI Officer plan covers, so the per-task math is what you actually get.</p>
              <p className="pv-lead">The numbers favor agents on high-volume, repeatable tasks: invoices, intake, scheduling, status calls. On judgment work, the gain comes from people doing more in the same hours.</p>
            </div>
            <WageChart />
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <div className="h-feature" style={{ alignItems: "center" }}>
            <div>
              <div className="h-eyebrow">Phone calls and data entry</div>
              <h2>Where agents take over whole tasks.</h2>
              <p className="pv-lead">On calls, intake, and data entry, an agent doesn&apos;t just speed a person up. It does the task, and a person handles the ones that need judgment.</p>
            </div>
            <CallLog />
          </div>
          <div style={{ marginTop: 40 }}><VoiceResults /></div>
          <div className="pv-phone-rules">
            <div><Icon name="users" /><strong>Customers have a say</strong><p>64% of consumers said they would prefer companies not use AI for service. Calls with carriers and vendors are a different audience, and still need testing.</p><small>Gartner, 2024</small></div>
            <div><Icon name="shield" /><strong>The law applies</strong><p>The FCC treats AI voices as artificial under robocall law, so outbound AI calls need prior consent. Opening every call by saying it&apos;s an AI covers the known rules.</p><small>FCC 24-17, 2024</small></div>
            <div><Icon name="check" /><strong>A way out, every time</strong><p>Every call needs a handoff to a person on request, and someone reviewing a sample of calls each week.</p><small>How we set them up</small></div>
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap h-feature" style={{ alignItems: "center" }}>
          <div>
            <div className="h-eyebrow">Longer work</div>
            <h2>The tasks agents finish on their own keep getting longer.</h2>
            <p className="pv-lead">The length of task an AI agent can finish alone has doubled about every 4 months since 2023.</p>
            <div className="wy-mini">
              <div><strong>47.6%</strong><span>of real 7-hour deliverables from 44 occupations matched or beat the expert&apos;s work, graded blind</span></div>
              <div><strong>1.1x to 1.4x</strong><span>the real speedup once the expert&apos;s review and fixes are counted, which is why a person approves the output</span></div>
            </div>
            <small className="wy-src">OpenAI GDPval, October 2025</small>
          </div>
          <DoublingChart />
        </div>
      </section>

      <section className="h-sec h-dark">
        <div className="h-wrap h-feature" style={{ alignItems: "center" }}>
          <div>
            <div className="h-eyebrow">Where it goes wrong</div>
            <h2>Handing people a chatbot moves the numbers very little.</h2>
            <p className="pv-lead pv-lead-dark">The big gains come from three choices: picking tasks that suit AI, connecting it to your own data, and training people on where it fails. Skip them and the results look like the meters on the right.</p>
          </div>
          <WrongMeters />
        </div>
      </section>

      <ThreeChoices />

      <CtaBand title="Find your number." body="The free AI Readiness Score gives you an estimate in two minutes. A discovery measures the real number on your own work, and ends with your first build live within 30 days." />
    </div>
  );
}
