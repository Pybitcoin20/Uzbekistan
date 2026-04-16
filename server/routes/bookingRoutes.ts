import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { query } from '../db';
import { logAudit } from '../services/securityService';
import { z } from 'zod';

const router = express.Router();

// Create Booking
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  const schema = z.object({
    locationId: z.number(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  });

  try {
    const { locationId, date } = schema.parse(req.body);

    // Get location price
    const locResult = await query('SELECT price_per_visit FROM locations WHERE id = $1', [locationId]);
    if (locResult.rows.length === 0) return res.status(404).json({ error: 'Location not found' });
    
    const price = locResult.rows[0].price_per_visit;

    const bookingResult = await query(
      'INSERT INTO bookings (user_id, location_id, booking_date, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, locationId, date, price]
    );

    // Reward points for booking (e.g., 10 points per booking)
    await query('UPDATE users SET points = points + 10 WHERE id = $1', [req.user.id]);
    await query('INSERT INTO points_history (user_id, points, reason) VALUES ($1, $2, $3)', [req.user.id, 10, 'booking_reward']);

    await logAudit(req.user.id, 'booking_created', { bookingId: bookingResult.rows[0].id }, req);

    res.json({ message: 'Sayohat muvaffaqiyatli band qilindi', booking: bookingResult.rows[0] });
  } catch (err: any) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get User Bookings
router.get('/my', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const result = await query(`
      SELECT b.*, l.name as location_name, l.city, l.images[1] as image
      FROM bookings b
      JOIN locations l ON b.location_id = l.id
      WHERE b.user_id = $1
      ORDER BY b.created_at DESC
    `, [req.user.id]);

    res.json({ bookings: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;
