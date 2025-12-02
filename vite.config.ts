import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for the browser environment
      // CRITICAL: Check both `env.API_KEY` (from .env files) AND `process.env.API_KEY` (system vars/Vercel settings)
      // Ensure we pass an empty string if undefined so the built code doesn't contain `undefined`
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || '')
    }
  }
})