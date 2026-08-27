import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { site } from '../config/site';

export default function Navigation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Discreet fade-in once the visitor starts moving past the hero.
    gsap.set(el, { opacity: 0, y: -8 });
    const trigger = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: document.body,
        start: 'top+=120 top',
        end: 'top+=280 top',
        scrub: true,
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-6 md:py-7 mix-blend-difference"
    >
      <a
        href="#hero"
        onClick={scrollToId('hero')}
        className="font-display text-[13px] md:text-sm tracking-[0.25em] text-bone"
      >
        {site.name}
      </a>
      <nav className="hidden sm:flex items-center gap-8 text-[11px] tracking-[0.25em] text-bone">
        <a href="#work" onClick={scrollToId('work')} className="hover:opacity-60 transition-opacity duration-500">
          {site.nav.work}
        </a>
        <a href="#about" onClick={scrollToId('about')} className="hover:opacity-60 transition-opacity duration-500">
          {site.nav.about}
        </a>
        <a href="#contact" onClick={scrollToId('contact')} className="hover:opacity-60 transition-opacity duration-500">
          {site.nav.contact}
        </a>
      </nav>
    </div>
  );
}
