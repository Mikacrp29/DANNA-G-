import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { site } from '../config/site';

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(nameRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' })
        .fromTo(
          roleRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.5');

      // Fade the nameplate + hint away as the visitor begins to scroll,
      // handing continuity off to the fixed navigation label.
      gsap.to([nameRef.current, roleRef.current, hintRef.current], {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-bone">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1
          ref={nameRef}
          className="font-display font-normal text-ink leading-[0.9] text-[16vw] sm:text-[13vw] md:text-[9vw] tracking-tight"
        >
          {site.name}
        </h1>
        <p ref={roleRef} id="about" className="mt-5 md:mt-6 text-[11px] md:text-xs tracking-[0.4em] text-clay">
          {site.role}
        </p>
      </div>

      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-ink/50"
      >
        <span>{site.scrollHint}</span>
        <span className="block h-8 w-px bg-ink/30 animate-pulse" />
      </div>
    </section>
  );
}
