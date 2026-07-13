/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        outline: "#8c909f",
        "outline-variant": "#424754",
        "on-background": "#dae2fd",
        "surface-bright": "#31394d",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#c2c6d6",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        surface: "#0b1326",
        background: "#0b1326",
        "secondary-container": "#03b5d3",
        "surface-dim": "#0b1326",
        primary: "#3b82f6",
        "primary-container": "#adc6ff",
        "on-primary-container": "#00285d",
        "surface-container-lowest": "#060e20",
        "surface-container-low": "#131b2e",
        "surface-container": "#171f33",
        error: "#ffb4ab",
        "error-container": "#93000a",
        secondary: "#06b6d4",
        tertiary: "#10b981",
        "on-tertiary": "#003824",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        gutter: "20px",
        unit: "4px",
        "container-padding": "32px"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      }
    },
  },
  plugins: [],
}
