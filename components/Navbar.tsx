"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/systems", label: "Systems" },
    { href: "/approach", label: "Approach" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? "1px solid #E8E6E1" : "1px solid transparent",
      transition: "border-color 0.3s, background 0.3s",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 40px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{
            width: "26px", height: "26px", background: "#1C1E26",
            borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.45" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.45" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
            </svg>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1rem", color: "#1A1A1A", letterSpacing: "-0.01em" }}>
            Novum Systems
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2px" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: "7px 14px", borderRadius: "100px",
              fontSize: "0.875rem", fontWeight: 500,
              color: pathname === l.href ? "#1A1A1A" : "#7A7774",
              background: pathname === l.href ? "#F0EEE9" : "transparent",
              textDecoration: "none", transition: "color 0.15s, background 0.15s",
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            marginLeft: "16px", padding: "9px 22px", borderRadius: "100px",
            background: "#1C1E26", color: "#fff", fontSize: "0.875rem", fontWeight: 600,
            textDecoration: "none", transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#3A5585"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#1C1E26"}
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "1px solid #E8E6E1", borderRadius: "8px",
          padding: "8px 10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px",
        }}>
          <span style={{ width: "16px", height: "1.5px", background: "#7A7774", display: "block" }} />
          <span style={{ width: "11px", height: "1.5px", background: "#7A7774", display: "block" }} />
          <span style={{ width: "16px", height: "1.5px", background: "#7A7774", display: "block" }} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden" style={{
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)",
          borderTop: "1px solid #E8E6E1", padding: "16px 32px 28px",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "13px 0", borderBottom: "1px solid #E8E6E1",
              fontSize: "1rem", color: pathname === l.href ? "#1A1A1A" : "#7A7774",
              textDecoration: "none", fontWeight: 500,
            }}>{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
            display: "block", textAlign: "center", padding: "13px", borderRadius: "100px",
            marginTop: "18px", background: "#1C1E26", color: "#fff",
            fontSize: "0.95rem", fontWeight: 600, textDecoration: "none",
          }}>Book a Call</Link>
        </div>
      )}
    </header>
  );
}
