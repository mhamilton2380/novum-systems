import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { USE_CASES, getUseCase } from "@/lib/useCases";

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) return {};
  return { title: `${u.name} · Novum AI`, description: u.sub };
}

const SYSTEM_IDS: Record<string, string> = {
  Core: "core", Integrations: "integrations", Vault: "vault", "AI Assistant": "assistant", Agents: "agents",
};

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();
  const others = USE_CASES.filter((o) => o.slug !== u.slug).slice(0, 4);

  return (
    <div className="home">
      <PageHero
        eyebrow={`Use case · ${u.name}`}
        title={u.headline + "."}
        sub={u.sub}
        side={
          <div className="h-phero-card">
            <div className="h-dash-label" style={{ marginBottom: 12 }}><span className="h-live" style={{ color: "#cbd5e1" }}><i />Agents working today</span></div>
            <div className="h-agentlist">
              {u.agents.map((a) => (
                <div key={a.task} style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#e2e8f0" }}>
                  <i>✓</i><span>{a.task}</span><small style={{ color: "#34d399" }}>{a.saved}</small>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The problem" title="Where the current setup breaks." />
          <div className="h-grid3">
            {u.pains.map((p, i) => (
              <div className="h-card2" key={p.title}>
                <div className="h-num" style={{ color: "#0e7490", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: 14 }}>0{i + 1}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we build" title="One system, built for how you run." sub="Five pieces, shaped around your workflows. You use the ones you need." />
          <div className="h-grid3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {u.builds.map((b) => (
              <Link href={`/solutions#${SYSTEM_IDS[b.system]}`} className="h-card2" key={b.system}>
                <span className="h-card2-tag">{b.system}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap h-feature">
          <div>
            <div className="h-eyebrow">AI Assistant</div>
            <h2>Questions your team can finally just ask.</h2>
            <p className="h-feature-sub">The assistant answers from your live data, across every system we connect, and only shows people what their role allows.</p>
            <div className="h-chiprow" style={{ marginBottom: 12 }}>
              <small>Connects with tools like</small>
              {u.tools.map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="h-chiprow">
              <small>Replaces</small>
              {u.replaces.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
          <div className="h-demo">
            <div className="h-demo-bar"><i /><i /><i /><span>AI Assistant</span></div>
            <div style={{ padding: 22, background: "#fcfdfe" }}>
              <div className="h-qs">
                {u.questions.map((q) => <div className="h-q" key={q}>{q}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="More use cases" title="Other industries we build for." />
          <div className="h-grid4">
            {others.map((o) => (
              <Link href={`/use-cases/${o.slug}`} className="h-card2" key={o.slug}>
                <span className="h-card2-tag">{o.name}</span>
                <h3>{o.headline}</h3>
                <div className="h-more">See the use case →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="See what this looks like for your business." />
    </div>
  );
}
