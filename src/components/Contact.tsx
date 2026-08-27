import { forwardRef } from "react";
import { site } from "../config/site";
import { useInView } from "../hooks/useInView";

export const Contact = forwardRef<HTMLElement>(function Contact(_props, ref) {
  const { ref: innerRef, inView } = useInView<HTMLDivElement>(0.5);

  return (
    <section
      ref={ref}
      id="contact"
      className="scene flex items-center justify-center bg-paper"
    >
      <div
        ref={innerRef}
        className={`flex flex-col items-center gap-8 px-6 text-center transition-all duration-[900ms] ease-editorial ${
          inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h2 className="font-display text-3xl italic text-ink md:text-5xl">
          {site.closing.heading}
        </h2>

        <div className="mt-2 flex flex-col items-center gap-3 font-sans text-[11px] tracking-widest text-ash">
          <span className="text-ink">{site.name}</span>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors duration-300 hover:text-ink"
          >
            {site.email}
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors duration-300 hover:text-ink"
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
});
