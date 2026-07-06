// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    port: 3001,
  },

  integrations: [react()],
});