// Unlisted demo page: the QR code on the real estate brochures points here. Not in the menu or the sitemap.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offer desk demo · Novum AI",
  description: "Drop an offer into a working AI agent and watch it get read, checked, drafted and ranked. Sample data.",
  robots: { index: false, follow: false },
};

const STEPS = [
  { t: "Drop in an offer", d: "PDF or email. It pulls every term and shows the exact words it came from." },
  { t: "It checks itself", d: "A separate checker tests every number against the original before anything can be approved." },
  { t: "You approve the drafts", d: "A seller summary and a receipt to each buyer's broker. Nothing sends until you say so." },
  { t: "You set the weights", d: "It ranks the offers your way, then drafts the recommendation for your seller." },
];

export default function OfferDeskDemo() {
  return (
    <main>
      <section className="phero">
        <div className="wrap">
          <div className="label">Demo · sample data</div>
          <h1>Drop in an offer. Watch it get read, checked and drafted.</h1>
          <p className="lead">A working agent on a fictional $5 million warehouse listing. Every property, person and company in it is made up.</p>
        </div>
      </section>

      <section className="sec light">
        <div className="wrap">
          <video
            src="/demos/offer-desk.mp4"
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", borderRadius: 14, display: "block", background: "#050d18" }}
          />
          <ol className="steps demo-steps">
            {STEPS.map((s, i) => (
              <li key={s.t}><span className="meta">{String(i + 1).padStart(2, "0")}</span><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
          <p style={{ marginTop: 48 }}>
            <Link className="btn" href="/contact">Book a 30-minute walkthrough <span aria-hidden="true">→</span></Link>
          </p>
        </div>
      </section>
    </main>
  );
}
