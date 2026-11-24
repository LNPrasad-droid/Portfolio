"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  GROUND_STATION,
  SATELLITE_RADIUS,
  groundTrack,
  isInView,
  satellitePosition,
  subsolarPoint,
  toVector,
} from "@/lib/orbit";
import { usePrefersReducedMotion } from "@/hooks/usePointer";

export type CameraMode = "station" | "satellite";

const COLORS = {
  ocean: "#2a5a80",
  grid: "#2c4561",
  track: "#46d3c9",
  station: "#e6edf5",
  atmosphere: "#46d3c9",
};

const TRACK_BEHIND_MIN = -45;
const TRACK_AHEAD_MIN = 55;

function buildTrack(now: number) {
  const pts = groundTrack(now, TRACK_BEHIND_MIN, TRACK_AHEAD_MIN, 0.5);
  const arr = new Float32Array(pts.length * 3);
  pts.forEach((p, i) => arr.set(toVector(p.lat, p.lon, 1.004), i * 3));
  return arr;
}

function Scene({ mode, reducedMotion }: { mode: CameraMode; reducedMotion: boolean }) {
  const invalidate = useThree((s) => s.invalidate);

  // ---- static geometry -------------------------------------------------
  const graticule = useMemo(() => {
    const pts: number[] = [];
    const r = 1.001;
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lon = -180; lon < 180; lon += 3) pts.push(...toVector(lat, lon, r), ...toVector(lat, lon + 3, r));
    }
    for (let lon = -180; lon < 180; lon += 15) {
      for (let lat = -90; lat < 90; lat += 3) pts.push(...toVector(lat, lon, r), ...toVector(lat + 3, lon, r));
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: COLORS.grid, transparent: true, opacity: 0.55 }));
  }, []);

  // Lazy state initialisers run once, so reading the clock here is fine
  const [track] = useState(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(buildTrack(Date.now()), 3));
    return new THREE.Line(g, new THREE.LineBasicMaterial({ color: COLORS.track, transparent: true, opacity: 0.85 }));
  });

  const [downlink] = useState(() => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: COLORS.track }));
    line.visible = false;
    return line;
  });

  // Mutations go through refs to the mounted objects
  const trackRef = useRef<THREE.Line>(null);
  const downlinkRef = useRef<THREE.Line>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const line = trackRef.current;
      if (!line) return;
      (line.geometry.getAttribute("position") as THREE.BufferAttribute).set(buildTrack(Date.now()));
      line.geometry.getAttribute("position").needsUpdate = true;
      invalidate();
    }, 30_000);
    return () => clearInterval(id);
  }, [invalidate]);

  useEffect(
    () => () => {
      [graticule, track, downlink].forEach((o) => {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      });
    },
    [graticule, track, downlink],
  );

  // ---- refs --------------------------------------------------------------
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const satRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const drawStart = useRef<number | null>(null);
  const stationPos = useMemo(() => toVector(GROUND_STATION.lat, GROUND_STATION.lon, 1), []);
  const stationVec = useMemo(() => new THREE.Vector3(...stationPos), [stationPos]);
  const stationCam = useMemo(() => new THREE.Vector3(...toVector(18, GROUND_STATION.lon, 3.1)), []);
  const camTarget = useRef(new THREE.Vector3().copy(stationCam));

  useFrame((state, delta) => {
    const now = Date.now();
    const t = state.clock.getElapsedTime();

    // Real sun → real day/night boundary
    const sun = subsolarPoint(now);
    sunRef.current?.position.set(...toVector(sun.lat, sun.lon, 10));

    // Satellite
    const sat = satellitePosition(now);
    const satVec = new THREE.Vector3(...toVector(sat.lat, sat.lon, SATELLITE_RADIUS));
    if (satRef.current) {
      satRef.current.position.copy(satVec);
      satRef.current.lookAt(0, 0, 0);
    }

    // Downlink when in view
    const inView = isInView(now);
    const link = downlinkRef.current;
    if (link) link.visible = inView;
    if (link && inView) {
      const pos = link.geometry.getAttribute("position") as THREE.BufferAttribute;
      pos.setXYZ(0, stationVec.x, stationVec.y, stationVec.z);
      pos.setXYZ(1, satVec.x, satVec.y, satVec.z);
      pos.needsUpdate = true;
    }

    if (ringRef.current) {
      const phase = (t * 0.8) % 1;
      const pulse = inView && !reducedMotion;
      ringRef.current.scale.setScalar(pulse ? 1 + phase * 1.6 : 1);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = pulse ? 0.9 - phase * 0.9 : inView ? 0.9 : 0.45;
    }

    // Ground track draws itself on load: the page's one orchestrated moment
    const trackLine = trackRef.current;
    if (trackLine) {
      const total = trackLine.geometry.getAttribute("position").count;
      if (reducedMotion) {
        trackLine.geometry.setDrawRange(0, total);
      } else {
        if (drawStart.current === null) drawStart.current = t;
        const p = Math.min(1, (t - drawStart.current) / 1.8);
        trackLine.geometry.setDrawRange(0, Math.floor(total * (1 - Math.pow(1 - p, 3))));
      }
    }

    // Camera: station view, or follow the satellite from above-and-behind
    if (mode === "satellite") {
      camTarget.current.copy(satVec).normalize().multiplyScalar(2.95);
    } else {
      camTarget.current.copy(stationCam);
    }
    const k = reducedMotion ? 1 : 1 - Math.exp(-delta * 2.2);
    const cam = state.camera;
    cam.position.lerp(camTarget.current, k);
    cam.position.setLength(THREE.MathUtils.lerp(cam.position.length(), camTarget.current.length(), k));
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight ref={sunRef} intensity={3.2} color="#fff3e0" />

      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshLambertMaterial color={COLORS.ocean} />
      </mesh>
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color={COLORS.atmosphere} transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>

      <primitive object={graticule} />
      <primitive ref={trackRef} object={track} />
      <primitive ref={downlinkRef} object={downlink} />

      <group position={stationPos}>
        <mesh>
          <sphereGeometry args={[0.014, 16, 16]} />
          <meshBasicMaterial color={COLORS.station} />
        </mesh>
        <mesh ref={ringRef} onUpdate={(m) => m.lookAt(0, 0, 0)}>
          <ringGeometry args={[0.03, 0.036, 48]} />
          <meshBasicMaterial color={COLORS.track} transparent opacity={0.45} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={satRef}>
        <mesh>
          <boxGeometry args={[0.022, 0.022, 0.034]} />
          <meshBasicMaterial color="#e6edf5" />
        </mesh>
        <mesh position={[0.045, 0, 0]}>
          <boxGeometry args={[0.06, 0.002, 0.024]} />
          <meshBasicMaterial color={COLORS.track} />
        </mesh>
        <mesh position={[-0.045, 0, 0]}>
          <boxGeometry args={[0.06, 0.002, 0.024]} />
          <meshBasicMaterial color={COLORS.track} />
        </mesh>
      </group>
    </>
  );
}

export function GroundStationGlobe({ mode }: { mode: CameraMode }) {
  const reducedMotion = usePrefersReducedMotion();
  const initial = useMemo(() => toVector(18, GROUND_STATION.lon, 3.1), []);

  return (
    <Canvas camera={{ position: initial, fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Scene mode={mode} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
