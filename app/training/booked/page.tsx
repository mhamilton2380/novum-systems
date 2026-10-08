import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageBits";

export const metadata: Metadata = { title: "Training booked · Novum AI", robots: { index: false } };

export default function BookedPage() {
  return (
    <div className="home">
      <PageHero
        eyebrow="Training day"
        title={<>You&apos;re booked. <span className="h-grad">We&apos;ll confirm your date.</span></>}
        sub="Stripe is emailing your receipt. We'll reply within one business day to lock in the date from the ones you gave us and ask what your team does all day, so the examples are theirs."
        ctas={false}
      />
      <section className="h-sec">
        <div className="h-wrap">
          <Link href="/" className="h-btn h-btn-primary">Back to the site</Link>
        </div>
      </section>
    </div>
  );
}
