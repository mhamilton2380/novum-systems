import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/solutions", destination: "/build", permanent: true },
      { source: "/systems", destination: "/build", permanent: true },
      { source: "/work", destination: "/build", permanent: true },
      { source: "/case-studies/:slug", destination: "/case-studies", permanent: true },
      { source: "/enterprise", destination: "/how-we-work", permanent: true },
      { source: "/approach", destination: "/how-we-work", permanent: true },
    ];
  },
};

export default nextConfig;
