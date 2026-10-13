import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { IndustryCards, Guarantee } from "@/components/PageVisuals";
import { AgentDayCard, ProblemPanel, SystemPicker, KeepReplace } from "@/components/UseCaseVisuals";

import { USE_CASES, getUseCase } from "@/lib/useCases";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd, USE_CASE_SEO } from "@/lib/seo";

// Body-text links into the money pages, styled like the rest of the copy.
const BODY_LINK = { color: "var(--ink)", fontWeight: 600 } as const;

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

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();
  const others = USE_CASES.filter((o) => o.slug !== u.slug).slice(0, 4);
  const audience = USE_CASE_SEO[u.slug]?.audience ?? u.name.toLowerCase();

  return (
    <div className="home">
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "Use Cases", path: "/use-cases" }, { name: u.name, path: `/use-cases/${u.slug}` }]),
        serviceJsonLd({ name: `AI implementation for ${audience}`, serviceType: "AI implementation", path: `/use-cases/${u.slug}`, description: u.sub, audience }),
      ]} />
      <PageHero
        eyebrow={`Use case · AI for ${audience}`}
        title={u.headline + "."}
        sub={u.sub}
        side={<AgentDayCard agents={u.agents} />}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The problem" title="Where the current setup breaks." />
          <ProblemPanel u={u} />
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we build" title="The tools, built for how you run." sub="Shaped around your workflows, with your team trained on each piece. Pick one to see it work." />
          <SystemPicker u={u} />
          <p style={{ marginTop: 24, color: "var(--ink-3)", maxWidth: 760 }}>
            Every build starts with a <Link href="/how-we-work" style={BODY_LINK}>discovery that puts your first build live in 30 days</Link>. Your team learns each piece in <Link href="/training" style={BODY_LINK}>hands-on AI training on its own work</Link>, and a <Link href="/ai-officer" style={BODY_LINK}>fractional Chief AI Officer</Link> keeps building from there.
          </p>
        </div>
      </section>

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="Your software bill" title="Keep what works. Own the rest." sub="We don't rip out the tools your team relies on. We connect them, and replace the subscriptions that only cover part of the job." />
          <KeepReplace tools={u.tools} replaces={u.replaces} />
          <div style={{ marginTop: 28 }}><Guarantee compact /></div>
        </div>
      </section>

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="More use cases" title="Other industries we work with." />
          <IndustryCards cases={others.slice(0, 3)} />
          <Link href="/assessment" className="pv-qproof" style={{ textDecoration: "none", marginTop: 24 }}>
            <span><strong>How ready is your {u.name.toLowerCase()} business?</strong> Take the free AI Readiness Score: 12 questions, about 2 minutes.</span>
            <span style={{ fontWeight: 700, color: "var(--ink)" }}>Get your score →</span>
          </Link>
        </div>
      </section>

      <CtaBand title="See where AI fits in your business." />
    </div>
  );
}
