import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "./vite.config.js",
    test: {
      name: "happy-dom",
      environment: "happy-dom",
      include: ["src/__tests__/**/*.node.test.{js,jsx}"],
    },
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
  {
    extends: "./vite.config.js",
    test: {
      name: "browser",
      include: ["src/__tests__/**/*.browser.test.{js,jsx}"],
      browser: {
        provider: "playwright",
        enabled: true,
        instances: [
          { browser: "chromium" },
          { browser: "firefox" },
          { browser: "webkit" },
        ],
      },
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
]);
