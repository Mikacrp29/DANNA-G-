import type { CSSProperties } from "react";
import { site, type Photo } from "../config/site";
import { useInView } from "../hooks/useInView";

type SceneVariant = 1 | 2 | 3 | 4;

/**
 * Per-scene choreography. Every pair of classes is a full state:
 * "out" is where the scene rests before/after it's on screen, "in" is
 * the settled composition. Because both states are plain CSS classes
 * toggled by a boolean, the transition always runs identically forward
 * and backward — there's no direction-dependent logic to get wrong.
 */
const variants: Record
  SceneVariant,
  { out: string; in: string; clip?: { out: string; in: string } }
> = {
  1: {
    out: "opacity-0 -translate-x-6 scale-75 blur-md",
    in: "opacity-100 translate-x-0 scale-100 blur-none",
  },
  2: {
    out: "opacity-0 translate-x-8 scale-75 blur-md",
    in: "opacity-100 translate-x-0 scale-100 blur-none",
  },
  3: {
    out: "opacity-0 translate-y-10 scale-75 blur-md",
    in: "opacity-100 translate-y-0 scale-100 blur-none",
    clip: {
      out: "inset(12% 8% 12% 8%)",
      in: "inset(0% 0% 0% 0%)",
    },
  },
  4: {
    out: "opacity-0 translate-x-0 scale-75 blur-md",
    in: "opacity-100 translate-x-0 scale-100 blur-none",
  },
};

function Scene({ photo, index }: { photo: Photo; index: number }) {
  const variant = ((index % 4) + 1) as SceneVariant;
  const { ref, inView } = useInView<HTMLDivElement>(0.55);
  const config = variants[variant];

  const clipStyle: CSSProperties | undefined = config.clip
    ? {
        clipPath: inView ? config.clip.in : config.clip.out,
        WebkitClipPath: inView ? config.clip.in : config.clip.out,
      }
    : undefined;

  const align =
    variant === 2 || variant === 4 ? "md:justify-end" : "md:justify-start";

      const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section
      id={`plate-${photo.id}`}
      className="scene relative flex items-center justify-center bg-paper"
    >
      <div
        ref={ref}
        className={`relative flex w-full items-center px-6 md:px-16 ${align}`}
      >
                 <figure
          className={`relative z-20 w-full max-w-xl overflow-hidden transition-all duration-[1400ms] ease-editorial will-change-transform ${
            inView ? config.in : config.out
          }`}
          style={clipStyle}
        >
                    <img
            src={photo.src}
            alt={photo.alt}
            className="h-[62vh] w-full object-cover md:h-[78vh]"
            loading="lazy"
            style={{
              animation:
                inView && !reducedMotion
                  ? "walk-subtle 1400ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
            }}
          />
                    <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-white"
            style={{
              animation:
                inView && !reducedMotion
                  ? "flash-photo 260ms ease-out 950ms forwards"
                  : "none",
            }}
          />
          <figcaption
            className={`mt-4 flex items-baseline justify-between font-sans text-[11px] tracking-widest text-ash transition-opacity duration-700 ease-editorial ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            <span>{photo.label}</span>
            <span className="font-display text-lg italic text-ink">
              {photo.id}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function PortfolioExperience() {
  return (
    <div className="relative">
      {/* Ligne de podium — repère fixe, présent sur les 4 scènes */}
      <div
        aria-hidden="true"
        className="pointer-events-none sticky top-[62vh] z-10 h-px w-full bg-hairline/70"
      />
      {site.photos.map((photo, index) => (
        <Scene key={photo.id} photo={photo} index={index} />
      ))}
    </div>
  );
}