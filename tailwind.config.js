/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "rgba(var(--secondary))",
        background:"rgba(var(--background))",
        backgrounds:"rgba(var(--backgrounds))",
        text:"rgba(var(--text))"
      }
    },
  },
  // "rgba(var(--))"
  plugins: [require("@tailwindcss/forms")],
}

