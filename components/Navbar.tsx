"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onScroll(); onResize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const links = [
    { href: "/systems", label: "Systems" },
    { href: "/approach", label: "Approach" },
    { href: "/contact", label: "Contact" },
  ];

  const textColor = scrolled ? "#1A1A1A" : "#ffffff";
  const mutedColor = scrolled ? "#6B6865" : "rgba(255,255,255,0.72)";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(232,230,225,0.8)" : "1px solid transparent",
      transition: "background 0.35s ease, border-color 0.35s ease",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 32px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{
            width: 28, height: 28, background: scrolled ? "#1C1E26" : "rgba(255,255,255,0.15)",
            border: scrolled ? "none" : "1px solid rgba(255,255,255,0.25)",
            borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.35s",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.4" />
              <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.4" />
              <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.975rem", color: textColor, letterSpacing: "-0.015em", transition: "color 0.35s" }}>
            Novum Systems
          </span>
        </Link>

        {/* Desktop */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: "7px 16px", borderRadius: "100px",
                fontSize: "0.875rem", fontWeight: 500,
                color: pathname === l.href ? textColor : mutedColor,
                background: "transparent", textDecoration: "none",
                transition: "color 0.2s",
              }}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" style={{
              marginLeft: "12px", padding: "8px 20px", borderRadius: "100px",
              background: scrolled ? "#1C1E26" : "#F2EDD8",
              color: scrolled ? "#fff" : "#1A1A1A",
              fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
              transition: "background 0.35s, color 0.35s, transform 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
            >
              Book a Call
            </Link>
          </nav>
        )}

        {/* Mobile */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none",
            border: `1px solid ${scrolled ? "#E8E6E1" : "rgba(255,255,255,0.3)"}`,
            borderRadius: "8px", padding: "7px 10px", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: "4px",
            transition: "border-color 0.35s",
          }}>
            <span style={{ width: 16, height: 1.5, background: textColor, display: "block", transition: "background 0.35s" }} />
            <span style={{ width: 10, height: 1.5, background: textColor, display: "block", opacity: menuOpen ? 0 : 1, transition: "background 0.35s, opacity 0.2s" }} />
            <span style={{ width: 16, height: 1.5, background: textColor, display: "block", transition: "background 0.35s" }} />
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid #E8E6E1", padding: "12px 24px 24px" }}>
          {[{ href: "/", label: "Home" }, ...links].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 0", borderBottom: "1px solid #F0EEE9", fontSize: "1rem", color: "#1A1A1A", textDecoration: "none", fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{ display: "block", textAlign: "center", padding: "13px", borderRadius: "100px", marginTop: "16px", background: "#1C1E26", color: "#fff", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none" }}>
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
