import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../db';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { logAudit, trackLoginAttempt } from '../services/securityService';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/emailService';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret-key';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, 'Katta harf bo\'lishi kerak').regex(/[0-9]/, 'Raqam bo\'lishi kerak'),
  displayName: z.string().optional(),
  referralCode: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const generateTokens = async (user: any, req: any) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  await query(
    'INSERT INTO refresh_tokens (user_id, token, device_info, ip_address, expires_at) VALUES ($1, $2, $3, $4, $5)',
    [user.id, refreshToken, userAgent, ipAddress, expiresAt]
  );

  return { accessToken, refreshToken };
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName, referralCode } = registerSchema.parse(req.body);

    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Check referral code
    let referredBy = null;
    if (referralCode) {
      const referrer = await query('SELECT id FROM users WHERE referral_code = $1', [referralCode]);
      if (referrer.rows.length > 0) {
        referredBy = referrer.rows[0].id;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = uuidv4();

    const role = email === 'crazyaivodeos@gmail.com' ? 'admin' : 'user';
    const result = await query(
      'INSERT INTO users (email, password, display_name, role, verification_token, referred_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, role, display_name',
      [email, hashedPassword, displayName, role, verificationToken, referredBy]
    );

    const user = result.rows[0];
    
    // Reward referrer if exists
    if (referredBy) {
      await query('UPDATE users SET points = points + 500 WHERE id = $1', [referredBy]);
      await query('INSERT INTO points_history (user_id, points, reason) VALUES ($1, $2, $3)', [referredBy, 500, 'referral_reward']);
    }

    await sendVerificationEmail(email, verificationToken);
    await logAudit(user.id, 'user_registered', { email, referredBy }, req);

    res.status(201).json({ 
      message: 'Ro\'yxatdan o\'tdingiz. Emailingizni tasdiqlang.',
      user 
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues[0].message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const ipAddress = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
  
  try {
    const { email, password } = loginSchema.parse(req.body);

    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      await trackLoginAttempt(email, ipAddress, false);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if account is locked
    if (user.lock_until && new Date(user.lock_until) > new Date()) {
      return res.status(403).json({ 
        error: `Account locked. Try again after ${new Date(user.lock_until).toLocaleTimeString()}` 
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      const locked = await trackLoginAttempt(email, ipAddress, false);
      await logAudit(user.id, 'login_failed', { email }, req);
      return res.status(401).json({ 
        error: locked ? 'Account locked due to too many attempts' : 'Invalid email or password' 
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: 'Please verify your email first' });
    }

    await trackLoginAttempt(email, ipAddress, true);
    const { accessToken, refreshToken } = await generateTokens(user, req);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await logAudit(user.id, 'user_logged_in', { ip: ipAddress }, req);

    const { password: _, verification_token: __, ...userWithoutSensitive } = user;
    res.json({ user: userWithoutSensitive, accessToken });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.issues[0].message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh Token
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

  try {
    const result = await query(
      'SELECT rt.*, u.email, u.role FROM refresh_tokens rt JOIN users u ON rt.user_id = u.id WHERE rt.token = $1 AND rt.expires_at > NOW()',
      [refreshToken]
    );
    const storedToken = result.rows[0];

    if (!storedToken) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    // Rotate token: Delete old, create new
    await query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
    
    const user = { id: storedToken.user_id, email: storedToken.email, role: storedToken.role };
    const tokens = await generateTokens(user, req);

    res.cookie('token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: tokens.accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Refresh failed' });
  }
});

// Verify Email
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Token required' });

  try {
    const result = await query('UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING id', [token]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }
    res.redirect('/?verified=true');
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req: AuthRequest, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
  }
  res.clearCookie('token');
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  await logAudit(req.user?.id || null, 'user_logged_out', {}, req);
  res.json({ message: 'Logged out successfully' });
});

// Get active sessions
router.get('/sessions', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const result = await query(
      'SELECT id, device_info, ip_address, created_at FROM refresh_tokens WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user?.id]
    );
    res.json({ sessions: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Logout from all devices
router.post('/logout-all', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await query('DELETE FROM refresh_tokens WHERE user_id = $1', [req.user?.id]);
    res.clearCookie('token');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    await logAudit(req.user?.id || null, 'logout_all_devices', {}, req);
    res.json({ message: 'Logged out from all devices' });
  } catch (err) {
    res.status(500).json({ error: 'Logout all failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const result = await query('SELECT id, email, role, display_name, photo_url, is_verified FROM users WHERE id = $1', [req.user?.id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = z.object({ email: z.string().email() }).parse(req.body);

  try {
    const result = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const resetToken = uuidv4();
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 15);

      await query(
        'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3',
        [resetToken, expiry, email]
      );

      await sendPasswordResetEmail(email, resetToken);
      await logAudit(result.rows[0].id, 'password_reset_requested', { email }, req);
    }

    // Always return success to prevent email enumeration
    res.json({ message: 'Agar ushbu email ro\'yxatdan o\'tgan bo\'lsa, parolni tiklash havolasi yuborildi.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, password } = z.object({
    token: z.string(),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  }).parse(req.body);

  try {
    const result = await query(
      'SELECT id FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
      [token]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Havola yaroqsiz yoki muddati o\'tgan' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await query(
      'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE id = $2',
      [hashedPassword, user.id]
    );

    await logAudit(user.id, 'password_reset_success', {}, req);
    res.json({ message: 'Parol muvaffaqiyatli o\'zgartirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Google Login
router.post('/google', async (req, res) => {
  const { credential } = z.object({ credential: z.string() }).parse(req.body);

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) return res.status(400).json({ error: 'Invalid Google token' });

    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists
    let result = await query('SELECT * FROM users WHERE email = $1', [email]);
    let user = result.rows[0];

    if (!user) {
      // Create new user
      const role = email === 'crazyaivodeos@gmail.com' ? 'admin' : 'user';
      // Generate a random password for OAuth users (they won't use it)
      const hashedPassword = await bcrypt.hash(uuidv4(), 12);
      
      const insertResult = await query(
        'INSERT INTO users (email, password, display_name, photo_url, role, is_verified) VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING *',
        [email, hashedPassword, name, picture, role]
      );
      user = insertResult.rows[0];
      await logAudit(user.id, 'user_registered_oauth', { provider: 'google' }, req);
    } else {
      // Update photo if changed
      if (picture && picture !== user.photo_url) {
        await query('UPDATE users SET photo_url = $1 WHERE id = $2', [picture, user.id]);
      }
      await logAudit(user.id, 'user_logged_in_oauth', { provider: 'google' }, req);
    }

    const { accessToken, refreshToken } = await generateTokens(user, req);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutSensitive } = user;
    res.json({ user: userWithoutSensitive, accessToken });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).json({ error: 'Google login failed' });
  }
});

export default router;
