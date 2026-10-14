"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./Mark";

export const NAV = [
  { href: "/ai-implementation", label: "What we do" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/use-cases", label: "Industries" },
  { href: "/case-studies", label: "Results" },
  { href: "/about", label: "About" },
];

export function NvNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  return (
    <header className={`top${solid || open ? " solid" : ""}`} id="top">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Novum AI home" onClick={() => setOpen(false)}>
          <Brand />
        </Link>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="tr">
          <Link className="pill" href="/contact">Start a conversation</Link>
          <button className="burger" type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><i /><i /></button>
        </div>
      </div>
      <div className="sheet" hidden={!open}>
        {NAV.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
        <Link href="/contact" onClick={() => setOpen(false)}>Start a conversation</Link>
      </div>
    </header>
  );
}
