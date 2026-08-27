import { forwardRef, useEffect, useState } from "react";
import { site } from "../config/site";

/**
 * Hero stays mounted for the entire life of the page — it is never
 * conditionally rendered and its entrance animation runs exactly once,
 * on mount.
 */
export const Hero = forwardRef<HTMLElement>(function Hero(_props, ref) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="scene relative flex flex-col justify-between overflow-hidden bg-paper"
    >
      {/* Logo géant en filigrane, ton sur ton */}
      <img
        src={site.logo}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 z-0 w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2 grayscale transition-opacity duration-[1800ms] ease-editorial md:w-[75vw] ${
          entered ? "opacity-[0.04]" : "opacity-0"
        }`}
      />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-1 flex-col justify-start px-5 pt-[24vh] md:justify-center md:px-16 md:pt-0">
        <div
          className={`max-w-md transition-all duration-[1100ms] ease-editorial ${
            entered
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          }`}
        >
          {/* Logo + nom */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
            <img
              src={site.logo}
              alt={site.name}
              className="h-auto w-[120px] sm:w-[200px] md:w-[min(46vw,380px)] lg:w-[420px]"
            />

            <span className="whitespace-nowrap font-serif text-3xl tracking-[0.06em] text-[#161513] sm:text-5xl md:text-7xl lg:text-8xl">
              DANNA G
            </span>
          </div>

          {/* Tagline */}
          <p className="mt-8 font-sans text-[11px] tracking-widest text-ash md:mt-10">
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