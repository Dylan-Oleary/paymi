import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/react';

import { getSupabaseServerClient } from '~/supabase';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect('/login');
  }

  return redirect('/app');
};
