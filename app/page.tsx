import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { HOME_DEFS, HOME_MAIN } from "@/components/nv/home/homeHtml";
import { HomeClient } from "@/components/nv/home/HomeClient";
import { ContactForm } from "@/components/nv/ContactForm";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Novum AI · AI Implementation and Consulting, Portland",
  description: "AI implementation and consulting for companies with no one whose job is AI, based in Portland, Oregon. Training, agents, custom software. You own all of it.",
});

export default function Home() {
  return (
    <>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: HOME_DEFS }} />
      <main id="home">
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: HOME_MAIN }} />
        <section className="sec light contact" id="contact" aria-labelledby="contact-h">
          <div className="wrap grid">
            <div>
              <div className="label">Start a conversation</div>
              <h2 className="h2" id="contact-h">Tell us where the hours go.</h2>
              <p className="lead">A first call about how your teams work and where AI fits. We reply the same business day.</p>
              <div className="alt"><Link className="btn ghost" href="/contact">More ways to reach us</Link></div>
            </div>
            <ContactForm source="Home page" />
          </div>
        </section>
      </main>
      <HomeClient />
    </>
  );
}
