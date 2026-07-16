"use client";

import { useRef } from "react";

/**
 * Magnetic button — subtly pulls toward the cursor for a premium tactile feel.
 * Falls back to a static element when reduced-motion is preferred.
 */
export default function MagneticButton({
  children,
  href,
  variant = "outline",
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "outline" | "solid";
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");
    if (inner) {
      inner.style.transform = `translate(${x * strength * 0.4}px, ${
        y * strength * 0.4
      }px)`;
    }
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
    const inner = el.querySelector<HTMLElement>("[data-magnetic-inner]");
    if (inner) inner.style.transform = "translate(0, 0)";
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 px-9 py-4 text-[0.7rem] font-medium uppercase tracking-wide-2 will-change-transform";
  const style =
    variant === "solid"
      ? "btn-solid rounded-full"
      : "btn-luxe rounded-full text-ivory";

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${style} ${className}`}
      style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
    >
      <span
        data-magnetic-inner
        className="relative z-10 inline-flex items-center gap-3"
        style={{ transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {children}
      </span>
    </a>
  );
}
