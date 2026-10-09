import type { Metadata } from "next";
import { PageHero } from "@/components/PageBits";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Get started · AI Officer · Novum AI",
  description: "Start a Novum AI Officer plan with a discovery that ends with your first build live within 30 days. 6-month minimum, then month to month.",
};

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return (
    <div className="home">
      <PageHero
        eyebrow="AI Officer · Get started"
        title={<>Your first build, <span className="h-grad">live in 30 days</span>.</>}
        sub="Every plan starts with a discovery: we map how your team works, audit your tools, train your people, and put your first build live on your own data within 30 days. You get the tool and cost report within 7. The discovery fee is quoted in writing and credited toward your plan."
        ctas={false}
      />
      <section className="h-sec h-soft">
        <div className="h-wrap">
          <SignupForm initialPlan={plan === "pro" ? "pro" : "growth"} />
        </div>
      </section>
    </div>
  );
}
