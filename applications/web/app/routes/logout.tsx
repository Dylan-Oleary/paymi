import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { getSupabaseServerClient } from '~/supabase';

export const action = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });

  await supabase.auth.signOut({ scope: 'local' });

  return redirect('/login', { headers });
};
