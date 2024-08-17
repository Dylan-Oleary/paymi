import type { Database } from '@paymi/supabase';

import type { SupabaseActionOpts, User } from '~/supabase';

export interface GetUserActionOpts extends SupabaseActionOpts<Database> {
  redirectOnNull?: boolean;
  redirectUrl?: string;
}

export async function getUser({
  supabase,
}: GetUserActionOpts): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // TODO: Turn into a 'Result'
    console.error(error.message);
    return null;
  }

  return data.user;
}
