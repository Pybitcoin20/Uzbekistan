import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Uzbekistan Heritage API is running" });
  });

  // Smart Geo Search Logic
  // Find locations within 1km radius
  app.get("/api/locations/nearby", (req, res) => {
    const { lat, lng, radius = 1 } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    // In a real production app with PostgreSQL/PostGIS, we would use:
    // SELECT * FROM locations 
    // WHERE ST_DWithin(geom, ST_MakePoint($1, $2)::geography, $3 * 1000)
    // ORDER BY rating DESC;

    // For this demo, we'll return mock data sorted by rating
    const mockNearby = [
      { id: '1', name: 'Registan Square', rating: 4.9, distance: '0.2km' },
      { id: '4', name: 'Bibi-Khanym Mosque', rating: 4.8, distance: '0.8km' },
      { id: '5', name: 'Shah-i-Zinda', rating: 4.7, distance: '1.2km' }
    ].filter(loc => parseFloat(loc.distance) <= Number(radius));

    res.json(mockNearby.sort((a, b) => b.rating - a.rating));
  });

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
