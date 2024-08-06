import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { getSupabaseServerClient } from '~/supabase';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return redirect('/app', { headers });
  }

  return null;
};

export default function LoginPage() {
  return (
    <Form action='/auth/google' className='font-sans p-4' method='POST'>
      <button type='submit'>Login with Google</button>
    </Form>
  );
}
