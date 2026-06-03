import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseMiddlewareClient } from './lib/supabase/middleware';
import { activeStatuses } from './lib/plans';
import { nextOnboardingPath } from './lib/onboarding';

const publicRoutes = ['/', '/prohub', '/login', '/signup', '/verify-email', '/reset-password', '/pricing', '/checkout/success', '/checkout/cancel'];
const onboardingRoutes = ['/onboarding/role', '/onboarding/workspace', '/onboarding/profile', '/onboarding/player-parent', '/onboarding/club-team', '/onboarding/pricing', '/onboarding/invite-users', '/onboarding/complete'];
const openApiRoutes = ['/api/stripe/webhook', '/api/invites/accept'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  if (publicRoutes.includes(path) || openApiRoutes.some((route) => path.startsWith(route)) || path.startsWith('/auth/callback')) return response();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(path)}`, request.url));

  if (path.startsWith('/dashboard') || onboardingRoutes.includes(path)) {
    const { data: profile } = await supabase.from('profiles').select('role, workspace_type, onboarding_step, onboarding_complete').eq('id', user.id).maybeSingle();
    if (path.startsWith('/dashboard') && !profile?.onboarding_complete) return NextResponse.redirect(new URL(nextOnboardingPath(profile), request.url));
    if (path.startsWith('/dashboard') && path !== '/dashboard/billing') {
      const [{ data: subscriptions }, { data: memberships }] = await Promise.all([
        supabase.from('subscriptions').select('status').eq('user_id', user.id).in('status', activeStatuses),
        supabase.from('organization_members').select('status, organizations(subscription_status)').eq('user_id', user.id).eq('status', 'active'),
      ]);
      const hasPaidAccess = Boolean(subscriptions?.length || memberships?.some((membership: any) => activeStatuses.includes(membership.organizations?.subscription_status)));
      if (!hasPaidAccess) return NextResponse.redirect(new URL('/dashboard/billing', request.url));
    }
  }

  return response();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'] };
