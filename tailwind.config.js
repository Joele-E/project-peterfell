/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        pink: "#e09c9e",
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
