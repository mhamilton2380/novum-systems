import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./nv.css";
import { NvNav } from "@/components/nv/NvNav";
import { NvFooter } from "@/components/nv/NvFooter";
import { NvMotion } from "@/components/nv/NvMotion";
import { JsonLd } from "@/components/JsonLd";
import { ORGANIZATION_JSONLD } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Novum AI · AI implementation across your company",
  description: "Training, agents, custom software, and a fractional AI Officer, built around how your teams work. You own all of it.",
  metadataBase: new URL("https://www.thenovumai.com"),
};

// Self-hosted by next/font. The old @import in globals.css was dropped by the CSS bundler, so the site fell back to Helvetica/Arial.
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-dm-sans", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <JsonLd data={ORGANIZATION_JSONLD} />
        <NvNav />
        {children}
        <NvFooter />
        <NvMotion />
      </body>
    </html>
  );
}
