import { json, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { getSupabaseServerClient } from '~/supabase';
import type { ClientUser } from '~/types';

import { Sidebar } from './sidebar';

type LoaderData = {
  user: ClientUser;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers();
  const supabase = getSupabaseServerClient({ headers, request });

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return redirect('/login');
  }

  const { id, email, user_metadata } = data.user;
  const { avatar_url: avatarUrl, full_name: fullName, name } = user_metadata;

  return json<LoaderData>({ user: { id, avatarUrl, email, fullName, name } });
};

export default function AuthenticatedIndexPage() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div className='h-full'>
      <Sidebar user={user} />
      <main className='h-full py-10 lg:pl-72'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
