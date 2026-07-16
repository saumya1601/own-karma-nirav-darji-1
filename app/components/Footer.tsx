import Reveal from "./Reveal";
import Newsletter from "./Newsletter";
import { Glyph } from "./Glyph";

const COLUMNS = [
  {
    heading: "Explore",
    links: ["Philosophy", "Inspirations", "Collection", "Journal"],
  },
  {
    heading: "The House",
    links: ["Our Story", "Craft", "Sustainability", "Contact"],
  },
  {
    heading: "Care",
    links: ["Shipping", "Returns", "Privacy", "Terms"],
  },
];

const SOCIALS = ["Instagram", "Pinterest", "Journal", "Behance"];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-grain relative overflow-hidden border-t border-white/5 bg-obsidian pt-24 pb-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 text-gold/[0.04]">
        <Glyph
          name="flower"
          className="anim-spin-slow h-[70vmin] w-[70vmin]"
          strokeWidth={0.4}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal className="grid gap-16 lg:grid-cols-[1.4fr_2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-3">
              <Glyph name="orbit" className="h-8 w-8 text-gold" strokeWidth={1.2} />
              <span className="font-serif text-2xl tracking-[0.35em] text-ivory">
                OWN&nbsp;KARMA
              </span>
            </div>
            <p className="mt-6 max-w-sm font-serif text-lg font-light italic leading-relaxed text-silver/70">
              Wearable philosophy for the unbound. Fashion fades. Philosophy
              remains.
            </p>
            <div className="mt-8 max-w-sm">
              <Newsletter />
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-5 text-[0.6rem] uppercase tracking-luxe text-gold-soft/70">
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="link-underline text-sm text-ash transition-colors hover:text-ivory"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-muted">
            © {new Date().getFullYear()} OWN KARMA. All journeys reserved.
          </p>
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="text-[0.65rem] uppercase tracking-wide-2 text-ash transition-colors hover:text-gold-soft"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="text-xs italic tracking-wide text-muted">
            Own your karma.
          </p>
        </div>
      </div>
    </footer>
  );
}
