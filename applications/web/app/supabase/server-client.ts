import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
  type SupabaseClient,
} from '@paymi/supabase';

export function getSupabaseServerClient(opts: {
  headers?: Headers;
  request: Request;
}): SupabaseClient {
  const { headers = new Headers(), request } = opts;

  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      auth: { flowType: 'pkce' },
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append(
              'Set-Cookie',
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );
}
