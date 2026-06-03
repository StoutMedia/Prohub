import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const allowedRoles = ['coach', 'player', 'parent', 'director', 'staff'];
const allowedWorkspaces = ['individual', 'organization', 'invite', 'pisa'];

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const now = new Date().toISOString();

  if (body.role && !allowedRoles.includes(body.role)) return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  if (body.workspace_type && !allowedWorkspaces.includes(body.workspace_type)) return NextResponse.json({ error: 'Invalid workspace type' }, { status: 400 });

  const profileUpdates = Object.fromEntries(Object.entries({
    id: user.id,
    email: user.email,
    first_name: body.first_name,
    last_name: body.last_name,
    phone: body.phone,
    role: body.role,
    workspace_type: body.workspace_type,
    onboarding_step: body.onboarding_step,
    updated_at: now,
  }).filter(([, value]) => value !== undefined));
  await supabase.from('profiles').upsert(profileUpdates, { onConflict: 'id' });

  if (body.player_first_name) {
    await supabase.from('players').insert({
      profile_id: user.id,
      parent_profile_id: body.parent_email ? null : user.id,
      first_name: body.player_first_name,
      last_name: body.player_last_name,
      birthdate: body.birthdate || null,
      is_minor: Boolean(body.is_minor),
      parent_email: body.parent_email || null,
      gender: body.gender || null,
      age_group: body.age_group || null,
      position: body.position,
      level: body.level || null,
      club: body.club || null,
    });
  }

  if (body.organization_name) {
    const { data: org } = await supabase.from('organizations').insert({ name: body.organization_name, type: 'academy', owner_id: user.id, subscription_status: 'incomplete' }).select('id').single();
    if (org) {
      await supabase.from('organization_members').insert({ organization_id: org.id, user_id: user.id, role: 'owner', status: 'active' });
      if (body.team_name) await supabase.from('teams').insert({ organization_id: org.id, name: body.team_name, competition_level: body.competition_level });
    }
  }

  return NextResponse.json({ ok: true });
}
