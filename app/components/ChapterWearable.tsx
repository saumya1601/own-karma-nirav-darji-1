"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { Glyph, type GlyphName } from "./Glyph";
import { useScrollScene } from "../lib/useScrollScene";

type Piece = {
  concept: string;
  philosophy: string;
  garment: string;
  story: string;
  price: string;
  glyph: GlyphName;
  tone: string;
};

const PIECES: Piece[] = [
  {
    concept: "Balance",
    philosophy: "Balance is not stillness — it is a thousand quiet corrections, made gracefully.",
    garment: "The Equilibrium Tee",
    story:
      "Hand-finished heavyweight cotton, printed with a duality mark that shifts as light moves across it.",
    price: "€180",
    glyph: "duality",
    tone: "rgba(201,162,75,0.5)",
  },
  {
    concept: "Time",
    philosophy: "You do not run out of time. You run out of attention.",
    garment: "Chrono Overshirt",
    story:
      "An architectural overshirt bearing a lunar cycle — a reminder that every phase is temporary, and necessary.",
    price: "€320",
    glyph: "lunar",
    tone: "rgba(169,166,214,0.5)",
  },
  {
    concept: "Karma",
    philosophy: "What you give returns — wearing a different face.",
    garment: "The Return Hood",
    story:
      "Draped organic fleece marked with an unbroken loop, worn by those who understand that nothing is truly lost.",
    price: "€260",
    glyph: "infinity",
    tone: "rgba(216,185,120,0.5)",
  },
];

/** Abstract garment "artifact" — a minimal tee silhouette carrying the mark. */
function Artifact({ glyph, tone }: { glyph: GlyphName; tone: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useScrollScene(wrapRef, (_p, ratio) => {
    if (ref.current) {
      const s = 0.9 + ratio * 0.1;
      ref.current.style.transform = `translateY(${(1 - ratio) * 30}px) scale(${s})`;
    }
  });

  return (
    <div ref={wrapRef} className="relative flex items-center justify-center">
      <div
        className="pointer-events-none absolute h-[70%] w-[70%] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${tone}, transparent 65%)` }}
      />
      <div
        ref={ref}
        className="group relative h-[46vh] w-[38vh] will-change-transform"
        style={{ transition: "transform 0.2s linear" }}
      >
        {/* garment silhouette */}
        <svg
          viewBox="0 0 300 360"
          className="absolute inset-0 h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`cloth-${glyph}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1c1c24" />
              <stop offset="1" stopColor="#0a0a0d" />
            </linearGradient>
          </defs>
          <path
            d="M104 34 L150 58 L196 34 L262 78 L238 132 L212 118 L212 330 Q150 344 88 330 L88 118 L62 132 L38 78 Z"
            fill={`url(#cloth-${glyph})`}
            stroke="rgba(201,162,75,0.25)"
            strokeWidth="1"
          />
        </svg>
        {/* printed mark */}
        <div className="absolute inset-0 flex items-center justify-center pt-[8%] text-gold-soft/85">
          <Glyph
            name={glyph}
            className="h-[38%] w-[38%] transition-transform duration-[1200ms] group-hover:scale-110"
            strokeWidth={0.7}
          />
        </div>
      </div>
    </div>
  );
}

function PieceBlock({ piece, index }: { piece: Piece; index: number }) {
  const flip = index % 2 === 1;
  return (
    <div className="grid items-center gap-12 py-[12vh] lg:grid-cols-2 lg:gap-8">
      {/* artifact */}
      <div className={flip ? "lg:order-2" : ""}>
        <Artifact glyph={piece.glyph} tone={piece.tone} />
      </div>

      {/* narrative: philosophy → symbol → story → product → cta */}
      <div className={`${flip ? "lg:order-1" : ""} max-w-xl`}>
        <Reveal>
          <span className="text-[0.6rem] uppercase tracking-luxe text-gold-soft/70">
            {String(index + 1).padStart(2, "0")} — Wearable Philosophy
          </span>
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-6 font-serif text-3xl font-light italic leading-snug text-ivory sm:text-4xl">
            “{piece.philosophy}”
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 flex items-center gap-4">
            <Glyph
              name={piece.glyph}
              className="h-9 w-9 text-gold"
              strokeWidth={0.8}
            />
            <span className="text-[0.62rem] uppercase tracking-luxe text-ash">
              The mark of {piece.concept}
            </span>
          </div>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-gold/40 to-transparent" />
          <div className="mt-8 flex items-end justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-ivory">{piece.garment}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash">
                {piece.story}
              </p>
            </div>
            <span className="font-serif text-lg text-gold-soft">
              {piece.price}
            </span>
          </div>
        </Reveal>
        <Reveal delay={4}>
          <div className="mt-8">
            <MagneticButton href="#collection">View Piece</MagneticButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/**
 * CHAPTER 05 — WEARABLE PHILOSOPHY
 * Products are never dropped into a grid — each garment emerges from its idea:
 * philosophy → symbol → story → product → invitation.
 */
export default function ChapterWearable() {
  return (
    <section
      id="wearable"
      className="relative overflow-hidden bg-obsidian py-[14vh]"
    >
      <div className="bg-grain absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 text-center">
        <Reveal>
          <span className="text-[0.6rem] uppercase tracking-luxe text-ash">
            Chapter V
          </span>
          <h2 className="mt-3 font-serif text-4xl tracking-wide text-ivory sm:text-6xl">
            Not just worn. Interpreted.
          </h2>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-[26vh] max-w-6xl px-6 sm:px-10">
        {PIECES.map((p, i) => (
          <PieceBlock key={p.garment} piece={p} index={i} />
        ))}
      </div>
    </section>
  );
}
