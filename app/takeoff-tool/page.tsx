import type { Metadata } from "next";
import "./takeoff.css";

// Unlisted: linked from outreach emails only. Not in the nav, the sitemap or search results.
export const metadata: Metadata = {
  title: "The takeoff tool · Novum AI",
  description: "A plan set taken off line by line, with every conflict between sheets flagged, before an estimator touches it.",
  robots: { index: false, follow: false },
};

const GETS = [
  { t: "Quantities in your trade", d: "Every line names the sheet it came from and how it was taken off: counted, measured, calculated, or an allowance where the drawings don't show it." },
  { t: "Conflicts, written as RFIs", d: "Where the sheets disagree, what it costs, and a question ready to send to the architect." },
  { t: "A 3D model of the building", d: "Switch between finishes and fire ratings. Click any wall to see its quantity." },
];

export default function TakeoffToolPage() {
  return (
    <main>
      <section className="phero">
        <div className="wrap">
          <div className="label">Takeoff tool</div>
          <h1>547 line items. 65 conflicts. One plan set.</h1>
          <p className="lead">Real quantities and conflicts from one multifamily plan set, before an estimator touched it. Here is how it works, in 83 seconds.</p>
        </div>
      </section>

      <section className="tk-video">
        <div className="wrap">
          <video className="tk-player" controls playsInline preload="metadata" poster="/videos/takeoff-tool-poster.jpg">
            <source src="/videos/takeoff-tool.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="sec tk-gets">
        <div className="wrap">
          <div className="label">What your estimators get</div>
          <ol className="tk-list">
            {GETS.map((g, i) => (
              <li key={g.t}>
                <span className="ix">{`0${i + 1}`}</span>
                <b>{g.t}</b>
                <p>{g.d}</p>
              </li>
            ))}
          </ol>
          <p className="tk-note">Your estimators check it, send the RFIs and price it. Nothing goes out without them. Everything we build is yours, hosted on SOC 2 Type II infrastructure.</p>
        </div>
      </section>

      <section className="sec tk-cta">
        <div className="wrap">
          <h2>Pick a set you&apos;ve already bid. <span>We&apos;ll run it in your office.</span></h2>
          <p className="lead">We&apos;re local, in Portland. Your estimators in the room, and we sign your NDA first.</p>
          <div className="tk-who">
            <div>
              <b>Dalton Byrne</b>
              <span>AI Implementation Manager, Novum AI</span>
            </div>
            <div className="ctas">
              <a className="btn" href="mailto:dalton@thenovumai.com?subject=Takeoff%20tool">Email Dalton</a>
              <a className="btn ghost" href="tel:+15037077017">(503) 707-7017</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
