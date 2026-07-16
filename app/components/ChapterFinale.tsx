"use client";

import { useRef } from "react";
import StarField from "./StarField";
import MagneticButton from "./MagneticButton";
import { Glyph, type GlyphName } from "./Glyph";
import { useScrollScene } from "../lib/useScrollScene";

const LINES = ["Your Journey.", "Your Identity.", "Your Legacy.", "Your Karma."];
const WINDOWS: [number, number][] = [
  [0.08, 0.26],
  [0.26, 0.44],
  [0.44, 0.62],
  [0.62, 0.8],
];

const TUNNEL: GlyphName[] = ["flower", "mandala", "metatron", "compass", "rose"];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3);

function bell(p: number, start: number, end: number) {
  if (p < start || p > end) return 0;
  const t = (p - start) / (end - start);
  return Math.sin(t * Math.PI);
}

/**
 * CHAPTER 08 — FINAL IMMERSIVE CTA
 * A cosmic tunnel where every symbol from the journey rushes inward and merges
 * into a single emblem, resolving into the final invitation.
 */
export default function ChapterFinale() {
  const wrapRef = useRef<HTMLElement>(null);
  const tunnelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const emblemRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollScene(wrapRef, (p) => {
    // tunnel rush — layered rings scale outward toward the viewer
    tunnelRefs.current.forEach((el, i) => {
      if (!el) return;
      const phase = (p + i / TUNNEL.length) % 1;
      const scale = 0.2 + phase * 2.6;
      const op = Math.sin(phase * Math.PI) * 0.4;
      el.style.transform = `translate(-50%,-50%) scale(${scale}) rotate(${
        phase * 120 + i * 24
      }deg)`;
      el.style.opacity = `${op}`;
    });

    // final emblem forms and brightens
    if (emblemRef.current) {
      const f = easeOut(p);
      emblemRef.current.style.opacity = `${0.2 + f * 0.8}`;
      emblemRef.current.style.transform = `translate(-50%,-50%) scale(${
        0.7 + f * 0.4
      }) rotate(${p * 60}deg)`;
    }

    // lines
    lineRefs.current.forEach((el, i) => {
      if (!el) return;
      const [s, e] = WINDOWS[i];
      const b = bell(p, s, e);
      el.style.opacity = `${b}`;
      el.style.transform = `translateY(${(1 - b) * 24}px)`;
    });

    // CTA resolves at the end
    const rev = easeOut((p - 0.82) / 0.18);
    if (ctaRef.current) {
      ctaRef.current.style.opacity = `${rev}`;
      ctaRef.current.style.transform = `translateY(${(1 - rev) * 30}px)`;
    }
  });

  return (
    <section ref={wrapRef} id="enter" className="relative h-[520vh] bg-obsidian">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-cosmic">
        <StarField density={0.00018} />
        <div className="bg-grain absolute inset-0" />

        {/* cosmic tunnel */}
        <div className="pointer-events-none absolute inset-0">
          {TUNNEL.map((g, i) => (
            <div
              key={g + i}
              ref={(el) => {
                tunnelRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] text-gold/40"
              style={{ transform: "translate(-50%,-50%)" }}
            >
              <Glyph name={g} className="h-full w-full" strokeWidth={0.3} />
            </div>
          ))}
        </div>

        {/* merged emblem */}
        <div
          ref={emblemRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[42vmin] w-[42vmin] text-gold-soft"
          style={{ transform: "translate(-50%,-50%)", opacity: 0.2 }}
        >
          <Glyph
            name="mandala"
            className="absolute inset-0 h-full w-full"
            strokeWidth={0.4}
          />
          <Glyph
            name="metatron"
            className="absolute inset-[18%] h-[64%] w-[64%] opacity-70"
            strokeWidth={0.4}
          />
        </div>

        {/* central glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.22),transparent_68%)] blur-2xl" />

        {/* sequential lines */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          {LINES.map((l, i) => (
            <p
              key={l}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="absolute text-center font-serif text-4xl font-light italic text-ivory sm:text-6xl md:text-7xl"
              style={{ opacity: 0 }}
            >
              {l}
            </p>
          ))}
        </div>

        {/* final invitation */}
        <div
          ref={ctaRef}
          className="relative flex flex-col items-center text-center"
          style={{ opacity: 0 }}
        >
          <span className="mb-8 text-[0.6rem] uppercase tracking-luxe text-ash">
            The journey is yours
          </span>
          <div className="anim-pulse-glow">
            <MagneticButton href="#collection" variant="solid" strength={0.4}>
              Enter the Collection
            </MagneticButton>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_45%,rgba(6,6,8,0.85)_100%)]" />
      </div>
    </section>
  );
}
