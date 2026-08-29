import { useEffect, useRef } from "react";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { PortfolioExperience } from "./components/PortfolioExperience";
import { Contact } from "./components/Contact";
import { useInView } from "./hooks/useInView";

const NUDGE_RATIO = 0.22; // proportion de la hauteur d'écran révélée
const NUDGE_OUT_MS = 550;
const NUDGE_BACK_MS = 550;

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
    let backTimer: ReturnType<typeof setTimeout>;
    let restoreTimer: ReturnType<typeof setTimeout>;
    let isNudging = false;

      const playNudge = () => {
      const start = main.scrollTop;
      const amount = main.clientHeight * NUDGE_RATIO;
      isNudging = true;
      main.style.scrollSnapType = "none";

      main.scrollTo({ top: start + amount, behavior: "smooth" });
      backTimer = setTimeout(() => {
        main.scrollTo({ top: start, behavior: "smooth" });
        restoreTimer = setTimeout(() => {
          main.style.scrollSnapType = "";
          isNudging = false;
        }, NUDGE_BACK_MS);
      }, NUDGE_OUT_MS);
    };

    const schedule = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        playNudge();
        schedule();
      }, 2000);
    };

    const onActivity = () => {
      // Ignore scroll events caused by our own programmatic nudge —
      // only a real user action should cancel/reschedule it.
      if (isNudging) return;

      clearTimeout(backTimer);
      clearTimeout(restoreTimer);
      main.style.scrollSnapType = "";
      schedule();
    };

    schedule();
    main.addEventListener("scroll", onActivity, { passive: true });
    main.addEventListener("wheel", onActivity, { passive: true });
    main.addEventListener("touchstart", onActivity, { passive: true });
    main.addEventListener("keydown", onActivity);

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(backTimer);
      clearTimeout(restoreTimer);
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