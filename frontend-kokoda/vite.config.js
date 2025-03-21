import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3003",
        changeOrigin: true,
        secure: false,
      },
      "/public": {
        target: "http://127.0.0.1:3003/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.js",
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
});
