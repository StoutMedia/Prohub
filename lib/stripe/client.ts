import Stripe from 'stripe';

export function stripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is required');
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}
