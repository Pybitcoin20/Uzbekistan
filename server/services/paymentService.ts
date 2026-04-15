import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

export const paymentService = {
  async createBookingSession(amount: number, locationId: string, userId: string) {
    // Platform takes 10% commission
    const platformFee = Math.round(amount * 0.1 * 100); // in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Booking for Location ${locationId}`,
            },
            unit_amount: Math.round(amount * 100), // total in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL}/booking/cancel`,
      metadata: {
        userId,
        locationId,
        platformFee: platformFee.toString(),
      },
    });

    return session;
  },

  async handleWebhook(payload: string, sig: string) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      // Here you would:
      // 1. Update Firestore booking status to 'confirmed'
      // 2. Trigger payout to vendor (minus platform fee)
      console.log('Payment successful for session:', session.id);
    }

    return { received: true };
  }
};
