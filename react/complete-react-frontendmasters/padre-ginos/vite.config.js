import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
      "/public": { target: "http://localhost:3000", changeOrigin: true },
    },
  },
  plugins: [TanStackRouterVite(), react()],
  test: {
    coverage: {
      provider: "istanbul",
    },
    projects: [
      {
        plugins: [react()],
        test: {
          name: "happy-dom",
          environment: "happy-dom",
          include: ["src/__tests__/**/*.node.test.{js,jsx}"],
        },
      },
      {
        plugins: [react()],
        test: {
          name: "browser",
          include: ["src/__tests__/**/*.browser.test.{js,jsx}"],
          browser: {
            provider: playwright(),
            enabled: true,
            instances: [
              { browser: "chromium" },
              { browser: "firefox" },
              { browser: "webkit" },
            ],
          },
        },
      },
    ],
  },
});
