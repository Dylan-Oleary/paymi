import { createBrowserClient } from '@paymi/supabase';

import type {
  SupabaseConnectionBaseReturn,
  SupabaseConnectionConfig,
} from './types';

export interface SupabaseBrowserClientOpts {
  config: SupabaseConnectionConfig;
}
export interface SupabaseBrowserClientReturn
  extends SupabaseConnectionBaseReturn {}

export function getSupabaseBrowserConnection({
  config: { SUPABASE_ANON_KEY, SUPABASE_URL },
}: SupabaseBrowserClientOpts): SupabaseBrowserClientReturn {
  return { supabase: createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY) };
}
