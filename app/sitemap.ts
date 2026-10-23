import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/useCases";

const BASE = "https://www.thenovumai.com";

// Bump when page copy or metadata changes, so search engines re-crawl.
const LAST_MODIFIED = new Date("2026-10-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/use-cases", "/case-studies", "/ai-implementation", "/ai-implementation/portland", "/ai-officer", "/training", "/how-we-work", "/why-ai", "/guides/how-to-implement-ai", "/guides/ai-implementation-cost", "/guides/ai-usage-policy-template", "/assessment", "/about", "/contact", "/security", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...USE_CASES.map((u) => ({ url: `${BASE}/use-cases/${u.slug}`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
