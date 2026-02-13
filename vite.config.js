import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// En dev : ./ (racine du serveur). En prod : /saussetreuni/ (GitHub Pages) ou VITE_BASE_URL (ex. / pour domaine à la racine)
const base = process.env.VITE_BASE_URL || (process.env.NODE_ENV === 'development' ? './' : '/saussetreuni/')

export default defineConfig({
  plugins: [react()],
  base,
})
