"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { SOLUTIONS_NAV, USE_CASE_NAV } from "@/lib/nav";

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const on = (prefix: string) => pathname.startsWith(prefix);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "10px 18px 0" }}>
      <div
        style={{
          position: "relative",
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 18px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 18,
          background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.86)",
          backdropFilter: "blur(22px) saturate(165%)",
          WebkitBackdropFilter: "blur(22px) saturate(165%)",
          border: "1px solid rgba(255,255,255,0.64)",
          boxShadow: scrolled ? "0 10px 26px rgba(11,27,46,0.10)" : "0 8px 20px rgba(11,27,46,0.06)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }} aria-label="Novum AI home">
          <Logo />
        </Link>

        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div className="nv-item">
              <Link href="/solutions" className={`nv-trigger${on("/solutions") ? " on" : ""}`}>Solutions <Chevron /></Link>
              <div className="nv-menu">
                <div className="nv-panel">
                  {SOLUTIONS_NAV.map((s) => (
                    <Link key={s.href} href={s.href}>{s.label}<small>{s.desc}</small></Link>
                  ))}
                  <hr />
                  <Link href="/solutions">All solutions →</Link>
                </div>
              </div>
            </div>

            <div className="nv-item">
              <Link href="/use-cases" className={`nv-trigger${on("/use-cases") || on("/case-studies") ? " on" : ""}`}>Use Cases <Chevron /></Link>
              <div className="nv-menu">
                <div className="nv-panel">
                  <div className="nv-group">By industry</div>
                  {USE_CASE_NAV.map((u) => (
                    <Link key={u.slug} href={`/use-cases/${u.slug}`}>{u.label}</Link>
                  ))}
                  <hr />
                  <div className="nv-group">Proof</div>
                  <Link href="/case-studies">Case study<small>A $100,000-a-year software bill, replaced</small></Link>
                  <Link href="/use-cases">All use cases →</Link>
                </div>
              </div>
            </div>

            <Link href="/how-we-work" className={`nv-trigger${on("/how-we-work") ? " on" : ""}`}>How We Work</Link>
            <Link href="/about" className={`nv-trigger${on("/about") ? " on" : ""}`}>About</Link>

            <Link
              href="/contact"
              style={{
                marginLeft: 10,
                padding: "9px 18px",
                borderRadius: 999,
                background: "#0b1b2e",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Book a Call
            </Link>
          </nav>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            style={{
              background: "none",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "8px 10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ width: 16, height: 1.5, background: "#0b1b2e", display: "block" }} />
            <span style={{ width: 10, height: 1.5, background: "#0b1b2e", display: "block", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 16, height: 1.5, background: "#0b1b2e", display: "block" }} />
          </button>
        )}

        {isMobile && menuOpen && (
          <div className="nv-mobile">
            <Link href="/solutions">Solutions</Link>
            {SOLUTIONS_NAV.map((s) => <Link key={s.href} href={s.href} className="sub">{s.label}</Link>)}
            <Link href="/use-cases">Use Cases</Link>
            {USE_CASE_NAV.map((u) => <Link key={u.slug} href={`/use-cases/${u.slug}`} className="sub">{u.label}</Link>)}
            <Link href="/case-studies" className="sub">Case study</Link>
            <Link href="/how-we-work">How We Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact" style={{ marginTop: 8, textAlign: "center", background: "#0b1b2e", color: "#fff", borderRadius: 999 }}>Book a Call</Link>
          </div>
        )}
      </div>
    </header>
  );
}
