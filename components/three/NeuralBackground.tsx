"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePointer";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Lightweight canvas-based ambient network. Sits fixed behind all content
 * at low opacity. Nodes drift slowly and connect to nearby neighbors;
 * proximity to the cursor brightens local connections subtly.
 * Kept off the React render loop entirely — this is a self-contained
 * canvas animation so it never triggers component re-renders.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let nodes: Node[] = [];
    const mouse = { x: width / 2, y: height / 2, active: false };
    let animationFrame: number;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const DENSITY = 18000; // px^2 per node — lower = more nodes
    const CONNECT_DIST = 140;
    const MOUSE_RADIUS = 220;

    function init() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      const count = Math.min(90, Math.floor((width * height) / DENSITY));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            let opacity = (1 - dist / CONNECT_DIST) * 0.18;

            if (mouse.active) {
              const midX = (a.x + b.x) / 2;
              const midY = (a.y + b.y) / 2;
              const mdx = midX - mouse.x;
              const mdy = midY - mouse.y;
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mdist < MOUSE_RADIUS) {
                opacity += (1 - mdist / MOUSE_RADIUS) * 0.35;
              }
            }

            ctx.strokeStyle = `rgba(94, 234, 212, ${Math.min(opacity, 0.5)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(step);
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }

    function handleMouseLeave() {
      mouse.active = false;
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(init, 200);
    }

    init();

    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(step);
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
    } else {
      // Render a single static frame and stop.
      step();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
    />
  );
}
