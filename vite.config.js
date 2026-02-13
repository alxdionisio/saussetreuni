import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base relative : fonctionne avec GitHub Pages (username.github.io/repo) et avec domaine personnalisé (sausset-reuni.fr)
  base: './',
})
