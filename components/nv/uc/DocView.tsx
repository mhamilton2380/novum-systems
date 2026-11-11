// Draws one stage's document (lib/nv/walks/types.ts DocView) the way the person really sees it:
// a sheet, a binder index, a coverage matrix, a required-versus-actual form, side-by-side sheets,
// or a message with the record drafted from it. Parts appear in order as the agent reads (`shown`),
// the flagged cells light at `lit`, and turn to the resolved tint once a person approves.
import { Fragment } from "react";
import type { DocView as View, KV } from "@/lib/nv/walks/types";

// Number of reveal steps a view takes; the walk's timing runs off this.
export function viewSteps(v: View): number {
  switch (v.kind) {
    case "sheet": return v.rows.length + (v.total ? 1 : 0) + (v.foot?.length ? 1 : 0);
    case "packet": return v.sections.length;
    case "matrix": return v.rows.length + (v.notes?.length ? 1 : 0);
    case "form": return v.fields.length + (v.foot ? 1 : 0);
    case "compare": return v.panes.length + (v.foot ? 1 : 0);
    case "message": return 1 + v.reply.lines.length;
    case "calendar": return (v.from ? 1 : 0) + v.events.length;
    case "redline": return v.clauses.length;
    case "board": return v.rows.length + (v.foot ? 1 : 0);
    case "recon": return v.rows.length + 1;
    case "record": return v.sections.length + (v.lines?.length ? 1 : 0);
    case "bars": return v.bars.length + (v.note ? 1 : 0);
  }
}

type P = { view: View; shown: number; lit: boolean; resolved: boolean; head?: boolean };

export function DocView({ view, shown, lit, resolved, head = true }: P) {
  const rv = (i: number) => (shown > i ? " in" : "");
  const fl = (on?: boolean) => (on && lit ? (resolved ? " fx" : " fl") : "");
  return (
    <div className={`uc-dv uc-dv-${view.kind}`}>
      {head && <div className="uc-dv-head"><b>{view.title}{view.stamp && <span className="uc-dv-stamp">{view.stamp}</span>}</b><small>{view.meta}</small></div>}
      <div className="uc-dv-scroll">
        {view.kind === "sheet" && <Sheet v={view} rv={rv} fl={fl} />}
        {view.kind === "packet" && <Packet v={view} rv={rv} fl={fl} />}
        {view.kind === "matrix" && <Matrix v={view} rv={rv} fl={fl} />}
        {view.kind === "form" && <Form v={view} rv={rv} fl={fl} />}
        {view.kind === "compare" && <Compare v={view} rv={rv} fl={fl} />}
        {view.kind === "message" && <Message v={view} rv={rv} fl={fl} />}
        {view.kind === "calendar" && <Calendar v={view} rv={rv} fl={fl} />}
        {view.kind === "redline" && <Redline v={view} rv={rv} fl={fl} />}
        {view.kind === "board" && <Board v={view} rv={rv} fl={fl} />}
        {view.kind === "recon" && <Recon v={view} rv={rv} fl={fl} />}
        {view.kind === "record" && <Record v={view} rv={rv} fl={fl} />}
        {view.kind === "bars" && <Bars v={view} rv={rv} fl={fl} />}
      </div>
    </div>
  );
}

type R = { rv: (i: number) => string; fl: (on?: boolean) => string };

function Foot({ items, cls, fl }: { items: KV[]; cls: string; fl: R["fl"] }) {
  return (
    <dl className={`uc-dv-kv${cls}`}>
      {items.map((x, _i) => <div className={fl(x.flag)} key={_i}><dt>{x.k}</dt><dd>{x.v}</dd></div>)}
    </dl>
  );
}

function Sheet({ v, rv, fl }: { v: Extract<View, { kind: "sheet" }> } & R) {
  const num = new Set(v.num ?? []);
  const noteAt = v.cols.length > 2 ? 1 : 0;
  const n = v.rows.length;
  return (
    <>
      <table className="uc-dv-t">
        <thead><tr>{v.cols.map((c, i) => <th scope="col" className={num.has(i) ? "n" : ""} key={i}>{c}</th>)}</tr></thead>
        <tbody>
          {v.rows.map((r, ri) => (
            <tr className={`${rv(ri)}${fl(r.flag)}`} key={ri}>
              {r.cells.map((c, ci) => {
                const Tag = ci === 0 ? "th" : "td";
                return (
                  <Tag scope={ci === 0 ? "row" : undefined} className={`${num.has(ci) ? "n" : ci === noteAt ? "w" : ""}${fl(r.flagCells?.includes(ci))}`} key={ci}>
                    {c}
                    {r.note && ci === noteAt && <small>{r.note}</small>}
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
        {v.total && (
          <tfoot><tr className={rv(n)}>{v.total.map((c, i) => i === 0 ? <th scope="row" key={i}>{c}</th> : <td className={num.has(i) ? "n" : ""} key={i}>{c}</td>)}</tr></tfoot>
        )}
      </table>
      {v.foot && <Foot items={v.foot} cls={rv(n + (v.total ? 1 : 0))} fl={fl} />}
    </>
  );
}

function Packet({ v, rv, fl }: { v: Extract<View, { kind: "packet" }> } & R) {
  return (
    <ol className="uc-dv-pk">
      {v.sections.map((s, i) => (
        <li className={rv(i)} key={i}>
          <div className="uc-dv-pk-tab"><span>Tab {i + 1}</span>{s.name}</div>
          <ul>
            {s.items.map((it, _i) => (
              <li className={fl(it.flag)} key={_i}>
                <span className="uc-dv-ref">{it.ref}</span>
                <span>{it.text}</span>
                <em aria-hidden="true">{it.flag ? "?" : "✓"}</em>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function Matrix({ v, rv, fl }: { v: Extract<View, { kind: "matrix" }> } & R) {
  return (
    <>
      <table className="uc-dv-t uc-dv-mx">
        <thead><tr><th scope="col">{v.corner}</th>{v.cols.map((c, _i) => <th scope="col" key={_i}>{c}</th>)}</tr></thead>
        <tbody>
          {v.rows.map((r, ri) => (
            <tr className={rv(ri)} key={ri}>
              <th scope="row">{r.name}{r.sub && <small>{r.sub}</small>}</th>
              {r.cells.map((c, ci) => (
                <td className={`s-${c.s ?? "ok"}${fl(c.s === "flag")}`} key={ci}>
                  {c.s === "na" && !c.v ? <span aria-label="Not applicable">·</span> : c.v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {v.notes && (
        <ul className={`uc-dv-notes${rv(v.rows.length)}`}>
          {v.notes.map((x, _i) => <li className={fl(x.flag)} key={_i}>{x.text}</li>)}
        </ul>
      )}
    </>
  );
}

function Form({ v, rv, fl }: { v: Extract<View, { kind: "form" }> } & R) {
  return (
    <>
      <table className="uc-dv-t uc-dv-fm">
        <thead><tr>{v.heads.map((h, _i) => <th scope="col" key={_i}>{h}</th>)}<th scope="col" className="n"><span className="uc-jw-sr">Result</span></th></tr></thead>
        <tbody>
          {v.fields.map((f, i) => (
            <tr className={rv(i)} key={i}>
              <th scope="row">{f.label}</th>
              <td>{f.want}</td>
              <td className={`uc-dv-got${fl(f.flag)}`}>{f.got}</td>
              <td className="n uc-dv-mark">{f.flag ? (fl(true) ? "✗" : "") : "✓"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {v.foot && <p className={`uc-dv-draft${rv(v.fields.length)}`}><small>Drafted</small>{v.foot}</p>}
    </>
  );
}

function Compare({ v, rv, fl }: { v: Extract<View, { kind: "compare" }> } & R) {
  return (
    <>
      <div className="uc-dv-cmp" style={{ ["--n" as string]: v.panes.length }}>
        {v.panes.map((p, i) => (
          <div className={`uc-dv-pane${rv(i)}`} key={i}>
            <div className="uc-dv-pane-h"><b>{p.ref}</b><small>{p.name}</small></div>
            <dl>{p.lines.map((x, _i) => <div className={fl(x.flag)} key={_i}><dt>{x.k}</dt><dd>{x.v}</dd></div>)}</dl>
          </div>
        ))}
      </div>
      {v.foot && <p className={`uc-dv-draft${rv(v.panes.length)}`}><small>Logged</small>{v.foot}</p>}
    </>
  );
}

function Message({ v, rv, fl }: { v: Extract<View, { kind: "message" }> } & R) {
  const m = v.msg;
  return (
    <div className="uc-dv-msg">
      <div className={`uc-dv-mail${rv(0)}`}>
        <dl className="uc-dv-mail-h">
          <div><dt>From</dt><dd>{m.from}</dd></div>
          <div><dt>To</dt><dd>{m.to}</dd></div>
          <div><dt>Date</dt><dd>{m.date}</dd></div>
        </dl>
        <b className="uc-dv-subj">{m.subject}</b>
        {m.body.map((x, _i) => <p className={fl(x.flag)} key={_i}>{x.text}</p>)}
      </div>
      <div className="uc-dv-rec">
        <div className={`uc-dv-rec-h${rv(1)}`}><b>{v.reply.name}</b><small>{v.reply.status}</small></div>
        <dl className="uc-dv-kv">
          {v.reply.lines.map((x, i) => <div className={`${rv(i + 1)}${fl(x.flag)}`} key={i}><dt>{x.k}</dt><dd>{x.v}</dd></div>)}
        </dl>
      </div>
    </div>
  );
}

function Calendar({ v, rv, fl }: { v: Extract<View, { kind: "calendar" }> } & R) {
  const off = v.from ? 1 : 0;
  return (
    <div className="uc-dv-cal">
      {v.from && <div className={`uc-dv-cal-from${rv(0)}`}><small>Counted from</small><b>{v.from}</b></div>}
      <ol>
        {v.events.map((e, i) => (
          <li className={`${rv(off + i)}${fl(e.flag)}`} key={i}>
            <div className="uc-dv-day" aria-label={`${e.month} ${e.day}`}><small>{e.month}</small><b>{e.day}</b>{e.weekday && <em>{e.weekday}</em>}</div>
            <div className="uc-dv-ev"><b>{e.label}</b><span>{e.basis}</span></div>
            <span className="uc-dv-st">{e.status}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Redline({ v, rv, fl }: { v: Extract<View, { kind: "redline" }> } & R) {
  return (
    <div className="uc-dv-red">
      <div className="uc-dv-red-key"><span><del>Struck</del> was in {v.versions[0]}</span><span><ins>Inserted</ins> is new in {v.versions[1]}</span></div>
      {v.clauses.map((c, i) => (
        <div className={`uc-dv-cl${rv(i)}`} key={i}>
          <span className="uc-dv-cl-ref">{c.ref}</span>
          <p>
            {c.parts.map((x, k) => x.op === "del"
              ? <del className={fl(x.flag)} key={k}>{x.t}</del>
              : x.op === "ins" ? <ins className={fl(x.flag)} key={k}>{x.t}</ins>
              : <span className={fl(x.flag)} key={k}>{x.t}</span>)}
          </p>
          {c.note && <aside className={fl(c.flag || c.parts.some((x) => x.flag))}>{c.note}</aside>}
        </div>
      ))}
    </div>
  );
}

function Board({ v, rv, fl }: { v: Extract<View, { kind: "board" }> } & R) {
  const n = v.slots.length;
  const pct = (x: number) => `${(x / n) * 100}%`;
  return (
    <div className="uc-dv-board">
      <div className="uc-dv-bh"><span />{<div>{v.slots.map((x, _i) => <span key={_i}>{x}</span>)}</div>}</div>
      {v.rows.map((r, i) => {
        // blocks that overlap an earlier block drop to a second lane, so a double booking reads as two bars
        const lane = r.blocks.map((b, k) => r.blocks.slice(0, k).some((a) => b.start < a.start + a.span && a.start < b.start + b.span) ? 1 : 0);
        const two = lane.includes(1);
        return (
          <div className={`uc-dv-br${rv(i)}`} key={i}>
            <b>{r.name}{r.sub && <small>{r.sub}</small>}</b>
            <div className={`uc-dv-track${two ? " two" : ""}`} style={{ backgroundSize: `${100 / n}% 100%` }}>
              {r.blocks.map((b, k) => (
                <i className={`${b.tone ? `t-${b.tone}` : ""}${two ? ` l${lane[k]}` : ""}${fl(b.flag)}`} style={{ left: pct(b.start), width: pct(b.span) }} key={k}>{b.label}</i>
              ))}
            </div>
          </div>
        );
      })}
      {v.foot && <p className={`uc-dv-draft${rv(v.rows.length)}`}>{v.foot}</p>}
    </div>
  );
}

function Recon({ v, rv, fl }: { v: Extract<View, { kind: "recon" }> } & R) {
  const eq = (r: { cells: string[]; flag?: boolean }, k: number) => {
    if (!r.cells[k] || !r.cells[k - 1]) return r.flag ? "≠" : "";
    return r.flag ? "≠" : "=";
  };
  return (
    <>
      <table className="uc-dv-t uc-dv-rc">
        <thead>
          <tr>
            <th scope="col">Item</th>
            {v.sides.map((x, k) => (
              <Fragment key={k}>{k > 0 && <th aria-hidden="true" />}<th scope="col" className="n">{x}</th></Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {v.rows.map((r, i) => (
            <tr className={`${rv(i)}${fl(r.flag)}`} key={i}>
              <th scope="row">{r.ref}{r.label && <small>{r.label}</small>}</th>
              {r.cells.map((c, k) => (
                <Fragment key={k}>
                  {k > 0 && <td className="uc-dv-eq" aria-hidden="true">{eq(r, k)}</td>}
                  <td className="n">{c || <span className="uc-dv-none">none</span>}</td>
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className={rv(v.rows.length)}>
            <th scope="row">Total</th>
            {v.totals.map((t, k) => <Fragment key={k}>{k > 0 && <td aria-hidden="true" />}<td className="n">{t}</td></Fragment>)}
          </tr>
        </tfoot>
      </table>
      <Foot items={[v.diff]} cls={rv(v.rows.length)} fl={fl} />
    </>
  );
}

function Record({ v, rv, fl }: { v: Extract<View, { kind: "record" }> } & R) {
  const n = v.sections.length;
  return (
    <div className="uc-dv-card">
      {v.id && <div className="uc-dv-id">{v.id}</div>}
      {v.sections.map((sec, i) => (
        <section className={rv(i)} key={i}>
          <h5>{sec.name}</h5>
          <dl>
            {sec.fields.map((f, _i) => (
              <div className={fl(f.flag)} key={_i}><dt>{f.k}</dt><dd>{f.v}{f.note && <small>{f.note}</small>}</dd></div>
            ))}
          </dl>
        </section>
      ))}
      {v.lines && v.lines.length > 0 && (
        <table className={`uc-dv-t uc-dv-codes${rv(n)}`}>
          <tbody>
            {v.lines.map((l, _i) => (
              <tr className={`in${fl(l.flag)}`} key={_i}>
                <th scope="row">{l.code}</th>
                <td>{l.text}</td>
                <td className="n">{l.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function Bars({ v, rv, fl }: { v: Extract<View, { kind: "bars" }> } & R) {
  const max = v.max ?? Math.max(...v.bars.map((b) => b.value), v.target?.value ?? 0);
  const w = (x: number) => `${Math.max(0, Math.min(100, (x / max) * 100))}%`;
  return (
    <div className="uc-dv-bars">
      {v.target && <div className="uc-dv-tgt"><span style={{ left: w(v.target.value) }}>{v.target.label}</span></div>}
      {v.bars.map((b, i) => (
        <div className={`uc-dv-bar${rv(i)}${fl(b.flag)}`} key={i}>
          <span>{b.label}{b.sub && <small>{b.sub}</small>}</span>
          <i>
            <b style={{ width: w(b.value) }} />
            {v.target && <u style={{ left: w(v.target.value) }} aria-hidden="true" />}
          </i>
          <em>{b.display}</em>
        </div>
      ))}
      {v.note && <p className={`uc-dv-draft${rv(v.bars.length)}`}>{v.note}</p>}
    </div>
  );
}
