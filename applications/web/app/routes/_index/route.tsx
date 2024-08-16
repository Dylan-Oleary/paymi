import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';

import { getSupabaseServerConnection } from '~/supabase/.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = getSupabaseServerConnection({ request });
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect('/login');
  }

  return redirect('/app');
}
