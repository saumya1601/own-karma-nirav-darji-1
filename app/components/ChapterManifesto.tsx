"use client";

import { useRef } from "react";
import { useScrollScene } from "../lib/useScrollScene";

const PHRASES = ["NOT DEFINED", "NOT CONFINED", "NOT LIMITED", "UNBOUND"];
const WINDOWS: [number, number][] = [
  [0.02, 0.2],
  [0.2, 0.38],
  [0.38, 0.56],
  [0.56, 0.74],
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);

function bell(p: number, start: number, end: number) {
  if (p < start || p > end) return 0;
  const t = (p - start) / (end - start);
  return Math.sin(t * Math.PI);
}

/**
 * CHAPTER 07 — THE MANIFESTO
 * A fullscreen typographic crescendo — four denials resolving into "UNBOUND",
 * then the screen floods with light and OWN KARMA emerges.
 */
export default function ChapterManifesto() {
  const wrapRef = useRef<HTMLElement>(null);
  const phraseRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const flashRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useScrollScene(wrapRef, (p) => {
    phraseRefs.current.forEach((el, i) => {
      if (!el) return;
      const [s, e] = WINDOWS[i];
      const b = bell(p, s, e);
      const last = i === PHRASES.length - 1;
      el.style.opacity = `${b}`;
      el.style.transform = `translateY(${(1 - b) * 40}px) scale(${
        0.9 + b * (last ? 0.25 : 0.1)
      })`;
      el.style.letterSpacing = `${0.1 + b * (last ? 0.14 : 0.06)}em`;
    });

    // light explosion 0.72 → 0.86
    const burst = bell(p, 0.72, 0.9);
    if (flashRef.current) {
      flashRef.current.style.opacity = `${burst}`;
      flashRef.current.style.transform = `translate(-50%,-50%) scale(${
        0.2 + burst * 3
      })`;
    }

    // OWN KARMA emerges 0.84 → 1
    const rev = easeOut((p - 0.84) / 0.16);
    if (markRef.current) {
      markRef.current.style.opacity = `${rev}`;
      markRef.current.style.transform = `scale(${0.9 + rev * 0.1})`;
    }
  });

  return (
    <section
      ref={wrapRef}
      id="manifesto"
      className="relative h-[520vh] bg-obsidian"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="bg-grain absolute inset-0" />

        {/* phrases */}
        <div className="relative flex items-center justify-center px-6">
          {PHRASES.map((phrase, i) => (
            <h2
              key={phrase}
              ref={(el) => {
                phraseRefs.current[i] = el;
              }}
              className={`absolute text-center font-serif font-medium leading-none ${
                i === PHRASES.length - 1
                  ? "text-gradient-shimmer text-[18vw] sm:text-[15vw] md:text-[13rem]"
                  : "text-ivory text-[12vw] sm:text-[9vw] md:text-[8rem]"
              }`}
              style={{ opacity: 0 }}
            >
              {phrase}
            </h2>
          ))}
        </div>

        {/* light explosion */}
        <div
          ref={flashRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmin] w-[50vmin] rounded-full"
          style={{
            opacity: 0,
            transform: "translate(-50%,-50%) scale(0.2)",
            background:
              "radial-gradient(circle, rgba(255,247,230,0.9), rgba(201,162,75,0.4) 40%, transparent 70%)",
          }}
        />

        {/* final reveal */}
        <div
          ref={markRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: 0 }}
        >
          <h2 className="text-gradient-gold font-serif text-[13vw] font-medium leading-none tracking-[0.14em] sm:text-[10vw] md:text-[9rem]">
            OWN KARMA
          </h2>
          <p className="mt-6 text-[0.62rem] uppercase tracking-luxe text-ash">
            Fashion fades. Philosophy remains.
          </p>
        </div>
      </div>
    </section>
  );
}
