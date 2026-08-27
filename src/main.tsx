import React from 'react';
import ReactDOM from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Évite un bug connu sur mobile : quand la barre d'adresse du navigateur
// apparaît/disparaît pendant le scroll, la hauteur de fenêtre change et
// ScrollTrigger recalcule tout — ce qui peut "perdre" l'état d'une animation
// scrub (ex : le texte du Hero qui reste invisible après avoir remonté).
ScrollTrigger.config({ ignoreMobileResize: true });

// Les polices (Fraunces) et les images chargent après la première mesure de
// mise en page. Une fois prêtes, on redemande à ScrollTrigger de recalculer
// les positions pour que les distances de scroll restent justes.
document.fonts?.ready?.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
