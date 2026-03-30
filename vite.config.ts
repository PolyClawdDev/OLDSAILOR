import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Chrome caches http://127.0.0.1:3000 and http://localhost:3000 separately — use one URL only. */
function devNoCachePlugin() {
  return {
    name: 'osbs-dev-no-cache',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader(
          'Cache-Control',
          'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        )
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devNoCachePlugin()],
  server: {
    port: 3000,
    strictPort: true,
    // Listen on all interfaces so HMR WebSocket matches whether you open localhost or 127.0.0.1
    host: true,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
    watch: {
      // Desktop synced with iCloud, Docker, or some macOS setups miss native file events — polling makes saves show up
      usePolling: true,
      interval: 200,
    },
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
})
