import { redirect, type LoaderFunctionArgs } from '@remix-run/node';

import { getSupabaseServerConnection } from '~/supabase';

export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/app';

  if (code) {
    const { headers, supabase } = getSupabaseServerConnection({ request });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    }
  }

  return redirect('/login');
}
