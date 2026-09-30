// @ts-check
import {defineConfig} from 'astro/config';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

const isDevelopment = process.env.NODE_ENV !== 'production';

// https://astro.build/config
export default defineConfig({
    adapter: vercel(),

    site: isDevelopment ? 'http://localhost:4321' : 'https://altie122.xyz',

    vite: {
        plugins: [tailwindcss()],
    },

    build: {
        assetsPrefix: isDevelopment
            ? undefined
            : "https://altie122.xyz/blog",
    },

    integrations: [react(), mdx()]
});
