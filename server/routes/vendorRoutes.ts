import express from 'express';
import { authenticateToken, authorizeVendor, AuthRequest } from '../middleware/auth';
import { query } from '../db';
import { z } from 'zod';

const router = express.Router();

// Get Vendor Dashboard Data
router.get('/dashboard', authenticateToken, authorizeVendor, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const locations = await query('SELECT * FROM locations WHERE vendor_id = $1', [req.user.id]);
    
    const bookings = await query(`
      SELECT b.*, l.name as location_name, u.display_name as user_name, u.email as user_email
      FROM bookings b
      JOIN locations l ON b.location_id = l.id
      JOIN users u ON b.user_id = u.id
      WHERE l.vendor_id = $1
      ORDER BY b.booking_date DESC
    `, [req.user.id]);

    const stats = await query(`
      SELECT 
        COUNT(DISTINCT b.id) as total_bookings,
        SUM(b.total_price) as total_revenue
      FROM bookings b
      JOIN locations l ON b.location_id = l.id
      WHERE l.vendor_id = $1 AND b.status = 'confirmed'
    `, [req.user.id]);

    res.json({
      locations: locations.rows,
      bookings: bookings.rows,
      stats: stats.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vendor dashboard' });
  }
});

// Update Location Price (Vendor Action)
router.patch('/location/:id/price', authenticateToken, authorizeVendor, async (req: AuthRequest, res) => {
  const { price } = z.object({ price: z.number().min(0) }).parse(req.body);
  const locationId = parseInt(req.params.id);

  try {
    const result = await query(
      'UPDATE locations SET price_per_visit = $1 WHERE id = $2 AND vendor_id = $3 RETURNING *',
      [price, locationId, req.user?.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Location not found or unauthorized' });

    res.json({ message: 'Narx muvaffaqiyatli yangilandi', location: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update price' });
  }
});

export default router;
