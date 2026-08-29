import { useEffect, useRef } from "react";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { PortfolioExperience } from "./components/PortfolioExperience";
import { Contact } from "./components/Contact";
import { useInView } from "./hooks/useInView";

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

    let timer: ReturnType<typeof setTimeout>;

    const playNudge = () => {
      main.classList.remove("animate-[peek-nudge_650ms_ease-out]");
      // Force reflow so the animation can be re-triggered every cycle.
      void main.offsetWidth;
      main.classList.add("animate-[peek-nudge_650ms_ease-out]");
    };

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        playNudge();
        schedule();
      }, 2000);
    };

    const onActivity = () => schedule();

    schedule();
    main.addEventListener("scroll", onActivity, { passive: true });
    main.addEventListener("wheel", onActivity, { passive: true });
    main.addEventListener("touchstart", onActivity, { passive: true });
    main.addEventListener("keydown", onActivity);

    return () => {
      clearTimeout(timer);
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