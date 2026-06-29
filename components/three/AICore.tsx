"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePointer";

const PARTICLE_COUNT = 220;

/**
 * Particle positions are random but only need to be generated once per
 * mount, not recomputed on every render. Module-level generation (rather
 * than calling Math.random() inside useMemo's body) keeps the render path
 * pure — useMemo should only ever memoize a pure recomputation, not be the
 * source of randomness itself.
 */
function createParticlePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2.2 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = radius * Math.cos(phi);
  }
  return arr;
}

interface PointerRef {
  current: { x: number; y: number };
}

function CoreSphere({ pointer }: { pointer: PointerRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12 + pointer.current.x * 0.2;

      const targetTilt = pointer.current.y * 0.15;
      groupRef.current.rotation.x +=
        (targetTilt + Math.sin(t * 0.15) * 0.08 - groupRef.current.rotation.x) * 0.04;
    }

    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 1.2) * 0.03;
      coreRef.current.scale.setScalar(scale);
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Soft point light from within */}
      <pointLight color="#5eead4" intensity={6} distance={4} decay={2} />
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState<Float32Array>(() => createParticlePositions(PARTICLE_COUNT));

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#5eead4" size={0.018} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function PointerListener({ pointer }: { pointer: PointerRef }) {
  useFrame((state) => {
    const dom = state.gl.domElement;
    const handlerKey = "__leoPointerBound";
    const boundDom = dom as HTMLCanvasElement & Record<string, boolean | undefined>;
    if (!boundDom[handlerKey]) {
      boundDom[handlerKey] = true;
      window.addEventListener(
        "pointermove",
        (e: PointerEvent) => {
          const rect = dom.getBoundingClientRect();
          pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        },
        { passive: true }
      );
    }
  });
  return null;
}

export function AICore() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={0.6} color="#ffffff" />
        <CoreSphere pointer={pointer} />
        {!prefersReducedMotion && <Particles />}
        {!prefersReducedMotion && <PointerListener pointer={pointer} />}
      </Canvas>
    </div>
  );
}
