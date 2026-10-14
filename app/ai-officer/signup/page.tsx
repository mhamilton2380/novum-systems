import type { Metadata } from "next";
import { PageHero } from "@/components/PageBits";
import { SignupForm } from "./SignupForm";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/ai-officer/signup",
  title: "Get Started with an AI Officer · Novum AI",
  description: "Start a Novum AI Officer plan with a discovery that ends with your first build live. 6-month minimum, then month to month.",
});

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return (
    <div className="home">
      <JsonLd data={[breadcrumbJsonLd([{ name: "AI Officer", path: "/ai-officer" }, { name: "Get started", path: "/ai-officer/signup" }])]} />
      <PageHero
        eyebrow="AI Officer · Get started"
        title={<>Start with a <span className="h-grad">discovery</span>.</>}
        sub="Every plan starts with a discovery: we map how your team works, audit your tools, train your people, and put your first build live on your own data. You get the tool and cost report within 7 days. The discovery fee is quoted in writing and credited toward your plan."
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
