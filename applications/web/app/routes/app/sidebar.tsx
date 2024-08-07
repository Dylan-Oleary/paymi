import { Link, useLocation } from '@remix-run/react';
import { clsx } from 'clsx';
import { type ReactNode, useState } from 'react';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import {
  Bars3Icon,
  ChartBarIcon,
  DocumentCurrencyDollarIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { ClientUser } from '~/types';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: HomeIcon },
  { name: 'Budgets', href: '/budgets', icon: DocumentCurrencyDollarIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

export type SidebarProps = { user: ClientUser };

export function Sidebar({ user }: SidebarProps): ReactNode {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Mobile */}
      <Dialog
        className='relative z-50 lg:hidden'
        onClose={setSidebarOpen}
        open={sidebarOpen}
      >
        <DialogBackdrop
          className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
          transition
        />

        <div className='fixed inset-0 flex'>
          <DialogPanel
            className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
            transition
          >
            <TransitionChild>
              <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
                <button
                  className='-m-2.5 p-2.5'
                  onClick={() => setSidebarOpen(false)}
                  type='button'
                >
                  <span className='sr-only'>Close sidebar</span>
                  <XMarkIcon
                    aria-hidden='true'
                    className='h-6 w-6 text-white'
                  />
                </button>
              </div>
            </TransitionChild>
            <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10'>
              <div className='flex h-16 shrink-0 items-center'>
                <h2 className='font-extrabold italic text-indigo-600 text-3xl tracking-tighter'>
                  Paymi
                </h2>
              </div>
              <nav className='flex flex-1 flex-col'>
                <ul className='flex flex-1 flex-col gap-y-7'>
                  <li>
                    <ul className='-mx-2 space-y-1'>
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            className={clsx(
                              pathname.includes(item.href)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                            )}
                            to={item.href}
                          >
                            <item.icon
                              aria-hidden='true'
                              className='h-6 w-6 shrink-0'
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <div className='sticky top-0 z-40 flex items-center justify-between gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
        <button
          className='-m-2.5 p-2.5 text-gray-400 lg:hidden'
          onClick={() => setSidebarOpen(true)}
          type='button'
        >
          <span className='sr-only'>Open sidebar</span>
          <Bars3Icon aria-hidden='true' className='h-6 w-6' />
        </button>
        <Link to='/app/profile'>
          <span className='sr-only'>Your profile</span>
          <img
            alt='Your avatar'
            className='h-8 w-8 rounded-full bg-gray-800'
            src={user.avatarUrl}
          />
        </Link>
      </div>

      {/* Desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6'>
          <div className='flex h-16 shrink-0 items-center'>
            <h2 className='font-extrabold italic text-indigo-600 text-3xl tracking-tighter'>
              Paymi
            </h2>
          </div>
          <nav className='flex flex-1 flex-col'>
            <ul className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        className={clsx(
                          pathname.includes(item.href)
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        )}
                        href={item.href}
                      >
                        <item.icon
                          aria-hidden='true'
                          className='h-6 w-6 shrink-0'
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='-mx-6 mt-auto'>
                <Link
                  className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800'
                  to='/app/profile'
                >
                  <img
                    alt='Your avatar'
                    className='h-8 w-8 rounded-full bg-gray-800'
                    src={user.avatarUrl}
                  />
                  <span className='sr-only'>Your profile</span>
                  <span aria-hidden='true'>{user.name}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
