"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GeoSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Mouse parallax — smooth interpolation
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((_, delta) => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.04;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1 + smooth.current.x * 0.01;
      groupRef.current.rotation.x += smooth.current.y * 0.01;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.28;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.18;
    if (ring3Ref.current) ring3Ref.current.rotation.x += delta * 0.14;
    if (particlesRef.current) particlesRef.current.rotation.y += delta * 0.04;
  });

  // Particles distributed on a sphere shell
  const particlePositions = useMemo(() => {
    const count = 200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Outer geodesic wireframe */}
      <mesh>
        <icosahedronGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="#00C87A" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Inner denser wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#00C87A" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial color="#00C87A" transparent opacity={0.12} />
      </mesh>

      {/* Core halo (back-face only, larger radius = soft glow) */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#00C87A" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref} rotation={[1.1, 0, 0.3]}>
        <torusGeometry args={[2.85, 0.013, 8, 140]} />
        <meshBasicMaterial color="#00C87A" transparent opacity={0.45} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref} rotation={[0.3, 1.0, 0.1]}>
        <torusGeometry args={[3.25, 0.009, 8, 140]} />
        <meshBasicMaterial color="#00C87A" transparent opacity={0.28} />
      </mesh>

      {/* Orbit ring 3 */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 2, 0.5, 0.2]}>
        <torusGeometry args={[2.55, 0.008, 8, 140]} />
        <meshBasicMaterial color="#00C87A" transparent opacity={0.2} />
      </mesh>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particlePositions}
            count={particlePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#00C87A" size={0.055} transparent opacity={0.5} sizeAttenuation />
      </points>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <GeoSphere />
    </Canvas>
  );
}
