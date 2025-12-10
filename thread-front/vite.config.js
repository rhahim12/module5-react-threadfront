import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'mkcert' // 1. Importer le plugin mkcert

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert() // 2. Ajout du plugin mkcert pour générer des certificats SSL locaux
],
})
