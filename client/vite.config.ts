import postcss from './postcss.config.js';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss
  },
  resolve: {
    alias: {
      "@" : path.resolve(__dirname, "./src")
    }
  }
})
