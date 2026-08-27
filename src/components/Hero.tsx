import { forwardRef, useEffect, useState } from "react";
import { site } from "../config/site";

/**
 * Hero stays mounted for the entire life of the page — it is never
 * conditionally rendered and its entrance animation runs exactly once,
 * on mount.
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
      {/* Teaser sliver of the first photo */}
      <div className="absolute inset-x-0 bottom-0 h-[30vh] w-full opacity-90 md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[34vw]">
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

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pt-8 md:px-16 md:pt-28">
        <div
          className={`max-w-md transition-all duration-[1100ms] ease-editorial ${
            entered
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          {/* Logo + name */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
  <img
    src={site.logo}
    alt={site.name}
    className="h-auto w-[105px] sm:w-[180px] md:w-[min(42vw,340px)]"
  />

  <span className="whitespace-nowrap font-serif text-2xl tracking-[0.06em] text-[#161513] sm:text-4xl md:text-6xl lg:text-7xl">
    DANNA G
  </span>
</div>

          {/* Tagline */}
          <p className="mt-6 font-sans text-[11px] tracking-widest text-ash">
            {site.tagline}
          </p>
        </div>
      </div>

      {/* Scroll hint */}
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