import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import "./case-studies.css";

export const metadata: Metadata = pageMetadata({
  path: "/case-studies",
  title: "Results: Three Engagements, Measured · Novum AI",
  description: "A construction company replaced a $100,000-a-year platform with a system it owns. A real estate developer cut routine project paperwork by 85 to 94% per task. A bookkeeping firm cut data entry by 95%.",
});

const BEFORE = [
  { title: "$100,000 a year, every year", body: "The company paid six figures annually for a project management platform, and the price only went up as the business grew." },
  { title: "Billing ran on its own system", body: "Their billing ran on a custom application and process the platform could not fit, so the same project data got entered twice." },
  { title: "Routine paperwork by hand", body: "Project managers spent hours every week on PCOs, RFIs and submittal reviews, assembled from drawings, specs and field notes." },
];

const RESULTS = [
  { task: "Bank draw applications", from: "10 hrs", to: "1.5 hrs", cut: "85% less time", note: "Per application." },
  { task: "Submittal review against plan sets and owner specs", from: "4 hrs", to: "15 min", cut: "94% less time", note: "The agent drafts a summary and flags issues for the project manager." },
  { task: "Deferred submittals", from: "3.5 hrs", to: "20 min", cut: "90% less time", note: "Now an automated review a person checks." },
  { task: "Owner reports", from: "2 hrs", to: "15 min", cut: "88% less time", note: "Built from the project files and the daily management software." },
];

const BUILT = [
  { tag: "Rebuilt", title: "The platform, rebuilt around how they run projects", body: "We rebuilt the platform they were paying for around how they run jobs: projects, schedules, RFIs, submittals and change orders." },
  { tag: "Connected", title: "Connected to their billing", body: "The new system talks to their custom billing application, so project and billing data stay in sync and their billing process did not have to change." },
  { tag: "Agents", title: "Routine paperwork, drafted", body: "Agents draft PCOs, RFIs, submittal reviews and billing from project documents and field notes. A project manager reviews each one." },
];

const LEDGER = [
  { what: "The software bill", before: "$100,000 a year, rising as they grew", after: "They now pay only hosting, storage and security" },
  { what: "Project and billing data", before: "Typed into two systems by hand", after: "Entered once, synced to billing on its own" },
  { what: "Routine paperwork", before: "Written from scratch, hours every week", after: "Starts as an agent draft. The project manager reviews and sends" },
  { what: "How the software fits", before: "The team bent its process to the platform", after: "Built around how they already run jobs" },
  { what: "Who owns it", before: "Per-seat licenses, renewed every year", after: "Code, data and accounts in the company's name" },
  { what: "Growing the business", before: "More people meant more license fees", after: "More projects and people add no license fees" },
];

export default function ResultsPage() {
  return (
    <main>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Results", path: "/case-studies" }])]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">Results</div>
          <h1>Three engagements, measured.</h1>
          <p className="lead">A construction company replaced a $100,000-a-year platform with a system it owns. A real estate developer put agents on its routine project paperwork and cut the time per task by 85 to 94%. A bookkeeping firm cut its data entry by 95% and now sends every client a monthly report built for them.</p>
          <div className="ctas">
            <Link className="btn" href="#contact">Start a conversation</Link>
            <Link className="btn ghost" href="/use-cases">See industries</Link>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>Construction company: before</div>
          <h2 className="h2">$100,000 a year for software <span className="mute">that did not fit.</span></h2>
          <div className="rs-three">
            {BEFORE.map((b) => (
              <div key={b.title}><h3>{b.title}</h3><p>{b.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>Construction company: what we built</div>
          <h2 className="h2">One system, built around <span className="mute">how they run projects.</span></h2>
          <div className="rs-split">
            <ul className="rs-built">
              {BUILT.map((b) => (
                <li key={b.title}><span className="meta">{b.tag}</span><h3>{b.title}</h3><p>{b.body}</p></li>
              ))}
            </ul>
            <div className="rs-rfi">
              <div className="paper">
                <div className="paper-h"><b>RFI, draft</b><span>Example</span></div>
                <dl>
                  <div><dt>Subject</dt><dd>Beam size at grid line C does not match the architectural set</dd></div>
                  <div><dt>References</dt><dd>Structural sheet S-201, architectural sheet A-301</dd></div>
                  <div><dt>Question</dt><dd>Please confirm which beam size governs at grid C, levels 2 and 3, before steel is ordered.</dd></div>
                </dl>
                <p className="rs-files">Attached: field note, photos 1 to 3, sheet S-201</p>
                <p className="rs-by">Drafted by the RFI agent from a field note, 3 photos and the spec. The project manager reviews, edits and sends.</p>
              </div>
              <p className="rs-cap">The agent reads the field note, the photos and the drawings it references, then drafts in the company&apos;s format. Nothing leaves without a person. The example above is illustrative.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>Construction company: after</div>
          <h2 className="h2">Lower cost, fewer hours, <span className="mute">same process.</span></h2>
          <table className="rs-ledger">
            <thead><tr><th scope="col">What changed</th><th scope="col">Before</th><th scope="col">After</th></tr></thead>
            <tbody>
              {LEDGER.map((r) => (
                <tr key={r.what}><td>{r.what}</td><td>{r.before}</td><td>{r.after}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Real estate developer: measured results</div>
          <h2 className="h2">Four tasks, timed <span className="mute">before and after.</span></h2>
          <p className="lead">A real estate developer put agents on the paperwork its project managers rebuild for every project. Each figure is the time one instance of the task takes, before the agent and after. A project manager reviews every draft.</p>
          <div className="rs-results">
            {RESULTS.map((r) => (
              <div className="rs-res" key={r.task}>
                <h3>{r.task}</h3>
                <div className="rs-n">{r.from}<span aria-label="to">to</span>{r.to}</div>
                <div className="rs-cut">{r.cut}</div>
                <p>{r.note}</p>
              </div>
            ))}
          </div>
          <p className="fine">Automated follow-ups on open submittals save about 10 minutes each. These are per-task times, not yearly totals: monthly volumes have not been measured yet, so no annual hours figure is claimed.</p>
        </div>
      </section>

      <section className="sec light" aria-labelledby="rs-bk-h">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Bookkeeping firm</div>
          <h2 className="h2" id="rs-bk-h">Data entry down 95%. <span className="mute">A monthly report built for every client.</span></h2>
          <p className="lead">A 15-person bookkeeping firm keyed client data and assembled each client&apos;s monthly package by hand. Agents now do the entry and draft each client&apos;s report and cover email. A bookkeeper approves every one before it goes out.</p>
          <div className="rs-split">
            <ul className="rs-built">
              <li><span className="meta">Data entry</span><h3>95% less data entry</h3><p>The entry staff used to key by hand is done by agents. Staff review only what the agent flags.</p></li>
              <li><span className="meta">Reporting</span><h3>A report customized per client</h3><p>Each client&apos;s monthly financials are generated in the format and detail that client needs, then approved by their bookkeeper.</p></li>
              <li><span className="meta">Client email</span><h3>The email drafts itself</h3><p>Once the report is approved, the agent drafts the email to the client with the financials attached and a list of items that need the client&apos;s attention.</p></li>
            </ul>
            <div className="rs-rfi">
              <div className="paper">
                <div className="paper-h"><b>Monthly financials, draft email</b><span>Example</span></div>
                <dl>
                  <div><dt>To</dt><dd>Owner, client 214</dd></div>
                  <div><dt>Attached</dt><dd>September financials: P&amp;L, balance sheet, cash flow</dd></div>
                  <div><dt>Needs your attention</dt><dd>Two receipts missing for card charges over $500. One vendor bill with no matching purchase order. Sales tax due October 31.</dd></div>
                </dl>
                <p className="rs-by">Drafted by the reporting agent after the bookkeeper approved the financials. The bookkeeper reviews and sends.</p>
              </div>
              <p className="rs-cap">The example above is illustrative.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>Scope of this evidence</div>
          <h2 className="h2">What these results show, <span className="mute">and what they do not.</span></h2>
          <ul className="rs-scope" style={{ marginTop: 44 }}>
            <li><b>Three clients</b><span>The results come from three engagements: the platform replacement for a construction company, the paperwork agents for a real estate developer, and the data entry and client reporting agents for a bookkeeping firm. More results are added here as they are measured.</span></li>
            <li><b>Per-task times</b><span>The real estate developer figures are time per instance, before and after. Without monthly volumes there is no yearly hours or dollar total, and none is claimed.</span></li>
            <li><b>The bill</b><span>The construction company&apos;s platform cost $100,000 a year. They now pay only hosting, storage and security. The exact current cost is not published.</span></li>
            <li><b>Human review</b><span>Every agent output is a draft. A project manager reviews, edits and sends, and nothing leaves the company without a person.</span></li>
            <li><b>Ownership</b><span>In every engagement, code, data and accounts are in the client&apos;s name. If a client stopped working with Novum, nothing would break.</span></li>
          </ul>
        </div>
      </section>

      <section className="sec light contact" id="contact" aria-labelledby="contact-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="contact-h">What is your software bill buying you?</h2>
            <p className="lead">Bring the bill. We map what each tool does for you, what it costs, and what owning the important ones would take. We reply the same business day.</p>
          </div>
          <ContactForm source="Results" />
        </div>
      </section>
    </main>
  );
}
