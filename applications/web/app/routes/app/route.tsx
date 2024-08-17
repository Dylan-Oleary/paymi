import { json, type LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { authenticatedLoader } from '~/server';

import { Sidebar } from './sidebar';
import type { RootAppLoaderData } from './types';

export async function loader(args: LoaderFunctionArgs) {
  return authenticatedLoader<TypedResponse<RootAppLoaderData>>(
    args,
    async ({ user }) => {
      const { id, email, user_metadata } = user;
      const {
        avatar_url: avatarUrl,
        full_name: fullName,
        name,
      } = user_metadata;

      return json({
        supabaseOpts: {
          config: {
            SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
            SUPABASE_URL: process.env.SUPABASE_URL,
          },
        },
        user: { id, avatarUrl, email, fullName, name },
      });
    },
  );
}

const queryClient = new QueryClient();

export default function AuthenticatedIndexPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-full'>
        <Sidebar user={user} />
        <main className='h-full py-10 lg:pl-72'>
          <div className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}
