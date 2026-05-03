"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const BG = "#0A0C0F";
const ACCENT = "#00C87A";
const CHAOS = "#FF6B35";

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !sticky || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 20 : 40;

    // ─── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Seeded random so layouts are stable across re-runs
    let seed = 42;
    const sRand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

    // ─── Node positions ────────────────────────────────────────────────────────
    const chaosPos: THREE.Vector3[] = [];
    const assembledPos: THREE.Vector3[] = [];
    const driftSeed: number[] = [];

    if (isMobile) {
      assembledPos.push(new THREE.Vector3(0, 0, 0));
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        assembledPos.push(new THREE.Vector3(Math.cos(a) * 1.0, Math.sin(a) * 1.0, Math.sin(a * 0.7) * 0.3));
      }
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + 0.2;
        assembledPos.push(new THREE.Vector3(Math.cos(a) * 1.7, Math.sin(a) * 1.7 * 0.85, Math.cos(a * 0.5) * 0.4));
      }
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        const r = 2.3 + Math.sin(i * 1.3) * 0.25;
        assembledPos.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.78, Math.sin(a * 0.4) * 0.5));
      }
    } else {
      assembledPos.push(new THREE.Vector3(0, 0, 0));
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        assembledPos.push(new THREE.Vector3(Math.cos(a) * 1.0, Math.sin(a) * 1.0, Math.sin(a * 0.7) * 0.3));
      }
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + 0.13;
        assembledPos.push(new THREE.Vector3(Math.cos(a) * 1.85, Math.sin(a) * 1.85 * 0.85, Math.cos(a * 0.5) * 0.5 - 0.1));
      }
      for (let i = 0; i < 19; i++) {
        const a = (i / 19) * Math.PI * 2;
        const r = 2.6 + Math.sin(i * 1.4) * 0.3;
        assembledPos.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.78 + Math.cos(i * 0.6) * 0.3, Math.sin(a * 0.45) * 0.7 - 0.2));
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 3 + sRand() * 3;
      const theta = sRand() * Math.PI * 2;
      const phi = Math.acos(2 * sRand() - 1);
      chaosPos.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)));
      driftSeed.push(sRand() * 100);
    }

    // ─── Node meshes ───────────────────────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const nodes: THREE.Mesh[] = [];
    const nodeMats: THREE.MeshBasicMaterial[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: CHAOS, transparent: true, opacity: 0.9 });
      const m = new THREE.Mesh(sphereGeo, mat);
      m.position.copy(chaosPos[i]);
      scene.add(m);
      nodes.push(m);
      nodeMats.push(mat);
    }

    // ─── Connections ───────────────────────────────────────────────────────────
    const connections: [number, number][] = [];
    if (isMobile) {
      for (let i = 1; i <= 4; i++) connections.push([0, i]);
      for (let i = 0; i < 4; i++) connections.push([1 + i, 5 + (i % 6)]);
      connections.push([1, 7], [3, 9]);
      for (let i = 0; i < 6; i++) connections.push([5 + i, 11 + (i % 9)]);
    } else {
      for (let i = 1; i <= 8; i++) connections.push([0, i]);
      for (let i = 0; i < 8; i++) connections.push([1 + i, 9 + Math.floor(i * 12 / 8) % 12]);
      connections.push([1, 4], [3, 6], [5, 8], [7, 2]);
      for (let i = 0; i < 12; i++) connections.push([9 + i, 21 + Math.floor(i * 19 / 12) % 19]);
      connections.push([9, 14], [11, 16], [13, 18], [15, 20]);
      connections.push([21, 28], [25, 32], [29, 36]);
    }
    const lineCount = connections.length;
    const linePos = new Float32Array(lineCount * 6);
    const lineCol = new Float32Array(lineCount * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ─── Subtle background grid (tiny dots, like graph paper) ──────────────────
    const gridGeo = new THREE.BufferGeometry();
    const gridPts: number[] = [];
    for (let i = -25; i <= 25; i++) {
      for (let j = -15; j <= 15; j++) {
        gridPts.push(i * 0.5, j * 0.5, -7);
      }
    }
    gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridPts, 3));
    const gridMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.012, transparent: true, opacity: 0.05 });
    const gridDots = new THREE.Points(gridGeo, gridMat);
    scene.add(gridDots);

    // ─── Center bloom (Act 3) ──────────────────────────────────────────────────
    const glowGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // ─── Color helpers ─────────────────────────────────────────────────────────
    const cChaos = new THREE.Color(CHAOS);
    const cAccent = new THREE.Color(ACCENT);
    const tmpCol = new THREE.Color();
    const tmpVec = new THREE.Vector3();

    // ─── ScrollTrigger ─────────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;

        // Text 1: full visible 0–0.25, fade out 0.25–0.34
        if (text1Ref.current) {
          text1Ref.current.style.opacity = String(Math.max(0, Math.min(1, (0.34 - p) / 0.09)));
        }
        // Text 2: fade in 0.55–0.62, hold to 0.66, fade out 0.66–0.73
        if (text2Ref.current) {
          let o = 0;
          if (p > 0.55 && p <= 0.62) o = (p - 0.55) / 0.07;
          else if (p > 0.62 && p < 0.66) o = 1;
          else if (p >= 0.66 && p < 0.73) o = 1 - (p - 0.66) / 0.07;
          text2Ref.current.style.opacity = String(o);
        }
        // Text 3: fade in 0.78–0.86
        if (text3Ref.current) {
          text3Ref.current.style.opacity = String(Math.max(0, Math.min(1, (p - 0.78) / 0.08)));
        }
      },
    });

    // ─── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ─── Animate ───────────────────────────────────────────────────────────────
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const animate = (ts: number) => {
      const delta = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      time += delta;

      const p = progressRef.current;
      const assembleT = THREE.MathUtils.smoothstep(p, 0.32, 0.72);

      // Update node positions
      for (let i = 0; i < NODE_COUNT; i++) {
        const c = chaosPos[i];
        const a = assembledPos[i];
        const drift = (1 - assembleT) * 0.35;
        const dx = Math.sin(time * 0.4 + driftSeed[i]) * drift;
        const dy = Math.cos(time * 0.3 + driftSeed[i] * 1.3) * drift;
        const dz = Math.sin(time * 0.35 + driftSeed[i] * 0.7) * drift;
        tmpVec.set(c.x + dx, c.y + dy, c.z + dz);
        nodes[i].position.lerpVectors(tmpVec, a, assembleT);

        // Breathe in Act 3
        if (p > 0.7) {
          const breath = 1 + Math.sin(time * 1.4 + i * 0.55) * 0.05;
          nodes[i].scale.setScalar(breath);
        } else {
          nodes[i].scale.setScalar(1);
        }

        // Color: orange → green
        tmpCol.copy(cChaos).lerp(cAccent, assembleT);
        nodeMats[i].color.copy(tmpCol);
      }

      // Update line geometry + colors
      const posAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = lineGeo.attributes.color as THREE.BufferAttribute;
      for (let i = 0; i < lineCount; i++) {
        const [aIdx, bIdx] = connections[i];
        const pa = nodes[aIdx].position;
        const pb = nodes[bIdx].position;
        posAttr.setXYZ(i * 2, pa.x, pa.y, pa.z);
        posAttr.setXYZ(i * 2 + 1, pb.x, pb.y, pb.z);

        // Flicker in chaos, solid when assembled
        const flickerOn = Math.sin(time * 5 + i * 1.7) > 0.2 ? 1 : 0.18;
        const chaosBrightness = 0.35 * flickerOn;
        const brightness = THREE.MathUtils.lerp(chaosBrightness, 1.0, assembleT);

        tmpCol.copy(cChaos).lerp(cAccent, assembleT);
        const r = tmpCol.r * brightness;
        const g = tmpCol.g * brightness;
        const bl = tmpCol.b * brightness;
        colAttr.setXYZ(i * 2, r, g, bl);
        colAttr.setXYZ(i * 2 + 1, r, g, bl);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Camera arc
      // Act 1 (0–0.35): pull back 7 → 9
      // Act 2 (0.35–0.7): push in 9 → 6
      // Act 3 (0.7–1):  6 → 6.5 + slow rotate
      let camDist: number;
      if (p < 0.35) camDist = 7 + (p / 0.35) * 2;
      else if (p < 0.7) camDist = 9 - ((p - 0.35) / 0.35) * 3;
      else camDist = 6 + ((p - 0.7) / 0.3) * 0.5;

      const turntableBoost = p > 0.7 ? ((p - 0.7) / 0.3) * Math.PI * 0.2 : 0;
      const camAngle = time * 0.025 + turntableBoost;

      camera.position.x = Math.sin(camAngle) * camDist;
      camera.position.z = Math.cos(camAngle) * camDist;
      camera.position.y = Math.sin(time * 0.1) * 0.3;
      camera.lookAt(0, 0, 0);

      // Center glow ramps up in Act 3
      const glowT = Math.max(0, (p - 0.7) / 0.3);
      glowMat.opacity = glowT * 0.25;
      glow.scale.setScalar(1 + Math.sin(time * 0.8) * 0.06);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      st.kill();
      sphereGeo.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      nodeMats.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-scene-wrap" style={{ position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: BG,
        }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />

        {/* ── Act 1 text ── */}
        <div
          ref={text1Ref}
          className="hero-text"
          style={{
            position: "absolute",
            left: "10%",
            bottom: "28%",
            color: "#EAEAEA",
            opacity: 1,
            maxWidth: 640,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: 11, color: ACCENT, letterSpacing: "0.3em", fontWeight: 600, marginBottom: 18 }}>
            OPERATIONAL INPUTS
          </div>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.4rem, 4.8vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#EAEAEA",
              margin: 0,
            }}
          >
            Your business runs on
            <br />
            <span style={{ color: "#666" }}>fragmented tools.</span>
          </h1>
        </div>

        {/* ── Act 2 text ── */}
        <div
          ref={text2Ref}
          className="hero-text"
          style={{
            position: "absolute",
            left: "10%",
            bottom: "28%",
            color: "#EAEAEA",
            opacity: 0,
            maxWidth: 640,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.4rem, 4.8vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#EAEAEA",
              margin: 0,
            }}
          >
            One system.
            <br />
            <span style={{ color: ACCENT }}>Built for how you work.</span>
          </h1>
        </div>

        {/* ── Act 3 text ── */}
        <div
          ref={text3Ref}
          className="hero-text-cta"
          style={{
            position: "absolute",
            left: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#EAEAEA",
            opacity: 0,
            maxWidth: 540,
            zIndex: 2,
          }}
        >
          <div style={{ fontSize: 11, color: ACCENT, letterSpacing: "0.3em", fontWeight: 600, marginBottom: 20 }}>
            NOVUM SYSTEMS
          </div>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.4rem, 4.8vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#EAEAEA",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Software that adapts
            <br />
            to your business.
          </h1>
          <p style={{ color: "#888", fontSize: 18, lineHeight: 1.55, maxWidth: 480, marginBottom: 36, margin: "0 0 36px 0" }}>
            We replace your stack of disconnected tools with one system built around how you actually work.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                padding: "14px 28px",
                borderRadius: 4,
                background: ACCENT,
                color: "#0a1a12",
                fontSize: "0.92rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Book a Discovery Call →
            </Link>
            <Link
              href="/systems"
              style={{
                padding: "14px 28px",
                borderRadius: 4,
                border: "1px solid #333",
                color: "#EAEAEA",
                background: "transparent",
                fontSize: "0.92rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              See Our Systems
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-scene-wrap {
          height: 400vh;
        }
        @media (max-width: 768px) {
          .hero-scene-wrap {
            height: 280vh;
          }
          .hero-text, .hero-text-cta {
            left: 6% !important;
            right: 6%;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
}
