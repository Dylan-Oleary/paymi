import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

import { getSupabaseServerConnection } from '~/supabase/.server';

export const action = async ({ request }: LoaderFunctionArgs) => {
  const { headers, supabase } = getSupabaseServerConnection({ request });

  await supabase.auth.signOut({ scope: 'local' });

  return redirect('/login', { headers });
};
