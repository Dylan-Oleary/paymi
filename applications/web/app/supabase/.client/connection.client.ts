import { createBrowserClient, Database } from '@paymi/supabase';

import type {
  SupabaseConnectionBaseReturn,
  SupabaseConnectionConfig,
} from '~/supabase';

interface SupabaseBrowserConnectionReturn<T = Database>
  extends SupabaseConnectionBaseReturn<T> {}

export interface SupabaseBrowserConnectionOpts {
  config: SupabaseConnectionConfig;
}

export function getSupabaseBrowserConnection<T = Database>({
  config: { SUPABASE_ANON_KEY, SUPABASE_URL },
}: SupabaseBrowserConnectionOpts): SupabaseBrowserConnectionReturn<T> {
  return { supabase: createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY) };
}
