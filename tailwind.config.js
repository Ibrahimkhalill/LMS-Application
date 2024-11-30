/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/screen/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // Corrected color key
        coching: {
          nav_color: "#365B6D",
          background: "#EAEDED",
          light_blue: "#232f3A",
          text_color: "#8AD085",
          button_color: "rgb(25, 113, 194)",
        },
      },
    },
  },
  plugins: [],
};
