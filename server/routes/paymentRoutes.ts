import { Router, raw } from 'express';
import { paymentService } from '../services/paymentService';

const router = Router();

router.post('/create-session', async (req, res) => {
  const { amount, locationId, userId } = req.body;
  try {
    const session = await paymentService.createBookingSession(amount, locationId, userId);
    res.json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  try {
    const result = await paymentService.handleWebhook(req.body, sig);
    res.json(result);
  } catch (error: any) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export default router;
