import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PortfolioExperience from './components/PortfolioExperience';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-bone">
      <Navigation />
      <Hero />
      <PortfolioExperience />
      <Contact />
    </div>
  );
}
