import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Novum AI: one system for your entire operation, at a fraction of the cost";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BARS = [
  { rent: 74, own: 40 },
  { rent: 80, own: 5 },
  { rent: 86, own: 5 },
  { rent: 93, own: 5 },
  { rent: 100, own: 5 },
];

export default async function Image() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/DMSans-400.woff")),
    readFile(join(process.cwd(), "assets/DMSans-700.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", position: "relative",
          background: "#0b1b2e", fontFamily: "DM Sans", color: "#fff", padding: "64px 72px",
        }}
      >
        {/* glow + grid */}
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "radial-gradient(circle at 88% 18%, rgba(8,145,178,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(0,179,110,0.22), transparent 45%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "62%", position: "relative" }}>
          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="56" height="56" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#00b36e" />
                  <stop offset="1" stopColor="#3b6fe0" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="9" fill="rgba(255,255,255,0.1)" />
              <rect x="8" y="8" width="4" height="16" rx="2" fill="#fff" />
              <rect x="20" y="8" width="4" height="16" rx="2" fill="#fff" />
              <path d="M10 10l12 12" stroke="url(#g)" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div style={{ display: "flex", alignItems: "flex-start", fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em" }}>
              Novum
              <span style={{ fontSize: 22, color: "#34d399", marginLeft: 6, marginTop: 2 }}>AI</span>
            </div>
          </div>

          {/* headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em" }}>
              <div style={{ display: "flex" }}>One system for your</div>
              <div style={{ display: "flex" }}>entire operation, at a</div>
              <div style={{ display: "flex", backgroundImage: "linear-gradient(90deg, #34d399, #22d3ee 55%, #60a5fa)", backgroundClip: "text", color: "transparent" }}>
                fraction of the cost.
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#cbd5e1", marginTop: 22, lineHeight: 1.4 }}>
              Custom software you own, connected to your tools, with AI built in.
            </div>
          </div>

          {/* chips */}
          <div style={{ display: "flex", gap: 12 }}>
            {["Core", "Integrations", "Vault", "AI Assistant", "Agents"].map((c) => (
              <div key={c} style={{ display: "flex", fontSize: 20, color: "#e2e8f0", padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.05)" }}>{c}</div>
            ))}
          </div>
        </div>

        {/* cost chart card */}
        <div style={{ position: "absolute", right: 72, top: 150, width: 330, display: "flex", flexDirection: "column", background: "#fff", borderRadius: 22, padding: "22px 26px", boxShadow: "0 30px 70px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", fontSize: 18, color: "#64748b", marginBottom: 18 }}>5-year software cost</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 190 }}>
            {BARS.map((b, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 160 }}>
                  <div style={{ width: 20, height: `${b.rent * 1.6}px`, background: "#e7b4b4", borderRadius: "5px 5px 2px 2px" }} />
                  <div style={{ width: 20, height: `${b.own * 1.6}px`, background: i === 0 ? "linear-gradient(#0891b2, #00b36e)" : "#00b36e", borderRadius: "5px 5px 2px 2px" }} />
                </div>
                <div style={{ display: "flex", fontSize: 14, color: "#64748b" }}>Yr {i + 1}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 18, paddingTop: 14, borderTop: "1px solid #e2e8f0", fontSize: 15, color: "#334155" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: "#e7b4b4" }} />Subscriptions</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: "#00b36e" }} />Your own system</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: regular, style: "normal", weight: 400 },
        { name: "DM Sans", data: bold, style: "normal", weight: 700 },
      ],
    },
  );
}
