import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "xz-black":  "#000000",
        "xz-dark":   "#080808",
        "xz-card":   "#0D0D0D",
        "xz-border": "#1A1A1A",
        "xz-green":  "#20CD5C",
        "xz-lime":   "#B3F54E",
        "xz-yellow": "#D0FA40",
        "xz-white":  "#FFFFFF",
        "xz-muted":  "#5A6272",
      },
      fontFamily: {
        // Títulos condensados — fiel ao Media Kit
        display:    ["var(--font-bebas)", "Impact", "sans-serif"],
        // Subtítulos bold condensados
        heading:    ["var(--font-barlow)", "var(--font-dm-sans)", "sans-serif"],
        // Corpo
        body:       ["var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        "hero":  "0.05em",
        "title": "0.08em",
        "wide":  "0.15em",
        "ultra": "0.3em",
      },
      boxShadow: {
        "neon-green":   "0 0 20px #20CD5C, 0 0 60px rgba(32,205,92,0.3)",
        "neon-green-lg":"0 0 40px #20CD5C, 0 0 80px rgba(32,205,92,0.4)",
        "neon-lime":    "0 0 20px #B3F54E, 0 0 40px rgba(179,245,78,0.3)",
        "glass":        "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "glass-green":  "0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(32,205,92,0.12), inset 0 1px 0 rgba(32,205,92,0.2)",
      },
      animation: {
        "pulse-glow":   "pulseGlow 2.5s ease-in-out infinite",
        "float":        "float 6s ease-in-out infinite",
        "fadeUp":       "fadeUp 0.7s ease-out forwards",
        "ticker":       "ticker 25s linear infinite",
        "scan":         "scan 4s linear infinite",
        "shimmer":      "shimmer 2s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px #20CD5C, 0 0 40px rgba(32,205,92,0.3)" },
          "50%":     { boxShadow: "0 0 40px #20CD5C, 0 0 80px rgba(32,205,92,0.5), 0 0 120px rgba(32,205,92,0.2)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
