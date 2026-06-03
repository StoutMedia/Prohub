import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const { data: membership } = await supabase.from('organization_members').select('organization_id, role').eq('user_id', user.id).eq('status', 'active').limit(1).maybeSingle();
  if (!membership) return NextResponse.json({ error: 'Create an organization before inviting users.' }, { status: 400 });
  const token = crypto.randomBytes(24).toString('hex');
  const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString();
  await supabase.from('invites').insert({ organization_id: membership.organization_id, email: body.email, role: body.role, token, expires_at });
  return NextResponse.json({ inviteUrl: `${siteUrl()}/api/invites/accept?token=${token}` });
}
