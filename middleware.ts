import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { activeStatuses } from './lib/plans';

const publicRoutes = ['/', '/prohub', '/login', '/signup', '/verify-email', '/reset-password', '/pricing', '/checkout/success', '/checkout/cancel'];
const onboardingRoutes = ['/onboarding/role', '/onboarding/workspace', '/onboarding/profile', '/onboarding/player-parent', '/onboarding/club-team', '/onboarding/pricing', '/onboarding/invite-users', '/onboarding/complete'];
const openApiRoutes = ['/api/stripe/webhook', '/api/invites/accept'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const path = request.nextUrl.pathname;
  if (publicRoutes.includes(path) || openApiRoutes.some((route) => path.startsWith(route)) || path.startsWith('/auth/callback')) return response;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(path)}`, request.url));

  if (path.startsWith('/dashboard')) {
    const [{ data: profile }, { data: subscriptions }, { data: memberships }] = await Promise.all([
      supabase.from('profiles').select('onboarding_complete').eq('id', user.id).maybeSingle(),
      supabase.from('subscriptions').select('status').eq('user_id', user.id).in('status', activeStatuses),
      supabase.from('organization_members').select('status').eq('user_id', user.id).eq('status', 'active'),
    ]);
    if (!profile?.onboarding_complete) return NextResponse.redirect(new URL('/onboarding/role', request.url));
    const paid = Boolean(subscriptions?.length || memberships?.length);
    if (!paid && path !== '/dashboard/billing') return NextResponse.redirect(new URL('/dashboard/billing', request.url));
  }

  if (onboardingRoutes.includes(path)) return response;
  return response;
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'] };
