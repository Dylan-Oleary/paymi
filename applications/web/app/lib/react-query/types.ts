import type { SupabaseBrowserConnectionOpts } from '~/supabase/.client';

export interface RQOperationWithSupabase {
  supabaseOpts: SupabaseBrowserConnectionOpts;
}
