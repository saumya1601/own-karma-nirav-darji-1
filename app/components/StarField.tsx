"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 for parallax
  r: number;
  base: number; // base opacity
  tw: number; // twinkle phase
  tws: number; // twinkle speed
};

/**
 * Cinematic cosmic starfield rendered on a lightweight canvas.
 * Slow drift + subtle parallax on pointer + gentle twinkle.
 * Respects reduced-motion and caps DPR for performance.
 */
export default function StarField({
  density = 0.00014,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor(w * h * density), 260);
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: (Math.random() * 1.1 + 0.3) * (0.6 + z),
          base: Math.random() * 0.5 + 0.15,
          tw: Math.random() * Math.PI * 2,
          tws: Math.random() * 0.015 + 0.004,
        };
      });
    };

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (const s of stars) {
        // slow ambient drift
        if (!reduce) {
          s.y -= 0.02 + s.z * 0.05;
          if (s.y < -2) {
            s.y = h + 2;
            s.x = Math.random() * w;
          }
          s.tw += s.tws;
        }
        const twinkle = reduce ? s.base : s.base + Math.sin(s.tw) * 0.35;
        const px = s.x + pointer.x * s.z * 26;
        const py = s.y + pointer.y * s.z * 26;

        const alpha = Math.max(0, Math.min(1, twinkle));
        // warm gold-tinged white
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 224, 205, ${alpha})`;
        ctx.fill();

        // occasional glow for brighter stars
        if (s.z > 0.8 && alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 162, 75, ${alpha * 0.06})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(render);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    build();
    render();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
