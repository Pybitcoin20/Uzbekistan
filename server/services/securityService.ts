import { query } from '../db';

export async function logAudit(userId: number | null, action: string, details: any, req: any) {
  try {
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await query(
      'INSERT INTO audit_logs (user_id, action, details, ip_address, user_agent) VALUES ($1, $2, $3, $4, $5)',
      [userId, action, JSON.stringify(details), ipAddress, userAgent]
    );
  } catch (err) {
    console.error('Audit logging failed:', err);
  }
}

export async function trackLoginAttempt(email: string, ipAddress: string, success: boolean) {
  try {
    await query(
      'INSERT INTO login_attempts (email, ip_address, success) VALUES ($1, $2, $3)',
      [email, ipAddress, success]
    );

    if (!success) {
      // Check for brute force
      const result = await query(
        'SELECT count(*) FROM login_attempts WHERE email = $1 AND success = FALSE AND created_at > NOW() - INTERVAL \'15 minutes\'',
        [email]
      );
      const attempts = parseInt(result.rows[0].count);

      if (attempts >= 5) {
        // Lock account for 30 minutes
        await query(
          'UPDATE users SET lock_until = NOW() + INTERVAL \'30 minutes\' WHERE email = $1',
          [email]
        );
        return true; // Account locked
      }
    } else {
      // Reset attempts on success
      await query('UPDATE users SET failed_login_attempts = 0, lock_until = NULL WHERE email = $1', [email]);
    }
    return false;
  } catch (err) {
    console.error('Login attempt tracking failed:', err);
    return false;
  }
}
