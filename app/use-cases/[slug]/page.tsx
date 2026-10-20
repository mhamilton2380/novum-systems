import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { USE_CASES, getUseCase } from "@/lib/useCases";
import { NORMAL_DAY, GOV_NOTE } from "@/lib/nv/useCaseExtras";
import { industryHours, RATES, SOURCES, OWN_USE_RATE, OFFICE, FIRM } from "@/lib/nv/hoursModel";
import { SCENARIOS } from "@/lib/nv/useCaseScenarios";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/nv/ContactForm";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, USE_CASE_SEO } from "@/lib/seo";
import "../use-cases.css";

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) return {};
  const seo = USE_CASE_SEO[u.slug];
  return pageMetadata({ path: `/use-cases/${u.slug}`, title: `${seo ? seo.title : u.name} · Novum AI`, description: seo?.description ?? u.sub });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();
  const others = USE_CASES.filter((o) => o.slug !== u.slug);
  const audience = USE_CASE_SEO[u.slug]?.audience ?? u.name.toLowerCase();
  const gov = GOV_NOTE[u.slug];
  const hrs = industryHours(u.slug);
  const pct = (x: number) => `${Math.round(x * 100)}%`;
  const srcLabel = (k: string | null) =>
    k && SOURCES[k] ? <>Our estimate, using <a href={SOURCES[k].url} target="_blank" rel="noopener noreferrer">{SOURCES[k].label}</a></> : "Our estimate, measured in discovery";
  const unit = OFFICE[u.slug]?.unit ?? "office employee";
  const scenarios = SCENARIOS[u.slug] ?? [];
  const n = (i: number) => String(i).padStart(2, "0");
  let ix = 2;

  return (
    <main>
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "Use Cases", path: "/use-cases" }, { name: u.name, path: `/use-cases/${u.slug}` }]),
        serviceJsonLd({ name: `AI implementation for ${audience}`, serviceType: "AI implementation", path: `/use-cases/${u.slug}`, description: u.sub, audience }),
      ]} />

      <section className="phero">
        <div className="wrap">
          <div className="label">Industries · AI for {audience}</div>
          <h1>{u.headline}.</h1>
          <p className="lead">{u.sub}</p>
          <div className="ctas">
            <Link className="btn" href="#contact">Start a conversation</Link>
            <Link className="btn ghost" href="/assessment">Take the AI Readiness Score</Link>
          </div>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The situation</div>
          <h2 className="h2">Where the hours go in {audience}.</h2>
          <p className="lead">{u.situation}</p>
          {NORMAL_DAY[u.slug] && (
            <div className="uc-day">
              <div className="meta">On a normal day</div>
              <p>{NORMAL_DAY[u.slug]}</p>
            </div>
          )}
          <p className="fine">The scene above is an illustration built from typical figures, not a client record.</p>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>By department</div>
          <h2 className="h2">Where AI takes the hours back. <span className="mute">A person still decides.</span></h2>
          <table className="uc-dt">
            <thead>
              <tr><th scope="col">Department</th><th scope="col">Repeat work</th><th scope="col">What AI does</th><th scope="col">A person still</th><th scope="col">Hours a week today</th></tr>
            </thead>
            <tbody>
              {u.departments.map((d) => (
                <tr key={d.dept}>
                  <th scope="row">{d.dept}</th>
                  <td data-l="Repeat work">{d.work}</td>
                  <td data-l="What AI does">{d.ai}</td>
                  <td data-l="A person still">{d.person}</td>
                  {(() => {
                    const h = hrs?.depts.find((x) => x.dept === d.dept);
                    return <td data-l="Hours a week today" className="n">{h ? Math.round(h.today) : ""}</td>;
                  })()}
                </tr>
              ))}
            </tbody>
          </table>
          {hrs && (
            <div className="uc-total">
              <div className="uc-two">
                <div>
                  <div className="meta">Repeat work in a {FIRM}-person firm</div>
                  <p className="uc-big">{Math.round((hrs.agents.today + hrs.catches.today) / 10) * 10} hours <span>every week, on the work in the table above</span></p>
                  <p>That is about {Math.round((hrs.agents.today + hrs.catches.today) / hrs.week)} full-time people reading, keying, checking and chasing the same kinds of work every week. Agents take the first pass on all of it, and a person approves.</p>
                </div>
                <div>
                  <div className="meta">What our clients cut</div>
                  <p className="uc-big">85 to 95% <span>less time on the work we build</span></p>
                  <p>A construction company: bank draw applications went from 10 hours to 1.5, submittal reviews from 4 hours to 15 minutes. A 15-person bookkeeping firm: data entry down 95%. Your numbers are measured in discovery, on your own work.</p>
                </div>
              </div>
              <details className="uc-how">
                <summary>The most cautious version, and how we count it</summary>
                <table className="uc-lay">
                  <thead><tr><th scope="col">Where the hours come from</th><th scope="col">Hours spent now</th><th scope="col">Hours saved</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">Agents on the department work in the table above</th><td>{Math.round(hrs.agents.today)}</td><td>{Math.round(hrs.agents.back)}</td></tr>
                    <tr><th scope="row">The checks in &ldquo;What it catches&rdquo; below ({hrs.catches.counted} of ten; the rest are already inside a department row)</th><td>{Math.round(hrs.catches.today)}</td><td>{Math.round(hrs.catches.back)}</td></tr>
                    <tr><th scope="row">Everyday AI use by the whole team after training: {hrs.office} {u.slug === "real-estate-brokerage" ? "agents and staff" : "office staff"} at {hrs.week} hours a week, minus the work above, saving {(OWN_USE_RATE * 100).toFixed(1)}% (the average measured across workers who use AI)</th><td>{Math.round(hrs.ownUse.base)}</td><td>{Math.round(hrs.ownUse.back)}</td></tr>
                    <tr className="uc-lay-t"><th scope="row">Total hours saved a week, rounded</th><td /><td>{hrs.total}</td></tr>
                  </tbody>
                </table>
                <p className="fine">The most cautious math: published study averages, spread across everyone in the firm, including people who barely use AI. Even at those rates the firm gets back about {hrs.total} hours a week. Work rebuilt around an agent saves far more, as the client results above show. Professionals surveyed by Thomson Reuters expect about 5 hours a week (<a href={SOURCES.tr.url} target="_blank" rel="noopener noreferrer">2025</a>).</p>
                <p className="fine">{u.slug === "real-estate-brokerage" ? `${OFFICE[u.slug].basis}.` : `Office staff: ${hrs.office} of ${FIRM}. ${OFFICE[u.slug].basis} (BLS staffing patterns, May 2025). Field crews, clinicians and floor staff are not counted.`}</p>
                <ul className="uc-rates">
                  {(Object.keys(RATES) as (keyof typeof RATES)[]).map((k) => (
                    <li key={k}><b>{pct(RATES[k].rate)}</b> {RATES[k].what}. <a href={SOURCES[RATES[k].src].url} target="_blank" rel="noopener noreferrer">{SOURCES[RATES[k].src].label}</a></li>
                  ))}
                  <li><b>{(OWN_USE_RATE * 100).toFixed(1)}%</b> Workers who use AI save this share of their hours. <a href={SOURCES.stlfed.url} target="_blank" rel="noopener noreferrer">{SOURCES.stlfed.label}</a>. In a UK government trial, 20,000 staff given Copilot reported 26 minutes a day, about the same (<a href={SOURCES.ukgov.url} target="_blank" rel="noopener noreferrer">2025</a>). A study of 25,000 Danish workers found 2.8% (<a href={SOURCES.humlum.url} target="_blank" rel="noopener noreferrer">Humlum and Vestergaard, 2025</a>).</li>
                </ul>
                <details className="uc-inputs">
                  <summary>Inputs by department and check</summary>
                  <ul>
                    {hrs.depts.map((d) => (
                      <li key={d.dept}><b>{d.dept}:</b> {d.people} people, {d.hrsEach} hours a week each. {d.basis} <span className="mute">{srcLabel(d.src)}.</span></li>
                    ))}
                    {hrs.catches.items.map((c) => (
                      <li key={c.title}><b>{c.title}:</b> {c.overlap ? `counted in ${c.overlap} above.` : `${c.hrsToday} hours a week today. ${c.basis}`} {!c.overlap && <span className="mute">{srcLabel(c.src)}.</span>}</li>
                    ))}
                  </ul>
                </details>
                <p className="fine">AI also does worse on some work (in the Harvard and BCG study, accuracy fell 19 points on tasks outside its range), which is why a person reviews everything. Hours are the value of staff time, counted before the cost of the agents.</p>
              </details>
            </div>
          )}
        </div>
      </section>

      {scenarios.length > 0 && (
        <section className="sec light">
          <div className="wrap">
            <div className="label"><span className="ix">{n(++ix)}</span>What it catches</div>
            <h2 className="h2">Ten jobs, ten catches. <span className="mute">The kind that cost real money when missed.</span></h2>
            <ol className="uc-sc">
              {scenarios.map((sc, i) => (
                <li key={sc.title}>
                  <div className="uc-sc-h">
                    <span className="uc-sc-no">{n(i + 1)}</span>
                    <span className="meta">{sc.dept}</span>
                  </div>
                  <h3>{sc.title}</h3>
                  <p>{sc.ai}</p>
                  <div className="uc-sc-catch"><div className="meta">What it catches</div><p>{sc.catch}</p></div>
                  <div className="uc-sc-who"><div className="meta">Who approves</div><p>{sc.person}</p></div>
                </li>
              ))}
            </ol>
            <p className="fine">Illustrations of typical work in this industry, not client records. Results are measured in discovery.</p>
          </div>
        </section>
      )}

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">{n(++ix)}</span>The first build</div>
          <h2 className="h2">The first build worth making.</h2>
          <div className="first">
            <div>
              <div className="meta">Start here</div>
              <h3>{u.firstAgent.name}</h3>
            </div>
            <div className="uc-fa">
              <div><div className="meta">Why it comes first</div><p>{u.firstAgent.why}</p></div>
              <div><div className="meta">How it is scored before launch</div><p>{u.firstAgent.scored}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">{n(++ix)}</span>Your systems</div>
          <h2 className="h2">What it connects to.</h2>
          <p className="lead">Agents work inside the tools your team already runs. Tools named here are common in {audience}; yours may differ.</p>
          <ul className="uc-tools">{u.tools.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="uc-kr">
            <div>
              <h3>Software it can replace</h3>
              <ul>{u.replaces.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div>
              <h3>Manual work it removes</h3>
              <ul>{u.removes.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
          <p className="uc-rule">We recommend replacing a tool only when owning the software costs less than what you spend on it today. The tool report in discovery decides line by line.</p>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">{n(++ix)}</span>Governance</div>
          <h2 className="h2">Controls for {audience}, <span className="mute">in place before launch.</span></h2>
          <div className="gov">
            {gov && <div><h4>{gov.h}</h4><p>{gov.p}</p></div>}
            <div><h4>Who approves what</h4><p>{u.approval}</p></div>
            <div><h4>Access, hosting and ownership</h4><p>Access is set by role, every view and change is logged, and AI never trains on your records. Hosted on SOC 2 Type 2 infrastructure, with the code, data and accounts in your company&apos;s name.</p></div>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">{n(++ix)}</span>How an engagement starts</div>
          <div className="uc-start">
            <div>
              <h2 className="h2">Map before we build.</h2>
              <p className="lead">Every engagement starts with a discovery: we map how the work moves, report on every tool and what it costs, write the AI usage policy, train the team and put the first build to work.</p>
              <div className="uc-links">
                <Link className="link" href="/how-we-work">How we work <span aria-hidden="true">→</span></Link>
                <Link className="link" href="/training">AI training on your own work <span aria-hidden="true">→</span></Link>
                <Link className="link" href="/ai-officer">The fractional AI Officer <span aria-hidden="true">→</span></Link>
              </div>
            </div>
            <div>
              <div className="meta">Other industries</div>
              <div className="uc-more">
                {others.map((o) => (
                  <Link key={o.slug} href={`/use-cases/${o.slug}`}>{o.name}<span aria-hidden="true">→</span></Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec light contact" id="contact" aria-labelledby="contact-h">
        <div className="wrap grid">
          <div>
            <div className="label">Start a conversation</div>
            <h2 className="h2" id="contact-h">See where AI fits in your business.</h2>
            <p className="lead">A first call about how your teams work and where AI fits. We reply the same business day.</p>
          </div>
          <ContactForm source={`Industry: ${u.name}`} />
        </div>
      </section>
    </main>
  );
}
