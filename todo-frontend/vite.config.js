import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProduction = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  server: !isProduction
    ? {
        proxy: {
          "/api": {
            target: "http://localhost:3500",
            changeOrigin: true,
            secure: false,
          },
        },
      }
    : {},

  plugins: [react()],
});
