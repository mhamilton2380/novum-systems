import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/useCases";

const BASE = "https://www.thenovumai.com";

// Bump when page copy or metadata changes, so search engines re-crawl.
const LAST_MODIFIED = new Date("2026-10-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/use-cases", "/case-studies", "/ai-implementation", "/ai-officer", "/training", "/how-we-work", "/why-ai", "/assessment", "/about", "/contact", "/security", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...USE_CASES.map((u) => ({ url: `${BASE}/use-cases/${u.slug}`, lastModified: LAST_MODIFIED, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
