# ProHub by PISA

ProHub by PISA is a production-ready Next.js App Router SaaS foundation for a premium soccer operating system powered by PISA / Protouch International Soccer Academy. It includes Supabase authentication, email verification, role-based onboarding, parent/player and organization flows, invite acceptance, Stripe Checkout, Stripe Customer Portal, webhook-backed subscription entitlements, and protected role dashboards.

## 1. Install dependencies

```bash
npm install
npm run dev
```

## 2. Create a Supabase project

1. Create a new project at Supabase.
2. Copy the Project URL into `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY` for server-only API routes and webhooks. Never expose this key to client code.

## 3. Run SQL migration

Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor, or install the Supabase CLI and run:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migration enables `pgcrypto`, creates `profiles`, `organizations`, `organization_members`, `players`, `teams`, `subscriptions`, and `invites`, enables RLS on every table, adds ownership/member policies, and creates a trigger to make a profile when a Supabase Auth user is created.

## 4. Enable Supabase email/password auth

1. In Supabase, open **Authentication → Providers → Email**.
2. Enable Email provider.
3. Enable email confirmations for production.
4. Configure email templates to link back to `/auth/callback`.

## 5. Enable Google OAuth

1. Create OAuth credentials in Google Cloud.
2. Add the Supabase callback URL shown in Supabase Auth provider settings to Google.
3. In Supabase, open **Authentication → Providers → Google** and paste the client ID and secret.
4. Google sign-in redirects through `/auth/callback` and then into onboarding/dashboard.

## 6. Enable Apple OAuth

1. Create an Apple Services ID and private key in Apple Developer.
2. Add the Supabase Apple callback URL in Apple Developer.
3. Enable Apple in Supabase Auth and enter the Apple credentials.
4. Set `NEXT_PUBLIC_ENABLE_APPLE_OAUTH=true` in the app environment. Until that flag is set, the Apple button is disabled with an inline configuration message.

## 7. Required Supabase redirect URLs

Add these redirect URLs in Supabase Authentication URL configuration:

- `http://localhost:3000/auth/callback`
- `https://app.pisafootball.com/auth/callback`

## 8. Create Stripe products/prices

Create recurring monthly Stripe prices for:

- Starter — `$9/mo`
- Player — `$29/mo`
- Family — `$59/mo`
- Family Plus — `$89/mo`
- Coach plan
- Organization plan

## 9. Add Stripe price IDs

Copy the Stripe recurring price IDs into `.env.local`:

```bash
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PLAYER=price_...
STRIPE_PRICE_FAMILY=price_...
STRIPE_PRICE_FAMILY_PLUS=price_...
STRIPE_PRICE_COACH=price_...
STRIPE_PRICE_ORGANIZATION=price_...
```

Also set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET`.

## 10. Test Stripe Checkout locally

1. Start the app with `npm run dev`.
2. Sign up, verify email, complete onboarding through pricing.
3. Click a pricing card.
4. Use Stripe test card `4242 4242 4242 4242` with any future expiration and CVC.
5. Confirm redirect to `/checkout/success`.

## 11. Test Stripe webhooks locally

Install the Stripe CLI, log in, and forward events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`, then complete a test checkout. The webhook handles:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

## 12. Deploy to Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Set the framework preset to Next.js.
4. Add all production environment variables.
5. Deploy.

## 13. Add production environment variables

Use `.env.example` as the source of truth. Required variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER`
- `STRIPE_PRICE_PLAYER`
- `STRIPE_PRICE_FAMILY`
- `STRIPE_PRICE_FAMILY_PLUS`
- `STRIPE_PRICE_COACH`
- `STRIPE_PRICE_ORGANIZATION`
- `EMAIL_FROM`
- optional `NEXT_PUBLIC_ENABLE_APPLE_OAUTH=true`

## 14. QA checklist

- [ ] Email/password sign up creates a Supabase user and profile.
- [ ] Supabase sends email verification.
- [ ] `/auth/callback` exchanges the code and redirects to onboarding.
- [ ] Login and logout work.
- [ ] Password reset request and update password flow work.
- [ ] Google OAuth works when configured.
- [ ] Apple OAuth works only when configured; otherwise the button is disabled with a clear message.
- [ ] User can select Coach, Player, Parent, or Director/Staff.
- [ ] User can select Individual, Organization, I received an invite, or PISA Player.
- [ ] User can complete profile setup.
- [ ] Parent/player users can save player details and minor/parent-email requirements.
- [ ] Organization users can create organization/team setup.
- [ ] Parent/player pricing shows Starter, Player, Family, and Family Plus plans.
- [ ] Stripe Checkout opens for configured plan price IDs.
- [ ] Stripe webhook verifies signatures and updates `subscriptions`.
- [ ] Organization plans update organization subscription status.
- [ ] Invite creation returns a secure expiring invite link.
- [ ] Invite acceptance creates membership and skips public pricing for invited users.
- [ ] Paid users reach the correct role dashboard.
- [ ] Unpaid users are redirected to `/dashboard/billing`.
- [ ] Billing portal opens for users with a Stripe customer.
- [ ] Mobile auth, verification, onboarding, pricing, and dashboard layouts remain usable.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## Built routes

Public: `/`, `/prohub`, `/login`, `/signup`, `/verify-email`, `/reset-password`, `/auth/callback`, `/pricing`, `/checkout/success`, `/checkout/cancel`.

Onboarding: `/onboarding/role`, `/onboarding/workspace`, `/onboarding/profile`, `/onboarding/player-parent`, `/onboarding/club-team`, `/onboarding/pricing`, `/onboarding/invite-users`, `/onboarding/complete`.

Protected dashboard: `/dashboard`, `/dashboard/player`, `/dashboard/parent`, `/dashboard/coach`, `/dashboard/director`, `/dashboard/settings`, `/dashboard/billing`.

API: `/api/stripe/create-checkout-session`, `/api/stripe/create-portal-session`, `/api/stripe/webhook`, `/api/invites/create`, `/api/invites/accept`, `/api/onboarding/save-step`.
