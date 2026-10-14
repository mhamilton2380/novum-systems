import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import "./security.css";

export const metadata: Metadata = pageMetadata({
  path: "/security",
  title: "Security and Data · Novum AI",
  description: "Hosted on SOC 2 Type 2 infrastructure. Encrypted data, access by role, an audit log, human approval before anything leaves the company, and code, data and accounts in your name.",
});

const CONTROLS = [
  { b: "Hosting", p: "Hosted on SOC 2 Type 2 infrastructure. The audit covers the hosting provider's infrastructure that runs your system. Novum itself is not audited to that standard." },
  { b: "Encryption", p: "Data is encrypted at rest in the database and in transit between your people, your systems and ours. Documents are stored encrypted and indexed so they can be searched by meaning." },
  { b: "Access by role", p: "Every person sees what their role allows and nothing else. The AI assistant answers from the same limits: it cannot show someone a record they could not open themselves." },
  { b: "Audit log", p: "Every view and edit is recorded, with who did it and when. Agents are logged the same way, so you can see what each one read and what it produced." },
  { b: "Human approval", p: "A person approves anything before it leaves the company. Agents draft, flag and prepare. They do not send, file or pay on their own." },
  { b: "Your data never trains a model", p: "We do not use client data to train models. The AI account is opened in your company's name, so the provider relationship, billing and settings are yours." },
  { b: "Single-tenant data", p: "Each client has its own database. Your records are not stored beside another client's, and nothing is pooled across clients." },
  { b: "Accounts and code in your name", p: "The code lives in a repository your company owns. Hosting, database and AI accounts are set up under your company, with your team as owners and Novum as an administrator." },
  { b: "AI usage policy", p: "Every engagement writes down which AI tools your team may use and what data never goes into them. The policy is kept current as tools change, and your team signs off on it." },
];

const IT_REVIEW = [
  { b: "Where your data lives", p: "In accounts in your company's name. Hosting runs on Vercel and the database on Supabase, both SOC 2 Type 2. AI models are reached through Anthropic's API under your own organization. The data region is the United States by default." },
  { b: "Data processing agreement", p: "Available on request." },
  { b: "Incident notification", p: "We notify you without undue delay, and within 72 hours of confirming an incident that affects your data." },
  { b: "Subprocessor list", p: "Available on request." },
];

const TESTS = [
  { b: "A test set from your real work", s: "We collect real examples of the task, with the answers your best person would give." },
  { b: "A score before launch", s: "The agent runs on the test set. We record accuracy and the kinds of mistakes it makes." },
  { b: "Approval step in place", s: "The agent goes live with a person approving every output before it leaves the company." },
  { b: "Re-tested on every change", s: "A new model or prompt must beat the current score on your test set before it replaces what runs today." },
];

const EXIT_YES = [
  "The system keeps running. Hosting is already in your name.",
  "You keep the code, the data, the accounts and the training library.",
  "Any developer you hire can pick it up, with our written guides.",
  "We hand over every key and credential we administer, and remove our access.",
];
const EXIT_STOPS = [
  "Our monthly checks, upkeep and new builds.",
  "Our administrator access to your accounts.",
  "Training sessions and office hours.",
];

const ADDITIONAL = [
  { b: "Single sign-on", p: "Sign-in through your identity provider (Microsoft Entra ID, Okta, Google Workspace), with access removed the moment someone leaves." },
  { b: "IP allowlisting", p: "The system and its data are reachable only from your offices and VPN." },
  { b: "Customer-managed encryption keys", p: "Data encrypted with keys your company holds and can revoke." },
  { b: "Private networking and data residency", p: "A dedicated database and network, in the region your policies require." },
  { b: "Independent penetration testing", p: "An annual test by an outside firm, with the report and remediation shared with your team." },
  { b: "Regulated data", p: "HIPAA-ready configuration under a business associate agreement, and controls mapped to your SOC 2 or ISO 27001 audit." },
  { b: "Security log export", p: "Audit logs streamed to your monitoring tools, so your security team sees every access." },
  { b: "Contractual response times", p: "Written response and resolution times for security issues, set in the agreement." },
];

export default function SecurityPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Security and data", path: "/security" }])]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">Security and data</div>
          <h1>Your data stays yours, in accounts in your name.</h1>
          <p className="lead">Hosted on SOC 2 Type 2 infrastructure. Encrypted, limited by role, logged, and approved by a person before anything leaves the company.</p>
          <div className="ctas">
            <Link className="btn" href="/contact">Ask us a security question <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sc-c-h">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>Controls</div>
          <h2 className="h2" id="sc-c-h">What protects your data, <span className="mute">control by control.</span></h2>
          <div className="sc-controls">
            {CONTROLS.map((c, i) => (
              <div key={c.b}><span className="sc-n">0{i + 1}</span><b>{c.b}</b><p>{c.p}</p></div>
            ))}
          </div>
          <p className="fine">SOC 2 Type 2 is an independent audit of a provider&apos;s security controls over a period of time. It describes the infrastructure we host on. It is not a certification of Novum.</p>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="sc-t-h">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Testing</div>
          <h2 className="h2" id="sc-t-h">How agents are tested <span className="mute">before they launch.</span></h2>
          <p className="lead">An agent that passes a demo can still fail on your real work. We score it on your own examples first, and again every time something changes.</p>
          <ol className="sc-steps">
            {TESTS.map((t) => <li key={t.b}><b>{t.b}</b><span>{t.s}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="sec light" aria-labelledby="sc-e-h">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>If we stop working together</div>
          <h2 className="h2" id="sc-e-h">Nothing breaks <span className="mute">when we leave.</span></h2>
          <div className="sc-exit">
            <div><h3>What stays with you</h3><ul>{EXIT_YES.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><h3>What stops</h3><ul>{EXIT_STOPS.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
          <p className="fine">How we handle the information you send us through this website is on the <Link href="/privacy" style={{ textDecoration: "underline" }}>privacy page</Link>.</p>
        </div>
      </section>

      <section className="sec rule" aria-labelledby="sc-it-h">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>For your IT review</div>
          <h2 className="h2" id="sc-it-h">What your IT team <span className="mute">will ask for.</span></h2>
          <div className="sc-controls">
            {IT_REVIEW.map((c, i) => (
              <div key={c.b}><span className="sc-n">0{i + 1}</span><b>{c.b}</b><p>{c.p}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec light" aria-labelledby="sc-add-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Additional security</div>
          <h2 className="h2" id="sc-add-h">Stricter requirements, <span className="mute">added to the engagement.</span></h2>
          <p className="lead">Every engagement includes the controls above. Where your industry, insurer or IT policy asks for more, these levels are available as additions, scoped in discovery.</p>
          <div className="sc-controls">
            {ADDITIONAL.map((c, i) => (
              <div key={c.b}><span className="sc-n">0{i + 1}</span><b>{c.b}</b><p>{c.p}</p></div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
