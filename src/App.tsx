import { useEffect, useRef } from "react";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { PortfolioExperience } from "./components/PortfolioExperience";
import { Contact } from "./components/Contact";
import { useInView } from "./hooks/useInView";

const NUDGE_RATIO = 0.22;
const NUDGE_DURATION_MS = 900; // durée totale de l'aller-retour, en une seule animation continue

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export default function App() {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLElement>(0.4);
  const mainRef = useRef<HTMLElement>(null);

      useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    let idleTimer: ReturnType<typeof setTimeout>;
    let rafId: number | null = null;
    let isNudging = false;

    const playNudge = () => {
      const start = main.scrollTop;
      const amount = main.clientHeight * NUDGE_RATIO;
      isNudging = true;
      main.style.scrollSnapType = "none";

      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / NUDGE_DURATION_MS, 1);
        // Un seul aller-retour continu : monte jusqu'à mi-parcours,
        // puis redescend — sans jamais s'arrêter entre les deux.
        const wave = Math.sin(Math.PI * t);
        const eased = easeInOutSine(Math.min(t * 2, 1));
        const direction = t < 0.5 ? 1 : -1;
        main.scrollTop = start + amount * wave * (direction > 0 ? eased : eased);

        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          main.scrollTop = start;
          main.style.scrollSnapType = "";
          isNudging = false;
          rafId = null;
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const schedule = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        playNudge();
        schedule();
      }, 2000);
    };

    const onActivity = () => {
      if (isNudging) return;
      schedule();
    };

    schedule();
    main.addEventListener("scroll", onActivity, { passive: true });
    main.addEventListener("wheel", onActivity, { passive: true });
    main.addEventListener("touchstart", onActivity, { passive: true });
    main.addEventListener("keydown", onActivity);

    return () => {
      clearTimeout(idleTimer);
      if (rafId) cancelAnimationFrame(rafId);
      main.removeEventListener("scroll", onActivity);
      main.removeEventListener("wheel", onActivity);
      main.removeEventListener("touchstart", onActivity);
      main.removeEventListener("keydown", onActivity);
    };
  }, []);

  return (
    <>
      <Navigation visible={!heroInView} />
      <main ref={mainRef} className="scene-container">
        <Hero ref={heroRef} />
        <PortfolioExperience />
        <Contact />
      </main>
    </>
  );
}