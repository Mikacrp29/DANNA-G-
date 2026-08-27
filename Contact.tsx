import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        groupRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[90svh] w-full bg-bone flex items-center justify-center px-6 py-32"
    >
      <div ref={groupRef} className="flex flex-col items-center text-center gap-10 md:gap-12">
        <h2 className="font-display font-normal text-ink leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[5.5vw]">
          {site.contact.heading}
          <br />
          {site.contact.headingLine2}
        </h2>

        <div className="flex flex-col items-center gap-4">
          <span className="text-[11px] tracking-[0.35em] text-clay">{site.name}</span>
          <a
            href={`mailto:${site.email}`}
            className="text-sm md:text-base tracking-wide text-ink border-b border-ink/20 pb-1 hover:border-ink/70 transition-colors duration-500"
          >
            {site.email}
          </a>
        </div>

        <a
          href={site.instagram.url}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] tracking-[0.4em] text-ink/60 hover:text-ink transition-colors duration-500"
        >
          INSTAGRAM
        </a>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span className="text-[9px] tracking-[0.3em] text-ink/25">{site.instagram.handle}</span>
      </footer>
    </section>
  );
}
