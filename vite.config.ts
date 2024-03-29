import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 8080,
    proxy: {
      // Přesměrování požadavků /api na https://mempool.space/api/
      '/api': {
        target: 'https://mempool.space/api/',
        changeOrigin: true, // nutné pro domény s jiným původem
        rewrite: (path) =>{
          console.log('qqq path', path)
         return  path.replace(/^\/api/, '')
        }, // odstranění /api z cesty
      },
    },
  },
  // base: "/caravan/#",
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "./src/utils")
    }
  },
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true
    })
  ],
  build: {
    outDir: "dist"
  },
  define: {
    __GIT_SHA__: JSON.stringify(process.env.__GIT_SHA__),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  optimizeDeps: {
    include: [
      /*
        Add packages you want to develop locally with caravan here
        for example, uncomment the ones below if working on either package
      */
      // "unchained-bitcoin",
      // "unchained-wallets",
    ]
  }
});
