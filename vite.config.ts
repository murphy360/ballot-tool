import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/ballot-tool/ ; override with BASE=/ for a custom domain.
export default defineConfig({
  base: process.env.BASE ?? "/ballot-tool/",
  plugins: [react()],
});
