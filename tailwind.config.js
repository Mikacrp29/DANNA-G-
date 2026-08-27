/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F2EFE9',
        ink: '#161513',
        clay: '#8A7A68',
        hair: '#C9C2B4',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Neue Haas Grotesk Text Pro"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
};
