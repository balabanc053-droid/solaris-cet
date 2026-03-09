import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { compression } from "vite-plugin-compression2"

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
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
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
