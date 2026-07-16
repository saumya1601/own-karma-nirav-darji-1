"use client";

import {
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-triggered reveal wrapper. Adds `data-inview="true"` when the element
 * enters the viewport so CSS transitions in globals.css can animate it in.
 * Uses a single IntersectionObserver per instance; unobserves after reveal.
 */
export default function Reveal({
  as,
  children,
  className = "",
  delay = 0,
  once = true,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-inview", "true");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.setAttribute("data-inview", "false");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}
