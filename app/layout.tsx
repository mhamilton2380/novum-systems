import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "./home.css";
import "./visuals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_JSONLD } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Novum AI · AI and software built around how you work",
  description: "Generic software makes your team work its way. We learn how your business runs and build what fits: AI agents, connected tools, and software your company owns.",
  metadataBase: new URL("https://www.thenovumai.com"),
};

// Self-hosted by next/font. The old @import in globals.css was dropped by the CSS bundler, so the site fell back to Helvetica/Arial.
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-dm-sans", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <JsonLd data={ORGANIZATION_JSONLD} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
