import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Novum AI: AI implementation across your company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/DMSans-400.woff")),
    readFile(join(process.cwd(), "assets/DMSans-700.woff")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#050d18", fontFamily: "DM Sans", color: "#eef0ea", padding: "72px 80px", position: "relative" }}>
        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="40" height="42" viewBox="14 13 36 38">
            <rect x="16" y="15" width="8" height="34" rx="1.2" fill="#eef0ea" />
            <rect x="40" y="15" width="8" height="34" rx="1.2" fill="#eef0ea" />
            <path d="M18 15h8l20 34h-8z" fill="#00b36e" />
          </svg>
          <div style={{ display: "flex", alignItems: "flex-start", fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
            Novum
            <span style={{ fontSize: 18, color: "#34d399", marginLeft: 4, marginTop: 2 }}>AI</span>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.16em", color: "#a3aebb", marginBottom: 28 }}>AI IMPLEMENTATION</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.035em" }}>
            <div style={{ display: "flex" }}>AI implementation</div>
            <div style={{ display: "flex" }}>across your company.</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#6b7783", marginTop: 26 }}>
            Training · agents · custom software · a fractional AI Officer. You own all of it.
          </div>
        </div>

        {/* horizon line */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, display: "flex", backgroundImage: "linear-gradient(90deg, transparent, #00b36e 30%, #3b6fe0 70%, transparent)" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: regular, weight: 400, style: "normal" },
        { name: "DM Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
