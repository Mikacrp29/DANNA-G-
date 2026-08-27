/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFEDE6",
        ink: "#16140F",
        ash: "#6B665C",
        hairline: "#D6D0C3",
        nude: "#A9827A",
      },
      fontFamily: {
        display: ["\"Fraunces\"", "serif"],
        sans: ["\"Space Grotesk\"", "sans-serif"],
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      letterSpacing: {
        widest: "0.32em",
      },
    },
  },
  plugins: [],
};
