"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const onResize = () => setIsMobile(window.innerWidth < 768);

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

  const links = [
    { href: "/systems", label: "Systems" },
    { href: "/approach", label: "Approach" },
    { href: "/contact", label: "Contact" },
  ];

  const isHome = pathname === "/";
  const navBg =
    scrolled || !isHome ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.76)";
  const navBorder = "1px solid rgba(255,255,255,0.64)";
  const textColor = "#17181B";
  const mutedColor = "#68635e";
  const logoBg = "#00C87A";
  const ctaBg = "#F2EBD9";
  const ctaColor = "#17181B";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: "10px 18px 0",
        transition: "padding 0.25s ease",
      }}
    >
      <div
        style={{
          padding: "0 18px",
          height: "58px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "18px",
          background: navBg,
          backdropFilter: "blur(22px) saturate(165%)",
          WebkitBackdropFilter: "blur(22px) saturate(165%)",
          border: navBorder,
          boxShadow:
            scrolled || !isHome
              ? "0 10px 26px rgba(33, 37, 45, 0.08)"
              : "0 8px 20px rgba(33, 37, 45, 0.06)",
          transition:
            "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "9px",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: logoBg,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.3s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.42" />
              <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.42" />
              <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "0.975rem",
              color: textColor,
              letterSpacing: "-0.045em",
              transition: "color 0.3s ease",
            }}
          >
            NOVUM SYSTEMS
          </span>
        </Link>

        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "7px 15px",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: pathname === link.href ? textColor : mutedColor,
                  background:
                    pathname === link.href
                      ? "rgba(23,26,34,0.05)"
                      : "transparent",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              style={{
                marginLeft: 10,
                padding: "9px 18px",
                borderRadius: "999px",
                background: ctaBg,
                color: ctaColor,
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "transform 0.15s ease, background 0.25s ease",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a Call
            </Link>
          </nav>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              background: "none",
              border: `1px solid ${
                "rgba(201,197,188,0.8)"
              }`,
              borderRadius: "10px",
              padding: "7px 10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ width: 16, height: 1.5, background: textColor, display: "block" }} />
            <span
              style={{
                width: 10,
                height: 1.5,
                background: textColor,
                display: "block",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span style={{ width: 16, height: 1.5, background: textColor, display: "block" }} />
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div
          style={{
            margin: "10px 0 0",
            padding: "14px 20px 20px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            border: "1px solid rgba(229,225,216,0.95)",
            boxShadow: "0 14px 36px rgba(33, 37, 45, 0.1)",
          }}
        >
          {[{ href: "/", label: "Home" }, ...links].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid rgba(229,225,216,0.8)",
                fontSize: "1rem",
                color: "#17181B",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              display: "block",
              textAlign: "center",
              padding: "13px",
              borderRadius: "999px",
              marginTop: "16px",
              background: "#171a22",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
