"use client";

import { useEffect, useState } from "react";
import { Glyph } from "./Glyph";

/**
 * Full-screen cinematic preloader with the OWN KARMA mark.
 * Fades away once the window has loaded (or after a graceful max wait).
 */
export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const min = 1500;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, min - elapsed);
      window.setTimeout(() => setDone(true), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // hard cap so we never trap the visitor
    const cap = window.setTimeout(() => setDone(true), 3600);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(cap);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <div
      aria-hidden={done}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian transition-[opacity,visibility] duration-1000"
      style={{
        opacity: done ? 0 : 1,
        visibility: done ? "hidden" : "visible",
      }}
    >
      <div className="relative flex h-40 w-40 items-center justify-center text-gold">
        <Glyph
          name="compass"
          className="absolute inset-0 h-full w-full anim-spin-slow opacity-70"
          strokeWidth={0.75}
        />
        <Glyph
          name="mandala"
          className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] anim-spin-reverse opacity-50"
          strokeWidth={0.6}
        />
        <span className="anim-pulse-glow text-2xl font-serif tracking-luxe text-gold-soft">
          OK
        </span>
      </div>
      <div className="mt-10 overflow-hidden">
        <span className="block text-[0.62rem] uppercase tracking-luxe text-ash">
          Entering the universe
        </span>
      </div>
    </div>
  );
}
