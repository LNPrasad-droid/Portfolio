"use client";

import { useId } from "react";
import { motion } from "framer-motion";

interface LeoLogoProps {
  size?: number;
  className?: string;
  /** When true, plays the illuminated state permanently (used in boot sequence) */
  forceActive?: boolean;
}

/**
 * The Leo lion mark — a polygonal, neural-network-inspired lion built entirely
 * from nodes and connecting edges. Outer ring = mane, inner triangulated shape
 * = muzzle, two accent nodes = eyes. On hover, nodes illuminate and a signal
 * sweeps along the edges, like activations propagating through a network.
 */
export function LeoLogo({ size = 40, className = "", forceActive = false }: LeoLogoProps) {
  const uid = useId().replace(/:/g, "");

  const outerRing = [
    [100, 12], [128, 18], [148, 32], [158, 22], [172, 48], [166, 62],
    [178, 82], [168, 90], [176, 112], [162, 114], [164, 138], [148, 132],
    [144, 156], [130, 144], [118, 168], [108, 150], [100, 178], [92, 150],
    [82, 168], [70, 144], [56, 156], [52, 132], [36, 138], [38, 114],
    [24, 112], [32, 90], [22, 82], [34, 62], [28, 48], [42, 22],
    [52, 32], [72, 18],
  ];

  const midRing = [
    [100, 48], [120, 54], [134, 64], [140, 80], [142, 98], [138, 116],
    [128, 132], [114, 142], [100, 148], [86, 142], [72, 132], [62, 116],
    [58, 98], [60, 80], [66, 64], [80, 54],
  ];

  const spokes: [number, number, number, number][] = [
    [100, 12, 100, 48], [128, 18, 120, 54], [158, 22, 134, 64], [172, 48, 140, 80],
    [178, 82, 142, 98], [176, 112, 138, 116], [164, 138, 128, 132], [144, 156, 114, 142],
    [118, 168, 100, 148], [92, 150, 86, 142], [70, 144, 72, 132], [52, 132, 62, 116],
    [38, 114, 58, 98], [32, 90, 60, 80], [34, 62, 66, 64], [42, 22, 80, 54],
  ];

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Leo logo"
      initial="rest"
      whileHover="active"
      animate={forceActive ? "active" : "rest"}
    >
      <defs>
        <radialGradient id={`glow-${uid}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <linearGradient id={`sweep-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ambient glow, brightens on hover */}
      <motion.circle
        cx="100"
        cy="95"
        r="95"
        fill={`url(#glow-${uid})`}
        variants={{ rest: { opacity: 0.5 }, active: { opacity: 1 } }}
        transition={{ duration: 0.5 }}
      />

      {/* Outer mane ring */}
      <motion.polygon
        points={outerRing.map((p) => p.join(",")).join(" ")}
        fill="none"
        strokeWidth={1}
        variants={{
          rest: { stroke: "rgba(255,255,255,0.22)" },
          active: { stroke: "var(--accent-cyan)" },
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Mid ring */}
      <motion.polygon
        points={midRing.map((p) => p.join(",")).join(" ")}
        fill="none"
        strokeWidth={1}
        variants={{
          rest: { stroke: "rgba(255,255,255,0.3)" },
          active: { stroke: "var(--accent-blue)" },
        }}
        transition={{ duration: 0.4, delay: 0.05 }}
      />

      {/* Spokes connecting outer ring to mid ring — animated as a signal sweep */}
      <g>
        {spokes.map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={`spoke-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={0.8}
            variants={{
              rest: { stroke: "rgba(255,255,255,0.18)", opacity: 0.8 },
              active: {
                stroke: `url(#sweep-${uid})`,
                opacity: 1,
                transition: { delay: i * 0.025, duration: 0.3 },
              },
            }}
          />
        ))}
      </g>

      {/* Face triangulation */}
      <motion.g
        strokeWidth={1.3}
        fill="none"
        variants={{
          rest: { stroke: "rgba(255,255,255,0.45)" },
          active: { stroke: "var(--accent-cyan)" },
        }}
        transition={{ duration: 0.4 }}
      >
        <polygon points="100,68 122,78 126,100 116,118 100,128 84,118 74,100 78,78" />
        <line x1="100" y1="68" x2="100" y2="128" />
        <line x1="78" y1="78" x2="122" y2="78" />
        <line x1="74" y1="100" x2="126" y2="100" />
      </motion.g>

      {/* Outer ring nodes */}
      <g filter={`url(#blur-${uid})`} opacity={0.9}>
        {outerRing.map(([x, y], i) => (
          <motion.circle
            key={`outer-node-${i}`}
            cx={x}
            cy={y}
            r={2.4}
            variants={{
              rest: { fill: "var(--accent-cyan)", opacity: 0.55 },
              active: {
                fill: "var(--accent-cyan)",
                opacity: 1,
                transition: { delay: i * 0.02, duration: 0.25 },
              },
            }}
          />
        ))}
      </g>
      <g opacity={1}>
        {outerRing.map(([x, y], i) => (
          <circle key={`outer-node-solid-${i}`} cx={x} cy={y} r={1.6} fill="var(--accent-cyan)" />
        ))}
      </g>

      {/* Mid ring nodes */}
      <g>
        {midRing.map(([x, y], i) => (
          <motion.circle
            key={`mid-node-${i}`}
            cx={x}
            cy={y}
            r={1.8}
            variants={{
              rest: { fill: "rgba(255,255,255,0.7)" },
              active: { fill: "#ffffff" },
            }}
          />
        ))}
      </g>

      {/* Eyes — the most expressive nodes */}
      <motion.circle
        cx={90}
        cy={92}
        r={3}
        variants={{
          rest: { fill: "var(--accent-blue)", opacity: 0.8 },
          active: { fill: "var(--accent-blue)", opacity: 1, scale: 1.15 },
        }}
        style={{ originX: "90px", originY: "92px" }}
      />
      <motion.circle
        cx={110}
        cy={92}
        r={3}
        variants={{
          rest: { fill: "var(--accent-blue)", opacity: 0.8 },
          active: { fill: "var(--accent-blue)", opacity: 1, scale: 1.15 },
        }}
        style={{ originX: "110px", originY: "92px" }}
      />
    </motion.svg>
  );
}
