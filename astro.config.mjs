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
      base_url: "https://rock4code.github.io/cognifyservices-web",
      base_path: "/cognifyservices-web/",
      trailing_slash: false,
    },
  };
}

// Definir BASE_URL y BASE_PATH basados en config.json
const BASE_URL = config.site?.base_url || "https://rock4code.github.io/cognifyservices-web";
const BASE_PATH = config.site?.base_path || "/cognifyservices-web/";

export default defineConfig({
  site: BASE_URL,
  base: BASE_PATH, // 🔥 Asegura que los archivos estáticos se sirvan correctamente en GitHub Pages
  trailingSlash: config.site?.trailing_slash ? "always" : "never",
  output: "static",
  build: {
    format: "directory",
  },
  vite: {
    base: BASE_PATH, // 🔥 Necesario para corregir rutas en archivos estáticos en Vite
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
