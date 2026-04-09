import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/ui": path.resolve(__dirname, "./components/ui"),
    },
  },
  server: {
    host: true,
    allowedHosts: ['debra-uncompanioned-elliptically.ngrok-free.dev'],
    port: 3000,
  },
})
