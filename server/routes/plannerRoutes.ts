import { Router } from 'express';
import { cacheService } from '../services/cacheService';
import { generateItinerary } from '../../src/services/geminiService';

const router = Router();

router.post('/generate', async (req, res) => {
  const { days, interests } = req.body;
  const cacheKey = cacheService.keys.aiItinerary(days, interests.join(','));

  const cached = await cacheService.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const itinerary = await generateItinerary(days, interests);
    if (itinerary) {
      await cacheService.set(cacheKey, itinerary, 86400);
      return res.json(itinerary);
    }
    throw new Error("Empty itinerary");
  } catch (error) {
    const fallback = [
      { day: 1, title: "Tashkent Arrival", activities: ["Chorsu Bazaar", "Minor Mosque"] },
      { day: 2, title: "Samarkand Express", activities: ["Registan", "Gur-e-Amir"] }
    ];
    res.json(fallback);
  }
});

export default router;
