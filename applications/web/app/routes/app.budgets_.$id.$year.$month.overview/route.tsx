import { useRouteLoaderData } from '@remix-run/react';
import type { MonthlyBudgetLoaderData } from '../app.budgets_.$id.$year.$month/route';
import { Heading } from '~/components';
import { formatCentsToDollars } from '~/utils';

export default function MonthlyBudgetOverviewPage() {
  const data = useRouteLoaderData<MonthlyBudgetLoaderData>(
    'routes/app.budgets_.$id.$year.$month',
  );
  const budget = data?.monthlyBudget;

  return (
    <div>
      <Heading level={3}>Monthly Overview</Heading>
      <div className='mt-4'>
        <span className='font-bold mr-2'>Budget ID:</span>
        <span>{budget?.id}</span>
      </div>
      <div className='mt-2'>
        <span className='font-bold mr-2'>Month:</span>
        <span>{budget?.month}</span>
      </div>
      <div className='mt-2'>
        <span className='font-bold mr-2'>Year:</span>
        <span>{budget?.year}</span>
      </div>
      <div className='mt-4'>
        {budget?.categories.map((record) => (
          <div key={record.id}>
            <span className='font-bold mr-2'>{record.category.label_en}:</span>
            <span>{formatCentsToDollars(record.amount_cents)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
