"use client";

import { useEffect, useRef, type RefObject } from "react";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Drives a scroll "scene" imperatively — no React re-renders per frame.
 * `onProgress` receives 0..1 progress as the element travels through the
 * pinned scroll range (top of element hits top of viewport → bottom of
 * element hits bottom of viewport). Ideal for sticky cinematic sections.
 *
 * Writes should be done imperatively (transform / opacity / CSS vars) inside
 * the callback so motion stays buttery smooth and Lenis-synced.
 */
export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number, viewportRatio: number) => void
) {
  const cb = useRef(onProgress);

  useEffect(() => {
    cb.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      // pinned progress (tall sections) or centered-visibility fallback
      const p =
        total > 40
          ? clamp01(-rect.top / total)
          : clamp01((vh - rect.top) / (vh + rect.height));
      // how centered the element is in the viewport (1 = perfectly centered)
      const center = rect.top + rect.height / 2;
      const viewportRatio = clamp01(1 - Math.abs(center - vh / 2) / vh);
      cb.current(p, viewportRatio);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}
