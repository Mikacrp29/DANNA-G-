import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { PortfolioExperience } from "./components/PortfolioExperience";
import { Contact } from "./components/Contact";
import { useInView } from "./hooks/useInView";

export default function App() {
  // A single observer on the hero drives the fixed navigation's
  // visibility. It fires both ways, so the nav appears and disappears
  // correctly no matter how many times the visitor scrolls up and down.
  const { ref: heroRef, inView: heroInView } = useInView<HTMLElement>(0.4);

  return (
    <>
      <Navigation visible={!heroInView} />
      <main className="scene-container">
        <Hero ref={heroRef} />
        <PortfolioExperience />
        <Contact />
      </main>
    </>
  );
}
