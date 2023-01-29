import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
        "/api/v1": "http://localhost:5000/",
        "/api/ask": "http://localhost:5000/",
    },
    hmr: {
        clientPort: 5173
    }
  },
  plugins: [react()],
});
