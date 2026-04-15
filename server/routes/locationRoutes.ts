import { Router } from 'express';
import { cacheService } from '../services/cacheService';
import { validate, schemas } from '../middleware/security';
import { query } from '../db';

const router = Router();

// Nearby Search with Cache & PostGIS
router.get('/nearby', validate(schemas.nearbySearch), async (req, res) => {
  const { lat, lng, radius } = req.query as any;
  
  const cacheKey = cacheService.keys.nearbyLocations(lat, lng, radius);
  const cached = await cacheService.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const result = await query(
      `SELECT *, ST_Distance(geom, ST_MakePoint($1, $2)::geography) as distance 
       FROM locations 
       WHERE ST_DWithin(geom, ST_MakePoint($1, $2)::geography, $3 * 1000)
       ORDER BY rating DESC`,
      [lng, lat, radius]
    );
    
    const locations = result.rows;
    await cacheService.set(cacheKey, locations, 300);
    res.json(locations);
  } catch (error) {
    // Fallback for demo/dev if DB not ready
    const mockNearby = [
      { id: '1', name: 'Registan Square', rating: 4.9, distance: '0.2km' },
      { id: '4', name: 'Bibi-Khanym Mosque', rating: 4.8, distance: '0.8km' }
    ];
    res.json(mockNearby);
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
