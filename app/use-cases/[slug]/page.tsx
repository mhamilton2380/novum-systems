import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { USE_CASES, getUseCase } from "@/lib/useCases";
import { NORMAL_DAY, VIEWS, DOCS, GOV_NOTE, dayHours } from "@/lib/nv/useCaseExtras";
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
  return pageMetadata({ path: `/use-cases/${u.slug}`, title: `${seo ? seo.title : u.name} · Novum AI`, description: u.sub });
}

const PARTIES: Record<string, string> = {
  construction: "an owner, subcontractor or architect",
  "field-services": "a customer or vendor",
  legal: "a client or opposing counsel",
  accounting: "a client or taxing authority",
  insurance: "a client or carrier",
  healthcare: "a patient or payer",
  "marketing-agencies": "a client or media vendor",
  manufacturing: "a customer or supplier",
  "wholesale-distribution": "a customer or supplier",
  "real-estate-brokerage": "a client, cooperating broker or lender",
};

const STEPS = [
  { h: "Map the work", p: "We sit with your teams and map how the work moves, from first request to final document." },
  { h: "Tool report and AI policy", p: "Every tool and what it costs, what to keep, what to cut, and a written AI usage policy." },
  { h: "Build", p: "Agents, connected tools and custom software, highest impact first, each one live before the next starts." },
  { h: "Train the team", p: "Hands-on sessions on your own work and data, plus written guides and follow-up coaching." },
  { h: "Keep it current", p: "A fractional AI Officer tests new models on your work, watches every agent and keeps building." },
];

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();
  const others = USE_CASES.filter((o) => o.slug !== u.slug);
  const audience = USE_CASE_SEO[u.slug]?.audience ?? u.name.toLowerCase();
  const view = VIEWS[u.slug];
  const docs = DOCS[u.slug];
  const gov = GOV_NOTE[u.slug];
  const healthcare = u.slug === "healthcare";

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

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">01</span>The situation</div>
          <h2 className="h2">Where the current setup breaks.</h2>
          <div className="uc-cols3">
            {u.pains.map((p, i) => (
              <div key={p.title}>
                <span className="uc-no">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          {NORMAL_DAY[u.slug] && (
            <div className="uc-day">
              <div className="meta">On a normal day</div>
              <p>{NORMAL_DAY[u.slug]}</p>
            </div>
          )}
          <p className="fine">The scene above is an illustration built from typical figures, not a client record.</p>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">02</span>The work AI takes on</div>
          <h2 className="h2">Agents draft. <span className="mute">People approve.</span></h2>
          <p className="lead">An example day of agent work for {audience}. Each task is a draft or a flag, and a person reviews it before anything leaves the company.</p>
          <div className="uc-two">
            <table className="uc-ag">
              <caption className="fine" style={{ captionSide: "bottom", textAlign: "left" }}>Illustrative tasks and times. Real figures are measured in discovery on your own data.</caption>
              <thead><tr><th scope="col">Task an agent handles</th><th scope="col">Time back</th></tr></thead>
              <tbody>
                {u.agents.map((a) => (
                  <tr key={a.task}><td>{a.task}</td><td>{a.saved}</td></tr>
                ))}
              </tbody>
              <tfoot><tr><td>Returned to the team in this example day</td><td>{dayHours(u.agents)}</td></tr></tfoot>
            </table>
            <div className="uc-qs">
              <h3>Questions the assistant answers</h3>
              <ul>{u.questions.map((q) => <li key={q}>{q}</li>)}</ul>
              <p>Answers come from your live data, cite the records they used, and are limited to what the person asking may see.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>What gets built</div>
          <h2 className="h2">The tools, built for how you run. <span className="mute">Your team trained on each.</span></h2>
          <ul className="uc-builds">
            {u.builds.map((b) => (
              <li key={b.system}>
                <span className="meta">{b.system}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
          {(view || docs) && (
            <div className="uc-docs">
              {view && (
                <div>
                  <div className="paper">
                    <div className="paper-h"><b>{view.title}</b><span>Example</span></div>
                    <table className="ptable">
                      <thead><tr><th scope="col">{view.cols[0]}</th><th scope="col">{view.cols[1]}</th></tr></thead>
                      <tbody>
                        {view.rows.map((r) => (
                          <tr key={r.a}><td>{r.a}</td><td className={r.flag ? "uc-flag" : "v"}>{r.b}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="uc-cap">Your system: the main screen your team works in, with names and figures illustrative.</p>
                </div>
              )}
              {docs && (
                <div>
                  <div className="paper">
                    <div className="paper-h"><b>Documents</b><span>Example</span></div>
                    <div className="uc-search">{docs.search}</div>
                    <table className="ptable">
                      <thead><tr><th scope="col">Record</th><th scope="col">Status or access</th></tr></thead>
                      <tbody>
                        {docs.files.map((f) => (
                          <tr key={f.n + f.meta}><td>{f.n}<br /><small style={{ color: "var(--ink-3)" }}>{f.meta}</small></td><td className="v">{f.tag}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="uc-cap">Documents: searchable by meaning, with the current version on top and access set by role.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">04</span>Your software bill</div>
          <h2 className="h2">Keep what works. <span className="mute">Own the rest.</span></h2>
          <p className="lead">We do not rip out the tools your team relies on. We connect them, and replace the subscriptions that only cover part of the job.</p>
          <div className="uc-kr">
            <div>
              <h3>Keeps working, now connected</h3>
              <ul>{u.tools.map((t) => <li key={t}>{t}</li>)}</ul>
              <p>The tools your team likes stay. We connect them, so the data moves on its own. Tools named here are the ones common in {audience}; you may run others.</p>
            </div>
            <div>
              <h3>Software it can replace</h3>
              <ul>{u.replaces.map((t) => <li key={t}>{t}</li>)}</ul>
              <p>Replaced by a system you own, with unlimited seats and no renewal. The tool audit decides line by line: any tool you keep stays, and only overlapping subscriptions are retired.</p>
              <h3 style={{ marginTop: 28 }}>Manual work it removes</h3>
              <ul>{u.removes.map((t) => <li key={t}>{t}</li>)}</ul>
              <p>Work your team repeats by hand today, moved into the system and the agents.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">05</span>Governance</div>
          <h2 className="h2">Controls that ship <span className="mute">with the build.</span></h2>
          <div className="panel" style={{ marginTop: 44 }}>
            <div className="gov" style={{ marginTop: 0, borderTop: 0 }}>
              <div><h4>Approval before anything leaves</h4><p>Every agent on this page produces a draft or a flag. A person approves before it reaches {PARTIES[u.slug] ?? "a client or vendor"}.</p></div>
              <div><h4>Access by role</h4><p>The assistant and every document store limit what each person can see to what their role allows.</p></div>
              <div><h4>Your data stays yours</h4><p>AI works inside your systems on your records and never trains on them. The code, data and accounts are in your company&apos;s name.</p></div>
              <div><h4>Hosting and audit</h4><p>Hosted on SOC 2 Type 2 infrastructure, with an audit log of who viewed and changed what.</p></div>
              <div><h4>AI usage policy</h4><p>A written policy for your team on which tools and data are allowed, so unapproved AI use does not grow unseen.</p></div>
              {gov && <div><h4>{gov.h}</h4><p>{gov.p}</p></div>}
            </div>
          </div>
          {healthcare && <p className="fine">Novum does not claim HIPAA certification. Where HIPAA applies, patient data is handled under a business associate agreement, and access is limited by role.</p>}
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">06</span>How an engagement starts</div>
          <h2 className="h2">Map before we build.</h2>
          <p className="lead">Every engagement starts with a discovery that maps your work and puts the first build to work. The team is trained on each piece, and a fractional AI Officer keeps building from there.</p>
          <div className="uc-steps">
            {STEPS.map((s, i) => (
              <div key={s.h}><span className="meta">Step {i + 1}</span><h3>{s.h}</h3><p>{s.p}</p></div>
            ))}
          </div>
          <div className="uc-links">
            <Link className="link" href="/how-we-work">How we work <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/training">AI training on your own work <span aria-hidden="true">→</span></Link>
            <Link className="link" href="/ai-officer">The fractional AI Officer <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <div className="label"><span className="ix">07</span>More industries</div>
          <h2 className="h2">Other industries we work in.</h2>
          <div className="uc-more">
            {others.map((o) => (
              <Link key={o.slug} href={`/use-cases/${o.slug}`}>{o.name}<span aria-hidden="true">→</span></Link>
            ))}
          </div>
          <p className="uc-score">How ready is your team for AI? The free AI Readiness Score is 12 questions and about 2 minutes.<Link className="link" href="/assessment">Get your score <span aria-hidden="true">→</span></Link></p>
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
