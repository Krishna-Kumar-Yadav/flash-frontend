import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This makes the server accessible externally (from the network).
    port: 5173,        // The port on which your app will run.
    strictPort: true,  // If set to true, Vite will not switch to another port if 3000 is taken.
    cors: true         // Enables Cross-Origin Resource Sharing (CORS) if needed for API requests.
  },
  build: {
    sourcemap: false
  }
})
