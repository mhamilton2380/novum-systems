"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Example data: a wholesale distributor's order inbox ─────────────────────
const INBOX = [
  { from: "Harbor Plumbing Supply", subj: "PO 88213, need by Oct 14", file: "PO_88213.pdf", time: "7:42 AM" },
  { from: "Cascade Mechanical", subj: "Re: Order 4471, add 2 cases", file: "", time: "7:38 AM" },
  { from: "Northline Builders", subj: "Price on 40 ball valves, 2\"?", file: "", time: "7:31 AM" },
  { from: "Fax · Ridgeway Contractors", subj: "PO scan, 2 pages", file: "Fax_0712.pdf", time: "7:20 AM" },
];

const FIELDS = [
  ["Customer", "Harbor Plumbing Supply · HPS-118"],
  ["PO number", "88213"],
  ["Ship to", "Yard 2 · Tacoma, WA"],
  ["Need by", "Oct 14"],
];

const LINES = [
  { qty: 120, said: "1/2 PEX-A pipe 100ft", sku: "PXA-050-100", price: "$38.40", flag: false },
  { qty: 60, said: "SharkBite 1/2 coupling", sku: "SB-U008", price: "$5.12", flag: false },
  { qty: 40, said: "3/4 ball valve FIP", sku: "BV-075-F", price: "$14.85", flag: false },
  { qty: 200, said: "3/4 elbow", sku: "EL-PX-075", price: "$1.36", flag: true },
  { qty: 24, said: "Teflon tape 1/2in", sku: "TT-050", price: "$0.89", flag: false },
];

const OTHER_INBOXES = [
  { label: "Purchase orders", slug: "wholesale-distribution" },
  { label: "RFQs and drawings", slug: "manufacturing" },
  { label: "Patient referrals", slug: "healthcare" },
  { label: "Certificate requests", slug: "insurance" },
  { label: "Vendor invoices", slug: "construction" },
  { label: "Client tax documents", slug: "accounting" },
];

// Timeline, in ticks of 550ms
const T_FIELDS = 2;              // fields appear at 2..5
const T_LINES = 7;               // lines appear at 7..11
const T_FLAG = 13;               // flagged line called out
const T_PICK = 16;               // rep picks the SKU
const T_APPROVED = 18;
const T_POSTED = 20;
const T_END = 27;                // hold, then loop

export function InboxAgent() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion: show the finished state instead of animating
    const io = new IntersectionObserver(([e]) => {
      if (reduced) { if (e.isIntersecting) setT(T_POSTED); return; }
      setRunning(e.isIntersecting);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((x) => (x >= T_END ? 0 : x + 1)), 550);
    return () => clearInterval(id);
  }, [running]);

  const stage = t >= T_FLAG ? 3 : t >= T_LINES ? 2 : t >= 1 ? 1 : 0;
  const fieldsIn = Math.max(0, Math.min(FIELDS.length, t - T_FIELDS + 1));
  const linesIn = Math.max(0, Math.min(LINES.length, t - T_LINES + 1));
  const picked = t >= T_PICK;

  return (
    <div className="ia" ref={ref}>
      <div className="h-demo-bar"><i /><i /><i /><span>Example build · Order inbox agent</span></div>
      <div className="sc-head">
        <div className="sc-mark" />
        <div>
          <div className="sc-title">Order inbox agent</div>
          <div className="sc-sub">Email and fax in · draft sales order out · a rep approves</div>
        </div>
        <span className="sc-industry">Example: Wholesale distributor</span>
      </div>

      <div className="ia-flow">
        {/* 1. Inbox */}
        <div className={`ia-col${stage === 0 ? " on" : ""}`}>
          <div className="ia-colhead"><span>1</span>Lands in the inbox</div>
          <div className="ia-inbox">
            {INBOX.map((m, i) => (
              <div className={`ia-mail${i === 0 ? " first" : ""}${i === 0 && t >= 1 ? " read" : ""}`} key={m.subj}>
                <div className="ia-mail-top"><b>{m.from}</b><small>{m.time}</small></div>
                <p>{m.subj}</p>
                {m.file && <span className="ia-att"><span className="sc-file">PDF</span>{m.file}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Read */}
        <div className={`ia-col${stage === 1 ? " on" : ""}`}>
          <div className="ia-colhead"><span>2</span>Agent reads it</div>
          <div className="ia-doc">
            <div className="ia-doc-head"><span className="sc-file">PDF</span>PO_88213.pdf</div>
            <div className="ia-doc-body">
              {Array.from({ length: 9 }).map((_, i) => <i key={i} style={{ width: `${[70, 45, 88, 60, 92, 76, 84, 52, 66][i]}%` }} />)}
              {t >= 1 && t < T_LINES + 3 && <div className="ia-scan" />}
            </div>
          </div>
          <div className="ia-fields">
            {FIELDS.map(([k, v], i) => (
              <div className={`ia-field${fieldsIn > i ? " in" : ""}`} key={k}>
                <small>{k}</small><b>{v}</b><em>✓</em>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Draft */}
        <div className={`ia-col ia-wide${stage === 2 ? " on" : ""}`}>
          <div className="ia-colhead"><span>3</span>Drafts the sales order</div>
          <div className="ia-lines">
            {linesIn === 0 && <div className="ia-wait">Waiting on the PO…</div>}
            {LINES.map((l, i) => {
              const flagged = l.flag && t >= T_FLAG && !picked;
              const fixed = l.flag && picked;
              return (
                <div className={`ia-line${linesIn > i ? " in" : ""}${flagged ? " flag" : ""}${fixed ? " fixed" : ""}`} key={l.said}>
                  <span className="ia-qty">{l.qty}</span>
                  <span className="ia-desc">
                    <b>{l.flag && !picked ? "2 possible SKUs" : l.sku}</b>
                    <small>They wrote: &ldquo;{l.said}&rdquo;</small>
                  </span>
                  <span className="ia-price">{l.flag && !picked ? "?" : l.price}</span>
                  <span className={`ia-dot${l.flag && !picked ? " warn" : ""}`} />
                </div>
              );
            })}
          </div>
          <div className={`ia-total${t >= T_APPROVED ? " in" : ""}`}><span>Order total</span><b>$5,802.56</b></div>
        </div>

        {/* 4. Approve */}
        <div className={`ia-col${stage === 3 ? " on" : ""}`}>
          <div className="ia-colhead"><span>4</span>A rep approves</div>
          {t < T_FLAG && <div className="ia-wait ia-wait-box">Every order waits here for a rep to approve.</div>}
          <div className={`ia-review${t >= T_FLAG ? " in" : ""}`}>
            <div className="ia-review-q">1 line needs a rep</div>
            <p>&ldquo;3/4 elbow&rdquo; matches two items.</p>
            <div className={`ia-opt${picked ? " sel" : ""}`}>
              <b>EL-PX-075 · PEX elbow</b>
              <small>On their last 6 orders</small>
            </div>
            <div className="ia-opt">
              <b>EL-CU-075 · Copper elbow</b>
              <small>Never ordered</small>
            </div>
          </div>
          <div className={`ia-done${t >= T_APPROVED ? " in" : ""}`}>
            <div><em>✓</em>Approved by K. Ortiz in 1m 40s</div>
            <div className={t >= T_POSTED ? "in" : ""}><em>✓</em>SO-20417 created in NetSuite</div>
            <div className={t >= T_POSTED + 1 ? "in" : ""}><em>✓</em>Confirmation drafted to Harbor Plumbing</div>
          </div>
        </div>
      </div>

      <div className="ia-foot">
        <span className="ia-foot-label">Same agent, other inboxes</span>
        {OTHER_INBOXES.map((o) => <Link href={`/use-cases/${o.slug}`} key={o.label}>{o.label}</Link>)}
      </div>
    </div>
  );
}
