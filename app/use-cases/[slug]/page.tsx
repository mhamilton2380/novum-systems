import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { USE_CASES, getUseCase } from "@/lib/useCases";
import { NORMAL_DAY, GOV_NOTE, firmHours } from "@/lib/nv/useCaseExtras";
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
  const total = firmHours(u.departments);

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
              <tr><th scope="col">Department</th><th scope="col">Repeat work</th><th scope="col">What AI does</th><th scope="col">A person still</th><th scope="col">Hours a week</th></tr>
            </thead>
            <tbody>
              {u.departments.map((d) => (
                <tr key={d.dept}>
                  <th scope="row">{d.dept}</th>
                  <td data-l="Repeat work">{d.work}</td>
                  <td data-l="What AI does">{d.ai}</td>
                  <td data-l="A person still">{d.person}</td>
                  <td data-l="Hours a week" className="n">{d.hrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="uc-total">
            <p><b>About {total} hours a week across the firm</b> go back to work that needs a person.</p>
            <p className="fine">Our estimate for a firm of about 120 people, measured in discovery. Hours are the value of staff time, counted before the cost of the agents.</p>
          </div>
        </div>
      </section>

      <section className="sec rule">
        <div className="wrap">
          <div className="label"><span className="ix">03</span>The first agent</div>
          <h2 className="h2">The first agent worth building.</h2>
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
          <div className="label"><span className="ix">04</span>Your systems</div>
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
          <div className="label"><span className="ix">05</span>Governance</div>
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
          <div className="label"><span className="ix">06</span>How an engagement starts</div>
          <div className="uc-start">
            <div>
              <h2 className="h2">Map before we build.</h2>
              <p className="lead">Every engagement starts with a discovery: we map how the work moves, report on every tool and what it costs, write the AI usage policy, train the team and put the first agent to work.</p>
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
