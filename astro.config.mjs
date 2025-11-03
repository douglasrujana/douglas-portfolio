import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'server',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@core': '/src/core',
        '@application': '/src/application',
        '@infrastructure': '/src/infrastructure',
        '@presentation': '/src/presentation',
      },
    },
  },
});
