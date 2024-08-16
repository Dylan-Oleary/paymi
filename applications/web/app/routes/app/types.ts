import type { SupabaseBrowserConnectionOpts } from '~/supabase/.client';
import type { ClientUser } from '~/types';

export interface RootAppLoaderData {
  supabaseOpts: SupabaseBrowserConnectionOpts;
  user: ClientUser;
}
