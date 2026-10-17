import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, articleJsonLd, faqJsonLd } from "@/lib/seo";
import "../../compare.css";

// Guide for "AI usage policy template", "AI policy for employees". The template is ported from the
// Discovery Audit Kit (novum-vault/docs/discovery-audit-kit.md, "AI usage policy starter"). Company byline only.
const PATH = "/guides/ai-usage-policy-template";
const TITLE = "AI Usage Policy Starter Template for Small Business";
const DESC = "A free one-page AI usage policy starter for small businesses: approved tools, what data can go where, six rules for staff, and what a full policy adds.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: "AI Usage Policy Template: A One-Page Starter · Novum AI", description: DESC });

const DATA = [
  { d: "Public", e: "Website text, published prices", co: "Yes", any: "Yes" },
  { d: "Internal", e: "Procedures, internal emails, schedules", co: "Yes", any: "No" },
  { d: "Confidential", e: "Client records, financials, contracts, employee data", co: "Yes, approved tools only", any: "Never" },
  { d: "Restricted", e: "Health records, Social Security numbers, card numbers, anything a contract forbids", co: "Only where an approved agent is built for it", any: "Never" },
];

const RULES = [
  "A person reviews anything AI drafts before it goes to a client, vendor, regulator or the public.",
  "Check facts, numbers and names. AI can be confidently wrong.",
  "Don't use AI to make decisions about hiring, firing, pay or credit.",
  "AI phone agents say they're AI at the start of every call and hand off to a person on request.",
  "If you're unsure whether something is allowed, ask the policy owner first.",
  "Report mistakes. A caught mistake improves the tool; a hidden one repeats.",
];

const HOW = [
  { h: "Ask before you write", p: "Survey the team first: which AI tools they use, on which accounts, for what. The answers show where company data is already going." },
  { h: "Keep it to one page", p: "Write it for staff, not lawyers. A policy nobody reads protects nobody. Have your counsel review it before you issue it." },
  { h: "Give people a safe tool", p: "A ban without an approved company account sends work back to personal accounts. Name the tools people should use." },
  { h: "Train on it", p: "Walk the team through real examples from their own week: what can go into the AI, and when a person has to check its work." },
  { h: "Name an owner", p: "One person answers questions, approves new tools, and reviews the policy every six months or when a tool is added." },
  { h: "Log what the AI does", p: "Company accounts with an audit log show who used what, on which data, and who approved the result." },
];

// What the discovery version adds. Shows the gap between a starter and the full policy.
const FULL = [
  { h: "Data rules for each system", p: "Which records in your accounting, CRM, document and email systems each AI tool may read, by role." },
  { h: "Vendor and model review", p: "Where each AI provider stores data, whether it trains on it, and the terms that apply, checked before a tool is approved." },
  { h: "Your industry's rules", p: "Health privacy, client confidentiality, financial records and the terms in your client contracts, written into the rules." },
  { h: "When the AI gets it wrong", p: "Who to tell, how a mistake is fixed and logged, and when a build is paused until it passes again." },
  { h: "A sign-off log", p: "Who approved each tool and each agent, what data it can see, and who owns it." },
  { h: "Training on it", p: "A session on the team's own examples, recorded for the library, and a refresher whenever a tool is added." },
];

const FAQ = [
  { q: "What is an AI usage policy?", a: "A one-page set of rules for staff: which AI tools are approved, what company data can go into them, who reviews AI output before it leaves the company, and who owns the policy." },
  { q: "Does a small business need an AI policy?", a: "Yes, if anyone on the team uses AI for work. Without one, staff use personal accounts and paste in client files, and nobody knows where company data has gone." },
  { q: "Should we ban personal AI accounts?", a: "For company work, yes, and replace them with approved company accounts at the same time. A ban without an approved tool pushes the work out of sight." },
  { q: "Is this template legal advice?", a: "No. It is a starter written for staff. A full policy adds data rules for each system, vendor review, your industry\u2019s rules and a sign-off log. Have your counsel review any policy before you issue it." },
  { q: "How often should the policy change?", a: "Review it every six months, and whenever a new AI tool is approved. AI tools change every few weeks, so the approved list will too." },
];

export default function AiUsagePolicyPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "AI usage policy template", path: PATH }]), articleJsonLd({ headline: TITLE, description: DESC, path: PATH, published: "2026-10-17" }), faqJsonLd(FAQ)]} />

      <section className="phero" aria-labelledby="gp-h1">
        <div className="wrap">
          <div className="label">Guide · Free starter template</div>
          <h1 id="gp-h1">An AI usage policy your team will actually read.</h1>
          <p className="lead">An AI usage policy tells staff which AI tools to use, what company data can go into them, and who checks the output before it leaves the company. Below is a one-page starter you can copy. It is where every policy we write begins; the full version is built from your team, your systems and your industry&apos;s rules.</p>
          <p className="gd-meta">Novum AI · Updated October 17, 2026 · Not legal advice: have your counsel review it before you issue it.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gp-tpl-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The template</div>
          <h2 className="h2" id="gp-tpl-h">[Your company] AI use policy. <span className="mute">A starter: copy it, then fill in the brackets.</span></h2>
          <article className="gp-doc" aria-label="AI usage policy template">
            <h3>Why we use AI</h3>
            <p>To take repetitive work off your plate so you can spend time on the work that needs you. AI helps you; you are still responsible for what goes out.</p>
            <h3>Approved tools</h3>
            <p>Use only these, on company accounts: [list your approved tools, for example a team plan of ChatGPT, Claude or Microsoft Copilot, and any company assistant or agents]. Personal AI accounts are not allowed for company work.</p>
            <h3>What data can go where</h3>
            <div className="cmp-wrap" style={{ marginTop: 16 }}>
              <table className="cmp">
                <thead><tr><th scope="col">Data</th><th scope="col">Examples</th><th scope="col">Company AI tools</th><th scope="col">Anywhere else</th></tr></thead>
                <tbody>{DATA.map((x) => <tr key={x.d}><td>{x.d}</td><td data-l="Examples">{x.e}</td><td data-l="Company AI tools">{x.co}</td><td data-l="Anywhere else">{x.any}</td></tr>)}</tbody>
              </table>
            </div>
            <h3>Rules</h3>
            <ol>{RULES.map((r) => <li key={r}>{r}</li>)}</ol>
            <h3>Who owns this policy</h3>
            <p>[Name]. Reviewed every six months, or when a new tool is added.</p>
          </article>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gp-full-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>The full policy</div>
          <h2 className="h2" id="gp-full-h">What the full policy covers. <span className="mute">Written in discovery, on your company.</span></h2>
          <p className="lead">The starter covers what every team needs on day one. The policy we write in a discovery adds six parts that depend on your systems, your data and the rules your industry follows.</p>
          <div className="gov">
            {FULL.map((f) => <div key={f.h}><h4>{f.h}</h4><p>{f.p}</p></div>)}
          </div>
          <p style={{ marginTop: 36 }}><Link className="link" href="/how-we-work">How a discovery works <span aria-hidden="true">→</span></Link></p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gp-how-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Putting it in place</div>
          <h2 className="h2" id="gp-how-h">Six steps to make the policy stick.</h2>
          <div className="gov">
            {HOW.map((h) => <div key={h.h}><h4>{h.h}</h4><p>{h.p}</p></div>)}
          </div>
          <div className="gd-next">
            <Link className="link" href="/guides/how-to-implement-ai">How to implement AI: a 5-step plan <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/security">How we handle your data <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/assessment">Score your company in 2 minutes <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gp-faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Questions</div>
          <h2 className="h2" id="gp-faq-h">What owners ask about AI policies.</h2>
          <div className="gd-faq">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="contact" aria-labelledby="gp-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="gp-cta-h">Want the policy written on your company?</h2>
            <p className="lead">Every discovery includes an AI usage policy built from your team&apos;s survey and interviews, plus a training session on it, and ends with your first build live.</p>
          </div>
          <ContactForm source="Guide: AI usage policy template" />
        </div>
      </section>
    </main>
  );
}
