import { createBrowserClient } from '@paymi/supabase';

export interface SupabaseBrowserClientConfig
  extends Pick<NodeJS.ProcessEnv, 'SUPABASE_ANON_KEY' | 'SUPABASE_URL'> {}

export function getSupabaseBrowserClient({
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
}: SupabaseBrowserClientConfig) {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
