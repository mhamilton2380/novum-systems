import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Novum AI · AI and software built around how you work",
  description: "Generic software makes your team work its way. We learn how your business runs and build what fits: AI agents, connected tools, and software you own instead of rent.",
  metadataBase: new URL("https://novum-systems.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
