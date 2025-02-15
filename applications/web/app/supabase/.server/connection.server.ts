import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@paymi/supabase';

import type { SupabaseConnectionBaseReturn } from '~/supabase';

interface SupabaseServerConnectionOpts {
  headers?: Headers;
  request: Request;
}

interface SupabaseServerConnectionReturn extends SupabaseConnectionBaseReturn {
  headers: Headers;
  request: Request;
}

export function getSupabaseServerConnection({
  headers = new Headers(),
  request,
}: SupabaseServerConnectionOpts): SupabaseServerConnectionReturn {
  const supabase = createServerClient(
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

  return { headers, request, supabase };
}
