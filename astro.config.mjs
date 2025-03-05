import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, sharpImageService } from "astro/config";
import AutoImport from "astro-auto-import";
import fs from "fs";
import path from "path";

// Cargar configuración desde config.json de forma segura
let config = {};
const configPath = path.resolve("./src/config/config.json");

if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
} else {
  console.warn("⚠️ Warning: No se encontró 'config.json'. Usando configuración predeterminada.");
  config = {
    site: {
      base_url: "https://rock4code.github.io",
      base_path: "cognifyservices-web",
      trailing_slash: false,
    },
  };
}

// Definir BASE_URL y BASE_PATH correctamente para GitHub Pages
const BASE_URL = config.site?.base_url || "https://rock4code.github.io";
const BASE_PATH = config.site?.base_path || "cognifyservices-web";

export default defineConfig({
  site: BASE_URL,
  trailingSlash: config.site?.trailing_slash ? "always" : "never",
  output: "static", // Importante para GitHub Pages
  build: {
    format: "directory", // Asegura compatibilidad con GitHub Pages
  },
  vite: {
    base: BASE_PATH, // 🔥 Necesario para que los assets carguen correctamente en producción
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
  image: {
    service: sharpImageService(),
  },
  integrations: [
    react(),
    sitemap(),
    tailwind(),
    AutoImport({
      imports: [
        "@/components/react/FeatherIcon.tsx",
        "@/components/CounterComponent.astro",
        "@/components/core/Section.astro",
        "@/components/react/Changelog.tsx",
        "@/components/Badge.astro",
      ],
    }),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
});
