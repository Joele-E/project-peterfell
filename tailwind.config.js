/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/hero-section/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        pink: "#e09c9ee6",
        cBlue: "#7a99ac",
      },
      fontFamily: {
        Heebo: ["Heebo", "sans-serif"],
        PlayfairSerif: ["Playfair Display", "serif"],
        PlayfairSans: ["Playfair Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
