import { forwardRef, useEffect, useState } from "react";
import { site } from "../config/site";

/**
 * Hero stays mounted for the entire life of the page — it is never
 * conditionally rendered and its entrance animation runs exactly once,
 * on mount. That means there is no code path where the logo can end up
 * stuck at opacity: 0: scrolling away simply moves it off-screen, and
 * scrolling back returns to the same, already-settled DOM state.
 */
export const Hero = forwardRef<HTMLElement>(function Hero(_props, ref) {
  const [entered, setEntered] = useState(false);
  const teaser = site.photos[0];

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="scene relative flex flex-col justify-between overflow-hidden bg-paper md:flex-row"
    >
      {/* Teaser sliver of the first photo — the "photo already part of
          the composition" the brief asks for, without turning the hero
          into a second gallery scene. */}
      <div className="absolute inset-x-0 bottom-0 h-[38vh] w-full opacity-90 md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[34vw]">
        <img
          src={teaser.src}
          alt={teaser.alt}
          className="h-full w-full object-cover"
          style={{
            maskImage:
              "linear-gradient(to top, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 55%, transparent 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent md:bg-gradient-to-r" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-28 md:w-[66vw] md:px-16">
        <div
          className={`max-w-md transition-all duration-[1100ms] ease-editorial ${
            entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <img
            src={site.logo}
            alt={site.name}
            className="h-auto w-[min(72vw,340px)]"
          />
          <p className="mt-6 font-sans text-[11px] tracking-widest text-ash">
            {site.tagline}
          </p>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-6 z-10 flex items-center gap-2 text-[10px] tracking-widest text-ash transition-opacity duration-1000 ease-editorial md:left-16 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <span>{site.scrollHint}</span>
        <span className="inline-block animate-bounce">↓</span>
      </div>
    </section>
  );
});
