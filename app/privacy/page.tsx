import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Legal, PH, type LegalSection } from "@/components/nv/lg/Legal";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy · Novum AI",
  description: "What Novum AI collects through its website, why, where it is stored, and how to ask us to delete it. Draft pending legal review.",
});

const SECTIONS: LegalSection[] = [
  { h: "Who we are", body: <p>This site is run by Novum AI (<PH>legal entity name, to be completed</PH>). Questions about this page go to <PH>contact email, to be completed</PH>.</p> },
  { h: "What we collect", body: (
    <>
      <p>We collect only what you give us on this site.</p>
      <ul>
        <li>Contact form: name, company, work email, team size, project size, the teams involved, and your message.</li>
        <li>AI Readiness Score: your answers to the 12 questions. If you ask for the emailed write-up, we also collect your name, company, work email and company size.</li>
        <li>Basic technical logs kept by our hosting provider, such as IP address, browser type and the pages requested, used to run and protect the site.</li>
      </ul>
      <p>If you take the AI Readiness Score and do not ask for the write-up, your answers are scored in your browser and are not sent to us or stored.</p>
    </>
  ) },
  { h: "Why we use it", body: (
    <ul>
      <li>To reply to your message and set up a call.</li>
      <li>To send you the assessment write-up you asked for.</li>
      <li>To understand what businesses ask us for, so we can improve this site and our services.</li>
      <li>To keep the site secure and working.</li>
    </ul>
  ) },
  { h: "Where it is stored and who handles it", body: (
    <>
      <p>We use a small number of service providers to run the site. They handle your information only to provide their service to us.</p>
      <ul>
        <li>Supabase stores contact form and assessment submissions in a database.</li>
        <li>Resend sends the emails: the notification to us and, for the assessment, the write-up to you.</li>
        <li>Vercel hosts the website and keeps server logs.</li>
      </ul>
      <p>We do not sell your information, and we do not share it for advertising.</p>
    </>
  ) },
  { h: "Cookies and tracking", body: <p>This site does not use advertising trackers, and we do not run ad retargeting. We do not set cookies to track you across other sites. <PH>Legal to confirm if analytics or any cookie is added later</PH></p> },
  { h: "How long we keep it", body: <p>We keep submissions for as long as we need them to respond to you and keep a record of our conversations. <PH>retention period, to be confirmed by legal</PH>. You can ask us to delete your information at any time.</p> },
  { h: "Your choices", body: (
    <>
      <p>You can ask us to show you what we hold about you, correct it, or delete it. You can also ask us to stop emailing you. Email <PH>contact email, to be completed</PH> and we will respond within a reasonable time.</p>
      <p><PH>Legal to add rights that apply by state or country, if any</PH></p>
    </>
  ) },
  { h: "Information about your company", body: <p>Our client work is covered by a written agreement, which governs how we handle your company&apos;s systems and data. See <Link href="/security">Security and data</Link> for how we protect it. This page covers the website only.</p> },
  { h: "Changes", body: <p>If we change this page, we will update the date at the top. This draft has not yet been reviewed by a lawyer.</p> },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Privacy", path: "/privacy" }])]} />
      <Legal label="Privacy" title="What we collect and why." lead="Plain-English notes on the information this website collects, where it goes, and how to have it removed." updated="14 October 2026" sections={SECTIONS} />
    </>
  );
}
