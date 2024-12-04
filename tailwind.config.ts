import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#40E0D0",
          50: "#F0FFFE",
          100: "#E0FFFC",
          200: "#B3FFF8",
          300: "#85FFF4",
          400: "#58FFF0",
          500: "#40E0D0",
          600: "#20B2AA",
          700: "#008B8B",
          800: "#006666",
          900: "#004D4D",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1A1F2C",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#00CED1",
          50: "#E0FFFF",
          100: "#B0FFFF",
          200: "#80FFFF",
          300: "#50FFFF",
          400: "#20FFFF",
          500: "#00CED1",
          600: "#00A5A8",
          700: "#007C7F",
          800: "#005356",
          900: "#002A2D",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#1A1F2C",
          foreground: "#94A3B8",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(64, 224, 208, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(64, 224, 208, 0.8)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #40E0D0 0%, #00CED1 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #20B2AA 0%, #008B8B 100%)',
        'gradient-accent': 'linear-gradient(135deg, #85FFF4 0%, #50FFFF 100%)',
        'gradient-futuristic': 'linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, rgba(0, 206, 209, 0.1) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;