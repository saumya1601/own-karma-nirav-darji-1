"use client";

import { useRef } from "react";
import StarField from "./StarField";
import { Glyph, type GlyphName } from "./Glyph";
import { useScrollScene } from "../lib/useScrollScene";

type Realm = {
  index: string;
  name: string;
  line: string;
  glyphs: GlyphName[];
  tint: string;
  accent: string;
  stars?: boolean;
};

const REALMS: Realm[] = [
  {
    index: "I",
    name: "Mythology",
    line: "The oldest stories were never about gods. They were about us.",
    glyphs: ["eye", "laurel", "tree"],
    tint: "radial-gradient(90% 90% at 30% 40%, rgba(138,109,59,0.18), transparent 60%)",
    accent: "#c9a24b",
  },
  {
    index: "II",
    name: "Sacred Geometry",
    line: "Everything that breathes is built on the same silent proportions.",
    glyphs: ["flower", "metatron", "fibonacci"],
    tint: "radial-gradient(90% 90% at 70% 40%, rgba(201,162,75,0.16), transparent 60%)",
    accent: "#d8b978",
  },
  {
    index: "III",
    name: "Cosmos",
    line: "We are a way for the universe to wear meaning.",
    glyphs: ["orbit", "eclipse", "lunar"],
    tint: "radial-gradient(90% 90% at 40% 50%, rgba(84,74,120,0.28), transparent 62%)",
    accent: "#a9a6d6",
    stars: true,
  },
  {
    index: "IV",
    name: "Civilizations",
    line: "Empires fade to dust. What they believed becomes architecture of the soul.",
    glyphs: ["column", "compass", "labyrinth"],
    tint: "radial-gradient(90% 90% at 55% 55%, rgba(58,78,96,0.22), transparent 60%)",
    accent: "#c6cad6",
  },
];

/**
 * CHAPTER 03 — THE UNIVERSE OF INSPIRATION
 * A pinned, cinematic horizontal voyage through four realms, each a movie
 * scene with atmospheric depth, floating symbols and a philosophical line.
 */
export default function ChapterUniverse() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollScene(wrapRef, (p) => {
    const track = trackRef.current;
    if (track) {
      const maxShift = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-p * maxShift}px,0,0)`;
    }
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    if (counterRef.current) {
      counterRef.current.textContent = REALMS[
        Math.min(REALMS.length - 1, Math.floor(p * REALMS.length))
      ].index;
    }
    // gentle intra-panel parallax
    parallaxRefs.current.forEach((el, i) => {
      if (!el) return;
      const local = p * REALMS.length - i;
      el.style.transform = `translate3d(${local * -28}px,0,0)`;
    });
  });

  return (
    <section
      ref={wrapRef}
      id="universe"
      className="relative h-[440vh] bg-obsidian"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* section eyebrow */}
        <div className="pointer-events-none absolute left-6 top-8 z-20 sm:left-10">
          <span className="block text-[0.58rem] uppercase tracking-luxe text-ash">
            Chapter III
          </span>
          <span className="mt-1 block font-serif text-sm italic text-silver/70">
            The Universe of Inspiration
          </span>
        </div>

        {/* realm counter */}
        <div className="pointer-events-none absolute right-6 top-8 z-20 flex items-baseline gap-2 sm:right-10">
          <span
            ref={counterRef}
            className="font-serif text-2xl text-gold-soft"
          >
            I
          </span>
          <span className="text-[0.6rem] uppercase tracking-luxe text-muted">
            / IV
          </span>
        </div>

        {/* horizontal track */}
        <div
          ref={trackRef}
          className="flex h-full w-max will-change-transform"
          style={{ transition: "none" }}
        >
          {REALMS.map((r, i) => (
            <article
              key={r.name}
              className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden"
            >
              {/* atmosphere */}
              <div
                className="absolute inset-0"
                style={{ background: r.tint }}
              />
              {r.stars && <StarField density={0.00016} />}
              <div className="bg-grain absolute inset-0 opacity-60" />

              {/* floating symbol constellation */}
              <div
                ref={(el) => {
                  parallaxRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ color: r.accent }}
              >
                <Glyph
                  name={r.glyphs[0]}
                  className="anim-float absolute left-[12%] top-[22%] h-40 w-40 opacity-30 sm:h-64 sm:w-64"
                  strokeWidth={0.4}
                />
                <Glyph
                  name={r.glyphs[1]}
                  className="anim-spin-slow absolute right-[10%] top-[16%] h-32 w-32 opacity-20 sm:h-52 sm:w-52"
                  strokeWidth={0.4}
                />
                <Glyph
                  name={r.glyphs[2] ?? r.glyphs[0]}
                  className="anim-drift absolute bottom-[16%] right-[22%] h-28 w-28 opacity-25 sm:h-44 sm:w-44"
                  strokeWidth={0.4}
                />
              </div>

              {/* central hero glyph */}
              <Glyph
                name={r.glyphs[0]}
                className="anim-spin-slow pointer-events-none relative h-[52vmin] w-[52vmin] opacity-[0.14]"
                strokeWidth={0.3}
                style={{ color: r.accent }}
              />

              {/* content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span
                  className="font-serif text-7xl opacity-30 sm:text-8xl"
                  style={{ color: r.accent }}
                >
                  {r.index}
                </span>
                <h3 className="mt-4 font-serif text-4xl tracking-wide text-ivory sm:text-6xl md:text-7xl">
                  {r.name}
                </h3>
                <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
                <p className="mt-6 max-w-md font-serif text-lg font-light italic leading-relaxed text-silver/80 sm:text-xl">
                  {r.line}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_50%,rgba(6,6,8,0.8)_100%)]" />
            </article>
          ))}
        </div>

        {/* progress bar */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden bg-white/10 sm:w-64">
          <span
            ref={barRef}
            className="block h-full w-full origin-left bg-gradient-to-r from-bronze to-gold-soft"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
