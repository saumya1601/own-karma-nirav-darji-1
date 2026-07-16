"use client";

import { useRef } from "react";
import { useScrollScene } from "../lib/useScrollScene";

const CONCEPTS: { word: string; line: string }[] = [
  { word: "Identity", line: "Who you are is a decision you make each day." },
  { word: "Choice", line: "Every fork in the road is a mirror." },
  { word: "Legacy", line: "What you leave behind begins now." },
  { word: "Time", line: "The one current that cannot be earned, only spent." },
  { word: "Transformation", line: "To become, the old self must dissolve." },
  { word: "Karma", line: "The echo of everything you set in motion." },
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * CHAPTER 04 — THE HUMAN JOURNEY
 * The cosmos collapses inward and becomes personal. Monumental kinetic
 * typography carries the visitor through the concepts OWN KARMA is built on,
 * while an abstract silhouette walks through light and shadow.
 */
export default function ChapterJourney() {
  const wrapRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const figureRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useScrollScene(wrapRef, (p) => {
    const n = CONCEPTS.length;
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      const center = (i + 0.5) / n;
      const d = (p - center) * n; // -1..1 near its slice
      const vis = clamp01(1 - Math.abs(d) * 1.35);
      el.style.opacity = `${vis}`;
      el.style.transform = `translateY(${d * -70}px) scale(${
        0.7 + vis * 0.3
      })`;
      el.style.filter = `blur(${(1 - vis) * 10}px)`;
    });

    // silhouette walks left → right through the chapter
    if (figureRef.current) {
      figureRef.current.style.transform = `translateX(${
        (p - 0.5) * 60
      }vw) translateY(0)`;
      figureRef.current.style.opacity = `${0.16 + Math.sin(p * Math.PI) * 0.2}`;
    }
    if (beamRef.current) {
      beamRef.current.style.opacity = `${0.25 + Math.sin(p * Math.PI) * 0.35}`;
    }
  });

  return (
    <section
      ref={wrapRef}
      id="journey"
      className="relative h-[560vh] bg-obsidian"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-cosmic">
        <div className="bg-grain absolute inset-0" />

        {/* volumetric light beam */}
        <div
          ref={beamRef}
          className="pointer-events-none absolute left-1/2 top-0 h-full w-[40vw] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(201,162,75,0.14), transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* abstract walking silhouette */}
        <div
          ref={figureRef}
          className="pointer-events-none absolute bottom-0 left-1/2 h-[62vh] w-[16vh] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(6,6,8,0.9))",
            clipPath:
              "polygon(42% 0, 58% 0, 60% 22%, 66% 40%, 60% 62%, 64% 100%, 52% 100%, 50% 66%, 48% 100%, 36% 100%, 40% 62%, 34% 40%, 40% 22%)",
            opacity: 0.16,
          }}
        />

        {/* kinetic typography stack */}
        <div className="relative flex w-full flex-col items-center justify-center px-6">
          {CONCEPTS.map((c, i) => (
            <div
              key={c.word}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="absolute flex flex-col items-center text-center will-change-transform"
              style={{ opacity: 0 }}
            >
              <h3 className="text-gradient-gold font-serif text-[16vw] font-medium leading-none tracking-tight sm:text-[13vw] md:text-[10rem]">
                {c.word}
              </h3>
              <p className="mt-4 max-w-md text-sm font-light tracking-wide text-silver/70 sm:text-base">
                {c.line}
              </p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_45%,rgba(6,6,8,0.9)_100%)]" />
      </div>
    </section>
  );
}
