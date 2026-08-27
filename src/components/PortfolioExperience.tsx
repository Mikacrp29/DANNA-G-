import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scenes } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// CHORÉGRAPHIE — tout ce qui régit vitesse / direction / taille / timing
// se trouve dans cet objet. Modifie ces valeurs pour ajuster l'animation
// sans toucher au reste du composant.
// ---------------------------------------------------------------------------

// Longueur de scroll (en multiples de la hauteur d'écran) allouée à
// l'ensemble des 4 photos à l'intérieur de la scène épinglée.
// ⚠️ Valeur clé si les transitions demandent "trop de scroll" : diminue-la.
const PIN_SCREENS = 2.6;

// Fenêtre [start, end] de progression globale (0 → 1) occupée par chaque
// photo. Le chevauchement entre deux fenêtres consécutives crée l'effet de
// "composition qui se transforme" plutôt qu'un simple enchaînement de pages.
const WINDOW_WIDTH = 0.34;
const WINDOW_STEP = 0.22;

type SceneVariant = 'horizontal-rl' | 'horizontal-lr' | 'vertical-zoom' | 'final';

interface SceneConfig {
  variant: SceneVariant;
  enter: { x: number; y: number; scale: number; rotate: number };
  exit: { x: number; y: number; scale: number; rotate: number };
  holdScale: number;
  textParallax: number; // multiplicateur de vitesse du texte par rapport à la photo
  clipReveal?: boolean;
}

const SCENE_CONFIG: SceneConfig[] = [
  // 01 — PORTRAIT : entrée décalée à droite, sortie lente vers la gauche.
  {
    variant: 'horizontal-rl',
    enter: { x: 18, y: 4, scale: 0.88, rotate: 1.5 },
    exit: { x: -62, y: -3, scale: 1.08, rotate: -2 },
    holdScale: 1,
    textParallax: 1.6,
    clipReveal: true,
  },
  // 02 — MOVEMENT / FORM : entre depuis la gauche, ressort à droite.
  {
    variant: 'horizontal-lr',
    enter: { x: -45, y: -2, scale: 0.82, rotate: -1.5 },
    exit: { x: 60, y: 3, scale: 1.05, rotate: 2 },
    holdScale: 0.98,
    textParallax: -1.4,
  },
  // 03 — EDITORIAL : zoom + déplacement vertical, crop progressif.
  {
    variant: 'vertical-zoom',
    enter: { x: 0, y: 10, scale: 1.45, rotate: 0 },
    exit: { x: 0, y: -14, scale: 0.92, rotate: -1 },
    holdScale: 1,
    textParallax: 1.2,
    clipReveal: true,
  },
  // 04 — FINAL : le plan le plus fort, occupe l'écran puis se dégage.
  {
    variant: 'final',
    enter: { x: 0, y: 6, scale: 1.12, rotate: 0 },
    exit: { x: 0, y: -8, scale: 1.28, rotate: 0 },
    holdScale: 1.16,
    textParallax: 0.8,
  },
];

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

// enter (0 → 0.38) / hold (0.38 → 0.64) / exit (0.64 → 1) au sein d'une
// fenêtre. Le palier "hold" est volontairement court pour que le scroll
// reste toujours en train de faire progresser visuellement la photo.
const ENTER_END = 0.38;
const EXIT_START = 0.64;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function PortfolioExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: `+=${PIN_SCREENS * 100}%`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => render(self.progress),
    });

    function render(p: number) {
      let activeIndex = 0;
      let activeAmount = -1;

      scenes.forEach((_, i) => {
        const start = i * WINDOW_STEP;
        const end = start + WINDOW_WIDTH;
        const local = clamp01((p - start) / (end - start));

        const cfg = SCENE_CONFIG[i];
        let x = 0;
        let y = 0;
        let scale = cfg.holdScale;
        let rotate = 0;
        let opacity = 0;
        let visibility = local > 0 && local < 1 ? 1 : 0;

        if (local <= ENTER_END) {
          const t = easeOutCubic(local / ENTER_END);
          x = gsap.utils.interpolate(cfg.enter.x, 0, t);
          y = gsap.utils.interpolate(cfg.enter.y, 0, t);
          scale = gsap.utils.interpolate(cfg.enter.scale, cfg.holdScale, t);
          rotate = gsap.utils.interpolate(cfg.enter.rotate, 0, t);
          opacity = clamp01(local / (ENTER_END * 0.55));
        } else if (local >= EXIT_START) {
          const t = easeInOutCubic((local - EXIT_START) / (1 - EXIT_START));
          x = gsap.utils.interpolate(0, cfg.exit.x, t);
          y = gsap.utils.interpolate(0, cfg.exit.y, t);
          scale = gsap.utils.interpolate(cfg.holdScale, cfg.exit.scale, t);
          rotate = gsap.utils.interpolate(0, cfg.exit.rotate, t);
          opacity = clamp01(1 - (local - EXIT_START) / (1 - EXIT_START) / 0.7);
        } else {
          opacity = 1;
        }

        const photoEl = photoRefs.current[i];
        const textEl = textRefs.current[i];
        if (photoEl) {
          photoEl.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${scale}) rotate(${rotate}deg)`;
          photoEl.style.opacity = String(opacity);
          photoEl.style.visibility = visibility ? 'visible' : 'hidden';
          photoEl.style.zIndex = String(10 + i);

          if (cfg.clipReveal) {
            const revealAmt = local <= ENTER_END ? clamp01(local / ENTER_END) : 1;
            photoEl.style.clipPath = `inset(0 ${(1 - revealAmt) * 6}% 0 0)`;
          }
        }
        if (textEl) {
          const textX = x * cfg.textParallax * 0.4;
          const textY = y * cfg.textParallax * 0.4 - 6;
          textEl.style.transform = `translate3d(${textX}%, ${textY}%, 0)`;
          textEl.style.opacity = String(
            clamp01(opacity) * (local > 0.12 && local < 0.88 ? 1 : clamp01(opacity))
          );
        }

        if (local > 0 && local < 1 && local > activeAmount) {
          activeAmount = local;
          activeIndex = i;
        }
      });

      if (dotRef.current) {
        const total = scenes.length - 1;
        const travel = clamp01(p / (WINDOW_STEP * total + WINDOW_WIDTH));
        dotRef.current.style.transform = `translateY(${travel * 100}%)`;
      }
      if (counterRef.current) {
        counterRef.current.textContent = scenes[activeIndex].id;
      }
    }

    render(0);

    return () => st.kill();
  }, []);

  return (
    <section id="work" ref={wrapperRef} className="relative h-[100svh] w-full overflow-hidden bg-bone">
      {scenes.map((scene, i) => (
        <div
          key={scene.id}
          ref={(el) => (photoRefs.current[i] = el)}
          className="absolute inset-0 flex items-center justify-center will-change-transform"
          style={{ opacity: 0 }}
        >
          <div
            ref={(el) => (imgRefs.current[i] = el)}
            className="relative w-[78%] h-[80%] md:w-[46%] md:h-[84%] overflow-hidden"
          >
            <img
              src={scene.image}
              alt={scene.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <div
            ref={(el) => (textRefs.current[i] = el)}
            className="pointer-events-none absolute left-6 bottom-10 md:left-14 md:bottom-16 flex flex-col gap-2"
          >
            <span className="font-display text-[13vw] md:text-[6vw] leading-none text-ink/90">
              {scene.id}
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.35em] text-ink/60 uppercase">
              {scene.label}
            </span>
          </div>
        </div>
      ))}

      {/* Indicateur de progression — fine ligne verticale */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30">
        <span ref={counterRef} className="text-[10px] tracking-[0.2em] text-ink/50 font-display">
          01
        </span>
        <div className="relative h-24 w-px bg-ink/15">
          <div
            ref={dotRef}
            className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-ink/70"
            style={{ transform: 'translateY(0%)' }}
          />
        </div>
        <span className="text-[10px] tracking-[0.2em] text-ink/30 font-display">
          {scenes.length.toString().padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
