import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seo } from './seo.ts';

// BASE_PATH lets the same build work on GitHub Pages (e.g. BASE_PATH=/portfolio/).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), seo()],
});
