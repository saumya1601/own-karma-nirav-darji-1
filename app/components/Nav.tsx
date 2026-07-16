"use client";

import { useEffect, useState } from "react";
import { Glyph } from "./Glyph";

const LINKS = [
  { label: "Philosophy", href: "#origin" },
  { label: "Inspirations", href: "#universe" },
  { label: "Collection", href: "#collection" },
  { label: "Journal", href: "#journey" },
  { label: "Shop", href: "#wearable" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "glass border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10">
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label="OWN KARMA home"
        >
          <Glyph
            name="orbit"
            className="h-7 w-7 text-gold transition-transform duration-700 group-hover:rotate-45"
            strokeWidth={1.2}
          />
          <span className="font-serif text-lg tracking-[0.35em] text-ivory">
            OWN&nbsp;KARMA
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-[0.68rem] uppercase tracking-wide-2 text-silver/80 transition-colors hover:text-ivory"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#products"
          className="btn-luxe hidden rounded-full px-6 py-2.5 text-[0.66rem] uppercase tracking-wide-2 text-ivory lg:inline-flex"
        >
          <span className="relative z-10">Enter</span>
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`h-px w-6 bg-ivory transition-all duration-500 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ivory transition-all duration-500 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ivory transition-all duration-500 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`glass fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-700 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-serif text-3xl tracking-[0.2em] text-ivory/90 transition-colors hover:text-gold"
            style={{
              transitionDelay: open ? `${i * 60 + 100}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
              transition:
                "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s, color 0.3s",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
