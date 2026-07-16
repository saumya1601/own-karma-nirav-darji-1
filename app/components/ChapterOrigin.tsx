"use client";

import { useRef } from "react";
import { Glyph, type GlyphName } from "./Glyph";
import { useScrollScene } from "../lib/useScrollScene";

// abstract reinterpretations — lotus, greek, norse, sacred, cosmos, architecture
const SYMBOLS: { glyph: GlyphName; label: string }[] = [
  { glyph: "mandala", label: "Lotus" },
  { glyph: "rose", label: "Hellenic" },
  { glyph: "tree", label: "Yggdrasil" },
  { glyph: "metatron", label: "Sacred Geometry" },
  { glyph: "orbit", label: "Cosmos" },
  { glyph: "column", label: "Architecture" },
];

const LINES = [
  "Humanity has always searched for meaning.",
  "Through stories.",
  "Through symbols.",
  "Through civilizations.",
  "Through self-discovery.",
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function bell(p: number, start: number, end: number) {
  if (p < start || p > end) return 0;
  const t = (p - start) / (end - start);
  return Math.sin(t * Math.PI);
}

/**
 * CHAPTER 02 — THE ORIGIN OF MEANING
 * A living museum: one luminous form dissolves into the next across timeless
 * traditions while whispered lines trace humanity's search for meaning.
 */
export default function ChapterOrigin() {
  const wrapRef = useRef<HTMLElement>(null);
  const symbolRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const haloRef = useRef<HTMLDivElement>(null);

  useScrollScene(wrapRef, (p) => {
    const n = SYMBOLS.length;
    // each symbol owns an equal slice; cross-fade between neighbours
    symbolRefs.current.forEach((el, i) => {
      if (!el) return;
      const center = (i + 0.5) / n;
      const dist = Math.abs(p - center);
      const vis = clamp01(1 - dist * n * 1.25);
      el.style.opacity = `${vis}`;
      el.style.transform = `translate(-50%,-50%) scale(${
        0.8 + vis * 0.2
      }) rotate(${(p - center) * 60}deg)`;
    });

    // active label
    const idx = Math.min(n - 1, Math.floor(p * n));
    if (labelRef.current) {
      labelRef.current.textContent = SYMBOLS[idx].label;
    }

    if (haloRef.current) {
      haloRef.current.style.transform = `translate(-50%,-50%) scale(${
        0.9 + Math.sin(p * Math.PI) * 0.25
      })`;
    }

    // whispered lines
    const nl = LINES.length;
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const s = (i / nl) * 0.92 + 0.02;
      const b = bell(p, s, s + 0.92 / nl);
      el.style.opacity = `${b}`;
      el.style.transform = `translateY(${(1 - b) * 22}px)`;
    });
  });

  return (
    <section
      ref={wrapRef}
      id="origin"
      className="relative h-[420vh] bg-obsidian"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-cosmic">
        <div className="bg-grain absolute inset-0" />

        {/* morphing central form */}
        <div className="relative flex h-[70vmin] w-[70vmin] items-center justify-center">
          <div
            ref={haloRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,162,75,0.18), transparent 68%)",
              filter: "blur(4px)",
            }}
          />
          {SYMBOLS.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => {
                symbolRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 h-full w-full text-gold-soft/80"
              style={{ opacity: i === 0 ? 1 : 0, transform: "translate(-50%,-50%)" }}
            >
              <Glyph name={s.glyph} className="h-full w-full" strokeWidth={0.35} />
            </div>
          ))}
        </div>

        {/* active tradition label */}
        <span
          ref={labelRef}
          className="absolute top-[16vh] left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-luxe text-ash"
        >
          Lotus
        </span>

        {/* whispered lines */}
        <div className="pointer-events-none absolute bottom-[14vh] left-0 right-0 flex justify-center px-6">
          {LINES.map((l, i) => (
            <p
              key={l}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="absolute max-w-2xl text-center font-serif text-xl font-light italic text-ivory/85 sm:text-3xl"
              style={{ opacity: 0 }}
            >
              {l}
            </p>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_45%,rgba(6,6,8,0.85)_100%)]" />
      </div>
    </section>
  );
}
