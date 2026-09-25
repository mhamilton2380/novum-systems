import { useId } from "react";

// Novum "N" monogram: two pillars joined by a gradient stroke
export function LogoMark({ size = 30, dark = false }: { size?: number; dark?: boolean }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00b36e" />
          <stop offset="1" stopColor="#3b6fe0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={dark ? "rgba(255,255,255,0.08)" : "#0b1b2e"} />
      <rect x="8" y="8" width="4" height="16" rx="2" fill="#fff" />
      <rect x="20" y="8" width="4" height="16" rx="2" fill="#fff" />
      <path d="M10 10l12 12" stroke={`url(#${id})`} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ dark = false, size = 30 }: { dark?: boolean; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={size} dark={dark} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: `${size * 0.036}rem`,
        letterSpacing: "-0.035em", color: dark ? "#fff" : "#0b1b2e", lineHeight: 1,
      }}>
        Novum
        <span style={{
          fontSize: "0.62em", fontWeight: 700, letterSpacing: "0.02em", marginLeft: 3,
          verticalAlign: "0.35em", color: dark ? "#34d399" : "#0e7490",
        }}>AI</span>
      </span>
    </span>
  );
}
