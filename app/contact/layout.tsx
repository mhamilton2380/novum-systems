import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Novum AI",
  description: "Tell us how your business runs and where AI could help. Every project starts with a conversation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
