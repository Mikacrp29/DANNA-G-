# DANNA G — Portfolio

Expérience éditoriale en une page, construite avec React + TypeScript + Vite + Tailwind + GSAP/ScrollTrigger.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (en général http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Ce qui est facilement modifiable

### 1. Nom, Instagram, email, textes des scènes
Tout est centralisé dans **`src/config/site.ts`** :
- `site.name`, `site.role`
- `site.email` → adresse temporaire, à remplacer par la vraie adresse
- `site.instagram`
- `site.nav`, `site.scrollHint`, `site.contact`
- `scenes` → id, image, label de chacune des 4 photos

### 2. Les 4 photos
Les fichiers sont dans **`public/images/`** :
- `danna-01.jpg` → PORTRAIT
- `danna-02.jpg` → MOVEMENT / FORM
- `danna-03.jpg` → EDITORIAL
- `danna-04.jpg` → FINAL

Pour remplacer une photo, il suffit d'écraser le fichier correspondant en gardant
le même nom (ou de changer le chemin dans `scenes` dans `site.ts`).

### 3. Les animations (vitesse, direction, taille, timing)
Tout est regroupé dans **`src/components/PortfolioExperience.tsx`**, en haut du
fichier, dans la constante `SCENE_CONFIG` :

- `enter` / `exit` : position (x, y en %), échelle et rotation au début et à
  la fin du passage de chaque photo.
- `holdScale` : échelle de la photo pendant le temps "fort" (le milieu de la
  scène).
- `textParallax` : vitesse du texte (numéro + label) par rapport à la photo,
  pour créer un effet de profondeur.
- `clipReveal` : active un effet de masque progressif à l'entrée.

Les constantes `PIN_SCREENS`, `WINDOW_WIDTH`, `WINDOW_STEP`, `ENTER_END` et
`EXIT_START` contrôlent respectivement : la longueur totale du scroll épinglé,
la largeur de la fenêtre de progression allouée à chaque photo, le décalage
entre deux photos (donc le chevauchement / la vitesse de transition), et les
seuils entrée/maintien/sortie à l'intérieur d'une fenêtre.

### 4. Structure

```
App
├── Navigation        (barre discrète, fixe, apparaît après le hero)
├── Hero              (nom + accroche + indication de scroll)
├── PortfolioExperience
│   └── 4 scènes photo pilotées par ScrollTrigger (une seule section épinglée)
└── Contact           (section finale minimaliste)
```

## Notes techniques

- Une seule section est épinglée (`PortfolioExperience`) : les 4 photos se
  succèdent à l'intérieur de cette section grâce à des fenêtres de
  progression qui se chevauchent légèrement — c'est ce qui donne
  l'impression d'une composition qui se transforme plutôt que d'un
  enchaînement de pages.
- `prefers-reduced-motion` est respecté (animations neutralisées).
- Les images sont chargées en `lazy` sauf la première (`eager`) pour un
  premier affichage rapide.
