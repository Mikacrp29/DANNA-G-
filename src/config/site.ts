export type Photo = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

export const site = {
  name: "DANNA G",
  logo: "/images/logo-danna-g.svg",
  tagline: "MODEL / CREATIVE",
  scrollHint: "SCROLL TO EXPLORE",

  nav: [
    { label: "WORK", href: "#plate-01" },
    { label: "CONTACT", href: "#contact" },
  ],

  instagram: {
    handle: "@dannag_cri",
    url: "https://www.instagram.com/dannag_cri/",
  },

  email: "hello@dannag.com",

  closing: {
    heading: "LET'S WORK TOGETHER",
  },

  // Replace these four files in /public/images with the final photos.
  // Order defines the scroll sequence (01 → 04). Filenames can be
  // changed freely as long as this list is updated to match.
  photos: [
    {
      id: "01",
      src: "/images/danna-01.jpg",
      alt: "DANNA G — portrait 01",
      label: "PORTRAIT",
    },
    {
      id: "02",
      src: "/images/danna-02.jpg",
      alt: "DANNA G — portrait 02",
      label: "EDITORIAL",
    },
    {
      id: "03",
      src: "/images/danna-03.jpg",
      alt: "DANNA G — portrait 03",
      label: "MOVEMENT",
    },
    {
      id: "04",
      src: "/images/danna-04.jpg",
      alt: "DANNA G — portrait 04",
      label: "FORM",
    },
  ] satisfies Photo[],
};
