import type { MetadataRoute } from "next";
import { USE_CASES } from "@/lib/useCases";

const BASE = "https://novum-systems.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/solutions", "/use-cases", "/case-studies", "/how-we-work", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...USE_CASES.map((u) => ({ url: `${BASE}/use-cases/${u.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
