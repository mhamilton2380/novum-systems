import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Novum AI",
  description: "Tell us what you're running and what you pay for today. Every project starts with a conversation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
