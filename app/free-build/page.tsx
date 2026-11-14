import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import "../pricing/pricing.css";
import "../contact/contact.css";
import "./fb.css";

export const metadata: Metadata = pageMetadata({
  path: "/free-build",
  title: "Free Build: One AI Tool on Your Own Work in Two Weeks · Novum AI",
  description: "One agent or tool built on your own work and data in two weeks, at no cost. Keep it at a fixed price stated up front, or stop there. One page signed, and you own what we build.",
});

const FACTS = [
  { b: "Free", s: "No fee to build it" },
  { b: "Two weeks", s: "From access to a working tool" },
  { b: "One page", s: "A data agreement is all you sign" },
  { b: "Yours", s: "Code, data and accounts" },
];

const INCLUDED = [
  { t: "The workflow, mapped", d: "Every step of the job you pick, from the document that starts it to the person who signs off, with the handoffs and the waiting marked." },
  { t: "What it costs you today", d: "Hours a week on that workflow times your loaded wage, so you see what the staff time is worth before you decide anything." },
  { t: "A working tool on your own work", d: "Built on your own documents, systems and data, in accounts your company owns. Not a demo on sample data." },
  { t: "Your people trained on it", d: "A hands-on session for the people who will use it, on their own work." },
  { t: "The keep-it price, in writing", d: "Before we start, you get the fixed price to keep the tool. No number shows up after the work is done." },
  { t: "A written handover", d: "What the tool does, where it runs, what it costs to run each month, and what we would build next if you kept going." },
];

const STEPS = [
  { t: "A 30-minute call", d: "We pick the one workflow that costs your team the most time. Someone who can say yes is on the call.", s: "Day 0" },
  { t: "One page, then access", d: "You sign the data agreement and give us read access to the tools involved, plus a few past examples to test on.", s: "Day 1" },
  { t: "We build, you check in", d: "Two short check-ins while we build. You see it working on your own work before the end.", s: "Days 2 to 10" },
  { t: "You decide", d: "Keep it at the price agreed up front, make it the start of an AI Officer engagement, or stop. Nothing is owed if you stop.", s: "Day 14" },
];

const TOOLS = [
  { href: "/ai-implementation#agents", tag: "Sales", name: "Answer every lead", d: "Calls, forms and emails answered in minutes, the appointment booked and the CRM updated." },
  { href: "/ai-implementation#agents", tag: "Finance", name: "Paperwork to paid", d: "Invoices and orders read, checked against your rules, posted once a person approves." },
  { href: "/ai-implementation", tag: "Everyone", name: "Private AI workspace", d: "Answers from your own files with sources, limited by role, in accounts you own." },
  { href: "/ai-implementation", tag: "Operations", name: "Connect your AI to your systems", d: "Claude, ChatGPT or Copilot looking things up in your software, with a log." },
  { href: "/takeoff-tool", tag: "Construction", name: "Plan set takeoff", d: "Quantities by sheet, conflicts between sheets, questions drafted for review." },
  { href: "/use-cases", tag: "By industry", name: "See builds for your industry", d: "Each industry page shows the work AI takes off the team." },
];

const RULES = [
  { t: "One tool, one workflow", d: "A tight scope is what makes two weeks possible. More workflows come after, if you want them." },
  { t: "A decision-maker in the first meeting", d: "The owner, a principal or the person who signs for software. Otherwise the decision at the end has nobody to make it." },
  { t: "What you provide", d: "Read access to the tools involved, a few past examples to test against, and about an hour a week from someone who knows the workflow." },
  { t: "Changes after handover", d: "Priced in writing before we do them. Small fixes during the two weeks are included." },
  { t: "We say so if it is not a fit", d: "If the workflow would not save real time, or the data is not reachable, we tell you on the call instead of building something you will not use." },
];

const CMP = [
  ["Built on your work and data", "Yes", "Sample data", "Yes", "Yes"],
  ["Cost to try it", "Nothing", "Free trial, then seats", "Day rate or retainer", "Your team's hours"],
  ["Something working at the end", "A tool in use", "A login", "Usually a report", "Depends who has time"],
  ["Who owns it", "Your company", "The vendor", "Varies", "Your company"],
  ["Your team trained on it", "Yes, on their own work", "Help docs", "Sometimes", "Self-taught"],
];

const FAQ = [
  { q: "Why is it free?", a: "Because a working tool on your own work is the best way to show what we do. Most teams who keep the first tool go on to build more, and that is where we make our money." },
  { q: "What do we sign?", a: "One page that covers your data: we use it only for the build, it stays in accounts your company owns, and nothing trains on it. No contract and no commitment to buy." },
  { q: "What does it cost to keep the tool?", a: "A fixed price we give you in writing before we start, based on the size of the build. Fixed-scope builds start at $7,500. Or it becomes the start of an AI Officer engagement." },
  { q: "What if we stop after two weeks?", a: "You owe nothing. We remove our access, and the workflow map and cost analysis are yours to keep." },
  { q: "We're not technical. Is that a problem?", a: "No. You need someone who knows the workflow and about an hour a week. We handle the setup, the accounts and the build." },
  { q: "Which workflow should we pick?", a: "The one your team complains about most and repeats every week: intake, invoices, reports, document review, follow-ups. If you are not sure, we suggest one on the call." },
];

export default function FreeBuildPage() {
  return (
    <main id="free-build">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Free build", path: "/free-build" }]), faqJsonLd(FAQ)]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">Free build</div>
          <h1>One tool on your own work, in two weeks. Free.</h1>
          <p className="lead">Pick the workflow your team is tired of. We build a working agent or tool on it, on your own documents and systems. Keep it at a price you saw before we started, or stop there.</p>
          <div className="ctas">
            <Link className="btn" href="#apply">Apply for a free build <span aria-hidden="true">→</span></Link>
            <Link className="btn ghost" href="/pricing">See all prices</Link>
          </div>
          <div className="fb-facts">{FACTS.map((f) => <div key={f.b}><b>{f.b}</b><span>{f.s}</span></div>)}</div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="fb-inc-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>What&apos;s included</div>
          <h2 className="h2" id="fb-inc-h">Six things you get, whether you keep it or not.</h2>
          <ol className="fb-inc">{INCLUDED.map((i) => <li key={i.t}><b>{i.t}</b><p>{i.d}</p></li>)}</ol>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="fb-how-h">
        <div className="wrap ct-grid">
          <div>
            <div className="label"><span className="ix">02</span>How it works</div>
            <h2 className="h2" id="fb-how-h">From a call to a working tool.</h2>
            <p className="lead">Two weeks from access, with two check-ins along the way.</p>
          </div>
          <ol className="ct-steps">{STEPS.map((s) => <li key={s.t}><div><b>{s.t}</b><span>{s.d}</span></div><em>{s.s}</em></li>)}</ol>
        </div>
      </section>

      <section className="sec light" aria-labelledby="fb-tools-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>What it could be</div>
          <h2 className="h2" id="fb-tools-h">Any of these can be your free build.</h2>
          <p className="lead">Example data below. Yours runs on your own work.</p>
          <div className="fb-tools">{TOOLS.map((t) => <Link key={t.name} href={t.href}><span className="meta">{t.tag}</span><b>{t.name}</b><span>{t.d}</span></Link>)}</div>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="fb-rules-h">
        <div className="wrap pr-faqwrap">
          <div>
            <div className="label"><span className="ix">04</span>Scope rules</div>
            <h2 className="h2" id="fb-rules-h">A tight scope is the point.</h2>
          </div>
          <ul className="fb-rules">{RULES.map((r) => <li key={r.t}><b>{r.t}</b><span>{r.d}</span></li>)}</ul>
        </div>
      </section>

      <section className="sec light" aria-labelledby="fb-cmp-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Against the usual paths</div>
          <h2 className="h2" id="fb-cmp-h">How a free build compares.</h2>
          <div className="paper pr-paper" style={{ marginTop: 32 }}>
            <div className="pr-tw">
              <table className="ptable fb-cmp">
                <thead><tr><th /><th>Free build</th><th>Software trial</th><th>Consultant</th><th>On your own</th></tr></thead>
                <tbody>{CMP.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{i === 1 ? <b>{c}</b> : c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="apply" aria-labelledby="fb-apply-h">
        <div className="wrap ct-grid">
          <div className="ct-side">
            <div className="label"><span className="ix">06</span>Apply</div>
            <h2 className="h2">Tell us which workflow hurts.</h2>
            <p>Or say &quot;not sure&quot; and we will suggest one on the call. Nothing is signed until you see the scope and the keep-it price in writing.</p>
            <h3>When you&apos;ll hear back</h3>
            <p>The same business day, with a time for the call.</p>
          </div>
          <div className="ct-form">
            <h2 id="fb-apply-h">Apply for a free build</h2>
            <ContactForm source="Free build page" />
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="fb-faq-h">
        <div className="wrap pr-faqwrap">
          <div>
            <div className="label"><span className="ix">07</span>Questions</div>
            <h2 className="h2" id="fb-faq-h">What people ask first.</h2>
          </div>
          <div className="pr-faq">{FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
        </div>
      </section>
    </main>
  );
}
