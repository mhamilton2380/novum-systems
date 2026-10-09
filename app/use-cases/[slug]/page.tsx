import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, CtaBand, SectionHead } from "@/components/PageBits";
import { ShadowAI, IndustryCards, Guarantee } from "@/components/PageVisuals";
import { AgentDayCard, ToolSilos, SystemPicker, KeepReplace } from "@/components/UseCaseVisuals";

// Regulated industries get the shadow-AI block, with the line that makes it their problem.
const SHADOW_NOTE: Record<string, string> = {
  insurance: "Client and policy details in a personal chatbot are an E&O exposure nobody can see.",
  accounting: "Client tax and financial data in a personal chatbot is a confidentiality and consent problem.",
  healthcare: "Patient information belongs only in tools covered by a business associate agreement, never in a personal account.",
  legal: "Client confidences in a personal chatbot are a confidentiality problem the firm can't see.",
};
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
        side={<AgentDayCard agents={u.agents} />}
      />

      <section className="h-sec">
        <div className="h-wrap">
          <SectionHead eyebrow="The problem" title="Where the current setup breaks." />
          <ToolSilos u={u} />
        </div>
      </section>

      {SHADOW_NOTE[u.slug] && <ShadowAI note={SHADOW_NOTE[u.slug]} />}

      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SectionHead eyebrow="What we build" title="The tools, built for how you run." sub="Shaped around your workflows, with your team trained on each piece. Pick one to see it work." />
          <SystemPicker u={u} />
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
