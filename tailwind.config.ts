import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B5A7B",
        success: "#22C55E",
        alert: "#F97316",
      }
    }
  },
  plugins: [],
};
export default config;
