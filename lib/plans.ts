export type PlanKey = 'starter' | 'player' | 'family' | 'family_plus' | 'coach' | 'organization';
export type Plan = { name: string; price: string; description: string; features: string[]; env: string; audience: 'individual' | 'organization' };
export const plans: Record<PlanKey, Plan> = {
  starter: { name: 'Starter', price: '$9/mo', description: 'Entry tools for tracking a single player journey.', features: ['Basic player profile', 'Basic development goals', 'Training notes'], env: 'STRIPE_PRICE_STARTER', audience: 'individual' },
  player: { name: 'Player', price: '$29/mo', description: 'Full player development, reports, journals, and plans.', features: ['Player dashboard', 'Training logs', 'Video notes', 'Monthly development targets'], env: 'STRIPE_PRICE_PLAYER', audience: 'individual' },
  family: { name: 'Family', price: '$59/mo', description: 'Parent control for multiple child player profiles.', features: ['Parent account control', 'Player progress tracking', 'Schedule visibility', 'Communication tools'], env: 'STRIPE_PRICE_FAMILY', audience: 'individual' },
  family_plus: { name: 'Family Plus', price: '$89/mo', description: 'Premium family workspace with deeper planning and support.', features: ['Everything in Family', 'College recruiting tools', 'Advanced development plan', 'Priority PISA support'], env: 'STRIPE_PRICE_FAMILY_PLUS', audience: 'individual' },
  coach: { name: 'Coach', price: 'Coach plan', description: 'Coach workspace for teams, sessions, and player feedback.', features: ['Session planning', 'Team communication', 'Player notes'], env: 'STRIPE_PRICE_COACH', audience: 'organization' },
  organization: { name: 'Organization', price: 'Organization plan', description: 'Academy-wide operating system for directors and staff.', features: ['Staff invites', 'Team management', 'Performance tracking'], env: 'STRIPE_PRICE_ORGANIZATION', audience: 'organization' },
};
export const activeStatuses = ['active', 'trialing'];
export const blockedStatuses = ['canceled', 'incomplete_expired', 'unpaid', 'past_due'];
