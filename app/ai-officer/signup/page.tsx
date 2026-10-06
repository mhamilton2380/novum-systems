import type { Metadata } from "next";
import { PageHero } from "@/components/PageBits";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Get started · AI Officer · Novum AI",
  description: "Start a Novum AI Officer plan with a discovery that ends with your first agent live. Plans from $3,500 a month, 6-month minimum.",
};

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return (
    <div className="home">
      <PageHero
        eyebrow="AI Officer · Get started"
        title={<>Your first agent, <span className="h-grad">live in weeks</span>.</>}
        sub="Every plan starts with a discovery: we map how your team works, audit your tools, train your people, and put your first agent live on your own data. It runs $2,500 for a 10-person team up to $15,000, and the fee is credited toward your plan."
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
