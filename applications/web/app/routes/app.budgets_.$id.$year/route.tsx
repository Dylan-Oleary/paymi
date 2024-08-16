import { Outlet, useParams } from '@remix-run/react';

import { Heading } from '~/components';

import { Sidebar } from './sidebar';

export default function YearlyBudgetPage() {
  const { month, year } = useParams();

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <Heading level={2}>
          {year} Dashboard ({month ? month : 'Yearly'})
        </Heading>
        <div>Year Selector</div>
      </div>
      <div className='flex grow mt-8 gap-2'>
        <Sidebar className='w-1/6' />
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
