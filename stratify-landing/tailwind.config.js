/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#06080e",
        accent: "#00ffa3",
        cyan: "#00d4ff",
        purple: "#a855f7",
        warn: "#ffaa00",
        danger: "#ff4466",
        orange: "#ff6b35",
      },
      fontFamily: {
        display: ["'Outfit'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
