export function createCheckoutSessionPlaceholder(plan) {
  return {
    mode: plan.id === 'accelerator' ? 'payment' : 'subscription',
    stripePriceId: plan.stripePriceId,
    successUrl: '/app/player?checkout=success',
    cancelUrl: '/pricing?checkout=cancelled',
    note: 'Connect this placeholder to a backend Stripe Checkout Session endpoint.',
  };
}
