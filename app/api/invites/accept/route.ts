import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';

async function acceptInvite(token: string | null) {
  if (!token) return NextResponse.redirect(`${siteUrl()}/login?error=missing_invite`);
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(`${siteUrl()}/login?invite=${token}`);
  const { data: invite } = await supabase.from('invites').select('*').eq('token', token).eq('accepted', false).gt('expires_at', new Date().toISOString()).maybeSingle();
  if (!invite) return NextResponse.redirect(`${siteUrl()}/onboarding/pricing?error=invalid_invite`);
  await supabase.from('organization_members').upsert({ organization_id: invite.organization_id, user_id: user.id, role: invite.role, status: 'active' }, { onConflict: 'organization_id,user_id' });
  await supabase.from('profiles').upsert({ id: user.id, email: user.email, role: invite.role, workspace_type: 'invite', updated_at: new Date().toISOString() }, { onConflict: 'id' });
  await supabase.from('invites').update({ accepted: true }).eq('id', invite.id);
  return NextResponse.redirect(`${siteUrl()}/onboarding/complete`);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  return acceptInvite(url.searchParams.get('token'));
}

export async function POST(request: Request) {
  const { token } = await request.json();
  return acceptInvite(token);
}
