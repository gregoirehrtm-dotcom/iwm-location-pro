import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { primary: { DEFAULT: "#2B5A7B", dark: "#1F4259", light: "#E8F0F5" }, success: "#22C55E", alert: "#F97316" },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      spacing: { 18: "4.5rem" },
    },
  },
  plugins: [],
};
export default config;
