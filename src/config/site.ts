// ---------------------------------------------------------------------------
// SITE CONFIG — modifie uniquement ce fichier pour changer le contenu du site
// (nom, réseaux sociaux, email, textes des scènes, images).
// ---------------------------------------------------------------------------

export const site = {
  name: 'DANNA G',
  role: 'MODEL / CREATIVE',

  // Adresse email TEMPORAIRE — à remplacer par la vraie adresse plus tard.
  email: 'hello@dannag.com',

  instagram: {
    handle: '@dannag_cri',
    url: 'https://www.instagram.com/dannag_cri/',
  },

  nav: {
    work: 'WORK',
    about: 'ABOUT',
    contact: 'CONTACT',
  },

  scrollHint: 'SCROLL TO EXPLORE',

  contact: {
    heading: "LET'S WORK",
    headingLine2: 'TOGETHER',
  },
};

// Les 4 scènes du portfolio. Chaque scène correspond à une photo + son
// habillage texte. L'ordre de ce tableau définit l'ordre du scroll.
export const scenes = [
  {
    id: '01',
    image: '/images/danna-01.jpg',
    label: 'PORTRAIT',
    alt: 'DANNA G — portrait',
  },
  {
    id: '02',
    image: '/images/danna-02.jpg',
    label: 'MOVEMENT / FORM',
    alt: 'DANNA G — mouvement',
  },
  {
    id: '03',
    image: '/images/danna-03.jpg',
    label: 'EDITORIAL',
    alt: 'DANNA G — éditorial',
  },
  {
    id: '04',
    image: '/images/danna-04.jpg',
    label: 'FINAL',
    alt: 'DANNA G — final',
  },
] as const;
