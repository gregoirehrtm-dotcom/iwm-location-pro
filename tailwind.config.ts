import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE7A2F",
        success: "#5BC48A",
        alert: "#F08A7E",
      }
    }
  },
  plugins: [],
};
export default config;
