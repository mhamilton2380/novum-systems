import type { Metadata } from "next";

// SEO helpers: per-page metadata (canonical, Open Graph, Twitter) and schema.org JSON-LD.
// Rules (from novum-vault/CONTEXT.md): no prices, "Novum AI" only, no Portland line on the site,
// no address or contact details the site doesn't already show.
export const SITE_URL = "https://www.thenovumai.com";
export const SITE_NAME = "Novum AI";

// One sentence an AI assistant can lift as-is. Matches the category line in CONTEXT.md.
export const ENTITY_DESCRIPTION =
  "Novum AI implements AI in operational businesses of 15 to 100 people: training, agents, custom software, and a fractional Chief AI Officer. We teach your team, build the tools, connect your systems, and you own all of it.";

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
      url: SITE_URL,
      logo: `${SITE_URL}/novum-logo.png`,
      description: ENTITY_DESCRIPTION,
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
export const USE_CASE_SEO: Record<string, { audience: string; title: string }> = {
  construction: { audience: "construction companies", title: "AI for Construction Companies: Agents, Training" },
  "field-services": { audience: "field service companies", title: "AI for Field Service Companies: Agents, Training" },
  legal: { audience: "law firms", title: "AI for Law Firms: Agents, Training, and Tools" },
  accounting: { audience: "accounting firms", title: "AI for Accounting Firms: Agents and Training" },
  insurance: { audience: "insurance agencies", title: "AI for Insurance Agencies: Agents and Training" },
  healthcare: { audience: "healthcare practices", title: "AI for Healthcare Practices: Agents and Training" },
  "marketing-agencies": { audience: "marketing agencies", title: "AI for Marketing Agencies: Agents and Training" },
  manufacturing: { audience: "manufacturers", title: "AI for Manufacturers: Agents, Training, and Tools" },
  "wholesale-distribution": { audience: "wholesale distributors", title: "AI for Wholesale Distributors: Order Entry Agents" },
};
