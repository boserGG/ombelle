import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Adresse locale : http://ombelle-fleurs.localhost:5192 (les sous-domaines .localhost pointent vers cet ordinateur).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5192, strictPort: true },
})
