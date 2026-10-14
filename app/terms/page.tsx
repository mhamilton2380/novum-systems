import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Legal, PH, type LegalSection } from "@/components/nv/lg/Legal";

export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms · Novum AI",
  description: "Terms for using the Novum AI website and the AI Readiness Score. Draft pending legal review.",
});

const SECTIONS: LegalSection[] = [
  { h: "About these terms", body: <p>These terms cover your use of this website, run by Novum AI (<PH>legal entity name, to be completed</PH>). By using the site you agree to them. If you do not agree, please do not use it.</p> },
  { h: "What the site is", body: <p>The site describes our services and lets you contact us or take the AI Readiness Score. It is general information for businesses, not legal, financial or other professional advice.</p> },
  { h: "Our services", body: <p>Consulting and implementation work is provided under a separate written agreement signed by both parties. If anything on this site differs from that agreement, the agreement controls. Nothing on this site is an offer to provide services on particular terms.</p> },
  { h: "The AI Readiness Score", body: (
    <>
      <p>The score and the hours estimate are based on your answers and on published studies. They are an estimate to start a conversation, not a measurement of your business and not a promise of results. Dollar figures show the value of staff time, not cash.</p>
      <p>Please answer honestly and do not enter confidential information of third parties in the form fields.</p>
    </>
  ) },
  { h: "What you send us", body: <p>When you send us information through the site, you confirm it is accurate and that you are allowed to share it. We use it as described on the <Link href="/privacy">privacy page</Link>.</p> },
  { h: "Acceptable use", body: (
    <ul>
      <li>Do not try to break, overload or gain unauthorized access to the site or its systems.</li>
      <li>Do not submit spam, malicious code or false information.</li>
      <li>Do not copy the site at scale or use it to build a competing service.</li>
    </ul>
  ) },
  { h: "Ownership", body: <p>The site&apos;s text, design and logo belong to Novum AI. You may share links to the site and quote short passages with credit. Anything you send us stays yours.</p> },
  { h: "No warranty, limited liability", body: <p>The site is provided as it is. We work to keep it accurate and available, and we do not guarantee either. To the extent the law allows, we are not liable for losses from using the site. <PH>Legal to set the exact limitation of liability</PH></p> },
  { h: "Governing law", body: <p>These terms are governed by the laws of <PH>jurisdiction, to be completed by legal</PH>.</p> },
  { h: "Changes and contact", body: <p>We may update these terms and will change the date at the top when we do. Questions go to <PH>contact email, to be completed</PH>. This draft has not yet been reviewed by a lawyer.</p> },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Terms", path: "/terms" }])]} />
      <Legal label="Terms" title="Terms for using this site." lead="Plain-English terms for the Novum AI website and the AI Readiness Score." updated="14 October 2026" sections={SECTIONS} />
    </>
  );
}
