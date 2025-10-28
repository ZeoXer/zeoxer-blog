import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      animation: {
        "move-from-bottom": "moveFromBottom 0.8s ease-in-out",
      },
    },
  },
  keyframes: {
    moveFromBottom: {
      from: {
        transform: "translateY(80%)",
        opacity: "0",
      },
      to: {
        transform: "translateY(0)",
        opacity: "1",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
