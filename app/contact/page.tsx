import { ContactForm } from "@/components/nv/ContactForm";
import "./contact.css";

const STEPS = [
  { t: "You send the form", d: "The teams involved and where the time goes.", s: "2 min" },
  { t: "We reply with a time", d: "One that fits what you told us.", s: "1 day" },
  { t: "A call about your operation", d: "How the work moves and where AI fits.", s: "30 min" },
  { t: "If it fits, a discovery", d: "Work mapped, a working tool on your data.", s: "Next" },
];

const FIRST_CALL = [
  "We ask how the work moves today, team by team, and where it slows down.",
  "We ask which tools you pay for, and which ones your team works around.",
  "We ask what you have tried with AI, and what happened.",
  "We tell you where AI fits and where it does not, including when the answer is not yet.",
  "You leave knowing whether a discovery makes sense. No deck, no pressure.",
];

export default function ContactPage() {
  return (
    <main>
      <section className="phero">
        <div className="wrap">
          <div className="label">Contact</div>
          <h1>Tell us what you&apos;re running.</h1>
          <p className="lead">Every project starts with a conversation about how your business works and where AI could take work off your team. No slide deck, no sales process.</p>
        </div>
      </section>

      <section className="sec light contact" aria-labelledby="ct-h">
        <div className="wrap ct-grid">
          <div className="ct-side">
            <h3>What happens after you send the form</h3>
            <ol className="ct-steps">
              {STEPS.map((s) => (
                <li key={s.t}><div><b>{s.t}</b><span>{s.d}</span></div><em>{s.s}</em></li>
              ))}
            </ol>

            <h3>What happens next</h3>
            <p>We read what you send, then set up a call to walk through how your operation runs.</p>

            <h3>What to bring</h3>
            <p>The tools you pay for, where your team loses the most time, and what you&apos;ve tried with AI so far.</p>

            <h3>When you&apos;ll hear back</h3>
            <p>We reply the same business day, with a time that fits what you tell us in the form.</p>

            <h3>Prefer email?</h3>
            <p>Write to <a href="mailto:hello@thenovumai.com">hello@thenovumai.com</a>. Same reply, same day.</p>

            <h3>What to expect on the first call</h3>
            <ul className="ct-list">{FIRST_CALL.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>

          <div className="ct-form">
            <h2 id="ct-h">Start a conversation</h2>
            <ContactForm source="Contact page" />
          </div>
        </div>
      </section>
    </main>
  );
}
