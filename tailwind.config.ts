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
        rose: {
          50:  "#fff0f3",
          100: "#ffe0e8",
          200: "#ffc0d0",
          300: "#ff91aa",
          400: "#ff5c81",
          500: "#ff2d5e",
          600: "#f0103f",
          700: "#c8002f",
          800: "#a8002a",
          900: "#8c0027",
        },
        blush:   "#f9e8ec",
        petal:   "#f2cdd5",
        dusty:   "#e8a4b0",
        mauve:   "#c07080",
        cream:   "#fdf9f5",
        ivory:   "#faf6f0",
        nude:    "#e8ddd5",
        champagne:"#f5ede3",
        warm:    "#d4b8a8",
        charcoal:"#2c2c2c",
        mink:    "#6b5b55",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-jost)", "system-ui", "sans-serif"],
        accent:  ["var(--font-dm-serif)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-soft":
          "linear-gradient(135deg, #fdf9f5 0%, #f9e8ec 50%, #fdf9f5 100%)",
        "gradient-hero":
          "linear-gradient(180deg, rgba(249,232,236,0.9) 0%, rgba(253,249,245,0.95) 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "float":      "float 6s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
        "scale-in":   "scaleIn 0.5s ease forwards",
        "slide-right":"slideRight 0.6s ease forwards",
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
      },
      boxShadow: {
        soft:   "0 4px 30px rgba(192, 112, 128, 0.08)",
        medium: "0 8px 40px rgba(192, 112, 128, 0.15)",
        strong: "0 16px 60px rgba(192, 112, 128, 0.25)",
        card:   "0 2px 20px rgba(0, 0, 0, 0.06)",
        glow:   "0 0 40px rgba(249, 232, 236, 0.8)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
