import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig, sharpImageService } from "astro/config";
import config from "./src/config/config.json";
import AutoImport from "astro-auto-import";

const BASE_URL = "https://rock4code.github.io/cognifyservices-web"; 
const BASE_PATH = "/cognifyservices-web/"; 

export default defineConfig({
  site: BASE_URL,
  base: BASE_PATH,
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  output: "static",
  build: {
    format: "directory",
  },
  vite: {
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