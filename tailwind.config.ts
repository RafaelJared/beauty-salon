import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       "#f7f3ee",
        "bg-alt": "#efe8df",
        ink:      "#2b2622",
        "ink-soft": "#6b6259",
        line:     "#e2d8cc",
        gold:     "#b08d57",
        "gold-deep": "#8a6d3f",
        rose:     "#c9a9a1",
        white:    "#fffdfb",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-soft":
          "linear-gradient(135deg, #f7f3ee 0%, #efe8df 50%, #f7f3ee 100%)",
        "gradient-hero":
          "linear-gradient(180deg, rgba(239,232,223,0.9) 0%, rgba(247,243,238,0.95) 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "scale-in":   "scaleIn 0.5s ease forwards",
        "slide-right":"slideRight 0.6s ease forwards",
        "pulse-dot":  "pulseDot 2.4s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseDot: {
          "50%": { boxShadow: "0 0 0 8px rgba(76,175,125,0)" },
        },
      },
      boxShadow: {
        soft:   "0 4px 30px rgba(52, 42, 32, 0.08)",
        medium: "0 8px 40px rgba(52, 42, 32, 0.15)",
        strong: "0 20px 60px -20px rgba(52,42,32,.28)",
        card:   "0 2px 20px rgba(0, 0, 0, 0.06)",
        glow:   "0 0 40px rgba(176, 141, 87, 0.35)",
      },
      borderRadius: {
        DEFAULT: "18px",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
