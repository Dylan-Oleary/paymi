import { useRouteLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';
import { Button, Heading, TransactionTable } from '~/components';
import { useGetMonthlyBudgetTransactions } from '~/lib';
import { useCreateNewTransaction } from '~/lib/react-query/mutations';
import type { loader as routeLoader } from '../app.budgets_.$id.$year.$month/route';

export default function MonthlyBudgetTransactionsPage() {
  //@ts-expect-error Shut up, this typing is so annoying
  const { supabaseClientConfig, user } = useRouteLoaderData('routes/app');
  //@ts-expect-error Shut up, this typing is so annoying
  const { monthlyBudget } = useRouteLoaderData<typeof routeLoader>(
    'routes/app.budgets_.$id.$year.$month',
  );
  const { data } = useGetMonthlyBudgetTransactions({
    params: { monthlyBudgetRecordId: monthlyBudget.id },
    supabaseConfig: supabaseClientConfig,
  });
  const { mutate } = useCreateNewTransaction({
    params: { monthlyBudgetRecordId: monthlyBudget.id },
    supabaseConfig: supabaseClientConfig,
  });

  const onSubmit = (categoryId: string) => {
    mutate({
      amountCents: 1000,
      paidById: user.id,
      loggedById: user.id,
      monthlyBudgetCategoryId: categoryId,
      paidAt: new Date().toISOString(),
      paidTo: 'Homer',
    });
  };

  return (
    <div>
      <Heading level={3}>Monthly Transactions</Heading>
      <ClientOnly>
        {() => (
          <>
            <TransactionTable data={data ?? []} />
            {/* @ts-expect-error Shut up, this typing is so annoying */}
            {monthlyBudget.categories.map((record) => (
              <div key={record.id} className='mt-4'>
                <Button onClick={() => onSubmit(record.id)}>
                  Create {record.category.label_en} transaction
                </Button>
              </div>
            ))}
          </>
        )}
      </ClientOnly>
    </div>
  );
}
