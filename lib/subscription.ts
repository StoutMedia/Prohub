import type { SupabaseClient } from '@supabase/supabase-js';
import { activeStatuses } from './plans';

export async function hasActiveSubscription(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase.from('subscriptions').select('id').eq('user_id', userId).in('status', activeStatuses).limit(1);
  return Boolean(data?.length);
}
