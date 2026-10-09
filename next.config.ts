import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/solutions", destination: "/ai-officer", permanent: true },
      { source: "/systems", destination: "/ai-officer", permanent: true },
      { source: "/work", destination: "/ai-officer", permanent: true },
      { source: "/build", destination: "/ai-officer", permanent: true },
      { source: "/case-studies/:slug", destination: "/case-studies", permanent: true },
      { source: "/enterprise", destination: "/how-we-work", permanent: true },
      { source: "/approach", destination: "/how-we-work", permanent: true },
      { source: "/the-numbers", destination: "/why-ai", permanent: true },
    ];
  },
};

export default nextConfig;
