import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Novum AI · We put AI to work in your business",
  description: "We help operational businesses put AI to work. We teach your team, build the tools, connect your systems, and you own all of it.",
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
