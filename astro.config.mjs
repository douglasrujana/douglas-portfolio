import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx()
  ],
  output: 'server',
  adapter: vercel({
    // Configuraciones adicionales si son necesarias
  }),
  vite: {
    base: '/',
    resolve: {
      alias: {
        '@': '/src',
        '@core': '/src/core',
        '@application': '/src/application',
        '@infrastructure': '/src/infrastructure',
        '@presentation': '/src/presentation',
      },
    },
    build: {
      assetsDir: 'assets',
    }
  },
  // Configuración para rutas en producción
  base: '/',
});
