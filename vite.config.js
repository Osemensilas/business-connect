import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ensures Vercel uses the correct folder
  },
  base: '/', // ensures relative URLs resolve correctly
})
