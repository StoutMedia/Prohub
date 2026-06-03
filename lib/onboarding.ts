export function nextOnboardingPath(profile?: { onboarding_step?: string | null; role?: string | null; workspace_type?: string | null; onboarding_complete?: boolean | null } | null) {
  if (!profile?.role) return '/onboarding/role';
  if (!profile.workspace_type) return '/onboarding/workspace';
  if (!profile.onboarding_step || ['role', 'workspace'].includes(profile.onboarding_step)) return '/onboarding/profile';
  if (profile.onboarding_step === 'profile') return profile.role === 'player' || profile.role === 'parent' ? '/onboarding/player-parent' : '/onboarding/club-team';
  if (profile.onboarding_step === 'player-parent' || profile.onboarding_step === 'club-team') return '/onboarding/pricing';
  if (profile.onboarding_step === 'pricing') return '/onboarding/complete';
  return '/onboarding/role';
}
