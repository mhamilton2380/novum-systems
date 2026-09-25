import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/parked", "/api/"] },
    sitemap: "https://novum-systems.vercel.app/sitemap.xml",
  };
}
