import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/systems", destination: "/solutions", permanent: true },
      { source: "/work", destination: "/solutions", permanent: true },
      { source: "/case-studies/:slug", destination: "/case-studies", permanent: true },
      { source: "/enterprise", destination: "/how-we-work", permanent: true },
      { source: "/approach", destination: "/how-we-work", permanent: true },
    ];
  },
};

export default nextConfig;
