import { type LoaderFunctionArgs, redirect } from '@remix-run/node';

import { getSupabaseServerClient } from '~/supabase';
import { GoogleLoginForm } from './google-login-form';

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
    <div className='flex min-h-full flex-1'>
      <div className='bg-gray-900 flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <h2 className='font-extrabold italic text-indigo-600 text-3xl tracking-tighter'>
              Paymi
            </h2>
            <h2 className='mt-8 text-2xl font-bold leading-9 tracking-tight text-white'>
              Sign in to your account
            </h2>
          </div>
          <GoogleLoginForm className='mt-10' />
        </div>
      </div>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <img
          alt='hero'
          className='absolute inset-0 h-full w-full object-cover'
          src='/images/hero.jpg'
        />
      </div>
    </div>
  );
}
