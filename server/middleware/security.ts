import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Rate Limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation Schemas
export const schemas = {
  nearbySearch: z.object({
    lat: z.string().transform(Number),
    lng: z.string().transform(Number),
    radius: z.string().optional().transform(v => v ? Number(v) : 1),
  }),
  booking: z.object({
    amount: z.number().positive(),
    locationId: z.string(),
    userId: z.string(),
  })
};

// Validation Middleware
export const validate = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = schema.parse(req.query);
    req.query = parsed as any;
    next();
  } catch (err: any) {
    res.status(400).json({ error: 'Validation failed', details: err.errors });
  }
};
