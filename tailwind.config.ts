import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        mark: {
          DEFAULT: "hsl(var(--mark))",
          foreground: "hsl(var(--mark-foreground))",
        },
        mist: {
          DEFAULT: "#F1F3F5",
          light: "#F7F8F9",
          dark: "#DDE2E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-estedad)", "Tahoma", "sans-serif"],
        display: ["var(--font-estedad)", "Tahoma", "sans-serif"],
        nastaliq: ["var(--font-nastaliq)", "Tahoma", "serif"],
      },
      backgroundImage: {
        metal:
          "linear-gradient(145deg,rgb(230, 234, 238) 0%,rgb(222, 227, 233) 20%,rgb(211, 215, 219) 46%,rgb(201, 208, 214) 53%,rgb(204, 210, 218) 80%,rgb(229, 232, 235) 100%)",
        "metal-50":
          "linear-gradient(145deg,rgba(230, 234, 238, 0.5) 0%,rgba(222, 227, 233, 0.5) 20%,rgba(211, 215, 219, 0.5) 46%,rgba(201, 208, 214, 0.5) 53%,rgba(204, 210, 218, 0.5) 80%,rgba(229, 232, 235, 0.5) 100%)",
        "metal-text":
          "linear-gradient(180deg, #f4f5f6 0%, #c5c9ce 36%, #8b9299 52%, #dfe2e5 100%)",
      },
      boxShadow: {
        metal:
          "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(26,32,38,0.14), 0 1px 2px rgba(26,32,38,0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
