import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ArrowLongLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useParams } from '@remix-run/react';
import { useMemo } from 'react';

import { cn } from '~/utils';

export interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { pathname } = useLocation();
  const { id: budgetId, month, year } = useParams();

  const navigation = useMemo(() => {
    if (month) {
      return [
        {
          name: 'Overview',
          href: `/app/budgets/${budgetId}/${year}/${month}/overview`,
          isActive: pathname.endsWith(`${year}/${month}/overview`),
        },
        {
          name: 'Transactions',
          href: `/app/budgets/${budgetId}/${year}/${month}/transactions`,
          isActive: pathname.endsWith(`${year}/${month}/transactions`),
        },
      ];
    } else {
      return [
        {
          name: 'Overview',
          href: `/app/budgets/${budgetId}/${year}/overview`,
          isActive: pathname.endsWith(`${year}/overview`),
        },
        {
          name: 'Monthly Budgets',
          children: [
            {
              name: 'January',
              href: `/app/budgets/${budgetId}/${year}/01/overview`,
            },
            {
              name: 'February',
              href: `/app/budgets/${budgetId}/${year}/02/overview`,
            },
            {
              name: 'March',
              href: `/app/budgets/${budgetId}/${year}/03/overview`,
            },
            {
              name: 'April',
              href: `/app/budgets/${budgetId}/${year}/04/overview`,
            },
            {
              name: 'May',
              href: `/app/budgets/${budgetId}/${year}/05/overview`,
            },
            {
              name: 'June',
              href: `/app/budgets/${budgetId}/${year}/06/overview`,
            },
            {
              name: 'July',
              href: `/app/budgets/${budgetId}/${year}/07/overview`,
            },
            {
              name: 'August',
              href: `/app/budgets/${budgetId}/${year}/08/overview`,
            },
            {
              name: 'September',
              href: `/app/budgets/${budgetId}/${year}/09/overview`,
            },
            {
              name: 'October',
              href: `/app/budgets/${budgetId}/${year}/10/overview`,
            },
            {
              name: 'November',
              href: `/app/budgets/${budgetId}/${year}/11/overview`,
            },
            {
              name: 'December',
              href: `/app/budgets/${budgetId}/${year}/12/overview`,
            },
          ],
        },
      ];
    }
  }, [budgetId, month, pathname, year]);

  return (
    <div className={cn('flex flex-col gap-y-5 overflow-y-auto', className)}>
      {!!month && (
        <Link
          className='hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700'
          to={`/app/budgets/${budgetId}/${year}/overview`}
        >
          <ArrowLongLeftIcon className='h-4 w-4' /> Back
        </Link>
      )}
      <ul className='flex flex-col gap-1.5'>
        {navigation.map(({ children = [], href, isActive, name }) => (
          <li key={name}>
            {children.length > 0 ? (
              <Disclosure as='div'>
                <DisclosureButton
                  className={cn(
                    isActive ? 'bg-gray-50' : 'hover:bg-gray-50',
                    'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                  )}
                >
                  <ChevronRightIcon
                    aria-hidden='true'
                    className='h-5 w-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500'
                  />
                  {name}
                </DisclosureButton>
                <DisclosurePanel as='ul' className='mt-1 px-2'>
                  {children.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        className='block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700 hover:bg-gray-50'
                        to={subItem.href}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            ) : (
              <Link
                className={cn(
                  isActive ? 'bg-gray-50' : 'hover:bg-gray-50',
                  'group flex items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                )}
                to={href as string}
              >
                {name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
