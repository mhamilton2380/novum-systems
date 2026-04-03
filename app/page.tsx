"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function PlexusBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>(
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const distance = 160;

    const initialize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = Math.max(window.innerHeight, document.body.scrollHeight) * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100%";
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      nodesRef.current = [];
      const count = Math.min(54, Math.floor((width * height) / 42000));

      for (let index = 0; index < count; index += 1) {
        nodesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        });
      }
    };

    const tick = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const nodes = nodesRef.current;

      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20 || node.x > width + 20) {
          node.vx *= -1;
        }

        if (node.y < -20 || node.y > height + 20) {
          node.vy *= -1;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < distance) {
            const alpha = (1 - d / distance) * 0.35;
            context.beginPath();
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.strokeStyle = `rgba(69,99,145,${alpha})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        context.fillStyle = "rgba(69,99,145,0.18)";
        context.fill();
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    initialize();
    window.addEventListener("resize", initialize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", initialize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}

function HeroWorkflowGraphic() {
  const inputs = [
    { label: "Email", top: 126 },
    { label: "Calendar", top: 168 },
    { label: "Accounting", top: 210 },
    { label: "Documents", top: 252 },
  ];

  const outputs = [
    { label: "Tasks", top: 126 },
    { label: "Schedules", top: 168 },
    { label: "Team Updates", top: 210 },
    { label: "Client Visibility", top: 252 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        padding: "92px 42px 48px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 760,
          minHeight: 430,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.065) 0.7px, transparent 0.7px)",
            backgroundSize: "12px 12px",
            opacity: 0.16,
            maskImage:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 18%, rgba(0,0,0,0.92) 82%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 188,
            transform: "translateX(-50%)",
            width: 252,
            padding: "16px 18px",
                borderRadius: 16,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.045) 100%)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.92)",
                fontSize: "0.92rem",
                fontWeight: 700,
                textAlign: "center",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 34px rgba(10,12,18,0.16), 0 0 44px rgba(237,242,153,0.14)",
              }}
            >
              Novum Operating Platform
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 120,
            transform: "translateX(-50%)",
            width: 1,
            height: 62,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.28), rgba(255,255,255,0.06))",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 228,
            transform: "translateX(-50%)",
            width: 1,
            height: 76,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.28), rgba(255,255,255,0.06))",
          }}
        />

        {inputs.map((item, index) => (
          <div key={item.label}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: item.top,
                width: 132,
                padding: "10px 14px",
                borderRadius: 14,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.045) 100%)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 24px rgba(10,12,18,0.12)",
                color: "rgba(255,255,255,0.82)",
                fontSize: "0.84rem",
                fontWeight: 500,
                zIndex: 2,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                position: "absolute",
                left: 132,
                top: item.top + 21,
                width: 226,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(112,151,222,0.32), rgba(255,255,255,0.03))",
              }}
            />
            <div
              className="signal-pulse"
              style={
                {
                  "--delay": `${index * 0.5}s`,
                  "--travel": "186px",
                  position: "absolute",
                  left: 150,
                  top: item.top + 14,
                } as CSSProperties
              }
            />
            <div
              style={{
                position: "absolute",
                left: 356,
                top: item.top + 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "rgba(147,193,255,0.7)",
                boxShadow: "0 0 14px rgba(147,193,255,0.5)",
              }}
            />
          </div>
        ))}

        {outputs.map((item, index) => (
          <div key={item.label}>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: item.top,
                width: 140,
                padding: "10px 14px",
                borderRadius: 14,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.045) 100%)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.84)",
                fontSize: "0.84rem",
                fontWeight: 500,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 24px rgba(10,12,18,0.12)",
                zIndex: 2,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                position: "absolute",
                right: 140,
                top: item.top + 21,
                width: 208,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.03), rgba(112,151,222,0.28), rgba(255,255,255,0.02))",
              }}
            />
            <div
              className="signal-pulse"
              style={
                {
                  "--delay": `${0.2 + index * 0.45}s`,
                  "--travel": "-186px",
                  position: "absolute",
                  right: 158,
                  top: item.top + 14,
                } as CSSProperties
              }
            />
            <div
              style={{
                position: "absolute",
                right: 344,
                top: item.top + 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "rgba(147,193,255,0.7)",
                boxShadow: "0 0 14px rgba(147,193,255,0.5)",
              }}
            />
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: 372,
            top: 198,
            width: 118,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 372,
            top: 198,
            width: 112,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
          }}
        />

        <div
          className="platform-glow"
          style={{
            position: "absolute",
            left: "50%",
            top: 160,
            transform: "translateX(-50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 147,
            transform: "translateX(-50%)",
            width: 356,
            height: 96,
            borderRadius: 999,
            border: "1px solid rgba(120,168,255,0.08)",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 134,
            transform: "translateX(-50%)",
            width: 420,
            height: 122,
            borderRadius: 999,
            border: "1px solid rgba(120,168,255,0.05)",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 172,
            transform: "translateX(-50%)",
            width: 520,
            height: 18,
            background:
              "linear-gradient(90deg, rgba(120,168,255,0), rgba(120,168,255,0.16), rgba(236,244,168,0.2), rgba(120,168,255,0.16), rgba(120,168,255,0))",
            filter: "blur(12px)",
            opacity: 0.7,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 184,
            top: 316,
            width: 156,
            padding: "14px 16px",
            borderRadius: 16,
            background:
              "linear-gradient(180deg, rgba(34,38,49,0.74) 0%, rgba(21,24,32,0.56) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(110,141,206,0.16)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 38px rgba(0,0,0,0.16)",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.76)",
                fontSize: "0.76rem",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Unified Data
            </div>
          {["Projects  live", "Financials  synced", "Teams  aligned", "Docs  connected"].map(
            (line) => (
              <div
                key={line}
                style={{
                  color: "rgba(122,167,255,0.78)",
                  fontSize: "0.58rem",
                  marginBottom: 4,
                  letterSpacing: "0.03em",
                }}
              >
                {line}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 332,
            transform: "translateX(-50%)",
            width: 170,
            padding: "14px 16px",
            borderRadius: 16,
            background:
              "linear-gradient(180deg, rgba(34,38,49,0.74) 0%, rgba(21,24,32,0.56) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(110,141,206,0.16)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 38px rgba(0,0,0,0.16)",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.76)",
              fontSize: "0.76rem",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Workflow Engine
            </div>
          <div
            style={{
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.62rem",
              lineHeight: 1.5,
            }}
          >
            Routes work, updates schedules, syncs teams, and keeps operations
            moving from one shared source of truth.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 168,
            top: 316,
            width: 166,
            height: 164,
            borderRadius: 16,
            background:
              "linear-gradient(180deg, rgba(34,38,49,0.74) 0%, rgba(21,24,32,0.56) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(110,141,206,0.16)",
            overflow: "hidden",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 38px rgba(0,0,0,0.16)",
          }}
        >
          <div
            style={{
              padding: "14px 16px 0",
              fontSize: "0.76rem",
              color: "rgba(255,255,255,0.76)",
              fontWeight: 600,
            }}
          >
            One Platform
          </div>
          <div
            style={{
              padding: "8px 16px 16px",
              color: "rgba(255,255,255,0.42)",
              fontSize: "0.62rem",
              lineHeight: 1.5,
            }}
          >
            Email, accounting, scheduling, reporting, and team execution all
            connect inside one operational system.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 300,
            transform: "translateX(-50%)",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  index === 1
                    ? "rgba(236,244,168,0.9)"
                    : "rgba(120,168,255,0.64)",
                boxShadow:
                  index === 1
                    ? "0 0 18px rgba(236,244,168,0.46)"
                    : "0 0 14px rgba(120,168,255,0.32)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const glassCard: CSSProperties = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.58)",
  boxShadow: "0 14px 36px rgba(22,28,38,0.05)",
};

export default function HomePage() {
  useScrollReveal();
  const [graphicReady, setGraphicReady] = useState(false);

  useEffect(() => {
    setGraphicReady(true);
  }, []);

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at 12% 8%, rgba(91,125,186,0.06), transparent 22%), radial-gradient(circle at 88% 14%, rgba(121,161,229,0.04), transparent 20%), linear-gradient(180deg, #f5f4f1 0%, #f2efea 100%)",
        color: "var(--text)",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <PlexusBg />

      <section style={{ padding: "86px 20px 0", position: "relative", zIndex: 1 }}>
        <div
          className="hero-card"
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(102,142,214,0.16), transparent 28%), radial-gradient(circle at 88% 24%, rgba(88,130,214,0.12), transparent 26%), linear-gradient(180deg, #191c24 0%, #151821 100%)",
            borderRadius: 28,
            minHeight: 660,
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1.08fr",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 36px 90px rgba(15,18,25,0.22)",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 3,
              padding: "92px 0 72px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              className="pill-tag"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.48)",
                marginBottom: 28,
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.42)",
                  display: "inline-block",
                }}
              />
              Operational Software for Growing Businesses
            </div>

            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(3rem, 5vw, 5.4rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: "#fff",
                marginBottom: 24,
                maxWidth: 520,
              }}
            >
              Software that{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "rgba(188,208,255,0.96)",
                  textShadow:
                    "0 0 18px rgba(125,171,255,0.42), 0 0 42px rgba(125,171,255,0.18)",
                }}
              >
                adapts
              </em>
              <br />
              to your business.
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.12rem)",
                color: "rgba(255,255,255,0.56)",
                lineHeight: 1.85,
                maxWidth: 470,
                marginBottom: 38,
              }}
            >
              We replace rigid, expensive software with operational systems
              designed around how your business actually runs, with one
              intelligent layer across projects, teams, field work, and reporting.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  background: "#efe4cc",
                  color: "#17181B",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book a Discovery Call
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/systems"
                style={{
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.72)",
                  background: "rgba(255,255,255,0.02)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                See Our Systems
              </Link>
            </div>
          </div>

          <div style={{ position: "relative", minHeight: 660 }}>
            {graphicReady ? <HeroWorkflowGraphic /> : null}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="problem-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
          >
            <div className="fade-section">
              <div
                className="pill-tag"
                style={{
                  ...glassCard,
                  color: "var(--text-soft)",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--text-soft)",
                    display: "inline-block",
                  }}
                />
                The Problem
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.95rem, 3.5vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginBottom: 24,
                }}
              >
                Your operations are unique.
                <br />
                <span style={{ color: "var(--text-soft)", fontStyle: "italic" }}>
                  Your software isn&apos;t.
                </span>
              </h2>
              <p
                style={{
                  color: "var(--text-soft)",
                  lineHeight: 1.88,
                  fontSize: "0.98rem",
                  marginBottom: 16,
                  maxWidth: 560,
                }}
              >
                Off-the-shelf platforms were designed for the average business,
                which means they fit nobody perfectly. You end up bending your
                workflows to match your software instead of the other way around.
              </p>
              <p
                style={{
                  color: "var(--text-soft)",
                  lineHeight: 1.88,
                  fontSize: "0.98rem",
                  maxWidth: 560,
                }}
              >
                The result is fragmented operations, manual workarounds, and a
                team spending too much energy managing tools instead of managing
                the business.
              </p>
            </div>

            <div
              className="fade-section"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {[
                "Generic platforms that force you to work around them",
                "Expensive enterprise tools built for companies 10x your size",
                "Disconnected tools requiring manual data entry between systems",
                "No visibility into your actual operations across teams",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    ...glassCard,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "20px 24px",
                    border: "1px solid rgba(192,57,43,0.12)",
                    borderRadius: 16,
                    transition: "transform 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-2px)";
                    event.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(22,28,38,0.06)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow =
                      "0 14px 36px rgba(22,28,38,0.05)";
                  }}
                >
                  <span
                    style={{
                      color: "var(--red)",
                      fontSize: "0.85rem",
                      marginTop: 1,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </span>
                  <p
                    style={{
                      color: "var(--text-mid)",
                      fontSize: "0.92rem",
                      lineHeight: 1.68,
                      margin: 0,
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div
          className="fade-section"
          style={{
            background:
              "radial-gradient(circle at 20% 18%, rgba(101,142,214,0.16), transparent 26%), linear-gradient(180deg, #181b24 0%, #14171f 100%)",
            borderRadius: 24,
            padding: "84px 60px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 28px 70px rgba(15,18,25,0.18)",
          }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.8 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 64px" }}>
              <div
                className="pill-tag"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.45)",
                    display: "inline-block",
                  }}
                />
                The Novum Approach
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.95rem, 3.6vw, 3rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  marginBottom: 18,
                  color: "#fff",
                }}
              >
                Systems built around how you actually run.
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.54)",
                  lineHeight: 1.82,
                  fontSize: "0.98rem",
                }}
              >
                We start with your operation, not a generic template. Every
                system is structured around your workflows, team, reporting
                needs, and business model.
              </p>
            </div>

            <div
              className="solution-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}
            >
              {[
                {
                  title: "Mapped to your operations",
                  desc: "We document how your business works before building anything. The result reflects your reality, not a generic software pattern.",
                },
                {
                  title: "Fast to deploy, built to last",
                  desc: "You get a working operational layer quickly, built on a structure that can evolve with your business as complexity increases.",
                },
                {
                  title: "One system, not many tools",
                  desc: "We consolidate projects, communication, reporting, scheduling, and workflows into one coherent operating system.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: 32,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    transition: "border-color 0.25s, background 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor = "rgba(122,166,255,0.28)";
                    event.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    event.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    event.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    event.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      marginBottom: 20,
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.16rem",
                      marginBottom: 12,
                      letterSpacing: "-0.01em",
                      color: "#fff",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.92rem",
                      lineHeight: 1.76,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            className="fade-section"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div
                className="pill-tag"
                style={{
                  ...glassCard,
                  color: "var(--text-soft)",
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--text-soft)",
                    display: "inline-block",
                  }}
                />
                Our Systems
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.95rem, 3.5vw, 3rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                }}
              >
                Every operation covered.
                <br />
                One platform.
              </h2>
            </div>
            <Link href="/systems" className="btn-outline">
              View All Systems →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                name: "Forge",
                badge: "Fully Custom",
                badgeColor: "#7756C9",
                badgeBg: "rgba(119,86,201,0.08)",
                badgeBorder: "rgba(119,86,201,0.18)",
                desc: "For operations that do not fit any mold. Forge is architected from the ground up around your structure, workflows, terminology, and reporting logic.",
                features: [
                  "Custom operational architecture",
                  "Tailored data model",
                  "Workflow engine",
                  "White-glove deployment",
                ],
              },
              {
                name: "OpsCore",
                badge: "Operations Hub",
                badgeColor: "var(--accent)",
                badgeBg: "rgba(69,99,145,0.08)",
                badgeBorder: "rgba(69,99,145,0.2)",
                desc: "A unified command center for tasks, communication, projects, budgets, reporting, and integrations. OpsCore creates structure across the entire business.",
                features: [
                  "AI task generation",
                  "Team chat and notes",
                  "Project calendars and tasks",
                  "QuickBooks and CRM integrations",
                  "Role dashboards",
                  "Workflow automation",
                ],
              },
              {
                name: "FieldOps",
                badge: "Field Service",
                badgeColor: "#237259",
                badgeBg: "rgba(35,114,89,0.08)",
                badgeBorder: "rgba(35,114,89,0.18)",
                desc: "Field service management built around your crews, territories, scheduling model, and invoicing process from dispatch through completion.",
                features: [
                  "Scheduling and dispatch",
                  "Mobile field access",
                  "Automated invoicing",
                  "Customer history",
                ],
              },
              {
                name: "ProjectOps",
                badge: "Project-Based",
                badgeColor: "#2D5599",
                badgeBg: "rgba(45,85,153,0.08)",
                badgeBorder: "rgba(45,85,153,0.18)",
                desc: "Project lifecycle management from estimate to closeout, with live budget visibility, timeline tracking, document workflows, and profitability reporting.",
                features: [
                  "Budget vs actuals",
                  "Vendor management",
                  "Milestone tracking",
                  "Document workflows",
                  "Profitability reporting",
                ],
              },
            ].map((system) => (
              <div
                key={system.name}
                className="sys-row fade-section"
                style={{
                  ...glassCard,
                  display: "grid",
                  gridTemplateColumns: "240px 1fr auto",
                  gap: 48,
                  alignItems: "center",
                  padding: "34px 38px",
                  borderRadius: 18,
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = "rgba(69,99,145,0.22)";
                  event.currentTarget.style.boxShadow = "0 16px 38px rgba(22,28,38,0.08)";
                  event.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "rgba(255,255,255,0.58)";
                  event.currentTarget.style.boxShadow = "0 14px 36px rgba(22,28,38,0.05)";
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "1.74rem",
                      letterSpacing: "-0.03em",
                      marginBottom: 10,
                      color: "var(--text)",
                    }}
                  >
                    {system.name}
                  </h3>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      background: system.badgeBg,
                      border: `1px solid ${system.badgeBorder}`,
                      borderRadius: "999px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: system.badgeColor,
                    }}
                  >
                    {system.badge}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--text-soft)",
                      fontSize: "0.92rem",
                      lineHeight: 1.78,
                      marginBottom: 14,
                    }}
                  >
                    {system.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {system.features.map((feature) => (
                      <span
                        key={feature}
                        style={{
                          padding: "4px 12px",
                          background: "rgba(255,255,255,0.52)",
                          border: "1px solid rgba(229,225,216,0.92)",
                          borderRadius: 8,
                          fontSize: "0.77rem",
                          color: "var(--text-soft)",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href="/systems"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(229,225,216,0.9)",
                    borderRadius: 12,
                    color: "var(--text-soft)",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                >
                  →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            ...glassCard,
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "72px 60px",
            borderRadius: 24,
          }}
        >
          <div className="fade-section" style={{ textAlign: "center", marginBottom: 64 }}>
            <div
              className="pill-tag"
              style={{
                ...glassCard,
                color: "var(--text-soft)",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--text-soft)",
                  display: "inline-block",
                }}
              />
              How It Works
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(1.95rem, 3.5vw, 3rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              From discovery to deployed, in three steps.
            </h2>
          </div>

          <div
            className="process-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              position: "relative",
            }}
          >
            <div
              className="process-connector"
              style={{
                position: "absolute",
                top: 48,
                left: "calc(16.67% + 36px)",
                right: "calc(16.67% + 36px)",
                height: 1,
                background: "rgba(201,197,188,0.8)",
              }}
            />

            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We spend time with your team to understand how the business actually runs, where the friction lives, and what information matters.",
              },
              {
                step: "02",
                title: "System Design",
                desc: "We architect the operational model around your workflows so you can see exactly what is being built before it gets deployed.",
              },
              {
                step: "03",
                title: "Build & Deploy",
                desc: "We configure, ship, and launch your system with training, handoff, and continued support once it is live.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="fade-section"
                style={{ textAlign: "center", padding: "0 20px" }}
              >
                <div
                  style={{
                    ...glassCard,
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 32px",
                    position: "relative",
                    zIndex: 1,
                    transition: "border-color 0.25s, transform 0.25s",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.borderColor = "var(--accent-border)";
                    event.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.borderColor = "rgba(255,255,255,0.58)";
                    event.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span
                    className="font-serif"
                    style={{
                      fontSize: "1.45rem",
                      color: "var(--accent)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "1.3rem",
                    marginBottom: 14,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-soft)",
                    fontSize: "0.92rem",
                    lineHeight: 1.82,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "40px 24px 88px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          className="fade-section"
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "76px 64px",
            background:
              "radial-gradient(circle at 20% 15%, rgba(96,138,214,0.16), transparent 28%), linear-gradient(180deg, #171b24 0%, #141821 100%)",
            borderRadius: 28,
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 28px 70px rgba(15,18,25,0.18)",
          }}
        >
          <div className="dot-grid" style={{ position: "absolute", inset: 0 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              className="pill-tag"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.45)",
                  display: "inline-block",
                }}
              />
              Ready to Build
            </div>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                marginBottom: 20,
                color: "#fff",
              }}
            >
              Stop adapting to your software.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.56)",
                fontSize: "1rem",
                lineHeight: 1.82,
                marginBottom: 44,
              }}
            >
              Book a discovery call and let&apos;s map out what an operational
              system built specifically for your business could look like.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  padding: "15px 32px",
                  borderRadius: "999px",
                  background: "#FFFFFF",
                  color: "var(--text)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book a Discovery Call →
              </Link>
              <Link
                href="/systems"
                style={{
                  padding: "15px 28px",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.72)",
                  background: "transparent",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Explore Systems
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .signal-pulse {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(198, 225, 255, 1) 0%,
            rgba(145, 192, 255, 0.92) 35%,
            rgba(95, 145, 255, 0) 100%
          );
          box-shadow: 0 0 18px rgba(150, 196, 255, 0.72);
          animation: pulseTravel 3.8s linear infinite;
          animation-delay: var(--delay);
        }

        .platform-glow {
          width: 300px;
          height: 120px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(240, 244, 174, 0.22) 0%,
            rgba(160, 198, 255, 0.12) 42%,
            rgba(160, 198, 255, 0) 72%
          );
          filter: blur(18px);
          animation: platformBeat 2.4s ease-in-out infinite;
        }

        @keyframes pulseTravel {
          0% {
            transform: translateX(0);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          76% {
            opacity: 1;
          }

          100% {
            transform: translateX(var(--travel));
            opacity: 0;
          }
        }

        @keyframes platformBeat {
          0%,
          100% {
            transform: translateX(-50%) scale(0.96);
            opacity: 0.55;
          }

          50% {
            transform: translateX(-50%) scale(1.03);
            opacity: 0.92;
          }
        }

        .hero-card {
          grid-template-columns: 1fr 1.08fr;
        }

        @media (max-width: 1080px) {
          .hero-card {
            grid-template-columns: 1fr !important;
          }

          .hero-card > div:first-child {
            padding: 58px 28px 10px !important;
          }

          .hero-card > div:last-child {
            min-height: 540px;
          }

          .problem-grid {
            grid-template-columns: 1fr !important;
          }

          .solution-grid {
            grid-template-columns: 1fr !important;
          }

          .process-grid {
            grid-template-columns: 1fr !important;
          }

          .process-connector {
            display: none;
          }

          .sys-row {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            padding: 24px !important;
          }
        }

        @media (max-width: 720px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          .hero-card > div:last-child {
            min-height: 420px;
          }
        }
      `}</style>
    </div>
  );
}
