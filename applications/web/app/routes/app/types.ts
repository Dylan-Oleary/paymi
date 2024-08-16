import type { SupabaseBrowserClientOpts } from '~/supabase/.client';
import type { ClientUser } from '~/types';

export interface RootAppLoaderData {
  supabaseOpts: SupabaseBrowserClientOpts;
  user: ClientUser;
}
