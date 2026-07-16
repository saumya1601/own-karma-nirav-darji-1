"use client";

import { useRef } from "react";
import StarField from "./StarField";
import { Glyph } from "./Glyph";
import { useScrollScene } from "../lib/useScrollScene";

const LINES = [
  "Every choice leaves a mark.",
  "The mark becomes a path.",
  "The path becomes a journey.",
  "The journey becomes your karma.",
];

// progress window for each whispered line
const WINDOWS: [number, number][] = [
  [0.08, 0.24],
  [0.24, 0.4],
  [0.4, 0.56],
  [0.56, 0.72],
];

// smooth 0→1→0 bell across a [start,end] window
function bell(p: number, start: number, end: number) {
  if (p < start || p > end) return 0;
  const t = (p - start) / (end - start);
  return Math.sin(t * Math.PI); // 0 at edges, 1 at center
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);

/**
 * CHAPTER 01 — THE VOID
 * Pure darkness → particles awaken → sacred geometry forms → whispered lines →
 * a monumental OWN KARMA reveal emerging from the cosmos.
 */
export default function ChapterVoid() {
  const wrapRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const markRef = useRef<HTMLDivElement>(null);
  const markInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);

  useScrollScene(wrapRef, (p) => {
    // particles awaken 0 → 0.18
    if (starsRef.current) {
      starsRef.current.style.opacity = `${0.12 + easeOut(p / 0.18) * 0.88}`;
    }

    // sacred geometry forms (peaks mid-chapter, recedes before the reveal)
    if (geoRef.current) {
      const form = bell(p, 0.02, 0.78);
      geoRef.current.style.opacity = `${form * 0.9}`;
      geoRef.current.style.transform = `translate(-50%,-50%) rotate(${
        p * 90
      }deg) scale(${0.6 + easeOut(p / 0.7) * 0.6})`;
    }

    // whispered lines
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const [s, e] = WINDOWS[i];
      const b = bell(p, s, e);
      el.style.opacity = `${b}`;
      el.style.transform = `translateY(${(1 - b) * 26}px)`;
      el.style.filter = `blur(${(1 - b) * 6}px)`;
    });

    // scroll hint fades on first movement
    if (hintRef.current) {
      hintRef.current.style.opacity = `${clamp01(1 - p / 0.06)}`;
    }

    // monumental wordmark reveal 0.74 → 1
    const rev = easeOut((p - 0.74) / 0.26);
    if (markRef.current) {
      markRef.current.style.opacity = `${clamp01(rev * 1.4)}`;
    }
    if (markInnerRef.current) {
      markInnerRef.current.style.transform = `scale(${0.82 + rev * 0.18})`;
      markInnerRef.current.style.letterSpacing = `${0.12 + rev * 0.18}em`;
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = `${rev * 0.9}`;
      glowRef.current.style.transform = `translate(-50%,-50%) scale(${
        0.6 + rev * 0.9
      })`;
    }
    if (emblemRef.current) {
      emblemRef.current.style.opacity = `${rev * 0.5}`;
      emblemRef.current.style.transform = `translate(-50%,-50%) rotate(${
        -30 + rev * 30
      }deg) scale(${0.7 + rev * 0.5})`;
    }
  });

  return (
    <section ref={wrapRef} id="top" className="relative h-[480vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-obsidian">
        {/* particle cosmos */}
        <div ref={starsRef} className="absolute inset-0" style={{ opacity: 0.12 }}>
          <StarField density={0.0002} />
        </div>

        {/* forming sacred geometry */}
        <div
          ref={geoRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[92vmin] w-[92vmin] text-gold/40"
          style={{ opacity: 0, transform: "translate(-50%,-50%)" }}
        >
          <Glyph
            name="flower"
            className="absolute inset-0 h-full w-full"
            strokeWidth={0.35}
          />
          <Glyph
            name="metatron"
            className="anim-spin-slow absolute inset-[12%] h-[76%] w-[76%] opacity-70"
            strokeWidth={0.35}
          />
          <Glyph
            name="compass"
            className="anim-spin-reverse absolute inset-[26%] h-[48%] w-[48%] opacity-60"
            strokeWidth={0.4}
          />
        </div>

        {/* central glow behind the reveal */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] rounded-full"
          style={{
            opacity: 0,
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle, rgba(201,162,75,0.35), rgba(138,109,59,0.08) 45%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />

        {/* whispered lines */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {LINES.map((l, i) => (
            <p
              key={l}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="absolute max-w-3xl text-center font-serif text-2xl font-light italic leading-snug text-ivory/90 sm:text-4xl md:text-5xl"
              style={{ opacity: 0 }}
            >
              {l}
            </p>
          ))}
        </div>

        {/* the reveal */}
        <div
          ref={markRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div
            ref={emblemRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] text-gold/30"
            style={{ opacity: 0, transform: "translate(-50%,-50%)" }}
          >
            <Glyph name="mandala" className="h-full w-full" strokeWidth={0.3} />
          </div>
          <div ref={markInnerRef} className="relative text-center">
            <h1 className="text-gradient-shimmer font-serif text-[15vw] font-medium leading-none tracking-[0.12em] sm:text-[13vw] md:text-[11rem]">
              OWN
            </h1>
            <h1 className="text-gradient-shimmer -mt-[2vw] font-serif text-[15vw] font-medium leading-none tracking-[0.12em] sm:text-[13vw] md:text-[11rem]">
              KARMA
            </h1>
          </div>
          <p className="relative mt-8 text-[0.62rem] uppercase tracking-luxe text-ash sm:text-xs">
            Wearable Philosophy For The Unbound
          </p>
        </div>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_40%,rgba(6,6,8,0.9)_100%)]" />

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="mb-3 block text-[0.58rem] uppercase tracking-luxe text-ash">
            Scroll to begin
          </span>
          <span className="mx-auto block h-12 w-px animate-pulse bg-gradient-to-b from-gold/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
