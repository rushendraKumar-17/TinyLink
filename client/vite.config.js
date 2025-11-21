import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    middlewareMode: false,
    setup: ({ app }) => {
      // Custom health check route
      app.get("/healthz", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: true, version: "1.0" }));
      });
    }
  }
});
