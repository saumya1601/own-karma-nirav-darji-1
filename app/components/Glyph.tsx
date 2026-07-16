import type { SVGProps } from "react";

/**
 * OWN KARMA glyph library — abstract, minimal reinterpretations of timeless
 * motifs (never literal cultural or religious symbols). Pure line-art SVG so
 * they stay crisp, weightless and animatable via the `.draw-line` class.
 */

type GlyphName =
  | "flower"
  | "metatron"
  | "fibonacci"
  | "mandala"
  | "eclipse"
  | "lunar"
  | "orbit"
  | "labyrinth"
  | "rose"
  | "tree"
  | "infinity"
  | "duality"
  | "laurel"
  | "column"
  | "eye"
  | "compass";

export function Glyph({
  name,
  draw = false,
  className = "",
  strokeWidth = 1,
  ...props
}: {
  name: GlyphName;
  draw?: boolean;
  strokeWidth?: number;
} & SVGProps<SVGSVGElement>) {
  const line = draw ? "draw-line" : "";
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <g {...common}>{shapes(name, line)}</g>
    </svg>
  );
}

function shapes(name: GlyphName, line: string) {
  // Round trig-derived coordinates so server/client SVG strings match exactly
  // (prevents floating-point hydration mismatches) and keeps the DOM lean.
  const R = (v: number) => Math.round(v * 1000) / 1000;
  switch (name) {
    case "flower": {
      // Flower of Life — abstract 7-circle arrangement
      const r = 15;
      const cx = 50;
      const cy = 50;
      const pts: [number, number][] = [
        [cx, cy],
        [cx, cy - r],
        [cx, cy + r],
        [R(cx - r * 0.866), R(cy - r / 2)],
        [R(cx + r * 0.866), R(cy - r / 2)],
        [R(cx - r * 0.866), R(cy + r / 2)],
        [R(cx + r * 0.866), R(cy + r / 2)],
      ];
      return (
        <>
          {pts.map(([x, y], i) => (
            <circle key={i} className={line} cx={x} cy={y} r={r} />
          ))}
          <circle cx={cx} cy={cy} r={r * 2} opacity={0.5} />
        </>
      );
    }
    case "metatron": {
      // Abstract cube / connected vertices
      const pts: [number, number][] = [
        [50, 14],
        [82, 32],
        [82, 68],
        [50, 86],
        [18, 68],
        [18, 32],
      ];
      return (
        <>
          <circle cx={50} cy={50} r={38} opacity={0.4} />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={4} />
          ))}
          {pts.map((a, i) =>
            pts.map((b, j) =>
              j > i ? (
                <line
                  key={`${i}-${j}`}
                  className={line}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  opacity={0.55}
                />
              ) : null
            )
          )}
        </>
      );
    }
    case "fibonacci":
      return (
        <>
          <path
            className={line}
            d="M50 50 m0 0 a5 5 0 0 1 5 -5 a10 10 0 0 1 10 10 a20 20 0 0 1 -20 20 a40 40 0 0 1 -40 -40 a80 80 0 0 1 80 -80"
          />
          <rect x={10} y={10} width={80} height={80} opacity={0.25} />
          <rect x={50} y={10} width={40} height={40} opacity={0.25} />
          <rect x={50} y={30} width={20} height={20} opacity={0.25} />
        </>
      );
    case "mandala": {
      const petals = 12;
      return (
        <>
          <circle className={line} cx={50} cy={50} r={38} />
          <circle cx={50} cy={50} r={26} opacity={0.5} />
          <circle cx={50} cy={50} r={8} />
          {Array.from({ length: petals }).map((_, i) => {
            const a = (i / petals) * Math.PI * 2;
            const x1 = R(50 + Math.cos(a) * 8);
            const y1 = R(50 + Math.sin(a) * 8);
            const x2 = R(50 + Math.cos(a) * 38);
            const y2 = R(50 + Math.sin(a) * 38);
            const mx = R(50 + Math.cos(a + 0.26) * 24);
            const my = R(50 + Math.sin(a + 0.26) * 24);
            return (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.6} />
                <path
                  d={`M${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  opacity={0.45}
                />
              </g>
            );
          })}
        </>
      );
    }
    case "eclipse":
      return (
        <>
          <circle className={line} cx={50} cy={50} r={30} />
          <circle cx={62} cy={44} r={30} opacity={0.55} />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={R(50 + Math.cos(a) * 34)}
                y1={R(50 + Math.sin(a) * 34)}
                x2={R(50 + Math.cos(a) * 40)}
                y2={R(50 + Math.sin(a) * 40)}
                opacity={0.5}
              />
            );
          })}
        </>
      );
    case "lunar":
      return (
        <>
          {[20, 35, 50, 65, 80].map((x, i) => (
            <circle key={i} cx={x} cy={50} r={7} opacity={i === 2 ? 1 : 0.5} />
          ))}
          <path
            className={line}
            d="M13 50 Q 50 30 87 50"
            opacity={0.4}
          />
        </>
      );
    case "orbit":
      return (
        <>
          <circle cx={50} cy={50} r={5} />
          <ellipse className={line} cx={50} cy={50} rx={40} ry={16} />
          <ellipse
            cx={50}
            cy={50}
            rx={40}
            ry={16}
            transform="rotate(60 50 50)"
            opacity={0.6}
          />
          <ellipse
            cx={50}
            cy={50}
            rx={40}
            ry={16}
            transform="rotate(120 50 50)"
            opacity={0.6}
          />
          <circle cx={90} cy={50} r={2.5} />
        </>
      );
    case "labyrinth":
      return (
        <>
          {[36, 28, 20, 12].map((r, i) => (
            <circle key={i} cx={50} cy={50} r={r} opacity={0.75 - i * 0.12} />
          ))}
          <line className={line} x1={50} y1={12} x2={50} y2={50} />
          <circle cx={50} cy={50} r={3} />
        </>
      );
    case "rose": {
      const n = 8;
      return (
        <>
          <circle className={line} cx={50} cy={50} r={38} />
          <circle cx={50} cy={50} r={14} />
          {Array.from({ length: n }).map((_, i) => {
            const a = (i / n) * Math.PI * 2;
            const x = R(50 + Math.cos(a) * 26);
            const y = R(50 + Math.sin(a) * 26);
            return <circle key={i} cx={x} cy={y} r={12} opacity={0.55} />;
          })}
        </>
      );
    }
    case "tree":
      return (
        <>
          <line className={line} x1={50} y1={90} x2={50} y2={40} />
          <path d="M50 40 Q 30 30 24 14" opacity={0.7} />
          <path d="M50 40 Q 70 30 76 14" opacity={0.7} />
          <path d="M50 52 Q 36 46 30 34" opacity={0.6} />
          <path d="M50 52 Q 64 46 70 34" opacity={0.6} />
          <path d="M50 90 Q 34 84 26 74" opacity={0.6} />
          <path d="M50 90 Q 66 84 74 74" opacity={0.6} />
          <circle cx={50} cy={30} r={22} opacity={0.35} />
        </>
      );
    case "infinity":
      return (
        <path
          className={line}
          d="M50 50 C 40 34 18 34 18 50 C 18 66 40 66 50 50 C 60 34 82 34 82 50 C 82 66 60 66 50 50 Z"
        />
      );
    case "duality":
      return (
        <>
          <circle className={line} cx={50} cy={50} r={36} />
          <path
            d="M50 14 A 18 18 0 0 1 50 50 A 18 18 0 0 0 50 86 A 36 36 0 0 1 50 14 Z"
            opacity={0.7}
          />
          <circle cx={50} cy={32} r={4} />
          <circle cx={50} cy={68} r={4} />
        </>
      );
    case "laurel":
      return (
        <>
          <path className={line} d="M50 90 Q 26 60 30 20" />
          <path className={line} d="M50 90 Q 74 60 70 20" />
          {Array.from({ length: 6 }).map((_, i) => {
            const t = i / 6;
            return (
              <g key={i} opacity={0.7}>
                <path
                  d={`M${30 + t * 8} ${74 - t * 46} q -8 -4 -12 -1`}
                />
                <path
                  d={`M${70 - t * 8} ${74 - t * 46} q 8 -4 12 -1`}
                />
              </g>
            );
          })}
        </>
      );
    case "column":
      return (
        <>
          <line x1={30} y1={20} x2={30} y2={80} />
          <line x1={42} y1={20} x2={42} y2={80} />
          <line x1={54} y1={20} x2={54} y2={80} opacity={0.7} />
          <line x1={66} y1={20} x2={66} y2={80} opacity={0.7} />
          <path className={line} d="M22 20 L 74 20" />
          <path d="M18 24 L 78 24" opacity={0.6} />
          <path d="M18 82 L 78 82" />
          <path d="M14 86 L 82 86" opacity={0.6} />
        </>
      );
    case "eye":
      return (
        <>
          <path
            className={line}
            d="M14 50 Q 50 22 86 50 Q 50 78 14 50 Z"
          />
          <circle cx={50} cy={50} r={11} />
          <circle cx={50} cy={50} r={4} />
          <path d="M50 61 L 46 82" opacity={0.6} />
          <path d="M66 58 Q 72 72 64 84" opacity={0.6} />
        </>
      );
    case "compass":
      return (
        <>
          <circle className={line} cx={50} cy={50} r={38} />
          <circle cx={50} cy={50} r={3} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const long = i % 2 === 0;
            return (
              <line
                key={i}
                x1={R(50 + Math.cos(a) * (long ? 30 : 34))}
                y1={R(50 + Math.sin(a) * (long ? 30 : 34))}
                x2={R(50 + Math.cos(a) * 38)}
                y2={R(50 + Math.sin(a) * 38)}
                opacity={long ? 0.9 : 0.5}
              />
            );
          })}
          <path d="M50 20 L 58 50 L 50 80 L 42 50 Z" opacity={0.7} />
        </>
      );
    default:
      return null;
  }
}

export type { GlyphName };
