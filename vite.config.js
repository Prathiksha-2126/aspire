import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // fallback for local `npm run dev` where Vercel's /api is not served by Vite
      // ContactForm will try /api/contact first; if 404 we fallback to preview success
    },
  },
  // Dev middleware to handle /api/contact without Vercel dev
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url?.startsWith("/api/contact")) {
        if (req.method === "OPTIONS") {
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          res.end();
          return;
        }
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const data = JSON.parse(body || "{}");
            console.log("[dev api/contact] preview mode — no email sent (set SMTP_* in .env.local for real send):", data);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify({ ok: true, preview: true }));
          } catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON" }));
          }
        });
        return;
      }
      next();
    });
  },
});
