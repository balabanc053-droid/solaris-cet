import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { compression } from "vite-plugin-compression2"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    // Emit Brotli-compressed (.br) assets alongside regular files.
    // Reduces transfer size by up to 75 % vs gzip — critical for rural
    // low-bandwidth users. Servers that support pre-compressed assets
    // serve the .br variant with Content-Encoding: br automatically.
    compression({
      algorithms: ["brotliCompress"],
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Solaris CET',
        short_name: 'Solaris',
        description: 'Next-Gen Decentralized TON Ecosystem Token',
        theme_color: '#05060B',
        background_color: '#05060B',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Buy CET on DeDust',
            short_name: 'Buy CET',
            url: 'https://dedust.io/pools/EQB5_hZPl4-EI1aWdLSd21c8T9PoKyZK2IJtrDFdPJIelfnB/deposit',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB to cover phone-mockup.png
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.dedust\.io\//i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'dedust-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.coingecko\.com\//i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'coingecko-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
            },
          },
          {
            // Cache onnxruntime-web WASM binaries from the CDN with a
            // CacheFirst strategy: the versioned URL never changes, so a
            // cached copy is served indefinitely, enabling fully-offline
            // AI inference via the Service Worker.
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/onnxruntime-web\//i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ort-wasm-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  // Workers that use dynamic import() (e.g. onnxruntime-web) need ESM format;
  // the default IIFE format does not support code-splitting.
  worker: {
    format: 'es',
  },
  // Prevent Vite from pre-bundling onnxruntime-web: it ships its own WASM
  // binaries that must not be transformed by esbuild's pre-bundler.
  // The library is only imported dynamically inside aiWorker.ts, so it never
  // lands in the main-thread bundle regardless of this setting; the exclusion
  // ensures the dev-server also handles the import correctly.
  optimizeDeps: {
    exclude: ['onnxruntime-web'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const pkg = id.split('node_modules/')[1];
            // Handle scoped packages like @radix-ui/react-dialog
            if (pkg.startsWith('@')) {
              return pkg.split('/').slice(0, 2).join('/');
            }
            return pkg.split('/')[0];
          }
          return undefined;
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    drop: ['debugger'],
    legalComments: 'none',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@sections": path.resolve(__dirname, "./src/sections"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
