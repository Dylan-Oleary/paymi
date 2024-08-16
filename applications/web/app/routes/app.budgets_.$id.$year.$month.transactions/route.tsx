import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouteLoaderData } from '@remix-run/react';
import { type FormEvent, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import {
  Button,
  DatePicker,
  Heading,
  InputWithLabel,
  Select,
  SelectOption,
  TransactionTable,
  UserSelect,
} from '~/components';
import {
  useCreateNewTransaction,
  useDeleteTransaction,
  useGetMonthlyBudgetTransactions,
} from '~/lib';
import type { RootAppLoaderData } from '~/routes/app/types';
import type { loader as routeLoader } from '~/routes/app.budgets_.$id.$year.$month/route';
import type { ClientUser } from '~/types';

export default function MonthlyBudgetTransactionsPage() {
  const { supabaseOpts, user } = useRouteLoaderData(
    'routes/app',
  ) as RootAppLoaderData;
  //@ts-expect-error Shut up, this typing is so annoying
  const { monthlyBudget } = useRouteLoaderData<typeof routeLoader>(
    'routes/app.budgets_.$id.$year.$month',
  );
  const [isNewFormOpen, setIsNewFormOpen] = useState<boolean>(false);
  // TODO: Implement form serialization and validation
  const [newFormData, setNewFormData] = useState<Record<string, unknown>>({
    amount: null,
    note: null,
    paidAt: new Date(),
    paidBy: user,
    paidTo: null,
    monthlyBudgetCategory: null,
  });

  const { data } = useGetMonthlyBudgetTransactions({
    params: { monthlyBudgetRecordId: monthlyBudget.id },
    supabaseOpts,
  });
  const { mutate: createTransaction } = useCreateNewTransaction({
    params: { monthlyBudgetRecordId: monthlyBudget.id },
    supabaseOpts,
  });
  const { mutate: deleteTransaction } = useDeleteTransaction({
    params: { monthlyBudgetRecordId: monthlyBudget.id },
    supabaseOpts,
  });

  const closeNewForm = () => {
    setIsNewFormOpen(false);
    setNewFormData({
      amount: null,
      note: null,
      paidAt: new Date(),
      paidBy: user,
      paidTo: null,
      monthlyBudgetCategory: null,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    createTransaction({
      amountCents: Number(newFormData.amount) * 100,
      loggedById: user.id,
      //@ts-expect-error: SHH!
      monthlyBudgetCategoryId: newFormData.monthlyBudgetCategory?.id,
      note: newFormData.note as string,
      paidAt: (newFormData.paidAt as Date).toISOString(),
      //@ts-expect-error: SHH!
      paidById: newFormData!.paidBy?.id,
      paidTo: String(newFormData.paidTo),
    });
  };

  const onDelete = (id: string) => {
    deleteTransaction({ id });
  };

  return (
    <div>
      <Heading level={3}>Monthly Transactions</Heading>
      <ClientOnly>
        {() => (
          <>
            <div className='flex mt-4'>
              {isNewFormOpen ? (
                <form
                  className='flex gap-4 items-center w-full'
                  onSubmit={onSubmit}
                >
                  <div className='flex gap-1 items-center'>
                    <Button
                      onClick={closeNewForm}
                      size='icon'
                      type='button'
                      variant='outline'
                    >
                      <XMarkIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' type='submit' variant='secondary'>
                      <CheckIcon className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='w-full grid grid-cols-12 gap-2'>
                    <InputWithLabel
                      id='paidTo'
                      className='col-span-2'
                      label='Paid To'
                      name='paidTo'
                      onChange={({ target }) =>
                        setNewFormData({
                          ...newFormData,
                          paidTo: target.value,
                        })
                      }
                    />
                    <InputWithLabel
                      id='amount'
                      className='col-span-2'
                      label='Amount'
                      min={0}
                      onChange={({ target }) =>
                        setNewFormData({
                          ...newFormData,
                          amount: target.value,
                        })
                      }
                      name='amount'
                      step={0.01}
                      type='number'
                    />
                    <UserSelect
                      className='col-span-3'
                      label='Paid By'
                      onChange={({ id, avatarUrl, name }) => {
                        setNewFormData({
                          ...newFormData,
                          paidBy: { id, avatarUrl, name },
                        });
                      }}
                      options={[user]}
                      selected={newFormData.paidBy as ClientUser}
                    />
                    <Select
                      className='col-span-2'
                      label='Category'
                      onChange={({ id, label, value }) =>
                        setNewFormData({
                          ...newFormData,
                          monthlyBudgetCategory: { id, label, value },
                        })
                      }
                      options={monthlyBudget.categories.map(
                        //@ts-expect-error – Shh!
                        ({ id, category }) => ({
                          id,
                          label: category.label_en,
                          value: id,
                        }),
                      )}
                      selected={
                        newFormData.monthlyBudgetCategory as SelectOption
                      }
                    />
                    <DatePicker
                      className='col-span-3'
                      disableNavigation
                      label='Paid On'
                      onChange={(paidAt) =>
                        setNewFormData({ ...newFormData, paidAt })
                      }
                      showOutsideDays={false}
                      value={newFormData.paidAt as Date}
                    />
                    <InputWithLabel
                      id='note'
                      className='col-span-6'
                      label='Note'
                      name='note'
                      onChange={({ target }) =>
                        setNewFormData({ ...newFormData, note: target.value })
                      }
                    />
                  </div>
                </form>
              ) : (
                <Button
                  variant='outline'
                  onClick={() => setIsNewFormOpen(true)}
                >
                  Create new
                  <PlusIcon className='ml-2 h-4 w-4' />
                </Button>
              )}
            </div>
            <TransactionTable data={data ?? []} onRecordDelete={onDelete} />
          </>
        )}
      </ClientOnly>
    </div>
  );
}
