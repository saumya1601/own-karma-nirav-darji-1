"use client";

import Reveal from "./Reveal";
import StarField from "./StarField";
import { Glyph, type GlyphName } from "./Glyph";

type Artifact = {
  concept: string;
  line: string;
  glyph: GlyphName;
  edition: string;
};

const ARTIFACTS: Artifact[] = [
  { concept: "Balance", line: "Hold the opposites without breaking.", glyph: "duality", edition: "I / VII" },
  { concept: "Time", line: "Every phase, honoured.", glyph: "lunar", edition: "II / VII" },
  { concept: "Karma", line: "The loop that remembers.", glyph: "infinity", edition: "III / VII" },
  { concept: "Duality", line: "Two truths, one light.", glyph: "eclipse", edition: "IV / VII" },
  { concept: "Transformation", line: "Growth has a shape.", glyph: "fibonacci", edition: "V / VII" },
  { concept: "Legacy", line: "Build what outlives you.", glyph: "column", edition: "VI / VII" },
  { concept: "Cosmos", line: "You are made of distant fire.", glyph: "orbit", edition: "VII / VII" },
];

/**
 * CHAPTER 06 — COLLECTION REVEAL
 * A darkened gallery. Each concept stands under a volumetric spotlight,
 * slowly turning like a rare artifact. A cinematic, snap-scrolling vitrine.
 */
export default function ChapterCollection() {
  return (
    <section
      id="collection"
      className="relative overflow-hidden border-y border-white/5 bg-obsidian py-28"
    >
      <StarField density={0.00008} className="opacity-50" />
      <div className="bg-grain absolute inset-0" />
      {/* overhead gallery light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(201,162,75,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal className="text-center">
          <span className="text-[0.6rem] uppercase tracking-luxe text-ash">
            Chapter VI — The First Expression
          </span>
          <h2 className="mt-4 font-serif text-5xl tracking-wide text-ivory sm:text-7xl">
            Collection I<span className="text-gold-soft"> · </span>The Unbound
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ash">
            Seven pieces. Seven ideas. Each one an artifact of a life lived on
            your own terms.
          </p>
        </Reveal>
      </div>

      {/* vitrine — horizontal snap carousel */}
      <div className="ok-scroll relative mt-16 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-8 sm:px-[10vw]">
        {ARTIFACTS.map((a) => (
          <article
            key={a.concept}
            className="group relative flex w-[78vw] max-w-sm flex-shrink-0 snap-center flex-col items-center sm:w-[26rem]"
          >
            {/* spotlight beam */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-2/3 w-2/3 -translate-x-1/2 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(201,162,75,0.16),transparent_70%)] opacity-60 transition-opacity duration-700 group-hover:opacity-100" />

            {/* plinth + artifact */}
            <div className="relative flex aspect-square w-full items-center justify-center">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(20,20,26,0.9),transparent_65%)]" />
              <Glyph
                name="labyrinth"
                className="anim-spin-reverse absolute h-[92%] w-[92%] text-white/[0.05]"
                strokeWidth={0.3}
              />
              <Glyph
                name={a.glyph}
                className="anim-spin-slow relative h-[56%] w-[56%] text-gold-soft/85 transition-all duration-700 group-hover:text-gold group-hover:drop-shadow-[0_0_24px_rgba(201,162,75,0.45)]"
                strokeWidth={0.5}
              />
              <span className="absolute bottom-2 text-[0.55rem] uppercase tracking-luxe text-muted">
                {a.edition}
              </span>
            </div>

            {/* plinth reflection */}
            <div className="mt-2 h-px w-2/3 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="mt-6 text-center">
              <h3 className="font-serif text-3xl tracking-wide text-ivory">
                {a.concept}
              </h3>
              <p className="mt-3 max-w-xs text-sm font-light italic text-ash">
                {a.line}
              </p>
              <button className="btn-luxe mt-6 rounded-full px-7 py-2.5 text-[0.6rem] uppercase tracking-luxe text-ivory">
                <span className="relative z-10">View Piece</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="relative mt-4 text-center text-[0.58rem] uppercase tracking-luxe text-muted">
        Drag to explore the vitrine
      </p>
    </section>
  );
}
