import express from 'express';
import Stripe from 'stripe';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { query } from '../db';
import { logAudit } from '../services/securityService';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

// Create Checkout Session
router.post('/create-checkout-session', authenticateToken, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' });

  try {
    const userResult = await query('SELECT email, stripe_customer_id FROM users WHERE id = $1', [req.user.id]);
    const user = userResult.rows[0];

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: req.user.id.toString() }
      });
      customerId = customer.id;
      await query('UPDATE users SET stripe_customer_id = $1 WHERE id = $2', [customerId, req.user.id]);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_mock',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.APP_URL}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/premium`,
    });

    res.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock');
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    await query(
      "UPDATE users SET tier = 'premium', subscription_id = $1, subscription_status = 'active' WHERE stripe_customer_id = $2",
      [subscriptionId, customerId]
    );

    // Get user ID for audit log
    const userResult = await query('SELECT id FROM users WHERE stripe_customer_id = $1', [customerId]);
    if (userResult.rows.length > 0) {
      await logAudit(userResult.rows[0].id, 'subscription_started', { subscriptionId }, req as any);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    await query(
      "UPDATE users SET tier = 'free', subscription_status = 'canceled' WHERE subscription_id = $1",
      [subscription.id]
    );
  }

  res.json({ received: true });
});

export default router;
