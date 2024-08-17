import type { Database, SupabaseClient } from '@paymi/supabase';

export type { SupabaseClient, User, UserMetadata } from '@paymi/supabase';

export interface SupabaseActionOpts<T = Database> {
  supabase: SupabaseClient<T>;
}

export interface SupabaseConnectionConfig
  extends Pick<NodeJS.ProcessEnv, 'SUPABASE_ANON_KEY' | 'SUPABASE_URL'> {}

export interface SupabaseConnectionBaseReturn<T = Database> {
  supabase: SupabaseClient<T>;
}
