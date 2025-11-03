/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        system: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#007AFF',
          hover: '#0051D5',
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
        '2xl': '8rem',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
      },
      boxShadow: {
        'jony-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'jony-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'jony-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        jony: {
          sm: '8px',
          md: '12px',
          lg: '16px',
        },
      },
    },
  },
  plugins: [],
};
