import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
      "@components": "/src/components",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@store": "/src/store",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@services": "/src/services",
      "@routes": "/src/routes",
      "@middlewares": "/src/middlewares",
    },
  },
});
