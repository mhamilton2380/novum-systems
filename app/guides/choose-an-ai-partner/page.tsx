import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { RowReveal } from "@/components/nv/RowReveal";
import { RedlineSync } from "@/components/nv/RedlineSync";
import { pageMetadata, breadcrumbJsonLd, articleJsonLd, faqJsonLd } from "@/lib/seo";
import "../../compare.css";

// Guide for "how to choose an AI implementation partner", "AI consultant questions", "FDE washing".
// Rules: no Novum prices, no guarantees, no competitor named, no hosting cost figure.
// Gartner: 70% figure from its 2026-09-29 release; fee estimate as reported by Channel Dive. Microsoft figure from July 2026 coverage.
const PATH = "/guides/choose-an-ai-partner";
const TITLE = "How to Choose an AI Implementation Partner: 5 Questions";
const DESC = "Five questions that decide whether you own your AI or rent it: whose accounts it runs in, who keeps the prompts, what happens when you stop paying, who runs it, and how it is tested.";
const GARTNER = "https://www.gartner.com/en/newsroom/press-releases/2026-09-29-gartner-predicts-70-percent-of-enterprises-will-abandon-agentic-ai-built-by-vendor-forward-deployed-engineering-by-2028";
const MSFT = "https://finance.yahoo.com/technology/ai/articles/microsoft-pours-2-5b-push-134256094.html";
const FEES = "https://www.channeldive.com/news/can-forward-deployed-engineers-fdes-fix-ai-gartner/831816/";

export const metadata: Metadata = pageMetadata({ path: PATH, title: "How to Choose an AI Implementation Partner · Novum AI", description: DESC });

// Each question: what a vendor says that leaves you renting, and what an owner should hear.
const QS = [
  {
    id: "account", sec: "Accounts and hosting", rent: "Vendor will host the Solution in Vendor's cloud environment.", own: "The Solution runs in cloud, database and AI accounts owned by Client. Vendor gets access only as Client grants it, and Client may remove it at any time.", ix: "01", label: "The account",
    h: "Whose name are the hosting, database and AI accounts in?", mute: "Whoever owns them can switch it off.",
    bad: "We host everything for you. It's simpler.",
    good: "Your accounts. We get access only when you grant it, and you can remove it any day.",
  },
  {
    id: "knowhow", sec: "Prompts and test cases", rent: "Prompts, configurations and evaluation data are Vendor's proprietary materials.", own: "Prompts, configurations and test cases belong to Client and are kept in Client's code repository.", ix: "02", label: "The know-how",
    h: "Do we get the prompts and test cases?", mute: "Without them, nobody else can safely change it.",
    lead: "Prompts are the written instructions the AI follows. Test cases are past work it gets checked against.",
    bad: "Those are part of our platform.",
    good: "They're files in your code repository, next to the code.",
  },
  {
    id: "exit", sec: "Termination", rent: "On termination, Client's access to the Solution ends.", own: "On termination, the Solution keeps running in Client's accounts, and Vendor hands over all remaining access and documentation.", ix: "03", label: "The exit",
    h: "What happens the day we stop paying you?",
    bad: "You'd need to migrate off our platform.",
    good: "Nothing breaks. It runs in your accounts, and you pay hosting and AI usage directly.",
    note: "One construction company paid $100,000 a year for a platform it rented. It now runs software it owns, and that subscription is gone.",
  },
  {
    id: "people", sec: "Operation and training", rent: "Vendor personnel will operate the Solution.", own: "Client names an owner for each system. Vendor trains that owner on Client's own work and provides written guides and recordings.", ix: "04", label: "The people",
    h: "Who on our team runs it after launch?",
    bad: "Our engineers handle all of that.",
    good: "Name the person. We train them on your own work and leave written guides and recordings.",
    note: "Teams handed AI tools with no training saved about 3% of their time (University of Chicago, 2025).",
  },
  {
    id: "proof", sec: "Acceptance", rent: "Vendor will deploy the Solution when Vendor determines it is ready.", own: "Before launch, the Solution is tested on Client's past cases with nothing sent, against a pass score both parties agree in writing first.", ix: "05", label: "The proof",
    h: "How will we know it works before it goes live?",
    bad: "Our model is 95% accurate.",
    good: "We run it on your past cases with nothing sent, and agree the pass score with you first.",
  },
];

const FAQ = [
  { q: "What is \"FDE washing\"?", a: "FDE stands for forward deployed engineers: engineers a vendor places inside your company to build AI systems. Microsoft put $2.5 billion into a unit that places about 6,000 engineers and specialists with customers (July 2026). Gartner warns of \"FDE-washing\": consulting relabeled as forward deployed engineering. Our test: can your team run and change the system after the vendor leaves?" },
  { q: "How does Novum answer these five?", a: "The code, data and accounts are in your company's name from day one, including the AI account, which you pay directly at cost. Your team is trained on its own work every month. If you stop working with us, nothing breaks." },
];

export default function ChooseAiPartnerPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "How to choose an AI implementation partner", path: PATH }]), articleJsonLd({ headline: TITLE, description: DESC, path: PATH, published: "2026-10-24" }), faqJsonLd(FAQ)]} />
      <RowReveal selector=".cl-card" />

      <section className="phero" aria-labelledby="gp-h1">
        <div className="wrap gd-hgrid">
          <div>
          <div className="label">Guide</div>
          <h1 id="gp-h1">How to choose an AI implementation partner.</h1>
          <p className="lead">Gartner expects 70% of companies to abandon AI agents built by a vendor&apos;s engineers inside the company by 2028. Two reasons: the fees keep coming, which Gartner estimates can top $200,000 a quarter for each use case, and the company can&apos;t change the system on its own. Both are decided in the contract. These are the five questions that decide it, and what good and bad answers sound like.</p>
          <p className="gd-meta">Novum AI · Updated October 24, 2026 · Sources: <a href={GARTNER} target="_blank" rel="noopener noreferrer">Gartner</a>, <a href={FEES} target="_blank" rel="noopener noreferrer">Channel Dive</a>, <a href={MSFT} target="_blank" rel="noopener noreferrer">Microsoft via Yahoo Finance</a></p>
          </div>
          <figure className="gd-doc cl-card" aria-label="Two versions of the ownership clause in an AI contract">
            <div className="gd-doc-h"><span>The clause that decides it</span><span className="meta">Example wording</span></div>
            <div className="cl-grid">
              <div className="cl rent">
                <i className="gd-tag warn">Rented</i>
                <p>&ldquo;Vendor grants Client a <mark style={{ ["--m" as string]: 0 }}>license to use</mark> the Solution <mark style={{ ["--m" as string]: 1 }}>during the Term</mark>.&rdquo;</p>
              </div>
              <div className="cl own">
                <i className="gd-tag go">Owned</i>
                <p>&ldquo;All code, prompts, test cases and data created under this agreement <mark style={{ ["--m" as string]: 2 }}>belong to Client on payment</mark> and are delivered to <mark style={{ ["--m" as string]: 3 }}>Client&apos;s own accounts</mark>.&rdquo;</p>
              </div>
            </div>
            <figcaption><span className="dot" /><span>The first clause means you rent it: <b>when the contract ends, so does your license.</b> Have your lawyer write the real clause.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gp-q-h">
        <div className="wrap rl" id="redline">
          <RedlineSync root="#redline" />
          <div className="label"><span className="ix">01</span>Five questions</div>
          <h2 className="h2" id="gp-q-h">Five clauses decide whether you own it. <span className="mute">Watch them change.</span></h2>
          <div className="rl-grid">
            <ol className="rl-steps">
              {QS.map((q, i) => (
                <li key={q.id} className="rl-step">
                  <div className="rl-n"><span>{q.ix}</span>{q.label}</div>
                  <h3>{q.h}</h3>
                  {q.mute && <p className="rl-mute">{q.mute}</p>}
                  {q.lead && <p className="rl-lead">{q.lead}</p>}
                  <dl className="rl-ans">
                    <div className="bad"><dt>Bad answer</dt><dd><q><span>{q.bad}</span></q></dd></div>
                    <div className="good"><dt>Good answer</dt><dd><q>{q.good}</q></dd></div>
                  </dl>
                  {q.note && <p className="rl-note">{q.note}</p>}
                  <div className="rl-clause rl-inline rl-done">
                    <b>&sect; {i + 1} {q.sec}</b>
                    <p><del><span className="sr-only">Deleted: </span>{q.rent}</del> <ins><span className="sr-only">Inserted: </span>{q.own}</ins></p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rl-side">
              <div className="paper rl-doc">
                <div className="paper-h"><b>AI services agreement</b><span>Example · tracked changes <em aria-hidden="true"><span className="rl-count">5</span> of 5</em></span></div>
                {QS.map((q, i) => (
                  <div key={q.id} className="rl-clause rl-done">
                    <b>&sect; {i + 1} {q.sec}</b>
                    <p><del><span className="sr-only">Deleted: </span>{q.rent}</del> <ins><span className="sr-only">Inserted: </span>{q.own}</ins></p>
                  </div>
                ))}
                <p className="rl-fine">Example wording, not legal advice. Have your lawyer write the real clauses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="gp-faq-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Questions</div>
          <h2 className="h2" id="gp-faq-h">Two more owners ask.</h2>
          <div className="gd-faq">
            {FAQ.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="sec rule contact" id="contact" aria-labelledby="gp-cta-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="gp-cta-h">Ask us all five.</h2>
            <p className="lead">A discovery ends with a working tool on your own data and a written plan for what comes next. The code, data and accounts are yours from day one.</p>
          </div>
          <ContactForm source="Guide: choose an AI partner" />
        </div>
      </section>
    </main>
  );
}
