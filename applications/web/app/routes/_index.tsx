import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, redirect, useLoaderData } from '@remix-run/react';

import { getSupabaseServerClient, type User } from '~/supabase';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect('/login');
  }

  return json(data.user);
};

export default function IndexPage() {
  const { user_metadata } = useLoaderData<User>();

  return (
    <div className='font-sans p-4'>
      <h2>Hello, {user_metadata.full_name}</h2>
      <Form action='/logout' method='POST'>
        <button type='submit'>Sign Out</button>
      </Form>
    </div>
  );
}
