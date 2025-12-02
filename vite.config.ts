import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');
  
  // Priority: 
  // 1. process.env.API_KEY (System Env Var / Vercel Project Settings)
  // 2. env.API_KEY (.env file)
  const apiKey = process.env.API_KEY || env.API_KEY || '';

  if (mode === 'production') {
    if (apiKey) {
      console.log('✅ API_KEY detected in environment variables.');
    } else {
      console.warn('⚠️  API_KEY is NOT set in environment variables. The app will fail to fetch content.');
    }
  }

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY for the browser environment
      // CRITICAL: We JSON.stringify the value so it is injected as a string literal (e.g. "AIza...")
      'process.env.API_KEY': JSON.stringify(apiKey)
    }
  }
})