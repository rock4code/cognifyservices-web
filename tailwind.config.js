const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const path = require("path");

// Cargar el archivo de configuración de tema de forma segura
let theme_config = {};
const themePath = path.resolve(__dirname, "./src/config/theme.json");

if (fs.existsSync(themePath)) {
  theme_config = require(themePath);
} else {
  console.warn("⚠️ Warning: No se encontró 'theme.json'. Usando configuración predeterminada.");
  theme_config = {
    fonts: {
      font_family: {
        primary: "sans-serif",
        primary_type: "sans-serif",
        secondary: "sans-serif",
        secondary_type: "sans-serif",
      },
    },
    colors: ["red", "blue", "green"],
  };
}

// Definir fuentes con valores predeterminados
let fontPrimaryType = theme_config.fonts?.font_family?.primary_type || "sans-serif";
let fontSecondaryType = theme_config.fonts?.font_family?.secondary_type || "sans-serif";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./public/**/*.html",
  ],
  safelist: [
    { pattern: /.*/ },
    ...(theme_config.colors || []).flatMap((color) => [{ pattern: new RegExp(`bg-${color}`) }]),
  ],
  darkMode: "class", // Evita problemas en GitHub Pages
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        ...(Array.isArray(theme_config.colors)
          ? theme_config.colors.reduce((acc, key) => {
              acc[key] = `rgba(var(--${key}))`;
              return acc;
            }, {})
          : {}),
      },
      fontFamily: {
        primary: ["var(--font-primary)", fontPrimaryType],
        secondary: ["var(--font-secondary)", fontSecondaryType],
      },
      textShadow: {
        sm: "0 0px 2px var(--tw-shadow-color)",
        DEFAULT: "0 0px 3px var(--tw-shadow-color)",
        lg: "0 0px 8px var(--tw-shadow-color)",
      },
      keyframes: {
        "fade-in": {
          "0%": { transform: "translateY(15pt)", opacity: 0 },
          "100%": { transform: "translateY(0pt)", opacity: 1 },
        },
        "fade-out": {
          "0%": { transform: "translateY(0pt)", opacity: 1 },
          "100%": { transform: "translateY(15pt)", opacity: 0 },
        },
        disappear: {
          "0%": { opacity: 1, visibility: "visible" },
          "100%": { opacity: 0, visibility: "hidden" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-in-out",
        "fade-out": "fade-out 1s ease-in-out",
        disappear: "disappear 1.5s ease-in-out forwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};