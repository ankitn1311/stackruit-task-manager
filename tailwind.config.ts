import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          50: "#fcf8f0",
          100: "#f7efdd",
          200: "#ead3ab",
          300: "#e3c18e",
          400: "#d6a261",
          500: "#cd8942",
          600: "#bf7337",
          700: "#9f5b2f",
          800: "#80492c",
          900: "#683e26",
          950: "#371f13",
        },
        grey: {
          ...colors.zinc,
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
