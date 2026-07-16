"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle "energy" cursor — a soft glow that trails the pointer with easing and
 * emits faint expanding ripples on movement. Pointer-fine devices only;
 * disabled for touch and reduced-motion. Purely decorative (pointer-events off).
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const glow = glowRef.current;
    const ring = ringRef.current;
    if (!glow || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let lastRipple = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const now = performance.now();
      const speed = Math.hypot(e.movementX, e.movementY);
      if (speed > 6 && now - lastRipple > 120) {
        lastRipple = now;
        spawnRipple(e.clientX, e.clientY);
      }
    };

    const spawnRipple = (x: number, y: number) => {
      const r = document.createElement("span");
      r.className = "cursor-ripple";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      window.setTimeout(() => r.remove(), 900);
    };

    const loop = () => {
      gx += (mx - gx) * 0.14;
      gy += (my - gy) * 0.14;
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
