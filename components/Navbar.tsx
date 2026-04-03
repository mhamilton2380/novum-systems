"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/systems", label: "Systems" },
    { href: "/approach", label: "Approach" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(245,244,241,0.92)" : "rgba(245,244,241,0.7)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? "1px solid #E3E1DC" : "1px solid transparent",
    }}>
      <div style={{
        padding: "0 48px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1400px",
        margin: "0 auto",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "28px", height: "28px",
              background: "#1E2028",
              borderRadius: "7px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
              </svg>
            </div>
            <span className="font-serif" style={{
              fontSize: "1.05rem",
              color: "var(--text)",
              letterSpacing: "0.01em",
            }}>
              Novum Systems
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={{
              padding: "7px 15px",
              borderRadius: "100px",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: pathname === link.href ? "var(--accent)" : "var(--text-mid)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "color 0.15s, background 0.15s",
              background: pathname === link.href ? "var(--accent-bg)" : "transparent",
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            marginLeft: "14px",
            padding: "9px 22px",
            borderRadius: "100px",
            background: "var(--text)",
            color: "#fff",
            fontSize: "0.875rem",
            fontWeight: "600",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--text)"; }}
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "var(--text-mid)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }} className="md:hidden">
          <span style={{ width: "18px", height: "1.5px", background: "var(--text-mid)", display: "block" }} />
          <span style={{ width: "12px", height: "1.5px", background: "var(--text-mid)", display: "block" }} />
          <span style={{ width: "18px", height: "1.5px", background: "var(--text-mid)", display: "block" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "rgba(245,244,241,0.98)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--border)",
          padding: "20px 32px 32px",
        }} className="md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: "block",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
              fontSize: "1rem",
              color: pathname === link.href ? "var(--accent)" : "var(--text-mid)",
              textDecoration: "none",
              fontWeight: "500",
            }}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            display: "block", textAlign: "center",
            padding: "13px", borderRadius: "100px",
            marginTop: "20px", textDecoration: "none",
            fontSize: "0.95rem", fontWeight: "600",
            background: "var(--text)", color: "#fff",
          }}>
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
