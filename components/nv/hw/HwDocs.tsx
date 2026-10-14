"use client";
// How We Work: the deliverable at each step, shown as the document itself. Click-only (no auto-cycle).
// Content ported from the home page docs viewer (components/nv/home/homeEngine.js DOCS) and the old DiscoveryArtifacts.
import { useState, type ReactNode } from "react";

type Doc = { t: string; step: string; body: ReactNode };

const DOCS: Doc[] = [
  {
    t: "Workflow map",
    step: "Step 01",
    body: (
      <>
        <div className="paper-h"><b>Workflow map: quote to invoice</b><span>Client example</span></div>
        <table className="ptable">
          <thead><tr><th>Step today</th><th>Who</th><th>Time</th><th>Where AI fits</th></tr></thead>
          <tbody>
            <tr><td>Request arrives by email</td><td>Sales</td><td>10 min</td><td className="v keep">Agent reads it</td></tr>
            <tr><td>Quote built in a spreadsheet</td><td>Estimator</td><td>45 min</td><td className="v keep">Agent drafts</td></tr>
            <tr><td>Quote approved</td><td>Manager</td><td>1 day wait</td><td className="v">Stays with a person</td></tr>
            <tr><td>Job created in the system</td><td>Ops</td><td>15 min</td><td className="v swap">Connect the tools</td></tr>
            <tr><td>Invoice typed into accounting</td><td>Admin</td><td>15 min, typed twice</td><td className="v cut">Cut the double entry</td></tr>
            <tr><td>Weekly status report compiled</td><td>Manager</td><td>1 hr</td><td className="v keep">Agent drafts</td></tr>
          </tbody>
        </table>
        <p className="fine hw-pfine"><span className="hw-key k">Green:</span> where an agent takes the repeat work. <span className="hw-key c">Orange:</span> where time leaks today. Built in interviews with the people who do the work, before anything is automated.</p>
      </>
    ),
  },
  {
    t: "Tool and cost report",
    step: "Step 02",
    body: (
      <>
        <div className="paper-h"><b>Tool and cost report</b><span>Example</span></div>
        <table className="ptable">
          <thead><tr><th>Tool</th><th>Users</th><th>Per year</th><th>Call</th></tr></thead>
          <tbody>
            <tr><td>Project management</td><td>24</td><td>$14,400</td><td className="v keep">Keep, connect</td></tr>
            <tr><td>Scheduling add-on</td><td>18</td><td>$6,480</td><td className="v swap">Replace</td></tr>
            <tr><td>Document tool</td><td>24</td><td>$5,760</td><td className="v cut">Cut, overlaps</td></tr>
            <tr><td>Reporting plugin</td><td>6</td><td>$2,160</td><td className="v cut">Cut, unused</td></tr>
            <tr><td>Accounting</td><td>5</td><td>$3,000</td><td className="v keep">Keep, connect</td></tr>
          </tbody>
        </table>
        <div className="ptotal"><span>Flagged to cut or replace</span><span>$14,400 a year</span></div>
      </>
    ),
  },
  {
    t: "AI usage policy",
    step: "Step 02",
    body: (
      <>
        <div className="paper-h"><b>AI usage policy</b><span>Example</span></div>
        <div className="pol">
          <div className="ok"><h4>Fine to use AI for</h4><ul><li>Drafting emails from your own notes</li><li>Summarizing internal documents</li><li>Company questions in your own assistant</li></ul></div>
          <div className="no"><h4>Never</h4><ul><li>Client financials in public chatbots</li><li>Passwords or account numbers</li><li>Anything sent out before a person reviews it</li></ul></div>
        </div>
        <p className="fine hw-pfine">Signed off by your team, and refreshed as the tools change.</p>
      </>
    ),
  },
  {
    t: "What we built",
    step: "Step 03",
    body: (
      <>
        <div className="paper-h"><b>Launch note: what went live</b><span>Example</span></div>
        <div className="launch">
          <div><span>Custom software</span><b>Project system live, 6 years of data migrated from the old platform</b></div>
          <div><span>Connected tools</span><b>CRM and accounting in two-way sync; quotes become jobs without retyping</b></div>
          <div><span>Automation</span><b>Invoice intake agent: 98.3% on 120 of your past invoices; the controller approves every batch</b></div>
          <div><span>Ownership</span><b>Code, data and accounts in your company&apos;s name</b></div>
        </div>
      </>
    ),
  },
  {
    t: "Training library",
    step: "Step 04",
    body: (
      <>
        <div className="paper-h"><b>Training library</b><span>Example</span></div>
        <table className="ptable">
          <thead><tr><th>Session</th><th>Team</th><th>Length</th></tr></thead>
          <tbody>
            <tr><td>Working with the invoice intake agent</td><td>Accounting</td><td>42 min</td></tr>
            <tr><td>Quoting with the assistant</td><td>Sales</td><td>35 min</td></tr>
            <tr><td>Your AI usage policy, in practice</td><td>Everyone</td><td>20 min</td></tr>
            <tr><td>Finding anything in the new project system</td><td>Operations</td><td>30 min</td></tr>
          </tbody>
        </table>
        <p className="fine hw-pfine">Recorded on your own tools, with written guides. Your company keeps it for good.</p>
      </>
    ),
  },
  {
    t: "Monthly report",
    step: "Step 05",
    body: (
      <>
        <div className="paper-h"><b>Monthly report: October</b><span>Example</span></div>
        <div className="launch">
          <div><span>Agents live</span><b>4, each with an owner on your team</b></div>
          <div><span>Accuracy</span><b>98.6% across all agents; 3 misses, each added as a new test</b></div>
          <div><span>Model update</span><b>New model tested on 240 of your cases: +1.2 points, switched</b></div>
          <div><span>Tool audit</span><b>1 unused subscription cut, $2,160 a year</b></div>
          <div><span>Next up</span><b>Renewal reminders agent, starting the 14th</b></div>
        </div>
      </>
    ),
  },
];

export function HwDocs() {
  const [i, setI] = useState(0);
  const [moved, setMoved] = useState(false); // after a pick, the new document animates in on its own
  const d = DOCS[i];
  return (
    <div className="docsview hw-docs">
      <div className="docs-l">
        <span className="meta">What you get at each step</span>
        <h3>A real document at every step. Yours either way.</h3>
        <p className="hw-docs-note">Whatever you decide next, you keep the map, the tool report and the policy. Pick one to read the example.</p>
        <div className="docs-tabs held" role="tablist" aria-label="Deliverable">
          {DOCS.map((x, k) => (
            <button key={x.t} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => { setI(k); setMoved(true); }}>
              <span>0{k + 1}</span>
              <em className="hw-tab-t">{x.t}<small>{x.step}</small></em>
            </button>
          ))}
        </div>
      </div>
      <div className={moved ? "paper sw" : "paper"} key={d.t} aria-live="polite" role="tabpanel" aria-label={d.t}>
        {d.body}
      </div>
    </div>
  );
}
