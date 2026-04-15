import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { apiLimiter } from "./server/middleware/security";

// Routes
import locationRoutes from "./server/routes/locationRoutes";
import paymentRoutes from "./server/routes/paymentRoutes";
import plannerRoutes from "./server/routes/plannerRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middleware
  app.use(express.json());
  app.use("/api/", apiLimiter);

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Uzbekistan Heritage API is running" });
  });

  app.use("/api/locations", locationRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/planner", plannerRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
