import type { SupabaseClient } from '@paymi/supabase';

export type { SupabaseClient, User, UserMetadata } from '@paymi/supabase';

export interface SupabaseConnectionConfig
  extends Pick<NodeJS.ProcessEnv, 'SUPABASE_ANON_KEY' | 'SUPABASE_URL'> {}

export interface SupabaseConnectionBaseReturn {
  supabase: SupabaseClient;
}
