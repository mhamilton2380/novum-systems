import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact Novum AI · Book a Conversation",
  description: "Tell us how your business runs and where AI could help. It starts with a conversation, then a free build: a working tool on your own work in two weeks.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      {children}
    </>
  );
}
