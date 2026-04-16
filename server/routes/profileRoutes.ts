import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { query } from '../db';

const router = express.Router();

// Get Profile Data
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const userResult = await query('SELECT id, email, display_name, photo_url, role, tier, points FROM users WHERE id = $1', [req.user.id]);
    const user = userResult.rows[0];

    const savedResult = await query(`
      SELECT l.* FROM locations l
      JOIN saved_places s ON l.id = s.location_id
      WHERE s.user_id = $1
    `, [req.user.id]);

    const pointsHistory = await query('SELECT * FROM points_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [req.user.id]);

    res.json({
      user,
      savedPlaces: savedResult.rows,
      pointsHistory: pointsHistory.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Toggle Saved Place
router.post('/save/:locationId', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });
  const locationId = parseInt(req.params.locationId);

  try {
    const existing = await query('SELECT * FROM saved_places WHERE user_id = $1 AND location_id = $2', [req.user.id, locationId]);
    
    if (existing.rows.length > 0) {
      await query('DELETE FROM saved_places WHERE user_id = $1 AND location_id = $2', [req.user.id, locationId]);
      res.json({ saved: false });
    } else {
      await query('INSERT INTO saved_places (user_id, location_id) VALUES ($1, $2)', [req.user.id, locationId]);
      res.json({ saved: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle save' });
  }
});

export default router;
