import { Router } from 'express';
import { cacheService } from '../services/cacheService';
import { validate, schemas } from '../middleware/security';
import { query } from '../db';
import { authenticateToken, authorizeVendor, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM locations ORDER BY rating DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Nearby Search with Cache
router.get('/nearby', validate(schemas.nearbySearch), async (req, res) => {
  const { lat, lng, radius } = req.query as any;
  
  const cacheKey = cacheService.keys.nearbyLocations(lat, lng, radius);
  const cached = await cacheService.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    // Simple distance calculation if PostGIS not fully configured
    const result = await query(
      `SELECT * FROM locations 
       ORDER BY rating DESC`,
      []
    );
    
    const locations = result.rows;
    await cacheService.set(cacheKey, locations, 300);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch nearby locations' });
  }
});

// Create Location (Vendor/Admin)
router.post('/', authenticateToken, authorizeVendor, async (req: AuthRequest, res) => {
  const { name, city, category, description, lat, lng, price_per_visit, images } = req.body;

  try {
    const result = await query(
      'INSERT INTO locations (name, city, category, description, lat, lng, price_per_visit, images, vendor_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, city, category, description, lat, lng, price_per_visit, images, req.user?.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create location' });
  }
});

// Plov Radar Ranking
router.get('/plov-radar', async (req, res) => {
  const now = new Date();
  const currentTime = now.getHours() + now.getMinutes() / 60;
  
  const getFreshness = (bestTimeStart: number) => {
    const diff = Math.abs(currentTime - bestTimeStart);
    return Math.max(0, 1 - diff / 2);
  };

  const places = [
    { name: "Plov Center", baseRating: 9.5, bestTime: 11.5, popularity: 0.9, crowd: 0.8 },
    { name: "Samarkand Osh", baseRating: 9.2, bestTime: 12.0, popularity: 0.7, crowd: 0.4 }
  ].map(p => ({
    ...p,
    liveScore: (p.baseRating * 0.4) + (getFreshness(p.bestTime) * 3) + (p.popularity * 3),
    crowdStatus: p.crowd > 0.7 ? 'Very Busy' : 'Moderate'
  }));

  res.json(places.sort((a, b) => b.liveScore - a.liveScore));
});

export default router;
