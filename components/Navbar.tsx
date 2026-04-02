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
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(13, 15, 20, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(245,242,236,0.06)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 48px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "var(--gold)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="var(--ink)" />
                <rect x="9" y="2" width="5" height="5" rx="1" fill="var(--ink)" opacity="0.6" />
                <rect x="2" y="9" width="5" height="5" rx="1" fill="var(--ink)" opacity="0.6" />
                <rect x="9" y="9" width="5" height="5" rx="1" fill="var(--ink)" />
              </svg>
            </div>
            <span
              className="font-serif"
              style={{
                fontSize: "1.05rem",
                color: "var(--ivory)",
                letterSpacing: "0.01em",
              }}
            >
              Novum Systems
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "8px" }} className="hidden md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.88rem",
                fontWeight: "450",
                color:
                  pathname === link.href
                    ? "var(--gold)"
                    : "var(--ivory-muted)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
                background:
                  pathname === link.href
                    ? "rgba(201, 169, 110, 0.08)"
                    : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-primary"
            style={{
              padding: "9px 22px",
              borderRadius: "8px",
              fontSize: "0.88rem",
              textDecoration: "none",
              marginLeft: "12px",
            }}
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "1px solid rgba(245,242,236,0.12)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "var(--ivory)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
          className="md:hidden"
        >
          <span style={{ width: "18px", height: "1.5px", background: "var(--ivory-muted)", display: "block" }} />
          <span style={{ width: "12px", height: "1.5px", background: "var(--ivory-muted)", display: "block" }} />
          <span style={{ width: "18px", height: "1.5px", background: "var(--ivory-muted)", display: "block" }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(13, 15, 20, 0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(245,242,236,0.06)",
            padding: "20px 32px 32px",
          }}
          className="md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                borderBottom: "1px solid rgba(245,242,236,0.06)",
                fontSize: "1rem",
                color: pathname === link.href ? "var(--gold)" : "var(--ivory-muted)",
                textDecoration: "none",
                fontWeight: "450",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{
              display: "block",
              textAlign: "center",
              padding: "14px",
              borderRadius: "8px",
              marginTop: "20px",
              textDecoration: "none",
              fontSize: "0.95rem",
            }}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
