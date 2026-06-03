export type PlanKey = 'starter' | 'player' | 'family' | 'family_plus' | 'coach' | 'organization';

export const plans: Record<PlanKey, { name: string; price: string; description: string; env: string; audience: 'individual' | 'organization' }> = {
  starter: { name: 'Starter', price: '$9/mo', description: 'Entry tools for tracking a single player journey.', env: 'STRIPE_PRICE_STARTER', audience: 'individual' },
  player: { name: 'Player', price: '$29/mo', description: 'Full player development, reports, journals, and plans.', env: 'STRIPE_PRICE_PLAYER', audience: 'individual' },
  family: { name: 'Family', price: '$59/mo', description: 'Parent control for multiple child player profiles.', env: 'STRIPE_PRICE_FAMILY', audience: 'individual' },
  family_plus: { name: 'Family Plus', price: '$89/mo', description: 'Premium family workspace with deeper planning and support.', env: 'STRIPE_PRICE_FAMILY_PLUS', audience: 'individual' },
  coach: { name: 'Coach', price: 'Coach plan', description: 'Coach workspace for teams, sessions, and player feedback.', env: 'STRIPE_PRICE_COACH', audience: 'organization' },
  organization: { name: 'Organization', price: 'Org plan', description: 'Academy-wide operating system for directors and staff.', env: 'STRIPE_PRICE_ORGANIZATION', audience: 'organization' },
};

export const activeStatuses = ['active', 'trialing'];
