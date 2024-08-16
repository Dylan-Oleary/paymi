import { createBrowserClient } from '@paymi/supabase';

import type {
  SupabaseConnectionBaseReturn,
  SupabaseConnectionConfig,
} from '~/supabase';

interface SupabaseBrowserConnectionReturn
  extends SupabaseConnectionBaseReturn {}

export interface SupabaseBrowserConnectionOpts {
  config: SupabaseConnectionConfig;
}

export function getSupabaseBrowserConnection({
  config: { SUPABASE_ANON_KEY, SUPABASE_URL },
}: SupabaseBrowserConnectionOpts): SupabaseBrowserConnectionReturn {
  return { supabase: createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY) };
}
