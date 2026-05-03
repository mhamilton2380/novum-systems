"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, w / h, 0.1, 100);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Main rotating group
    const group = new THREE.Group();
    scene.add(group);

    const green = 0x00c87a;

    // Outer geodesic wireframe sphere
    group.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 2),
      new THREE.MeshBasicMaterial({ color: green, wireframe: true, transparent: true, opacity: 0.16 })
    ));

    // Inner denser wireframe
    group.add(new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({ color: green, wireframe: true, transparent: true, opacity: 0.24 })
    ));

    // Core glow sphere
    group.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 32, 32),
      new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.12 })
    ));

    // Orbit rings — outside the group so they spin independently
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.85, 0.013, 8, 140),
      new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.45 })
    );
    ring1.rotation.set(1.1, 0, 0.3);
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.25, 0.009, 8, 140),
      new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.28 })
    );
    ring2.rotation.set(0.3, 1.0, 0.1);
    scene.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(2.55, 0.008, 8, 140),
      new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.2 })
    );
    ring3.rotation.set(Math.PI / 2, 0.5, 0.2);
    scene.add(ring3);

    // Floating particles on a sphere shell
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: green, size: 0.055, transparent: true, opacity: 0.5 })
    );
    scene.add(particles);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // Animate
    let raf = 0;
    let last = 0;
    const animate = (ts: number) => {
      const delta = Math.min((ts - last) / 1000, 0.05);
      last = ts;

      smooth.x += (mouse.x - smooth.x) * 0.04;
      smooth.y += (mouse.y - smooth.y) * 0.04;

      group.rotation.y += delta * 0.1 + smooth.x * 0.01;
      group.rotation.x += smooth.y * 0.01;
      ring1.rotation.z += delta * 0.28;
      ring2.rotation.y += delta * 0.18;
      ring3.rotation.x += delta * 0.14;
      particles.rotation.y += delta * 0.04;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
