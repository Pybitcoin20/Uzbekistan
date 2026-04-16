import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { query } from '../db';

const router = express.Router();

// Generate or get referral code
router.get('/code', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const user = await query('SELECT referral_code FROM users WHERE id = $1', [req.user.id]);
    
    if (user.rows[0].referral_code) {
      return res.json({ code: user.rows[0].referral_code });
    }

    // Generate unique code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    await query('UPDATE users SET referral_code = $1 WHERE id = $2', [code, req.user.id]);
    
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: 'Failed to manage referral code' });
  }
});

// Get referral stats
router.get('/stats', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const referrals = await query(`
      SELECT display_name, created_at, tier 
      FROM users 
      WHERE referred_by = $1
      ORDER BY created_at DESC
    `, [req.user.id]);

    const points = await query('SELECT points FROM users WHERE id = $1', [req.user.id]);

    res.json({
      count: referrals.rowCount,
      referrals: referrals.rows,
      totalPoints: points.rows[0].points
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch referral stats' });
  }
});

export default router;
