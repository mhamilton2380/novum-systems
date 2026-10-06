import type { Metadata } from "next";
import { PageHero } from "@/components/PageBits";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Sign up · AI Officer · Novum AI",
  description: "Sign up for a Novum AI Officer plan. 12-month plans from $500 a month, first two months free.",
};

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return (
    <div className="home">
      <PageHero
        eyebrow="AI Officer · Sign up"
        title={<>Put AI to work, <span className="h-grad">starting this month</span>.</>}
        sub="Pick a plan and tell us about your team. We send the agreement and your first invoice within one business day, then book your first training session."
        ctas={false}
      />
      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SignupForm initialPlan={plan === "growth" ? "growth" : "basic"} />
        </div>
      </section>
    </div>
  );
}
