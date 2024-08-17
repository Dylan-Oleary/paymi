import type { Database } from '@paymi/supabase';
import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

import { getUser, type SupabaseClient, type User } from '~/supabase';
import { getSupabaseServerConnection } from '~/supabase/.server';

export async function authenticatedLoader<T>(
  args: LoaderFunctionArgs,
  implementation: (
    opts: LoaderFunctionArgs & {
      headers: Headers;
      supabase: SupabaseClient<Database>;
      user: User;
    },
  ) => Promise<T>,
) {
  const { headers, request, supabase } = getSupabaseServerConnection({
    request: args.request,
  });
  const user = await getUser({ supabase });

  if (!user) {
    return redirect('/login');
  }

  return implementation({ ...args, headers, request, supabase, user });
}
