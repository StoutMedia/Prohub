# ProHub by PISA

ProHub by PISA is a Next.js App Router soccer operating system for Protouch International Soccer Academy. It includes Supabase authentication, role-based onboarding, organization invites, Stripe subscriptions, webhook-driven entitlement updates, and protected dashboards.

## Brand

- Product: **ProHub by PISA**
- Parent brand: **Protouch International Soccer Academy**
- Website: `pisafootball.com`
- Colors: navy `#0B2751`, orange `#E47410`, white `#FFFFFF`, black `#000000`

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Supabase Auth + Supabase Postgres
- Stripe Checkout, Customer Portal, and webhooks
- Resend-ready environment variables for transactional email
- Vercel-ready deployment

## Implemented routes

### Public/auth

- `/`
- `/prohub`
- `/login`
- `/signup`
- `/verify-email`
- `/reset-password`
- `/auth/callback`
- `/pricing`
- `/checkout/success`
- `/checkout/cancel`

### Onboarding

- `/onboarding/role`
- `/onboarding/workspace`
- `/onboarding/profile`
- `/onboarding/player-parent`
- `/onboarding/club-team`
- `/onboarding/pricing`
- `/onboarding/invite-users`
- `/onboarding/complete`

### Protected app

- `/dashboard`
- `/dashboard/player`
- `/dashboard/parent`
- `/dashboard/coach`
- `/dashboard/director`
- `/dashboard/settings`
- `/dashboard/billing`

### API

- `/api/stripe/create-checkout-session`
- `/api/stripe/create-portal-session`
- `/api/stripe/webhook`
- `/api/invites/create`
- `/api/invites/accept`
- `/api/onboarding/save-step`

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill values:

   ```bash
   cp .env.example .env.local
   ```

3. Create a Supabase project and enable Auth providers:

   - Email/password auth
   - Email confirmation
   - Google OAuth provider
   - Apple OAuth provider if you have Apple developer credentials, have enabled Apple in Supabase, and set `NEXT_PUBLIC_ENABLE_APPLE_OAUTH=true`

4. Run the SQL migration in Supabase SQL editor or with Supabase CLI:

   ```bash
   supabase db push
   ```

   Migration file: `supabase/migrations/20260603000000_prohub_auth_onboarding_subscriptions.sql`.

5. Create Stripe recurring prices and add the price IDs to `.env.local`:

   - `STRIPE_PRICE_STARTER` for Starter `$9/mo`
   - `STRIPE_PRICE_PLAYER` for Player `$29/mo`
   - `STRIPE_PRICE_FAMILY` for Family `$59/mo`
   - `STRIPE_PRICE_FAMILY_PLUS` for Family Plus `$89/mo`
   - `STRIPE_PRICE_COACH`
   - `STRIPE_PRICE_ORGANIZATION`

6. Configure Stripe webhook endpoint:

   ```text
   https://your-domain.com/api/stripe/webhook
   ```

   Subscribe to these events:

   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

7. Start development server:

   ```bash
   npm run dev
   ```

## Access rules

- Logged-out users are redirected to `/login` for protected pages.
- Authenticated users who have not completed onboarding are redirected to `/onboarding/role` before dashboard access.
- Paid dashboard routes are blocked unless the user has an active/trialing subscription or an active organization membership.
- Billing remains available at `/dashboard/billing` so unpaid users can subscribe.
- Organization invite acceptance creates an active membership and sets `workspace_type = 'invite'`, allowing invited coaches/staff to skip public pricing.

## Test checklist

- [ ] New user can sign up with email/password.
- [ ] New user receives Supabase email verification.
- [ ] User can log in and log out.
- [ ] User can request a password reset email.
- [ ] Google OAuth redirects through `/auth/callback` and creates a profile.
- [ ] Apple OAuth works when configured in Supabase; otherwise provider setup is required.
- [ ] User can complete role, workspace, profile, and player/club onboarding steps.
- [ ] Parent/player pricing shows Starter `$9/mo`, Player `$29/mo`, Family `$59/mo`, and Family Plus `$89/mo`.
- [ ] Invited coach accepts invite and skips pricing.
- [ ] Stripe Checkout starts for configured price IDs.
- [ ] Stripe webhook verifies the signature and updates `subscriptions`.
- [ ] Paid or invited user reaches role dashboard.
- [ ] Unpaid user is redirected to `/dashboard/billing`.
- [ ] Pages are usable on mobile, tablet, and desktop.
- [ ] `npm run typecheck` has no TypeScript errors.
- [ ] `npm run build` completes without console/build errors.

## Notes

OAuth buttons call Supabase directly. If a provider is not enabled in Supabase, Supabase will return a provider configuration error; configure that provider before using it in production.
