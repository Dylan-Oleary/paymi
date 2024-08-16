import type { SupabaseBrowserClientOpts } from '~/supabase';
import type { ClientUser } from '~/types';

export interface RootAppLoaderData {
  supabaseOpts: SupabaseBrowserClientOpts;
  user: ClientUser;
}
