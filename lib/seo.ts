import type { Metadata } from "next";

// SEO helpers: per-page metadata (canonical, Open Graph, Twitter) and schema.org JSON-LD.
// Rules (from novum-vault/CONTEXT.md): no prices, "Novum AI" only, Portland as the home city (city only, no street address; 2026-10-20),
// no address or contact details the site doesn't already show.
export const SITE_URL = "https://www.thenovumai.com";
export const SITE_NAME = "Novum AI";

// One sentence an AI assistant can lift as-is. Matches the category line in CONTEXT.md.
export const ENTITY_DESCRIPTION =
  "Novum AI implements AI in operational businesses with no one whose job is AI: training, agents, custom software, and a fractional Chief AI Officer. We teach your team, build the tools, connect your systems, and you own all of it.";

// Per-page metadata. `path` is the canonical path ("/" for home). Pages pass their own title and description;
// canonical and og:url are set here so no page can inherit another page's canonical.
export function pageMetadata({ path, title, description }: { path: string; title: string; description: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

const ORG_ID = `${SITE_URL}/#organization`;

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "thenovumai",
      url: SITE_URL,
      logo: `${SITE_URL}/novum-logo.png`,
      description: ENTITY_DESCRIPTION,
      disambiguatingDescription: "Novum AI at thenovumai.com is an AI implementation firm for operational businesses. It is not affiliated with the AI receptionist, sales-coaching or Telegram bot products of the same name.",
      email: "hello@thenovumai.com",
      address: { "@type": "PostalAddress", addressLocality: "Portland", addressRegion: "OR", addressCountry: "US" },
      areaServed: [{ "@type": "City", name: "Portland, Oregon" }, { "@type": "Country", name: "United States" }],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "hello@thenovumai.com", url: `${SITE_URL}/contact` },
      // Company profiles only. Never a person's profile (CONTEXT.md: Michael stays in the background).
      sameAs: ["https://www.linkedin.com/company/thenovumai"],
      slogan: "You own all of it.",
      knowsAbout: [
        "AI implementation",
        "AI training for teams",
        "AI agents",
        "Custom software",
        "Software integrations",
        "Fractional Chief AI Officer",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": ORG_ID },
    },
  ],
};

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

// No offers or prices: the site says "start with discovery".
export function serviceJsonLd({ name, description, path, serviceType, audience }: { name: string; description: string; path: string; serviceType: string; audience?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    ...(audience ? { audience: { "@type": "BusinessAudience", name: audience } } : {}),
  };
}

// Guides: the company is the author until the CEO co-founder is named. No Person schema.
export function articleJsonLd({ headline, description, path, published, modified }: { headline: string; description: string; path: string; published: string; modified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    datePublished: published,
    dateModified: modified ?? published,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path === "/" ? "" : it.path}` })),
  };
}

// Search-facing names for each industry page: title keyword, audience, and eyebrow.
// Slugs must match lib/useCases.ts.
export const USE_CASE_SEO: Record<string, { audience: string; title: string; description?: string }> = {
  construction: { audience: "construction companies", title: "AI for Construction Companies: Agents, Training" },
  "field-services": { audience: "field service companies", title: "AI for Field Service Companies: Agents, Training" },
  legal: { audience: "law firms", title: "AI for Law Firms: Agents, Training, and Tools", description: "We train your attorneys and staff on real matters, build tools around how your firm works, and wall off privileged material by role." },
  accounting: { audience: "accounting firms", title: "AI for Accounting Firms: Agents and Training", description: "We train your team on real engagements, build agents for document requests and deadline tracking, and connect the tools your firm uses." },
  insurance: { audience: "insurance agencies", title: "AI for Insurance Agencies: Agents and Training" },
  healthcare: { audience: "healthcare practices", title: "AI for Healthcare Practices: Agents and Training", description: "We train your staff to use AI safely, build tools for scheduling, intake and billing, with access by role and an audit trail on every record." },
  "marketing-agencies": { audience: "marketing agencies", title: "AI for Marketing Agencies: Agents and Training" },
  manufacturing: { audience: "manufacturers", title: "AI for Manufacturers: Agents, Training, and Tools", description: "We train your team on daily operations, build tools for orders, inventory and production status, and connect them to your ERP and accounting." },
  "wholesale-distribution": { audience: "wholesale distributors", title: "AI for Wholesale Distributors: Order Entry Agents", description: "We train inside sales and customer service on real orders, build agents that read the order inbox and draft the entry, and connect your ERP." },
  "real-estate-brokerage": { audience: "real estate brokerages", title: "AI for Real Estate Brokerages: Agents, Training", description: "We train agents and coordinators on real deals, build agents for file work, follow-up and marketing, and connect your CRM and transaction tools." },
};
