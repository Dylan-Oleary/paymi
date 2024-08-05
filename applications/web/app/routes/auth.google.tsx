import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { getSupabaseServerClient } from '~/supabase';

export const action = async ({ request }: ActionFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });

  const signInResult = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: 'http://localhost:5173/auth/callback' },
  });

  if (signInResult.data.url) {
    return redirect(signInResult.data.url, { headers });
  }

  return;
};
