import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "rgba(var(--primary-color))",
        "secondary": "rgba(var(--secondary-color))",
        "primary-button": "rgba(var(--primary-button-color))",
      },
      fontFamily: {
        "montserrat": "var(--font-montserrat)",
        "lora": "var(--font-lora)",
      }
    },
  },
  plugins: [],
};
export default config;
