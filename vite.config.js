import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Tanpa runtime error overlay dan cartographer dari Replit
export default defineConfig({
  plugins: [
    react(),
    // Hapus plugin tambahan Replit agar lebih portable
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
