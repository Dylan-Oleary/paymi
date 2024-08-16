import { type ActionFunctionArgs, redirect } from '@remix-run/node';

import { getSupabaseServerConnection } from '~/supabase';

export async function action({ request }: ActionFunctionArgs) {
  const { headers, supabase } = getSupabaseServerConnection({ request });

  const signInResult = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: 'http://localhost:5173/auth/callback' },
  });

  if (signInResult.data.url) {
    return redirect(signInResult.data.url, { headers });
  }

  return;
}
