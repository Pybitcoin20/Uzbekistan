import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const authorizeVendor = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'vendor' && req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Vendor access required' });
  }
  next();
};

export const authorizePremium = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Admins are always premium
  if (req.user?.role === 'admin') return next();

  // Check user tier from DB (more secure than JWT if tier changes frequently)
  // For simplicity here, we assume tier is in JWT or we fetch it
  // In a real app, you'd fetch the latest from DB or use a cached session
  next();
};

// Usage limit middleware for AI Trip Planner
export const checkUsageLimit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const result = await query('SELECT tier, role FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (user.role === 'admin' || user.tier === 'premium') {
      return next();
    }

    // Check usage for free users (e.g., max 3 AI plans per day)
    const auditResult = await query(
      "SELECT count(*) FROM audit_logs WHERE user_id = $1 AND action = 'ai_plan_generated' AND created_at > NOW() - INTERVAL '24 hours'",
      [req.user.id]
    );
    
    if (parseInt(auditResult.rows[0].count) >= 3) {
      return res.status(403).json({ 
        error: 'Free tier limit reached. Upgrade to Premium for unlimited AI planning.',
        code: 'LIMIT_REACHED'
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const csrfToken = req.headers['x-csrf-token'];
  const csrfCookie = req.cookies['csrf-token'];

  if (!csrfToken || !csrfCookie || csrfToken !== csrfCookie) {
    return res.status(403).json({ error: 'CSRF token mismatch' });
  }

  next();
};
