import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Novum AI · One system for your whole operation",
  description: "We replace the software you rent, connect the tools you keep, and put AI to work across all of it. One custom system you own, for a fraction of the cost.",
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
